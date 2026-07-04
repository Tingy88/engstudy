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
      <div>${w.word} = ${w.meanings[0].th}</div>
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
      appendGrammarChallenge(w);
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
function appendGrammarChallenge(w) {
  const fb = document.getElementById('quiz-feedback');
  if (!fb) return;
  fb.insertAdjacentHTML('beforeend', `
    <hr class="divider">
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">
      <span style="background:var(--teal-lt);color:var(--teal);border-radius:8px;padding:5px 12px;font-size:13px;font-weight:500">
        <i class="ti ti-pencil"></i> Grammar + ${w.word}
      </span>
    </div>
    <div style="display:flex;gap:4px;margin-bottom:12px;background:var(--surface2);border-radius:8px;padding:3px">
      <button id="gr-inline-mode-choice" onclick="switchInlineMode('choice','${escStr(w.word)}')" style="flex:1;padding:7px;border:none;border-radius:6px;font-size:12px;cursor:pointer;font-weight:500;background:var(--surface);color:var(--teal);border:0.5px solid var(--border)">${t('gr_choice')}</button>
      <button id="gr-inline-mode-free" onclick="switchInlineMode('free','${escStr(w.word)}')" style="flex:1;padding:7px;border:none;border-radius:6px;font-size:12px;cursor:pointer;font-weight:500;background:none;color:var(--text3);border:none">${t('gr_free')}</button>
    </div>
    <div id="gr-inline-content-area"></div>
    <div id="grammar-feedback-inline"></div>
  `);
  switchInlineMode('choice', w.word);
}

function switchInlineMode(mode, word) {
  const cBtn = document.getElementById('gr-inline-mode-choice');
  const fBtn = document.getElementById('gr-inline-mode-free');
  cBtn.style.background = mode==='choice'?'var(--surface)':'none'; cBtn.style.color = mode==='choice'?'var(--teal)':'var(--text3)'; cBtn.style.border = mode==='choice'?'0.5px solid var(--border)':'none';
  fBtn.style.background = mode==='free'?'var(--surface)':'none'; fBtn.style.color = mode==='free'?'var(--teal)':'var(--text3)'; fBtn.style.border = mode==='free'?'0.5px solid var(--border)':'none';
  
  const area = document.getElementById('gr-inline-content-area');
  if (mode === 'choice') {
    area.innerHTML = `<div style="text-align:center;padding:20px;color:var(--text3);font-size:13px">${t('rd_generating')}</div>`;
    fetch('/api/gemini', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ contents:[{parts:[{text:`Create 1 multiple choice question testing correct grammar use of the word "${word}". Make 3 wrong options with common mistakes. Reply ONLY JSON: {"question":"...","options":["A...","B...","C...","D..."],"answer":"A","explanation":"Thai explanation"}`}]}] }) })
    .then(r=>r.json()).then(data=>{
      try{ const q=JSON.parse(data.candidates[0].content.parts[0].text.replace(/```json|```/g,'').trim());
        area.innerHTML=`<div style="font-size:14px;font-weight:500;margin-bottom:12px;line-height:1.5">${q.question}</div>${q.options.map((opt,i)=>`<button class="choice-btn" onclick="answerGrammarInlineChoice(${i},'${escStr(opt[0])}','${escStr(q.answer)}','${escStr(q.explanation)}')"><span class="choice-letter">${['A','B','C','D'][i]}</span><span style="text-align:left;line-height:1.5">${opt.substring(3)}</span></button>`).join('')}`;
      }catch(e){ area.innerHTML=`<div style="color:var(--danger);font-size:13px">${t('rd_error')}</div>`; }
    }).catch(()=>{ area.innerHTML=`<div style="color:var(--danger);font-size:13px">${t('gr_no_api')}</div>`; });
  } else {
    area.innerHTML=`<div style="font-size:14px;color:var(--text2);margin-bottom:10px">${t('gr_use_word')} <strong style="color:var(--accent)">"${word}"</strong> ${t('gr_create')}</div><textarea id="gr-inline-input" placeholder="${STATE.lang==='en'?'Type your sentence here...':'พิมพ์ประโยคของคุณที่นี่...'}" maxlength="300" oninput="grInlineCheckLength(this)" style="width:100%;border:0.5px solid var(--border2);border-radius:10px;padding:12px 14px;font-size:14px;font-family:inherit;resize:none;min-height:80px;background:var(--surface);color:var(--text);outline:none;margin-bottom:4px"></textarea><div style="display:flex;justify-content:space-between;margin-bottom:10px"><div style="font-size:11px;color:var(--text3)">${t('gr_ai_note')}</div><div style="font-size:11px;color:var(--text3)"><span id="gr-inline-count">0</span>/300</div></div><button class="btn-primary teal" id="gr-inline-check-btn" onclick="checkGrammarInline('${escStr(word)}')" disabled style="margin-bottom:0">${t('gr_check')}</button>`;
  }
}

