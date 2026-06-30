// ===== ROUTING =====
function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const page = document.getElementById('page-' + name);
  if (page) page.classList.add('active');
  const nav = document.getElementById('nav-' + name);
  if (nav) nav.classList.add('active');
  const renders = {
    home:     renderHome,
    study:    renderStudy,
    progress: renderProgress,
    settings: renderSettings,
    reading:  renderReading,
    idioms:   renderIdiomMenu,
  };
  if (renders[name]) renders[name]();
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  loadState();
  loadIdiomState();
  setTopDate();
  renderHome();
  document.getElementById('badge-level').textContent = STATE.level;
});

function setTopDate() {
  const d = new Date();
  if (STATE.lang === 'en') {
    const days   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    document.getElementById('top-date').textContent =
      days[d.getDay()] + ', ' + d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear();
  } else {
    const days   = ['อาทิตย์','จันทร์','อังคาร','พุธ','พฤหัส','ศุกร์','เสาร์'];
    const months = ['ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.'];
    document.getElementById('top-date').textContent =
      'วัน' + days[d.getDay()] + ' ' + d.getDate() + ' ' + months[d.getMonth()] + ' ' + (d.getFullYear()+543);
  }
}

// ===== SAVE / LOAD STATE =====
function saveState() {
  localStorage.setItem('engstudy_state', JSON.stringify(STATE));
  localStorage.setItem('engstudy_words', JSON.stringify(WORDS));
}

function loadState() {
  try {
    const s = localStorage.getItem('engstudy_state');
    if (s) Object.assign(STATE, JSON.parse(s));
    const w = localStorage.getItem('engstudy_words');
    if (w) {
      const saved = JSON.parse(w);
      saved.forEach(sw => {
        const idx = WORDS.findIndex(w => w.word === sw.word);
        if (idx !== -1) Object.assign(WORDS[idx], sw);
      });
    }
  } catch(e) { console.warn('Load state failed', e); }
}

