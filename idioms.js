// ===== IDIOM DATABASE =====
// IPA ทีละคำจาก Oxford Dictionary เรียงต่อกัน
// Box 1-2 = test ความหมาย, Box 3-4 = test บริบท, Box 5-6 = test ผสม

const IDIOMS = [
  // ===== A1 / A2 =====
  {
    idiom: 'break the ice',
    ipa: '/breɪk ðə aɪs/',
    level: 'A2',
    thai: 'ทำให้บรรยากาศผ่อนคลาย, เริ่มต้นการสนทนา',
    meaning: 'To do or say something to make people feel more relaxed in an awkward situation.',
    examples: [
      'He told a joke to break the ice at the meeting.',
      'She smiled and introduced herself to break the ice.',
    ],
    contexts: {
      correct: [
        'At the start of the conference, the host told a funny story to break the ice.',
        'Nobody knew each other, so she suggested a game to break the ice.',
      ],
      wrong: [
        'He broke the ice with a hammer to get water from the frozen lake.',
        'They broke the ice on the road so cars could drive safely.',
      ],
    },
    distractors_meaning: ['ทำลายข้อตกลง', 'หนีออกจากสถานการณ์', 'เริ่มทะเลาะวิวาท'],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    idiom: 'under the weather',
    ipa: '/ˈʌndə ðə ˈweðə/',
    level: 'A2',
    thai: 'ไม่สบาย, รู้สึกไม่ดี',
    meaning: 'To feel ill or not well.',
    examples: [
      'I\'m feeling a bit under the weather today.',
      'She stayed home because she was under the weather.',
    ],
    contexts: {
      correct: [
        'He skipped the party because he was feeling under the weather.',
        'She called in sick — she\'d been under the weather all week.',
      ],
      wrong: [
        'They stood under the weather to avoid getting wet in the rain.',
        'He went under the weather to check the temperature outside.',
      ],
    },
    distractors_meaning: ['กำลังโกรธมาก', 'กังวลเรื่องอากาศ', 'อยู่กลางแจ้ง'],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    idiom: 'hit the road',
    ipa: '/hɪt ðə rəʊd/',
    level: 'A2',
    thai: 'ออกเดินทาง, เริ่มเดินทาง',
    meaning: 'To begin a journey or leave a place.',
    examples: [
      'It\'s getting late — we should hit the road.',
      'They packed their bags and hit the road early.',
    ],
    contexts: {
      correct: [
        'We need to hit the road by 6 AM to avoid traffic.',
        'After saying goodbye, she hit the road and drove north.',
      ],
      wrong: [
        'The car hit the road and caused a big accident.',
        'He hit the road with his fist because he was angry.',
      ],
    },
    distractors_meaning: ['หยุดพัก', 'ชนถนน', 'วิ่งออกกำลัง'],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },

  // ===== B1 =====
  {
    idiom: 'bite the bullet',
    ipa: '/baɪt ðə ˈbʊlɪt/',
    level: 'B1',
    thai: 'อดทนทำในสิ่งที่ยากหรือเจ็บปวด',
    meaning: 'To endure a painful or difficult situation that is unavoidable.',
    examples: [
      'I hate going to the dentist, but I\'ll just have to bite the bullet.',
      'She bit the bullet and apologised even though it was hard.',
    ],
    contexts: {
      correct: [
        'The surgery was scary, but he bit the bullet and went through with it.',
        'She bit the bullet and told her boss she needed a raise.',
      ],
      wrong: [
        'He bit the bullet at the shooting range during practice.',
        'The soldier bit the bullet to check if it was real gold.',
      ],
    },
    distractors_meaning: ['หลีกเลี่ยงปัญหา', 'ยิงปืน', 'โกรธมากจนพูดไม่ออก'],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    idiom: 'burn bridges',
    ipa: '/bɜːn ˈbrɪdʒɪz/',
    level: 'B1',
    thai: 'ทำลายความสัมพันธ์จนกลับไม่ได้',
    meaning: 'To permanently damage a relationship by doing something that cannot be undone.',
    examples: [
      'Don\'t burn bridges with your old employer — you might need them.',
      'He quit angrily and burned every bridge on his way out.',
    ],
    contexts: {
      correct: [
        'She left the company professionally, not wanting to burn bridges.',
        'Arguing publicly with your client is a sure way to burn bridges.',
      ],
      wrong: [
        'The army burned bridges to stop the enemy from crossing the river.',
        'They burned the bridges made of wood because they were too old.',
      ],
    },
    distractors_meaning: ['สร้างมิตรภาพใหม่', 'เดินทางกลับบ้าน', 'ลืมอดีต'],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    idiom: 'on the fence',
    ipa: '/ɒn ðə fens/',
    level: 'B1',
    thai: 'ยังไม่ตัดสินใจ, ลังเลอยู่',
    meaning: 'Undecided between two options; not committed to either side.',
    examples: [
      'I\'m still on the fence about which university to choose.',
      'She was on the fence about accepting the job offer.',
    ],
    contexts: {
      correct: [
        'He\'s been on the fence about moving abroad for months.',
        'The voters were on the fence, so both candidates campaigned hard.',
      ],
      wrong: [
        'The cat sat on the fence and watched the birds in the garden.',
        'He climbed on the fence to get a better view of the field.',
      ],
    },
    distractors_meaning: ['ตัดสินใจแน่วแน่แล้ว', 'อยู่นอกเขต', 'ปฏิเสธข้อเสนอ'],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    idiom: 'cost an arm and a leg',
    ipa: '/kɒst ən ɑːm ənd ə leɡ/',
    level: 'B1',
    thai: 'แพงมาก, ราคาสูงมาก',
    meaning: 'To be extremely expensive.',
    examples: [
      'That bag costs an arm and a leg — I can\'t afford it.',
      'Renting in the city centre costs an arm and a leg.',
    ],
    contexts: {
      correct: [
        'The repair bill cost an arm and a leg — nearly two thousand dollars.',
        'Travelling first class costs an arm and a leg.',
      ],
      wrong: [
        'The accident cost him an arm and a leg in the hospital.',
        'She lost an arm and a leg when she fell off the ladder.',
      ],
    },
    distractors_meaning: ['ถูกมาก', 'ต้องใช้แรงงานมาก', 'เสียเวลานาน'],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    idiom: 'get cold feet',
    ipa: '/ɡet kəʊld fiːt/',
    level: 'B1',
    thai: 'ขาดความกล้า, ถอยกลับเพราะกลัว',
    meaning: 'To suddenly become nervous or hesitant about doing something.',
    examples: [
      'He got cold feet and cancelled the presentation at the last minute.',
      'She got cold feet before jumping into the pool.',
    ],
    contexts: {
      correct: [
        'He was going to invest, but got cold feet when he saw the risks.',
        'She got cold feet before her wedding and needed time to think.',
      ],
      wrong: [
        'He got cold feet after standing barefoot on the frozen ground.',
        'She wore thick socks so she wouldn\'t get cold feet in winter.',
      ],
    },
    distractors_meaning: ['รู้สึกตื่นเต้น', 'เตรียมพร้อมอย่างดี', 'มีความมั่นใจสูง'],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },

  // ===== B2 =====
  {
    idiom: 'spill the beans',
    ipa: '/spɪl ðə biːnz/',
    level: 'B2',
    thai: 'เปิดเผยความลับโดยไม่ตั้งใจ',
    meaning: 'To reveal secret information, usually by accident.',
    examples: [
      'Don\'t spill the beans about the surprise party.',
      'He spilled the beans about the company\'s plans.',
    ],
    contexts: {
      correct: [
        'She accidentally spilled the beans about the merger during lunch.',
        'Who spilled the beans? Everyone knows about the surprise now.',
      ],
      wrong: [
        'He spilled the beans all over the kitchen floor while cooking.',
        'She spilled the beans from the bag into the pot of boiling water.',
      ],
    },
    distractors_meaning: ['เก็บความลับไว้ดีมาก', 'ทำอาหาร', 'โกหกอย่างชำนาญ'],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    idiom: 'hit the nail on the head',
    ipa: '/hɪt ðə neɪl ɒn ðə hed/',
    level: 'B2',
    thai: 'พูดหรือทำได้ถูกต้องแม่นยำ',
    meaning: 'To describe exactly what is causing a situation or problem.',
    examples: [
      'You hit the nail on the head — that\'s exactly the problem.',
      'Her analysis hit the nail on the head.',
    ],
    contexts: {
      correct: [
        'When she said the team lacked direction, she hit the nail on the head.',
        'His report hit the nail on the head about why sales were falling.',
      ],
      wrong: [
        'The carpenter hit the nail on the head with a single strike.',
        'He hit the nail on the head while building the wooden shelf.',
      ],
    },
    distractors_meaning: ['เดาผิดทั้งหมด', 'พูดเกินจริง', 'หลีกเลี่ยงปัญหา'],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    idiom: 'beat around the bush',
    ipa: '/biːt əˈraʊnd ðə bʊʃ/',
    level: 'B2',
    thai: 'พูดอ้อมค้อม ไม่พูดตรงๆ',
    meaning: 'To avoid talking about what is important; to not speak directly.',
    examples: [
      'Stop beating around the bush and tell me what happened.',
      'She beat around the bush for ten minutes before asking for money.',
    ],
    contexts: {
      correct: [
        'He kept beating around the bush instead of giving a clear answer.',
        'Don\'t beat around the bush — just say what you mean.',
      ],
      wrong: [
        'The hunters beat around the bush to scare the animals out.',
        'She beat around the bush with a stick to check for snakes.',
      ],
    },
    distractors_meaning: ['พูดตรงๆ ไม่อ้อมค้อม', 'ตัดสินใจเร็ว', 'ปฏิเสธอย่างสุภาพ'],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    idiom: 'the ball is in your court',
    ipa: '/ðə bɔːl ɪz ɪn jɔː kɔːt/',
    level: 'B2',
    thai: 'ตอนนี้เป็นการตัดสินใจของคุณแล้ว',
    meaning: 'It is now up to you to take action or make a decision.',
    examples: [
      'I\'ve made my offer — the ball is in your court now.',
      'She gave him a chance to explain, so the ball was in his court.',
    ],
    contexts: {
      correct: [
        'We\'ve done everything we can. The ball is in their court now.',
        'He sent the proposal — the ball is in the client\'s court.',
      ],
      wrong: [
        'The referee said the ball is in your court, meaning it landed there.',
        'The tennis player checked if the ball was in the court or out.',
      ],
    },
    distractors_meaning: ['คุณไม่มีทางเลือกแล้ว', 'คุณแพ้การแข่งขัน', 'ถึงเวลาหยุดพัก'],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },

  // ===== C1 =====
  {
    idiom: 'bite off more than you can chew',
    ipa: '/baɪt ɒf mɔː ðən juː kæn tʃuː/',
    level: 'C1',
    thai: 'รับงานหรือความรับผิดชอบมากเกินความสามารถ',
    meaning: 'To take on more responsibility than you can handle.',
    examples: [
      'She bit off more than she could chew by taking three jobs at once.',
      'Don\'t bite off more than you can chew with this project.',
    ],
    contexts: {
      correct: [
        'He agreed to lead five projects and clearly bit off more than he could chew.',
        'Starting three businesses at once — she really bit off more than she could chew.',
      ],
      wrong: [
        'He bit off more than he could chew when he tried to eat the huge sandwich.',
        'The child bit off more than she could chew and had to spit it out.',
      ],
    },
    distractors_meaning: ['ทำงานน้อยกว่าที่ควร', 'ปฏิเสธงานทุกอย่าง', 'ทำงานได้อย่างยอดเยี่ยม'],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    idiom: 'cut corners',
    ipa: '/kʌt ˈkɔːnəz/',
    level: 'C1',
    thai: 'ทำงานอย่างลวกๆ เพื่อประหยัดเวลาหรือเงิน',
    meaning: 'To do something in the easiest or cheapest way, often by ignoring rules or quality.',
    examples: [
      'The builder cut corners and the roof collapsed within a year.',
      'Don\'t cut corners on safety equipment.',
    ],
    contexts: {
      correct: [
        'They cut corners during production, and the product failed quality tests.',
        'Cutting corners on training led to serious mistakes later.',
      ],
      wrong: [
        'She cut corners of the paper to make a rounded shape.',
        'He cut the corners of the fabric to fit it into the frame.',
      ],
    },
    distractors_meaning: ['ทำงานอย่างละเอียดถี่ถ้วน', 'เพิ่มงบประมาณ', 'ขอความช่วยเหลือ'],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    idiom: 'read between the lines',
    ipa: '/riːd bɪˌtwiːn ðə laɪnz/',
    level: 'C1',
    thai: 'อ่านความหมายแฝง, เข้าใจสิ่งที่ไม่ได้พูดตรงๆ',
    meaning: 'To understand the hidden or implied meaning in something written or said.',
    examples: [
      'Reading between the lines, I think she wants to resign.',
      'You have to read between the lines to understand his real intention.',
    ],
    contexts: {
      correct: [
        'His email sounded polite, but reading between the lines, he was furious.',
        'She read between the lines and realised the project was being cancelled.',
      ],
      wrong: [
        'He read between the lines of the poem for the hidden message written there.',
        'She read between the lines on the page using a magnifying glass.',
      ],
    },
    distractors_meaning: ['อ่านออกเสียงดังๆ', 'เข้าใจตามตัวอักษรเท่านั้น', 'ข้ามเนื้อหาที่ไม่สำคัญ'],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
];

// ===== IDIOM QUIZ STATE =====
let ID = {
  queue: [],
  idx: 0,
  correct: 0,
  wrong: 0,
  answered: false,
  infoOpen: false,
};

// ===== GET QUESTION TYPE BY BOX =====
function getIdiomQuestionType(box) {
  if (box <= 2) return 'meaning';
  if (box <= 4) return 'context';
  return Math.random() < 0.5 ? 'meaning' : 'context';
}

// ===== BUILD IDIOM QUEUE =====
function buildIdiomQueue(mode) {
  const level = STATE.level;
  const levelOrder = ['A1','A2','B1','B2','C1','C2'];
  const maxIdx = levelOrder.indexOf(level);
  const eligible = IDIOMS.filter(id =>
    levelOrder.indexOf(id.level) <= maxIdx
  );

  const weights = { 1:40, 2:25, 3:15, 4:10, 5:7, 6:3 };
  let pool = [];

  if (mode === 'weak') {
    pool = eligible.filter(id => id.box <= 2);
  } else if (mode === 'mixed') {
    eligible.forEach(id => {
      const times = Math.ceil((weights[id.box]||3) / 10);
      for (let i=0; i<times; i++) pool.push(id);
    });
  } else {
    pool = [...eligible];
  }

  if (!pool.length) pool = [...eligible];
  return shuffle(pool).slice(0, 10);
}

// ===== START IDIOM QUIZ =====
function startIdiomQuiz(mode) {
  ID = {
    mode,
    queue: buildIdiomQueue(mode),
    idx: 0, correct: 0, wrong: 0,
    answered: false, infoOpen: false,
  };
  showPage('idioms');
  renderIdiomQuestion();
}

// ===== RENDER IDIOM MENU =====
function renderIdiomMenu() {
  const eligible = IDIOMS.filter(id => {
    const levelOrder = ['A1','A2','B1','B2','C1','C2'];
    return levelOrder.indexOf(id.level) <= levelOrder.indexOf(STATE.level);
  });
  const total    = eligible.length;
  const weakCount = eligible.filter(id => id.box <= 2).length;
  const masteredCount = eligible.filter(id => id.box >= 6).length;
  const totalSeen = eligible.reduce((s,id) => s+(id.seen||0), 0);
  const totalCorrect = eligible.reduce((s,id) => s+(id.correct||0), 0);
  const overallAcc = totalSeen > 0 ? Math.round((totalCorrect/totalSeen)*100) : 0;

  const boxLabels = ['',t('very_weak'),t('weak'),t('learning'),t('good'),t('strong'),t('master')];
  const idiomBoxes = { 1:0,2:0,3:0,4:0,5:0,6:0 };
  eligible.forEach(id => { idiomBoxes[id.box] = (idiomBoxes[id.box]||0)+1; });

  const boxHTML = [1,2,3,4,5,6].map(n => `
    <div class="bx b${n}">
      <div class="bn">${n}</div>
      <div class="bl">${boxLabels[n]}</div>
      <div class="bc">${idiomBoxes[n]||0}</div>
    </div>`).join('');

  document.getElementById('page-idioms').innerHTML = `
    <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 0 14px">
      <div style="display:flex;align-items:center;gap:10px">
        <button class="btn-icon" onclick="showPage('study')" aria-label="back">
          <i class="ti ti-arrow-left"></i>
        </button>
        <span style="font-size:15px;font-weight:500">
          ${STATE.lang==='en' ? 'Idiom Practice' : 'ฝึกสำนวน'}
        </span>
      </div>
      <span class="chip chip-a">${STATE.level}</span>
    </div>

    <div class="grid4" style="margin-bottom:14px">
      <div class="stat-mini">
        <div class="val">${total}</div>
        <div class="lbl">${STATE.lang==='en'?'Total':'ทั้งหมด'}</div>
      </div>
      <div class="stat-mini">
        <div class="val" style="color:var(--success)">${overallAcc}%</div>
        <div class="lbl">accuracy</div>
      </div>
      <div class="stat-mini">
        <div class="val" style="color:var(--danger)">${weakCount}</div>
        <div class="lbl">${STATE.lang==='en'?'Weak':'ยังอ่อน'}</div>
      </div>
      <div class="stat-mini">
        <div class="val" style="color:var(--accent)">${masteredCount}</div>
        <div class="lbl">${STATE.lang==='en'?'Mastered':'จำได้แล้ว'}</div>
      </div>
    </div>

    <div class="card" style="margin-bottom:14px">
      <div class="card-title">Memory Box</div>
      <div class="box-row">${boxHTML}</div>
    </div>

    <div class="mode-card" onclick="startIdiomQuiz('all')">
      <div class="mode-icon" style="background:var(--accent-lt);color:var(--accent)">
        <i class="ti ti-book"></i>
      </div>
      <div>
        <div class="mt">${STATE.lang==='en'?'All Idioms':'สำนวนทั้งหมด'}</div>
        <div class="ms">${STATE.lang==='en'?'Meaning + context questions':'ความหมาย + บริบท ตามระดับ Box'}</div>
      </div>
      <i class="ti ti-chevron-right" style="margin-left:auto;color:var(--text3)"></i>
    </div>

    <div class="mode-card" onclick="startIdiomQuiz('weak')">
      <div class="mode-icon" style="background:var(--danger-lt);color:var(--danger)">
        <i class="ti ti-refresh"></i>
      </div>
      <div>
        <div class="mt">${STATE.lang==='en'?'Review weak idioms':'ทบทวนสำนวนที่ยังอ่อน'}</div>
        <div class="ms">${weakCount} ${STATE.lang==='en'?'idioms in Box 1–2':'สำนวน ใน Box 1–2'}</div>
      </div>
      <i class="ti ti-chevron-right" style="margin-left:auto;color:var(--text3)"></i>
    </div>

    <div class="mode-card" onclick="startIdiomQuiz('mixed')">
      <div class="mode-icon" style="background:var(--teal-lt);color:var(--teal)">
        <i class="ti ti-layout-grid"></i>
      </div>
      <div>
        <div class="mt">Mixed — Smart Review</div>
        <div class="ms">${STATE.lang==='en'?'Weighted by box level':'ถ่วงน้ำหนักตาม Box'}</div>
      </div>
      <i class="ti ti-chevron-right" style="margin-left:auto;color:var(--text3)"></i>
    </div>
  `;
}

// ===== RENDER QUESTION =====
function renderIdiomQuestion() {
  if (ID.idx >= ID.queue.length) { renderIdiomResult(); return; }

  const id    = ID.queue[ID.idx];
  const total = ID.queue.length;
  const pct   = Math.round((ID.idx/total)*100);
  const qType = getIdiomQuestionType(id.box);

  document.getElementById('page-idioms').innerHTML = `
    <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 0 10px">
      <div style="display:flex;align-items:center;gap:10px">
        <button class="btn-icon" onclick="renderIdiomMenu()" aria-label="back">
          <i class="ti ti-arrow-left"></i>
        </button>
        <span style="font-size:15px;font-weight:500">
          ${STATE.lang==='en'?'Idiom Practice':'ฝึกสำนวน'}
        </span>
      </div>
      <span style="font-size:13px;color:var(--text3)">${ID.idx+1} / ${total}</span>
    </div>

    <div style="height:5px;background:var(--surface2);border-radius:99px;
      margin-bottom:12px;overflow:hidden">
      <div style="height:100%;width:${pct}%;background:var(--accent);
        border-radius:99px;transition:width 0.4s"></div>
    </div>

    <div style="font-size:12px;color:var(--text3);text-align:center;margin-bottom:14px">
      ${t('quiz_correct')} ${ID.correct} · ${t('quiz_wrong')} ${ID.wrong} · ${t('quiz_remain')} ${total-ID.idx}
    </div>

    <!-- Idiom Card -->
    <div class="word-card">
      <div class="word-main" style="font-size:22px">${id.idiom}</div>
      <div class="word-ipa">${id.ipa}</div>
      <div class="word-actions">
        <button class="btn-sm" onclick="speakWord('${escStr(id.idiom)}')">
          <i class="ti ti-volume"></i> ${t('quiz_speak')}
        </button>
        <button class="btn-sm" onclick="toggleIdiomInfo()">
          <i class="ti ti-info-circle"></i> ${t('quiz_info')}
        </button>
      </div>
    </div>

    <!-- Info Panel -->
    <div id="idiom-info-panel" class="info-panel ${ID.infoOpen?'open':''}">
      <div class="info-thai">${id.thai}</div>
      <div class="info-lbl">${t('quiz_meaning')}</div>
      <div class="info-def">${id.meaning}</div>
      <div class="info-lbl" style="margin-top:8px">${t('quiz_example')}</div>
      ${id.examples.map(ex=>`<div class="info-ex">${ex}</div>`).join('')}
    </div>

    <!-- Question type badge -->
    <div style="display:inline-flex;align-items:center;gap:6px;
      background:${qType==='meaning'?'var(--accent-lt)':'var(--teal-lt)'};
      color:${qType==='meaning'?'var(--accent)':'var(--teal)'};
      border-radius:8px;padding:5px 12px;font-size:12px;font-weight:500;margin-bottom:12px">
      ${qType==='meaning'
        ? (STATE.lang==='en'?'☑ Choose meaning':'☑ เลือกความหมาย')
        : (STATE.lang==='en'?'☑ Choose correct context':'☑ เลือกบริบทที่ถูกต้อง')
      }
    </div>

    <div style="font-size:14px;font-weight:500;margin-bottom:12px;line-height:1.5">
      ${qType==='meaning'
        ? (STATE.lang==='en'
            ? `What does "<strong>${id.idiom}</strong>" mean?`
            : `"<strong>${id.idiom}</strong>" แปลว่าอะไร?`)
        : (STATE.lang==='en'
            ? `Which sentence uses "<strong>${id.idiom}</strong>" correctly?`
            : `ประโยคไหนใช้ "<strong>${id.idiom}</strong>" ได้ถูกต้อง?`)
      }
    </div>

    <div id="idiom-choices"></div>
    <div id="idiom-feedback"></div>
    <button id="btn-idiom-next" class="btn-primary" style="display:none"
      onclick="nextIdiomQuestion()">
      ${t('quiz_next')}
    </button>
  `;

  renderIdiomChoices(id, qType);
}

// ===== RENDER CHOICES =====
function renderIdiomChoices(id, qType) {
  const letters = ['A','B','C','D'];
  let options = [];
  let correctAnswer = '';

  if (qType === 'meaning') {
    correctAnswer = id.thai;
    options = shuffle([id.thai, ...id.distractors_meaning]);
  } else {
    const correct   = shuffle(id.contexts.correct)[0];
    const wrongs    = shuffle(id.contexts.wrong).slice(0, 3);
    correctAnswer   = correct;
    options         = shuffle([correct, ...wrongs]);
  }

  const wrap = document.getElementById('idiom-choices');
  wrap.innerHTML = options.map((opt, i) => `
    <button class="choice-btn"
      onclick="answerIdiom(${i}, '${escStr(opt)}', '${escStr(correctAnswer)}')">
      <span class="choice-letter">${letters[i]}</span>
      <span style="text-align:left;line-height:1.5">${opt}</span>
    </button>`).join('');
}

// ===== ANSWER =====
function answerIdiom(idx, chosen, correct) {
  if (ID.answered) return;
  ID.answered = true;

  const id   = ID.queue[ID.idx];
  const btns = document.querySelectorAll('.choice-btn');
  btns.forEach(b => b.disabled = true);

  const isCorrect = chosen === correct;
  id.seen++;

  if (isCorrect) {
    ID.correct++;
    id.correct++;
    btns[idx].classList.add('correct');
    btns[idx].querySelector('.choice-letter').textContent = '✓';
    moveIdiomBox(id, 'up');
  } else {
    ID.wrong++;
    btns[idx].classList.add('wrong');
    btns[idx].querySelector('.choice-letter').textContent = '✗';
    moveIdiomBox(id, 'down');
    btns.forEach(b => {
      if (b.querySelectorAll('span')[1].textContent === correct) b.classList.add('reveal');
    });
  }

  id.lastSeen = Date.now();
  saveIdiomState();

  const fb = document.getElementById('idiom-feedback');
  fb.innerHTML = isCorrect
    ? `<div class="feedback-box correct">
        <div class="fb-title">${t('quiz_result_great')}</div>
        <div>${id.thai} — ${id.meaning}</div>
       </div>`
    : `<div class="feedback-box wrong">
        <div class="fb-title">${t('quiz_wrong')}</div>
        <div style="margin-bottom:6px">${id.thai}</div>
        <div style="font-size:13px;color:var(--text2)">${id.meaning}</div>
       </div>`;

  document.getElementById('btn-idiom-next').style.display = 'block';
}

// ===== MOVE BOX =====
function moveIdiomBox(id, dir) {
  const prev = id.box;
  if (dir==='up'   && id.box < 6) id.box++;
  if (dir==='down' && id.box > 1) id.box--;
}

// ===== TOGGLE INFO =====
function toggleIdiomInfo() {
  ID.infoOpen = !ID.infoOpen;
  const panel = document.getElementById('idiom-info-panel');
  if (panel) panel.classList.toggle('open', ID.infoOpen);
}

// ===== NEXT =====
function nextIdiomQuestion() {
  ID.idx++;
  ID.answered = false;
  ID.infoOpen = false;
  renderIdiomQuestion();
}

// ===== RESULT =====
function renderIdiomResult() {
  const total = ID.correct + ID.wrong;
  const acc   = total > 0 ? Math.round((ID.correct/total)*100) : 0;
  let icon = '📖', title = t('quiz_result_more');
  if (acc >= 80) { icon='🎉'; title=t('quiz_result_great'); }
  else if (acc >= 60) { icon='💪'; title=t('quiz_result_good'); }

  const eligible = IDIOMS.filter(id => {
    const lo = ['A1','A2','B1','B2','C1','C2'];
    return lo.indexOf(id.level) <= lo.indexOf(STATE.level);
  });
  const idiomBoxes = { 1:0,2:0,3:0,4:0,5:0,6:0 };
  eligible.forEach(id => { idiomBoxes[id.box] = (idiomBoxes[id.box]||0)+1; });
  const boxLabels = ['',t('very_weak'),t('weak'),t('learning'),t('good'),t('strong'),t('master')];
  const boxHTML = [1,2,3,4,5,6].map(n => `
    <div class="bx b${n}">
      <div class="bn">${n}</div>
      <div class="bl">${boxLabels[n]}</div>
      <div class="bc">${idiomBoxes[n]||0}</div>
    </div>`).join('');

  document.getElementById('page-idioms').innerHTML = `
    <div class="result-icon">${icon}</div>
    <div class="result-title">${title}</div>
    <div class="result-sub">
      ${t('quiz_done')} ${total} · accuracy ${acc}%
    </div>

    <div class="grid4" style="margin-bottom:14px">
      <div class="stat-mini">
        <div class="val" style="color:var(--success)">${ID.correct}</div>
        <div class="lbl">${t('quiz_correct')}</div>
      </div>
      <div class="stat-mini">
        <div class="val" style="color:var(--danger)">${ID.wrong}</div>
        <div class="lbl">${t('quiz_wrong')}</div>
      </div>
      <div class="stat-mini"><div class="val">${acc}%</div><div class="lbl">accuracy</div></div>
      <div class="stat-mini">
        <div class="val">${eligible.filter(id=>id.box>=6).length}</div>
        <div class="lbl">${t('prog_mastered')}</div>
      </div>
    </div>

    <div class="card" style="margin-bottom:14px">
      <div class="card-title">Memory Box</div>
      <div class="box-row">${boxHTML}</div>
    </div>

    <button class="btn-primary" onclick="startIdiomQuiz('${ID.mode}')">
      ${t('quiz_play_again')}
    </button>
    <button class="btn-primary ghost" onclick="renderIdiomMenu()">
      ${STATE.lang==='en'?'Back to Idiom menu':'กลับเมนูสำนวน'}
    </button>
    <button class="btn-primary ghost" onclick="showPage('study')" style="margin-top:0">
      ${t('quiz_back_menu')}
    </button>
  `;
}

// ===== SAVE IDIOM STATE =====
function saveIdiomState() {
  localStorage.setItem('engstudy_idioms', JSON.stringify(
    IDIOMS.map(id => ({ idiom:id.idiom, box:id.box, correct:id.correct, seen:id.seen, lastSeen:id.lastSeen }))
  ));
}

// ===== LOAD IDIOM STATE =====
function loadIdiomState() {
  try {
    const saved = localStorage.getItem('engstudy_idioms');
    if (!saved) return;
    const data = JSON.parse(saved);
    data.forEach(s => {
      const idx = IDIOMS.findIndex(id => id.idiom === s.idiom);
      if (idx !== -1) Object.assign(IDIOMS[idx], s);
    });
  } catch(e) { console.warn('Load idiom state failed', e); }
}