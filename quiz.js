// ===== VOCAB QUIZ STATE =====
let QZ = {
  mode: 'vocab',
  queue: [],
  idx: 0,
  correct: 0,
  wrong: 0,
  answered: false,
  infoOpen: false,
};

// ===== BUILD QUEUE =====
function buildQueue(mode) {
  const weights = { 1:40, 2:25, 3:15, 4:10, 5:7, 6:3 };
  let pool = [];

  if (mode === 'weak') {
    pool = WORDS.filter(w => w.box <= 2);
  } else if (mode === 'mistakes') {
    pool = WORDS.filter(w => w.seen > 0 && (w.correct / w.seen) < 0.5);
  } else if (mode === 'mixed' || mode === 'grammar') {
    WORDS.forEach(w => {
      const times = Math.ceil((weights[w.box] || 3) / 10);
      for (let i = 0; i < times; i++) pool.push(w);
    });
  } else {
    pool = [...WORDS];
  }

  if (pool.length === 0) pool = [...WORDS];
  return shuffle(pool).slice(0, 10);
}

// ===== START QUIZ =====
function startVocabQuiz(mode) {
  QZ = { mode, queue: buildQueue(mode), idx: 0, correct: 0, wrong: 0, answered: false, infoOpen: false };
  showPage('quiz');
  renderQuizQuestion();
}

// ===== RENDER QUIZ PAGE =====
function renderQuizQuestion() {
  const total = QZ.queue.length;
  if (QZ.idx >= total) { renderQuizResult(); return; }

  const w   = QZ.queue[QZ.idx];
  const pct = Math.round((QZ.idx/total)*100);
  const modeLabels = {
    vocab:   t('study_vocab'),
    weak:    t('study_weak'),
    mistakes:t('study_mistakes'),
    mixed:   t('study_mixed'),
    grammar: t('study_vocab_grammar'),
  };

  document.getElementById('page-quiz').innerHTML = `
    <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 0 10px">
      <div style="display:flex;align-items:center;gap:10px">
        <button class="btn-icon" onclick="showPage('study')" aria-label="back">
          <i class="ti ti-arrow-left"></i>
        </button>
        <span style="font-size:15px;font-weight:500">${modeLabels[QZ.mode]||'Quiz'}</span>
      </div>
      <span style="font-size:13px;color:var(--text3)">${QZ.idx+1} / ${total}</span>
    </div>

    <div style="height:5px;background:var(--surface2);border-radius:99px;
      margin-bottom:12px;overflow:hidden">
      <div style="height:100%;width:${pct}%;background:var(--accent);
        border-radius:99px;transition:width 0.4s"></div>
    </div>

    <div style="font-size:12px;color:var(--text3);text-align:center;margin-bottom:14px">
      ${t('quiz_correct')} ${QZ.correct} · ${t('quiz_wrong')} ${QZ.wrong} · ${t('quiz_remain')} ${total-QZ.idx}
    </div>

    <div id="quiz-info-panel" class="info-panel ${QZ.infoOpen?'open':''}">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px">
        <div>
          <div style="font-size:20px;font-weight:500">${w.word}
            <span style="font-size:12px;font-weight:400;color:var(--accent);margin-left:6px">${w.level}</span>
          </div>
          <div style="font-size:13px;color:var(--text3);margin-top:2px">
            🇬🇧 ${w.ipa_uk} &nbsp; 🇺🇸 ${w.ipa_us}
          </div>
          <div style="font-size:12px;color:var(--text3);margin-top:3px">
            ${w.partOfSpeech.join(' · ')}
          </div>
        </div>
        <button class="btn-sm" onclick="speakWord('${w.word}')">
          <i class="ti ti-volume"></i> ${t('quiz_speak')}
        </button>
      </div>
      <div class="info-lbl">${t('quiz_meaning')}</div>
      ${w.meanings.map(m => `
        <div style="margin-bottom:8px">
          <span style="font-size:11px;background:var(--teal-lt);color:var(--teal);
            padding:2px 8px;border-radius:99px;font-weight:500">${m.pos}</span>
          <div style="font-size:15px;font-weight:500;color:var(--accent);margin-top:4px">${m.th}</div>
          <div style="font-size:13px;color:var(--text2);margin-top:2px">${m.en}</div>
        </div>`).join('')}
      ${w.antonyms && w.antonyms.length > 0 ? `
        <div class="info-lbl" style="margin-top:8px">Antonyms</div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px">
          ${w.antonyms.map(a =>
            `<span style="background:var(--danger-lt);color:var(--danger);
              padding:3px 10px;border-radius:99px;font-size:12px">${a}</span>`
          ).join('')}
        </div>` : ''}
      <div class="info-lbl" style="margin-top:8px">${t('quiz_example')}</div>
      ${w.examples.map(ex=>`<div class="info-ex">${ex}</div>`).join('')}
    </div>

    <div class="word-card">
      <div class="word-main">${w.word}</div>
      <div class="word-ipa">🇬🇧 ${w.ipa_uk} &nbsp; 🇺🇸 ${w.ipa_us}</div>
      <div style="font-size:12px;color:var(--text3);margin-top:2px">${w.partOfSpeech.join(' · ')}</div>
      <div class="word-actions">
        <button class="btn-sm" onclick="speakWord('${w.word}')">
          <i class="ti ti-volume"></i> ${t('quiz_speak')}
        </button>
        <button class="btn-sm" onclick="toggleQuizInfo()">
          <i class="ti ti-info-circle"></i> ${t('quiz_info')}
        </button>
      </div>
    </div>

    <div style="font-size:12px;color:var(--text3);margin-bottom:10px">
      ${t('quiz_answer_q')}
    </div>

    <div id="choices-wrap"></div>
    <div id="quiz-feedback"></div>
    <button id="btn-quiz-next" class="btn-primary" style="display:none"
      onclick="nextQuizQuestion()">
      ${t('quiz_next')}
    </button>
  `;

  renderChoices(w);
}

