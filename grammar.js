// ===== GRAMMAR SESSION STATE =====
let GR = {
  mode: 'mixed',
  queue: [],
  idx: 0,
  correct: 0,
  wrong: 0,
  answered: false,
  infoOpen: false,
  resultLog: [],
};

// ===== START SESSION =====
function startGrammarSession(mode) {
  const q = mode === 'weak'
    ? buildWeakGrammarQueue()
    : shuffle([...GRAMMAR_QUESTIONS]).slice(0, 6);

  GR = { mode, queue: q, idx:0, correct:0, wrong:0,
         answered:false, infoOpen:false, resultLog:[] };
  showPage('grammar');
  renderGrammarQuestion();
}

function buildWeakGrammarQueue() {
  const weak = Object.entries(STATE.grammarStats)
    .filter(([,v]) => v.attempts > 0 && (v.correct/v.attempts) < 0.65)
    .map(([topic]) => topic);
  const filtered = GRAMMAR_QUESTIONS.filter(q => weak.includes(q.topic));
  return shuffle(filtered.length ? filtered : [...GRAMMAR_QUESTIONS]).slice(0, 6);
}

// ===== GRAMMAR MENU =====
function renderGrammarMenu() {
  const topicRows = Object.entries(STATE.grammarStats).map(([topic, v]) => {
    const acc  = v.attempts > 0 ? Math.round((v.correct/v.attempts)*100) : 0;
    const chip = acc < 55 ? 'chip-d' : acc < 70 ? 'chip-w' : acc < 85 ? 'chip-s' : 'chip-t';
    return `<div class="wrow">
      <div><div class="w">${topic}</div><div class="wm">${v.attempts} ${t('gr_attempts')}</div></div>
      <span class="chip ${chip}">${acc}%</span>
    </div>`;
  }).join('');

  const weakCount = Object.values(STATE.grammarStats)
    .filter(v => v.attempts > 0 && (v.correct/v.attempts) < 0.65).length;

  document.getElementById('page-grammar').innerHTML = `
    <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 0 14px">
      <div style="display:flex;align-items:center;gap:10px">
        <button class="btn-icon" onclick="showPage('study')" aria-label="back">
          <i class="ti ti-arrow-left"></i>
        </button>
        <span style="font-size:15px;font-weight:500">${t('gr_title')}</span>
      </div>
      <span class="chip chip-t">${STATE.level}</span>
    </div>

    <div class="grid4" style="margin-bottom:14px">
      <div class="stat-mini">
        <div class="val">${Object.values(STATE.grammarStats).reduce((s,v)=>s+v.attempts,0)}</div>
        <div class="lbl">${t('gr_attempts')}</div>
      </div>
      <div class="stat-mini">
        <div class="val" style="color:var(--success)">${calcGrammarAcc()}%</div>
        <div class="lbl">accuracy</div>
      </div>
      <div class="stat-mini">
        <div class="val" style="color:var(--danger)">${weakCount}</div>
        <div class="lbl">${t('gr_weak_topics')}</div>
      </div>
      <div class="stat-mini">
        <div class="val">${Object.keys(STATE.grammarStats).length}</div>
        <div class="lbl">${t('gr_topics')}</div>
      </div>
    </div>

    <div class="sec-label" style="margin-top:0">accuracy</div>
    <div class="card">${topicRows}</div>

    <button class="btn-primary" onclick="startGrammarSession('mixed')">
      ${t('gr_start_mixed')}
    </button>
    <button class="btn-primary danger" onclick="startGrammarSession('weak')"
      style="${weakCount===0?'opacity:0.4;pointer-events:none':''}">
      ${t('gr_train_weak')} ${weakCount>0?'('+weakCount+')':''}
    </button>
    <button class="btn-primary ghost" onclick="showPage('study')">${t('gr_back_study')}</button>
  `;
}

function calcGrammarAcc() {
  const all = Object.values(STATE.grammarStats);
  const totalA = all.reduce((s,v)=>s+v.attempts,0);
  const totalC = all.reduce((s,v)=>s+v.correct,0);
  return totalA > 0 ? Math.round((totalC/totalA)*100) : 0;
}