// ===== HOME PAGE =====
function renderHome() {
  const totalWords  = WORDS.length;
  const weakWords   = WORDS.filter(w => w.box <= 2).sort((a,b) => {
    const accA = a.seen ? a.correct/a.seen : 0;
    const accB = b.seen ? b.correct/b.seen : 0;
    return accA - accB;
  }).slice(0, 4);

  const goalPct   = Math.min(100, Math.round((STATE.todayNew/STATE.dailyGoal)*100));
  const dayKeys   = ['จ','อ','พ','พฤ','ศ','ส','อา'];
  const dayKeysEn = ['M','T','W','Th','F','Sa','Su'];
  const days      = STATE.lang === 'en' ? dayKeysEn : dayKeys;

  const streakHTML = days.map((d,i) => {
    const cls = i < STATE.streak-1 ? 'done' : i === STATE.streak-1 ? 'today' : '';
    return `<div class="streak-day ${cls}"><span>${d}</span></div>`;
  }).join('');

  const boxLabels = ['',t('very_weak'),t('weak'),t('learning'),t('good'),t('strong'),t('master')];
  const boxHTML = [1,2,3,4,5,6].map(n => `
    <div class="bx b${n}">
      <div class="bn">${n}</div>
      <div class="bl">${boxLabels[n]}</div>
      <div class="bc">${STATE.boxes[n]||0}</div>
    </div>`).join('');

  const barHeights = STATE.velocity7.map(v => Math.round((v/STATE.dailyGoal)*100));
  const maxH = Math.max(...barHeights, 1);
  const barsHTML = barHeights.map((h,i) => {
    const isToday = i === barHeights.length-1;
    return `<div class="mini-bar ${isToday?'hi':''}" style="height:${Math.round((h/maxH)*100)}%"></div>`;
  }).join('');

  const weakHTML = weakWords.map(w => {
    const acc = w.seen ? Math.round((w.correct/w.seen)*100) : 0;
    const chipCls = acc < 55 ? 'chip-d' : acc < 70 ? 'chip-w' : 'chip-s';
    return `<div class="wrow">
      <div>
        <div class="w">${w.word}</div>
        <div class="wm">${w.meanings ? w.meanings.map(m=>m.th).join(', ') : ''}</div>
      </div>
      <span class="chip ${chipCls}">${acc}%</span>
    </div>`;
  }).join('');

  const levelNames = {
    A1:t('Beginner')||'Beginner', A2:'Elementary',
    B1:'Intermediate', B2:'Upper Intermediate',
    C1:'Advanced', C2:'Mastery',
  };
  const levelPct = calcLevelPct();

  document.getElementById('page-home').innerHTML = `
    <div class="level-banner">
      <div>
        <div class="lb-big">${STATE.level} — ${levelNames[STATE.level]||STATE.level}</div>
        <div class="lb-sub">${t('home_ready')} ${nextLevel(STATE.level)} ${t('home_assessment')}</div>
      </div>
      <div style="text-align:right">
        <div class="lb-pct">${levelPct}%</div>
        <div class="lb-plbl">${t('home_completed')}</div>
      </div>
    </div>

    <div class="sec-label">${t('today')}</div>
    <div class="grid4">
      <div class="stat-mini"><div class="val">${STATE.todayNew}</div><div class="lbl">${t('new_words')}</div></div>
      <div class="stat-mini"><div class="val">${STATE.todayReview}</div><div class="lbl">${t('review')}</div></div>
      <div class="stat-mini"><div class="val">${STATE.todayGrammar}</div><div class="lbl">${t('grammar')}</div></div>
      <div class="stat-mini"><div class="val">${STATE.todayAccuracy}%</div><div class="lbl">${t('accuracy')}</div></div>
    </div>

    <div class="card">
      <div class="card-title">${t('home_goal')} — ${STATE.dailyGoal} ${t('quiz_words')}</div>
      <div class="prow" style="margin-bottom:10px">
        <div class="ptrack" style="flex:1">
          <div class="pfill" style="width:${goalPct}%;background:var(--accent)"></div>
        </div>
        <div class="ppct">${STATE.todayNew} / ${STATE.dailyGoal}</div>
      </div>
      <div style="display:flex;align-items:center;gap:12px;padding-top:10px;border-top:0.5px solid var(--border)">
        <div style="width:36px;height:36px;background:var(--teal-lt);border-radius:8px;
          display:flex;align-items:center;justify-content:center;color:var(--teal);font-size:18px">
          <i class="ti ti-flame"></i>
        </div>
        <div>
          <div style="font-size:14px;font-weight:500">${t('home_streak')} ${STATE.streak} ${t('home_days')}</div>
          <div style="font-size:12px;color:var(--text3)">${t('home_streak_sub')}</div>
        </div>
        <div style="margin-left:auto;font-size:20px">🔥</div>
      </div>
    </div>

    <div class="sec-label">${t('home_consistency')}</div>
    <div class="streak-bar">${streakHTML}</div>

    <div class="card">
      <div class="card-title">${t('home_memory')} — ${totalWords} ${t('quiz_words')}</div>
      <div class="box-row">${boxHTML}</div>
    </div>

    <div class="sec-label">${t('home_activity')}</div>
    <div class="card" style="padding-bottom:12px">
      <div class="mini-chart">${barsHTML}</div>
      <div class="mini-labels" style="margin-top:4px">
        ${days.map(d=>`<span>${d}</span>`).join('')}
      </div>
    </div>

    <div class="sec-label">${t('home_weak')}</div>
    <div class="card">
      ${weakHTML || `<div style="color:var(--text3);font-size:13px">${t('home_no_weak')}</div>`}
    </div>

    <button class="btn-primary" onclick="showPage('study')" style="margin-top:4px">
      ${t('home_start')}
    </button>
  `;
}