// ===== RENDER CHOICES =====
function renderChoices(w) {
  const correct = w.meanings[0].th;
  const allThai = WORDS
    .filter(x => x.word !== w.word)
    .map(x => x.meanings[0].th)
    .filter(x => x !== correct);
  const distractors = shuffle(allThai).slice(0, 3);
  const options = shuffle([correct, ...distractors]);
  const letters = ['A','B','C','D'];
  const wrap = document.getElementById('choices-wrap');
  wrap.innerHTML = options.map((opt, i) => `
    <button class="choice-btn" onclick="answerQuiz(${i}, '${escStr(opt)}', '${escStr(correct)}')">
      <span class="choice-letter">${letters[i]}</span>
      <span>${opt}</span>
    </button>
  `).join('');
}

// ===== ANSWER =====
function answerQuiz(idx, chosen, correct) {
  if (QZ.answered) return;
  QZ.answered = true;

  const w    = QZ.queue[QZ.idx];
  w.seen++;
  const isCorrect = chosen === correct;
  const btns = document.querySelectorAll('.choice-btn');
  btns.forEach(b => b.disabled = true);

  if (isCorrect) {
    QZ.correct++; w.correct++;
    btns[idx].classList.add('correct');
    btns[idx].querySelector('.choice-letter').textContent = '✓';
    moveBox(w, 'up');
  } else {
    QZ.wrong++;
    btns[idx].classList.add('wrong');
    btns[idx].querySelector('.choice-letter').textContent = '✗';
    moveBox(w, 'down');
    btns.forEach(b => {
      if (b.querySelectorAll('span')[1].textContent === correct) b.classList.add('reveal');
    });
  }

  w.lastSeen = Date.now();
  updateGrammarStatsToday();
  saveState();

  const fb = document.getElementById('quiz-feedback');
  if (isCorrect) {
    fb.innerHTML = `<div class="feedback-box correct">
      <div class="fb-title">${t('quiz_result_great')}</div>
      <div>${w.word} = ${w.thai}</div>
    </div>`;
  } else {
    fb.innerHTML = `<div class="feedback-box wrong">
      <div class="fb-title">${t('quiz_wrong')} — "${correct}"</div>
      <div>${w.def}</div>
    </div>`;
  }

  document.getElementById('btn-quiz-next').style.display = 'block';

  if (QZ.mode === 'grammar') {
    setTimeout(() => {
      const gq = GRAMMAR_QUESTIONS[QZ.idx % GRAMMAR_QUESTIONS.length];
      if (gq) appendGrammarChallenge(gq);
    }, 400);
  }
}