// ===== RENDER QUESTION =====
function renderGrammarQuestion() {
  if (GR.idx >= GR.queue.length) { renderGrammarResult(); return; }

  const q     = GR.queue[GR.idx];
  const total = GR.queue.length;
  const pct   = Math.round((GR.idx/total)*100);
  const gInfo = GRAMMAR_DB[q.topic] || {};
  const currentMode = GR.questionMode || 'choice';

  document.getElementById('page-grammar').innerHTML = `
    <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 0 10px">
      <div style="display:flex;align-items:center;gap:10px">
        <button class="btn-icon" onclick="renderGrammarMenu()" aria-label="back">
          <i class="ti ti-arrow-left"></i>
        </button>
        <span style="font-size:15px;font-weight:500">${t('gr_title')}</span>
      </div>
      <span style="font-size:13px;color:var(--text3)">${GR.idx+1} / ${total}</span>
    </div>

    <div style="height:5px;background:var(--surface2);border-radius:99px;
      margin-bottom:12px;overflow:hidden">
      <div style="height:100%;width:${pct}%;background:var(--teal);
        border-radius:99px;transition:width 0.4s"></div>
    </div>

    <div style="font-size:12px;color:var(--text3);text-align:center;margin-bottom:14px">
      ${t('quiz_correct')} ${GR.correct} · ${t('quiz_wrong')} ${GR.wrong}
    </div>

    <div style="background:var(--surface2);border-radius:12px;padding:14px 16px;margin-bottom:12px">
      <div style="font-size:10px;font-weight:500;color:var(--text3);
        text-transform:uppercase;letter-spacing:0.05em;margin-bottom:6px">
        ${t('gr_word_label')}
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between">
        <div>
          <div style="font-size:22px;font-weight:500;color:var(--accent)">${q.word}</div>
          <div style="font-size:12px;color:var(--text3);margin-top:2px">${q.ipa}</div>
        </div>
        <button class="btn-sm" onclick="speakWord('${q.word}')">
          <i class="ti ti-volume"></i> ${t('quiz_speak')}
        </button>
      </div>
    </div>

    <div style="display:inline-flex;align-items:center;gap:6px;background:var(--teal-lt);
      color:var(--teal);border-radius:8px;padding:6px 12px;font-size:13px;
      font-weight:500;margin-bottom:12px">
      <i class="ti ti-pencil"></i> ${q.topic}
    </div>

    <button class="btn-sm" style="width:100%;justify-content:space-between;margin-bottom:8px"
      onclick="toggleGrammarInfoPanel()">
      <span>
        <i class="ti ti-info-circle" style="color:var(--teal)"></i>
        ${t('gr_info_btn')}
      </span>
      <i class="ti ti-chevron-down" id="gr-info-chev"></i>
    </button>

    <div id="gr-info-panel" class="grammar-info">
      <div class="gi-title">${q.topic}</div>
      <div class="info-lbl">${t('gr_use_when')}</div>
      <div class="gi-text" style="margin-bottom:8px">${gInfo.use||''}</div>
      <div class="info-lbl">${t('gr_structure')}</div>
      <div class="gi-structure">${gInfo.structure||''}</div>
      <div class="info-lbl" style="margin-top:8px">${t('gr_examples')}</div>
      ${(gInfo.examples||[]).map(ex=>`<div class="gi-ex">${ex}</div>`).join('')}
    </div>

    <div style="display:flex;gap:4px;margin-bottom:12px;
      background:var(--surface2);border-radius:8px;padding:3px">
      <button id="mode-btn-choice" onclick="switchGrammarMode('choice')"
        style="flex:1;padding:7px;border:none;border-radius:6px;font-size:12px;
          cursor:pointer;transition:all 0.15s;font-weight:500;
          background:${currentMode==='choice'?'var(--surface)':'none'};
          color:${currentMode==='choice'?'var(--teal)':'var(--text3)'};
          border:${currentMode==='choice'?'0.5px solid var(--border)':'none'}">
        ${t('gr_choice')}
      </button>
      <button id="mode-btn-free" onclick="switchGrammarMode('free')"
        style="flex:1;padding:7px;border:none;border-radius:6px;font-size:12px;
          cursor:pointer;transition:all 0.15s;font-weight:500;
          background:${currentMode==='free'?'var(--surface)':'none'};
          color:${currentMode==='free'?'var(--teal)':'var(--text3)'};
          border:${currentMode==='free'?'0.5px solid var(--border)':'none'}">
        ${t('gr_free')}
      </button>
    </div>

    <div style="background:var(--surface);border:0.5px solid var(--border);
      border-radius:12px;padding:16px;margin-bottom:12px">
      <div style="font-size:10px;font-weight:500;color:var(--text3);
        text-transform:uppercase;letter-spacing:0.05em;margin-bottom:8px">
        ${currentMode==='choice' ? t('gr_fill') : t('gr_create')}
      </div>
      ${currentMode==='choice' ? renderChoiceMode(q) : renderFreeMode(q)}
    </div>

    <div id="gr-feedback"></div>
    <button id="btn-gr-next" class="btn-primary" style="display:none"
      onclick="nextGrammarQuestion()">
      ${t('gr_next')}
    </button>
  `;

  if (GR.infoOpen) {
    document.getElementById('gr-info-panel').classList.add('open');
    const chev = document.getElementById('gr-info-chev');
    if (chev) chev.style.transform = 'rotate(180deg)';
  }
}

