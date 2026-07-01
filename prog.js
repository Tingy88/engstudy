// ===== PROGRESS PAGE =====
function renderProgress() {
  const levelPct    = calcLevelPct();
  const vocabAcc    = calcAvgAcc('vocab');
  const grammarAcc  = calcGrammarAcc();
  const readingAcc  = calcAvgAcc('reading');
  const retentionRate = calcRetention();
  const velocity    = calcVelocity();
  const forecast    = calcForecast(levelPct, velocity);
  const weakWords   = getWeakWords(4);
  const weakGrammar = getWeakGrammar();
  const insights    = buildInsights();

  const levelNames = {
    A1:'Beginner', A2:'Elementary', B1:'Intermediate',
    B2:'Upper Intermediate', C1:'Advanced', C2:'Mastery',
  };

  const boxLabels = ['',t('very_weak'),t('weak'),t('learning'),t('good'),t('strong'),t('master')];
  const boxHTML = [1,2,3,4,5,6].map(n => `
    <div class="bx b${n}">
      <div class="bn">${n}</div>
      <div class="bl">${boxLabels[n]}</div>
      <div class="bc">${STATE.boxes[n]||0}</div>
    </div>`).join('');

  const weakWordsHTML = weakWords.map(w => {
    const acc      = w.seen ? Math.round((w.correct / w.seen) * 100) : 0;
    const halfLife = calcHalfLife(w);
    const thai     = w.meanings ? w.meanings[0].th : (w.thai || '');
    return `<div class="wrow">
      <div>
        <div class="w">${w.word}</div>
        <div class="wm">
          ${thai} ·
          ${t('prog_wrong')} ${w.seen - w.correct} ${t('prog_times')} ·
          ${t('prog_halflife_label')}${halfLife} ${t('days_label')}
        </div>
      </div>
      <span class="chip ${getAccChip(acc)}">${acc}%</span>
    </div>`;
  }).join('');

  const weakGrammarHTML = weakGrammar.map(([topic, v]) => {
    const acc = Math.round((v.correct / v.attempts) * 100);
    return `<div class="wrow">
      <div>
        <div class="w">${topic}</div>
        <div class="wm">
          ${v.attempts} ${t('prog_times')} ·
          ${t('prog_wrong')} ${v.attempts - v.correct} ${t('prog_times')}
        </div>
      </div>
      <span class="chip ${getAccChip(acc)}">${acc}%</span>
    </div>`;
  }).join('');

  const insightsHTML = insights.map(ins => `
    <div class="insight-row">
      <div class="insight-icon ${ins.type}">
        <i class="ti ti-${ins.icon}"></i>
      </div>
      <div>
        <div class="insight-t">${ins.title}</div>
        <div class="insight-s">${ins.body}</div>
      </div>
    </div>`).join('');

  document.getElementById('page-progress').innerHTML = `

    <div class="sec-label" style="margin-top:4px">${t('prog_current')}</div>
    <div class="level-banner">
      <div>
        <div class="lb-big">${STATE.level} — ${levelNames[STATE.level]||''}</div>
        <div class="lb-sub">
          ${t('home_ready')} ${forecast.curr} ${t('prog_days')} · ~${forecast.date}
        </div>
      </div>
     <div style="display:flex;align-items:center;gap:10px">
        <div style="text-align:right">
          <div class="lb-pct">${levelPct}%</div>
          <div class="lb-plbl">${t('completed')}</div>
        </div>
        <svg width="52" height="52" viewBox="0 0 52 52">
          <circle cx="26" cy="26" r="22"
            fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="5"/>
          <circle cx="26" cy="26" r="22"
            fill="none" stroke="#afa9ec" stroke-width="5"
            stroke-dasharray="${Math.round(2*Math.PI*22*levelPct/100)} ${Math.round(2*Math.PI*22)}"
            stroke-dashoffset="${Math.round(2*Math.PI*22*0.25)}"
            stroke-linecap="round"/>
          <text x="26" y="30" text-anchor="middle"
            font-size="11" font-weight="600" fill="#afa9ec">${levelPct}%</text>
        </svg>
      </div>
    </div>

    <div class="sec-label">${t('prog_forecast')}</div>
    <div style="font-size:12px;color:var(--text3);margin-bottom:10px">
      ${t('prog_based')} ${velocity} ${t('prog_day')}
    </div>
    <div class="scenario-row">
      <div class="sc-card pess">
        <div class="sc-name">${t('pess')}</div>
        <div class="sc-days">${forecast.pess}</div>
        <div style="font-size:10px;color:var(--danger)">${t('prog_days')}</div>
        <div class="sc-sub">−30%<br>~${forecast.pessDate}</div>
      </div>
      <div class="sc-card curr">
        <div class="sc-name">${t('curr_pace')}</div>
        <div class="sc-days">${forecast.curr}</div>
        <div style="font-size:10px;color:var(--accent)">${t('prog_days')}</div>
        <div class="sc-sub">${velocity} ${t('settings_words_day')}<br>~${forecast.date}</div>
      </div>
      <div class="sc-card opti">
        <div class="sc-name">${t('opti')}</div>
        <div class="sc-days">${forecast.opti}</div>
        <div style="font-size:10px;color:var(--success)">${t('prog_days')}</div>
        <div class="sc-sub">+20%<br>~${forecast.optiDate}</div>
      </div>
    </div>

    <div class="sec-label">${t('prog_accuracy')}</div>
    <div class="card">
      <div class="prow">
        <div class="plbl">${t('prog_vocab')}</div>
        <div class="ptrack">
          <div class="pfill" style="width:${vocabAcc}%;background:var(--accent)"></div>
        </div>
        <div class="ppct">${vocabAcc}%</div>
      </div>
      <div class="prow">
        <div class="plbl">${t('prog_grammar')}</div>
        <div class="ptrack">
          <div class="pfill" style="width:${grammarAcc}%;background:var(--teal)"></div>
        </div>
        <div class="ppct">${grammarAcc}%</div>
      </div>
      <div class="prow">
        <div class="plbl">${t('prog_reading')}</div>
        <div class="ptrack">
          <div class="pfill" style="width:${readingAcc}%;background:#ef9f27"></div>
        </div>
        <div class="ppct">${readingAcc}%</div>
      </div>
      <div class="prow">
        <div class="plbl">${t('prog_retention')}</div>
        <div class="ptrack">
          <div class="pfill" style="width:${retentionRate}%;background:var(--danger)"></div>
        </div>
        <div class="ppct">${retentionRate}%</div>
      </div>
    </div>

    <div class="sec-label">${t('prog_trend')}</div>
    <div class="card">
      <div style="display:flex;gap:4px;margin-bottom:10px;
        background:var(--surface2);border-radius:8px;padding:3px">
        ${['vocab','grammar','reading','all'].map(tab => `
          <button onclick="switchTrendTab('${tab}',this)" id="tab-${tab}"
            style="flex:1;padding:6px 4px;border:none;border-radius:6px;
              font-size:11px;cursor:pointer;transition:all 0.15s;
              background:${tab==='vocab'?'var(--surface)':'none'};
              color:${tab==='vocab'?'var(--accent)':'var(--text3)'};
              font-weight:${tab==='vocab'?'500':'400'}">
            ${tab==='vocab'?t('prog_vocab'):tab==='grammar'?t('prog_grammar'):tab==='reading'?t('prog_reading'):t('prog_all')}
          </button>`).join('')}
      </div>
      <div id="trend-legend" style="display:flex;gap:10px;margin-bottom:8px;
        font-size:11px;color:var(--text3)">
        <span style="display:flex;align-items:center;gap:4px">
          <span style="width:10px;height:10px;border-radius:2px;
            background:var(--accent);display:inline-block"></span>
          ${t('prog_vocab')}
        </span>
      </div>
      <div style="position:relative;height:160px">
        <canvas id="trend-chart"></canvas>
      </div>
    </div>

    <div class="sec-label">${t('prog_velocity')}</div>
    <div class="card">
      <div style="position:relative;height:120px">
        <canvas id="vel-chart"></canvas>
      </div>
    </div>

    <div class="sec-label">${t('prog_forgetting')}</div>
    <div class="grid2" style="margin-bottom:12px">
      <div class="stat-card">
        <div class="val" style="color:var(--danger)">${calcForgettingRate()}%</div>
        <div class="lbl">${t('prog_forget_rate')}</div>
        <div class="sub">${t('prog_forget_sub')}</div>
      </div>
      <div class="stat-card">
        <div class="val" style="color:var(--warn)">${calcRepeatMistake()}%</div>
        <div class="lbl">${t('prog_repeat')}</div>
        <div class="sub">${t('prog_repeat_sub')}</div>
      </div>
      <div class="stat-card">
        <div class="val" style="color:var(--accent)">${calcAvgHalfLife()}</div>
        <div class="lbl">${t('prog_halflife')}</div>
        <div class="sub">${t('prog_halflife_sub')}</div>
      </div>
      <div class="stat-card">
        <div class="val">${calcTotalQuestions()}</div>
        <div class="lbl">${t('prog_total_q')}</div>
        <div class="sub">${t('prog_total_sub')}</div>
      </div>
    </div>

    <div class="sec-label">${t('prog_memory')}</div>
    <div class="card">
      <div class="box-row" style="margin-bottom:10px">${boxHTML}</div>
      <div style="position:relative;height:100px">
        <canvas id="box-chart"></canvas>
      </div>
    </div>

    <div class="sec-label">${t('prog_weak_words')}</div>
    <div class="card">
      ${weakWordsHTML||`<div style="color:var(--text3);font-size:13px">${t('prog_no_data')}</div>`}
    </div>

    <div class="sec-label">${t('prog_weak_grammar')}</div>
    <div class="card">
      ${weakGrammarHTML||`<div style="color:var(--text3);font-size:13px">${t('prog_no_data')}</div>`}
    </div>

    <div class="sec-label">${t('prog_overall')}</div>
    <div class="grid2" style="margin-bottom:12px">
      <div class="stat-card">
        <div class="val">${WORDS.length}</div>
        <div class="lbl">${t('prog_total_words')}</div>
      </div>
      <div class="stat-card">
        <div class="val">${WORDS.filter(w=>w.box>=6).length}</div>
        <div class="lbl">${t('prog_mastered')}</div>
      </div>
      <div class="stat-card">
        <div class="val">${STATE.streak}</div>
        <div class="lbl">${t('prog_streak')}</div>
      </div>
      <div class="stat-card">
        <div class="val">${STATE.totalDays}</div>
        <div class="lbl">${t('prog_active_days')}</div>
      </div>
    </div>

    <div class="sec-label">${t('prog_insights')}</div>
    <div class="card">${insightsHTML}</div>
  `;

  setTimeout(() => {
    drawTrendChart('vocab');
    drawVelChart();
    drawBoxChart();
  }, 80);
}