// ===== MOVE BOX =====
function moveBox(w, dir) {
  const prev = w.box;
  if (dir === 'up' && w.box < 6) w.box++;
  if (dir === 'down' && w.box > 1) w.box--;
  if (w.box !== prev) {
    STATE.boxes[prev] = Math.max(0, (STATE.boxes[prev] || 0) - 1);
    STATE.boxes[w.box] = (STATE.boxes[w.box] || 0) + 1;
  }
}

// ===== GRAMMAR CHALLENGE INLINE =====
function appendGrammarChallenge(gq) {
  const fb = document.getElementById('quiz-feedback');
  if (!fb) return;
  const gInfo = GRAMMAR_DB[gq.topic];
  const letters = ['A','B','C','D'];
  const opts = shuffle(gq.options);

  fb.insertAdjacentHTML('beforeend', `
    <hr class="divider">
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">
      <span style="background:var(--teal-lt);color:var(--teal);border-radius:8px;padding:5px 12px;font-size:13px;font-weight:500">
        <i class="ti ti-grammar"></i> ${gq.topic}
      </span>
    </div>

    <button class="btn-sm" style="width:100%;justify-content:space-between;margin-bottom:8px" onclick="toggleGrammarInfoInline()">
      <span><i class="ti ti-info-circle" style="color:var(--teal)"></i> ดูอธิบายแกรมม่า (ภาษาไทย)</span>
      <i class="ti ti-chevron-down" id="gi-chev"></i>
    </button>

    <div id="grammar-info-inline" style="display:none;background:var(--surface);border:0.5px solid var(--border);border-radius:12px;padding:14px;margin-bottom:10px">
      <div class="gi-title">${gq.topic}</div>
      <div class="info-lbl">ใช้เมื่อ</div>
      <div class="gi-text" style="margin-bottom:8px">${gInfo.use}</div>
      <div class="info-lbl">โครงสร้าง</div>
      <div class="gi-structure">${gInfo.structure}</div>
      <div class="info-lbl" style="margin-top:8px">ตัวอย่าง</div>
      ${gInfo.examples.map(ex => `<div class="gi-ex">${ex}</div>`).join('')}
    </div>

    <div style="font-size:13px;color:var(--text2);margin-bottom:10px;line-height:1.6">
      เติมช่องว่าง: <strong>${gq.sentence.replace('___', '<span style="color:var(--teal);font-weight:600">___</span>')}</strong>
    </div>

    <div id="grammar-choices">
      ${opts.map((opt, i) => `
        <button class="choice-btn" style="border-color:var(--teal-mid)" 
          onclick="answerGrammarInline('${escStr(opt)}','${escStr(gq.answer)}','${escStr(gq.explanation)}',this)">
          <span class="choice-letter">${letters[i]}</span>
          <span>${opt}</span>
        </button>
      `).join('')}
    </div>
    <div id="grammar-feedback-inline"></div>
  `);
}

function toggleGrammarInfoInline() {
  const el = document.getElementById('grammar-info-inline');
  const chev = document.getElementById('gi-chev');
  if (!el) return;
  const open = el.style.display === 'block';
  el.style.display = open ? 'none' : 'block';
  if (chev) chev.style.transform = open ? '' : 'rotate(180deg)';
}