function grInlineCheckLength(el) {
  const c = document.getElementById('gr-inline-count'); if(c) c.textContent=el.value.length;
  const b = document.getElementById('gr-inline-check-btn'); if(b) b.disabled=el.value.trim().length<5;
}

function checkGrammarInline(word) {
  const input = document.getElementById('gr-inline-input'); const sentence = input?input.value.trim():''; if(!sentence)return;
  const btn = document.getElementById('gr-inline-check-btn'); if(btn) btn.disabled=true;
  const fb = document.getElementById('grammar-feedback-inline');
  fb.innerHTML=`<div class="feedback-box teal" style="margin-top:8px"><div class="fb-title">${t('gr_checking')}</div></div>`;
  fetch('/api/gemini', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ contents:[{parts:[{text:`You are a strict English grammar evaluator. Check grammar, spelling, word choice. The student MUST use the word "${word}". Reply ONLY JSON: {"correct":true/false,"corrected":"sentence","errors":["err"],"explanation":"Thai explanation"}\nStudent wrote: "${sentence}"`}]}] }) })
  .then(r=>r.json()).then(data=>{
    let res={correct:false,corrected:sentence,errors:[],explanation:''};
    try{ res=JSON.parse(data.candidates[0].content.parts[0].text.replace(/```json|```/g,'').trim()); }catch(e){}
    const errHTML=(res.errors||[]).map(e=>`<div style="display:flex;gap:6px;font-size:12px;margin-bottom:4px"><span style="color:var(--danger)">✗</span><span>${e}</span></div>`).join('');
    fb.innerHTML=res.correct?`<div class="feedback-box correct" style="margin-top:8px"><div class="fb-title">${t('gr_correct_all')}</div><div>${res.explanation}</div></div>`:`<div class="feedback-box wrong" style="margin-top:8px"><div class="fb-title">${t('gr_errors')}</div>${errHTML}<div style="margin-top:6px">${res.explanation}</div><div style="background:var(--surface2);border-radius:8px;padding:8px 10px;margin-top:8px;font-size:13px"><div style="font-size:11px;color:var(--text3);margin-bottom:3px">${t('gr_corrected')}</div><div style="color:var(--success);font-weight:500">${res.corrected}</div></div></div>`;
  }).catch(()=>{ fb.innerHTML=`<div class="feedback-box wrong" style="margin-top:8px"><div class="fb-title">${t('gr_no_api')}</div><div>${t('gr_no_api_sub')}</div></div>`; });
}

function answerGrammarInlineChoice(idx, chosen, correct, explanation) {
  const btns=document.querySelectorAll('#gr-inline-content-area .choice-btn'); btns.forEach(b=>b.disabled=true);
  const isCorrect=chosen===correct;
  if(isCorrect){ btns[idx].classList.add('correct'); btns[idx].querySelector('.choice-letter').textContent='✓'; }
  else{ btns[idx].classList.add('wrong'); btns[idx].querySelector('.choice-letter').textContent='✗'; btns.forEach(b=>{ if(b.querySelectorAll('span')[1].textContent.startsWith(correct)) b.classList.add('reveal'); }); }
  const gfb=document.getElementById('grammar-feedback-inline');
  if(gfb){ gfb.innerHTML=isCorrect?`<div class="feedback-box correct" style="margin-top:8px"><div class="fb-title">${t('quiz_result_great')}</div><div>${explanation}</div></div>`:`<div class="feedback-box wrong" style="margin-top:8px"><div class="fb-title">${t('gr_wrong_ans')} "${correct}"</div><div>${explanation}</div></div>`; }
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