// ===== STUDY MENU =====
function renderStudy() {
  const weakCount    = WORDS.filter(w => w.box <= 2).length;
  const mistakeCount = WORDS.filter(w => w.seen > 0 && (w.correct/w.seen) < 0.5).length;

  document.getElementById('page-study').innerHTML = `
    <div class="sec-label" style="margin-top:4px">${t('study_select')}</div>

    <div class="mode-card" onclick="startVocabQuiz('vocab')">
      <div class="mode-icon" style="background:var(--accent-lt);color:var(--accent)">
        <i class="ti ti-book"></i>
      </div>
      <div>
        <div class="mt">${t('study_vocab')}</div>
        <div class="ms">${t('study_vocab_sub')}</div>
      </div>
      <i class="ti ti-chevron-right" style="margin-left:auto;color:var(--text3)"></i>
    </div>

    <div class="mode-card" onclick="startVocabQuiz('grammar')">
      <div class="mode-icon" style="background:var(--teal-lt);color:var(--teal)">
        <i class="ti ti-pencil"></i>
      </div>
      <div>
        <div class="mt">${t('study_vocab_grammar')}</div>
        <div class="ms">${t('study_vocab_grammar_sub')}</div>
      </div>
      <i class="ti ti-chevron-right" style="margin-left:auto;color:var(--text3)"></i>
    </div>

    <div class="mode-card" onclick="startVocabQuiz('weak')">
      <div class="mode-icon" style="background:var(--danger-lt);color:var(--danger)">
        <i class="ti ti-refresh"></i>
      </div>
      <div>
        <div class="mt">${t('study_weak')}</div>
        <div class="ms">${weakCount} ${t('study_weak_sub')}</div>
      </div>
      <i class="ti ti-chevron-right" style="margin-left:auto;color:var(--text3)"></i>
    </div>

    <div class="mode-card" onclick="startVocabQuiz('mistakes')">
      <div class="mode-icon" style="background:var(--warn-lt);color:var(--warn)">
        <i class="ti ti-alert-triangle"></i>
      </div>
      <div>
        <div class="mt">${t('study_mistakes')}</div>
        <div class="ms">${mistakeCount} ${t('study_mistakes_sub')}</div>
      </div>
      <i class="ti ti-chevron-right" style="margin-left:auto;color:var(--text3)"></i>
    </div>

    <div class="mode-card" onclick="startVocabQuiz('mixed')">
      <div class="mode-icon" style="background:var(--accent-lt);color:var(--accent)">
        <i class="ti ti-layout-grid"></i>
      </div>
      <div>
        <div class="mt">${t('study_mixed')}</div>
        <div class="ms">Smart weighted review</div>
      </div>
      <i class="ti ti-chevron-right" style="margin-left:auto;color:var(--text3)"></i>
    </div>

    <div class="sec-label">${t('study_grammar')}</div>
    <div class="mode-card" onclick="startGrammarSession('mixed')">
      <div class="mode-icon" style="background:var(--teal-lt);color:var(--teal)">
        <i class="ti ti-pencil"></i>
      </div>
      <div>
        <div class="mt">${t('study_grammar')}</div>
        <div class="ms">${t('study_grammar_sub')}</div>
      </div>
      <i class="ti ti-chevron-right" style="margin-left:auto;color:var(--text3)"></i>
    </div>

    <div class="sec-label">${STATE.lang==='en'?'Idiom Practice':'ฝึกสำนวน'}</div>
    <div class="mode-card" onclick="showPage('idioms')">
      <div class="mode-icon" style="background:var(--warn-lt);color:var(--warn)">
        <i class="ti ti-quote"></i>
      </div>
      <div>
        <div class="mt">${STATE.lang==='en'?'Idiom Practice':'ฝึกสำนวน'}</div>
        <div class="ms">${STATE.lang==='en'?'Meaning + context · Memory Box':'ความหมาย + บริบท · Memory Box'}</div>
      </div>
      <i class="ti ti-chevron-right" style="margin-left:auto;color:var(--text3)"></i>
    </div>
    
    <div class="sec-label">Reading</div>
    <div class="mode-card" onclick="showPage('reading')">
      <div class="mode-icon" style="background:var(--teal-lt);color:var(--teal)">
        <i class="ti ti-file-text"></i>
      </div>
      <div>
        <div class="mt">${t('study_reading')} — ${STATE.level}</div>
        <div class="ms">${t('study_reading_sub')}</div>
      </div>
      <i class="ti ti-chevron-right" style="margin-left:auto;color:var(--text3)"></i>
    </div>
  `;
}

