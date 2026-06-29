// ===== READING STATE =====
let RD = {
  difficulty: 'standard',
  passage: '',
  questions: [],
  answers: {},
  submitted: false,
  loading: false,
};

const RD_CONFIG = {
  A1: { light:[100,150], standard:[150,200], exam:[180,220] },
  A2: { light:[150,200], standard:[200,280], exam:[260,320] },
  B1: { light:[200,280], standard:[280,360], exam:[340,420] },
  B2: { light:[320,450], standard:[420,560], exam:[520,700] },
  C1: { light:[500,700], standard:[650,900], exam:[800,1100] },
  C2: { light:[700,900], standard:[900,1200], exam:[1100,1500] },
};

// ===== RENDER READING PAGE =====
function renderReading() {
  RD.submitted = false;
  RD.answers   = {};

  const cfg   = RD_CONFIG[STATE.level] || RD_CONFIG['B1'];
  const range = cfg[RD.difficulty];
  const qCount = RD.difficulty==='exam' ? 6 : RD.difficulty==='standard' ? 5 : 4;

  const diffs = [
    { key:'light',    label:t('rd_light'),    desc:t('rd_light_desc')    },
    { key:'standard', label:t('rd_standard'), desc:t('rd_standard_desc') },
    { key:'exam',     label:t('rd_exam'),     desc:t('rd_exam_desc')     },
  ];

  document.getElementById('page-reading').innerHTML = `
    <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 0 14px">
      <div style="display:flex;align-items:center;gap:10px">
        <button class="btn-icon" onclick="showPage('study')" aria-label="back">
          <i class="ti ti-arrow-left"></i>
        </button>
        <span style="font-size:15px;font-weight:500">${t('rd_title')}</span>
      </div>
      <span class="chip chip-a">${STATE.level}</span>
    </div>

    <div class="sec-label" style="margin-top:0">${t('rd_select_diff')}</div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:16px">
      ${diffs.map(d => `
        <div onclick="setDifficulty('${d.key}')"
          style="border:1.5px solid ${RD.difficulty===d.key?'var(--accent)':'var(--border)'};
            background:${RD.difficulty===d.key?'var(--accent-lt)':'var(--surface)'};
            border-radius:10px;padding:12px 10px;text-align:center;
            cursor:pointer;transition:all 0.15s">
          <div style="font-size:14px;font-weight:500;
            color:${RD.difficulty===d.key?'var(--accent)':'var(--text)'}">
            ${d.label}
          </div>
          <div style="font-size:10px;color:var(--text3);margin-top:4px;line-height:1.4">
            ${d.desc}
          </div>
        </div>`).join('')}
    </div>

    <div style="font-size:12px;color:var(--text3);margin-bottom:14px">
      ~${range[0]}–${range[1]} ${t('rd_words')} ·
      ${qCount} ${t('rd_questions')} ·
      ${STATE.level} CEFR
    </div>

    <button class="btn-primary" onclick="generateReading()" id="btn-gen-reading">
      <i class="ti ti-wand"></i> ${t('rd_gen')}
    </button>

    <div id="reading-content"></div>
  `;
}

// ===== SET DIFFICULTY =====
function setDifficulty(diff) {
  RD.difficulty = diff;
  renderReading();
}

// ===== GENERATE READING WITH AI =====
function generateReading() {
  if (RD.loading) return;
  RD.loading   = true;
  RD.submitted = false;
  RD.answers   = {};

  const btn = document.getElementById('btn-gen-reading');
  if (btn) { btn.disabled=true; btn.textContent=t('rd_generating'); }

  const cfg    = RD_CONFIG[STATE.level] || RD_CONFIG['B1'];
  const range  = cfg[RD.difficulty];
  const qCount = RD.difficulty==='exam' ? 6 : RD.difficulty==='standard' ? 5 : 4;
  const diffEn = { light:'Light', standard:'Standard', exam:'Exam-style' };
  const diffLabel = diffEn[RD.difficulty];

  const qtypes = RD.difficulty==='exam'
    ? 'literal comprehension, inference, vocabulary in context, main idea, author intention, logical conclusion'
    : RD.difficulty==='standard'
    ? 'literal comprehension, inference, vocabulary in context, main idea, logical conclusion'
    : 'literal comprehension, main idea, vocabulary in context, logical conclusion';

  const systemPrompt = `You are an English reading passage generator for CEFR ${STATE.level} learners.
Generate FICTIONAL content only — no real people, real events, real places, or facts.
Use only real English words. Never invent words.
Reply ONLY in JSON with no markdown:
{
  "title": "passage title",
  "passage": "full passage text",
  "questions": [
    {
      "question": "question text",
      "type": "question type",
      "options": ["A. option","B. option","C. option","D. option"],
      "answer": "A",
      "explanation": "brief explanation in Thai why this is correct"
    }
  ]
}`;

  const userPrompt = `Create a ${diffLabel} reading passage for CEFR ${STATE.level}.
Length: ${range[0]}–${range[1]} words.
Questions: ${qCount} multiple choice questions covering: ${qtypes}
${RD.difficulty==='exam'
  ? 'Make questions challenging with plausible distractors. Include inference and author intention. Answers should NOT be directly stated in the text.'
  : RD.difficulty==='standard'
  ? 'Mix direct and inferential questions. Some distractors should be plausible.'
  : 'Keep questions straightforward. Answers findable directly in text.'}
Vocabulary: use only real words appropriate for ${STATE.level} and below.
Topic: any fictional everyday topic (community, travel, work, environment, technology, food).
All content must be completely fictional.`;

  fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 2000,
      system: systemPrompt,
      messages: [{ role:'user', content:userPrompt }],
    }),
  })
  .then(r => r.json())
  .then(data => {
    RD.loading = false;
    let result = null;
    try {
      const text = data.content[0].text;
      result = JSON.parse(text.replace(/```json|```/g,'').trim());
    } catch(e) {
      showReadingError(t('rd_error'));
      return;
    }
    RD.passage   = result.passage;
    RD.questions = result.questions;
    renderReadingPassage(result);
  })
  .catch(() => {
    RD.loading = false;
    showReadingError(t('gr_no_api_sub'));
  });
}