// ===== RENDER CHOICE MODE =====
function renderChoiceMode(q) {
  const letters = ['A','B','C','D'];
  const opts    = shuffle([...(q.options||[])]);
  return `
    <div style="font-size:15px;line-height:1.7;margin-bottom:14px">
      ${q.sentence.replace('___',
        '<span style="display:inline-block;min-width:110px;border-bottom:2px solid var(--teal);margin:0 4px;vertical-align:bottom">&nbsp;</span>'
      )}
    </div>
    ${opts.map((opt,i) => `
      <button class="choice-btn" style="border-color:var(--teal-mid)"
        onclick="answerGrammarChoice('${escStr(opt)}','${escStr(q.answer)}','${escStr(q.explanation)}')">
        <span class="choice-letter">${letters[i]}</span>
        <span>${opt}</span>
      </button>`).join('')}
  `;
}

// ===== RENDER FREE WRITE MODE =====
function renderFreeMode(q) {
  const gInfo = GRAMMAR_DB[q.topic] || {};
  return `
    <div style="font-size:14px;color:var(--text2);line-height:1.6;margin-bottom:12px">
      ${t('gr_use_word')} <strong style="color:var(--accent)">"${q.word}"</strong>
      ${t('gr_with')} <strong style="color:var(--teal)">${q.topic}</strong>
    </div>
    <div style="background:var(--surface2);border-radius:8px;padding:10px 12px;
      margin-bottom:10px;font-size:12px;color:var(--text3)">
      ${t('gr_structure')}: <span style="color:var(--teal);font-weight:500">${gInfo.structure||''}</span>
    </div>
    <textarea id="gr-sentence-input"
      placeholder="${STATE.lang==='en'?'Type your sentence here...':'พิมพ์ประโยคของคุณที่นี่...'}"
      maxlength="300"
      oninput="grCheckLength(this)"
      style="margin-bottom:4px"></textarea>
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
      <div style="font-size:11px;color:var(--text3)">${t('gr_ai_note')}</div>
      <div style="font-size:11px;color:var(--text3)"><span id="gr-char-count">0</span>/300</div>
    </div>
    <button class="btn-primary teal" id="gr-check-btn"
      onclick="checkGrammarSentence('${escStr(q.word)}','${escStr(q.topic)}')"
      disabled style="margin-bottom:0">
      ${t('gr_check')}
    </button>
  `;
}

// ===== SWITCH MODE (choice / free) =====
function switchGrammarMode(mode) {
  if (GR.answered) return;
  GR.questionMode = mode;
  renderGrammarQuestion();
}

// ===== TOGGLE GRAMMAR INFO =====
function toggleGrammarInfoPanel() {
  GR.infoOpen = !GR.infoOpen;
  const panel = document.getElementById('gr-info-panel');
  const chev  = document.getElementById('gr-info-chev');
  if (panel) panel.classList.toggle('open', GR.infoOpen);
  if (chev)  chev.style.transform = GR.infoOpen ? 'rotate(180deg)' : '';
}

// ===== CHECK TEXTAREA LENGTH =====
function grCheckLength(el) {
  const counter = document.getElementById('gr-char-count');
  if (counter) counter.textContent = el.value.length;
  const btn = document.getElementById('gr-check-btn');
  if (btn) btn.disabled = el.value.trim().length < 5;
}