// ===== SETTINGS PAGE =====
// ===== i18n =====
const I18N = {
  th: {
    nav_home:'หน้าหลัก', nav_study:'เรียน', nav_settings:'ตั้งค่า',
    settings_title:'การเรียน', settings_level:'ระดับ CEFR',
    settings_level_sub:'ควบคุมความยากทุกอย่าง',
    settings_goal:'เป้าหมายต่อวัน', settings_goal_sub:'จำนวนคำที่ต้องเรียน',
    settings_dark:'Dark Mode', settings_dark_sub:'ปรับสีตามความชอบ',
    settings_sound:'ทดสอบเสียง', settings_sound_sub:'Text-to-speech ในตัวเครื่อง',
    settings_lang:'ภาษาในแอป', settings_lang_sub:'เลือกภาษาที่แสดง',
    settings_export:'Export ข้อมูล', settings_export_sub:'บันทึก progress เป็น JSON',
    settings_import:'Import ข้อมูล', settings_import_sub:'โหลด progress จาก JSON',
    settings_about:'เกี่ยวกับ', settings_data:'ข้อมูล',
    settings_dark_on:'เปิดอยู่ — คลิกเพื่อปิด', settings_dark_off:'ปิดอยู่ — คลิกเพื่อเปิด',
    settings_custom:'กำหนดเอง', settings_words_day:'คำ/วัน',
    settings_enter_goal:'กรอกจำนวนคำ/วัน',
    today:'วันนี้', new_words:'คำใหม่', review:'ทบทวน',
    grammar:'แกรมม่า', accuracy:'ถูกต้อง',
    home_goal:'เป้าหมายวันนี้', home_streak:'Streak',
    home_streak_sub:'เยี่ยมมาก! ทำต่อเลย',
    home_days:'วัน', home_memory:'Memory Box',
    home_activity:'กิจกรรม 7 วัน', home_weak:'คำที่ยังอ่อน',
    home_no_weak:'ยังไม่มีคำที่อ่อน 🎉',
    home_start:'เริ่มเรียนวันนี้ →',
    home_consistency:'ความสม่ำเสมอ 7 วัน',
    home_ready:'Ready for',
    home_assessment:'Assessment',
    home_completed:'completed',
    study_select:'เลือกโหมดเรียน',
    study_vocab:'คำศัพท์อย่างเดียว',
    study_vocab_sub:'Multiple choice · ออกเสียงได้ · Info',
    study_vocab_grammar:'คำศัพท์ + แกรมม่า',
    study_vocab_grammar_sub:'Multiple choice + สร้างประโยค',
    study_weak:'ทบทวนคำที่ยังอ่อน',
    study_weak_sub:'คำ ใน Box 1–2',
    study_mistakes:'ทบทวนที่ตอบผิด',
    study_mistakes_sub:'คำที่ accuracy ต่ำกว่า 50%',
    study_mixed:'Mixed — Smart Review',
    study_mixed_sub:'Box 1×40% · Box 2×25% · Box 3×15%...',
    study_grammar:'Grammar Challenge',
    study_grammar_sub:'Fill-in + สร้างประโยค + AI ตรวจ',
    study_reading:'Reading Assessment',
    study_reading_sub:'IELTS/TOEFL style · เลือก difficulty ได้',
    quiz_correct:'ถูก', quiz_wrong:'ผิด', quiz_remain:'เหลือ',
    quiz_answer_q:'คำนี้แปลว่าอะไร?',
    quiz_speak:'ออกเสียง', quiz_info:'ข้อมูล',
    quiz_meaning:'ความหมาย', quiz_example:'ตัวอย่าง',
    quiz_next:'ต่อไป →', quiz_play_again:'เล่นอีกรอบ',
    quiz_back_menu:'กลับเมนู',
    quiz_result_great:'เยี่ยมมาก!', quiz_result_good:'ทำได้ดี',
    quiz_result_more:'ต้องฝึกเพิ่ม',
    quiz_done:'เสร็จแล้ว', quiz_words:'คำ',
    gr_title:'Grammar Challenge', gr_word_label:'คำศัพท์ในโจทย์นี้',
    gr_info_btn:'ดูอธิบายแกรมม่า (ภาษาไทย)',
    gr_choice:'☑ เลือกตอบ', gr_free:'✍ พิมพ์เอง',
    gr_fill:'เติมช่องว่าง', gr_create:'สร้างประโยค',
    gr_use_word:'ใช้คำว่า', gr_with:'สร้างประโยคโดยใช้',
    gr_structure:'โครงสร้าง',
    gr_ai_note:'AI จะตรวจ grammar, spelling, word choice ทั้งหมด',
    gr_check:'ตรวจประโยค', gr_checking:'กำลังตรวจ...',
    gr_ai_checking:'AI กำลังตรวจ grammar, spelling และ word choice',
    gr_correct_all:'ถูกต้องทุกด้าน!', gr_errors:'พบข้อผิดพลาด',
    gr_corrected:'ประโยคที่ถูกต้อง',
    gr_wrong_ans:'ผิด — คำตอบที่ถูกคือ',
    gr_next:'ต่อไป →', gr_attempts:'ครั้งทั้งหมด',
    gr_weak_topics:'topic อ่อน', gr_topics:'topics',
    gr_start_mixed:'เริ่ม Mixed — 6 โจทย์',
    gr_train_weak:'ฝึก topic ที่อ่อน',
    gr_back_menu:'กลับเมนู', gr_back_study:'กลับเมนูเรียน',
    gr_back_gr:'กลับเมนู Grammar',
    gr_summary:'สรุปแต่ละข้อ', gr_again:'ทำอีกรอบ',
    gr_no_data:'ไม่มีข้อมูล', gr_today:'วันนี้',
    gr_use_when:'ใช้เมื่อ', gr_examples:'ตัวอย่าง',
    gr_no_api:'ยังไม่ได้เชื่อม AI',
    gr_no_api_sub:'ต้องใส่ API key ก่อนใช้งานส่วนนี้ได้',
    rd_title:'Reading Assessment', rd_select_diff:'เลือกความยาก',
    rd_light:'เบา', rd_standard:'มาตรฐาน', rd_exam:'ยาก',
    rd_light_desc:'สั้น · ประโยคตรง · คำถามง่าย',
    rd_standard_desc:'ปานกลาง · mixed questions',
    rd_exam_desc:'IELTS/TOEFL · มีหลอก · วิเคราะห์',
    rd_gen:'สร้างบทอ่านใหม่', rd_generating:'กำลังสร้าง...',
    rd_warn:'บทอ่านนี้สร้างขึ้นเพื่อฝึกภาษาเท่านั้น เนื้อหาเป็นเรื่องสมมติทั้งหมด ไม่มีข้อเท็จจริง บุคคล หรือเหตุการณ์จริงปรากฏ',
    rd_words:'คำ', rd_questions:'คำถาม',
    rd_q_label:'ข้อ', rd_submit:'ตรวจคำตอบทั้งหมด',
    rd_not_complete:'ยังไม่ครบ',
    rd_not_complete_sub:'ตอบอีก',
    rd_not_complete_sub2:'ข้อก่อนกด "ตรวจคำตอบ"',
    rd_new:'สร้างบทอ่านใหม่', rd_see_progress:'ดู Progress',
    rd_error:'เกิดข้อผิดพลาด',
    rd_literal:'ความเข้าใจตรง', rd_inference:'การอนุมาน',
    rd_vocab_context:'คำศัพท์ในบริบท', rd_main_idea:'ใจความหลัก',
    rd_author:'เจตนาผู้เขียน', rd_conclusion:'ข้อสรุปสมเหตุสมผล',
    prog_current:'ระดับปัจจุบัน', prog_forecast:'3-scenario forecast',
    prog_based:'อิงจาก velocity', prog_day:'คำ/วัน (เฉลี่ย 7 วัน)',
    prog_days:'วัน', prog_accuracy:'ความแม่นยำ',
    prog_vocab:'คำศัพท์', prog_grammar:'แกรมม่า',
    prog_reading:'Reading', prog_retention:'Retention',
    prog_trend:'accuracy trend — 30 วัน',
    prog_all:'ทั้งหมด', prog_velocity:'learning velocity — 7 วัน',
    prog_forgetting:'forgetting & retention',
    prog_forget_rate:'forgetting rate', prog_forget_sub:'คำที่ตกกลับ box ต่ำ',
    prog_repeat:'repeat mistake', prog_repeat_sub:'ผิดคำเดิมซ้ำ',
    prog_halflife:'half-life เฉลี่ย', prog_halflife_sub:'วัน ต่อคำ',
    prog_total_q:'คำถามทั้งหมด', prog_total_sub:'ตลอดการเรียน',
    prog_memory:'memory box', prog_weak_words:'คำศัพท์ที่อ่อนที่สุด',
    prog_weak_grammar:'แกรมม่าที่อ่อนที่สุด',
    prog_overall:'overall', prog_total_words:'คำทั้งหมด',
    prog_mastered:'Mastered', prog_streak:'Streak วัน',
    prog_active_days:'วันที่ใช้งาน', prog_insights:'insights',
    prog_no_data:'ยังไม่มีข้อมูล',
    prog_wrong:'ผิด', prog_times:'ครั้ง',
    prog_halflife_label:'half-life ~',
    pess:'Pessimistic', curr_pace:'Current', opti:'Optimistic',
    completed:'completed',
    days_label:'วัน',
    very_weak:'Very Weak', weak:'Weak', learning:'Learning',
    good:'Good', strong:'Strong', master:'Master',
  },
  en: {
    nav_home:'Home', nav_study:'Study', nav_settings:'Settings',
    settings_title:'Learning', settings_level:'CEFR Level',
    settings_level_sub:'Controls all difficulty',
    settings_goal:'Daily Goal', settings_goal_sub:'Words per day',
    settings_dark:'Dark Mode', settings_dark_sub:'Adjust color theme',
    settings_sound:'Test Sound', settings_sound_sub:'Device text-to-speech',
    settings_lang:'App Language', settings_lang_sub:'Choose display language',
    settings_export:'Export Data', settings_export_sub:'Save progress as JSON',
    settings_import:'Import Data', settings_import_sub:'Load progress from JSON',
    settings_about:'About', settings_data:'Data',
    settings_dark_on:'On — click to disable', settings_dark_off:'Off — click to enable',
    settings_custom:'Custom', settings_words_day:'words/day',
    settings_enter_goal:'Enter words/day',
    today:'Today', new_words:'New', review:'Review',
    grammar:'Grammar', accuracy:'Accuracy',
    home_goal:'Today\'s goal', home_streak:'Streak',
    home_streak_sub:'Great work! Keep going',
    home_days:'days', home_memory:'Memory Box',
    home_activity:'Activity — 7 days', home_weak:'Weakest words',
    home_no_weak:'No weak words yet 🎉',
    home_start:'Start studying today →',
    home_consistency:'Consistency — 7 days',
    home_ready:'Ready for', home_assessment:'Assessment',
    home_completed:'completed',
    study_select:'Choose study mode',
    study_vocab:'Vocabulary only',
    study_vocab_sub:'Multiple choice · Pronunciation · Info',
    study_vocab_grammar:'Vocabulary + Grammar',
    study_vocab_grammar_sub:'Multiple choice + sentence writing',
    study_weak:'Review weak words',
    study_weak_sub:'words in Box 1–2',
    study_mistakes:'Review mistakes',
    study_mistakes_sub:'words with accuracy below 50%',
    study_mixed:'Mixed — Smart Review',
    study_mixed_sub:'Box 1×40% · Box 2×25% · Box 3×15%...',
    study_grammar:'Grammar Challenge',
    study_grammar_sub:'Fill-in + sentence writing + AI check',
    study_reading:'Reading Assessment',
    study_reading_sub:'IELTS/TOEFL style · Choose difficulty',
    quiz_correct:'Correct', quiz_wrong:'Wrong', quiz_remain:'Left',
    quiz_answer_q:'What does this word mean?',
    quiz_speak:'Pronounce', quiz_info:'Info',
    quiz_meaning:'Meaning', quiz_example:'Examples',
    quiz_next:'Next →', quiz_play_again:'Play again',
    quiz_back_menu:'Back to menu',
    quiz_result_great:'Excellent!', quiz_result_good:'Well done',
    quiz_result_more:'Keep practising',
    quiz_done:'Done', quiz_words:'words',
    gr_title:'Grammar Challenge', gr_word_label:'Word in this question',
    gr_info_btn:'View grammar explanation (Thai)',
    gr_choice:'☑ Multiple choice', gr_free:'✍ Free write',
    gr_fill:'Fill in the blank', gr_create:'Create a sentence',
    gr_use_word:'Use the word', gr_with:'Write a sentence using',
    gr_structure:'Structure',
    gr_ai_note:'AI checks grammar, spelling, and word choice',
    gr_check:'Check sentence', gr_checking:'Checking...',
    gr_ai_checking:'AI is checking grammar, spelling and word choice',
    gr_correct_all:'Perfectly correct!', gr_errors:'Errors found',
    gr_corrected:'Corrected sentence',
    gr_wrong_ans:'Wrong — correct answer is',
    gr_next:'Next →', gr_attempts:'Total attempts',
    gr_weak_topics:'weak topics', gr_topics:'topics',
    gr_start_mixed:'Start Mixed — 6 questions',
    gr_train_weak:'Practise weak topics',
    gr_back_menu:'Back to menu', gr_back_study:'Back to study menu',
    gr_back_gr:'Back to Grammar menu',
    gr_summary:'Summary', gr_again:'Try again',
    gr_no_data:'No data yet', gr_today:'Today',
    gr_use_when:'When to use', gr_examples:'Examples',
    gr_no_api:'AI not connected',
    gr_no_api_sub:'Please add API key to enable this feature',
    rd_title:'Reading Assessment', rd_select_diff:'Choose difficulty',
    rd_light:'Light', rd_standard:'Standard', rd_exam:'Exam-style',
    rd_light_desc:'Short · direct sentences · easy questions',
    rd_standard_desc:'Medium · mixed questions',
    rd_exam_desc:'IELTS/TOEFL · distractors · analysis',
    rd_gen:'Generate new passage', rd_generating:'Generating...',
    rd_warn:'This passage was generated for language practice only. All content is fictional. No real events, people or facts appear here.',
    rd_words:'words', rd_questions:'questions',
    rd_q_label:'Question', rd_submit:'Submit all answers',
    rd_not_complete:'Not complete yet',
    rd_not_complete_sub:'Please answer',
    rd_not_complete_sub2:'more question(s) before submitting',
    rd_new:'Generate new passage', rd_see_progress:'View Progress',
    rd_error:'An error occurred',
    rd_literal:'Literal comprehension', rd_inference:'Inference',
    rd_vocab_context:'Vocabulary in context', rd_main_idea:'Main idea',
    rd_author:'Author\'s intention', rd_conclusion:'Logical conclusion',
    prog_current:'Current level', prog_forecast:'3-scenario forecast',
    prog_based:'Based on velocity', prog_day:'words/day (7-day avg)',
    prog_days:'days', prog_accuracy:'Accuracy',
    prog_vocab:'Vocabulary', prog_grammar:'Grammar',
    prog_reading:'Reading', prog_retention:'Retention',
    prog_trend:'Accuracy trend — 30 days',
    prog_all:'All', prog_velocity:'Learning velocity — 7 days',
    prog_forgetting:'Forgetting & retention',
    prog_forget_rate:'Forgetting rate', prog_forget_sub:'Words dropped to lower box',
    prog_repeat:'Repeat mistakes', prog_repeat_sub:'Same word wrong multiple times',
    prog_halflife:'Avg half-life', prog_halflife_sub:'days per word',
    prog_total_q:'Total questions', prog_total_sub:'All time',
    prog_memory:'Memory box', prog_weak_words:'Weakest words',
    prog_weak_grammar:'Weakest grammar topics',
    prog_overall:'Overall', prog_total_words:'Total words',
    prog_mastered:'Mastered', prog_streak:'Streak days',
    prog_active_days:'Active days', prog_insights:'Insights',
    prog_no_data:'No data yet',
    prog_wrong:'Wrong', prog_times:'times',
    prog_halflife_label:'half-life ~',
    pess:'Pessimistic', curr_pace:'Current', opti:'Optimistic',
    completed:'completed',
    days_label:'days',
    very_weak:'Very Weak', weak:'Weak', learning:'Learning',
    good:'Good', strong:'Strong', master:'Master',
  },
};