// ===== SHOW ERROR =====
function showReadingError(msg) {
  const el  = document.getElementById('reading-content');
  const btn = document.getElementById('btn-gen-reading');
  if (btn) { btn.disabled=false; btn.innerHTML=`<i class="ti ti-wand"></i> ${t('rd_gen')}`; }
  if (el) el.innerHTML = `
    <div class="feedback-box wrong" style="margin-top:12px">
      <div class="fb-title">${t('rd_error')}</div>
      <div>${msg}</div>
    </div>`;
}

// ===== RENDER PASSAGE =====
function renderReadingPassage(result) {
  const el  = document.getElementById('reading-content');
  const btn = document.getElementById('btn-gen-reading');
  if (!el) return;
  if (btn) { btn.disabled=false; btn.innerHTML=`<i class="ti ti-wand"></i> ${t('rd_gen')}`; }

  const wordCount = RD.passage.split(/\s+/).length;
  const qCount    = RD.questions.length;
  const diffLabel = { light:t('rd_light'), standard:t('rd_standard'), exam:t('rd_exam') };

  el.innerHTML = `
    <div class="reading-warn" style="margin-top:12px">
      <i class="ti ti-alert-circle" style="font-size:16px;flex-shrink:0;margin-top:1px"></i>
      <div>${t('rd_warn')}</div>
    </div>

    <div class="card">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
        <div style="font-size:14px;font-weight:500">${result.title||'Reading Passage'}</div>
        <div style="display:flex;gap:6px">
          <span class="chip chip-a">${STATE.level}</span>
          <span class="chip chip-t">${diffLabel[RD.difficulty]}</span>
        </div>
      </div>
      <div style="font-size:11px;color:var(--text3);margin-bottom:12px">
        ~${wordCount} ${t('rd_words')} · ${qCount} ${t('rd_questions')}
      </div>
      <div class="reading-body">
        ${RD.passage.replace(/\n\n/g,'<br><br>').replace(/\n/g,'<br>')}
      </div>
    </div>

    <div class="sec-label">${qCount} ${t('rd_questions')}</div>
    <div id="questions-area">
      ${RD.questions.map((q,qi) => renderQuestion(q,qi)).join('')}
    </div>

    <button class="btn-primary" id="btn-submit-reading"
      onclick="submitReading()" style="margin-top:4px">
      ${t('rd_submit')}
    </button>
    <div id="reading-result"></div>
  `;
}

// ===== RENDER SINGLE QUESTION =====
function renderQuestion(q, qi) {
  const typeMap = {
    'literal comprehension': t('rd_literal'),
    'inference':             t('rd_inference'),
    'vocabulary in context': t('rd_vocab_context'),
    'main idea':             t('rd_main_idea'),
    'author intention':      t('rd_author'),
    'logical conclusion':    t('rd_conclusion'),
  };
  const typeLabel = typeMap[q.type] || q.type;

  return `
    <div class="card" id="q-card-${qi}" style="margin-bottom:10px">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">
        <span style="font-size:12px;font-weight:500;color:var(--text3)">
          ${t('rd_q_label')} ${qi+1}
        </span>
        <span class="chip chip-a" style="font-size:10px">${typeLabel}</span>
      </div>
      <div style="font-size:14px;font-weight:500;line-height:1.6;margin-bottom:12px">
        ${q.question}
      </div>
      ${q.options.map((opt,oi) => `
        <div onclick="selectAnswer(${qi},${oi},'${escStr(opt[0])}')"
          id="q${qi}opt${oi}"
          style="padding:12px 14px;border:0.5px solid var(--border);
            border-radius:10px;margin-bottom:7px;cursor:pointer;
            font-size:14px;transition:all 0.15s;
            display:flex;align-items:flex-start;gap:10px">
          <span style="width:24px;height:24px;border-radius:6px;
            background:var(--surface2);display:flex;align-items:center;
            justify-content:center;font-size:12px;font-weight:500;flex-shrink:0">
            ${opt[0]}
          </span>
          <span>${opt.substring(3)}</span>
        </div>`).join('')}
    </div>`;
}