// ===== ANSWER — MULTIPLE CHOICE =====
function answerGrammarChoice(chosen, correct, explanation) {
  if (GR.answered) return;
  GR.answered = true;

  const q    = GR.queue[GR.idx];
  const btns = document.querySelectorAll('.choice-btn');
  btns.forEach(b => b.disabled = true);

  const isCorrect = chosen === correct;
  btns.forEach(b => {
    const txt = b.querySelectorAll('span')[1].textContent;
    if (txt === chosen && isCorrect)  { b.classList.add('correct'); b.querySelector('.choice-letter').textContent='✓'; }
    if (txt === chosen && !isCorrect) { b.classList.add('wrong');   b.querySelector('.choice-letter').textContent='✗'; }
    if (txt === correct && !isCorrect){ b.classList.add('reveal'); }
  });

  if (isCorrect) GR.correct++; else GR.wrong++;
  updateGrammarStat(q.topic, isCorrect);
  GR.resultLog.push({ word:q.word, topic:q.topic, correct:isCorrect, type:'choice' });
  saveState();

  const fb = document.getElementById('gr-feedback');
  fb.innerHTML = isCorrect
    ? `<div class="feedback-box correct">
        <div class="fb-title">${t('quiz_result_great')}</div>
        <div>${explanation}</div>
       </div>`
    : `<div class="feedback-box wrong">
        <div class="fb-title">${t('gr_wrong_ans')} "${correct}"</div>
        <div>${explanation}</div>
       </div>`;

  document.getElementById('btn-gr-next').style.display = 'block';
}

// ===== ANSWER — FREE WRITE + AI =====
function checkGrammarSentence(word, topic) {
  if (GR.answered) return;
  const input    = document.getElementById('gr-sentence-input');
  const sentence = input ? input.value.trim() : '';
  if (!sentence) return;

  GR.answered = true;
  const btn = document.getElementById('gr-check-btn');
  if (btn) btn.disabled = true;

  const fb = document.getElementById('gr-feedback');
  fb.innerHTML = `<div class="feedback-box teal">
    <div class="fb-title">${t('gr_checking')}</div>
    <div>${t('gr_ai_checking')}</div>
  </div>`;

  const gInfo = GRAMMAR_DB[topic] || {};
  const systemPrompt = `You are a strict English grammar and writing evaluator for Thai learners at CEFR ${STATE.level}.
Check ALL of the following:
1. Grammar correctness (especially the required tense/structure)
2. Spelling of every word
3. Word choice and naturalness
4. Sentence structure and completeness
5. Correct use of the required vocabulary word

Reply ONLY in this JSON format with no markdown:
{
  "correct": true or false,
  "corrected": "the fully corrected sentence",
  "errors": ["list each specific error found"],
  "explanation": "2-3 sentences in Thai explaining errors and corrections"
}`;

  const userPrompt = `Required word: "${word}"
Required grammar: ${topic}
Structure: ${gInfo.structure||''}
Student wrote: "${sentence}"
Check every aspect thoroughly.`;

  fetch('/api/gemini', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 400,
      system: systemPrompt,
      messages: [{ role:'user', content:userPrompt }],
    }),
  })
  .then(r => r.json())
  .then(data => {
    let result = { correct:false, corrected:sentence, errors:[], explanation:'' };
    try {
      const text = data.content[0].text;
      result = JSON.parse(text.replace(/```json|```/g,'').trim());
    } catch(e) {}

    const isCorrect = result.correct;
    if (isCorrect) GR.correct++; else GR.wrong++;
    updateGrammarStat(topic, isCorrect);
    GR.resultLog.push({ word, topic, correct:isCorrect, type:'free' });
    saveState();

    const errorsHTML = result.errors && result.errors.length > 0
      ? result.errors.map(e =>
          `<div style="display:flex;gap:6px;align-items:flex-start;
            margin-bottom:4px;font-size:12px">
            <span style="color:var(--danger);flex-shrink:0">✗</span>
            <span>${e}</span>
          </div>`).join('')
      : '';

    fb.innerHTML = isCorrect
      ? `<div class="feedback-box correct">
          <div class="fb-title">${t('gr_correct_all')}</div>
          <div>${result.explanation}</div>
         </div>`
      : `<div class="feedback-box wrong">
          <div class="fb-title">${t('gr_errors')}</div>
          ${errorsHTML}
          <div style="margin-top:8px">${result.explanation}</div>
          <div style="background:var(--surface2);border-radius:8px;
            padding:10px 12px;margin-top:8px;font-size:13px">
            <div style="font-size:11px;color:var(--text3);margin-bottom:4px">
              ${t('gr_corrected')}
            </div>
            <div style="color:var(--success);font-weight:500">${result.corrected}</div>
          </div>
         </div>`;

    document.getElementById('btn-gr-next').style.display = 'block';
  })
  .catch(() => {
    GR.wrong++;
    fb.innerHTML = `<div class="feedback-box wrong">
      <div class="fb-title">${t('gr_no_api')}</div>
      <div>${t('gr_no_api_sub')}</div>
    </div>`;
    document.getElementById('btn-gr-next').style.display = 'block';
  });
}