// ===== CHARTS =====
let trendChartInst = null;
let velChartInst   = null;
let boxChartInst   = null;

function getChartDefaults() {
  return {
    gridColor: 'rgba(136,135,128,0.12)',
    tickColor: '#888780',
    tickFont:  { size:10 },
  };
}

function drawTrendChart(mode) {
  const canvas = document.getElementById('trend-chart');
  if (!canvas) return;
  if (trendChartInst) { trendChartInst.destroy(); trendChartInst=null; }

  const { gridColor, tickColor, tickFont } = getChartDefaults();
  const labels = Array.from({length:30}, (_,i) => {
    const d = new Date();
    d.setDate(d.getDate()-29+i);
    return i%5===0 ? (d.getDate()+'/'+(d.getMonth()+1)) : '';
  });

  const sets = [];
  if (mode==='vocab'||mode==='all') sets.push({
    label:t('prog_vocab'), data:[...STATE.accuracy30.vocab],
    borderColor:'#534ab7', backgroundColor:'rgba(83,74,183,0.07)',
    borderWidth:2, pointRadius:0, tension:0.4,
    fill:mode==='vocab', borderDash:mode==='all'?[]:[],
  });
  if (mode==='grammar'||mode==='all') sets.push({
    label:t('prog_grammar'), data:[...STATE.accuracy30.grammar],
    borderColor:'#1d9e75', backgroundColor:'rgba(29,158,117,0.07)',
    borderWidth:2, pointRadius:0, tension:0.4,
    fill:mode==='grammar', borderDash:mode==='all'?[4,3]:[],
  });
  if (mode==='reading'||mode==='all') sets.push({
    label:t('prog_reading'), data:[...STATE.accuracy30.reading],
    borderColor:'#ef9f27', backgroundColor:'rgba(239,159,39,0.07)',
    borderWidth:2, pointRadius:0, tension:0.4,
    fill:mode==='reading', borderDash:mode==='all'?[2,2]:[],
  });

  trendChartInst = new Chart(canvas, {
    type:'line',
    data:{ labels, datasets:sets },
    options:{
      responsive:true, maintainAspectRatio:false, animation:false,
      plugins:{
        legend:{ display:false },
        tooltip:{ mode:'index', intersect:false },
      },
      scales:{
        x:{ grid:{ color:gridColor }, ticks:{ color:tickColor, font:tickFont, maxRotation:0 }},
        y:{ min:0, max:100, grid:{ color:gridColor },
          ticks:{ color:tickColor, font:tickFont, callback:v=>v+'%' }},
      },
    },
  });
}