// ===== SELECT ANSWER =====
function selectAnswer(qi, oi, letter) {
  if (RD.submitted) return;
  RD.answers[qi] = { letter, oi };

  for (let i=0; i<4; i++) {
    const el = document.getElementById(`q${qi}opt${i}`);
    if (!el) continue;
    const lbl = el.querySelector('span');
    el.style.border     = i===oi ? '1.5px solid var(--accent)' : '0.5px solid var(--border)';
    el.style.background = i===oi ? 'var(--accent-lt)' : '';
    el.style.color      = i===oi ? 'var(--accent)' : '';
    if (lbl) {
      lbl.style.background = i===oi ? 'var(--accent)' : 'var(--surface2)';
      lbl.style.color      = i===oi ? '#fff' : '';
    }
  }
}

// ===== SUBMIT =====
function submitReading() {
  if (RD.submitted) return;
  const answered = Object.keys(RD.answers).length;
  const total    = RD.questions.length;

  if (answered < total) {
    const rr = document.getElementById('reading-result');
    if (rr) rr.innerHTML = `
      <div class="feedback-box wrong" style="margin-top:8px">
        <div class="fb-title">${t('rd_not_complete')}</div>
        <div>${t('rd_not_complete_sub')} ${total-answered} ${t('rd_not_complete_sub2')}</div>
      </div>`;
    return;
  }

  RD.submitted = true;
  const btn = document.getElementById('btn-submit-reading');
  if (btn) btn.style.display = 'none';

  let correct = 0;
  RD.questions.forEach((q, qi) => {
    const userAns  = RD.answers[qi];
    const isCorrect = userAns && userAns.letter === q.answer;
    if (isCorrect) correct++;

    for (let i=0; i<4; i++) {
      const el        = document.getElementById(`q${qi}opt${i}`);
      if (!el) continue;
      const optLetter = q.options[i][0];
      const isUser    = userAns && userAns.oi === i;
      const isRight   = optLetter === q.answer;
      const lbl       = el.querySelector('span');

      el.style.cursor = 'default';
      if (isRight) {
        el.style.border     = '1.5px solid var(--success)';
        el.style.background = 'var(--success-lt)';
        el.style.color      = 'var(--success)';
        if (lbl) { lbl.style.background='var(--success)'; lbl.style.color='#fff'; }
      } else if (isUser && !isRight) {
        el.style.border     = '1.5px solid var(--danger)';
        el.style.background = 'var(--danger-lt)';
        el.style.color      = 'var(--danger)';
        if (lbl) { lbl.style.background='var(--danger)'; lbl.style.color='#fff'; }
      } else {
        el.style.border     = '0.5px solid var(--border)';
        el.style.background = '';
        el.style.color      = 'var(--text3)';
        if (lbl) { lbl.style.background='var(--surface2)'; lbl.style.color=''; }
      }
    }

    const card = document.getElementById(`q-card-${qi}`);
    if (card) {
      const div = document.createElement('div');
      div.className = `feedback-box ${isCorrect?'correct':'wrong'}`;
      div.style.marginTop = '8px';
      div.innerHTML = `
        <div class="fb-title">
          ${isCorrect ? t('quiz_result_great') : `${t('quiz_wrong')} — ${t('rd_q_label')} ${q.answer}`}
        </div>
        <div>${q.explanation||''}</div>`;
      card.appendChild(div);
    }
  });

  const acc = Math.round((correct/total)*100);
  let icon='📖', title=t('quiz_result_more');
  if (acc >= 80) { icon='🎉'; title=t('quiz_result_great'); }
  else if (acc >= 60) { icon='👍'; title=t('quiz_result_good'); }

  updateReadingStats(acc);

  const rr = document.getElementById('reading-result');
  if (rr) rr.innerHTML = `
    <div style="text-align:center;padding:20px 0 10px">
      <div style="font-size:40px;margin-bottom:6px">${icon}</div>
      <div style="font-size:18px;font-weight:500;margin-bottom:4px">${title}</div>
      <div style="font-size:13px;color:var(--text3);margin-bottom:16px">
        ${t('quiz_correct')} ${correct} / ${total} · ${acc}%
      </div>
    </div>
    <button class="btn-primary" onclick="generateReading()">
      <i class="ti ti-wand"></i> ${t('rd_new')}
    </button>
    <button class="btn-primary ghost" onclick="showPage('progress')">
      ${t('rd_see_progress')}
    </button>
  `;

  setTimeout(() => rr.scrollIntoView({ behavior:'smooth', block:'start' }), 300);
}

// ===== UPDATE STATS =====
function updateReadingStats(acc) {
  if (!STATE.readingHistory) STATE.readingHistory = [];
  STATE.readingHistory.push({
    date: new Date().toISOString(),
    level: STATE.level,
    difficulty: RD.difficulty,
    acc,
  });
  STATE.accuracy30.reading.push(acc);
  if (STATE.accuracy30.reading.length > 30) STATE.accuracy30.reading.shift();
  saveState();
}