function answerGrammarInline(chosen, correct, explanation, btn) {
  const btns = document.querySelectorAll('#grammar-choices .choice-btn');
  btns.forEach(b => b.disabled = true);
  const isCorrect = chosen === correct;
  const letters = ['A','B','C','D'];
  const idx = Array.from(btns).indexOf(btn);

  if (isCorrect) {
    btn.classList.add('correct');
    btn.querySelector('.choice-letter').textContent = '✓';
    if (STATE.grammarStats[QZ.queue[QZ.idx]?.topic || 'Past Simple']) {
      STATE.grammarStats[QZ.queue[QZ.idx]?.topic || 'Past Simple'].correct++;
    }
  } else {
    btn.classList.add('wrong');
    btn.querySelector('.choice-letter').textContent = '✗';
    btns.forEach(b => {
      if (b.querySelectorAll('span')[1].textContent === correct) b.classList.add('reveal');
    });
  }

  const gfb = document.getElementById('grammar-feedback-inline');
  if (gfb) {
    gfb.innerHTML = isCorrect
      ? `<div class="feedback-box correct" style="margin-top:8px"><div class="fb-title">ถูกต้อง!</div><div>${explanation}</div></div>`
      : `<div class="feedback-box wrong" style="margin-top:8px"><div class="fb-title">ผิด — คำตอบที่ถูกคือ "${correct}"</div><div>${explanation}</div></div>`;
  }
  saveState();
}

// ===== TOGGLE INFO =====
function toggleQuizInfo() {
  QZ.infoOpen = !QZ.infoOpen;
  const panel = document.getElementById('quiz-info-panel');
  if (panel) panel.classList.toggle('open', QZ.infoOpen);
}

// ===== NEXT QUESTION =====
function nextQuizQuestion() {
  QZ.idx++;
  QZ.answered = false;
  QZ.infoOpen = false;
  renderQuizQuestion();
}

// ===== UPDATE TODAY STATS =====
function updateGrammarStatsToday() {
  STATE.todayNew = Math.min(STATE.dailyGoal, STATE.todayNew + 1);
  STATE.velocity7[STATE.velocity7.length - 1] = STATE.todayNew;
}

// ===== RESULT SCREEN =====
function renderQuizResult() {
  const total = QZ.correct + QZ.wrong;
  const acc   = total > 0 ? Math.round((QZ.correct/total)*100) : 0;
  let icon = '📖', title = t('quiz_result_more');
  if (acc >= 80) { icon='🎉'; title=t('quiz_result_great'); }
  else if (acc >= 60) { icon='💪'; title=t('quiz_result_good'); }

  STATE.todayAccuracy = Math.round((STATE.todayAccuracy+acc)/2);
  saveState();

  const boxLabels = ['',t('very_weak'),t('weak'),t('learning'),t('good'),t('strong'),t('master')];
  const boxHTML = [1,2,3,4,5,6].map(n => `
    <div class="bx b${n}">
      <div class="bn">${n}</div>
      <div class="bl">${boxLabels[n]}</div>
      <div class="bc">${STATE.boxes[n]||0}</div>
    </div>`).join('');

  document.getElementById('page-quiz').innerHTML = `
    <div class="result-icon">${icon}</div>
    <div class="result-title">${title}</div>
    <div class="result-sub">
      ${t('quiz_done')} ${total} ${t('quiz_words')} · accuracy ${acc}%
    </div>

    <div class="grid4" style="margin-bottom:14px">
      <div class="stat-mini">
        <div class="val" style="color:var(--success)">${QZ.correct}</div>
        <div class="lbl">${t('quiz_correct')}</div>
      </div>
      <div class="stat-mini">
        <div class="val" style="color:var(--danger)">${QZ.wrong}</div>
        <div class="lbl">${t('quiz_wrong')}</div>
      </div>
      <div class="stat-mini"><div class="val">${acc}%</div><div class="lbl">accuracy</div></div>
      <div class="stat-mini"><div class="val">${STATE.streak}</div><div class="lbl">streak</div></div>
    </div>

    <div class="card" style="margin-bottom:14px">
      <div class="card-title">${t('home_memory')}</div>
      <div class="box-row">${boxHTML}</div>
    </div>

    <button class="btn-primary" onclick="startVocabQuiz('${QZ.mode}')">
      ${t('quiz_play_again')}
    </button>
    <button class="btn-primary ghost" onclick="showPage('study')">
      ${t('quiz_back_menu')}
    </button>
  `;
}

// ===== ESCAPE STRING (for onclick attrs) =====
function escStr(s) {
  return (s || '').replace(/'/g, "\\'").replace(/"/g, '&quot;');
}