function switchTrendTab(mode) {
  ['vocab','grammar','reading','all'].forEach(tab => {
    const el = document.getElementById('tab-'+tab);
    if (!el) return;
    const active = tab===mode;
    el.style.background = active?'var(--surface)':'none';
    el.style.color      = active?'var(--accent)':'var(--text3)';
    el.style.fontWeight = active?'500':'400';
  });

  const legend = document.getElementById('trend-legend');
  const colors = { vocab:'var(--accent)', grammar:'var(--teal)', reading:'#ef9f27' };
  const names  = { vocab:t('prog_vocab'), grammar:t('prog_grammar'), reading:t('prog_reading') };
  const keys   = mode==='all' ? ['vocab','grammar','reading'] : [mode];
  if (legend) legend.innerHTML = keys.map(k =>
    `<span style="display:flex;align-items:center;gap:4px">
      <span style="width:10px;height:10px;border-radius:2px;
        background:${colors[k]};display:inline-block"></span>${names[k]}
    </span>`).join('');

  drawTrendChart(mode);
}

function drawVelChart() {
  const canvas = document.getElementById('vel-chart');
  if (!canvas) return;
  if (velChartInst) { velChartInst.destroy(); velChartInst=null; }

  const { gridColor, tickColor, tickFont } = getChartDefaults();
  const lang = STATE.lang || 'th';
  const days = lang==='en'
    ? ['M','T','W','Th','F','Sa','Su']
    : ['จ','อ','พ','พฤ','ศ','ส','อา'];
  const data = STATE.velocity7;
  const goal = STATE.dailyGoal;

  velChartInst = new Chart(canvas, {
    type:'bar',
    data:{
      labels:days,
      datasets:[
        {
          label: t('prog_vocab'),
          data,
          backgroundColor: data.map(v => v>=goal?'#534ab7':'#afa9ec'),
          borderRadius:4, borderSkipped:false,
        },
        {
          label: t('home_goal'),
          data: Array(7).fill(goal),
          type:'line',
          borderColor:'rgba(136,135,128,0.5)',
          borderWidth:1.5, borderDash:[4,3],
          pointRadius:0, fill:false,
        },
      ],
    },
    options:{
      responsive:true, maintainAspectRatio:false, animation:false,
      plugins:{
        legend:{ display:false },
        tooltip:{ callbacks:{ label:ctx=>ctx.parsed.y+' '+t('quiz_words') }},
      },
      scales:{
        x:{ grid:{ display:false }, ticks:{ color:tickColor, font:{ size:11 }}},
        y:{ min:0, grid:{ color:gridColor }, ticks:{ color:tickColor, font:tickFont }},
      },
    },
  });
}