function t(key) {
  const lang = STATE.lang || 'th';
  return (I18N[lang] && I18N[lang][key]) || I18N['th'][key] || key;
}

function applyLang() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });
}

function changeLang(lang) {
  STATE.lang = lang;
  applyLang();
  setTopDate();
  saveState();
  renderSettings();
}

// ===== SETTINGS PAGE (แทนที่ของเดิม) =====
function renderSettings() {
  const lang = STATE.lang || 'th';
  const darkIcon = STATE.darkMode ? 'ti-sun' : 'ti-moon';
  const darkLabel = STATE.darkMode
    ? (lang === 'th' ? 'เปิดอยู่ — คลิกเพื่อปิด' : 'On — click to disable')
    : (lang === 'th' ? 'ปิดอยู่ — คลิกเพื่อเปิด' : 'Off — click to enable');

  document.getElementById('page-settings').innerHTML = `
    <div class="sec-label" style="margin-top:4px">${t('settings_title')}</div>
    <div class="card">

      <div class="settings-row">
        <div>
          <div class="sl">${t('settings_level')}</div>
          <div class="ss">${t('settings_level_sub')}</div>
        </div>
        <select onchange="changeLevel(this.value)">
          ${['A1','A2','B1','B2','C1','C2'].map(l =>
            `<option ${l === STATE.level ? 'selected' : ''}>${l}</option>`
          ).join('')}
        </select>
      </div>

      <div class="settings-row">
        <div>
          <div class="sl">${t('settings_goal')}</div>
          <div class="ss">${t('settings_goal_sub')}</div>
        </div>
        <div style="display:flex;align-items:center;gap:6px">
          <select onchange="changeGoalSelect(this.value)" id="goal-select">
            ${[10,20,30,50].map(g =>
              `<option ${g === STATE.dailyGoal ? 'selected' : ''}>${g}</option>`
            ).join('')}
            <option ${![10,20,30,50].includes(STATE.dailyGoal) ? 'selected' : ''} value="custom">
              ${lang === 'th' ? 'กำหนดเอง' : 'Custom'}
            </option>
          </select>
        </div>
      </div>

      <div id="custom-goal-row" style="display:${![10,20,30,50].includes(STATE.dailyGoal)?'flex':'none'};
        align-items:center;justify-content:space-between;padding:10px 0;
        border-bottom:0.5px solid var(--border)">
        <div class="ss">${lang === 'th' ? 'กรอกจำนวนคำ/วัน' : 'Enter words/day'}</div>
        <div style="display:flex;gap:6px;align-items:center">
          <input type="number" id="custom-goal-input" min="1" max="500"
            value="${STATE.dailyGoal}"
            style="width:70px;padding:6px 8px;border:0.5px solid var(--border2);
              border-radius:8px;font-size:13px;background:var(--surface2);color:var(--text);
              text-align:center"
            onchange="changeGoalCustom(this.value)">
          <span class="ss">${lang === 'th' ? 'คำ/วัน' : 'words/day'}</span>
        </div>
      </div>

      <div class="settings-row">
        <div>
          <div class="sl">${t('settings_dark')}</div>
          <div class="ss">${darkLabel}</div>
        </div>
        <button class="btn-icon" onclick="toggleDark()" id="dm-btn"
          style="${STATE.darkMode ? 'background:var(--accent-lt);border-color:var(--accent)' : ''}">
          <i class="ti ${darkIcon}"></i>
        </button>
      </div>

      <div class="settings-row">
        <div>
          <div class="sl">${t('settings_sound')}</div>
          <div class="ss">${t('settings_sound_sub')}</div>
        </div>
        <button class="btn-icon" onclick="testTTS()">
          <i class="ti ti-volume"></i>
        </button>
      </div>

      <div class="settings-row" style="border-bottom:none">
        <div>
          <div class="sl">${t('settings_lang')}</div>
          <div class="ss">${t('settings_lang_sub')}</div>
        </div>
        <div style="display:flex;gap:4px">
          <button onclick="changeLang('th')"
            style="padding:5px 12px;border-radius:8px;font-size:12px;cursor:pointer;
              border:0.5px solid ${lang==='th'?'var(--accent)':'var(--border2)'};
              background:${lang==='th'?'var(--accent-lt)':'none'};
              color:${lang==='th'?'var(--accent)':'var(--text2)'}">ไทย</button>
          <button onclick="changeLang('en')"
            style="padding:5px 12px;border-radius:8px;font-size:12px;cursor:pointer;
              border:0.5px solid ${lang==='en'?'var(--accent)':'var(--border2)'};
              background:${lang==='en'?'var(--accent-lt)':'none'};
              color:${lang==='en'?'var(--accent)':'var(--text2)'}">English</button>
        </div>
      </div>

    </div>

    <div class="sec-label">${lang === 'th' ? 'ข้อมูล' : 'Data'}</div>
    <div class="card">
      <div class="settings-row">
        <div>
          <div class="sl">${t('settings_export')}</div>
          <div class="ss">${t('settings_export_sub')}</div>
        </div>
        <button class="btn-icon" onclick="exportData()">
          <i class="ti ti-download"></i>
        </button>
      </div>
      <div class="settings-row" style="border-bottom:none">
        <div>
          <div class="sl">${t('settings_import')}</div>
          <div class="ss">${t('settings_import_sub')}</div>
        </div>
        <button class="btn-icon" onclick="importData()">
          <i class="ti ti-upload"></i>
        </button>
      </div>
    </div>

    <div class="sec-label">${lang === 'th' ? 'เกี่ยวกับ' : 'About'}</div>
    <div class="card">
      <div class="settings-row" style="border-bottom:none">
        <div>
          <div class="sl">EngStudy v1.0</div>
          <div class="ss">Personal English Training System</div>
        </div>
        <span class="chip chip-s">Free</span>
      </div>
    </div>
  `;
}

