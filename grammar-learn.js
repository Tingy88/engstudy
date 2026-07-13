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

  const renderCard = (t) => `
    <div class="card" style="margin-bottom:12px">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
        <i class="ti ${t.icon}" style="font-size:24px;color:var(--teal)"></i>
        <div style="font-weight:700">${STATE.lang==='en' ? t.name_en : t.name_th}</div>
      </div>
      <div class="ms" style="font-style:italic;margin-bottom:6px">
        "${STATE.lang==='en' ? t.anchor_en : t.anchor_th}"
      </div>
      <div class="ms" style="margin-bottom:8px">${t.description_th}</div>
      <div style="font-size:13px;line-height:1.8">
        <b>+</b> ${t.structure_positive}<br>
        <b>−</b> ${t.structure_negative}<br>
        <b>?</b> ${t.structure_question}
      </div>
      <div class="ms" style="margin-top:8px">
        ${t.examples.map(ex => '• ' + ex).join('<br>')}
      </div>
    </div>`;

  document.getElementById('page-gramlearn').innerHTML = `
    <div class="topbar-back" onclick="renderGrammarTopicList()" style="cursor:pointer;padding:8px 0">
      <i class="ti ti-arrow-left"></i> ${STATE.lang==='en' ? 'Back' : 'กลับ'}
    </div>
    ${renderCard(topic)}
    ${partner ? renderCard(partner) : ''}
    <button class="btn-primary" style="width:100%;margin-top:8px" onclick="startGrammarTopicTest('${pairKey}')">
      ${STATE.lang==='en' ? 'Start Test' : 'เริ่มทดสอบ'}
    </button>
  `;
}