function drawBoxChart() {
  const canvas = document.getElementById('box-chart');
  if (!canvas) return;
  if (boxChartInst) { boxChartInst.destroy(); boxChartInst=null; }

  const { gridColor, tickColor, tickFont } = getChartDefaults();
  const counts = [1,2,3,4,5,6].map(n => STATE.boxes[n]||0);
  const boxLabels = [
    'Box 1','Box 2','Box 3','Box 4','Box 5','Box 6',
  ];

  boxChartInst = new Chart(canvas, {
    type:'bar',
    data:{
      labels: boxLabels,
      datasets:[{
        label: t('quiz_words'),
        data: counts,
        backgroundColor:['#f09595','#fac775','#fde68a','#c0dd97','#9fe1cb','#cecbf6'],
        borderRadius:4, borderSkipped:false,
      }],
    },
    options:{
      responsive:true, maintainAspectRatio:false, animation:false,
      plugins:{
        legend:{ display:false },
        tooltip:{ callbacks:{ label:ctx=>ctx.parsed.y+' '+t('quiz_words') }},
      },
      scales:{
        x:{ grid:{ display:false }, ticks:{ color:tickColor, font:{ size:11 }}},
        y:{ grid:{ color:gridColor }, ticks:{ color:tickColor, font:tickFont }},
      },
    },
  });
}

