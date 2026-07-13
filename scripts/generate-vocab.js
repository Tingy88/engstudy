// scripts/generate-vocab.js
import fs from 'fs';

const GROQ_KEY = process.env.GROQ_KEY;
const GEMINI_KEY = process.env.GEMINI_KEY;
const BATCH_SIZE = 10;
const DATA_PATH = './data.js';

// ===== ขั้นที่ 1-2: อ่านไฟล์เดิม + นับคำแต่ละ level =====
function readExistingWords(fileText) {
  const startIdx = fileText.indexOf('const WORDS = [{');
  const endMarker = '\n];\n\nconst DISTRACTORS';
  const endIdx = fileText.indexOf(endMarker, startIdx);
  const wordsSection = fileText.slice(startIdx, endIdx);

  const words = [...wordsSection.matchAll(/word:\s*'([^']+)'/g)].map(m => m[1]);
  const levelCounts = {};
  [...wordsSection.matchAll(/level:\s*'([A-C][12])'/g)].forEach(m => {
    levelCounts[m[1]] = (levelCounts[m[1]] || 0) + 1;
  });
  return { words, levelCounts, endIdx };
}

function pickNextLevel(levelCounts) {
  const targets = { A1: 600, A2: 900, B1: 1400, B2: 1400, C1: 1100, C2: 700 };
  let best = 'A1', bestRatio = Infinity;
  for (const lv of Object.keys(targets)) {
    const ratio = (levelCounts[lv] || 0) / targets[lv];
    if (ratio < bestRatio) { bestRatio = ratio; best = lv; }
  }
  return best;
}

// ===== ขั้นที่ 3: ให้ Groq generate คำศัพท์ใหม่ =====
async function generateCandidates(level, excludeWords) {
  const prompt = `Generate exactly ${BATCH_SIZE} English vocabulary words for CEFR level ${level}, suitable for Thai learners.
DO NOT use any of these existing words: ${excludeWords.slice(-300).join(', ')}
For each word give: word, level ('${level}'), partOfSpeech (array e.g. ['verb [T]']), meanings (array of {pos, en, th} - en definition in English, th translation in Thai), antonyms (array, 2 words), examples (array of exactly 3 natural sentences using the word).
Reply ONLY raw JSON: {"words":[{...}]}`;

  const r = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${GROQ_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.6, max_tokens: 3000,
      response_format: { type: 'json_object' },
    }),
  });
  const data = await r.json();
  if (data.error) throw new Error('Groq error: ' + data.error.message);
  return JSON.parse(data.choices[0].message.content).words;
}

// ===== ขั้นที่ 4: ดึง IPA จาก dictionary จริง =====
async function fetchIPA(word) {
  try {
    const r = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`);
    if (!r.ok) return null;
    const data = await r.json();
    const entry = data[0];
    // พยายามหาแบบ British (สังเกตจาก audio url ที่มี _gb_)
    const gbPhonetic = entry.phonetics.find(p => p.audio && p.audio.includes('_gb_') && p.text);
    const anyPhonetic = entry.phonetics.find(p => p.text);
    const text = (gbPhonetic || anyPhonetic || entry).text;
    return text || null;
  } catch (e) {
    return null;
  }
}

// ===== ขั้นที่ 5: ให้ Gemini ตรวจสอบ =====
async function verifyWithGemini(candidates) {
  const prompt = `You are a strict English vocabulary checker. Review this JSON list of words. For each word, check if the meanings, Thai translations, and example sentences are accurate and natural. Reply ONLY raw JSON: {"results":[{"word":"...","valid":true or false,"reason":"..."}]}

Words to check:
${JSON.stringify(candidates.map(c => ({ word: c.word, meanings: c.meanings, examples: c.examples })))}`;

  const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${GEMINI_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.2, responseMimeType: 'application/json' },
    }),
  });
  const data = await r.json();
  if (data.error) throw new Error('Gemini error: ' + data.error.message);
  const txt = data.candidates[0].content.parts[0].text;
  return JSON.parse(txt).results;
}

// ===== ขั้นที่ 6: ประกอบร่างเป็น JS object แล้วแทรกเข้าไฟล์ =====
function formatWordEntry(w, ipa) {
  return `  {
    word: '${w.word}',
    level: '${w.level}',
    partOfSpeech: ${JSON.stringify(w.partOfSpeech)},
    ipa_uk: '${ipa}',
    ipa_us: '${ipa}',
    meanings: ${JSON.stringify(w.meanings, null, 6).replace(/^/gm, '  ')},
    antonyms: ${JSON.stringify(w.antonyms || [])},
    examples: ${JSON.stringify(w.examples, null, 6).replace(/^/gm, '  ')},
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },`;
}

// ===== MAIN =====
async function main() {
  const fileText = fs.readFileSync(DATA_PATH, 'utf-8');
  const { words: existingWords, levelCounts, endIdx } = readExistingWords(fileText);
  const level = pickNextLevel(levelCounts);
  console.log(`เลือก level: ${level} (ตอนนี้มี ${levelCounts[level] || 0} คำ)`);

  const candidates = await generateCandidates(level, existingWords);
  const fresh = candidates.filter(c => !existingWords.includes(c.word));
  console.log(`Groq generate มา ${candidates.length} คำ, ไม่ซ้ำ ${fresh.length} คำ`);

  const verifyResults = await verifyWithGemini(fresh);
  const accepted = [];
  const skipped = [];

  for (const c of fresh) {
    const verdict = verifyResults.find(v => v.word === c.word);
    if (!verdict || !verdict.valid) {
      skipped.push(`${c.word}: Gemini ไม่ผ่าน (${verdict?.reason || 'ไม่มีข้อมูล'})`);
      continue;
    }
    const ipa = await fetchIPA(c.word);
    if (!ipa) {
      skipped.push(`${c.word}: หา IPA ใน dictionary ไม่เจอ`);
      continue;
    }
    accepted.push(formatWordEntry(c, ipa));
  }

  console.log(`\n✅ ผ่านทั้งหมด: ${accepted.length} คำ`);
  console.log(`❌ ข้าม: ${skipped.length} คำ`);
  skipped.forEach(s => console.log('  - ' + s));

  if (accepted.length > 0) {
    const newText = fileText.slice(0, endIdx) + '\n' + accepted.join('\n') + fileText.slice(endIdx);
    fs.writeFileSync(DATA_PATH, newText, 'utf-8');
    console.log('เขียนเข้า data.js เรียบร้อย');
  }
}

main().catch(err => {
  console.error('เกิดข้อผิดพลาด:', err.message);
  process.exit(1);
});