// ===== GOAL FUNCTIONS =====
function changeGoalSelect(val) {
  const customRow = document.getElementById('custom-goal-row');
  if (val === 'custom') {
    if (customRow) customRow.style.display = 'flex';
  } else {
    if (customRow) customRow.style.display = 'none';
    STATE.dailyGoal = parseInt(val);
    saveState();
  }
}

function changeGoalCustom(val) {
  const n = parseInt(val);
  if (n > 0 && n <= 500) {
    STATE.dailyGoal = n;
    saveState();
  }
}

// ===== SETTINGS ACTIONS =====
function changeLevel(v) {
  STATE.level = v;
  document.getElementById('badge-level').textContent = v;
  saveState();
}

function changeGoal(v) {
  STATE.dailyGoal = parseInt(v);
  saveState();
}

function toggleDark() {
  STATE.darkMode = !STATE.darkMode;
  document.body.classList.toggle('dark', STATE.darkMode);
  const btn = document.getElementById('dm-btn');
  if (btn) btn.innerHTML = `<i class="ti ti-${STATE.darkMode ? 'sun' : 'moon'}"></i>`;
  saveState();
}

function testTTS() {
  if ('speechSynthesis' in window) {
    const u = new SpeechSynthesisUtterance('achieve');
    u.lang = 'en-US'; u.rate = 0.9;
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
  }
}