// ===== CALCULATIONS =====
function calcAvgAcc(type) {
  const arr = STATE.accuracy30[type]||[];
  if (!arr.length) return 0;
  const last = arr.slice(-7);
  return Math.round(last.reduce((s,v)=>s+v,0)/last.length);
}

function calcRetention() {
  const total = WORDS.filter(w=>w.seen>0).length;
  if (!total) return 0;
  return Math.round(WORDS.filter(w=>w.seen>0&&w.box>=3).length/total*100);
}

function calcVelocity() {
  const v = STATE.velocity7;
  if (!v.length) return 0;
  return Math.round(v.reduce((s,x)=>s+x,0)/v.length);
}

function calcForecast(levelPct, velocity) {
  const remaining = 100-levelPct;
  const wordsLeft = Math.round((remaining/100)*WORDS.length*1.5);
  const curr = velocity>0 ? Math.max(1,Math.round(wordsLeft/velocity)) : 999;
  const pess = Math.round(curr*1.4);
  const opti = Math.round(curr*0.75);

  const addDays = n => {
    const d = new Date();
    d.setDate(d.getDate()+n);
    if (STATE.lang==='en') {
      const months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      return d.getDate()+' '+months[d.getMonth()]+' '+d.getFullYear();
    }
    const months=['ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.',
                  'ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.'];
    return d.getDate()+' '+months[d.getMonth()]+' '+(d.getFullYear()+543);
  };

  return { curr, pess, opti,
    date:addDays(curr), pessDate:addDays(pess), optiDate:addDays(opti) };
}

function calcForgettingRate() {
  const seen = WORDS.filter(w=>w.seen>2);
  if (!seen.length) return 0;
  return Math.round(seen.filter(w=>w.box===1&&w.seen>2).length/seen.length*100);
}

function calcRepeatMistake() {
  const seen = WORDS.filter(w=>w.seen>0);
  if (!seen.length) return 0;
  return Math.round(seen.filter(w=>(w.seen-w.correct)>=2).length/seen.length*100);
}

function calcHalfLife(w) {
  if (!w.seen) return '?';
  const acc = w.correct/w.seen;
  if (acc>=0.9) return '14+';
  if (acc>=0.75) return '7';
  if (acc>=0.6)  return '4';
  if (acc>=0.4)  return '2';
  return '1';
}

function calcAvgHalfLife() {
  const seen = WORDS.filter(w=>w.seen>0);
  if (!seen.length) return '—';
  const map = {'1':1,'2':2,'4':4,'7':7,'14+':14};
  const avg = seen.reduce((s,w)=>s+(map[calcHalfLife(w)]||3),0)/seen.length;
  return avg.toFixed(1);
}

