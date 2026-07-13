// ===== ENTRY POINT =====
function showGrammarLevelSelect() {
  showPage('gramlearn');
}

// ===== SCREEN 1: LEVEL PICKER =====
function renderGrammarLevelPicker() {
  const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const html = levels.map(lv => {
    const count = GRAMMAR_TOPICS.filter(t => t.level === lv).length;
    return `
      <button class="mode-card" style="width:100%;text-align:left"
        onclick="selectGrammarLevel('${lv}')">
        <div class="mode-icon" style="background:var(--accent-lt);color:var(--accent)">
          <span style="font-weight:700">${lv}</span>
        </div>
        <div>
          <div class="mt">${lv}</div>
          <div class="ms">${count > 0 ? count + (STATE.lang==='en' ? ' topics' : ' หัวข้อ') : (STATE.lang==='en' ? 'Coming soon' : 'เร็วๆ นี้')}</div>
        </div>
        <i class="ti ti-chevron-right" style="margin-left:auto;color:var(--text3)"></i>
      </button>`;
  }).join('');

  document.getElementById('page-gramlearn').innerHTML = `
    <div class="topbar-back" onclick="showPage('study')" style="cursor:pointer;padding:8px 0">
      <i class="ti ti-arrow-left"></i> ${STATE.lang==='en' ? 'Back' : 'กลับ'}
    </div>
    <div class="sec-label">${STATE.lang==='en' ? 'Choose Grammar Level' : 'เลือกระดับแกรมม่า'}</div>
    ${html}
  `;
}

// ===== SCREEN 2: TOPIC LIST (per level) =====
function selectGrammarLevel(level) {
  STATE.grammarLevel = level;
  saveState();
  renderGrammarTopicList();
}

function renderGrammarTopicList() {
  const level = STATE.grammarLevel;
  const topics = GRAMMAR_TOPICS.filter(t => t.level === level);
  const seen = new Set();
  let cards = '';

  topics.forEach(topic => {
    if (seen.has(topic.id)) return;
    seen.add(topic.id);
    const partner = topic.pairedWith ? GRAMMAR_TOPICS.find(t => t.id === topic.pairedWith) : null;
    if (partner) seen.add(partner.id);

    const title = partner
      ? `${STATE.lang==='en' ? topic.name_en : topic.name_th} ↔ ${STATE.lang==='en' ? partner.name_en : partner.name_th}`
      : (STATE.lang==='en' ? topic.name_en : topic.name_th);

    const avgBox = partner ? Math.round((topic.box + partner.box) / 2) : topic.box;
    const pairKey = getBankKey(topic.id, partner ? partner.id : null);

    cards += `
      <div class="mode-card" onclick="openGrammarAnchor('${topic.id}')">
        <div class="mode-icon" style="background:var(--teal-lt);color:var(--teal)">
          <i class="ti ${topic.icon}"></i>
        </div>
        <div>
          <div class="mt">${title}</div>
          <div class="ms">${'▓'.repeat(avgBox)}${'░'.repeat(6-avgBox)} Box ${avgBox}/6</div>
        </div>
        <button class="btn-icon" style="margin-left:auto" onclick="event.stopPropagation(); startGrammarTopicTest('${pairKey}')" title="${STATE.lang==='en' ? 'Skip to test' : 'ข้ามไปทดสอบ'}">
          <i class="ti ti-player-play"></i>
        </button>
      </div>`;
  });

  document.getElementById('page-gramlearn').innerHTML = `
    <div class="topbar-back" onclick="renderGrammarLevelPicker()" style="cursor:pointer;padding:8px 0">
      <i class="ti ti-arrow-left"></i> ${level}
    </div>
    <div class="sec-label">${STATE.lang==='en' ? 'Topics' : 'หัวข้อ'}</div>
    ${cards || `<div class="ms" style="padding:20px;text-align:center">${STATE.lang==='en' ? 'No topics yet for this level' : 'ยังไม่มีเนื้อหาสำหรับระดับนี้'}</div>`}
  `;
}