function exportData() {
  const data = { state: STATE, words: WORDS, exportDate: new Date().toISOString() };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'engstudy-backup.json'; a.click();
  URL.revokeObjectURL(url);
}

function importData() {
  const input = document.createElement('input');
  input.type = 'file'; input.accept = '.json';
  input.onchange = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        const data = JSON.parse(ev.target.result);
        if (data.state) Object.assign(STATE, data.state);
        if (data.words) data.words.forEach(sw => {
          const idx = WORDS.findIndex(w => w.word === sw.word);
          if (idx !== -1) Object.assign(WORDS[idx], sw);
        });
        saveState();
        renderHome();
        showPage('home');
        alert('Import สำเร็จ!');
      } catch(e) { alert('ไฟล์ไม่ถูกต้อง'); }
    };
    reader.readAsText(file);
  };
  input.click();
}

// ===== HELPERS =====
function calcLevelPct() {
  const totalWords = WORDS.length;
  if (totalWords === 0) return 0;
  const score = WORDS.reduce((sum, w) => sum + ((w.box - 1) / 5), 0);
  return Math.round((score / totalWords) * 100);
}

function nextLevel(lv) {
  const map = { A1:'A2', A2:'B1', B1:'B2', B2:'C1', C1:'C2', C2:'C2' };
  return map[lv] || 'B2';
}

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function speakWord(word) {
  if (!('speechSynthesis' in window)) return;
  const u = new SpeechSynthesisUtterance(word);
  u.lang = 'en-US'; u.rate = 0.85;
  speechSynthesis.cancel();
  speechSynthesis.speak(u);
}

function getAccChip(acc) {
  if (acc < 55) return 'chip-d';
  if (acc < 70) return 'chip-w';
  if (acc < 85) return 'chip-s';
  return 'chip-t';
}