function calcTotalQuestions() {
  return WORDS.reduce((s,w)=>s+(w.seen||0),0);
}

function getWeakWords(n) {
  return WORDS
    .filter(w=>w.seen>0)
    .sort((a,b)=>(a.correct/a.seen)-(b.correct/b.seen))
    .slice(0,n);
}

function getWeakGrammar() {
  return Object.entries(STATE.grammarStats)
    .filter(([,v])=>v.attempts>0)
    .sort((a,b)=>(a[1].correct/a[1].attempts)-(b[1].correct/b[1].attempts))
    .slice(0,4);
}

function buildInsights() {
  const insights      = [];
  const forgetting    = calcForgettingRate();
  const repeatMistake = calcRepeatMistake();
  const velocity      = calcVelocity();
  const weakGrammar   = getWeakGrammar();

  if (forgetting>15) insights.push({
    type:'warn', icon:'alert-triangle',
    title: STATE.lang==='en' ? 'High forgetting rate' : 'Forgetting rate สูง',
    body:  STATE.lang==='en'
      ? `${forgetting}% of words are being forgotten. Review Box 1–2 more often.`
      : `${forgetting}% ของคำที่เรียนถูกลืม ควรเพิ่มรอบทบทวน Box 1–2`,
  });
  if (repeatMistake>20) insights.push({
    type:'warn', icon:'refresh',
    title: STATE.lang==='en' ? 'Repeat mistakes' : 'ผิดคำเดิมซ้ำบ่อย',
    body:  STATE.lang==='en'
      ? `${repeatMistake}% of words wrong multiple times. Try "Review mistakes" mode.`
      : `${repeatMistake}% ของคำผิดซ้ำ ลองใช้โหมด "ทบทวนที่ตอบผิด"`,
  });
  if (weakGrammar.length>0) {
    const [topic] = weakGrammar[0];
    const acc = Math.round(weakGrammar[0][1].correct/weakGrammar[0][1].attempts*100);
    insights.push({
      type:'warn', icon:'pencil',
      title: STATE.lang==='en' ? `${topic} needs work` : `${topic} ยังอ่อนอยู่`,
      body:  STATE.lang==='en'
        ? `Accuracy ${acc}%. Use Grammar Challenge "weak topics" mode.`
        : `accuracy ${acc}% ควรทำ Grammar Challenge โหมด "ฝึก topic ที่อ่อน"`,
    });
  }
  if (velocity>=STATE.dailyGoal) insights.push({
    type:'good', icon:'trending-up',
    title: STATE.lang==='en' ? 'On track!' : 'เรียนได้ตามเป้า!',
    body:  STATE.lang==='en'
      ? `${velocity} words/day ≥ goal of ${STATE.dailyGoal}. Keep it up!`
      : `velocity ${velocity} คำ/วัน ≥ เป้า ${STATE.dailyGoal} คำ/วัน ทำต่อไปเลย`,
  });
  else if (velocity>0) insights.push({
    type:'info', icon:'target',
    title: STATE.lang==='en' ? 'Increase velocity' : 'เพิ่ม velocity อีกนิด',
    body:  STATE.lang==='en'
      ? `Currently ${velocity}/day, goal is ${STATE.dailyGoal}. Add ${STATE.dailyGoal-velocity} more words/day.`
      : `ตอนนี้ ${velocity} คำ/วัน เป้า ${STATE.dailyGoal} คำ/วัน เพิ่มอีก ${STATE.dailyGoal-velocity} คำ`,
  });
  if (insights.length===0) insights.push({
    type:'good', icon:'star',
    title: STATE.lang==='en' ? 'Everything looks great!' : 'ทุกอย่างดีมาก!',
    body:  STATE.lang==='en'
      ? 'Consistency is the key. Keep going!'
      : 'ทำต่อไปเรื่อยๆ ความสม่ำเสมอคือกุญแจสำคัญ',
  });
  return insights;
}