// ===== HELPER: หา key ของ test bank จาก topic id คู่ =====
function getBankKey(idA, idB) {
  if (!idB) return idA;
  const key1 = `${idA}__${idB}`;
  const key2 = `${idB}__${idA}`;
  if (GRAMMAR_TEST_BANK[key1]) return key1;
  if (GRAMMAR_TEST_BANK[key2]) return key2;
  return key1;
}

// ===== SCREEN 3: ANCHOR (LEARN) SCREEN =====
function openGrammarAnchor(topicId) {
  const topic = GRAMMAR_TOPICS.find(t => t.id === topicId);
  const partner = topic.pairedWith ? GRAMMAR_TOPICS.find(t => t.id === topic.pairedWith) : null;
  const pairKey = getBankKey(topic.id, partner ? partner.id : null);

  const renderCard = (t, theme) => `
    <div class="anchor-card theme-${theme}">
      <i class="ti ${t.icon} anchor-icon"></i>
      <div class="anchor-title">${STATE.lang==='en' ? t.name_en : t.name_th}</div>
      <div class="anchor-metaphor">"${STATE.lang==='en' ? t.anchor_en : t.anchor_th}"</div>
      <div class="anchor-desc">${t.description_th}</div>
      <div class="anchor-structure">
        <b>+</b> ${t.structure_positive}<br>
        <b>−</b> ${t.structure_negative}<br>
        <b>?</b> ${t.structure_question}
      </div>
      <div class="anchor-examples">
        ${t.examples.map(ex => '• ' + ex).join('<br>')}
      </div>
    </div>`;

  document.getElementById('page-gramlearn').innerHTML = `
    <div class="topbar-back" onclick="renderGrammarTopicList()" style="cursor:pointer;padding:8px 0">
      <i class="ti ti-arrow-left"></i> ${STATE.lang==='en' ? 'Back' : 'กลับ'}
    </div>
    ${renderCard(topic, 'a')}
    ${partner ? renderCard(partner, 'b') : ''}
    <button class="btn-primary" style="width:100%;margin-top:8px" onclick="startGrammarTopicTest('${pairKey}')">
      ${STATE.lang==='en' ? 'Start Test' : 'เริ่มทดสอบ'}
    </button>
  `;
}

// ===== GRAMMAR TEST STATE =====
let GT = { pairKey: '', questions: [], idx: 0, answers: {}, submitted: false };

// ===== SCREEN 4: START TEST =====
function startGrammarTopicTest(pairKey) {
  const bank = GRAMMAR_TEST_BANK[pairKey];
  if (!bank || bank.length === 0) {
    alert(STATE.lang==='en' ? 'No test questions available yet for this topic.' : 'ยังไม่มีคำถามทดสอบสำหรับหัวข้อนี้');
    return;
  }
  GT = { pairKey, questions: bank, idx: 0, answers: {}, submitted: false };
  renderGrammarTest();
}

// ===== RENDER TEST QUESTION =====
function renderGrammarTest() {
  const q = GT.questions[GT.idx];
  const blanksHtml = q.blanks.map((b, bi) => `
    <div class="card" style="margin-bottom:10px">
      <div class="test-sentence">${b.sentence.replace('___', '<b style="color:var(--accent)">___</b>')}</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        ${b.options.map(opt => `
          <button class="opt-btn" id="gt-opt-${bi}-${escStr(opt)}"
            onclick="selectGrammarAnswer(${bi}, '${escStr(opt)}')">${opt}</button>
        `).join('')}
      </div>
    </div>`).join('');

  document.getElementById('page-gramlearn').innerHTML = `
    <div class="topbar-back" onclick="renderGrammarTopicList()" style="cursor:pointer;padding:8px 0">
      <i class="ti ti-x"></i> ${STATE.lang==='en' ? 'Exit test' : 'ออกจากทดสอบ'}
    </div>
    <div class="ms" style="margin-bottom:10px">${GT.idx + 1} / ${GT.questions.length}</div>
    <div class="situation-card">${q.situation_th}</div>
    ${blanksHtml}
    <button class="btn-primary" style="width:100%;margin-top:10px" id="btn-gt-submit"
      onclick="submitGrammarAnswer()" disabled>
      ${STATE.lang==='en' ? 'Check' : 'ตรวจคำตอบ'}
    </button>
  `;
}