// ===== UPDATE GRAMMAR STAT =====
function updateGrammarStat(topic, isCorrect) {
  if (!STATE.grammarStats[topic]) STATE.grammarStats[topic] = { attempts:0, correct:0 };
  STATE.grammarStats[topic].attempts++;
  if (isCorrect) STATE.grammarStats[topic].correct++;
  STATE.todayGrammar++;
}

// ===== NEXT QUESTION =====
function nextGrammarQuestion() {
  GR.idx++;
  GR.answered    = false;
  GR.infoOpen    = false;
  GR.questionMode = 'choice';
  renderGrammarQuestion();
}

// ===== RESULT =====
function renderGrammarResult() {
  const total = GR.correct + GR.wrong;
  const acc   = total > 0 ? Math.round((GR.correct/total)*100) : 0;
  let icon = '📖', title = t('quiz_result_more');
  if (acc >= 80) { icon='🎉'; title=t('quiz_result_great'); }
  else if (acc >= 60) { icon='💪'; title=t('quiz_result_good'); }

  const typeLabel = { choice:t('gr_choice'), free:t('gr_free') };

  const logHTML = GR.resultLog.map(r => `
    <div style="display:flex;justify-content:space-between;align-items:center;
      padding:8px 10px;background:var(--surface2);border-radius:8px;
      margin-bottom:5px;font-size:13px">
      <div>
        <span style="font-weight:500">${r.word}</span>
        <span style="color:var(--text3);font-size:11px;margin-left:6px">${r.topic}</span>
        <span style="color:var(--text3);font-size:10px;margin-left:4px">${typeLabel[r.type]||''}</span>
      </div>
      <span style="color:${r.correct?'var(--success)':'var(--danger)'};font-weight:500">
        ${r.correct ? t('quiz_correct') : t('quiz_wrong')}
      </span>
    </div>`).join('');

  document.getElementById('page-grammar').innerHTML = `
    <div class="result-icon">${icon}</div>
    <div class="result-title">${title}</div>
    <div class="result-sub">
      ${t('quiz_done')} ${total} · accuracy ${acc}%
    </div>

    <div class="grid4" style="margin-bottom:14px">
      <div class="stat-mini">
        <div class="val" style="color:var(--success)">${GR.correct}</div>
        <div class="lbl">${t('quiz_correct')}</div>
      </div>
      <div class="stat-mini">
        <div class="val" style="color:var(--danger)">${GR.wrong}</div>
        <div class="lbl">${t('quiz_wrong')}</div>
      </div>
      <div class="stat-mini"><div class="val">${acc}%</div><div class="lbl">accuracy</div></div>
      <div class="stat-mini">
        <div class="val">${STATE.todayGrammar}</div>
        <div class="lbl">${t('gr_today')}</div>
      </div>
    </div>

    <div class="sec-label" style="margin-top:0">${t('gr_summary')}</div>
    <div class="card">
      ${logHTML || `<div style="color:var(--text3)">${t('gr_no_data')}</div>`}
    </div>

    <button class="btn-primary" onclick="startGrammarSession('${GR.mode}')">
      ${t('gr_again')}
    </button>
    <button class="btn-primary ghost" onclick="renderGrammarMenu()">
      ${t('gr_back_gr')}
    </button>
    <button class="btn-primary ghost" onclick="showPage('study')" style="margin-top:0">
      ${t('gr_back_study')}
    </button>
  `;
}