// ===== SELECT ANSWER (ก่อนกดตรวจ) =====
function selectGrammarAnswer(blankIndex, option) {
  if (GT.submitted) return;
  GT.answers[blankIndex] = option;
  const q = GT.questions[GT.idx];
  q.blanks.forEach((b, bi) => {
    b.options.forEach(opt => {
      const el = document.getElementById(`gt-opt-${bi}-${escStr(opt)}`);
      if (el) el.classList.toggle('selected', GT.answers[bi] === opt);
    });
  });
  const allAnswered = q.blanks.every((_, bi) => GT.answers[bi] !== undefined);
  document.getElementById('btn-gt-submit').disabled = !allAnswered;
}

// ===== SUBMIT & GRADE =====
function submitGrammarAnswer() {
  if (GT.submitted) return;
  GT.submitted = true;
  const q = GT.questions[GT.idx];

  q.blanks.forEach((b, bi) => {
    const correct = GT.answers[bi] === b.answer;
    const topic = GRAMMAR_TOPICS.find(t => t.id === b.topicId);
    if (topic) {
      topic.seen = (topic.seen || 0) + 1;
      if (correct) topic.correct = (topic.correct || 0) + 1;
      moveGrammarBox(topic, correct ? 'up' : 'down');
      topic.lastSeen = Date.now();
    }
    b.options.forEach(opt => {
      const el = document.getElementById(`gt-opt-${bi}-${escStr(opt)}`);
      if (!el) return;
      if (opt === b.answer) el.classList.add('correct');
      else if (opt === GT.answers[bi]) el.classList.add('wrong');
      el.disabled = true;
    });
  });

  saveState();

  const nextBtn = document.createElement('button');
  nextBtn.className = 'btn-primary';
  nextBtn.style.cssText = 'width:100%;margin-top:12px';
  nextBtn.textContent = (GT.idx < GT.questions.length - 1)
    ? (STATE.lang==='en' ? 'Next →' : 'ข้อต่อไป →')
    : (STATE.lang==='en' ? 'Finish' : 'เสร็จสิ้น');
  nextBtn.onclick = nextGramTestQ;
  document.getElementById('page-gramlearn').appendChild(nextBtn);
}

// ===== MOVE BOX (ใช้ logic เดียวกับ vocab) =====
function moveGrammarBox(topic, dir) {
  if (dir === 'up' && topic.box < 6) topic.box++;
  if (dir === 'down' && topic.box > 1) topic.box--;
}

// ===== NEXT QUESTION / FINISH =====
function nextGramTestQ() {
  if (GT.idx < GT.questions.length - 1) {
    GT.idx++;
    GT.answers = {};
    GT.submitted = false;
    renderGrammarTest();
  } else {
    renderGrammarTestResult();
  }
}

// ===== RESULT SCREEN =====
function renderGrammarTestResult() {
  const topicIds = [...new Set(GT.questions.flatMap(q => q.blanks.map(b => b.topicId)))];
  const topics = topicIds.map(id => GRAMMAR_TOPICS.find(t => t.id === id));
  const avgBox = Math.round(topics.reduce((s, t) => s + t.box, 0) / topics.length);

  document.getElementById('page-gramlearn').innerHTML = `
    <div style="text-align:center;padding:30px 16px">
      <i class="ti ti-confetti" style="font-size:40px;color:var(--accent)"></i>
      <div style="font-size:20px;font-weight:700;margin:10px 0">
        ${STATE.lang==='en' ? 'Test Complete!' : 'ทดสอบเสร็จแล้ว!'}
      </div>
      <div class="ms" style="margin-bottom:20px">
        ${STATE.lang==='en' ? 'Current level' : 'ระดับความจำตอนนี้'}: Box ${avgBox}/6
      </div>
      <button class="btn-primary" style="width:100%" onclick="renderGrammarTopicList()">
        ${STATE.lang==='en' ? 'Back to topics' : 'กลับไปหน้าหัวข้อ'}
      </button>
    </div>
  `;
}
