// ===== APP STATE =====
const STATE = {
  level: 'B1',
  dailyGoal: 20,
  darkMode: false,
  streak: 7,
  grammarLevel: 'A1',
  totalDays: 23,
  boxes: { 1:18, 2:24, 3:31, 4:22, 5:16, 6:9 },
  grammarStats: {
    'Past Simple':       { attempts:31, correct:25 },
    'Present Perfect':   { attempts:22, correct:10 },
    'Passive Voice':     { attempts:18, correct: 9 },
    'Conditionals':      { attempts:15, correct: 9 },
    'Modal Verbs':       { attempts: 9, correct: 6 },
  },
  todayNew: 12,
  todayReview: 8,
  todayGrammar: 5,
  todayAccuracy: 84,
  velocity7: [8,15,20,12,18,22,12],
  accuracy30: {
    vocab:   [58,60,62,59,63,65,64,67,66,68,70,69,71,72,70,73,74,72,75,76,75,77,76,78,77,79,78,80,79,78],
    grammar: [42,44,43,46,45,47,48,46,49,50,49,51,50,52,53,51,54,53,55,56,54,57,56,58,57,59,60,61,62,65],
    reading: [50,52,51,54,53,55,56,54,57,58,57,59,60,61,59,62,63,61,64,65,63,66,67,65,68,69,67,70,71,72],
  },
};

// ===== GRAMMAR DATABASE =====
const GRAMMAR_DB = {
  'Past Simple': {
    use: 'เหตุการณ์ที่เกิดขึ้นและจบแล้วในอดีต มักมีคำบอกเวลาเช่น yesterday, last year, ago',
    structure: 'Subject + V2 (past form)',
    negative: 'Subject + did not + V1',
    question: 'Did + Subject + V1?',
    examples: [
      'She achieved her goal last year.',
      'They negotiated a deal in 2022.',
      'He did not contribute to the project.',
    ],
  },
  'Present Perfect': {
    use: 'เหตุการณ์ที่เกิดในอดีตแต่ยังเชื่อมกับปัจจุบัน หรือประสบการณ์ มักมี since, for, already, yet',
    structure: 'Subject + have / has + V3',
    negative: 'Subject + have/has + not + V3',
    question: 'Have / Has + Subject + V3?',
    examples: [
      'She has achieved a lot in her career.',
      'They have negotiated successfully since 2020.',
      'He has not contributed any ideas yet.',
    ],
  },
  'Passive Voice': {
    use: 'เน้นผลลัพธ์หรือสิ่งที่ถูกกระทำ ไม่เน้นผู้กระทำ ใช้บ่อยในงานเขียนวิชาการและข่าว',
    structure: 'Subject + was / were + V3',
    negative: 'Subject + was/were + not + V3',
    question: 'Was / Were + Subject + V3?',
    examples: [
      'The goal was achieved by the entire team.',
      'A new deal was negotiated last month.',
      'Many ideas were contributed by the students.',
    ],
  },
  'Conditionals': {
    use: 'Second Conditional — สถานการณ์สมมติที่ไม่น่าเป็นจริงในปัจจุบันหรืออนาคต',
    structure: 'If + Subject + V2,  Subject + would + V1',
    negative: 'If + Subject + did not + V1,  Subject + would not + V1',
    question: 'What would happen if...?',
    examples: [
      'If she persisted, she would achieve her goal.',
      'If they negotiated better, they would win.',
      'If he contributed more, the team would improve.',
    ],
  },
  'Modal Verbs': {
    use: 'แสดงความสามารถ ความเป็นไปได้ คำแนะนำ หรือความจำเป็น',
    structure: 'Subject + modal + V1  (modal = can/could/should/must/might/may)',
    negative: 'Subject + modal + not + V1',
    question: 'Modal + Subject + V1?',
    examples: [
      'You should emphasize the key points.',
      'She can achieve anything with effort.',
      'They might negotiate a better deal.',
    ],
  },
  'Future Simple': {
    use: 'การกระทำหรือเหตุการณ์ในอนาคต การตัดสินใจทันที หรือการคาดการณ์',
    structure: 'Subject + will + V1',
    negative: 'Subject + will not (won\'t) + V1',
    question: 'Will + Subject + V1?',
    examples: [
      'She will achieve her target next month.',
      'They will negotiate the terms tomorrow.',
      'He will not contribute if he is busy.',
    ],
  },
  'Present Continuous': {
    use: 'การกระทำที่กำลังเกิดขึ้นตอนนี้ หรือแผนในอนาคตที่แน่นอน',
    structure: 'Subject + am/is/are + V-ing',
    negative: 'Subject + am/is/are + not + V-ing',
    question: 'Am/Is/Are + Subject + V-ing?',
    examples: [
      'She is currently analyzing the data.',
      'They are negotiating a new agreement.',
      'He is not contributing to the discussion.',
    ],
  },
};

// ===== VOCABULARY DATABASE (B1 core — 40 words) =====
// Full version will load from Oxford 3000 JSON
const WORDS = [{
    word: 'achieve',
    level: 'A2',
    partOfSpeech: ['verb [T]'],
    ipa_uk: '/əˈtʃiːv/',
    ipa_us: '/əˈtʃiːv/',
    meanings: [
      { pos: 'verb [T]', en: 'To successfully reach a goal or complete something through effort.', th: 'บรรลุ, ทำสำเร็จ' },
    ],
    antonyms: ['fail', 'lose'],
    examples: [
      'She achieved her dream of becoming a pilot after years of training.',
      'The team achieved excellent results through consistent hard work.',
      'Nothing great can be achieved without dedication and patience.',
    ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'adapt',
    level: 'B1',
    partOfSpeech: ['verb [I]', 'verb [T]'],
    ipa_uk: '/əˈdæpt/',
    ipa_us: '/əˈdæpt/',
    meanings: [
      { pos: 'verb [I]', en: 'To change your behaviour to deal with a new situation.', th: 'ปรับตัว' },
      { pos: 'verb [T]', en: 'To change something so that it works in a different situation.', th: 'ดัดแปลง' },
    ],
    antonyms: ['resist', 'reject'],
    examples: [
      'It took her several months to adapt to life in a new country.',
      'The director adapted the novel into a successful film.',
      'Animals that cannot adapt to climate change may become extinct.',
    ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'adequate',
    level: 'B2',
    partOfSpeech: ['adjective'],
    ipa_uk: '/ˈædɪkwət/',
    ipa_us: '/ˈædɪkwət/',
    meanings: [
      { pos: 'adjective', en: 'Enough in quantity or acceptable in quality for a particular purpose.', th: 'เพียงพอ, พอใช้ได้' },
    ],
    antonyms: ['inadequate', 'insufficient'],
    examples: [
      'The shelter provided adequate protection from the rain.',
      'Her preparation was adequate but not exceptional.',
      'We must ensure all students have adequate access to learning materials.',
    ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'affect',
    level: 'B1',
    partOfSpeech: ['verb [T]'],
    ipa_uk: '/əˈfekt/',
    ipa_us: '/əˈfekt/',
    meanings: [
      { pos: 'verb [T]', en: 'To have an influence on someone or something and cause a change.', th: 'ส่งผลต่อ, มีผลกระทบต่อ' },
    ],
    antonyms: ['ignore', 'exclude'],
    examples: [
      'The heavy rain affected the outdoor concert severely.',
      'Stress can significantly affect both your physical and mental health.',
      'Rising fuel prices have affected the cost of everyday goods.',
    ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'ambition',
    level: 'A2',
    partOfSpeech: ['noun [C]', 'noun [U]'],
    ipa_uk: '/æmˈbɪʃən/',
    ipa_us: '/æmˈbɪʃən/',
    meanings: [
      { pos: 'noun [C]', en: 'A strong desire to achieve a specific goal.', th: 'ความทะเยอทะยาน, เป้าหมายที่ต้องการ' },
      { pos: 'noun [U]', en: 'The general quality of being determined to succeed.', th: 'ความมุ่งมั่น, ความทะเยอทะยาน' },
    ],
    antonyms: ['laziness', 'indifference'],
    examples: [
      'Her ambition is to run her own company before she turns thirty.',
      'He has always had great ambition and rarely gives up on anything.',
      'Without ambition, it is difficult to push yourself beyond your limits.',
    ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'apparent',
    level: 'B1',
    partOfSpeech: ['adjective'],
    ipa_uk: '/əˈpærənt/',
    ipa_us: '/əˈpærənt/',
    meanings: [
      { pos: 'adjective', en: 'Easy to see or understand; clearly visible or obvious.', th: 'ชัดเจน, เห็นได้ชัด' },
      { pos: 'adjective', en: 'Seeming to be true but possibly not actually so.', th: 'ที่ดูเหมือนจะเป็น, ที่ปรากฏ' },
    ],
    antonyms: ['hidden', 'unclear'],
    examples: [
      'It was apparent from her expression that she was deeply upset.',
      'The apparent cause of the fire was an electrical fault.',
      'His enthusiasm for the project was apparent to everyone in the room.',
    ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'arrange',
    level: 'B1',
    partOfSpeech: ['verb [T]', 'verb [I]'],
    ipa_uk: '/əˈreɪndʒ/',
    ipa_us: '/əˈreɪndʒ/',
    meanings: [
      { pos: 'verb [T]', en: 'To plan or organise something in advance.', th: 'จัดการ, จัดเตรียม, นัดหมาย' },
      { pos: 'verb [T]', en: 'To put things in a particular order or position.', th: 'จัดเรียง, จัดวาง' },
    ],
    antonyms: ['cancel', 'disorganise'],
    examples: [
      'She arranged a meeting with the team for the following Monday.',
      'He carefully arranged the books on the shelf by subject.',
      'Can you arrange for someone to pick her up from the airport?',
    ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'attitude',
    level: 'A2',
    partOfSpeech: ['noun [C]', 'noun [U]'],
    ipa_uk: '/ˈætɪtjuːd/',
    ipa_us: '/ˈætɪtuːd/',
    meanings: [
      { pos: 'noun [C/U]', en: 'The way you think and feel about someone or something, shown in your behaviour.', th: 'ทัศนคติ, ท่าที' },
    ],
    antonyms: ['indifference'],
    examples: [
      'She always approaches problems with a positive attitude.',
      'His attitude towards learning changed dramatically after the experience.',
      'A good attitude can make a significant difference in the workplace.',
    ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'avoid',
    level: 'A2',
    partOfSpeech: ['verb [T]'],
    ipa_uk: '/əˈvɔɪd/',
    ipa_us: '/əˈvɔɪd/',
    meanings: [
      { pos: 'verb [T]', en: 'To stay away from someone or something, or to prevent something from happening.', th: 'หลีกเลี่ยง, เลี่ยง' },
    ],
    antonyms: ['seek', 'confront'],
    examples: [
      'She took a different route to avoid the heavy traffic.',
      'Try to avoid making promises you cannot keep.',
      'He avoided eye contact during the entire conversation.',
    ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'aware',
    level: 'B1',
    partOfSpeech: ['adjective'],
    ipa_uk: '/əˈweə/',
    ipa_us: '/əˈwer/',
    meanings: [
      { pos: 'adjective', en: 'Knowing that something exists or is happening.', th: 'ตระหนัก, รู้ตัว, รับรู้' },
    ],
    antonyms: ['unaware', 'ignorant'],
    examples: [
      'Are you aware of the changes to the company policy?',
      'She became aware of a strange smell coming from the kitchen.',
      'Being aware of your surroundings is important for personal safety.',
    ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'benefit',
    level: 'B1',
    partOfSpeech: ['noun [C]', 'noun [U]', 'verb [I]', 'verb [T]'],
    ipa_uk: '/ˈbenɪfɪt/',
    ipa_us: '/ˈbenɪfɪt/',
    meanings: [
      { pos: 'noun [C/U]', en: 'An advantage or something that has a helpful or good effect.', th: 'ประโยชน์, ผลดี' },
      { pos: 'verb [I/T]', en: 'To be helped by something or to help someone.', th: 'ได้รับประโยชน์, เป็นประโยชน์ต่อ' },
    ],
    antonyms: ['harm', 'disadvantage'],
    examples: [
      'Regular exercise has many benefits for both body and mind.',
      'The new law will benefit thousands of low-income families.',
      'She benefited greatly from the mentoring programme.',
    ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'challenge',
    level: 'A2',
    partOfSpeech: ['noun [C]', 'verb [T]'],
    ipa_uk: '/ˈtʃælɪndʒ/',
    ipa_us: '/ˈtʃælɪndʒ/',
    meanings: [
      { pos: 'noun [C]', en: 'Something difficult that requires great effort and determination.', th: 'ความท้าทาย, สิ่งที่ยากแต่น่าทำ' },
      { pos: 'verb [T]', en: 'To question whether something is right or to invite someone to compete.', th: 'ท้าทาย, โต้แย้ง' },
    ],
    antonyms: ['ease', 'accept'],
    examples: [
      'Learning a new language is always a rewarding challenge.',
      'She challenged the manager\'s decision in the team meeting.',
      'The young athlete rose to the challenge and broke the national record.',
    ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'communicate',
    level: 'A2',
    partOfSpeech: ['verb [I]', 'verb [T]'],
    ipa_uk: '/kəˈmjuːnɪkeɪt/',
    ipa_us: '/kəˈmjuːnɪkeɪt/',
    meanings: [
      { pos: 'verb [I/T]', en: 'To share information, ideas, or feelings with someone using speech, writing, or other methods.', th: 'สื่อสาร, ติดต่อ' },
    ],
    antonyms: ['conceal', 'withhold'],
    examples: [
      'It is essential to communicate clearly when working in a team.',
      'She communicates her ideas effectively through detailed written reports.',
      'Parents should communicate openly with their children about difficult topics.',
    ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'concentrate',
    level: 'A2',
    partOfSpeech: ['verb [I]'],
    ipa_uk: '/ˈkɒnsəntreɪt/',
    ipa_us: '/ˈkɑːnsəntreɪt/',
    meanings: [
      { pos: 'verb [I]', en: 'To focus all your attention and effort on a particular task or subject.', th: 'มุ่งความสนใจ, จดจ่อ, ตั้งสมาธิ' },
    ],
    antonyms: ['distract', 'scatter'],
    examples: [
      'It is hard to concentrate when there is too much noise around you.',
      'She concentrated on finishing the report before the deadline.',
      'You need to concentrate fully during the final examination.',
    ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'confident',
    level: 'A2',
    partOfSpeech: ['adjective'],
    ipa_uk: '/ˈkɒnfɪdənt/',
    ipa_us: '/ˈkɑːnfɪdənt/',
    meanings: [
      { pos: 'adjective', en: 'Feeling certain about your own abilities or that something will happen as expected.', th: 'มั่นใจ, มีความเชื่อมั่น' },
    ],
    antonyms: ['insecure', 'uncertain'],
    examples: [
      'She felt confident and well-prepared before the job interview.',
      'He gave a confident and clear presentation to the entire board.',
      'Being confident does not mean you never make mistakes.',
    ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'conflict',
    level: 'B1',
    partOfSpeech: ['noun [C]', 'noun [U]', 'verb [I]'],
    ipa_uk: '/ˈkɒnflɪkt/',
    ipa_us: '/ˈkɑːnflɪkt/',
    meanings: [
      { pos: 'noun [C/U]', en: 'A serious disagreement or fight between people or groups.', th: 'ความขัดแย้ง, การปะทะ' },
      { pos: 'verb [I]', en: 'To be different from or oppose something else.', th: 'ขัดแย้งกัน, ไม่สอดคล้องกัน' },
    ],
    antonyms: ['agreement', 'harmony'],
    examples: [
      'The two departments were in conflict over the budget allocation.',
      'His personal values conflicted with the company\'s approach to business.',
      'Resolving conflict through calm discussion is always more effective.',
    ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'consequence',
    level: 'A2',
    partOfSpeech: ['noun [C]'],
    ipa_uk: '/ˈkɒnsɪkwəns/',
    ipa_us: '/ˈkɑːnsɪkwəns/',
    meanings: [
      { pos: 'noun [C]', en: 'A result or effect of an action or situation, often negative.', th: 'ผลที่ตามมา, ผลลัพธ์' },
    ],
    antonyms: ['cause', 'origin'],
    examples: [
      'She had to face the consequences of her poor decision.',
      'One consequence of the storm was widespread flooding across the region.',
      'Every action has a consequence, whether positive or negative.',
    ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'consistent',
    level: 'B2',
    partOfSpeech: ['adjective'],
    ipa_uk: '/kənˈsɪstənt/',
    ipa_us: '/kənˈsɪstənt/',
    meanings: [
      { pos: 'adjective', en: 'Always behaving in the same way or having the same quality over time.', th: 'สม่ำเสมอ, สอดคล้องกัน' },
      { pos: 'adjective', en: 'In agreement with something else; not contradicting.', th: 'ที่สอดคล้องกับ, ที่ไม่ขัดแย้ง' },
    ],
    antonyms: ['inconsistent', 'erratic'],
    examples: [
      'Her performance has been consistent throughout the entire season.',
      'The witness\'s account was consistent with the physical evidence.',
      'Being consistent in your study habits leads to better long-term results.',
    ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'contribute',
    level: 'B1',
    partOfSpeech: ['verb [I]', 'verb [T]'],
    ipa_uk: '/kənˈtrɪbjuːt/',
    ipa_us: '/kənˈtrɪbjuːt/',
    meanings: [
      { pos: 'verb [I/T]', en: 'To give something such as time, money, or ideas in order to help achieve a result.', th: 'มีส่วนร่วม, ช่วยเหลือ, บริจาค' },
    ],
    antonyms: ['withhold', 'hinder'],
    examples: [
      'Everyone in the team contributed ideas during the brainstorming session.',
      'She contributed a large sum of money to the local charity.',
      'Regular exercise contributes significantly to better mental health.',
    ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'creative',
    level: 'A2',
    partOfSpeech: ['adjective'],
    ipa_uk: '/kriˈeɪtɪv/',
    ipa_us: '/kriˈeɪtɪv/',
    meanings: [
      { pos: 'adjective', en: 'Having the ability to produce new and original ideas or things.', th: 'สร้างสรรค์, มีความคิดริเริ่ม' },
    ],
    antonyms: ['unimaginative', 'conventional'],
    examples: [
      'The children came up with very creative solutions to the problem.',
      'She has always been creative and enjoys painting in her spare time.',
      'Creative thinking is one of the most valued skills in modern workplaces.',
    ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'curious',
    level: 'B1',
    partOfSpeech: ['adjective'],
    ipa_uk: '/ˈkjʊəriəs/',
    ipa_us: '/ˈkjʊriəs/',
    meanings: [
      { pos: 'adjective', en: 'Having a strong desire to know or learn about something.', th: 'อยากรู้อยากเห็น, สงสัย' },
      { pos: 'adjective', en: 'Strange or unusual in a way that attracts attention.', th: 'แปลก, น่าประหลาด' },
    ],
    antonyms: ['indifferent', 'uninterested'],
    examples: [
      'Children are naturally curious about how the world around them works.',
      'She gave him a curious look when he mentioned the strange event.',
      'He was curious about the history of the abandoned building.',
    ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'deadline',
    level: 'B1',
    partOfSpeech: ['noun [C]'],
    ipa_uk: '/ˈdedlaɪn/',
    ipa_us: '/ˈdedlaɪn/',
    meanings: [
      { pos: 'noun [C]', en: 'A point in time by which something must be finished or completed.', th: 'กำหนดเวลา, เส้นตาย' },
    ],
    antonyms: ['extension', 'unlimited'],
    examples: [
      'The deadline for submitting your application is this Friday at noon.',
      'She always works best under pressure when a deadline is approaching.',
      'Missing a deadline can seriously damage your professional reputation.',
    ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'debate',
    level: 'A2',
    partOfSpeech: ['noun [C]', 'noun [U]', 'verb [I]', 'verb [T]'],
    ipa_uk: '/dɪˈbeɪt/',
    ipa_us: '/dɪˈbeɪt/',
    meanings: [
      { pos: 'noun [C/U]', en: 'A formal discussion in which people express different opinions about a topic.', th: 'การอภิปราย, การถกเถียง' },
      { pos: 'verb [I/T]', en: 'To discuss a topic formally or to consider different options carefully.', th: 'อภิปราย, ถกเถียง, พิจารณา' },
    ],
    antonyms: ['agreement', 'consensus'],
    examples: [
      'The politicians took part in a live debate broadcast on national television.',
      'Students debated the causes of climate change for over an hour.',
      'She debated whether to accept the job offer or stay in her current role.',
    ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'decision',
    level: 'B1',
    partOfSpeech: ['noun [C]'],
    ipa_uk: '/dɪˈsɪʒən/',
    ipa_us: '/dɪˈsɪʒən/',
    meanings: [
      { pos: 'noun [C]', en: 'A choice that you make after thinking carefully about several possibilities.', th: 'การตัดสินใจ, ข้อสรุป' },
    ],
    antonyms: ['indecision', 'hesitation'],
    examples: [
      'Choosing a career is one of the most important decisions you will ever make.',
      'The manager made a final decision after consulting the entire team.',
      'She regretted her hasty decision to resign without another job lined up.',
    ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'demonstrate',
    level: 'B1',
    partOfSpeech: ['verb [T]', 'verb [I]'],
    ipa_uk: '/ˈdemənstreɪt/',
    ipa_us: '/ˈdemənstreɪt/',
    meanings: [
      { pos: 'verb [T]', en: 'To show clearly that something exists or is true by giving evidence or examples.', th: 'แสดงให้เห็น, พิสูจน์' },
      { pos: 'verb [T]', en: 'To show how something works or is done.', th: 'สาธิต, แสดงวิธีการ' },
      { pos: 'verb [I]', en: 'To take part in a public protest.', th: 'ประท้วง, ชุมนุม' },
    ],
    antonyms: ['conceal', 'disprove'],
    examples: [
      'The results clearly demonstrate that the new treatment is effective.',
      'She demonstrated how to use the software step by step.',
      'Thousands of people gathered to demonstrate against the new policy.',
    ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'despite',
    level: 'B1',
    partOfSpeech: ['preposition'],
    ipa_uk: '/dɪˈspaɪt/',
    ipa_us: '/dɪˈspaɪt/',
    meanings: [
      { pos: 'preposition', en: 'Used to show that something happened even though something else might have prevented it.', th: 'ทั้งๆ ที่, แม้ว่า' },
    ],
    antonyms: ['because of', 'due to'],
    examples: [
      'She completed the marathon despite having a knee injury.',
      'Despite the heavy rain, the outdoor event continued as planned.',
      'He remained optimistic despite facing many serious setbacks.',
    ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'determine',
    level: 'B1',
    partOfSpeech: ['verb [T]'],
    ipa_uk: '/dɪˈtɜːmɪn/',
    ipa_us: '/dɪˈtɜːrmɪn/',
    meanings: [
      { pos: 'verb [T]', en: 'To discover the facts about something or to officially decide something.', th: 'กำหนด, ตัดสิน, ค้นหา' },
      { pos: 'verb [T]', en: 'To be the main factor that controls or influences something.', th: 'เป็นตัวกำหนด, มีผลต่อ' },
    ],
    antonyms: ['ignore', 'neglect'],
    examples: [
      'Investigators worked hard to determine the exact cause of the accident.',
      'Your attitude often determines how successful you will be in life.',
      'The committee will determine whether the project receives funding.',
    ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'diverse',
    level: 'B1',
    partOfSpeech: ['adjective'],
    ipa_uk: '/daɪˈvɜːs/',
    ipa_us: '/daɪˈvɜːrs/',
    meanings: [
      { pos: 'adjective', en: 'Including many different types of people, things, or ideas.', th: 'หลากหลาย, แตกต่างกัน' },
    ],
    antonyms: ['uniform', 'homogeneous'],
    examples: [
      'The city is known for its diverse population and rich cultural heritage.',
      'She has a diverse range of skills that make her a valuable employee.',
      'A diverse team tends to produce more innovative and creative solutions.',
    ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'emphasize',
    level: 'B1',
    partOfSpeech: ['verb [T]'],
    ipa_uk: '/ˈemfəsaɪz/',
    ipa_us: '/ˈemfəsaɪz/',
    meanings: [
      { pos: 'verb [T]', en: 'To give special importance or attention to something when speaking or writing.', th: 'เน้น, ย้ำ, ให้ความสำคัญ' },
    ],
    antonyms: ['downplay', 'minimise'],
    examples: [
      'The doctor emphasized the importance of getting enough sleep every night.',
      'She emphasized her key points by speaking more slowly and clearly.',
      'The report emphasizes that immediate action is required to prevent further damage.',
    ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'essential',
    level: 'B1',
    partOfSpeech: ['adjective', 'noun [C]'],
    ipa_uk: '/ɪˈsenʃəl/',
    ipa_us: '/ɪˈsenʃəl/',
    meanings: [
      { pos: 'adjective', en: 'Completely necessary and extremely important.', th: 'จำเป็น, สำคัญมาก' },
      { pos: 'noun [C]', en: 'Something that is absolutely necessary.', th: 'สิ่งจำเป็น, สิ่งสำคัญ' },
    ],
    antonyms: ['unnecessary', 'optional'],
    examples: [
      'Clean water and food are essential for human survival.',
      'She packed only the essentials for her two-week trip abroad.',
      'Good communication skills are essential in almost every profession.',
    ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'evaluate',
    level: 'B2',
    partOfSpeech: ['verb [T]'],
    ipa_uk: '/ɪˈvæljueɪt/',
    ipa_us: '/ɪˈvæljueɪt/',
    meanings: [
      { pos: 'verb [T]', en: 'To carefully consider or examine something in order to judge its quality or value.', th: 'ประเมิน, ตีค่า, วัดผล' },
    ],
    antonyms: ['ignore', 'overlook'],
    examples: [
      'Teachers evaluate students through a combination of tests and coursework.',
      'We need to evaluate all the risks before making a final decision.',
      'The committee will evaluate each application based on set criteria.',
    ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'evident',
    level: 'B1',
    partOfSpeech: ['adjective'],
    ipa_uk: '/ˈevɪdənt/',
    ipa_us: '/ˈevɪdənt/',
    meanings: [
      { pos: 'adjective', en: 'Clearly seen or understood; obvious.', th: 'ชัดเจน, เห็นได้ชัด' },
    ],
    antonyms: ['unclear', 'hidden'],
    examples: [
      'It was evident from her tone that she was not pleased with the outcome.',
      'The improvement in his performance was evident to everyone on the team.',
      'The damage caused by the storm was evident throughout the entire neighbourhood.',
    ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'expand',
    level: 'B1',
    partOfSpeech: ['verb [I]', 'verb [T]'],
    ipa_uk: '/ɪkˈspænd/',
    ipa_us: '/ɪkˈspænd/',
    meanings: [
      { pos: 'verb [I/T]', en: 'To become larger in size, number, or amount, or to make something larger.', th: 'ขยาย, เพิ่มขึ้น, ขยายตัว' },
    ],
    antonyms: ['shrink', 'reduce'],
    examples: [
      'The company plans to expand into new international markets next year.',
      'Reading regularly helps expand your vocabulary over time.',
      'The balloon expanded rapidly as more air was pumped inside.',
    ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'experience',
    level: 'B1',
    partOfSpeech: ['noun [C]', 'noun [U]', 'verb [T]'],
    ipa_uk: '/ɪkˈspɪəriəns/',
    ipa_us: '/ɪkˈspɪriəns/',
    meanings: [
      { pos: 'noun [U]', en: 'Knowledge or skill gained from doing something over a period of time.', th: 'ประสบการณ์, ความชำนาญ' },
      { pos: 'noun [C]', en: 'Something that happens to you and affects how you feel.', th: 'ประสบการณ์, เหตุการณ์ที่ผ่านมา' },
      { pos: 'verb [T]', en: 'To have something happen to you or feel something.', th: 'ประสบ, พบเจอ, รู้สึก' },
    ],
    antonyms: ['inexperience', 'ignorance'],
    examples: [
      'She has over ten years of experience working in international finance.',
      'Travelling alone was a life-changing experience for him.',
      'Many people experience anxiety before an important job interview.',
    ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'flexible',
    level: 'B2',
    partOfSpeech: ['adjective'],
    ipa_uk: '/ˈfleksɪbəl/',
    ipa_us: '/ˈfleksɪbəl/',
    meanings: [
      { pos: 'adjective', en: 'Able to change easily according to different situations or requirements.', th: 'ยืดหยุ่น, ปรับได้' },
      { pos: 'adjective', en: 'Able to bend easily without breaking.', th: 'งอได้, โค้งได้' },
    ],
    antonyms: ['rigid', 'inflexible'],
    examples: [
      'The new working arrangement offers employees a more flexible schedule.',
      'You need to be flexible when travelling, as plans can change quickly.',
      'This flexible material can be bent into almost any shape without breaking.',
    ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'focus',
    level: 'A1',
    partOfSpeech: ['verb [I]', 'verb [T]', 'noun [U]', 'noun [C]'],
    ipa_uk: '/ˈfəʊkəs/',
    ipa_us: '/ˈfoʊkəs/',
    meanings: [
      { pos: 'verb [I/T]', en: 'To give all your attention to something or to make something clearer.', th: 'มุ่งเน้น, จดจ่อ, โฟกัส' },
      { pos: 'noun [U]', en: 'The main subject of attention or interest.', th: 'จุดสนใจ, ความสนใจหลัก' },
    ],
    antonyms: ['distract', 'ignore'],
    examples: [
      'Try to focus on one task at a time rather than doing everything at once.',
      'The focus of the meeting was on improving customer satisfaction.',
      'She focused the camera carefully before taking the photograph.',
    ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'fundamental',
    level: 'B2',
    partOfSpeech: ['adjective', 'noun [C]'],
    ipa_uk: '/ˌfʌndəˈmentəl/',
    ipa_us: '/ˌfʌndəˈmentəl/',
    meanings: [
      { pos: 'adjective', en: 'Forming the most basic and important part of something.', th: 'พื้นฐาน, สำคัญอย่างยิ่ง' },
      { pos: 'noun [C]', en: 'A basic rule or principle that something is based on.', th: 'หลักพื้นฐาน, สิ่งสำคัญที่สุด' },
    ],
    antonyms: ['minor', 'secondary'],
    examples: [
      'Trust is fundamental to any strong and lasting relationship.',
      'The fundamentals of good writing include clarity and structure.',
      'There is a fundamental difference between the two approaches to the problem.',
    ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'generate',
    level: 'B1',
    partOfSpeech: ['verb [T]'],
    ipa_uk: '/ˈdʒenəreɪt/',
    ipa_us: '/ˈdʒenəreɪt/',
    meanings: [
      { pos: 'verb [T]', en: 'To produce or create something, such as energy, money, or ideas.', th: 'สร้าง, ก่อให้เกิด, ผลิต' },
    ],
    antonyms: ['destroy', 'consume'],
    examples: [
      'The new factory will generate hundreds of jobs for the local community.',
      'Solar panels generate electricity from sunlight without producing pollution.',
      'The controversial decision generated a great deal of public debate.',
    ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'genuine',
    level: 'B2',
    partOfSpeech: ['adjective'],
    ipa_uk: '/ˈdʒenjuɪn/',
    ipa_us: '/ˈdʒenjuɪn/',
    meanings: [
      { pos: 'adjective', en: 'Real and exactly what it appears to be; not false or copied.', th: 'แท้จริง, ของแท้' },
      { pos: 'adjective', en: 'Honest and sincere in feelings or intentions.', th: 'จริงใจ, ซื่อสัตย์' },
    ],
    antonyms: ['fake', 'artificial'],
    examples: [
      'The museum confirmed that the painting was a genuine work by the artist.',
      'She showed genuine concern for the wellbeing of her students.',
      'He gave a genuine smile rather than a polite but empty one.',
    ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'guarantee',
    level: 'B1',
    partOfSpeech: ['verb [T]', 'noun [C]'],
    ipa_uk: '/ˌɡærənˈtiː/',
    ipa_us: '/ˌɡærənˈtiː/',
    meanings: [
      { pos: 'verb [T]', en: 'To promise that something will definitely happen or be done.', th: 'รับประกัน, การันตี' },
      { pos: 'noun [C]', en: 'A firm promise that something will happen or that a product will work correctly.', th: 'การรับประกัน, สัญญา' },
    ],
    antonyms: ['doubt', 'uncertainty'],
    examples: [
      'I cannot guarantee that the package will arrive before the weekend.',
      'The product comes with a two-year guarantee against any manufacturing defects.',
      'Hard work does not always guarantee success, but it certainly improves your chances.',
    ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'identify',
    level: 'B2',
    partOfSpeech: ['verb [T]'],
    ipa_uk: '/aɪˈdentɪfaɪ/',
    ipa_us: '/aɪˈdentɪfaɪ/',
    meanings: [
      { pos: 'verb [T]', en: 'To recognise and name someone or something.', th: 'ระบุ, จำแนก, บ่งชี้' },
      { pos: 'verb [T]', en: 'To find or discover something.', th: 'ค้นพบ, หาพบ' },
    ],
    antonyms: ['overlook', 'ignore'],
    examples: [
      'Police were able to identify the suspect from CCTV footage.',
      'The report identified several key problems within the organisation.',
      'Can you identify which of these plants is poisonous?',
    ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'impact',
    level: 'A2',
    partOfSpeech: ['noun [C]', 'noun [U]', 'verb [T]'],
    ipa_uk: '/ˈɪmpækt/',
    ipa_us: '/ˈɪmpækt/',
    meanings: [
      { pos: 'noun [C/U]', en: 'A powerful effect or influence that something has on a situation.', th: 'ผลกระทบ, อิทธิพล' },
      { pos: 'verb [T]', en: 'To have a strong effect on something or someone.', th: 'ส่งผลกระทบต่อ' },
    ],
    antonyms: ['insignificance', 'ineffectiveness'],
    examples: [
      'The new policy had a significant impact on small businesses.',
      'Social media has impacted the way people communicate globally.',
      'We must consider the environmental impact of our decisions.',
    ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'implement',
    level: 'B2',
    partOfSpeech: ['verb [T]'],
    ipa_uk: '/ˈɪmplɪment/',
    ipa_us: '/ˈɪmplɪment/',
    meanings: [
      { pos: 'verb [T]', en: 'To put a plan or system into action.', th: 'นำไปปฏิบัติ, ดำเนินการ' },
    ],
    antonyms: ['abandon', 'cancel'],
    examples: [
      'The school decided to implement a new grading system this year.',
      'It takes time to implement major changes within a large organisation.',
      'The government plans to implement the new law by January.',
    ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'improve',
    level: 'A2',
    partOfSpeech: ['verb [I]', 'verb [T]'],
    ipa_uk: '/ɪmˈpruːv/',
    ipa_us: '/ɪmˈpruːv/',
    meanings: [
      { pos: 'verb [I/T]', en: 'To become better or to make something better.', th: 'ดีขึ้น, ปรับปรุง' },
    ],
    antonyms: ['worsen', 'deteriorate'],
    examples: [
      'Her English improved significantly after studying abroad.',
      'The company is working hard to improve customer service.',
      'Regular practice will improve your confidence over time.',
    ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'indicate',
    level: 'A2',
    partOfSpeech: ['verb [T]'],
    ipa_uk: '/ˈɪndɪkeɪt/',
    ipa_us: '/ˈɪndɪkeɪt/',
    meanings: [
      { pos: 'verb [T]', en: 'To show that something exists or is likely to be true.', th: 'บ่งชี้, ชี้ให้เห็น, แสดง' },
      { pos: 'verb [T]', en: 'To point to or signal something.', th: 'ชี้, บอก' },
    ],
    antonyms: ['conceal', 'hide'],
    examples: [
      'Research indicates that exercise reduces the risk of heart disease.',
      'She indicated the exit with a wave of her hand.',
      'The survey results indicate a growing demand for online services.',
    ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'individual',
    level: 'B1',
    partOfSpeech: ['adjective', 'noun [C]'],
    ipa_uk: '/ˌɪndɪˈvɪdʒuəl/',
    ipa_us: '/ˌɪndɪˈvɪdʒuəl/',
    meanings: [
      { pos: 'adjective', en: 'Relating to one particular person or thing, considered separately.', th: 'รายบุคคล, แต่ละคน' },
      { pos: 'noun [C]', en: 'A single person, considered separately from a group.', th: 'บุคคล, ปัจเจกบุคคล' },
    ],
    antonyms: ['collective', 'group'],
    examples: [
      'Each individual student receives personalised feedback on their work.',
      'The rights of the individual must be protected by law.',
      'She pays close attention to the individual needs of her clients.',
    ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'influence',
    level: 'A2',
    partOfSpeech: ['noun [C]', 'noun [U]', 'verb [T]'],
    ipa_uk: '/ˈɪnfluəns/',
    ipa_us: '/ˈɪnfluəns/',
    meanings: [
      { pos: 'noun [C/U]', en: 'The power to have an effect on people or things.', th: 'อิทธิพล, การมีผลต่อ' },
      { pos: 'verb [T]', en: 'To have an effect on the way someone thinks or behaves.', th: 'มีอิทธิพลต่อ, ส่งผลต่อ' },
    ],
    antonyms: ['ineffectiveness', 'powerlessness'],
    examples: [
      'Her parents had a strong influence on her choice of career.',
      'Music can influence your mood in powerful and unexpected ways.',
      'He used his influence to help younger colleagues advance in the company.',
    ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'initiative',
    level: 'B2',
    partOfSpeech: ['noun [C]', 'noun [U]'],
    ipa_uk: '/ɪˈnɪʃətɪv/',
    ipa_us: '/ɪˈnɪʃətɪv/',
    meanings: [
      { pos: 'noun [C]', en: 'A new plan or action intended to solve a problem.', th: 'โครงการริเริ่ม, แผนการใหม่' },
      { pos: 'noun [U]', en: 'The ability to decide and act independently without waiting to be told.', th: 'ความคิดริเริ่ม, การลงมือทำด้วยตัวเอง' },
    ],
    antonyms: ['passivity', 'inaction'],
    examples: [
      'The government launched a new initiative to reduce plastic waste.',
      'She showed great initiative by solving the problem before anyone noticed.',
      'Taking initiative is one of the most valued qualities in a new employee.',
    ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'interpret',
    level: 'B2',
    partOfSpeech: ['verb [T]', 'verb [I]'],
    ipa_uk: '/ɪnˈtɜːprɪt/',
    ipa_us: '/ɪnˈtɜːrprɪt/',
    meanings: [
      { pos: 'verb [T]', en: 'To explain or understand the meaning of something.', th: 'ตีความ, แปลความหมาย' },
      { pos: 'verb [I/T]', en: 'To translate spoken words from one language to another.', th: 'แปลภาษา (พูด), ล่าม' },
    ],
    antonyms: ['misunderstand', 'misconstrue'],
    examples: [
      'Different people may interpret the same poem in very different ways.',
      'She was hired to interpret for the foreign delegation during the summit.',
      'How do you interpret his sudden silence after the announcement?',
    ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'involve',
    level: 'B1',
    partOfSpeech: ['verb [T]'],
    ipa_uk: '/ɪnˈvɒlv/',
    ipa_us: '/ɪnˈvɑːlv/',
    meanings: [
      { pos: 'verb [T]', en: 'To include something as a necessary part or result.', th: 'เกี่ยวข้อง, รวมถึง' },
      { pos: 'verb [T]', en: 'To make someone take part in something.', th: 'ให้มีส่วนร่วม, ดึงเข้ามา' },
    ],
    antonyms: ['exclude', 'omit'],
    examples: [
      'The project involves a great deal of research and careful planning.',
      'Try to involve all team members in the decision-making process.',
      'Learning a language involves consistent daily practice over time.',
    ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'issue',
    level: 'A2',
    partOfSpeech: ['noun [C]', 'verb [T]'],
    ipa_uk: '/ˈɪʃuː/',
    ipa_us: '/ˈɪʃuː/',
    meanings: [
      { pos: 'noun [C]', en: 'An important topic or problem that people are discussing.', th: 'ประเด็น, ปัญหา' },
      { pos: 'verb [T]', en: 'To officially produce or provide something.', th: 'ออก, จัดทำ, แจกจ่าย' },
    ],
    antonyms: ['solution', 'answer'],
    examples: [
      'Climate change is one of the most pressing issues of our time.',
      'The government issued a formal statement about the situation.',
      'We need to address this issue before it becomes a much bigger problem.',
    ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'justify',
    level: 'B2',
    partOfSpeech: ['verb [T]'],
    ipa_uk: '/ˈdʒʌstɪfaɪ/',
    ipa_us: '/ˈdʒʌstɪfaɪ/',
    meanings: [
      { pos: 'verb [T]', en: 'To show or prove that something is right or reasonable.', th: 'พิสูจน์ว่าถูกต้อง, หาเหตุผลสนับสนุน' },
    ],
    antonyms: ['condemn', 'invalidate'],
    examples: [
      'Can you justify spending so much money on a single event?',
      'The results clearly justified all the time and effort invested.',
      'She struggled to justify her decision to leave a well-paying job.',
    ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'maintain',
    level: 'B1',
    partOfSpeech: ['verb [T]'],
    ipa_uk: '/meɪnˈteɪn/',
    ipa_us: '/meɪnˈteɪn/',
    meanings: [
      { pos: 'verb [T]', en: 'To keep something in good condition or at the same level.', th: 'รักษา, ดูแล, คงไว้' },
      { pos: 'verb [T]', en: 'To state firmly that something is true.', th: 'ยืนยัน, ยืนกราน' },
    ],
    antonyms: ['neglect', 'abandon'],
    examples: [
      'It is important to maintain a healthy work-life balance.',
      'She maintained her position despite heavy criticism from colleagues.',
      'The building requires significant investment to maintain its structure.',
    ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'manage',
    level: 'A2',
    partOfSpeech: ['verb [T]', 'verb [I]'],
    ipa_uk: '/ˈmænɪdʒ/',
    ipa_us: '/ˈmænɪdʒ/',
    meanings: [
      { pos: 'verb [T]', en: 'To be in charge of and control something such as a business or team.', th: 'บริหาร, จัดการ' },
      { pos: 'verb [I/T]', en: 'To succeed in doing something difficult.', th: 'สามารถทำได้, รับมือได้' },
    ],
    antonyms: ['mismanage', 'fail'],
    examples: [
      'She manages a team of twenty engineers across three different countries.',
      'Did you manage to finish the report before the deadline?',
      'He has always managed his finances with great discipline and care.',
    ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'method',
    level: 'A2',
    partOfSpeech: ['noun [C]'],
    ipa_uk: '/ˈmeθəd/',
    ipa_us: '/ˈmeθəd/',
    meanings: [
      { pos: 'noun [C]', en: 'A particular way of doing something, especially one that is systematic.', th: 'วิธีการ, วิธี' },
    ],
    antonyms: ['disorder', 'chaos'],
    examples: [
      'Scientists use a controlled method to ensure their results are reliable.',
      'There are several methods you can use to improve your memory.',
      'The teaching method she uses makes complex topics easy to understand.',
    ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'motivate',
    level: 'B1',
    partOfSpeech: ['verb [T]'],
    ipa_uk: '/ˈməʊtɪveɪt/',
    ipa_us: '/ˈmoʊtɪveɪt/',
    meanings: [
      { pos: 'verb [T]', en: 'To cause someone to want to do something or work harder.', th: 'จูงใจ, กระตุ้น' },
    ],
    antonyms: ['discourage', 'demotivate'],
    examples: [
      'Good teachers know how to motivate students to reach their potential.',
      'She was motivated by her desire to make a real difference in the world.',
      'What motivates you to keep going when things become difficult?',
    ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'negotiate',
    level: 'B1',
    partOfSpeech: ['verb [I]', 'verb [T]'],
    ipa_uk: '/nɪˈɡəʊʃieɪt/',
    ipa_us: '/nɪˈɡoʊʃieɪt/',
    meanings: [
      { pos: 'verb [I/T]', en: 'To discuss something formally in order to reach an agreement.', th: 'เจรจา, ต่อรอง' },
    ],
    antonyms: ['refuse', 'demand'],
    examples: [
      'The two sides met to negotiate a peaceful end to the dispute.',
      'She negotiated a higher salary before accepting the job offer.',
      'Both companies were willing to negotiate the terms of the contract.',
    ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'obtain',
    level: 'B1',
    partOfSpeech: ['verb [T]'],
    ipa_uk: '/əbˈteɪn/',
    ipa_us: '/əbˈteɪn/',
    meanings: [
      { pos: 'verb [T]', en: 'To get something, especially by making an effort.', th: 'ได้รับ, ได้มา, หามาได้' },
    ],
    antonyms: ['lose', 'forfeit'],
    examples: [
      'You need to obtain permission before entering the restricted area.',
      'She obtained a degree in law from a highly respected university.',
      'It can be difficult to obtain accurate information from unreliable sources.',
    ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'obvious',
    level: 'B1',
    partOfSpeech: ['adjective'],
    ipa_uk: '/ˈɒbviəs/',
    ipa_us: '/ˈɑːbviəs/',
    meanings: [
      { pos: 'adjective', en: 'Easy to see or understand; clear to almost anyone.', th: 'ชัดเจน, เห็นได้ชัด, เป็นที่ประจักษ์' },
    ],
    antonyms: ['unclear', 'subtle'],
    examples: [
      'It was obvious from her face that she had been crying.',
      'The solution to the problem turned out to be surprisingly obvious.',
      'There are obvious differences between the two approaches.',
    ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'opportunity',
    level: 'A2',
    partOfSpeech: ['noun [C]', 'noun [U]'],
    ipa_uk: '/ˌɒpəˈtjuːnɪti/',
    ipa_us: '/ˌɑːpərˈtuːnɪti/',
    meanings: [
      { pos: 'noun [C/U]', en: 'A situation in which it is possible to do something you want to do.', th: 'โอกาส' },
    ],
    antonyms: ['obstacle', 'disadvantage'],
    examples: [
      'This job offer is a fantastic opportunity that she cannot afford to miss.',
      'Travelling abroad gives you the opportunity to experience new cultures.',
      'He took every opportunity to practise speaking English with native speakers.',
    ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'perceive',
    level: 'B2',
    partOfSpeech: ['verb [T]'],
    ipa_uk: '/pəˈsiːv/',
    ipa_us: '/pərˈsiːv/',
    meanings: [
      { pos: 'verb [T]', en: 'To notice or become aware of something using your senses or mind.', th: 'รับรู้, มองว่า, เข้าใจว่า' },
    ],
    antonyms: ['ignore', 'overlook'],
    examples: [
      'She perceived a slight change in his tone during the conversation.',
      'How others perceive you can affect your professional relationships.',
      'He was perceived as a strong and reliable leader by his entire team.',
    ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'prevent',
    level: 'A2',
    partOfSpeech: ['verb [T]'],
    ipa_uk: '/prɪˈvent/',
    ipa_us: '/prɪˈvent/',
    meanings: [
      { pos: 'verb [T]', en: 'To stop something from happening or someone from doing something.', th: 'ป้องกัน, ยับยั้ง, หยุด' },
    ],
    antonyms: ['allow', 'encourage'],
    examples: [
      'Washing your hands regularly can help prevent the spread of illness.',
      'The fence was built to prevent animals from entering the garden.',
      'Early detection can prevent many serious diseases from becoming fatal.',
    ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'principle',
    level: 'B1',
    partOfSpeech: ['noun [C]'],
    ipa_uk: '/ˈprɪnsɪpəl/',
    ipa_us: '/ˈprɪnsɪpəl/',
    meanings: [
      { pos: 'noun [C]', en: 'A basic rule or belief that guides behaviour or thinking.', th: 'หลักการ, หลักความเชื่อ' },
    ],
    antonyms: ['exception', 'deviation'],
    examples: [
      'Honesty is one of the most fundamental principles of good leadership.',
      'The design is based on the principle that less is more.',
      'She refused to compromise her principles even under pressure.',
    ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'propose',
    level: 'B1',
    partOfSpeech: ['verb [T]', 'verb [I]'],
    ipa_uk: '/prəˈpəʊz/',
    ipa_us: '/prəˈpoʊz/',
    meanings: [
      { pos: 'verb [T]', en: 'To suggest a plan or idea for other people to consider.', th: 'เสนอ, แนะนำ' },
      { pos: 'verb [I]', en: 'To ask someone to marry you.', th: 'ขอแต่งงาน' },
    ],
    antonyms: ['oppose', 'reject'],
    examples: [
      'She proposed a new system for tracking employee performance.',
      'He proposed to her on a quiet beach at sunset.',
      'The committee proposed several changes to the existing policy.',
    ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'pursue',
    level: 'A2',
    partOfSpeech: ['verb [T]'],
    ipa_uk: '/pəˈsjuː/',
    ipa_us: '/pərˈsuː/',
    meanings: [
      { pos: 'verb [T]', en: 'To follow or try to achieve something over a period of time.', th: 'ไล่ตาม, มุ่งหน้าไปหา, ดำเนินการ' },
      { pos: 'verb [T]', en: 'To continue to discuss or investigate something.', th: 'ติดตาม, ดำเนินต่อ' },
    ],
    antonyms: ['abandon', 'give up'],
    examples: [
      'She decided to pursue a career in medicine after graduating.',
      'The police continued to pursue the suspect across three counties.',
      'He pursued his passion for music despite facing many obstacles.',
    ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'borrow',
    level: 'A1',
    partOfSpeech: ["verb [T]"],
    ipa_uk: '/ˈbɔɹoʊ/',
    ipa_us: '/ˈbɔɹoʊ/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to take something from someone with the intention of returning it",
              "th": "ยืม"
        }
  ],
    antonyms: ["lend","give"],
    examples:   [
        "I need to borrow some money from my friend to pay the rent.",
        "She borrowed a book from the library to read over the weekend.",
        "Can I borrow your car for a day?"
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'cloudy',
    level: 'A1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈklaʊːdɪ/',
    ipa_us: '/ˈklaʊːdɪ/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "having many clouds in the sky",
              "th": "มีเมฆ"
        }
  ],
    antonyms: ["sunny","clear"],
    examples:   [
        "The weather forecast says it will be cloudy tomorrow.",
        "I don't like playing outside when it's cloudy.",
        "The cloudy sky made the day feel gloomy."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'dirty',
    level: 'A1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈdɜːti/',
    ipa_us: '/ˈdɜːti/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "not clean",
              "th": "ไม่สะอาด"
        }
  ],
    antonyms: ["clean","spotless"],
    examples:   [
        "The dirty dishes were piled up in the sink.",
        "She washed her dirty hands before eating.",
        "The dirty air in the city is bad for your health."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'fast',
    level: 'A1',
    partOfSpeech: ["adverb","adjective"],
    ipa_uk: '/fɑːst/',
    ipa_us: '/fɑːst/',
    meanings:   [
        {
              "pos": "adverb",
              "en": "moving or able to move quickly",
              "th": "เร็ว"
        },
        {
              "pos": "adjective",
              "en": "firmly fixed or closed",
              "th": "มั่นคง"
        }
  ],
    antonyms: ["slow","loose"],
    examples:   [
        "He runs fast and can finish the marathon in under three hours.",
        "The fast car sped down the highway.",
        "She held the door handle fast so it wouldn't open."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'fold',
    level: 'B1',
    partOfSpeech: ["verb [T]"],
    ipa_uk: '/fəʊld/',
    ipa_us: '/fəʊld/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to bend something, especially paper or cloth, so that one part covers another",
              "th": "พับ"
        }
  ],
    antonyms: ["unfold","open"],
    examples:   [
        "Can you fold this map so we can put it in the bag?",
        "She folded the laundry and put it away in the drawer.",
        "He learned how to fold a paper plane when he was a kid."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'fresh',
    level: 'A2',
    partOfSpeech: ["adjective"],
    ipa_uk: '/fɹɛʃ/',
    ipa_us: '/fɹɛʃ/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "new or recently made, and therefore clean and attractive",
              "th": "ใหม่"
        }
  ],
    antonyms: ["stale","old"],
    examples:   [
        "I love the smell of fresh bread from the bakery.",
        "The fresh air in the mountains was refreshing.",
        "She bought fresh flowers to decorate the room."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'hurry',
    level: 'A1',
    partOfSpeech: ["verb [I]"],
    ipa_uk: '/ˈhʌ.ɹi/',
    ipa_us: '/ˈhʌ.ɹi/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to move or act quickly",
              "th": "เร่ง"
        }
  ],
    antonyms: ["delay","wait"],
    examples:   [
        "I'm in a hurry, can we talk later?",
        "She had to hurry to catch the bus on time.",
        "He hurried to finish his project before the deadline."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'loud',
    level: 'B1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/laʊd/',
    ipa_us: '/laʊd/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "making a lot of noise",
              "th": "ดัง"
        }
  ],
    antonyms: ["quiet","soft"],
    examples:   [
        "The music was too loud and gave me a headache.",
        "He spoke loudly so everyone could hear him.",
        "The loud noise from the construction site was disturbing."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'quiet',
    level: 'A1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈkwaɪ.ət/',
    ipa_us: '/ˈkwaɪ.ət/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "making little or no noise",
              "th": "เงียบ"
        }
  ],
    antonyms: ["loud","noisy"],
    examples:   [
        "The library is a quiet place where you can study.",
        "She likes to read in quiet surroundings.",
        "The quiet village was a nice place to relax."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'simple',
    level: 'A2',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈsɪmpəl/',
    ipa_us: '/ˈsɪmpəl/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "not complex or complicated",
              "th": "ง่าย"
        }
  ],
    antonyms: ["complex","complicated"],
    examples:   [
        "The simple design of the room made it look elegant.",
        "He likes to eat simple food like rice and vegetables.",
        "The simple instructions made it easy to assemble the furniture."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },

  {
    word: 'cast',
    level: 'C1',
    partOfSpeech: ["verb [T]"],
    ipa_uk: '/kæst/',
    ipa_us: '/kæst/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to throw something in a particular direction",
              "th": "โยนหรือปล่อยสิ่งใดสิ่งหนึ่งไปในแนวทิศทางใดทิศทางหนึ่ง"
        }
  ],
    antonyms: ["gather","collect"],
    examples:   [
        "The fisherman cast his line into the water.",
        "She cast a glance at the clock on the wall.",
        "The company will cast the actor for the lead role next week."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'align',
    level: 'C1',
    partOfSpeech: ["verb [T]"],
    ipa_uk: '/æˈlaɪn/',
    ipa_us: '/æˈlaɪn/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to put something in a straight line with something else",
              "th": "ทำให้สิ่งหนึ่งอยู่ในแนวเดียวกันกับสิ่งอื่น"
        }
  ],
    antonyms: ["misalign","clash"],
    examples:   [
        "You need to align the wheels of your car properly.",
        "The teacher asked the students to align their desks in a row.",
        "The company will align its strategy with the new market trends."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'justly',
    level: 'C1',
    partOfSpeech: ["adverb"],
    ipa_uk: '/ˈdʒʌstli/',
    ipa_us: '/ˈdʒʌstli/',
    meanings:   [
        {
              "pos": "adverb",
              "en": "in a fair and just way",
              "th": "ด้วยวิธีที่ยุติธรรมและเป็นธรรม"
        }
  ],
    antonyms: ["unfairly","unjustly"],
    examples:   [
        "The judge tried to sentence the defendant justly.",
        "The company aims to treat all employees justly.",
        "The new policy is designed to reward employees justly for their hard work."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'expire',
    level: 'C1',
    partOfSpeech: ["verb [I/T]"],
    ipa_uk: '/ɛkˈspaɪ.ə(ɹ)/',
    ipa_us: '/ɛkˈspaɪ.ə(ɹ)/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to come to an end or no longer be valid",
              "th": "สิ้นสุดลงหรือไม่มีผลบังคับใช้อีกต่อไป"
        }
  ],
    antonyms: ["renew","extend"],
    examples:   [
        "The passport will expire in six months.",
        "The contract will expire at the end of the year.",
        "The coupon will expire if you don't use it within a week."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'gourmet',
    level: 'C1',
    partOfSpeech: ["noun [C]","adjective"],
    ipa_uk: '/ˈɡɔːmeɪ/',
    ipa_us: '/ˈɡɔːmeɪ/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a person who enjoys good food and drink",
              "th": "บุคคลที่ชื่นชอบอาหารและเครื่องดื่มที่ดี"
        },
        {
              "pos": "adjective",
              "en": "relating to or characteristic of good food and drink",
              "th": "เกี่ยวข้องกับหรือมีลักษณะของอาหารและเครื่องดื่มที่ดี"
        }
  ],
    antonyms: ["fast food","ordinary"],
    examples:   [
        "The gourmet restaurant in town is very popular.",
        "She is a gourmet and loves to try new recipes.",
        "The gourmet food store has a wide selection of cheeses."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'lap',
    level: 'C1',
    partOfSpeech: ["noun [C]","verb [I/T]"],
    ipa_uk: '/læp/',
    ipa_us: '/læp/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the upper part of the leg of a seated person",
              "th": "ส่วนบนของขาเมื่อนั่ง"
        },
        {
              "pos": "verb",
              "en": "to move around a track or course, especially in a car or on foot",
              "th": "เคลื่อนที่รอบๆ สนามแข่งขันหรือเส้นทาง โดยเฉพาะอย่างยิ่งในรถหรือเดิน"
        }
  ],
    antonyms: ["stand","stop"],
    examples:   [
        "The child sat on her mother's lap.",
        "The car took a lap around the track.",
        "The runner will lap the field if she keeps this pace."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'reap',
    level: 'C1',
    partOfSpeech: ["verb [T]"],
    ipa_uk: '/ɹiːp/',
    ipa_us: '/ɹiːp/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to gather or collect something, especially a crop",
              "th": "เก็บเกี่ยวหรือรวบรวมสิ่งใดสิ่งหนึ่ง โดยเฉพาะอย่างยิ่งพืชผล"
        }
  ],
    antonyms: ["sow","plant"],
    examples:   [
        "The farmer will reap the wheat next week.",
        "You reap what you sow, so be careful what you plant.",
        "The company will reap the benefits of its investment in a few years."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'scoff',
    level: 'C1',
    partOfSpeech: ["verb [I/T]"],
    ipa_uk: '/skɒf/',
    ipa_us: '/skɒf/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to laugh at someone or something, or to show that you do not believe or respect them",
              "th": "หัวเราะเยาะหรือแสดงว่าคุณไม่เชื่อหรือไม่เคารพใครหรืออะไร"
        }
  ],
    antonyms: ["praise","admire"],
    examples:   [
        "The children scoff at the idea of eating vegetables.",
        "She scoffs at the notion that money can buy happiness.",
        "The critics scoff at the new artist's work, saying it lacks originality."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'appallingly',
    level: 'C1',
    partOfSpeech: ["adverb"],
    ipa_uk: '/ʌˈpɑlɪŋli/',
    ipa_us: '/ʌˈpɑlɪŋli/',
    meanings:   [
        {
              "pos": "adverb",
              "en": "in a way that is extremely bad or unpleasant",
              "th": "ด้วยวิธีที่ไม่ดีหรือไม่พึงประสงค์อย่างมาก"
        }
  ],
    antonyms: ["acceptably","tolerably"],
    examples:   [
        "The hotel room was appallingly dirty and smelly.",
        "The service at the restaurant was appallingly slow.",
        "The conditions in the refugee camp were appallingly poor."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'speculation',
    level: 'C1',
    partOfSpeech: ["noun [U/C]"],
    ipa_uk: '/ˌspɛkjəˈleɪʃən/',
    ipa_us: '/ˌspɛkjəˈleɪʃən/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the act of guessing or forming opinions without firm evidence",
              "th": "การเดาหรือมีความคิดเห็นโดยไม่มีหลักฐานที่แน่ชัด"
        }
  ],
    antonyms: ["fact","reality"],
    examples:   [
        "There is a lot of speculation about the company's future plans.",
        "The media is full of speculation about the celebrity's personal life.",
        "The economist warned against speculation in the financial markets."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'hostess',
    level: 'C1',
    partOfSpeech: ["noun [C]"],
    ipa_uk: '/ˈhəʊstəs/',
    ipa_us: '/ˈhəʊstəs/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a woman who welcomes or entertains guests, especially in her own home",
              "th": "ผู้หญิงที่ต้อนรับหรือให้ความบันเทิงแก่ผู้มาเยือน โดยเฉพาะอย่างยิ่งในบ้านของเธอ"
        }
  ],
    antonyms: ["guest","stranger"],
    examples:   [
        "The hostess greeted us warmly at the door.",
        "She was a charming hostess and made everyone feel at ease.",
        "The hostess of the party was busy making sure everything was perfect."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'wooded',
    level: 'C1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈwʊdɪd/',
    ipa_us: '/ˈwʊdɪd/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "having a lot of trees or woods",
              "th": "มีต้นไม้หรือป่าไม้มาก"
        }
  ],
    antonyms: ["barren","treeless"],
    examples:   [
        "The wooded area was perfect for a hike.",
        "The house is situated in a wooded valley.",
        "The wooded landscape was beautiful and peaceful."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'fiend',
    level: 'C1',
    partOfSpeech: ["noun [C]"],
    ipa_uk: '/fiːnd/',
    ipa_us: '/fiːnd/',
    meanings:   [
        {
              "pos": "noun",
              "en": "an evil or cruel person, or something that is very bad or unpleasant",
              "th": "บุคคลที่ชั่วร้ายหรือโหดร้าย หรือสิ่งที่ไม่ดีหรือไม่พึงประสงค์อย่างมาก"
        }
  ],
    antonyms: ["angel","saint"],
    examples:   [
        "The villain in the movie was a fiend who tortured his victims.",
        "She was a fiend for chocolate and ate it every day.",
        "The disease was a fiend that destroyed many lives."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'thereby',
    level: 'C1',
    partOfSpeech: ["adverb"],
    ipa_uk: '/ðɛəˈbaɪ/',
    ipa_us: '/ðɛəˈbaɪ/',
    meanings:   [
        {
              "pos": "adverb",
              "en": "as a result of something, or by doing something",
              "th": "เป็นผลมาจากสิ่งใดสิ่งหนึ่ง หรือโดยการทำสิ่งใดสิ่งหนึ่ง"
        }
  ],
    antonyms: ["nevertheless","however"],
    examples:   [
        "By working hard, she was able to finish the project thereby earning a promotion.",
        "The company increased its production thereby reducing its costs.",
        "The new policy was implemented thereby improving the overall quality of life."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'tantrum',
    level: 'C1',
    partOfSpeech: ["noun [C]"],
    ipa_uk: '/ˈtæntɹəm/',
    ipa_us: '/ˈtæntɹəm/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a sudden and uncontrolled outburst of anger or frustration, especially by a child",
              "th": "การระเบิดของความโกรธหรือความผิดหวังที่ไม่สามารถควบคุมได้ โดยเฉพาะอย่างยิ่งในเด็ก"
        }
  ],
    antonyms: ["calmness","patience"],
    examples:   [
        "The child had a tantrum in the supermarket because he wanted a toy.",
        "She threw a tantrum when her parents wouldn't let her go to the party.",
        "The toddler had a tantrum because he was tired and hungry."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'engross',
    level: 'C1',
    partOfSpeech: ["verb [T]"],
    ipa_uk: '/ɛnˈɡɹəʊs/',
    ipa_us: '/ɛnˈɡɹəʊs/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to occupy someone's complete attention, or to write or copy something carefully and in detail",
              "th": "ยึดความสนใจของใครบางคนอย่างสมบูรณ์ หรือเขียนหรือคัดลอกสิ่งใดสิ่งหนึ่งด้วยความระมัดระวังและรายละเอียด"
        }
  ],
    antonyms: ["distract","divert"],
    examples:   [
        "The book engrossed me for hours and I couldn't put it down.",
        "The task engrossed her attention and she worked on it all day.",
        "The lawyer had to engross the contract carefully before signing it."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'honk',
    level: 'C1',
    partOfSpeech: ["verb [I]","noun [C]"],
    ipa_uk: '/hɒŋk/',
    ipa_us: '/hɒŋk/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to make a loud, harsh noise, especially like the sound of a car horn",
              "th": "发出เสียงดังและหยาบ โดยเฉพาะอย่างยิ่งเสียงคล้ายกับเสียงแตรรถ"
        },
        {
              "pos": "noun",
              "en": "a loud, harsh noise, especially one made by a car horn",
              "th": "เสียงดังและหยาบ โดยเฉพาะอย่างยิ่งเสียงที่ทำโดยแตรรถ"
        }
  ],
    antonyms: ["whisper","murmur"],
    examples:   [
        "The driver honked the horn to get the pedestrian's attention.",
        "The goose will honk loudly if it feels threatened.",
        "The honk of the car horn was loud and startling."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'angle',
    level: 'C1',
    partOfSpeech: ["noun [C]"],
    ipa_uk: '/ˈæŋ.ɡəl/',
    ipa_us: '/ˈæŋ.ɡəl/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a corner or bend where two lines or surfaces meet",
              "th": "มุมหรือโค้งงอที่เส้นหรือพื้นผิวสองเส้นมาบรรจบกัน"
        }
  ],
    antonyms: ["curve","circle"],
    examples:   [
        "The picture frame was at an angle on the wall.",
        "The fisherman tried to get a good angle to catch the fish.",
        "The architect designed the building at a unique angle to maximize the view."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },

  {
    word: 'hotelier',
    level: 'C2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˌhoʊ.ˈtɛl.i.əɹ/',
    ipa_us: '/ˌhoʊ.ˈtɛl.i.əɹ/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a person who owns or manages a hotel",
              "th": "เจ้าของหรือผู้จัดการโรงแรม"
        }
  ],
    antonyms: ["guest","traveler"],
    examples:   [
        "The hotelier ensured that all guests had a pleasant stay.",
        "She was a renowned hotelier with a chain of luxury hotels.",
        "The hotelier was responsible for the overall management of the hotel."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'solicit',
    level: 'C2',
    partOfSpeech: ["verb [T]"],
    ipa_uk: '/səˈlɪsɪt/',
    ipa_us: '/səˈlɪsɪt/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to ask someone for something, especially money or help",
              "th": "ขอใครสักคนให้บางสิ่ง โดยเฉพาะเงินหรือความช่วยเหลือ"
        }
  ],
    antonyms: ["refuse","decline"],
    examples:   [
        "The charity will solicit donations from the public to support the cause.",
        "She did not solicit any help from her friends or family.",
        "The company will solicit bids from contractors for the new project."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'proliferate',
    level: 'C2',
    partOfSpeech: ["verb [I]"],
    ipa_uk: '/pɹəˈlɪf.əɹ.eɪt/',
    ipa_us: '/pɹəˈlɪf.əɹ.eɪt/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to increase or multiply rapidly",
              "th": "เพิ่มขึ้นหรือคูณกันอย่างรวดเร็ว"
        }
  ],
    antonyms: ["decline","decrease"],
    examples:   [
        "New technologies have proliferated in recent years, changing the way we live.",
        "The number of social media platforms has proliferated in the past decade.",
        "The disease will proliferate if left untreated."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'quiver',
    level: 'C2',
    partOfSpeech: ["verb [I]","noun"],
    ipa_uk: '/ˈkwɪvəɹ/',
    ipa_us: '/ˈkwɪvəɹ/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to shake or tremble, often with fear or excitement",
              "th": "สั่นหรือสั่นน้อยๆ บ่อยครั้งด้วยความกลัวหรือตื่นเต้น"
        },
        {
              "pos": "noun",
              "en": "a container for holding arrows",
              "th": "ภาชนะสำหรับเก็บลูกศร"
        }
  ],
    antonyms: ["steady","still"],
    examples:   [
        "Her voice began to quiver as she spoke about her fears.",
        "The archer's quiver was full of arrows.",
        "The leaves quiver in the gentle breeze."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'surreptitious',
    level: 'C2',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˌsʌɹɪpˈtɪʃəs/',
    ipa_us: '/ˌsʌɹɪpˈtɪʃəs/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "done secretly or stealthily",
              "th": "ทำอย่างลับๆ หรือแอบแฝง"
        }
  ],
    antonyms: ["open","overt"],
    examples:   [
        "The surreptitious meeting between the two leaders was not disclosed to the public.",
        "She made a surreptitious glance at her watch during the meeting.",
        "The company used surreptitious methods to gather information about their competitors."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'notorious',
    level: 'C2',
    partOfSpeech: ["adjective"],
    ipa_uk: '/nəʊˈtɔːɹɪəs/',
    ipa_us: '/nəʊˈtɔːɹɪəs/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "famous or well-known, especially for something bad",
              "th": "มีชื่อเสียงหรือรู้จักกันดี โดยเฉพาะอย่างยิ่งสำหรับเรื่องร้ายๆ"
        }
  ],
    antonyms: ["respected","revered"],
    examples:   [
        "The notorious gangster was finally caught by the police.",
        "The company has a notorious reputation for poor customer service.",
        "The notorious hacker was responsible for several high-profile cyber attacks."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'shoal',
    level: 'C2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ʃɒʊl/',
    ipa_us: '/ʃɒʊl/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a large group of fish swimming together",
              "th": "กลุ่มปลาใหญ่ที่ว่ายน้ำด้วยกัน"
        }
  ],
    antonyms: ["solitary","lonely"],
    examples:   [
        "The shoal of fish darted through the coral reef.",
        "The fishermen caught a large shoal of sardines.",
        "The shoal of sharks was a formidable sight."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'resound',
    level: 'C2',
    partOfSpeech: ["verb [I]"],
    ipa_uk: '/ˌɹiːˈsaʊnd/',
    ipa_us: '/ˌɹiːˈsaʊnd/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to produce a loud, clear sound that continues for a long time",
              "th": "ทำให้เกิดเสียงดังและชัดเจนที่ยังคงอยู่เป็นเวลานาน"
        }
  ],
    antonyms: ["fade","diminish"],
    examples:   [
        "The music resounded through the concert hall.",
        "The news of her resignation resounded throughout the company.",
        "The applause resounded as the actor took his final bow."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'apprehend',
    level: 'C2',
    partOfSpeech: ["verb [T]"],
    ipa_uk: '/æ.pɹiˈhɛnd/',
    ipa_us: '/æ.pɹiˈhɛnd/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to catch or arrest someone, especially a criminal",
              "th": "จับหรือ逮ับตัวใครสักคน โดยเฉพาะอย่างยิ่งผู้กระทำความผิด"
        }
  ],
    antonyms: ["release","free"],
    examples:   [
        "The police apprehended the suspect after a long chase.",
        "The authorities apprehended several people in connection with the crime.",
        "The detective was able to apprehend the culprit through careful investigation."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'attrition',
    level: 'C2',
    partOfSpeech: ["noun"],
    ipa_uk: '[əˈtɹɪʃən]',
    ipa_us: '[əˈtɹɪʃən]',
    meanings:   [
        {
              "pos": "noun",
              "en": "the process of wearing something down or weakening it, especially through constant pressure or attack",
              "th": "กระบวนการของการกัดเซาะหรือทำให้อ่อนลง โดยเฉพาะอย่างยิ่งผ่านการกดดันหรือการโจมตีที่ไม่หยุดยั้ง"
        }
  ],
    antonyms: ["growth","strengthening"],
    examples:   [
        "The company faced high attrition rates due to poor working conditions.",
        "The constant attrition of the coastline was a major concern for the local government.",
        "The war of attrition between the two countries lasted for years."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'menial',
    level: 'C2',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈmiːni.əl/',
    ipa_us: '/ˈmiːni.əl/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "unimportant or low-level, especially in relation to work or tasks",
              "th": "ไม่สำคัญหรือระดับต่ำ โดยเฉพาะอย่างยิ่งเกี่ยวกับงานหรือภารกิจ"
        }
  ],
    antonyms: ["important","skilled"],
    examples:   [
        "The menial tasks were assigned to the new intern.",
        "She felt that her job was too menial and unchallenging.",
        "The menial work was tedious and unrewarding."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'flit',
    level: 'C2',
    partOfSpeech: ["verb [I]"],
    ipa_uk: '/flɪt/',
    ipa_us: '/flɪt/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to move quickly and lightly from one place to another",
              "th": "เคลื่อนที่อย่างรวดเร็วและเบาจากที่หนึ่งไปอีกที่หนึ่ง"
        }
  ],
    antonyms: ["stay","remain"],
    examples:   [
        "The bird began to flit between the branches of the tree.",
        "Her eyes flit from one person to another in the crowded room.",
        "The butterfly flit from flower to flower in the garden."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'laryngitis',
    level: 'C2',
    partOfSpeech: ["noun"],
    ipa_uk: '/læɹɪnˈdʒajtɪs/',
    ipa_us: '/læɹɪnˈdʒajtɪs/',
    meanings:   [
        {
              "pos": "noun",
              "en": "inflammation of the larynx, especially causing hoarseness or loss of voice",
              "th": "การอักเสบของกล่องเสียง โดยเฉพาะอย่างยิ่งที่ทำให้เกิดความกระด้างหรือเสียงหาย"
        }
  ],
    antonyms: ["health","wellness"],
    examples:   [
        "The singer was diagnosed with laryngitis and had to cancel her tour.",
        "The teacher developed laryngitis after shouting at the students all day.",
        "The doctor prescribed medication to treat the patient's laryngitis."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'declination',
    level: 'C2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˌdɛklɪˈneɪʃən/',
    ipa_us: '/ˌdɛklɪˈneɪʃən/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the act of declining or refusing something, especially an invitation or offer",
              "th": "การปฏิเสธหรือไม่ยอมรับบางสิ่ง โดยเฉพาะอย่างยิ่งคำเชิญหรือการเสนอ"
        }
  ],
    antonyms: ["acceptance","approval"],
    examples:   [
        "The declination of the invitation was due to a prior commitment.",
        "The company's declination of the offer was a surprise to everyone.",
        "The declination of the proposal was met with disappointment."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'perch',
    level: 'C2',
    partOfSpeech: ["verb [I]","noun"],
    ipa_uk: '/pɜːtʃ/',
    ipa_us: '/pɜːtʃ/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to sit or rest on a high or narrow place",
              "th": "นั่งหรือพักผ่อนบนพื้นที่สูงหรือแคบ"
        },
        {
              "pos": "noun",
              "en": "a high or narrow place where someone or something can sit or rest",
              "th": "พื้นที่สูงหรือแคบซึ่งบุคคลหรือสิ่งใดสิ่งหนึ่งสามารถนั่งหรือพักผ่อน"
        }
  ],
    antonyms: ["descend","dismount"],
    examples:   [
        "The bird began to perch on the branch of the tree.",
        "The cat likes to perch on the windowsill.",
        "The rock climber had to perch on a narrow ledge to catch her breath."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'allude',
    level: 'C2',
    partOfSpeech: ["verb [T]"],
    ipa_uk: '/əˈluːd/',
    ipa_us: '/əˈluːd/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to mention or refer to something indirectly or subtly",
              "th": "กล่าวถึงหรืออ้างอิงถึงบางสิ่งโดยไม่ตรงไปตรงมาหรือละเอียดอ่อน"
        }
  ],
    antonyms: ["state","declare"],
    examples:   [
        "The speaker alluded to the recent scandal without mentioning it directly.",
        "The writer alluded to the mythological story in her novel.",
        "The politician alluded to the opposition's weaknesses in her speech."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },

  {
    word: 'protest',
    level: 'B2',
    partOfSpeech: ["verb [I/T]","noun [C]"],
    ipa_uk: '/ˈpɹəʊ.tɛst/',
    ipa_us: '/ˈpɹəʊ.tɛst/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to express strong disagreement or disapproval",
              "th": "แสดงความไม่เห็นด้วยหรือไม่ยอมรับ"
        },
        {
              "pos": "noun",
              "en": "a statement or action expressing strong disagreement or disapproval",
              "th": "คำพูดหรือการกระทำที่แสดงความไม่เห็นด้วยหรือไม่ยอมรับ"
        }
  ],
    antonyms: ["support","approval"],
    examples:   [
        "The students organized a protest against the tuition fee increase.",
        "The government's decision was met with widespread protest from the community.",
        "She wrote a letter to the editor to protest the misleading article."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'orchestral',
    level: 'B2',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˌɔɹˈkɛstɹəl/',
    ipa_us: '/ˌɔɹˈkɛstɹəl/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "relating to or characteristic of an orchestra",
              "th": "เกี่ยวข้องกับหรือมีลักษณะของวงดนตรีสิมโฟนี"
        }
  ],
    antonyms: ["solo","unaccompanied"],
    examples:   [
        "The orchestral performance was breathtakingly beautiful.",
        "The composer wrote an orchestral piece that premiered at the concert hall.",
        "The film's orchestral soundtrack won several awards."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'sensible',
    level: 'B2',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈsen.sə.bl̩/',
    ipa_us: '/ˈsen.sə.bl̩/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "having or showing a reasonable and practical attitude or approach",
              "th": "มีทัศนคติหรือแนวทางที่มีเหตุผลและเป็นประโยชน์"
        }
  ],
    antonyms: ["foolish","irrational"],
    examples:   [
        "It's sensible to save money for emergencies.",
        "The sensible decision was to postpone the trip due to bad weather.",
        "She made a sensible choice by choosing a career that aligned with her skills and interests."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'transmit',
    level: 'B2',
    partOfSpeech: ["verb [T]"],
    ipa_uk: '/tɹænsˈmɪt/',
    ipa_us: '/tɹænsˈmɪt/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to send or pass on something, such as a signal, a message, or a disease",
              "th": "ส่งหรือส่งต่อบางสิ่ง เช่น สัญญาณ ข้อความ หรือโรค"
        }
  ],
    antonyms: ["receive","block"],
    examples:   [
        "The radio station will transmit the news broadcast at 8pm.",
        "The doctor warned that the disease could transmit through close contact.",
        "The company will transmit the data to the server for analysis."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'stink',
    level: 'B2',
    partOfSpeech: ["verb [I]"],
    ipa_uk: '/stɪŋk/',
    ipa_us: '/stɪŋk/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to have a strong and unpleasant smell",
              "th": "มีกลิ่นที่รุนแรงและไม่พึงประสงค์"
        }
  ],
    antonyms: ["smell nice","be fragrant"],
    examples:   [
        "The garbage stink in the summer heat.",
        "The fish market stink of rotten fish.",
        "The sewer stink was overwhelming in the city."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'exaggeration',
    level: 'B2',
    partOfSpeech: ["noun [C]"],
    ipa_uk: '/ɪɡˌzæd͡ʒəˈɹeɪʃən/',
    ipa_us: '/ɪɡˌzæd͡ʒəˈɹeɪʃən/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a statement or description that is not true or is greater than the reality",
              "th": "ข้อความหรือคำอธิบายที่ไม่เป็นความจริงหรือมากกว่าความเป็นจริง"
        }
  ],
    antonyms: ["understatement","fact"],
    examples:   [
        "The story was an exaggeration of what really happened.",
        "The company's claims about their product were an exaggeration.",
        "The politician's speech was full of exaggeration and hyperbole."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'murmur',
    level: 'B2',
    partOfSpeech: ["verb [I]","noun [C]"],
    ipa_uk: '/ˈmɜː.mə(ɹ)/',
    ipa_us: '/ˈmɜː.mə(ɹ)/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to make a low, indistinct sound, often expressing discontent or disapproval",
              "th": "ทำให้เกิดเสียงต่ำและไม่ชัดเจน บ่อยครั้งแสดงถึงความไม่พอใจหรือไม่ยอมรับ"
        },
        {
              "pos": "noun",
              "en": "a low, indistinct sound, often expressing discontent or disapproval",
              "th": "เสียงต่ำและไม่ชัดเจน บ่อยครั้งแสดงถึงความไม่พอใจหรือไม่ยอมรับ"
        }
  ],
    antonyms: ["cheer","applaud"],
    examples:   [
        "The crowd began to murmur in discontent as the delay continued.",
        "A murmur of disapproval spread through the audience.",
        "The teacher tried to quiet the students as they began to murmur among themselves."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'firmness',
    level: 'B2',
    partOfSpeech: ["noun [U]"],
    ipa_uk: '/ˈfɜːmnəs/',
    ipa_us: '/ˈfɜːmnəs/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the quality of being strong and unshakeable in one's beliefs, decisions, or actions",
              "th": "คุณสมบัติของการมีความแข็งแกร่งและไม่สั่นคลอนในความเชื่อ การตัดสินใจ หรือการกระทำ"
        }
  ],
    antonyms: ["weakness","indecisiveness"],
    examples:   [
        "The company's firmness in its decision to expand was admirable.",
        "The leader's firmness in the face of opposition was inspiring.",
        "The athlete's firmness in her training regimen paid off in the competition."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'abolish',
    level: 'B2',
    partOfSpeech: ["verb [T]"],
    ipa_uk: '/əˈbɒlɪʃ/',
    ipa_us: '/əˈbɒlɪʃ/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to officially end or stop something, such as a law, a system, or a practice",
              "th": "ยุติหรือหยุดบางสิ่งอย่างเป็นทางการ เช่น กฎหมาย ระบบ หรือการปฏิบัติ"
        }
  ],
    antonyms: ["establish","reinstate"],
    examples:   [
        "The government voted to abolish the death penalty.",
        "The company decided to abolish the outdated policy.",
        "The activists campaigned to abolish slavery in the country."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'gasp',
    level: 'B2',
    partOfSpeech: ["verb [I]","noun [C]"],
    ipa_uk: '/ɡɑːsp/',
    ipa_us: '/ɡɑːsp/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to take a sudden, deep breath, often in surprise, shock, or effort",
              "th": "หายใจเข้าอย่างรวดเร็วและลึก บ่อยครั้งเนื่องจากความประหลาดใจ ความตกใจ หรือความพยายาม"
        },
        {
              "pos": "noun",
              "en": "a sudden, deep breath, often in surprise, shock, or effort",
              "th": "การหายใจเข้าอย่างรวดเร็วและลึก บ่อยครั้งเนื่องจากความประหลาดใจ ความตกใจ หรือความพยายาม"
        }
  ],
    antonyms: ["exhale","breathe easily"],
    examples:   [
        "She let out a gasp of surprise when she saw the gift.",
        "The audience gasped in shock at the plot twist.",
        "The athlete took a gasp of air as she crossed the finish line."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'thickness',
    level: 'B2',
    partOfSpeech: ["noun [C/U]"],
    ipa_uk: '/ˈθɪknəs/',
    ipa_us: '/ˈθɪknəs/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the state of being thick, or a measure of how thick something is",
              "th": "สภาพของการมีความหนา หรือการวัดความหนาของบางสิ่ง"
        }
  ],
    antonyms: ["thinness","slenderness"],
    examples:   [
        "The thickness of the glass made it difficult to break.",
        "The thickness of the fog reduced visibility to almost zero.",
        "The chef checked the thickness of the steak before cooking it."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'supply',
    level: 'B2',
    partOfSpeech: ["verb [T]","noun [C/U]"],
    ipa_uk: '/səˈplaɪ/',
    ipa_us: '/səˈplaɪ/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to provide something that is needed or wanted",
              "th": "จัดหาหรือให้บางสิ่งที่ต้องการหรือต้องการ"
        },
        {
              "pos": "noun",
              "en": "the amount of something that is available or provided",
              "th": "ปริมาณของบางสิ่งที่มีอยู่หรือจัดหา"
        }
  ],
    antonyms: ["demand","shortage"],
    examples:   [
        "The company will supply the materials for the project.",
        "The store will supply the goods to the customers.",
        "The supply of water in the city is limited due to the drought."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'conjunction',
    level: 'B2',
    partOfSpeech: ["noun [C]"],
    ipa_uk: '/kənˈdʒʌŋkʃən/',
    ipa_us: '/kənˈdʒʌŋkʃən/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a word that connects words, phrases, or clauses in a sentence",
              "th": "คำที่เชื่อมคำ วลี หรือประโยคในประโยค"
        }
  ],
    antonyms: ["separation","division"],
    examples:   [
        "The word 'and' is a conjunction in the sentence.",
        "The conjunction of the two clauses creates a complex sentence.",
        "The teacher explained the use of conjunctions in sentence structure."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },

  {
    word: 'anyone',
    level: 'A1',
    partOfSpeech: ["pronoun"],
    ipa_uk: '/ˈæniˌwʌn/',
    ipa_us: '/ˈæniˌwʌn/',
    meanings:   [
        {
              "pos": "pronoun",
              "en": "any person",
              "th": "บุคคลใดๆ"
        }
  ],
    antonyms: ["no one","nobody"],
    examples:   [
        "Is anyone going to the store?",
        "I don't know if anyone will be there.",
        "Anyone can join the club."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'his',
    level: 'A1',
    partOfSpeech: ["pronoun"],
    ipa_uk: '/ˈhɪz/',
    ipa_us: '/ˈhɪz/',
    meanings:   [
        {
              "pos": "pronoun",
              "en": "belonging to him",
              "th": "ของเขา"
        }
  ],
    antonyms: ["hers","its"],
    examples:   [
        "The book is his.",
        "His car is very nice.",
        "I like his sense of humor."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'orange',
    level: 'A1',
    partOfSpeech: ["noun","adjective"],
    ipa_uk: '/ˈɔɹɪ̈nd͡ʒ/',
    ipa_us: '/ˈɔɹɪ̈nd͡ʒ/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a type of fruit",
              "th": "ส้ม"
        },
        {
              "pos": "adjective",
              "en": "having a yellow-orange color",
              "th": "มีสีส้ม"
        }
  ],
    antonyms: ["blue","green"],
    examples:   [
        "I love eating oranges.",
        "The orange dress is beautiful.",
        "The orange tree is very tall."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'add',
    level: 'A1',
    partOfSpeech: ["verb"],
    ipa_uk: '/æd/',
    ipa_us: '/æd/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to put something with something else",
              "th": "เพิ่ม"
        }
  ],
    antonyms: ["subtract","remove"],
    examples:   [
        "Can you add this to the list?",
        "I will add some sugar to my coffee.",
        "You need to add water to the plant."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'case',
    level: 'A1',
    partOfSpeech: ["noun"],
    ipa_uk: '/keɪs/',
    ipa_us: '/keɪs/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a container or a situation",
              "th": "กรณี"
        }
  ],
    antonyms: ["absence","freedom"],
    examples:   [
        "I need a case for my phone.",
        "This is a special case.",
        "The doctor studied the case carefully."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'catch',
    level: 'A1',
    partOfSpeech: ["verb"],
    ipa_uk: '/kæt͡ʃ/',
    ipa_us: '/kæt͡ʃ/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to take hold of something",
              "th": "จับ"
        }
  ],
    antonyms: ["release","drop"],
    examples:   [
        "I will catch the ball.",
        "You need to catch the bus.",
        "The dog will catch the frisbee."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'am',
    level: 'A1',
    partOfSpeech: ["verb"],
    ipa_uk: '[e̞m]',
    ipa_us: '[e̞m]',
    meanings:   [
        {
              "pos": "verb",
              "en": "to be, first person singular",
              "th": "เป็น (รูปแรกบุรุษเดี่ยว)"
        }
  ],
    antonyms: ["are not","is not"],
    examples:   [
        "I am happy.",
        "I am a student.",
        "What am I doing?"
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'dinner',
    level: 'A1',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈdɪnə/',
    ipa_us: '/ˈdɪnə/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the main meal of the day",
              "th": "อาหารเย็น"
        }
  ],
    antonyms: ["breakfast","lunch"],
    examples:   [
        "What time is dinner?",
        "I love having dinner with my family.",
        "The dinner party was fun."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'dollar',
    level: 'A1',
    partOfSpeech: ["noun"],
    ipa_uk: '/dɔlɚ/',
    ipa_us: '/dɔlɚ/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the basic unit of money in the US",
              "th": "ดอลลาร์"
        }
  ],
    antonyms: ["euro","yen"],
    examples:   [
        "I have a dollar in my pocket.",
        "The price is one dollar.",
        "Can you exchange my dollars for euros?"
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'own',
    level: 'A1',
    partOfSpeech: ["verb","adjective"],
    ipa_uk: '/ˈəʊn/',
    ipa_us: '/ˈəʊn/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to have something as a possession",
              "th": "เป็นเจ้าของ"
        },
        {
              "pos": "adjective",
              "en": "belonging to oneself",
              "th": "เป็นของตัวเอง"
        }
  ],
    antonyms: ["rent","share"],
    examples:   [
        "I own a car.",
        "This is my own room.",
        "Do you own a house?"
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'all',
    level: 'A1',
    partOfSpeech: ["determiner"],
    ipa_uk: '/ɔːl/',
    ipa_us: '/ɔːl/',
    meanings:   [
        {
              "pos": "determiner",
              "en": "every single one",
              "th": "ทั้งหมด"
        }
  ],
    antonyms: ["none","some"],
    examples:   [
        "I have all the books.",
        "All the students are here.",
        "I want all the ice cream."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'will',
    level: 'A1',
    partOfSpeech: ["verb"],
    ipa_uk: '/wɪl/',
    ipa_us: '/wɪl/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to express future intention",
              "th": "จะ"
        }
  ],
    antonyms: ["won't","can't"],
    examples:   [
        "I will go to the store.",
        "What will you do tomorrow?",
        "She will be a doctor."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'butter',
    level: 'A1',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈbʊtə/',
    ipa_us: '/ˈbʊtə/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a type of food made from milk",
              "th": "เนย"
        }
  ],
    antonyms: ["oil","margarine"],
    examples:   [
        "I love eating butter on toast.",
        "The recipe calls for butter.",
        "Can you pass the butter?"
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'door',
    level: 'A1',
    partOfSpeech: ["noun"],
    ipa_uk: '/dɔː/',
    ipa_us: '/dɔː/',
    meanings:   [
        {
              "pos": "noun",
              "en": "an opening in a building or vehicle",
              "th": "ประตู"
        }
  ],
    antonyms: ["window","wall"],
    examples:   [
        "The door is open.",
        "Can you close the door?",
        "The door is locked."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'around',
    level: 'A1',
    partOfSpeech: ["preposition"],
    ipa_uk: '/əˈɹaʊnd/',
    ipa_us: '/əˈɹaʊnd/',
    meanings:   [
        {
              "pos": "preposition",
              "en": "in a circle or on every side",
              "th": "รอบๆ"
        }
  ],
    antonyms: ["across","through"],
    examples:   [
        "The park is around the corner.",
        "I will be around later.",
        "The city is around the mountain."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'cat',
    level: 'A1',
    partOfSpeech: ["noun"],
    ipa_uk: '/kat/',
    ipa_us: '/kat/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a small animal",
              "th": "แมว"
        }
  ],
    antonyms: ["dog","mouse"],
    examples:   [
        "I have a cat.",
        "The cat is sleeping.",
        "Cats are cute animals."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'inside',
    level: 'A1',
    partOfSpeech: ["preposition"],
    ipa_uk: '/ɪnˈsaɪd/',
    ipa_us: '/ɪnˈsaɪd/',
    meanings:   [
        {
              "pos": "preposition",
              "en": "in the inner part of something",
              "th": "ด้านใน"
        }
  ],
    antonyms: ["outside","beyond"],
    examples:   [
        "The book is inside the box.",
        "I will be inside the house.",
        "The inside of the car is clean."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'early',
    level: 'A1',
    partOfSpeech: ["adverb"],
    ipa_uk: '/ˈɜː.li/',
    ipa_us: '/ˈɜː.li/',
    meanings:   [
        {
              "pos": "adverb",
              "en": "before the expected or usual time",
              "th": "เร็ว"
        }
  ],
    antonyms: ["late","delayed"],
    examples:   [
        "I woke up early.",
        "The early bird catches the worm.",
        "We should arrive early."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'bean',
    level: 'A1',
    partOfSpeech: ["noun"],
    ipa_uk: '/biːn/',
    ipa_us: '/biːn/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a type of seed or legume",
              "th": "ถั่ว"
        }
  ],
    antonyms: ["pea","lentil"],
    examples:   [
        "I love eating beans.",
        "The recipe calls for beans.",
        "Can you pass the beans?"
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'where',
    level: 'A1',
    partOfSpeech: ["adverb"],
    ipa_uk: '/wɛə(ɹ)/',
    ipa_us: '/wɛə(ɹ)/',
    meanings:   [
        {
              "pos": "adverb",
              "en": "in or to what place",
              "th": "ที่ไหน"
        }
  ],
    antonyms: ["everywhere","nowhere"],
    examples:   [
        "Where are you going?",
        "I don't know where I am.",
        "Where is the bathroom?"
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'group',
    level: 'A1',
    partOfSpeech: ["noun"],
    ipa_uk: '/ɡɹuːp/',
    ipa_us: '/ɡɹuːp/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a number of people or things together",
              "th": "กลุ่ม"
        }
  ],
    antonyms: ["individual","single"],
    examples:   [
        "The group is working together.",
        "I am part of a group.",
        "The group is very diverse."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'red',
    level: 'A1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ɹɛd/',
    ipa_us: '/ɹɛd/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "having a color like blood or fire",
              "th": "สีแดง"
        }
  ],
    antonyms: ["blue","green"],
    examples:   [
        "The apple is red.",
        "I love the color red.",
        "The red car is fast."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'snowy',
    level: 'A1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/snəʊi/',
    ipa_us: '/snəʊi/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "covered with snow",
              "th": "มีหิมะ"
        }
  ],
    antonyms: ["sunny","hot"],
    examples:   [
        "The snowy mountain is beautiful.",
        "I love playing in the snowy park.",
        "The snowy day is perfect for skiing."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'type',
    level: 'A1',
    partOfSpeech: ["noun"],
    ipa_uk: '/taɪp/',
    ipa_us: '/taɪp/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a particular kind or class of thing",
              "th": "ประเภท"
        }
  ],
    antonyms: ["example","instance"],
    examples:   [
        "What type of music do you like?",
        "The type of car is important.",
        "I need to know the type of computer."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },

  {
    word: 'pleasurable',
    level: 'C1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈplɛʒəɹəbəl/',
    ipa_us: '/ˈplɛʒəɹəbəl/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "giving a feeling of pleasure",
              "th": "ให้รู้สึกสบายใจ"
        }
  ],
    antonyms: ["painful","unpleasant"],
    examples:   [
        "The warm bath was pleasurable after a long day.",
        "She found the experience of skydiving pleasurable and exciting.",
        "The pleasurable atmosphere of the party made everyone feel relaxed."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'violet',
    level: 'C1',
    partOfSpeech: ["noun","adjective"],
    ipa_uk: '/ˈvaɪlət/',
    ipa_us: '/ˈvaɪlət/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a small, delicate purple flower",
              "th": "ดอกไม้สีม่วงขนาดเล็กและสวยงาม"
        },
        {
              "pos": "adjective",
              "en": "having a purple color",
              "th": "มีสีม่วง"
        }
  ],
    antonyms: ["green","yellow"],
    examples:   [
        "The violet flowers bloomed in the garden.",
        "She wore a violet dress to the party.",
        "The violet color of the sky at sunset was breathtaking."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'portable',
    level: 'C1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈpɔː(ɹ)təbl̩/',
    ipa_us: '/ˈpɔː(ɹ)təbl̩/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "able to be easily carried or moved",
              "th": "สามารถพกพาหรือย้ายได้ง่าย"
        }
  ],
    antonyms: ["bulky","heavy"],
    examples:   [
        "The portable laptop was convenient for working on the go.",
        "The portable speaker was perfect for outdoor parties.",
        "The portable toilet was a necessary facility at the music festival."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'crumb',
    level: 'C1',
    partOfSpeech: ["noun"],
    ipa_uk: '/kɹʌm/',
    ipa_us: '/kɹʌm/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a small piece of food, especially bread",
              "th": "เศษอาหารเล็กๆ โดยเฉพาะขนมปัง"
        }
  ],
    antonyms: ["loaf","slice"],
    examples:   [
        "She dropped a crumb on the floor while eating.",
        "The crumb of the cake was delicious.",
        "The table was covered with crumbs after the meal."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'exotic',
    level: 'C1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ɪɡˈzɒtɪk/',
    ipa_us: '/ɪɡˈzɒtɪk/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "unusual and interesting because of being from a foreign country",
              "th": "แปลกใหม่และน่าสนใจเนื่องจากมาจากต่างประเทศ"
        }
  ],
    antonyms: ["ordinary","familiar"],
    examples:   [
        "The exotic island was a popular tourist destination.",
        "She wore an exotic perfume that smelled like flowers.",
        "The exotic food at the restaurant was a unique experience."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'taut',
    level: 'C1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/tɔːt/',
    ipa_us: '/tɔːt/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "stretched tightly, or feeling nervous and tense",
              "th": "ถูกดึงตึงหรือรู้สึกกังวลและตึงเครียด"
        }
  ],
    antonyms: ["loose","relaxed"],
    examples:   [
        "The taut rope was ready for climbing.",
        "She felt taut and anxious before the exam.",
        "The taut muscles in his face showed his anger."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'sarcastic',
    level: 'C1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/sɑːˈkæstik/',
    ipa_us: '/sɑːˈkæstik/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "using irony or sarcasm to express contempt or annoyance",
              "th": "ใช้คำพูดที่เป็นเยาะเย้ยหรือเยาะเลียนเพื่อแสดงความไม่พอใจ"
        }
  ],
    antonyms: ["sincere","genuine"],
    examples:   [
        "The sarcastic comment made her feel embarrassed.",
        "He was known for his sarcastic sense of humor.",
        "The sarcastic tone in her voice was unmistakable."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'adjoin',
    level: 'C1',
    partOfSpeech: ["verb"],
    ipa_uk: '/əˈdʒɔɪn/',
    ipa_us: '/əˈdʒɔɪn/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to be next to or join something",
              "th": "อยู่ข้างๆ หรือเชื่อมต่อกับสิ่งอื่น"
        }
  ],
    antonyms: ["separate","detach"],
    examples:   [
        "The two rooms adjoin each other.",
        "The park adjoins the lake.",
        "The hotel adjoins the conference center."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'conditional',
    level: 'C1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/kənˈdɪʃənəl/',
    ipa_us: '/kənˈdɪʃənəl/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "depending on something else happening or being true",
              "th": "ขึ้นอยู่กับสิ่งอื่นเกิดขึ้นหรือเป็นจริง"
        }
  ],
    antonyms: ["unconditional","absolute"],
    examples:   [
        "The conditional offer was based on the results of the exam.",
        "The conditional sentence was used to express a hypothetical situation.",
        "The conditional contract was subject to certain terms and conditions."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'burst',
    level: 'C1',
    partOfSpeech: ["verb","noun"],
    ipa_uk: '/bɜːst/',
    ipa_us: '/bɜːst/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to suddenly and violently break or explode",
              "th": "แตกหรือระเบิดอย่างรุนแรงและ突然"
        },
        {
              "pos": "noun",
              "en": "a sudden and intense release of energy or emotion",
              "th": "การปล่อยพลังงานหรืออารมณ์ที่รุนแรงและ突然"
        }
  ],
    antonyms: ["implode","collapse"],
    examples:   [
        "The balloon burst when it was pricked with a pin.",
        "She burst into tears when she heard the news.",
        "The burst of energy helped him to finish the project."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'domination',
    level: 'C1',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˌdɒməˈneɪʃən/',
    ipa_us: '/ˌdɒməˈneɪʃən/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the state of being in control or having power over something",
              "th": "สถานะที่อยู่ในการควบคุมหรือมีอำนาจเหนือสิ่งใดสิ่งหนึ่ง"
        }
  ],
    antonyms: ["subordination","submission"],
    examples:   [
        "The company's domination of the market led to a monopoly.",
        "The domination of the team was evident in their winning streak.",
        "The domination of the ruling party was challenged by the opposition."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'pioneer',
    level: 'C1',
    partOfSpeech: ["noun","verb"],
    ipa_uk: '/ˌpaɪəˈnɪəɹ/',
    ipa_us: '/ˌpaɪəˈnɪəɹ/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a person who is among the first to do something",
              "th": "บุคคลที่เป็นหนึ่งในกลุ่มแรกที่ทำสิ่งใดสิ่งหนึ่ง"
        },
        {
              "pos": "verb",
              "en": "to be the first to do or develop something",
              "th": "เป็นคนแรกที่ทำหรือพัฒนาสิ่งใดสิ่งหนึ่ง"
        }
  ],
    antonyms: ["follower","imitator"],
    examples:   [
        "The pioneer in the field of medicine made groundbreaking discoveries.",
        "She pioneered a new approach to teaching mathematics.",
        "The company pioneered the development of renewable energy sources."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'cite',
    level: 'C1',
    partOfSpeech: ["verb"],
    ipa_uk: '/saɪt/',
    ipa_us: '/saɪt/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to quote or mention something as an example or authority",
              "th": "อ้างอิงหรือกล่าวถึงสิ่งใดสิ่งหนึ่งเป็นตัวอย่างหรืออ้างอิง"
        }
  ],
    antonyms: ["ignore","dismiss"],
    examples:   [
        "The researcher cited several studies to support her argument.",
        "The judge cited the law to justify his decision.",
        "The author cited the expert's opinion to add credibility to her claim."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'instinctive',
    level: 'C1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ɪnˈstɪŋktɪv/',
    ipa_us: '/ɪnˈstɪŋktɪv/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "done or felt without conscious thought or intention",
              "th": "ทำหรือรู้สึกโดยไม่ต้องคิดหรือตั้งใจ"
        }
  ],
    antonyms: ["deliberate","intentional"],
    examples:   [
        "The instinctive reaction to danger is to run away.",
        "She had an instinctive feeling that something was wrong.",
        "The instinctive behavior of the animal was fascinating to watch."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'abound',
    level: 'C1',
    partOfSpeech: ["verb"],
    ipa_uk: '/əˈbaʊnd/',
    ipa_us: '/əˈbaʊnd/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to exist in large quantities or numbers",
              "th": "มีอยู่ในปริมาณมากหรือจำนวนมาก"
        }
  ],
    antonyms: ["lack","scarcity"],
    examples:   [
        "The city abounds with cultural attractions.",
        "The forest abounds with wildlife.",
        "The company abounds with talented employees."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'contract',
    level: 'C1',
    partOfSpeech: ["noun","verb"],
    ipa_uk: '/ˈkɒntɹækt/',
    ipa_us: '/ˈkɒntɹækt/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a formal agreement between two or more parties",
              "th": "ข้อตกลง正式ระหว่างสองฝ่ายหรือมากกว่า"
        },
        {
              "pos": "verb",
              "en": "to become smaller or narrower",
              "th": "เล็กลงหรือแคบลง"
        }
  ],
    antonyms: ["expand","increase"],
    examples:   [
        "The company signed a contract with the supplier.",
        "The muscle contracted and relaxed repeatedly.",
        "The economy contracted due to the recession."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'profoundly',
    level: 'C1',
    partOfSpeech: ["adverb"],
    ipa_uk: '/pɹəˈfaʊndli/',
    ipa_us: '/pɹəˈfaʊndli/',
    meanings:   [
        {
              "pos": "adverb",
              "en": "to a great degree or intensely",
              "th": "ในระดับที่มากหรือเข้มข้น"
        }
  ],
    antonyms: ["slightly","mildly"],
    examples:   [
        "The experience affected her profoundly and changed her life.",
        "The music moved him profoundly and brought tears to his eyes.",
        "The book impacted the readers profoundly and made them think deeply."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },

  {
    word: 'recognition',
    level: 'B2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˌɹɛkəɡˈnɪʃən/',
    ipa_us: '/ˌɹɛkəɡˈnɪʃən/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the act of recognizing or acknowledging something",
              "th": "การยอมรับหรือรับรู้สิ่งใดสิ่งหนึ่ง"
        }
  ],
    antonyms: ["ignorance","misconception"],
    examples:   [
        "The company received recognition for its innovative approach to sustainability.",
        "Her recognition of the problem led to a solution.",
        "The artist struggled for recognition throughout his career."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'oval',
    level: 'B2',
    partOfSpeech: ["adjective","noun"],
    ipa_uk: '/ˈəʊvəl/',
    ipa_us: '/ˈəʊvəl/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "having a shape that is like an egg",
              "th": "มีรูปร่างเหมือนไข่"
        },
        {
              "pos": "noun",
              "en": "a shape that is like an egg",
              "th": "รูปร่างเหมือนไข่"
        }
  ],
    antonyms: ["circular","square"],
    examples:   [
        "The oval shape of the stadium allowed for more seating.",
        "She drew an oval around the picture.",
        "The oval frame suited the painting perfectly."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'dearly',
    level: 'B2',
    partOfSpeech: ["adverb"],
    ipa_uk: '/ˈdɪəli/',
    ipa_us: '/ˈdɪəli/',
    meanings:   [
        {
              "pos": "adverb",
              "en": "in a way that shows love or great affection",
              "th": "ด้วยความรักหรือความชื่นชมอย่างมาก"
        }
  ],
    antonyms: ["hatefully","coldly"],
    examples:   [
        "I love you dearly and will always be here for you.",
        "She held her child dearly, trying to comfort him.",
        "He cherished the memory of his grandmother dearly."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'precisely',
    level: 'B2',
    partOfSpeech: ["adverb"],
    ipa_uk: '/pɹɪˈsaɪsli/',
    ipa_us: '/pɹɪˈsaɪsli/',
    meanings:   [
        {
              "pos": "adverb",
              "en": "exactly or accurately",
              "th": "อย่างแน่นอนหรือแม่นยำ"
        }
  ],
    antonyms: ["inaccurately","roughly"],
    examples:   [
        "The scientist measured the data precisely to ensure accurate results.",
        "She arrived precisely at 8 o'clock as planned.",
        "The engineer designed the mechanism to work precisely under pressure."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'concede',
    level: 'B2',
    partOfSpeech: ["verb"],
    ipa_uk: '/kənˈsiːd/',
    ipa_us: '/kənˈsiːd/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to admit that something is true or correct",
              "th": "ยอมรับว่าสิ่งใดสิ่งหนึ่งเป็นความจริงหรือถูกต้อง"
        }
  ],
    antonyms: ["refute","deny"],
    examples:   [
        "The politician had to concede defeat after the election results were announced.",
        "I concede that your argument has some merit.",
        "The company will concede to the union's demands to avoid a strike."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'preferable',
    level: 'B2',
    partOfSpeech: ["adjective"],
    ipa_uk: '/pɹəˈfɜːɹəb(ə)l/',
    ipa_us: '/pɹəˈfɜːɹəb(ə)l/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "more desirable or acceptable than something else",
              "th": "น่าพึงพอใจหรือยอมรับมากกว่าสิ่งอื่น"
        }
  ],
    antonyms: ["undesirable","unacceptable"],
    examples:   [
        "A quiet room is preferable to a noisy one for studying.",
        "Eating at home is often preferable to eating out.",
        "The new policy is preferable to the old one as it benefits more people."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'vomit',
    level: 'B2',
    partOfSpeech: ["verb","noun"],
    ipa_uk: '/ˈvɒmɪt/',
    ipa_us: '/ˈvɒmɪt/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to throw up food or liquid from the stomach",
              "th": "อาเจียนหรือปะทุอาหารหรือของเหลวจากกระเพาะอาหาร"
        },
        {
              "pos": "noun",
              "en": "the act of vomiting or the matter vomited",
              "th": "การอาเจียนหรือสิ่งที่อาเจียนออกมา"
        }
  ],
    antonyms: ["swallow","digest"],
    examples:   [
        "She had to vomit after eating the spoiled food.",
        "The smell of the rotten fish made him vomit.",
        "The doctor examined the vomit to determine the cause of the illness."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'peacefully',
    level: 'B2',
    partOfSpeech: ["adverb"],
    ipa_uk: '/ˈpiːsfəli/',
    ipa_us: '/ˈpiːsfəli/',
    meanings:   [
        {
              "pos": "adverb",
              "en": "in a peaceful manner, without violence or disturbance",
              "th": "ด้วยวิธีการที่สงบเรียบร้อยโดยไม่มีความรุนแรงหรือการรบกวน"
        }
  ],
    antonyms: ["violently","aggressively"],
    examples:   [
        "The protesters marched peacefully through the city.",
        "The couple lived peacefully in the countryside.",
        "The two countries resolved their conflict peacefully through diplomacy."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'indignity',
    level: 'B2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ɪnˈdɪɡ.nə.ti/',
    ipa_us: '/ɪnˈdɪɡ.nə.ti/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a situation or experience that is humiliating or degrading",
              "th": "สถานการณ์หรือประสบการณ์ที่ทำให้รู้สึกอายหรือเสื่อมเสีย"
        }
  ],
    antonyms: ["dignity","respect"],
    examples:   [
        "The prisoner suffered great indignity during his time in jail.",
        "She felt an indignity at being treated like a child.",
        "The company's actions were an indignity to the entire industry."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'bruise',
    level: 'B2',
    partOfSpeech: ["verb","noun"],
    ipa_uk: '/bɹuːz/',
    ipa_us: '/bɹuːz/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to hurt or damage someone's skin, causing a bruise",
              "th": "ทำให้บาดเจ็บหรือเสียหายต่อผิวหนังของใครสักคน ทำให้เกิดรอยช้ำ"
        },
        {
              "pos": "noun",
              "en": "a mark on the skin where it has been hurt",
              "th": "รอยช้ำบนผิวหนังที่ได้รับบาดเจ็บ"
        }
  ],
    antonyms: ["heal","cure"],
    examples:   [
        "She bruised her knee when she fell down the stairs.",
        "The fruit will bruise easily if it's handled roughly.",
        "The doctor examined the bruise to determine the extent of the injury."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'tyrant',
    level: 'B2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈtaɪɹənt/',
    ipa_us: '/ˈtaɪɹənt/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a ruler who has complete power and uses it in a cruel way",
              "th": "ผู้ปกครองซึ่งมีอำนาจทั้งหมดและใช้มันในทางที่โหดร้าย"
        }
  ],
    antonyms: ["benevolent","democrat"],
    examples:   [
        "The tyrant ruled the country with an iron fist.",
        "The people suffered under the tyrant's oppressive regime.",
        "The tyrant's actions were widely condemned by the international community."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'vital',
    level: 'B2',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈvaɪt̬əl/',
    ipa_us: '/ˈvaɪt̬əl/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "necessary for the success or continued existence of something",
              "th": "จำเป็นต่อความสำเร็จหรือการดำรงอยู่ต่อไปของสิ่งใดสิ่งหนึ่ง"
        }
  ],
    antonyms: ["nonessential","trivial"],
    examples:   [
        "Water is vital for human survival.",
        "The company's vital assets were sold to pay off debts.",
        "The doctor said that rest is vital for recovery from the illness."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'madam',
    level: 'B2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈmæd.əm/',
    ipa_us: '/ˈmæd.əm/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a polite title used to address a woman, especially one in a position of authority",
              "th": "ชื่อเรียกที่สุภาพใช้เรียกผู้หญิง โดยเฉพาะผู้ที่อยู่ในตำแหน่งที่มีอำนาจ"
        }
  ],
    antonyms: ["sir","mr"],
    examples:   [
        "The madam of the house greeted the guests warmly.",
        "Madam President gave a speech at the conference.",
        "The madam of the hotel ensured that all guests were comfortable."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'antique',
    level: 'B2',
    partOfSpeech: ["adjective","noun"],
    ipa_uk: '/ænˈtiːk/',
    ipa_us: '/ænˈtiːk/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "very old, often valuable and attractive because of its age",
              "th": "เก่ามาก มักจะมีค่าและดึงดูดเพราะอายุ"
        },
        {
              "pos": "noun",
              "en": "an object that is very old and often valuable",
              "th": "วัตถุที่เก่ามากและมักจะมีค่า"
        }
  ],
    antonyms: ["modern","new"],
    examples:   [
        "The antique furniture in the house was worth a fortune.",
        "She collected antique jewelry and displayed it proudly.",
        "The antique shop sold rare and valuable items from the past."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'cane',
    level: 'B2',
    partOfSpeech: ["noun"],
    ipa_uk: '[kʰeɪn]',
    ipa_us: '[kʰeɪn]',
    meanings:   [
        {
              "pos": "noun",
              "en": "a long, thin stick used for support or as a weapon",
              "th": "ไม้ยาวและบางที่ใช้สำหรับการสนับสนุนหรือเป็นอาวุธ"
        }
  ],
    antonyms: ["crutch","walker"],
    examples:   [
        "The old man used a cane to walk after his injury.",
        "The police officer used his cane to defend himself.",
        "The hiker used a cane to help her navigate the difficult terrain."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'medication',
    level: 'B2',
    partOfSpeech: ["noun"],
    ipa_uk: '/mɛdɪˈkeɪʃən/',
    ipa_us: '/mɛdɪˈkeɪʃən/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a drug or treatment used to cure or prevent a disease or medical condition",
              "th": "ยาที่ใช้รักษาหรือป้องกันโรคหรือสภาวะทางการแพทย์"
        }
  ],
    antonyms: ["poison","toxin"],
    examples:   [
        "The doctor prescribed medication to lower her blood pressure.",
        "The patient forgot to take her medication this morning.",
        "The new medication has shown great promise in treating the disease."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'needy',
    level: 'B2',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈniːdi/',
    ipa_us: '/ˈniːdi/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "requiring or deserving help or support because of being poor or in a difficult situation",
              "th": "ต้องการหรือสมควรได้รับความช่วยเหลือหรือการสนับสนุนเพราะความยากจนหรือสถานการณ์ที่ยากลำบาก"
        }
  ],
    antonyms: ["wealthy","affluent"],
    examples:   [
        "The charity provided aid to the needy families in the community.",
        "The government launched a program to help the needy and homeless.",
        "The volunteer work focused on assisting the needy and vulnerable."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'tribe',
    level: 'B2',
    partOfSpeech: ["noun"],
    ipa_uk: '/tɹaɪb/',
    ipa_us: '/tɹaɪb/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a social group of people who share a common culture, language, or ancestry",
              "th": "กลุ่มสังคมของผู้คนซึ่งมีวัฒนธรรม ภาษา หรือบรรพบุรุษร่วมกัน"
        }
  ],
    antonyms: ["nation","society"],
    examples:   [
        "The tribe lived in the remote village for generations.",
        "The tribe's traditional practices were passed down through oral tradition.",
        "The anthropologist studied the tribe's customs and way of life."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },

  {
    word: 'bogus',
    level: 'C2',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈbəʊ.ɡəs/',
    ipa_us: '/ˈbəʊ.ɡəs/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "not genuine or true",
              "th": "ไม่แท้จริง"
        }
  ],
    antonyms: ["authentic","genuine"],
    examples:   [
        "The company was selling bogus products, which were actually just cheap knockoffs.",
        "The bogus ID was easily spotted by the bouncer at the club.",
        "The scientist's bogus claims about the new medicine were quickly debunked by the medical community."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'fruition',
    level: 'C2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈfɹuː.ɪʃ.ən/',
    ipa_us: '/ˈfɹuː.ɪʃ.ən/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the state of being complete or fulfilled",
              "th": "สภาพที่สมบูรณ์หรือเต็มที่"
        }
  ],
    antonyms: ["failure","disappointment"],
    examples:   [
        "After years of hard work, the project finally came to fruition and was launched with great success.",
        "The company's plans for expansion reached fruition when they opened their new office in the city.",
        "The fruit tree finally reached fruition and produced a bountiful harvest."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'relinquish',
    level: 'C2',
    partOfSpeech: ["verb"],
    ipa_uk: '[ɹɪˈlɪŋkwɪʃ]',
    ipa_us: '[ɹɪˈlɪŋkwɪʃ]',
    meanings:   [
        {
              "pos": "verb",
              "en": "to give up or abandon something",
              "th": "ยอมแพ้หรือทิ้งบางสิ่ง"
        }
  ],
    antonyms: ["retain","keep"],
    examples:   [
        "She had to relinquish her claim to the throne due to the scandal surrounding her family.",
        "The company was forced to relinquish its assets after filing for bankruptcy.",
        "He reluctantly had to relinquish his dream of becoming a professional athlete due to a serious injury."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'rift',
    level: 'C2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ɹɪft/',
    ipa_us: '/ɹɪft/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a deep division or split",
              "th": "การแบ่งหรือแยกออก"
        }
  ],
    antonyms: ["unity","harmony"],
    examples:   [
        "The rift between the two countries has been growing for years, making diplomatic relations increasingly difficult.",
        "The new policy created a rift between the management and the employees, leading to a strike.",
        "The rift in the rock face was so deep that it was almost impossible to climb."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'secure',
    level: 'C2',
    partOfSpeech: ["adjective","verb"],
    ipa_uk: '/səˈkjɔː(ɹ)/',
    ipa_us: '/səˈkjɔː(ɹ)/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "safe or protected from harm",
              "th": "ปลอดภัยหรือได้รับการคุ้มครอง"
        },
        {
              "pos": "verb",
              "en": "to make something safe or protected",
              "th": "ทำให้บางสิ่งปลอดภัยหรือได้รับการคุ้มครอง"
        }
  ],
    antonyms: ["insecure","vulnerable"],
    examples:   [
        "The secure door was locked and guarded by a team of security personnel.",
        "The company will secure the funding needed to complete the project.",
        "The hikers had to secure their ropes to the mountain face before attempting to climb."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'ethos',
    level: 'C2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈiːθɒs/',
    ipa_us: '/ˈiːθɒs/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the characteristic spirit or attitude of a person or group",
              "th": "จิตวิญญาณหรือทัศนคติที่เป็นลักษณะของบุคคลหรือกลุ่ม"
        }
  ],
    antonyms: ["apathy","indifference"],
    examples:   [
        "The company's ethos is centered around innovation and customer satisfaction.",
        "The ethos of the school is to provide a supportive and inclusive learning environment.",
        "The artist's ethos is reflected in her use of recycled materials and sustainable practices."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'deficient',
    level: 'C2',
    partOfSpeech: ["adjective"],
    ipa_uk: '/dɪˈfɪʃənt/',
    ipa_us: '/dɪˈfɪʃənt/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "lacking or inadequate",
              "th": "ขาดหรือไม่เพียงพอ"
        }
  ],
    antonyms: ["sufficient","adequate"],
    examples:   [
        "The deficient funding for the project meant that it had to be put on hold.",
        "The deficient nutritional content of the food led to health problems for the children.",
        "The company's deficient safety protocols were criticized after the accident."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'materialism',
    level: 'C2',
    partOfSpeech: ["noun"],
    ipa_uk: '/məˈtɪəɹiəlɪzəm/',
    ipa_us: '/məˈtɪəɹiəlɪzəm/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a focus on material possessions and wealth",
              "th": "การมุ่งเน้นไปที่ทรัพย์สินและความมั่งคั่ง"
        }
  ],
    antonyms: ["spirituality","idealism"],
    examples:   [
        "The materialism of modern society has led to a decline in traditional values.",
        "The philosopher argued that materialism is a major obstacle to achieving true happiness.",
        "The artist's work critiques the materialism of contemporary culture and the impact it has on the environment."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'wither',
    level: 'C2',
    partOfSpeech: ["verb"],
    ipa_uk: '/ˈwɪðə/',
    ipa_us: '/ˈwɪðə/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to become dry and shriveled, often due to lack of water or nourishment",
              "th": "แห้งและหดตัวลง"
        }
  ],
    antonyms: ["flourish","thrive"],
    examples:   [
        "The plants began to wither and die after a week without water.",
        "The old man's body began to wither away as he lay in bed, unable to move.",
        "The economy began to wither under the weight of debt and inflation."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'contemptuously',
    level: 'C2',
    partOfSpeech: ["adverb"],
    ipa_uk: '/kənˈtɛmp.tju.əs.li/',
    ipa_us: '/kənˈtɛmp.tju.əs.li/',
    meanings:   [
        {
              "pos": "adverb",
              "en": "in a contemptuous manner",
              "th": "ด้วยท่าทีที่ดูถูก"
        }
  ],
    antonyms: ["respectfully","admiringly"],
    examples:   [
        "He spoke contemptuously of his opponents, which only served to alienate his supporters.",
        "The judge looked at the defendant contemptuously, clearly unimpressed by his excuses.",
        "The artist's latest work was criticized contemptuously by the art critic, who called it 'amateurish'."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'mercantile',
    level: 'C2',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈmɜːkənˌtaɪl/',
    ipa_us: '/ˈmɜːkənˌtaɪl/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "relating to trade or commerce",
              "th": "เกี่ยวกับการค้าหรือพาณิชยกรรม"
        }
  ],
    antonyms: ["non-commercial","charitable"],
    examples:   [
        "The mercantile fleet sailed across the seas, carrying goods to be traded and sold.",
        "The city's mercantile history is still evident in its old port and warehouses.",
        "The company's mercantile approach to business has been criticized for prioritizing profits over people."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'mediation',
    level: 'C2',
    partOfSpeech: ["noun"],
    ipa_uk: '/midiˈeɪʃən/',
    ipa_us: '/midiˈeɪʃən/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the act of mediating or intervening in a dispute",
              "th": "การไกล่เกลี่ยหรือเข้าแทรกแซงในการขัดแย้ง"
        }
  ],
    antonyms: ["confrontation","adversarial"],
    examples:   [
        "The union and management agreed to mediation to resolve the labor dispute.",
        "The mediator helped the two parties reach a settlement through mediation.",
        "The company offers mediation services to help resolve conflicts between employees."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'fractious',
    level: 'C2',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈfɹæk.ʃəs/',
    ipa_us: '/ˈfɹæk.ʃəs/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "unruly or disobedient",
              "th": "ไม่เชื่อฟังหรือไม่เชื่อถือ"
        }
  ],
    antonyms: ["obedient","compliant"],
    examples:   [
        "The fractious child refused to listen to his parents and threw a tantrum.",
        "The fractious employees were difficult to manage and often challenged the authority of their supervisors.",
        "The fractious crowd began to riot, causing chaos and destruction in the city."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'prostrate',
    level: 'C2',
    partOfSpeech: ["verb","adjective"],
    ipa_uk: '/ˈpɹɒstɹeɪt/',
    ipa_us: '/ˈpɹɒstɹeɪt/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to lie flat on the ground, often in a state of exhaustion or defeat",
              "th": "นอนราบกับพื้น"
        },
        {
              "pos": "adjective",
              "en": "lying flat on the ground, often in a state of exhaustion or defeat",
              "th": "นอนราบกับพื้น"
        }
  ],
    antonyms: ["upright","standing"],
    examples:   [
        "The athlete was prostrate on the ground, exhausted from the marathon.",
        "The prostrate figure of the beggar on the street was a sad sight.",
        "The city was prostrate after the devastating earthquake, with buildings lying in ruins."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'disseminate',
    level: 'C2',
    partOfSpeech: ["verb"],
    ipa_uk: '/dɪˈsɛmɪˌneɪt/',
    ipa_us: '/dɪˈsɛmɪˌneɪt/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to spread or distribute something, often information or ideas",
              "th": "กระจายหรือเผยแพร่บางสิ่ง"
        }
  ],
    antonyms: ["conceal","withhold"],
    examples:   [
        "The company will disseminate the new policy to all employees through a series of meetings and emails.",
        "The artist's work aims to disseminate a message of hope and unity to the world.",
        "The scientist's research was disseminated through a series of academic papers and presentations."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'reptilian',
    level: 'C2',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ɹepˈtɪliən/',
    ipa_us: '/ɹepˈtɪliən/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "relating to or resembling reptiles",
              "th": "เกี่ยวกับหรือคล้ายกับ爬虫"
        }
  ],
    antonyms: ["mammalian","avian"],
    examples:   [
        "The reptilian creatures that lived in the desert were well adapted to the harsh environment.",
        "The reptilian features of the dinosaur were still visible in its fossilized remains.",
        "The artist's use of reptilian imagery in her work was meant to evoke a sense of primal fear."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'moribund',
    level: 'C2',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈmɔːɹɪbʌnd/',
    ipa_us: '/ˈmɔːɹɪbʌnd/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "near death or in a state of decline",
              "th": "ใกล้จะเสียชีวิตหรืออยู่ในสถานะที่เสื่อมถอย"
        }
  ],
    antonyms: ["thriving","flourishing"],
    examples:   [
        "The moribund industry was struggling to stay afloat, with many companies going bankrupt.",
        "The moribund patient was given only a short time to live, and the family was preparing for the worst.",
        "The moribund city was a shadow of its former self, with many abandoned buildings and a dwindling population."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },

  {
    word: 'teammate',
    level: 'B1',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈtiːmˌmeɪt/',
    ipa_us: '/ˈtiːmˌmeɪt/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a person who is a member of a team, especially in a sport",
              "th": "เพื่อนร่วมทีม"
        }
  ],
    antonyms: ["opponent","rival"],
    examples:   [
        "My teammate helped me to win the game.",
        "She is a valuable teammate and a good friend.",
        "The new player became a teammate of the famous footballer."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'rational',
    level: 'B1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈɹæʃ(ə)nəl/',
    ipa_us: '/ˈɹæʃ(ə)nəl/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "based on reason or good judgment",
              "th": "มีเหตุผล"
        }
  ],
    antonyms: ["irrational","emotional"],
    examples:   [
        "She made a rational decision to quit her job and start her own business.",
        "The rational approach to the problem led to a successful outcome.",
        "He tried to be rational and not let his emotions control his actions."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'moisture',
    level: 'B1',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈmɔɪstʃɚ/',
    ipa_us: '/ˈmɔɪstʃɚ/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a small amount of liquid, such as water, that is present in the air or in a substance",
              "th": "ความชื้น"
        }
  ],
    antonyms: ["dryness","aridity"],
    examples:   [
        "The high moisture in the air made it difficult to dry the clothes.",
        "The plant needs a certain level of moisture to grow well.",
        "The moisture in the soil helps to prevent soil erosion."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'temper',
    level: 'B1',
    partOfSpeech: ["noun","verb"],
    ipa_uk: '/ˈtɛmpə/',
    ipa_us: '/ˈtɛmpə/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a person's natural personality or disposition",
              "th": "อุปนิสัย"
        },
        {
              "pos": "verb",
              "en": "to make something less severe or extreme",
              "th": "ทำให้ลดลง"
        }
  ],
    antonyms: ["calm","composure"],
    examples:   [
        "She has a bad temper and often gets angry.",
        "The heat can temper the metal and make it stronger.",
        "The news tempered her excitement and made her more cautious."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'emotion',
    level: 'B1',
    partOfSpeech: ["noun"],
    ipa_uk: '/iˈmoʊʃən/',
    ipa_us: '/iˈmoʊʃən/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a strong feeling, such as happiness, sadness, or fear",
              "th": "อารมณ์"
        }
  ],
    antonyms: ["apathy","indifference"],
    examples:   [
        "The movie evoked a strong emotion in the audience.",
        "She tried to control her emotion and not show how she felt.",
        "The emotion in his voice made it clear how much he cared."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'aggressive',
    level: 'B1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/əˈɡɹɛs.ɪv/',
    ipa_us: '/əˈɡɹɛs.ɪv/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "having or showing a strong and forceful personality or behavior",
              "th": "ก้าวร้าว"
        }
  ],
    antonyms: ["passive","submissive"],
    examples:   [
        "The aggressive marketing campaign helped to increase sales.",
        "He has an aggressive driving style and often gets into accidents.",
        "The company has an aggressive expansion plan and is opening new stores."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'bullet',
    level: 'B1',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈbʊl.ɪt/',
    ipa_us: '/ˈbʊl.ɪt/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a small metal projectile fired from a gun",
              "th": "กระสุน"
        },
        {
              "pos": "noun",
              "en": "a symbol used to introduce items in a list",
              "th": "สัญลักษณ์"
        }
  ],
    antonyms: ["shield","protection"],
    examples:   [
        "The bullet missed its target and hit a nearby building.",
        "The presentation used bullets to list the main points.",
        "The bullet train is a high-speed train that can travel at over 300 km/h."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'nevertheless',
    level: 'B1',
    partOfSpeech: ["adverb"],
    ipa_uk: '/ˈnɛvəðəlɛs/',
    ipa_us: '/ˈnɛvəðəlɛs/',
    meanings:   [
        {
              "pos": "adverb",
              "en": "despite something",
              "th": "อย่างไรก็ตาม"
        }
  ],
    antonyms: ["however","on the other hand"],
    examples:   [
        "I'm tired, but I'll go to the party nevertheless.",
        "She didn't like the food, but she ate it nevertheless.",
        "The company is struggling, but it will survive nevertheless."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'confusion',
    level: 'B1',
    partOfSpeech: ["noun"],
    ipa_uk: '/kənˈfjuːʒən/',
    ipa_us: '/kənˈfjuːʒən/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a state of disorder or uncertainty",
              "th": "ความสับสน"
        }
  ],
    antonyms: ["clarity","understanding"],
    examples:   [
        "The instructions caused confusion among the students.",
        "The plot of the movie was full of confusion and twists.",
        "The new policy has caused confusion among the employees."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'mechanic',
    level: 'B1',
    partOfSpeech: ["noun"],
    ipa_uk: '/məˈkænɪk/',
    ipa_us: '/məˈkænɪk/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a person who repairs and maintains machines, especially cars",
              "th": "ช่างเครื่อง"
        }
  ],
    antonyms: ["engineer","technician"],
    examples:   [
        "The mechanic fixed my car and it's running smoothly now.",
        "She's a skilled mechanic and can repair any type of vehicle.",
        "The mechanic's shop is open from 8 am to 5 pm."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'aim',
    level: 'B1',
    partOfSpeech: ["verb","noun"],
    ipa_uk: '/eɪm/',
    ipa_us: '/eɪm/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to point or direct something, such as a weapon or a camera, at a target",
              "th": "มุ่งหมาย"
        },
        {
              "pos": "noun",
              "en": "a goal or objective",
              "th": "เป้าหมาย"
        }
  ],
    antonyms: ["avoid","neglect"],
    examples:   [
        "The archer took aim and shot the arrow.",
        "My aim is to finish the project by the end of the month.",
        "The company's aim is to provide the best customer service."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'conscious',
    level: 'B1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈkɒn.ʃəs/',
    ipa_us: '/ˈkɒn.ʃəs/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "aware of one's surroundings, thoughts, and feelings",
              "th": "ตื่นตัว"
        }
  ],
    antonyms: ["unconscious","unaware"],
    examples:   [
        "She's conscious of her body language and tries to make a good impression.",
        "He's conscious of the environmental impact of his actions.",
        "The patient is conscious and able to talk to the doctor."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'conservation',
    level: 'B1',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˌkɑnsə(ɹ)ˈveɪʃən/',
    ipa_us: '/ˌkɑnsə(ɹ)ˈveɪʃən/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the act of preserving or protecting something, especially the natural environment",
              "th": "การอนุรักษ์"
        }
  ],
    antonyms: ["destruction","exploitation"],
    examples:   [
        "The conservation of water is essential for the survival of our planet.",
        "The company is involved in conservation efforts to protect endangered species.",
        "The conservation of energy is crucial for reducing our carbon footprint."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'limitation',
    level: 'B1',
    partOfSpeech: ["noun"],
    ipa_uk: '/lɪmɪˈteɪʃən/',
    ipa_us: '/lɪmɪˈteɪʃən/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a restriction or a lack of something",
              "th": "ข้อจำกัด"
        }
  ],
    antonyms: ["freedom","flexibility"],
    examples:   [
        "The limitation of the study is that it only included a small sample size.",
        "The company's limitation is that it only operates in one country.",
        "The limitation of the technology is that it's still in its early stages."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'preference',
    level: 'B1',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈpɹɛf(ə)ɹ(ə)ns/',
    ipa_us: '/ˈpɹɛf(ə)ɹ(ə)ns/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a feeling of liking or wanting something more than another thing",
              "th": "ความชอบ"
        }
  ],
    antonyms: ["dislike","aversion"],
    examples:   [
        "I have a preference for coffee over tea.",
        "The company gives preference to candidates with experience.",
        "Her preference is to work independently rather than in a team."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'departure',
    level: 'B1',
    partOfSpeech: ["noun"],
    ipa_uk: '/dɪˈpɑː(ɹ)tjə(ɹ)/',
    ipa_us: '/dɪˈpɑː(ɹ)tjə(ɹ)/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the act of leaving a place or a situation",
              "th": "การออกเดินทาง"
        }
  ],
    antonyms: ["arrival","return"],
    examples:   [
        "The departure of the train was delayed due to technical issues.",
        "The departure from the traditional approach was a bold move.",
        "The departure of the CEO was a surprise to everyone."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'bathe',
    level: 'B1',
    partOfSpeech: ["verb"],
    ipa_uk: '/beɪð/',
    ipa_us: '/beɪð/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to wash the body, especially in a bath or shower",
              "th": "อาบน้ำ"
        }
  ],
    antonyms: ["dirty","soil"],
    examples:   [
        "I like to bathe in the morning to wake myself up.",
        "The baby needs to bathe every day to stay clean.",
        "The dog will bathe in the lake to cool off."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'grouping',
    level: 'B1',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈɡɹuːpɪŋ/',
    ipa_us: '/ˈɡɹuːpɪŋ/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the act of putting people or things into groups",
              "th": "การแบ่งกลุ่ม"
        }
  ],
    antonyms: ["separation","isolation"],
    examples:   [
        "The grouping of the students was based on their age and grade.",
        "The grouping of the data helped to identify patterns.",
        "The company uses grouping to organize its employees into teams."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'discourage',
    level: 'B1',
    partOfSpeech: ["verb"],
    ipa_uk: '/dɪsˈkʌɹɪd͡ʒ/',
    ipa_us: '/dɪsˈkʌɹɪd͡ʒ/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to make someone less likely to do something",
              "th": "ทำให้ไม่สู้"
        }
  ],
    antonyms: ["encourage","motivate"],
    examples:   [
        "The high cost of living can discourage people from moving to the city.",
        "The teacher tried to discourage the student from dropping out of school.",
        "The company's policy is designed to discourage employees from taking long breaks."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'alternative',
    level: 'B1',
    partOfSpeech: ["adjective","noun"],
    ipa_uk: '/ɒl.ˈtɜː(ɹ).nə.tɪv/',
    ipa_us: '/ɒl.ˈtɜː(ɹ).nə.tɪv/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "providing a choice between two or more things",
              "th": "ทางเลือก"
        },
        {
              "pos": "noun",
              "en": "a choice or option",
              "th": "ตัวเลือก"
        }
  ],
    antonyms: ["mainstream","conventional"],
    examples:   [
        "The alternative route to the beach is more scenic.",
        "The company offers an alternative to traditional health insurance.",
        "The alternative energy source is becoming more popular."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },

  {
    word: 'expect',
    level: 'A2',
    partOfSpeech: ["verb [T]"],
    ipa_uk: '/ɛkˈspɛkt/',
    ipa_us: '/ɛkˈspɛkt/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to think that something will happen",
              "th": "คาดหวัง"
        }
  ],
    antonyms: ["doubt","surprise"],
    examples:   [
        "I expect to see you at the party tonight.",
        "She expects to finish her project by the end of the month.",
        "They expect a lot of visitors at the museum this weekend."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'escalator',
    level: 'A2',
    partOfSpeech: ["noun [C]"],
    ipa_uk: '/ˈɛs.kə.leɪ.tə/',
    ipa_us: '/ˈɛs.kə.leɪ.tə/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a moving staircase",
              "th": "บันไดเลื่อน"
        }
  ],
    antonyms: ["staircase","elevator"],
    examples:   [
        "The escalator in the mall is very long and takes you to the top floor.",
        "She got on the escalator and went up to the food court.",
        "The escalator was broken, so we had to take the stairs."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'delay',
    level: 'A2',
    partOfSpeech: ["verb [T]","noun [C]"],
    ipa_uk: '/dɪˈleɪ/',
    ipa_us: '/dɪˈleɪ/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to make something happen later than planned",
              "th": "ทำให้ล่าช้า"
        },
        {
              "pos": "noun",
              "en": "a period of time when something is late",
              "th": "การล่าช้า"
        }
  ],
    antonyms: ["hurry","speed"],
    examples:   [
        "The flight was delayed due to bad weather.",
        "She delayed her trip because of the hurricane.",
        "The delay in the project has caused a lot of problems."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'far',
    level: 'A2',
    partOfSpeech: ["adverb"],
    ipa_uk: '/fɑː/',
    ipa_us: '/fɑː/',
    meanings:   [
        {
              "pos": "adverb",
              "en": "at a great distance",
              "th": "ไกล"
        }
  ],
    antonyms: ["near","close"],
    examples:   [
        "The city is far from the beach.",
        "She lives far away from her family.",
        "The hotel is far from the airport, so we need to take a taxi."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'earth',
    level: 'A2',
    partOfSpeech: ["noun [C]"],
    ipa_uk: '/ɜːθ/',
    ipa_us: '/ɜːθ/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the planet we live on",
              "th": "โลก"
        }
  ],
    antonyms: ["space","moon"],
    examples:   [
        "The earth is the only known planet with life.",
        "We need to take care of the earth and its resources.",
        "The earthquake shook the earth and caused a lot of damage."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'fail',
    level: 'A2',
    partOfSpeech: ["verb [T]"],
    ipa_uk: '/feɪl/',
    ipa_us: '/feɪl/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to not succeed",
              "th": "ล้มเหลว"
        }
  ],
    antonyms: ["succeed","pass"],
    examples:   [
        "He failed the exam because he didn't study.",
        "The company will fail if it doesn't get more funding.",
        "She failed to finish the marathon because of an injury."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'basically',
    level: 'A2',
    partOfSpeech: ["adverb"],
    ipa_uk: '/ˈbeɪsɪk(ə)li/',
    ipa_us: '/ˈbeɪsɪk(ə)li/',
    meanings:   [
        {
              "pos": "adverb",
              "en": "used to show that something is true in a general sense",
              "th": "โดยพื้นฐาน"
        }
  ],
    antonyms: ["generally","usually"],
    examples:   [
        "I'm basically a happy person, but I get sad sometimes.",
        "He's basically a good driver, but he got into an accident.",
        "The hotel is basically full, but they have a few rooms left."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'seed',
    level: 'A2',
    partOfSpeech: ["noun [C]"],
    ipa_uk: '/siːd/',
    ipa_us: '/siːd/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a small part of a plant that grows into a new plant",
              "th": "เมล็ด"
        }
  ],
    antonyms: ["plant","flower"],
    examples:   [
        "She planted a seed in her garden and watered it every day.",
        "The farmer scattered seeds all over the field.",
        "The seed of the idea was planted in his mind years ago."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'success',
    level: 'A2',
    partOfSpeech: ["noun [C]"],
    ipa_uk: '/səkˈsɛs/',
    ipa_us: '/səkˈsɛs/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the state of achieving something desired or intended",
              "th": "ความสำเร็จ"
        }
  ],
    antonyms: ["failure","defeat"],
    examples:   [
        "She felt a sense of success when she graduated from college.",
        "The company's success is due to its innovative products.",
        "His success in the music industry was a surprise to everyone."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'fry',
    level: 'A2',
    partOfSpeech: ["verb [T]"],
    ipa_uk: '/fɹaɪ/',
    ipa_us: '/fɹaɪ/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to cook food in hot oil or fat",
              "th": "ทอด"
        }
  ],
    antonyms: ["boil","steam"],
    examples:   [
        "She fried the eggs in a pan and served them with toast.",
        "He likes to fry fish and eat it with rice.",
        "The chef will fry the vegetables in a wok and add them to the stir-fry."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'claim',
    level: 'A2',
    partOfSpeech: ["verb [T]","noun [C]"],
    ipa_uk: '/kleɪm/',
    ipa_us: '/kleɪm/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to say that something is true or is a fact",
              "th": "อ้าง"
        },
        {
              "pos": "noun",
              "en": "a statement that something is true or is a fact",
              "th": "การอ้าง"
        }
  ],
    antonyms: ["deny","refuse"],
    examples:   [
        "He claimed that he was innocent and didn't commit the crime.",
        "The company will claim the insurance money for the damaged goods.",
        "The claim that the product is organic is not supported by evidence."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'pity',
    level: 'A2',
    partOfSpeech: ["noun [C]"],
    ipa_uk: '/ˈpɪti/',
    ipa_us: '/ˈpɪti/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a feeling of sadness or sympathy for someone or something",
              "th": "ความสงสาร"
        }
  ],
    antonyms: ["joy","happiness"],
    examples:   [
        "I feel pity for the homeless people on the streets.",
        "She felt pity for her friend who lost her job.",
        "The pity in his eyes made me feel uncomfortable."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'weekly',
    level: 'A2',
    partOfSpeech: ["adverb","adjective"],
    ipa_uk: '/wiːk.li/',
    ipa_us: '/wiːk.li/',
    meanings:   [
        {
              "pos": "adverb",
              "en": "happening or done once a week",
              "th": "ทุกสัปดาห์"
        },
        {
              "pos": "adjective",
              "en": "happening or done once a week",
              "th": "รายสัปดาห์"
        }
  ],
    antonyms: ["daily","monthly"],
    examples:   [
        "The weekly meeting is at 2 PM on Fridays.",
        "She gets a weekly allowance from her parents.",
        "The weekly newspaper is delivered to our doorstep every Sunday."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'robin',
    level: 'A2',
    partOfSpeech: ["noun [C]"],
    ipa_uk: '/ˈɹɒb.ɪn/',
    ipa_us: '/ˈɹɒb.ɪn/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a small bird with a red breast",
              "th": "นกโรบิน"
        }
  ],
    antonyms: ["sparrow","finch"],
    examples:   [
        "The robin is a common bird in North America.",
        "She saw a robin in her backyard and was delighted.",
        "The robin's song is a beautiful sound to wake up to in the morning."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'chimpanzee',
    level: 'A2',
    partOfSpeech: ["noun [C]"],
    ipa_uk: '/tʃɪmˈpæn.zi/',
    ipa_us: '/tʃɪmˈpæn.zi/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a large intelligent primate that lives in Africa",
              "th": "ชิมแปนซี"
        }
  ],
    antonyms: ["gorilla","orangutan"],
    examples:   [
        "The chimpanzee is one of the smartest animals in the world.",
        "She visited the chimpanzee sanctuary and was amazed by their intelligence.",
        "The chimpanzee's behavior is similar to that of humans in many ways."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'silently',
    level: 'A2',
    partOfSpeech: ["adverb"],
    ipa_uk: '/ˈsaɪləntli/',
    ipa_us: '/ˈsaɪləntli/',
    meanings:   [
        {
              "pos": "adverb",
              "en": "without making any noise",
              "th": "อย่างเงียบๆ"
        }
  ],
    antonyms: ["loudly","noisily"],
    examples:   [
        "She walked silently through the forest, not wanting to scare the animals.",
        "He sat silently in the corner, lost in thought.",
        "The crowd watched silently as the parade went by."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'joy',
    level: 'A2',
    partOfSpeech: ["noun [C]"],
    ipa_uk: '/dʒɔɪ/',
    ipa_us: '/dʒɔɪ/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a feeling of great happiness",
              "th": "ความสุข"
        }
  ],
    antonyms: ["sadness","sorrow"],
    examples:   [
        "She felt joy when she heard the news that she got the job.",
        "The joy of being with loved ones is the best feeling in the world.",
        "The joy of learning something new is a great motivator."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'marry',
    level: 'A2',
    partOfSpeech: ["verb [T]"],
    ipa_uk: '/ˈmæɹɪ/',
    ipa_us: '/ˈmæɹɪ/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to become the husband or wife of someone",
              "th": "แต่งงาน"
        }
  ],
    antonyms: ["divorce","separate"],
    examples:   [
        "She wants to marry her boyfriend and have kids.",
        "He will marry his girlfriend next year.",
        "The couple decided to marry in a small ceremony with close friends and family."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'scissors',
    level: 'A2',
    partOfSpeech: ["noun [C]"],
    ipa_uk: '/ˈsɪzəz/',
    ipa_us: '/ˈsɪzəz/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a tool used for cutting things",
              "th": "กรรไกร"
        }
  ],
    antonyms: ["knife","blade"],
    examples:   [
        "She used scissors to cut the paper into small pieces.",
        "He needs scissors to cut the rope.",
        "The scissors were sharp and cut through the fabric easily."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'chapter',
    level: 'A2',
    partOfSpeech: ["noun [C]"],
    ipa_uk: '/ˈt͡ʃæptə/',
    ipa_us: '/ˈt͡ʃæptə/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a part of a book, usually with its own title",
              "th": "บท"
        }
  ],
    antonyms: ["page","section"],
    examples:   [
        "The chapter on history was the most interesting part of the book.",
        "She read a chapter of the novel every night before bed.",
        "The chapter on science was difficult to understand."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'adult',
    level: 'A2',
    partOfSpeech: ["noun [C]","adjective"],
    ipa_uk: '/əˈdʌlt/',
    ipa_us: '/əˈdʌlt/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a person who is fully grown",
              "th": "ผู้ใหญ่"
        },
        {
              "pos": "adjective",
              "en": "relating to or intended for adults",
              "th": "สำหรับผู้ใหญ่"
        }
  ],
    antonyms: ["child","teenager"],
    examples:   [
        "The adult education program is very popular.",
        "She became an adult at the age of 18.",
        "The adult movie was not suitable for children."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'perfectly',
    level: 'A2',
    partOfSpeech: ["adverb"],
    ipa_uk: '/ˈpɜːfɪktli/',
    ipa_us: '/ˈpɜːfɪktli/',
    meanings:   [
        {
              "pos": "adverb",
              "en": "completely or totally",
              "th": "อย่างสมบูรณ์"
        }
  ],
    antonyms: ["imperfectly","partially"],
    examples:   [
        "She speaks English perfectly, without any accent.",
        "He cooked the steak perfectly, it was medium rare.",
        "The puzzle pieces fit together perfectly, without any gaps."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'relaxed',
    level: 'A2',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ɹɪˈlækst/',
    ipa_us: '/ɹɪˈlækst/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "feeling or showing a state of calm and comfort",
              "th": "ผ่อนคลาย"
        }
  ],
    antonyms: ["tense","stressed"],
    examples:   [
        "She felt relaxed after taking a warm bath.",
        "He looked relaxed in his casual clothes.",
        "The relaxed atmosphere of the beach made me feel at ease."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },

  {
    word: 'disorder',
    level: 'B2',
    partOfSpeech: ["noun"],
    ipa_uk: '/dɪsˈɔːdə(ɹ)/',
    ipa_us: '/dɪsˈɔːdə(ɹ)/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a state of confusion or upheaval",
              "th": "สภาพของความสับสนหรือการเปลี่ยนแปลงอย่างฉับพลัน"
        }
  ],
    antonyms: ["order","stability"],
    examples:   [
        "The country was in a state of disorder after the coup.",
        "The doctor diagnosed the patient with a mental disorder.",
        "The room was in complete disorder after the party."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'wink',
    level: 'B2',
    partOfSpeech: ["verb","noun"],
    ipa_uk: '/ˈwɪŋk/',
    ipa_us: '/ˈwɪŋk/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to close and open one eye quickly",
              "th": "ปิดและเปิดดวงตาหนึ่งดวงอย่างรวดเร็ว"
        },
        {
              "pos": "noun",
              "en": "a quick closing and opening of one eye",
              "th": "การปิดและเปิดดวงตาหนึ่งดวงอย่างรวดเร็ว"
        }
  ],
    antonyms: ["stare","glare"],
    examples:   [
        "He winked at me across the room, and I felt a spark of attraction.",
        "The comedian's wink at the audience was a clever way to connect with them.",
        "The wink in her eye suggested that she was hiding something."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'species',
    level: 'B2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈspiːsiːz/',
    ipa_us: '/ˈspiːsiːz/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a group of living things that share common characteristics",
              "th": "กลุ่มของสิ่งมีชีวิตที่มีลักษณะทั่วไป"
        }
  ],
    antonyms: ["individual","hybrid"],
    examples:   [
        "The scientist studied the species of plants that were native to the island.",
        "The conservation effort aimed to protect the endangered species.",
        "The new species of bird was discovered in the depths of the Amazon rainforest."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'penetrate',
    level: 'B2',
    partOfSpeech: ["verb"],
    ipa_uk: '/ˈpɛnɪtɹeɪt/',
    ipa_us: '/ˈpɛnɪtɹeɪt/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to enter or spread into something",
              "th": "เข้าหรือแพร่กระจายเข้าไปในบางสิ่ง"
        }
  ],
    antonyms: ["repel","withstand"],
    examples:   [
        "The new technology helped to penetrate the market and increase sales.",
        "The cold air began to penetrate the room, and we shivered.",
        "The company's marketing strategy aimed to penetrate the competitive industry."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'gangster',
    level: 'B2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈɡæŋstə/',
    ipa_us: '/ˈɡæŋstə/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a member of a gang, especially one involved in crime",
              "th": "สมาชิกของแก๊ง โดยเฉพาะอย่างยิ่งผู้ที่เกี่ยวข้องกับอาชญากรรม"
        }
  ],
    antonyms: ["lawman","citizen"],
    examples:   [
        "The gangster was known for his ruthless tactics and violent outbursts.",
        "The movie portrayed the gangster as a complex and multifaceted character.",
        "The city was plagued by gangster violence and corruption."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'mixture',
    level: 'B2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈmɪkstʃə/',
    ipa_us: '/ˈmɪkstʃə/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a combination of different things",
              "th": "ส่วนผสมของสิ่งต่างๆ ที่แตกต่างกัน"
        }
  ],
    antonyms: ["purity","uniformity"],
    examples:   [
        "The recipe required a mixture of flour, sugar, and eggs.",
        "The city's cultural mixture was reflected in its diverse cuisine.",
        "The artist created a unique mixture of colors and textures in her painting."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'roast',
    level: 'B2',
    partOfSpeech: ["verb","noun"],
    ipa_uk: '/ɹəʊst/',
    ipa_us: '/ɹəʊst/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to cook food, especially meat, in an oven or over an open fire",
              "th": "การปรุงอาหาร โดยเฉพาะเนื้อ ในเตาหรือเหนือไฟที่เปิด"
        },
        {
              "pos": "noun",
              "en": "a meal, especially of roasted meat",
              "th": "มื้ออาหาร โดยเฉพาะของเนื้อที่ถูกย่าง"
        }
  ],
    antonyms: ["boil","raw"],
    examples:   [
        "The chef decided to roast the chicken for the holiday dinner.",
        "The roast beef was tender and flavorful.",
        "The family gathered around the table for the traditional Sunday roast."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'wreck',
    level: 'B2',
    partOfSpeech: ["verb","noun"],
    ipa_uk: '/ˈɹɛk/',
    ipa_us: '/ˈɹɛk/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to cause something to be completely damaged or destroyed",
              "th": "ทำให้บางสิ่งถูกทำลายหรือเสียหายอย่างสมบูรณ์"
        },
        {
              "pos": "noun",
              "en": "the remains of something that has been destroyed",
              "th": "ส่วนที่เหลือของสิ่งที่ถูกทำลาย"
        }
  ],
    antonyms: ["repair","restore"],
    examples:   [
        "The storm wrecked the small boat, leaving the sailors stranded.",
        "The wreck of the old car was sold for scrap metal.",
        "The company's finances were wrecked by the economic downturn."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'mess',
    level: 'B2',
    partOfSpeech: ["noun","verb"],
    ipa_uk: '/mɛs/',
    ipa_us: '/mɛs/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a state of confusion or disorder",
              "th": "สภาพของความสับสนหรือความไม่เรียบร้อย"
        },
        {
              "pos": "verb",
              "en": "to make something untidy or disorganized",
              "th": "ทำให้บางสิ่งไม่เรียบร้อยหรือไม่เป็นระเบียบ"
        }
  ],
    antonyms: ["order","tidiness"],
    examples:   [
        "The room was a mess after the party, with trash and broken glasses everywhere.",
        "The company's finances were a mess, and they needed to reorganize.",
        "The chef's kitchen was a mess, with pots and pans scattered all over the counter."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'defy',
    level: 'B2',
    partOfSpeech: ["verb"],
    ipa_uk: '/dɪˈfaɪ/',
    ipa_us: '/dɪˈfaɪ/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to refuse to obey or comply with something",
              "th": "ปฏิเสธที่จะเชื่อฟังหรือทำตามบางสิ่ง"
        }
  ],
    antonyms: ["obey","comply"],
    examples:   [
        "The activist defied the government's orders and continued to protest.",
        "The company defied the industry trends and launched a successful new product.",
        "The teenager defied her parents' rules and stayed out late with her friends."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'inflation',
    level: 'B2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ɪnˈfleɪʃən/',
    ipa_us: '/ɪnˈfleɪʃən/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a general increase in prices and a fall in the value of money",
              "th": "การเพิ่มขึ้นของราคาทั่วไปและความเสื่อมถอยของมูลค่าของเงิน"
        }
  ],
    antonyms: ["deflation","stability"],
    examples:   [
        "The country experienced high inflation, and the cost of living increased significantly.",
        "The central bank raised interest rates to combat inflation.",
        "The economist predicted that inflation would rise in the coming year."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'eloquence',
    level: 'B2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈɛl.ə.kwəns/',
    ipa_us: '/ˈɛl.ə.kwəns/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the quality of being fluent and persuasive in speech or writing",
              "th": "คุณภาพของการเป็นคล่องแคล่วและเป็นที่เชื่อถือในคำพูดหรือการเขียน"
        }
  ],
    antonyms: ["inarticulateness","awkwardness"],
    examples:   [
        "The politician's eloquence won over the audience and helped her win the election.",
        "The writer's eloquence made her novel a bestseller.",
        "The teacher encouraged her students to develop their eloquence through public speaking."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'venue',
    level: 'B2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈvɛnjuː/',
    ipa_us: '/ˈvɛnjuː/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a place where an event or activity is held",
              "th": "สถานที่ที่จัดกิจกรรมหรืองาน"
        }
  ],
    antonyms: ["absence","cancellation"],
    examples:   [
        "The concert venue was packed with excited fans.",
        "The company chose a unique venue for their product launch.",
        "The wedding venue was a beautiful outdoor garden."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'aspiration',
    level: 'B2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˌæspəˈɹeɪʃən/',
    ipa_us: '/ˌæspəˈɹeɪʃən/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a strong desire or ambition to achieve something",
              "th": "ความปรารถนาหรือความทะเยอทะยานที่จะบรรลุเป้าหมาย"
        }
  ],
    antonyms: ["apathy","resignation"],
    examples:   [
        "Her aspiration to become a doctor motivated her to study hard.",
        "The company's aspiration to be a leader in the industry drove their innovation.",
        "The artist's aspiration to create something new and original inspired her to experiment with different techniques."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'chief',
    level: 'B2',
    partOfSpeech: ["adjective","noun"],
    ipa_uk: '/tʃiːf/',
    ipa_us: '/tʃiːf/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "most important or main",
              "th": "สำคัญที่สุดหรือหลัก"
        },
        {
              "pos": "noun",
              "en": "a leader or head of a group or organization",
              "th": "ผู้นำหรือหัวหน้ากลุ่มหรือองค์กร"
        }
  ],
    antonyms: ["subordinate","assistant"],
    examples:   [
        "The chief executive officer made the final decision.",
        "The chief of police was responsible for the safety of the city.",
        "The chief ingredient in the recipe was fresh basil."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'envy',
    level: 'B2',
    partOfSpeech: ["verb","noun"],
    ipa_uk: '/ˈɛnvi/',
    ipa_us: '/ˈɛnvi/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to feel jealous or resentful of someone's success or advantages",
              "th": "รู้สึกอิจฉาหรือไม่พอใจต่อความสำเร็จหรือความได้เปรียบของคนอื่น"
        },
        {
              "pos": "noun",
              "en": "a feeling of jealousy or resentment towards someone's success or advantages",
              "th": "ความรู้สึกอิจฉาหรือไม่พอใจต่อความสำเร็จหรือความได้เปรียบของคนอื่น"
        }
  ],
    antonyms: ["admiration","pride"],
    examples:   [
        "She envied her friend's beautiful house and luxurious lifestyle.",
        "The envy of his colleagues drove him to work harder and achieve more.",
        "The company's success sparked envy among their competitors."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'prosecute',
    level: 'B2',
    partOfSpeech: ["verb"],
    ipa_uk: '/ˈpɹɒsɪkjuːt/',
    ipa_us: '/ˈpɹɒsɪkjuːt/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to bring a legal action against someone, especially in a court of law",
              "th": "การดำเนินคดีทางกฎหมายกับใครบางคน โดยเฉพาะอย่างยิ่งในศาล"
        }
  ],
    antonyms: ["defend","exonerate"],
    examples:   [
        "The government decided to prosecute the company for their environmental violations.",
        "The lawyer was hired to prosecute the case against the defendant.",
        "The district attorney chose not to prosecute the suspect due to lack of evidence."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'judo',
    level: 'B2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈdʒuːdəʊ/',
    ipa_us: '/ˈdʒuːdəʊ/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a Japanese martial art that emphasizes throwing, grappling, and submission techniques",
              "th": "ศิลปะการต่อสู้ของญี่ปุ่นที่เน้นเทคนิคการโยน การยึด และการยอมจำนน"
        }
  ],
    antonyms: ["boxing","wrestling"],
    examples:   [
        "The athlete competed in judo at the Olympic Games.",
        "The judo instructor taught his students various throwing techniques.",
        "The school offered judo classes as part of their physical education program."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'axis',
    level: 'B2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈæksəs/',
    ipa_us: '/ˈæksəs/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a line or plane around which something rotates or is symmetrical",
              "th": "เส้นหรือระนาบที่บางสิ่งหมุนหรือสมมาตร"
        }
  ],
    antonyms: ["periphery","edge"],
    examples:   [
        "The Earth rotates on its axis, causing day and night.",
        "The axis of the wheel was damaged, causing the car to vibrate.",
        "The artist used the axis of the composition to create a sense of balance."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },

  {
    word: 'firm',
    level: 'C1',
    partOfSpeech: ["adjective","noun","verb"],
    ipa_uk: '/fɜːm/',
    ipa_us: '/fɜːm/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "strong and stable",
              "th": "มั่นคง"
        },
        {
              "pos": "noun",
              "en": "a business organization",
              "th": "บริษัท"
        },
        {
              "pos": "verb",
              "en": "to make something stronger",
              "th": "ทำให้แข็งแรง"
        }
  ],
    antonyms: ["weak","unstable"],
    examples:   [
        "The firm ground beneath my feet gave me confidence.",
        "The firm has been in business for over 20 years.",
        "She tried to firm up her resolve to quit smoking."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'parasite',
    level: 'C1',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈpæɹəˌsaɪt/',
    ipa_us: '/ˈpæɹəˌsaɪt/',
    meanings:   [
        {
              "pos": "noun",
              "en": "an organism that lives on or in another organism",
              "th": "สิ่งมีชีวิตที่อาศัยในหรือบนอีกสิ่งมีชีวิตหนึ่ง"
        }
  ],
    antonyms: ["host","benefactor"],
    examples:   [
        "The parasite was feeding off the host's blood.",
        "The doctor prescribed medication to kill the parasite.",
        "The parasite was difficult to detect in the patient's system."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'resilience',
    level: 'C1',
    partOfSpeech: ["noun"],
    ipa_uk: '/ɹə.zɪl.ɪ.əns/',
    ipa_us: '/ɹə.zɪl.ɪ.əns/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the ability to withstand or recover from difficult conditions",
              "th": "ความสามารถในการทนต่อหรือฟื้นตัวจากสภาพที่ยากลำบาก"
        }
  ],
    antonyms: ["fragility","vulnerability"],
    examples:   [
        "The resilience of the community was inspiring after the natural disaster.",
        "She showed remarkable resilience in the face of adversity.",
        "The resilience of the material was tested in extreme temperatures."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'intuitive',
    level: 'C1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ɪnˈtjuːɪtɪv/',
    ipa_us: '/ɪnˈtjuːɪtɪv/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "able to acquire knowledge or insight without conscious reasoning",
              "th": "สามารถได้รับความรู้หรือความเข้าใจโดยไม่ต้องมีการให้เหตุผลอย่างตระหนัก"
        }
  ],
    antonyms: ["logical","methodical"],
    examples:   [
        "She had an intuitive sense of how to solve the problem.",
        "The intuitive interface of the software made it easy to use.",
        "He had an intuitive feeling that something was wrong."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'dissection',
    level: 'C1',
    partOfSpeech: ["noun"],
    ipa_uk: '/daɪˈsɛkʃən/',
    ipa_us: '/daɪˈsɛkʃən/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the act of cutting something open in order to examine it",
              "th": "การทำการผ่าเพื่อตรวจสอบสิ่งใดสิ่งหนึ่ง"
        }
  ],
    antonyms: ["assembly","construction"],
    examples:   [
        "The dissection of the frog was a required lab experiment in biology class.",
        "The dissection of the evidence revealed a surprising truth.",
        "The doctor performed a dissection of the tissue to examine it more closely."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'blithely',
    level: 'C1',
    partOfSpeech: ["adverb"],
    ipa_uk: '/ˈblaɪðli/',
    ipa_us: '/ˈblaɪðli/',
    meanings:   [
        {
              "pos": "adverb",
              "en": "in a happy and carefree way",
              "th": "ในลักษณะที่มีความสุขและไม่มีความกังวล"
        }
  ],
    antonyms: ["gloomily","melancholically"],
    examples:   [
        "She walked blithely through the park, enjoying the sunshine.",
        "He spoke blithely about his future plans, without a care in the world.",
        "The children played blithely in the garden, laughing and shouting."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'eccentric',
    level: 'C1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ɪkˈsɛntɹɪk/',
    ipa_us: '/ɪkˈsɛntɹɪk/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "unconventional and unusual",
              "th": "ไม่ปกติและไม่ธรรมดา"
        }
  ],
    antonyms: ["conventional","normal"],
    examples:   [
        "The eccentric artist was known for his unusual sculptures.",
        "She had an eccentric style, often wearing bright colors and patterns.",
        "The eccentric billionaire was famous for his extravagant parties."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'dispense',
    level: 'C1',
    partOfSpeech: ["verb"],
    ipa_uk: '/dɪsˈpɛns/',
    ipa_us: '/dɪsˈpɛns/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to give out or distribute something",
              "th": "ให้สิ่งใดสิ่งหนึ่งหรือกระจายสิ่งใดสิ่งหนึ่ง"
        }
  ],
    antonyms: ["withhold","retain"],
    examples:   [
        "The pharmacist will dispense the medication to the patient.",
        "The charity will dispense food and water to the affected areas.",
        "The machine will dispense the tickets automatically."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'impede',
    level: 'C1',
    partOfSpeech: ["verb"],
    ipa_uk: '/ɪmˈpiːd/',
    ipa_us: '/ɪmˈpiːd/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to slow or prevent something from happening or progressing",
              "th": "ชะลอหรือป้องกันสิ่งใดสิ่งหนึ่งจากที่จะเกิดขึ้นหรือคืบหน้า"
        }
  ],
    antonyms: ["facilitate","accelerate"],
    examples:   [
        "The traffic jam will impede our journey to the airport.",
        "The lack of funding will impede the progress of the project.",
        "The bad weather will impede the outdoor activities."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'buzzer',
    level: 'C1',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈbʌzə/',
    ipa_us: '/ˈbʌzə/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a device that makes a loud, high-pitched sound",
              "th": "อุปกรณ์ที่ทำให้เกิดเสียงดังและเสียงสูง"
        }
  ],
    antonyms: ["silencer","muffler"],
    examples:   [
        "The buzzer on the timer went off, signaling the end of the game.",
        "The doorbell had a loud buzzer that could be heard from afar.",
        "The alarm clock had a buzzer that was difficult to turn off."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'compulsion',
    level: 'C1',
    partOfSpeech: ["noun"],
    ipa_uk: '/kəmˈpʌl.ʃən/',
    ipa_us: '/kəmˈpʌl.ʃən/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a strong and usually unpleasant feeling that you must do something",
              "th": "ความรู้สึกที่รุนแรงและไม่สบายใจที่คุณต้องทำสิ่งใดสิ่งหนึ่ง"
        }
  ],
    antonyms: ["freedom","choice"],
    examples:   [
        "She had a compulsion to check her phone every few minutes.",
        "He had a compulsion to wash his hands repeatedly throughout the day.",
        "The compulsion to gamble had taken over his life."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'alignment',
    level: 'C1',
    partOfSpeech: ["noun"],
    ipa_uk: '[əˈɫaɪnmənt]',
    ipa_us: '[əˈɫaɪnmənt]',
    meanings:   [
        {
              "pos": "noun",
              "en": "the act of adjusting or positioning something so that it is in a straight line or in the correct position",
              "th": "การปรับหรือวางสิ่งใดสิ่งหนึ่งให้อยู่ในแนวตรงหรือในตำแหน่งที่ถูกต้อง"
        }
  ],
    antonyms: ["misalignment","displacement"],
    examples:   [
        "The alignment of the wheels was off, causing the car to pull to one side.",
        "The alignment of the planets was a rare astronomical event.",
        "The alignment of the text was important for the design of the brochure."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'rumble',
    level: 'C1',
    partOfSpeech: ["verb","noun"],
    ipa_uk: '/ˈɹʌmb(ə)l/',
    ipa_us: '/ˈɹʌmb(ə)l/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to make a low, continuous sound, like thunder",
              "th": "ทำให้เกิดเสียงต่ำและต่อเนื่องกัน เช่น เสียงฟ้าผ่า"
        },
        {
              "pos": "noun",
              "en": "a low, continuous sound",
              "th": "เสียงต่ำและต่อเนื่องกัน"
        }
  ],
    antonyms: ["silence","stillness"],
    examples:   [
        "The thunder began to rumble in the distance, signaling an approaching storm.",
        "The engine started to rumble, shaking the entire car.",
        "The rumble of the waterfall was soothing to listen to."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'stamina',
    level: 'C1',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈstæmɪnə/',
    ipa_us: '/ˈstæmɪnə/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the ability to withstand difficult or prolonged physical or mental effort",
              "th": "ความสามารถในการทนต่อความพยายามที่ยากหรือยาวนานทั้งทางกายและจิต"
        }
  ],
    antonyms: ["weakness","fatigue"],
    examples:   [
        "The athlete's stamina allowed her to run the marathon without getting tired.",
        "The student's stamina helped him to study for hours without a break.",
        "The hiker's stamina was tested as he climbed the steep mountain trail."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'fissure',
    level: 'C1',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈfɪʃ.ə(ɹ)/',
    ipa_us: '/ˈfɪʃ.ə(ɹ)/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a long, narrow opening or crack in something, especially in rock or the earth's surface",
              "th": "ช่องเปิดหรือรอยแตกที่ยาวและแคบในบางสิ่ง โดยเฉพาะในหินหรือพื้นผิวโลก"
        }
  ],
    antonyms: ["fusion","merger"],
    examples:   [
        "The fissure in the rock face was a sign of the earthquake's impact.",
        "The doctor examined the fissure in the patient's skin, looking for signs of infection.",
        "The fissure in the ice was a hazard for the skaters."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },

  {
    word: 'potential',
    level: 'B1',
    partOfSpeech: ["noun","adjective"],
    ipa_uk: '/pəˈtɛnʃəl/',
    ipa_us: '/pəˈtɛnʃəl/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the possibility of something happening or being the case",
              "th": "โอกาสที่บางสิ่งจะเกิดขึ้นหรือเป็นกรณี"
        },
        {
              "pos": "adjective",
              "en": "having or showing the possibility of future development or use",
              "th": "มีหรือแสดงถึงโอกาสที่จะพัฒนาหรือใช้ในอนาคต"
        }
  ],
    antonyms: ["impossible","hopeless"],
    examples:   [
        "The new employee has great potential for growth within the company.",
        "The potential for error is high if you don't follow the instructions carefully.",
        "She has the potential to become a great leader one day."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'formally',
    level: 'B1',
    partOfSpeech: ["adverb"],
    ipa_uk: '/ˈfɔːməli/',
    ipa_us: '/ˈfɔːməli/',
    meanings:   [
        {
              "pos": "adverb",
              "en": "in a formal way, following the rules or customs of a particular situation",
              "th": "ด้วยวิธีการที่เป็นทางการ โดยปฏิบัติตามกฎหรือธรรมเนียมของสถานการณ์เฉพาะ"
        }
  ],
    antonyms: ["informally","casually"],
    examples:   [
        "The company will formally announce the new policy next week.",
        "She formally introduced herself to the audience before giving her speech.",
        "The two countries formally established diplomatic relations last year."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'invest',
    level: 'B1',
    partOfSpeech: ["verb"],
    ipa_uk: '/ɪnˈvɛst/',
    ipa_us: '/ɪnˈvɛst/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to put money into something in order to make a profit or achieve a goal",
              "th": "การใส่เงินเข้าไปในบางสิ่งเพื่อสร้างผลกำไรหรือบรรลุเป้าหมาย"
        }
  ],
    antonyms: ["withdraw","divest"],
    examples:   [
        "I'm going to invest in a new business venture.",
        "The company will invest in research and development to improve its products.",
        "She invested her savings in a retirement fund."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'satisfied',
    level: 'B1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈsætɪsfaɪd/',
    ipa_us: '/ˈsætɪsfaɪd/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "feeling happy or content because your needs or wishes have been met",
              "th": "รู้สึกสบายใจหรือพอใจเพราะความต้องการหรือความปรารถนาของคุณได้รับการตอบสนอง"
        }
  ],
    antonyms: ["dissatisfied","unhappy"],
    examples:   [
        "I'm satisfied with the service I received at the hotel.",
        "She felt satisfied after finishing her first marathon.",
        "The customer was satisfied with the product and left a positive review."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'measurement',
    level: 'B1',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈmeʒ.ə.mənt/',
    ipa_us: '/ˈmeʒ.ə.mənt/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the act of measuring something, or a unit of measurement",
              "th": "การวัดบางสิ่งหรือหน่วยวัด"
        }
  ],
    antonyms: ["estimation","approximation"],
    examples:   [
        "The measurement of the room is 10 feet by 12 feet.",
        "The scientist took precise measurements of the data to ensure accuracy.",
        "The company uses a standard measurement system to ensure consistency."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'baker',
    level: 'B1',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈbeɪ.kə(ɹ)/',
    ipa_us: '/ˈbeɪ.kə(ɹ)/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a person who makes bread, cakes, and pastries",
              "th": "บุคคลที่ทำขนมปัง เค้ก และของหวาน"
        }
  ],
    antonyms: ["butcher","chef"],
    examples:   [
        "The baker worked all night to prepare the bread for the morning.",
        "She is a skilled baker and makes delicious cakes for special occasions.",
        "The bakery is run by a family of bakers who have been in the business for generations."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'emerge',
    level: 'B1',
    partOfSpeech: ["verb"],
    ipa_uk: '/iˈmɜːd͡ʒ/',
    ipa_us: '/iˈmɜːd͡ʒ/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to become visible or apparent, or to come into existence",
              "th": "ปรากฏให้เห็นหรือชัดเจน หรือเกิดขึ้น"
        }
  ],
    antonyms: ["disappear","vanish"],
    examples:   [
        "The sun will emerge from behind the clouds soon.",
        "A new trend is emerging in the fashion industry.",
        "The company will emerge from bankruptcy after restructuring its debt."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'gossip',
    level: 'B1',
    partOfSpeech: ["noun","verb"],
    ipa_uk: '/ˈɡɒs.ɪp/',
    ipa_us: '/ˈɡɒs.ɪp/',
    meanings:   [
        {
              "pos": "noun",
              "en": "talk or rumors about other people's personal lives",
              "th": "การพูดหรือข่าวลือเกี่ยวกับชีวิตส่วนตัวของคนอื่น"
        },
        {
              "pos": "verb",
              "en": "to talk or spread rumors about other people's personal lives",
              "th": "การพูดหรือเผยแพร่ข่าวลือเกี่ยวกับชีวิตส่วนตัวของคนอื่น"
        }
  ],
    antonyms: ["fact","truth"],
    examples:   [
        "The gossip about the celebrity's divorce is all over social media.",
        "She loves to gossip with her friends about the latest fashion trends.",
        "The company is trying to stop the gossip about the upcoming merger."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'bound',
    level: 'B1',
    partOfSpeech: ["verb","adjective"],
    ipa_uk: '/ˈbaʊnd/',
    ipa_us: '/ˈbaʊnd/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to jump or move with a lot of energy, or to be tied or fastened",
              "th": "การกระโดดหรือเคลื่อนที่ด้วยพลังงานมาก หรือถูกมัดหรือผูก"
        },
        {
              "pos": "adjective",
              "en": "limited or restricted in some way, or tied or fastened",
              "th": "ถูกจำกัดหรือจำกัดในบางด้าน หรือมัดหรือผูก"
        }
  ],
    antonyms: ["free","unrestricted"],
    examples:   [
        "The dog is bound to its owner by a leash.",
        "She is bound for the airport to catch her flight.",
        "The book is bound in leather and has a beautiful cover."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'more',
    level: 'B1',
    partOfSpeech: ["adverb","determiner"],
    ipa_uk: '/ˈmɔː/',
    ipa_us: '/ˈmɔː/',
    meanings:   [
        {
              "pos": "adverb",
              "en": "to a greater extent or degree, or in addition",
              "th": "ในระดับที่สูงกว่าหรือมากขึ้น หรือเพิ่มเติม"
        },
        {
              "pos": "determiner",
              "en": "a greater amount or quantity of something",
              "th": "ปริมาณที่มากขึ้นของบางสิ่ง"
        }
  ],
    antonyms: ["less","fewer"],
    examples:   [
        "I want to learn more about the history of this city.",
        "She has more experience in marketing than anyone else in the company.",
        "There are more people living in urban areas than in rural areas."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'disappointment',
    level: 'B1',
    partOfSpeech: ["noun"],
    ipa_uk: '/dɪsəˈpɔɪntmənt/',
    ipa_us: '/dɪsəˈpɔɪntmənt/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a feeling of sadness or dissatisfaction because something has not happened or has not been as good as expected",
              "th": "ความรู้สึกของความเสียใจหรือไม่พอใจเพราะบางสิ่งไม่ได้เกิดขึ้นหรือไม่ได้ดีเท่าที่คาดหวัง"
        }
  ],
    antonyms: ["satisfaction","pleasure"],
    examples:   [
        "The news of the cancellation was a great disappointment to the fans.",
        "She felt a deep disappointment when she didn't get the job she wanted.",
        "The disappointment of not winning the competition was hard to overcome."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'designer',
    level: 'B1',
    partOfSpeech: ["noun"],
    ipa_uk: '/dɪˈzaɪnɚ/',
    ipa_us: '/dɪˈzaɪnɚ/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a person who creates and plans the look and functionality of something, such as a product, building, or website",
              "th": "บุคคลที่สร้างและวางแผนรูปลักษณ์และฟังก์ชันของบางสิ่ง เช่น ผลิตภัณฑ์ อาคาร หรือเว็บไซต์"
        }
  ],
    antonyms: ["manufacturer","producer"],
    examples:   [
        "The fashion designer created a stunning collection for the runway show.",
        "The graphic designer worked on the logo and branding for the new company.",
        "The interior designer helped us choose the perfect furniture for our living room."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'glint',
    level: 'B1',
    partOfSpeech: ["noun","verb"],
    ipa_uk: '/ɡlɪnt/',
    ipa_us: '/ɡlɪnt/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a small, brief sparkle or shine, especially in someone's eye",
              "th": "ประกายหรือแสงเล็กๆ สั้นๆ โดยเฉพาะอย่างยิ่งในดวงตาของใครบางคน"
        },
        {
              "pos": "verb",
              "en": "to shine or sparkle briefly, especially with a hint of amusement or mischief",
              "th": "ส่องแสงหรือประกายสั้นๆ โดยเฉพาะอย่างยิ่งด้วยความเยาะเย้ยนหรือความเลว"
        }
  ],
    antonyms: ["dullness","dimness"],
    examples:   [
        "A glint of amusement appeared in his eye when he heard the joke.",
        "The glint of the diamond ring caught her attention.",
        "The sunlight glinted off the water, creating a beautiful effect."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'celebrity',
    level: 'B1',
    partOfSpeech: ["noun"],
    ipa_uk: '/sɪˈlɛbɹɪti/',
    ipa_us: '/sɪˈlɛbɹɪti/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a famous person, especially in the entertainment industry",
              "th": "บุคคลที่มีชื่อเสียง โดยเฉพาะอย่างยิ่งในอุตสาหกรรมบันเทิง"
        }
  ],
    antonyms: ["nobody","unknown"],
    examples:   [
        "The celebrity walked the red carpet at the movie premiere.",
        "She is a celebrity in the music industry, known for her powerful voice.",
        "The celebrity's personal life is always under scrutiny by the media."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'lead',
    level: 'B1',
    partOfSpeech: ["verb","noun"],
    ipa_uk: '/lɛd/',
    ipa_us: '/lɛd/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to show or guide someone to a place, or to be in charge of a group or organization",
              "th": "นำหรือชี้ทางให้ใครบางคนไปที่ใดๆ หรือเป็นผู้นำของกลุ่มหรือองค์กร"
        },
        {
              "pos": "noun",
              "en": "a heavy, bluish-white metal, or a position of leadership or guidance",
              "th": "โลหะหนักสีเทา-ขาว หรือตำแหน่งผู้นำหรือการชี้นำ"
        }
  ],
    antonyms: ["follow","trail"],
    examples:   [
        "The tour guide will lead us through the museum.",
        "She will lead the team in the upcoming project.",
        "The company is looking for someone to lead their marketing department."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'hearing',
    level: 'B1',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈhiːɹ.ɪŋ/',
    ipa_us: '/ˈhiːɹ.ɪŋ/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the ability to hear, or a formal meeting to discuss and decide on something",
              "th": "ความสามารถในการฟัง หรือการประชุมอย่างเป็นทางการเพื่อหารือและตัดสินใจเกี่ยวกับบางสิ่ง"
        }
  ],
    antonyms: ["deafness","silence"],
    examples:   [
        "The hearing test showed that I have perfect hearing.",
        "The committee will hold a hearing to discuss the proposed law.",
        "The judge scheduled a hearing to determine the verdict."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'urge',
    level: 'B1',
    partOfSpeech: ["verb","noun"],
    ipa_uk: '/ɜːd͡ʒ/',
    ipa_us: '/ɜːd͡ʒ/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to strongly advise or encourage someone to do something",
              "th": "แนะนำหรือสนับสนุนใครบางคนอย่างแข็งขันให้ทำบางสิ่ง"
        },
        {
              "pos": "noun",
              "en": "a strong desire or need to do something",
              "th": "ความปรารถนาหรือความจำเป็นที่เข้มแข็งในการทำบางสิ่ง"
        }
  ],
    antonyms: ["discourage","deter"],
    examples:   [
        "I urge you to take this opportunity and apply for the job.",
        "She felt an urge to travel and explore new places.",
        "The doctor will urge the patient to quit smoking for their health."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },

  {
    word: 'obsession',
    level: 'B2',
    partOfSpeech: ["noun"],
    ipa_uk: '/əbˈsɛʃən/',
    ipa_us: '/əbˈsɛʃən/',
    meanings:   [
        {
              "pos": "noun",
              "en": "an idea or thought that continually preoccupies or intrudes on a person's mind",
              "th": "ความคิดหรือความคิดที่ครอบงำหรือรบกวนจิตใจของคนอย่างต่อเนื่อง"
        }
  ],
    antonyms: ["indifference","apathy"],
    examples:   [
        "Her obsession with music led her to become a professional singer.",
        "The detective's obsession with solving the case kept him up all night.",
        "The new video game became an obsession for many teenagers during the summer break."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'store',
    level: 'B2',
    partOfSpeech: ["noun","verb"],
    ipa_uk: '/stɔː/',
    ipa_us: '/stɔː/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a building or part of a building where goods are sold, usually to the public",
              "th": "อาคารหรือส่วนหนึ่งของอาคารที่ขายสินค้า โดยทั่วไปคือการขายให้กับสาธารณชน"
        },
        {
              "pos": "verb",
              "en": "to put or keep something in a place for future use",
              "th": "การนำสิ่งใดสิ่งหนึ่งไปเก็บหรือเก็บรักษาไว้ในที่ใดที่หนึ่งเพื่อใช้ในอนาคต"
        }
  ],
    antonyms: ["withdraw","remove"],
    examples:   [
        "The new store on the corner sells a wide range of electronics.",
        "Can you store these boxes in the attic for me?",
        "The company will store your personal data securely according to the law."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'evolution',
    level: 'B2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈɛvəluːʃ(ə)n/',
    ipa_us: '/ˈɛvəluːʃ(ə)n/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the process of change and development that occurs over a long period of time",
              "th": "กระบวนการเปลี่ยนแปลงและพัฒนาที่เกิดขึ้นในช่วงระยะเวลานาน"
        }
  ],
    antonyms: ["devolution","regression"],
    examples:   [
        "The evolution of the human species is a subject of great interest in science.",
        "The company's evolution from a small startup to a global brand is impressive.",
        "The evolution of technology has transformed the way we communicate and work."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'finely',
    level: 'B2',
    partOfSpeech: ["adverb"],
    ipa_uk: '/ˈfaɪnli/',
    ipa_us: '/ˈfaɪnli/',
    meanings:   [
        {
              "pos": "adverb",
              "en": "in a very careful and detailed way",
              "th": "ด้วยความระมัดระวังและละเอียดมาก"
        }
  ],
    antonyms: ["coarsely","roughly"],
    examples:   [
        "The chef chopped the vegetables finely to ensure they cooked evenly.",
        "The engineer worked finely to repair the delicate machinery.",
        "The artist painted the landscape finely, capturing every detail of the scene."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'deputy',
    level: 'B2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈdɛpjəti/',
    ipa_us: '/ˈdɛpjəti/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a person who is given the power to act for someone else, especially in a position of authority",
              "th": "บุคคลที่ได้รับมอบอำนาจในการดำเนินการแทนคนอื่น โดยเฉพาะในตำแหน่งที่มีอำนาจ"
        }
  ],
    antonyms: ["principal","chief"],
    examples:   [
        "The deputy manager will take charge in the absence of the manager.",
        "The deputy mayor will represent the city at the international conference.",
        "The deputy director is responsible for overseeing the daily operations of the department."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'monastery',
    level: 'B2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈmɒnəstɹi/',
    ipa_us: '/ˈmɒnəstɹi/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a building or group of buildings where monks or nuns live and work",
              "th": "อาคารหรือกลุ่มของอาคารที่พระภิกษุหรือภิกษุณีอาศัยและทำงาน"
        }
  ],
    antonyms: ["secular","lay"],
    examples:   [
        "The old monastery on the hill has been converted into a hotel.",
        "The monastery is famous for its beautiful gardens and peaceful atmosphere.",
        "The young monk decided to leave the monastery to explore the world outside."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'consultant',
    level: 'B2',
    partOfSpeech: ["noun"],
    ipa_uk: '/kənˈsʌltənt/',
    ipa_us: '/kənˈsʌltənt/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a person who gives expert advice to others, especially in a particular area of work",
              "th": "บุคคลที่ให้คำแนะนำจากผู้เชี่ยวชาญแก่ผู้อื่น โดยเฉพาะในด้านการทำงานที่เฉพาะเจาะจง"
        }
  ],
    antonyms: ["novice","amateur"],
    examples:   [
        "The company hired a consultant to help them improve their marketing strategy.",
        "As a consultant, she travels frequently to meet with clients and provide advice.",
        "The consultant's report highlighted several areas where the business could be improved."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'elective',
    level: 'B2',
    partOfSpeech: ["noun","adjective"],
    ipa_uk: '/ɪˈlɛktɪv/',
    ipa_us: '/ɪˈlɛktɪv/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a subject or course that students can choose to study, rather than one that is compulsory",
              "th": "วิชาหรือหลักสูตรที่นักเรียนสามารถเลือกเรียน โดยไม่จำเป็นต้องเรียนตามที่กำหนด"
        },
        {
              "pos": "adjective",
              "en": "chosen or decided by vote, rather than being compulsory",
              "th": "ได้รับการเลือกหรือตัดสินโดยการลงคะแนนเสียง มากกว่าที่จะเป็นไปตามข้อบังคับ"
        }
  ],
    antonyms: ["compulsory","required"],
    examples:   [
        "The university offers a wide range of elective courses for students to choose from.",
        "The elective surgery was scheduled for the following week.",
        "The student decided to take an elective course in photography to explore her creative side."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'dormitory',
    level: 'B2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈdɔɹmɪˌtɔɹi/',
    ipa_us: '/ˈdɔɹmɪˌtɔɹi/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a room or building where people, especially students, sleep or live",
              "th": "ห้องหรืออาคารที่คน โดยเฉพาะนักเรียน นอนหรืออาศัยอยู่"
        }
  ],
    antonyms: ["private room","single accommodation"],
    examples:   [
        "The dormitory was crowded and noisy, but the students enjoyed the social atmosphere.",
        "The university provides dormitory accommodation for all first-year students.",
        "The old dormitory building has been renovated and is now used as a hotel."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'mortar',
    level: 'B2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈmɔːtə(ɹ)/',
    ipa_us: '/ˈmɔːtə(ɹ)/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a mixture of cement, sand, and water, used for building or repairing structures",
              "th": "ส่วนผสมของซีเมนต์ ทราย และน้ำ ใช้ในการก่อสร้างหรือซ่อมแซมโครงสร้าง"
        }
  ],
    antonyms: ["demolition","destruction"],
    examples:   [
        "The bricklayer mixed the mortar carefully to ensure it was the right consistency.",
        "The ancient mortar used in the construction of the temple has withstood the test of time.",
        "The mortar between the bricks was crumbling and needed to be replaced."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'original',
    level: 'B2',
    partOfSpeech: ["adjective","noun"],
    ipa_uk: '/əˈɹɪdʒnəl/',
    ipa_us: '/əˈɹɪdʒnəl/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "created or made first, and not a copy",
              "th": "สร้างหรือทำขึ้นเป็นครั้งแรก และไม่ใช่สำเนา"
        },
        {
              "pos": "noun",
              "en": "the first or earliest form of something",
              "th": "รูปแบบแรกหรือรูปแบบที่เก่าแก่ที่สุดของสิ่งใดสิ่งหนึ่ง"
        }
  ],
    antonyms: ["copy","replica"],
    examples:   [
        "The original painting was sold at auction for a record price.",
        "The original idea for the story was developed over several years.",
        "The company is looking for someone to create an original design for their new product."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'scar',
    level: 'B2',
    partOfSpeech: ["noun","verb"],
    ipa_uk: '/skɑː(ɹ)/',
    ipa_us: '/skɑː(ɹ)/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a mark left on the skin or on a surface after a wound has healed",
              "th": "รอยที่เหลืออยู่บนผิวหนังหรือบนพื้นผิวหลังจากที่บาดแผลได้รับการรักษา"
        },
        {
              "pos": "verb",
              "en": "to leave a scar on someone or something",
              "th": "ทำให้เกิดรอยแผลบนใครบางคนหรือสิ่งใดสิ่งหนึ่ง"
        }
  ],
    antonyms: ["heal","cure"],
    examples:   [
        "The scar above her eyebrow was from a childhood accident.",
        "The fire scarred the walls of the building.",
        "The experience left a scar on his psyche that would take years to heal."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'adaptable',
    level: 'B2',
    partOfSpeech: ["adjective"],
    ipa_uk: '/əˈdæptəbəl/',
    ipa_us: '/əˈdæptəbəl/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "able to adjust to new or changing requirements or circumstances",
              "th": "สามารถปรับตัวให้เข้ากับข้อกำหนดหรือสถานการณ์ใหม่หรือที่เปลี่ยนแปลง"
        }
  ],
    antonyms: ["inflexible","rigid"],
    examples:   [
        "The adaptable nature of the company allowed it to survive the economic downturn.",
        "She's an adaptable person who can thrive in any environment.",
        "The new software is highly adaptable and can be customized to meet the needs of different users."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'pee',
    level: 'B2',
    partOfSpeech: ["verb"],
    ipa_uk: '/piː/',
    ipa_us: '/piː/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to urinate, especially for a short time",
              "th": "การปัสสาวะ โดยเฉพาะอย่างยิ่งในช่วงเวลาสั้นๆ"
        }
  ],
    antonyms: ["hold","retain"],
    examples:   [
        "I need to pee, can we stop at a restroom?",
        "The child couldn't hold it and had to pee in the car.",
        "After drinking too much coffee, he had to pee every hour."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'procedure',
    level: 'B2',
    partOfSpeech: ["noun"],
    ipa_uk: '/pɹəˈsiːdʒə/',
    ipa_us: '/pɹəˈsiːdʒə/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a series of actions or operations which are done in a particular order, especially as part of a formal or official process",
              "th": "ชุดของการกระทำหรือการดำเนินการที่ทำในลำดับที่เฉพาะเจาะจง โดยเฉพาะอย่างยิ่งในฐานะส่วนหนึ่งของกระบวนการอย่างเป็นทางการ"
        }
  ],
    antonyms: ["improvisation","spontaneity"],
    examples:   [
        "The doctor explained the procedure for the surgery and the recovery process.",
        "The company has a strict procedure for handling customer complaints.",
        "The new employee had to follow a lengthy procedure to get her ID badge and access to the building."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'version',
    level: 'B2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈvɜːʃən/',
    ipa_us: '/ˈvɜːʃən/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a particular form or variation of something, especially a written or recorded work",
              "th": "รูปแบบหรือรูปแบบที่เฉพาะเจาะจงของสิ่งใดสิ่งหนึ่ง โดยเฉพาะอย่างยิ่งงานเขียนหรืองานบันทึก"
        }
  ],
    antonyms: ["original","prototype"],
    examples:   [
        "The new version of the software includes several improvements and bug fixes.",
        "The band released a live version of their hit song as a single.",
        "The movie is an adaptation of the novel, but it's not the only version of the story."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'leap',
    level: 'B2',
    partOfSpeech: ["noun","verb"],
    ipa_uk: '/liːp/',
    ipa_us: '/liːp/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a sudden jump or movement, especially into the air",
              "th": "การกระโดดหรือการเคลื่อนไหวที่ฉับพลัน โดยเฉพาะอย่างยิ่งไปขึ้นในอากาศ"
        },
        {
              "pos": "verb",
              "en": "to jump or spring suddenly, especially into the air",
              "th": "การกระโดดหรือกระดกขึ้นอย่างฉับพลัน โดยเฉพาะอย่างยิ่งไปขึ้นในอากาศ"
        }
  ],
    antonyms: ["plod","trudge"],
    examples:   [
        "The athlete took a leap over the hurdle and won the race.",
        "The child took a leap of faith and jumped into the pool.",
        "The company is ready to leap into the global market with its new product."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'torch',
    level: 'B2',
    partOfSpeech: ["noun"],
    ipa_uk: '/tɔːtʃ/',
    ipa_us: '/tɔːtʃ/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a stick or device with a flame or light at the top, used for giving light",
              "th": "ไม้หรืออุปกรณ์ที่มีไฟหรือแสงสว่างที่ด้านบน ใช้สำหรับให้แสงสว่าง"
        }
  ],
    antonyms: ["darkness","shadow"],
    examples:   [
        "The hikers used a torch to light their way through the dark forest.",
        "The Olympic torch was carried by runners from all over the world.",
        "The torch on her phone helped her find her way back to the campsite."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },

  {
    word: 'climax',
    level: 'C1',
    partOfSpeech: ["noun","verb"],
    ipa_uk: '/ˈklaɪmæks/',
    ipa_us: '/ˈklaɪmæks/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the most exciting or important part of a story or situation",
              "th": "ส่วนที่น่าตื่นเต้นที่สุดหรือสำคัญที่สุดของเรื่องหรือสถานการณ์"
        },
        {
              "pos": "verb",
              "en": "to reach the most exciting or important part of a story or situation",
              "th": "ถึงจุดสูงสุดหรือสำคัญที่สุดของเรื่องหรือสถานการณ์"
        }
  ],
    antonyms: ["anticlimax","letdown"],
    examples:   [
        "The climax of the movie was both surprising and satisfying.",
        "The story built up to a thrilling climax.",
        "The concert reached its climax with a rousing finale."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'drawback',
    level: 'C1',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈdɹɔːˌbæk/',
    ipa_us: '/ˈdɹɔːˌbæk/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a disadvantage or problem",
              "th": "ข้อเสียหรือปัญหา"
        }
  ],
    antonyms: ["advantage","benefit"],
    examples:   [
        "One major drawback of the new policy is its high cost.",
        "The drawback of living in a big city is the high cost of living.",
        "The only drawback of the plan is that it will take a long time to implement."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'swap',
    level: 'C1',
    partOfSpeech: ["verb","noun"],
    ipa_uk: '/swɒp/',
    ipa_us: '/swɒp/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to exchange something for something else",
              "th": "แลกเปลี่ยนสิ่งหนึ่งด้วยสิ่งอื่น"
        },
        {
              "pos": "noun",
              "en": "an exchange of something for something else",
              "th": "การแลกเปลี่ยนสิ่งหนึ่งด้วยสิ่งอื่น"
        }
  ],
    antonyms: ["keep","retain"],
    examples:   [
        "I'd like to swap this shirt for a larger size.",
        "The two friends decided to swap phones for a day.",
        "The company will swap your old device for a new one."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'stately',
    level: 'C1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈsteɪtli/',
    ipa_us: '/ˈsteɪtli/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "grand and impressive in a dignified way",
              "th": "ยิ่งใหญ่และน่าประทับใจด้วยความมีเกียรติ"
        }
  ],
    antonyms: ["humble","modest"],
    examples:   [
        "The stately mansion was a popular tourist destination.",
        "The stately trees lined the driveway to the estate.",
        "The stately pace of the procession was impressive."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'tranquil',
    level: 'C1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈtɹæŋ.kwɪl/',
    ipa_us: '/ˈtɹæŋ.kwɪl/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "quiet and peaceful",
              "th": "เงียบและสงบ"
        }
  ],
    antonyms: ["turbulent","chaotic"],
    examples:   [
        "The tranquil atmosphere of the forest was a welcome change.",
        "The tranquil lake reflected the beauty of the surrounding mountains.",
        "The tranquil music helped her to relax."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'forfeit',
    level: 'C1',
    partOfSpeech: ["verb","noun"],
    ipa_uk: '/ˈfɔː.fɪt/',
    ipa_us: '/ˈfɔː.fɪt/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to give up or lose something, especially as a penalty",
              "th": "สละหรือเสียสิ่งใดสิ่งหนึ่ง โดยเฉพาะอย่างยิ่ง作为การลงโทษ"
        },
        {
              "pos": "noun",
              "en": "something that is given up or lost, especially as a penalty",
              "th": "สิ่งที่สละหรือเสีย โดยเฉพาะอย่างยิ่ง作为การลงโทษ"
        }
  ],
    antonyms: ["gain","win"],
    examples:   [
        "If you don't pay the fine, you'll forfeit your right to appeal.",
        "The team will forfeit the game if they don't show up on time.",
        "The forfeit of the match was a disappointment to the fans."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'bubbly',
    level: 'C1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈbʌbli/',
    ipa_us: '/ˈbʌbli/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "full of energy and enthusiasm",
              "th": "เต็มไปด้วยพลังงานและความกระตือรือร้น"
        }
  ],
    antonyms: ["flat","lifeless"],
    examples:   [
        "The bubbly personality of the teacher made the lesson enjoyable.",
        "The bubbly drink was refreshing on a hot day.",
        "The bubbly atmosphere of the party was infectious."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'conscientious',
    level: 'C1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˌkɒnʃiˈɛnʃəs/',
    ipa_us: '/ˌkɒnʃiˈɛnʃəs/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "careful and thorough in your work or duties",
              "th": "รอบคอบและละเอียดในงานหรือหน้าที่"
        }
  ],
    antonyms: ["careless","negligent"],
    examples:   [
        "She is a conscientious worker who always meets her deadlines.",
        "The conscientious student double-checked her answers before submitting the exam.",
        "The company values conscientious employees who take pride in their work."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'gruelling',
    level: 'C1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈɡɹʊə.lɪŋ/',
    ipa_us: '/ˈɡɹʊə.lɪŋ/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "extremely tiring or demanding",
              "th": "เหนื่อยล้าหรือต้องการมาก"
        }
  ],
    antonyms: ["easy","relaxing"],
    examples:   [
        "The gruelling training schedule left her exhausted.",
        "The gruelling hike was a challenge even for experienced climbers.",
        "The gruelling work schedule took a toll on his health."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'complexity',
    level: 'C1',
    partOfSpeech: ["noun"],
    ipa_uk: '/kəmˈplɛk.sɪ.ti/',
    ipa_us: '/kəmˈplɛk.sɪ.ti/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the state of being complex or complicated",
              "th": "สภาพที่ซับซ้อนหรือยุ่งยาก"
        }
  ],
    antonyms: ["simplicity","straightforwardness"],
    examples:   [
        "The complexity of the issue made it difficult to understand.",
        "The complexity of the problem required a team of experts to solve.",
        "The complexity of the system made it prone to errors."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'fanciful',
    level: 'C1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈfænsɪfəl/',
    ipa_us: '/ˈfænsɪfəl/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "having a lot of imagination or fantasy",
              "th": "มีจินตนาการหรือความฝันฟุ้งซ่าน"
        }
  ],
    antonyms: ["practical","down-to-earth"],
    examples:   [
        "The fanciful designs of the fashion show were impressive.",
        "The fanciful story was full of magical creatures and far-off lands.",
        "The fanciful idea of flying cars may one day become a reality."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'mountaineer',
    level: 'C1',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˌmaʊn.tɪnˈɪə̯(ɹ)/',
    ipa_us: '/ˌmaʊn.tɪnˈɪə̯(ɹ)/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a person who climbs mountains, especially as a sport or hobby",
              "th": "บุคคลที่ปีนเขา โดยเฉพาะอย่างยิ่งเป็นกีฬาหรืองานอดิเรก"
        }
  ],
    antonyms: ["lowlander","city-dweller"],
    examples:   [
        "The mountaineer reached the summit after hours of climbing.",
        "The experienced mountaineer led the group through the treacherous terrain.",
        "The mountaineer's love for nature and adventure drove her to explore new peaks."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },

  {
    word: 'distillation',
    level: 'C2',
    partOfSpeech: ["noun"],
    ipa_uk: '/dɪstɪˈleɪʃən/',
    ipa_us: '/dɪstɪˈleɪʃən/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the process of purifying a liquid by heating it and then cooling the vapor to condense it back into a liquid",
              "th": "กระบวนการทำให้ของเหลวบริสุทธิ์โดยการทำให้ร้อนแล้วทำให้ไอน้ำเย็นจัดเพื่อควบแน่นกลายเป็นของเหลวอีกครั้ง"
        }
  ],
    antonyms: ["contamination","pollution"],
    examples:   [
        "The distillation process is used to produce high-quality whiskey.",
        "Distillation is a crucial step in the production of perfumes.",
        "The company specializes in the distillation of essential oils."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'strait',
    level: 'C2',
    partOfSpeech: ["noun"],
    ipa_uk: '/stɹeɪt/',
    ipa_us: '/stɹeɪt/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a narrow passage of water connecting two large bodies of water",
              "th": "ช่องแคบหรือช่องทางแคบของน้ำที่เชื่อมต่อระหว่างสองแหล่งน้ำขนาดใหญ่"
        }
  ],
    antonyms: ["ocean","lake"],
    examples:   [
        "The strait is a busy shipping lane.",
        "The city is located on the strait, making it a strategic port.",
        "The strait is known for its strong currents and treacherous waters."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'gambit',
    level: 'C2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈɡæmbɪt/',
    ipa_us: '/ˈɡæmbɪt/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a clever or cunning move, especially one that involves some risk",
              "th": "การเคลื่อนไหวที่ฉลาดหรือมีเล่ห์เหลี่ยม โดยเฉพาะอย่างยิ่งการเคลื่อนไหวที่มีความเสี่ยง"
        }
  ],
    antonyms: ["caution","prudence"],
    examples:   [
        "The company's gambit to enter the new market paid off.",
        "The politician's gambit to win over the opposition backfired.",
        "The chess player made a clever gambit to gain an advantage."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'accrue',
    level: 'C2',
    partOfSpeech: ["verb"],
    ipa_uk: '/əˈkɹuː/',
    ipa_us: '/əˈkɹuː/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to increase or grow, especially in amount or degree",
              "th": "เพิ่มขึ้นหรือเติบโต โดยเฉพาะอย่างยิ่งในปริมาณหรือระดับ"
        }
  ],
    antonyms: ["decrease","diminish"],
    examples:   [
        "The interest will accrue over time, making the investment more valuable.",
        "The company's profits will accrue from the new business deal.",
        "The benefits of exercise will accrue over time, improving overall health."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'constrained',
    level: 'C2',
    partOfSpeech: ["adjective"],
    ipa_uk: '/kənˈstɹeɪnd/',
    ipa_us: '/kənˈstɹeɪnd/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "restricted or limited in some way",
              "th": "ถูกจำกัดหรือมีข้อจำกัดในบางด้าน"
        }
  ],
    antonyms: ["unrestricted","unlimited"],
    examples:   [
        "The constrained budget meant that we had to make some tough decisions.",
        "The constrained space made it difficult to move around.",
        "The constrained timeline meant that we had to work quickly."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'plane',
    level: 'C2',
    partOfSpeech: ["noun"],
    ipa_uk: '/pleɪn/',
    ipa_us: '/pleɪn/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a type of aircraft that has fixed wings and is powered by engines",
              "th": "เครื่องบินประเภทหนึ่งที่มีปีกตายและขับเคลื่อนด้วยเครื่องยนต์"
        }
  ],
    antonyms: ["train","ship"],
    examples:   [
        "The plane took off from the runway and soared into the sky.",
        "I'm afraid of flying on a plane, but I know it's safe.",
        "The plane was delayed due to bad weather."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'emulation',
    level: 'C2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ɛmjʊˈleɪʃən/',
    ipa_us: '/ɛmjʊˈleɪʃən/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the act of trying to equal or surpass someone or something by imitating them",
              "th": "การพยายามที่จะเทียบเท่าหรือเหนือกว่าใครบางคนหรือบางสิ่งโดยการลอกเลียนแบบ"
        }
  ],
    antonyms: ["ignorance","disregard"],
    examples:   [
        "The company's emulation of the successful business model led to their own success.",
        "The artist's emulation of the master's style was impressive.",
        "The emulation of the rival's strategy helped the team to win the game."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'utilitarian',
    level: 'C2',
    partOfSpeech: ["adjective"],
    ipa_uk: '/juːˌtɪlɪˈtɛːɹi.ən/',
    ipa_us: '/juːˌtɪlɪˈtɛːɹi.ən/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "relating to the idea that the best action is the one that produces the most happiness or well-being for the greatest number of people",
              "th": "เกี่ยวข้องกับความคิดที่ว่าการกระทำที่ดีที่สุดคือสิ่งที่ทำให้เกิดความสุขหรือความเป็นอยู่ที่ดีสำหรับจำนวนคนมากที่สุด"
        }
  ],
    antonyms: ["altruistic","selfish"],
    examples:   [
        "The utilitarian approach to ethics prioritizes the greater good.",
        "The utilitarian philosophy emphasizes the importance of happiness and well-being.",
        "The company's utilitarian policy aims to maximize profits for the shareholders."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'trifle',
    level: 'C2',
    partOfSpeech: ["noun","verb"],
    ipa_uk: '/ˈtɹaɪfəl/',
    ipa_us: '/ˈtɹaɪfəl/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a small amount of something, especially food",
              "th": "ปริมาณเล็กน้อยของสิ่งใดสิ่งหนึ่ง โดยเฉพาะอาหาร"
        },
        {
              "pos": "verb",
              "en": "to treat something as if it is not important or to waste time on something unimportant",
              "th": "การรักษาสิ่งใดสิ่งหนึ่งด้วยความไม่สำคัญหรือการเสียเวลากับสิ่งที่ไม่สำคัญ"
        }
  ],
    antonyms: ["substantial","significant"],
    examples:   [
        "The trifle of dessert was just enough to satisfy my sweet tooth.",
        "Don't trifle with the situation, it's more serious than you think.",
        "The company doesn't trifle with its finances, every penny counts."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'hull',
    level: 'C2',
    partOfSpeech: ["noun"],
    ipa_uk: '/hʌl/',
    ipa_us: '/hʌl/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the main body of a ship or boat, excluding the mast, sails, and other equipment",
              "th": "ส่วนหลักของเรือหรือเรือ โดยไม่รวมคานใบเรือและอุปกรณ์อื่นๆ"
        }
  ],
    antonyms: ["keel","stern"],
    examples:   [
        "The hull of the ship was damaged in the storm.",
        "The hull of the boat was made of fiberglass.",
        "The hull of the submarine was designed to withstand extreme pressure."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'ingenuous',
    level: 'C2',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ɪnˈdʒɛn.ju.əs/',
    ipa_us: '/ɪnˈdʒɛn.ju.əs/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "sincere and honest, without any intention to deceive",
              "th": "ซื่อสัตย์และจริงใจ โดยไม่มีเจตนาหลอกลวง"
        }
  ],
    antonyms: ["deceptive","dishonest"],
    examples:   [
        "The ingenuous smile of the child melted my heart.",
        "The ingenuous approach to the problem was refreshing.",
        "The ingenuous nature of the artist's work was inspiring."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'pedestrian',
    level: 'C2',
    partOfSpeech: ["adjective","noun"],
    ipa_uk: '/pəˈdɛst.ɹi.ən/',
    ipa_us: '/pəˈdɛst.ɹi.ən/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "lacking interest or excitement, dull",
              "th": "ไม่มีความสนใจหรือความตื่นเต้น น่าเบื่อ"
        },
        {
              "pos": "noun",
              "en": "a person who is walking, especially in a city or town",
              "th": "บุคคลที่กำลังเดิน โดยเฉพาะอย่างยิ่งในเมืองหรือเมือง"
        }
  ],
    antonyms: ["exciting","interesting"],
    examples:   [
        "The pedestrian pace of the movie put me to sleep.",
        "The pedestrian crossing was busy with people rushing to work.",
        "The pedestrian path was lined with beautiful trees and flowers."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },

  {
    word: 'nor',
    level: 'B1',
    partOfSpeech: ["conjunction"],
    ipa_uk: '/nɔː/',
    ipa_us: '/nɔː/',
    meanings:   [
        {
              "pos": "conjunction",
              "en": "used to indicate the negation of two or more things",
              "th": "ใช้เพื่อแสดงการปฏิเสธของสิ่งหนึ่งหรือหลายสิ่ง"
        }
  ],
    antonyms: ["and","or"],
    examples:   [
        "I don't like tea, nor do I like coffee.",
        "She doesn't speak French, nor does she speak Spanish.",
        "He won't go to the party, nor will his friends."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'lawful',
    level: 'B1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈlɔːfʊl/',
    ipa_us: '/ˈlɔːfʊl/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "allowed by law",
              "th": "ได้รับอนุญาตตามกฎหมาย"
        }
  ],
    antonyms: ["unlawful","illegal"],
    examples:   [
        "The company is operating a lawful business.",
        "The police are trying to stop unlawful activities in the area.",
        "It's lawful to park your car on the street, but you have to pay for it."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'lessen',
    level: 'B1',
    partOfSpeech: ["verb [T]"],
    ipa_uk: '/ˈlɛsən/',
    ipa_us: '/ˈlɛsən/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to make something less in amount, degree, or intensity",
              "th": "ทำให้บางสิ่งลดลงในจำนวน ระดับ หรือความเข้มข้น"
        }
  ],
    antonyms: ["increase","intensify"],
    examples:   [
        "The new policy aims to lessen the burden on taxpayers.",
        "Exercise can help lessen the symptoms of depression.",
        "The teacher tried to lessen the workload for her students."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'giant',
    level: 'B1',
    partOfSpeech: ["noun [C]","adjective"],
    ipa_uk: '/ˈdʒaɪ.ənt/',
    ipa_us: '/ˈdʒaɪ.ənt/',
    meanings:   [
        {
              "pos": "noun",
              "en": "an extremely large or powerful person, thing, or organization",
              "th": "คน สิ่ง หรือองค์กรที่มีขนาดหรืออำนาจมากเป็นพิเศษ"
        },
        {
              "pos": "adjective",
              "en": "extremely large or powerful",
              "th": "มีขนาดหรืออำนาจมากเป็นพิเศษ"
        }
  ],
    antonyms: ["small","tiny"],
    examples:   [
        "The company is a giant in the tech industry.",
        "The giant statue in the park is a popular tourist attraction.",
        "The giant waves crashed against the shore, causing damage to the houses."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'trouble',
    level: 'B1',
    partOfSpeech: ["noun [U]","verb [I or T]"],
    ipa_uk: '/ˈtɹʌb(ə)l/',
    ipa_us: '/ˈtɹʌb(ə)l/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a problem or difficulty",
              "th": "ปัญหาหรือความยากลำบาก"
        },
        {
              "pos": "verb",
              "en": "to cause someone anxiety or worry",
              "th": "ทำให้บางคนเกิดความกังวลหรือความวิตก"
        }
  ],
    antonyms: ["ease","comfort"],
    examples:   [
        "I'm having trouble with my computer, it won't turn on.",
        "She's been in trouble with the law before.",
        "The company is in financial trouble and may have to close down."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'stumble',
    level: 'B1',
    partOfSpeech: ["verb [I or T]"],
    ipa_uk: '/ˈstʌmbəl/',
    ipa_us: '/ˈstʌmbəl/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to trip or fall over something",
              "th": "ส绊หรือล้มเพราะบางสิ่ง"
        },
        {
              "pos": "verb",
              "en": "to find or discover something by chance",
              "th": "พบหรือค้นพบบางสิ่งโดยบังเอิญ"
        }
  ],
    antonyms: ["find","discover"],
    examples:   [
        "She stumbled over the rock and fell to the ground.",
        "I stumbled upon a great restaurant in the city.",
        "He stumbled over his words and couldn't finish the sentence."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'completely',
    level: 'B1',
    partOfSpeech: ["adverb"],
    ipa_uk: '/kəmˈpliːtli/',
    ipa_us: '/kəmˈpliːtli/',
    meanings:   [
        {
              "pos": "adverb",
              "en": "totally or entirely",
              "th": "โดยสมบูรณ์หรือทั้งหมด"
        }
  ],
    antonyms: ["partially","incompletely"],
    examples:   [
        "I'm completely exhausted after working all day.",
        "The city was completely destroyed in the war.",
        "She's completely fluent in three languages."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'last',
    level: 'B1',
    partOfSpeech: ["adjective","adverb","verb [I or T]"],
    ipa_uk: '/last/',
    ipa_us: '/last/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "most recent or happening at the end of a period of time",
              "th": "ที่เกิดขึ้นใหม่หรือเกิดขึ้นที่สุดของช่วงเวลา"
        },
        {
              "pos": "adverb",
              "en": "until the end of a period of time",
              "th": "จนกระทั่งสิ้นสุดของช่วงเวลา"
        },
        {
              "pos": "verb",
              "en": "to continue to exist or be effective for a certain period of time",
              "th": "ยังคงอยู่หรือมีผลกระทบเป็นเวลานาน"
        }
  ],
    antonyms: ["first","initial"],
    examples:   [
        "This is the last chance to buy tickets for the concert.",
        "The last thing I want to do is go to the gym.",
        "The last time I saw her was at the party."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'jewel',
    level: 'B1',
    partOfSpeech: ["noun [C]"],
    ipa_uk: '/dʒul/',
    ipa_us: '/dʒul/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a precious stone, especially one used in jewelry",
              "th": "หินอ่อนที่มีค่า โดยเฉพาะที่ใช้ในเครื่องประดับ"
        },
        {
              "pos": "noun",
              "en": "something or someone that is very valuable or special",
              "th": "บางสิ่งหรือบางคนซึ่งมีค่าหรือพิเศษมาก"
        }
  ],
    antonyms: ["worthless","valueless"],
    examples:   [
        "The queen's crown is adorned with precious jewels.",
        "She's a jewel of a person, always helping others.",
        "The city is a jewel of the country, known for its beauty."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'approve',
    level: 'B1',
    partOfSpeech: ["verb [T]"],
    ipa_uk: '/əˈpɹuːv/',
    ipa_us: '/əˈpɹuːv/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to agree with or accept something as good or satisfactory",
              "th": "เห็นด้วยหรือยอมรับบางสิ่งว่าดีหรือเหมาะสม"
        }
  ],
    antonyms: ["disapprove","reject"],
    examples:   [
        "The board of directors approved the new business plan.",
        "She approved of his decision to quit his job.",
        "The government approved the use of the new vaccine."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'iron',
    level: 'B1',
    partOfSpeech: ["noun [U]","verb [T]"],
    ipa_uk: '/ˈaɪən/',
    ipa_us: '/ˈaɪən/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a chemical element, used to make steel and other alloys",
              "th": "ธาตุเคมี ใช้ในการผลิตเหล็กกล้าและโลหะผสมอื่น ๆ"
        },
        {
              "pos": "verb",
              "en": "to make something smooth and flat using a hot iron",
              "th": "ทำให้บางสิ่งเรียบและแบนโดยใช้เหล็กร้อน"
        }
  ],
    antonyms: ["wrinkle","crease"],
    examples:   [
        "Iron is an essential mineral for the human body.",
        "She irons her clothes every morning.",
        "The iron gate at the entrance of the house is very old."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'aid',
    level: 'B1',
    partOfSpeech: ["noun [U]","verb [T]"],
    ipa_uk: '/eɪd/',
    ipa_us: '/eɪd/',
    meanings:   [
        {
              "pos": "noun",
              "en": "help or assistance, especially financial help",
              "th": "ความช่วยเหลือหรือการสนับสนุน โดยเฉพาะความช่วยเหลือด้านการเงิน"
        },
        {
              "pos": "verb",
              "en": "to help or assist someone or something",
              "th": "ช่วยเหลือหรือสนับสนุนบางคนหรือบางสิ่ง"
        }
  ],
    antonyms: ["hinder","obstruct"],
    examples:   [
        "The charity provides aid to people in need.",
        "The government will aid the affected areas with financial support.",
        "The new technology will aid in the development of renewable energy."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'equal',
    level: 'B1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈiːkwəl/',
    ipa_us: '/ˈiːkwəl/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "having the same amount, size, or value as something else",
              "th": "มีจำนวน ขนาด หรือค่าเท่ากับบางสิ่งอื่น"
        }
  ],
    antonyms: ["unequal","uneven"],
    examples:   [
        "The two teams are equal in strength and skill.",
        "Men and women should have equal rights and opportunities.",
        "The company aims to provide equal pay for equal work."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'compose',
    level: 'B1',
    partOfSpeech: ["verb [T]"],
    ipa_uk: '/kəmˈpəʊz/',
    ipa_us: '/kəmˈpəʊz/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to create music, literature, or art",
              "th": "สร้างสรรค์เพลง วรรณกรรม หรือศิลปะ"
        },
        {
              "pos": "verb",
              "en": "to make something by combining different parts or elements",
              "th": "สร้างบางสิ่งโดยการรวมส่วนต่าง ๆ หรือองค์ประกอบ"
        }
  ],
    antonyms: ["decompose","dismantle"],
    examples:   [
        "The famous composer will compose a new symphony.",
        "She composed a beautiful poem for her mother's birthday.",
        "The team will compose a report on the project's progress."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'valuable',
    level: 'B1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈvæljuəbl̩/',
    ipa_us: '/ˈvæljuəbl̩/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "worth a lot of money or having a high value",
              "th": "มีมูลค่ามากหรือมีค่าในระดับสูง"
        }
  ],
    antonyms: ["worthless","valueless"],
    examples:   [
        "The painting is a valuable piece of art.",
        "Her experience and skills are valuable assets to the company.",
        "The data collected is valuable for future research."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'progress',
    level: 'B1',
    partOfSpeech: ["noun [U]"],
    ipa_uk: '/ˈpɹɒɡɹɛs/',
    ipa_us: '/ˈpɹɒɡɹɛs/',
    meanings:   [
        {
              "pos": "noun",
              "en": "movement towards a place or situation, or the process of improving or developing something",
              "th": "การเคลื่อนที่ไปสู่ที่หรือสถานการณ์ หรือกระบวนการปรับปรุงหรือพัฒนาบางสิ่ง"
        }
  ],
    antonyms: ["regress","deterioration"],
    examples:   [
        "The company has made significant progress in the past year.",
        "The progress of the project is being monitored closely.",
        "She's making good progress in her recovery from the illness."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'round',
    level: 'B1',
    partOfSpeech: ["adjective","adverb","preposition"],
    ipa_uk: '/ˈɹaʊnd/',
    ipa_us: '/ˈɹaʊnd/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "shaped like a circle or a sphere",
              "th": "มีรูปทรงเป็นวงกลมหรือทรงกลม"
        },
        {
              "pos": "adverb",
              "en": "in a circular motion or shape",
              "th": "ในลักษณะการเคลื่อนที่เป็นวงกลมหรือรูปทรง"
        },
        {
              "pos": "preposition",
              "en": "on all sides of something, or in every direction from something",
              "th": "ที่ด้านทุกด้านของบางสิ่ง หรือในทิศทางทุกทิศทางจากบางสิ่ง"
        }
  ],
    antonyms: ["square","angular"],
    examples:   [
        "The round table in the meeting room is very large.",
        "The ball rolled round the corner of the room.",
        "The house is situated round the hill."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'phoenix',
    level: 'B1',
    partOfSpeech: ["noun [C]"],
    ipa_uk: '/ˈfiːnɪks/',
    ipa_us: '/ˈfiːnɪks/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a mythical bird that is born from its own ashes and lives for 500 years before it dies and is reborn again",
              "th": "นกตัวมีพญาในตำนานที่เกิดจากเถ้าถ่านของตัวเองและอาศัยอยู่เป็นเวลา 500 ปีก่อนที่จะตายและเกิดใหม่อีกครั้ง"
        }
  ],
    antonyms: ["mortal","human"],
    examples:   [
        "The phoenix is a symbol of rebirth and renewal.",
        "The company has risen from the ashes like a phoenix.",
        "The phoenix is a mythical creature that has captivated people's imagination for centuries."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'oppression',
    level: 'B1',
    partOfSpeech: ["noun [U]"],
    ipa_uk: '/əˈpɹɛʃən/',
    ipa_us: '/əˈpɹɛʃən/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the state of being oppressed, or the act of oppressing someone or something",
              "th": "สถานะของการถูกกดขี่ หรือการกดขี่บางคนหรือบางสิ่ง"
        }
  ],
    antonyms: ["liberation","freedom"],
    examples:   [
        "The people suffered under the oppression of the dictator.",
        "The oppression of women is a major issue in many countries.",
        "The company's policies are an example of economic oppression."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'motherland',
    level: 'B1',
    partOfSpeech: ["noun [C]"],
    ipa_uk: '/ˈmʌðɚˌlænd/',
    ipa_us: '/ˈmʌðɚˌlænd/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the country where someone was born or where their ancestors came from",
              "th": "ประเทศที่บางคนเกิดหรือที่บรรพบุรุษมาจาก"
        }
  ],
    antonyms: ["foreign land","adopted country"],
    examples:   [
        "She returned to her motherland after living abroad for many years.",
        "The motherland of the ancient civilization is now a popular tourist destination.",
        "He feels a strong connection to his motherland and its culture."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },

  {
    word: 'unhappy',
    level: 'A2',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ʌnˈhæpi/',
    ipa_us: '/ʌnˈhæpi/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "feeling sad or displeased",
              "th": "รู้สึกไม่สบายใจหรือไม่พอใจ"
        }
  ],
    antonyms: ["happy","joyful"],
    examples:   [
        "She looked unhappy when she received the news.",
        "The unhappy child started to cry.",
        "He felt unhappy about the decision."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'crowded',
    level: 'A2',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈkɹaʊdɪd/',
    ipa_us: '/ˈkɹaʊdɪd/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "having a large number of people in a small space",
              "th": "มีคนจำนวนมากในพื้นที่เล็ก"
        }
  ],
    antonyms: ["empty","quiet"],
    examples:   [
        "The crowded bus made me feel uncomfortable.",
        "The city was crowded during the festival.",
        "She avoided the crowded restaurant."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'appear',
    level: 'A2',
    partOfSpeech: ["verb [T]"],
    ipa_uk: '/əˈpiːɹ/',
    ipa_us: '/əˈpiːɹ/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to become visible or to seem",
              "th": "ปรากฏหรือดูเหมือน"
        }
  ],
    antonyms: ["disappear","hide"],
    examples:   [
        "The ghost appeared in the haunted house.",
        "She will appear on the TV show tonight.",
        "The problem appears to be more serious than we thought."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'further',
    level: 'A2',
    partOfSpeech: ["adverb"],
    ipa_uk: '/fɜː(ɹ)ðə(ɹ)/',
    ipa_us: '/fɜː(ɹ)ðə(ɹ)/',
    meanings:   [
        {
              "pos": "adverb",
              "en": "to a greater degree or extent",
              "th": "ในระดับหรือปริมาณที่มากขึ้น"
        }
  ],
    antonyms: ["less","nearer"],
    examples:   [
        "I will investigate the matter further.",
        "The hotel is further away from the city center than I thought.",
        "She wants to study further to get a master's degree."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'pile',
    level: 'A2',
    partOfSpeech: ["noun","verb [T]"],
    ipa_uk: '/paɪl/',
    ipa_us: '/paɪl/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a collection of things laid on top of each other",
              "th": "สิ่งของที่วางซ้อนกัน"
        },
        {
              "pos": "verb",
              "en": "to put things on top of each other",
              "th": "วางสิ่งของซ้อนกัน"
        }
  ],
    antonyms: ["remove","scatter"],
    examples:   [
        "There is a pile of dirty laundry in the corner.",
        "She started to pile the books on the shelf.",
        "The kids love to pile up the leaves in the autumn."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'smooth',
    level: 'A2',
    partOfSpeech: ["adjective","verb [T]"],
    ipa_uk: '/smuːð/',
    ipa_us: '/smuːð/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "having a surface that is not rough",
              "th": "มีพื้นผิวที่ไม่ขรุขระ"
        },
        {
              "pos": "verb",
              "en": "to make something smooth",
              "th": "ทำให้บางสิ่งมีพื้นผิวที่ไม่ขรุขระ"
        }
  ],
    antonyms: ["rough","bumpy"],
    examples:   [
        "The smooth road made the journey comfortable.",
        "She smoothed out the wrinkles on her dress.",
        "The smooth music helped me to relax."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'advertising',
    level: 'A2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈædvə(ɹ)ˌtaɪzɪŋ/',
    ipa_us: '/ˈædvə(ɹ)ˌtaɪzɪŋ/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the business of making people aware of a product or service",
              "th": "ธุรกิจที่ทำให้ผู้คนรู้จักสินค้าหรือบริการ"
        }
  ],
    antonyms: ["hiding","concealing"],
    examples:   [
        "The company spends a lot of money on advertising.",
        "Advertising is an important part of any business.",
        "The advertising campaign was very successful."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'pleasant',
    level: 'A2',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈplɛzənt/',
    ipa_us: '/ˈplɛzənt/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "giving a feeling of enjoyment or satisfaction",
              "th": "ทำให้รู้สึกสบายใจหรือพอใจ"
        }
  ],
    antonyms: ["unpleasant","awful"],
    examples:   [
        "The pleasant weather made our trip enjoyable.",
        "She has a pleasant personality.",
        "The hotel room was pleasant and clean."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'schoolwork',
    level: 'A2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈskuːlˌwɜːk/',
    ipa_us: '/ˈskuːlˌwɜːk/',
    meanings:   [
        {
              "pos": "noun",
              "en": "work that is done by a student as part of their studies",
              "th": "งานที่นักเรียนทำเป็นส่วนหนึ่งของการศึกษา"
        }
  ],
    antonyms: ["leisure","entertainment"],
    examples:   [
        "The student spent most of her time on schoolwork.",
        "The teacher helped the student with their schoolwork.",
        "Schoolwork can be challenging and time-consuming."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'opposite',
    level: 'A2',
    partOfSpeech: ["adjective","noun"],
    ipa_uk: '/ˈɒpəsɪt/',
    ipa_us: '/ˈɒpəsɪt/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "completely different or on the other side",
              "th": "แตกต่างทั้งหมดหรือทางด้านตรงข้าม"
        },
        {
              "pos": "noun",
              "en": "something that is completely different",
              "th": "บางสิ่งที่แตกต่างทั้งหมด"
        }
  ],
    antonyms: ["same","similar"],
    examples:   [
        "The two cities are opposite in terms of culture.",
        "The opposite side of the street is where the park is.",
        "The opposite of happy is sad."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'pink',
    level: 'A2',
    partOfSpeech: ["adjective","noun"],
    ipa_uk: '/pɪŋk/',
    ipa_us: '/pɪŋk/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "having a color that is a mixture of red and white",
              "th": "มีสีที่เป็นส่วนผสมของสีแดงและสีขาว"
        },
        {
              "pos": "noun",
              "en": "the color pink",
              "th": "สีชมพู"
        }
  ],
    antonyms: ["green","blue"],
    examples:   [
        "The pink dress looked beautiful on her.",
        "The pink flowers were blooming in the garden.",
        "The room was painted pink and white."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'bury',
    level: 'A2',
    partOfSpeech: ["verb [T]"],
    ipa_uk: '/ˈbʌ.ɹi/',
    ipa_us: '/ˈbʌ.ɹi/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to put something under the ground",
              "th": "วางบางสิ่งไว้ใต้ดิน"
        }
  ],
    antonyms: ["uncover","dig up"],
    examples:   [
        "They will bury the dead body in the cemetery.",
        "The dog likes to bury bones in the backyard.",
        "The treasure was buried on the island."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'fog',
    level: 'A2',
    partOfSpeech: ["noun"],
    ipa_uk: '/fɒɡ/',
    ipa_us: '/fɒɡ/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a cloud-like mass of tiny water droplets in the air",
              "th": "กลุ่มเมฆที่ประกอบด้วยหยดน้ำขนาดเล็กในอากาศ"
        }
  ],
    antonyms: ["clear","sunny"],
    examples:   [
        "The fog made it difficult to drive.",
        "The city was covered in fog this morning.",
        "The fog rolled in off the ocean."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'purple',
    level: 'A2',
    partOfSpeech: ["adjective","noun"],
    ipa_uk: '/ˈpɜː(ɹ).pəl/',
    ipa_us: '/ˈpɜː(ɹ).pəl/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "having a color that is a mixture of red and blue",
              "th": "มีสีที่เป็นส่วนผสมของสีแดงและสีน้ำเงิน"
        },
        {
              "pos": "noun",
              "en": "the color purple",
              "th": "สีม่วง"
        }
  ],
    antonyms: ["orange","yellow"],
    examples:   [
        "The purple flowers were beautiful.",
        "The queen wore a purple dress to the party.",
        "The room was painted purple and silver."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'disappointed',
    level: 'A2',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˌdɪsəˈpɔɪntɪd/',
    ipa_us: '/ˌdɪsəˈpɔɪntɪd/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "feeling sad or unhappy because something did not happen as expected",
              "th": "รู้สึกเสียใจหรือไม่สบายใจเพราะบางสิ่งไม่เกิดขึ้นตามที่คาดหวัง"
        }
  ],
    antonyms: ["happy","pleased"],
    examples:   [
        "I was disappointed when I didn't get the job.",
        "She felt disappointed when her favorite team lost.",
        "The disappointed child started to cry."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'coin',
    level: 'A2',
    partOfSpeech: ["noun"],
    ipa_uk: '/kɔɪn/',
    ipa_us: '/kɔɪn/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a small piece of metal used as money",
              "th": "ชิ้นเล็กของโลหะที่ใช้เป็นเงิน"
        }
  ],
    antonyms: ["bill","note"],
    examples:   [
        "I need a coin to use the vending machine.",
        "The coin was old and rare.",
        "She found a coin on the ground."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'illegal',
    level: 'A2',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ɪˈliːɡəl/',
    ipa_us: '/ɪˈliːɡəl/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "against the law",
              "th": "ขัดต่อกฎหมาย"
        }
  ],
    antonyms: ["legal","lawful"],
    examples:   [
        "The illegal drug trade is a serious problem.",
        "It is illegal to park your car here.",
        "The company was involved in illegal activities."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'widely',
    level: 'A2',
    partOfSpeech: ["adverb"],
    ipa_uk: '/ˈwaɪdli/',
    ipa_us: '/ˈwaɪdli/',
    meanings:   [
        {
              "pos": "adverb",
              "en": "to a great extent or over a large area",
              "th": "ในระดับที่มากหรือในพื้นที่ขนาดใหญ่"
        }
  ],
    antonyms: ["narrowly","locally"],
    examples:   [
        "The news was widely reported in the media.",
        "The company's products are widely available.",
        "The language is widely spoken in the country."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'attack',
    level: 'A2',
    partOfSpeech: ["noun","verb [T]"],
    ipa_uk: '/əˈtæk/',
    ipa_us: '/əˈtæk/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a violent or aggressive act",
              "th": "การกระทำที่รุนแรงหรือก้าวร้าว"
        },
        {
              "pos": "verb",
              "en": "to use force or violence against someone or something",
              "th": "ใช้กำลังหรือความรุนแรงต่อใครบางคนหรือบางสิ่ง"
        }
  ],
    antonyms: ["defend","protect"],
    examples:   [
        "The attack on the city was unexpected.",
        "The dog will attack if it feels threatened.",
        "The company launched an attack on its competitor."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'envelope',
    level: 'A2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈɒn.və.ləʊp/',
    ipa_us: '/ˈɒn.və.ləʊp/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a paper container used for sending letters or documents",
              "th": "ภาชนะกระดาษที่ใช้สำหรับส่งจดหมายหรือเอกสาร"
        }
  ],
    antonyms: ["box","package"],
    examples:   [
        "I need an envelope to send this letter.",
        "The envelope was addressed to my friend.",
        "She put the letter in the envelope and sealed it."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },

  {
    word: 'apron',
    level: 'A1',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈeɪ.pɹən/',
    ipa_us: '/ˈeɪ.pɹən/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a piece of fabric worn over the front of the body to protect clothing",
              "th": "ผ้าปิดหน้า"
        }
  ],
    antonyms: ["gloves","jacket"],
    examples:   [
        "She put on an apron to protect her clothes while cooking.",
        "The apron was covered in flour and sugar after baking.",
        "He wore a leather apron to work in the garage."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'hurt',
    level: 'A1',
    partOfSpeech: ["verb [T]"],
    ipa_uk: '/hɜːt/',
    ipa_us: '/hɜːt/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to cause someone pain or injury",
              "th": "ทำให้เจ็บ"
        }
  ],
    antonyms: ["heal","cure"],
    examples:   [
        "The fall hurt her knee and she couldn't walk.",
        "His words hurt her feelings and she started crying.",
        "The medicine won't hurt you, it will make you feel better."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'reason',
    level: 'A1',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈɹiːzən/',
    ipa_us: '/ˈɹiːzən/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a cause or explanation for something",
              "th": "สาเหตุ"
        }
  ],
    antonyms: ["emotion","guess"],
    examples:   [
        "The reason I'm late is because of the traffic.",
        "There's no reason to be afraid, everything will be fine.",
        "She gave a good reason for not attending the meeting."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'turn',
    level: 'A1',
    partOfSpeech: ["verb [I/T]"],
    ipa_uk: '/tɜːn/',
    ipa_us: '/tɜːn/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to change direction or move in a different way",
              "th": "เปลี่ยนทิศทาง"
        }
  ],
    antonyms: ["stay","remain"],
    examples:   [
        "Turn left at the next corner to get to the park.",
        "She turned the page to continue reading the book.",
        "The key turned easily in the lock."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'say',
    level: 'A1',
    partOfSpeech: ["verb [T]"],
    ipa_uk: '/seɪ/',
    ipa_us: '/seɪ/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to express an opinion or thought in words",
              "th": "พูด"
        }
  ],
    antonyms: ["hide","keep"],
    examples:   [
        "What did you say? I didn't hear you.",
        "She said she would meet us at 5 o'clock.",
        "He didn't say anything, he just nodded."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'hide',
    level: 'A1',
    partOfSpeech: ["verb [I/T]"],
    ipa_uk: '/haɪd/',
    ipa_us: '/haɪd/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to put or keep something out of sight",
              "th": "ซ่อน"
        }
  ],
    antonyms: ["show","reveal"],
    examples:   [
        "Hide the present, it's a surprise.",
        "The cat likes to hide under the bed.",
        "She tried to hide her tears, but it was too late."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'go',
    level: 'A1',
    partOfSpeech: ["verb [I]"],
    ipa_uk: '/ɡəʉ/',
    ipa_us: '/ɡəʉ/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to move from one place to another",
              "th": "ไป"
        }
  ],
    antonyms: ["stay","stop"],
    examples:   [
        "I'm going to the store, do you need anything?",
        "She went to the party and had a great time.",
        "Let's go for a walk in the park."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'information',
    level: 'A1',
    partOfSpeech: ["noun [U]"],
    ipa_uk: '/ˌɪnfəˈmeɪʃən/',
    ipa_us: '/ˌɪnfəˈmeɪʃən/',
    meanings:   [
        {
              "pos": "noun",
              "en": "facts or details about something",
              "th": "ข้อมูล"
        }
  ],
    antonyms: ["rumor","guess"],
    examples:   [
        "The tourist information office is open from 9 to 5.",
        "Can you give me some information about the hotel?",
        "The company needs more information before making a decision."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'remember',
    level: 'A1',
    partOfSpeech: ["verb [T]"],
    ipa_uk: '/ɹɪˈmɛmbə/',
    ipa_us: '/ɹɪˈmɛmbə/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to recall or bring to mind a piece of information",
              "th": "จำ"
        }
  ],
    antonyms: ["forget","ignore"],
    examples:   [
        "I remember my birthday, it's on December 12th.",
        "She couldn't remember where she put her keys.",
        "He remembered to call his mother on her birthday."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'map',
    level: 'A1',
    partOfSpeech: ["noun"],
    ipa_uk: '/mæp/',
    ipa_us: '/mæp/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a diagram or representation of an area",
              "th": "แผนที่"
        }
  ],
    antonyms: ["guide","brochure"],
    examples:   [
        "The map showed us the way to the hotel.",
        "She studied the map to learn the new city.",
        "He used a map to navigate the hiking trail."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'princess',
    level: 'A1',
    partOfSpeech: ["noun"],
    ipa_uk: '/pɹɪnˈsɛs/',
    ipa_us: '/pɹɪnˈsɛs/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the daughter of a king or queen",
              "th": "เจ้าหญิง"
        }
  ],
    antonyms: ["queen","commoner"],
    examples:   [
        "The princess wore a beautiful dress to the ball.",
        "She felt like a princess in her wedding dress.",
        "The prince and princess had two children."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'singer',
    level: 'A1',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈsɪŋə/',
    ipa_us: '/ˈsɪŋə/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a person who sings, especially as a profession",
              "th": "นักร้อง"
        }
  ],
    antonyms: ["dancer","actor"],
    examples:   [
        "The singer performed in front of a large crowd.",
        "She is a famous singer and has won many awards.",
        "He became a singer after winning a talent show."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'shower',
    level: 'A1',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈʃaʊ.ə(ɹ)/',
    ipa_us: '/ˈʃaʊ.ə(ɹ)/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a device that sends down water for washing",
              "th": "ฝักบัว"
        }
  ],
    antonyms: ["bath","sink"],
    examples:   [
        "I'm going to take a shower before bed.",
        "The shower was hot and relaxing after the long day.",
        "She installed a new shower head in her bathroom."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'article',
    level: 'A1',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈɑːtɪkəl/',
    ipa_us: '/ˈɑːtɪkəl/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a piece of writing, especially in a newspaper or magazine",
              "th": "บทความ"
        }
  ],
    antonyms: ["book","report"],
    examples:   [
        "The article in the newspaper was very interesting.",
        "She wrote an article about her trip to Europe.",
        "The article was published in a scientific journal."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'meeting',
    level: 'A1',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈmiːtɪŋ/',
    ipa_us: '/ˈmiːtɪŋ/',
    meanings:   [
        {
              "pos": "noun",
              "en": "an event where people come together to discuss something",
              "th": "การประชุม"
        }
  ],
    antonyms: ["gathering","party"],
    examples:   [
        "The meeting will start at 2 o'clock.",
        "She attended a meeting with her colleagues.",
        "The meeting was cancelled due to the weather."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'straight',
    level: 'A1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/stɹeɪt/',
    ipa_us: '/stɹeɪt/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "not curved or bent",
              "th": "ตรง"
        }
  ],
    antonyms: ["curved","bent"],
    examples:   [
        "The road was straight and flat.",
        "She has straight hair, not curly.",
        "The line was straight, not wavy."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'fish',
    level: 'A1',
    partOfSpeech: ["noun"],
    ipa_uk: '/fɪʃ/',
    ipa_us: '/fɪʃ/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a living thing that lives in water and has gills",
              "th": "ปลา"
        }
  ],
    antonyms: ["mammal","bird"],
    examples:   [
        "The fish swam in the aquarium.",
        "She ate fish for dinner last night.",
        "He went fishing in the lake."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'delicious',
    level: 'A1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/dɪˈlɪʃəs/',
    ipa_us: '/dɪˈlɪʃəs/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "very tasty and enjoyable to eat",
              "th": "อร่อย"
        }
  ],
    antonyms: ["tasteless","bitter"],
    examples:   [
        "The cake was delicious, I had two slices.",
        "She thought the restaurant served delicious food.",
        "The fruit was delicious and juicy."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'spell',
    level: 'A1',
    partOfSpeech: ["verb [I/T]"],
    ipa_uk: '/spɛl/',
    ipa_us: '/spɛl/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to say or write the letters of a word in the correct order",
              "th": "สะกด"
        }
  ],
    antonyms: ["misspell","forget"],
    examples:   [
        "Can you spell your name for me?",
        "The word is hard to spell, it has many letters.",
        "She learned to spell in elementary school."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'tube',
    level: 'A1',
    partOfSpeech: ["noun"],
    ipa_uk: '/tjuːb/',
    ipa_us: '/tjuːb/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a long, hollow pipe, especially one used for transportation",
              "th": "ท่อ"
        }
  ],
    antonyms: ["pipe","hose"],
    examples:   [
        "The toothpaste came out of the tube.",
        "The London Tube is a famous subway system.",
        "The bike tire had a hole in the tube."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'job',
    level: 'A1',
    partOfSpeech: ["noun"],
    ipa_uk: '/d͡ʒɒb/',
    ipa_us: '/d͡ʒɒb/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a regular activity or work that someone does to earn money",
              "th": "งาน"
        }
  ],
    antonyms: ["hobby","leisure"],
    examples:   [
        "I have a job interview tomorrow.",
        "She loves her job as a teacher.",
        "He's been looking for a job for months."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'about',
    level: 'A1',
    partOfSpeech: ["preposition"],
    ipa_uk: '/əˈbɛʊt/',
    ipa_us: '/əˈbɛʊt/',
    meanings:   [
        {
              "pos": "preposition",
              "en": "on the subject of, or concerning",
              "th": "เกี่ยวกับ"
        }
  ],
    antonyms: ["without","excluding"],
    examples:   [
        "The book is about a young girl who travels.",
        "I'm worried about the weather tomorrow.",
        "She talked about her favorite food."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'lot',
    level: 'A1',
    partOfSpeech: ["noun"],
    ipa_uk: '/lɒt/',
    ipa_us: '/lɒt/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a large amount or quantity of something",
              "th": "จำนวนมาก"
        }
  ],
    antonyms: ["little","few"],
    examples:   [
        "I have a lot of work to do today.",
        "She ate a lot of food at the party.",
        "There's a lot of traffic on the road."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'star',
    level: 'A1',
    partOfSpeech: ["noun"],
    ipa_uk: '/stɑː(ɹ)/',
    ipa_us: '/stɑː(ɹ)/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a massive, luminous ball of gas that is held together by its own gravity",
              "th": "ดาว"
        }
  ],
    antonyms: ["planet","moon"],
    examples:   [
        "The star shone brightly in the night sky.",
        "She's a star in the movie industry.",
        "The football player was a star on the field."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'family',
    level: 'A1',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈfɛm(ɘ)li/',
    ipa_us: '/ˈfɛm(ɘ)li/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a group of people related to each other by birth, marriage, or adoption",
              "th": "ครอบครัว"
        }
  ],
    antonyms: ["friends","strangers"],
    examples:   [
        "I'm going to visit my family for the holidays.",
        "She comes from a big family with many siblings.",
        "The family went on a trip to the beach together."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },

  {
    word: 'concur',
    level: 'C1',
    partOfSpeech: ["verb [I]"],
    ipa_uk: '/kənˈkɜː/',
    ipa_us: '/kənˈkɜː/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to agree with something or someone",
              "th": "เห็นด้วยกับบางสิ่งหรือบางคน"
        }
  ],
    antonyms: ["disagree","dissent"],
    examples:   [
        "I concur with your opinion on this matter.",
        "The experts concur that climate change is a pressing issue.",
        "She concurs with her colleague's assessment of the situation."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'sauna',
    level: 'C1',
    partOfSpeech: ["noun [C]"],
    ipa_uk: '/ˈsaʊ.nə/',
    ipa_us: '/ˈsaʊ.nə/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a small room or building where people sit or stand to sweat, typically for health or relaxation",
              "th": "ห้องหรืออาคารขนาดเล็กที่คนนั่งหรือยืนเพื่อออกเหงื่อ โดยทั่วไปเพื่อสุขภาพหรือผ่อนคลาย"
        }
  ],
    antonyms: ["freezer","icebox"],
    examples:   [
        "After the workout, he relaxed in the sauna.",
        "The spa has a sauna and a steam room for guests.",
        "She enjoys spending time in the sauna to detoxify her body."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'temperament',
    level: 'C1',
    partOfSpeech: ["noun [C]"],
    ipa_uk: '/ˈtɛmpəɹmənt/',
    ipa_us: '/ˈtɛmpəɹmənt/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the natural disposition or character of a person",
              "th": "อุปนิสัยหรือลักษณะนิสัยที่เป็นธรรมชาติของคน"
        }
  ],
    antonyms: ["personality","character"],
    examples:   [
        "Her temperament is well-suited for a career in diplomacy.",
        "He has a calm temperament, which helps him in stressful situations.",
        "The artist's temperament is reflected in her bold and expressive paintings."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'knowledgeable',
    level: 'C1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈnɑl.ɪd͡ʒ.ə.bəl/',
    ipa_us: '/ˈnɑl.ɪd͡ʒ.ə.bəl/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "having or showing a lot of knowledge about something",
              "th": "มีหรือแสดงให้เห็นถึงความรู้มากมายเกี่ยวกับบางสิ่ง"
        }
  ],
    antonyms: ["ignorant","uninformed"],
    examples:   [
        "The professor is knowledgeable about ancient history.",
        "She is knowledgeable about the latest technology trends.",
        "He is a knowledgeable guide who can answer all your questions."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'tycoon',
    level: 'C1',
    partOfSpeech: ["noun [C]"],
    ipa_uk: '/taɪˈkuːn/',
    ipa_us: '/taɪˈkuːn/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a very rich and powerful business person",
              "th": "คนรวยและมีอำนาจมากในธุรกิจ"
        }
  ],
    antonyms: ["pauper","beggar"],
    examples:   [
        "The tycoon donated millions to charity.",
        "He is a self-made tycoon who built his empire from scratch.",
        "The tycoon's business practices have been criticized by many."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'negligible',
    level: 'C1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈnɛɡlɪdʒɪbəl/',
    ipa_us: '/ˈnɛɡlɪdʒɪbəl/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "so small or unimportant that it can be ignored",
              "th": "เล็กหรือไม่สำคัญจนสามารถเพิกเฉยได้"
        }
  ],
    antonyms: ["significant","substantial"],
    examples:   [
        "The risk of side effects is negligible.",
        "The change in temperature is negligible compared to other factors.",
        "The amount of money he spent was negligible compared to his income."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'carpenter',
    level: 'C1',
    partOfSpeech: ["noun [C]"],
    ipa_uk: '/ˈkɑː.pən.tə/',
    ipa_us: '/ˈkɑː.pən.tə/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a person who builds, repairs, and installs structures and fixtures made of wood, wood substitutes, and other materials",
              "th": "คนซึ่งสร้าง ซ่อมแซม และติดตั้งโครงสร้างและอุปกรณ์ที่ทำจากไม้ วัสดุแทนน้ำมัน และวัสดุอื่นๆ"
        }
  ],
    antonyms: ["demolition worker","wrecker"],
    examples:   [
        "The carpenter built a beautiful wooden house.",
        "He worked as a carpenter before starting his own business.",
        "The carpenter's skills are in high demand for renovation projects."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'batter',
    level: 'C1',
    partOfSpeech: ["verb [T]","noun [C]"],
    ipa_uk: '/ˈbætə(ɹ)/',
    ipa_us: '/ˈbætə(ɹ)/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to hit or strike something or someone repeatedly",
              "th": "ตีหรือกระแทกบางสิ่งหรือบางคนซ้ำๆ"
        },
        {
              "pos": "noun",
              "en": "a mixture of flour, liquid, and other ingredients used for making cakes, pancakes, etc.",
              "th": "ส่วนผสมของแป้ง น้ำ และส่วนผสมอื่นๆ ที่ใช้สำหรับการทำเค้ก แพนเค้ก ฯลฯ"
        }
  ],
    antonyms: ["protect","defend"],
    examples:   [
        "The boxer will batter his opponent in the ring.",
        "The storm will batter the coast with strong winds.",
        "She used a special batter to make delicious pancakes."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'signal',
    level: 'C1',
    partOfSpeech: ["noun [C]","verb [T]"],
    ipa_uk: '/ˈsɪɡnəl/',
    ipa_us: '/ˈsɪɡnəl/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a movement, gesture, or sound that conveys a particular meaning",
              "th": "การเคลื่อนไหว ท่าทาง หรือเสียงที่สื่อความหมายเฉพาะ"
        },
        {
              "pos": "verb",
              "en": "to convey a message or instruction by means of a signal",
              "th": "สื่อสารข้อความหรือคำสั่งโดยใช้สัญญาณ"
        }
  ],
    antonyms: ["noise","interference"],
    examples:   [
        "The signal from the lighthouse guided the ship to safety.",
        "She signaled to her friend to meet her outside.",
        "The company will signal its intention to expand into new markets."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'latent',
    level: 'C1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈleɪ.tənt/',
    ipa_us: '/ˈleɪ.tənt/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "existing but not yet developed or visible",
              "th": "มีอยู่แต่ยังไม่พัฒนาหรือมองเห็น"
        }
  ],
    antonyms: ["obvious","apparent"],
    examples:   [
        "The latent talent of the young artist was discovered by a critic.",
        "The company has latent potential for growth.",
        "The latent virus can reactivate years after the initial infection."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'succession',
    level: 'C1',
    partOfSpeech: ["noun [C]"],
    ipa_uk: '/səkˈsɛʃ.ən/',
    ipa_us: '/səkˈsɛʃ.ən/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the process of one thing following another in time or order",
              "th": "กระบวนการที่สิ่งหนึ่งตามหลังอีกสิ่งหนึ่งในเวลาหรือลำดับ"
        }
  ],
    antonyms: ["predecessor","isolated event"],
    examples:   [
        "The succession of events led to the company's bankruptcy.",
        "The succession of kings in the dynasty was marked by power struggles.",
        "The succession of natural disasters devastated the region."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'motley',
    level: 'C1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈmɒtli/',
    ipa_us: '/ˈmɒtli/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "consisting of a mixture of different things",
              "th": "ประกอบด้วยส่วนผสมของสิ่งต่างๆ ที่แตกต่างกัน"
        }
  ],
    antonyms: ["uniform","homogeneous"],
    examples:   [
        "The motley crew of sailors came from different parts of the world.",
        "The city has a motley population of people from various ethnic backgrounds.",
        "The artist's motley style reflects her eclectic taste in art."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'crude',
    level: 'C1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/kɹʉd/',
    ipa_us: '/kɹʉd/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "lacking refinement or subtlety",
              "th": "ขาดความซับซ้อนหรือความละมุนละม่อม"
        }
  ],
    antonyms: ["sophisticated","refined"],
    examples:   [
        "The crude oil needs to be refined before use.",
        "His crude behavior offended many people at the party.",
        "The crude tools were not effective for the delicate task."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'behind',
    level: 'C1',
    partOfSpeech: ["preposition","adverb"],
    ipa_uk: '/bəˈhaɪnd/',
    ipa_us: '/bəˈhaɪnd/',
    meanings:   [
        {
              "pos": "preposition",
              "en": "at the back of something or someone",
              "th": "ที่ด้านหลังของสิ่งหรือคน"
        },
        {
              "pos": "adverb",
              "en": "in a position where someone or something is late or slow",
              "th": "ในตำแหน่งที่คนหรือสิ่งใดอยู่ในตำแหน่งที่ล่าช้าหรือช้า"
        }
  ],
    antonyms: ["ahead","in front"],
    examples:   [
        "The car is behind the tree.",
        "She is behind schedule with her project.",
        "The team is behind in the game, but they can still win."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'cynicism',
    level: 'C1',
    partOfSpeech: ["noun [U]"],
    ipa_uk: '/ˈsɪn.ɪˌsɪzəm/',
    ipa_us: '/ˈsɪn.ɪˌsɪzəm/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the belief that people are motivated by self-interest and that they do not care about others",
              "th": "ความเชื่อที่ว่าคนถูกขับเคลื่อนด้วยผลประโยชน์ส่วนตนและไม่สนใจผู้อื่น"
        }
  ],
    antonyms: ["optimism","trust"],
    examples:   [
        "The cynicism of the politician's words was evident.",
        "Cynicism can lead to a lack of trust in institutions.",
        "The cynicism of the media can be discouraging to young journalists."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'numb',
    level: 'C1',
    partOfSpeech: ["adjective","verb [T]"],
    ipa_uk: '/nʌm/',
    ipa_us: '/nʌm/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "unable to feel anything, especially pain or emotion",
              "th": "ไม่สามารถรู้สึกอะไรได้ โดยเฉพาะเจ็บปวดหรืออารมณ์"
        },
        {
              "pos": "verb",
              "en": "to make someone or something unable to feel anything",
              "th": "ทำให้คนหรือสิ่งใดไม่สามารถรู้สึกอะไรได้"
        }
  ],
    antonyms: ["sensitive","responsive"],
    examples:   [
        "The numbness in her leg made it difficult to walk.",
        "The doctor will numb the area before the surgery.",
        "The news left her numb and unable to react."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'relapse',
    level: 'C1',
    partOfSpeech: ["verb [I]","noun [C]"],
    ipa_uk: '/ɹɪˈlæps/',
    ipa_us: '/ɹɪˈlæps/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to return to a previous state, especially an undesirable one",
              "th": "กลับสู่สถานะก่อนหน้า โดยเฉพาะอย่างยิ่งสถานะที่ไม่พึงประสงค์"
        },
        {
              "pos": "noun",
              "en": "the act of returning to a previous state, especially an undesirable one",
              "th": "การกลับสู่สถานะก่อนหน้า โดยเฉพาะอย่างยิ่งสถานะที่ไม่พึงประสงค์"
        }
  ],
    antonyms: ["recover","improve"],
    examples:   [
        "The patient may relapse if they don't take their medication.",
        "She relapsed into her old habits after a few months.",
        "The relapse of the disease was a setback for the researchers."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },

  {
    word: 'factor',
    level: 'B2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈfæktə/',
    ipa_us: '/ˈfæktə/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a fact or situation that influences the result of something",
              "th": "ปัจจัยหรือสถานการณ์ที่มีผลต่อผลลัพธ์ของบางสิ่ง"
        }
  ],
    antonyms: ["result","outcome"],
    examples:   [
        "The weather was a significant factor in the success of the event.",
        "Her age was not a factor in the decision to hire her.",
        "The company considered several factors before making a decision."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'tremor',
    level: 'B2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈtɹɛmɚ/',
    ipa_us: '/ˈtɹɛmɚ/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a slight shaking movement, especially of the earth or of someone's hands",
              "th": "การเคลื่อนไหวที่สั่นเล็กน้อย โดยเฉพาะของโลกหรือของมือของผู้ใด"
        }
  ],
    antonyms: ["stillness","calmness"],
    examples:   [
        "The earthquake caused a tremor that lasted for several minutes.",
        "The patient had a tremor in her hands, which made it hard for her to write.",
        "The doctor diagnosed the tremor as a symptom of a neurological disorder."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'signify',
    level: 'B2',
    partOfSpeech: ["verb"],
    ipa_uk: '/ˈsɪɡnɪfaɪ/',
    ipa_us: '/ˈsɪɡnɪfaɪ/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to mean or represent something",
              "th": "หมายถึงหรือเป็นตัวแทนของบางสิ่ง"
        }
  ],
    antonyms: ["misrepresent","distort"],
    examples:   [
        "The flag signifies the country's history and values.",
        "The symbol signifies peace and unity.",
        "The artist's use of color signifies a sense of sadness and melancholy."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'compression',
    level: 'B2',
    partOfSpeech: ["noun"],
    ipa_uk: '/kɒm.pɹɛʃ.ən/',
    ipa_us: '/kɒm.pɹɛʃ.ən/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the act of pressing or squeezing something together",
              "th": "การกดหรือบีบอัดบางสิ่งเข้าด้วยกัน"
        }
  ],
    antonyms: ["expansion","dilation"],
    examples:   [
        "The compression of the data allowed it to be sent more quickly.",
        "The compression of the air in the tire made it more efficient.",
        "The doctor used compression to stop the bleeding from the wound."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'orchid',
    level: 'B2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈɔː.kɪd/',
    ipa_us: '/ˈɔː.kɪd/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a type of flowering plant",
              "th": "ประเภทของพืชดอก"
        }
  ],
    antonyms: ["weed","fern"],
    examples:   [
        "The orchid is a popular choice for wedding bouquets.",
        "The gardener specialized in growing rare and exotic orchids.",
        "The orchid was a symbol of luxury and beauty in ancient cultures."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'route',
    level: 'B2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ɹʉːt/',
    ipa_us: '/ɹʉːt/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a way or course taken to get from one place to another",
              "th": "ทางหรือเส้นทางที่ใช้ในการเดินทางจากที่หนึ่งไปอีกที่หนึ่ง"
        }
  ],
    antonyms: ["detour","diversion"],
    examples:   [
        "The bus took a scenic route through the mountains.",
        "The hikers got lost because they took a wrong route.",
        "The company is planning to change its delivery route to reduce costs."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'attainable',
    level: 'B2',
    partOfSpeech: ["adjective"],
    ipa_uk: '/əˈteɪnəb(ə)l/',
    ipa_us: '/əˈteɪnəb(ə)l/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "possible to achieve or get",
              "th": "สามารถบรรลุหรือได้รับ"
        }
  ],
    antonyms: ["unattainable","impossible"],
    examples:   [
        "The goal was attainable, but it required a lot of hard work.",
        "The company made the product more attainable by reducing its price.",
        "The student felt that the scholarship was attainable if she studied hard enough."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'cooperate',
    level: 'B2',
    partOfSpeech: ["verb"],
    ipa_uk: '/koʊˈɒpəɹeɪt/',
    ipa_us: '/koʊˈɒpəɹeɪt/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to work together and share the work or responsibility",
              "th": "ทำงานร่วมกันและแบ่งปันงานหรือความรับผิดชอบ"
        }
  ],
    antonyms: ["compete","oppose"],
    examples:   [
        "The companies will cooperate to develop a new product.",
        "The countries agreed to cooperate on the environmental issue.",
        "The team members learned to cooperate and trust each other."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'bureaucracy',
    level: 'B2',
    partOfSpeech: ["noun"],
    ipa_uk: '/bjʊəˈɹɒkɹəsi/',
    ipa_us: '/bjʊəˈɹɒkɹəsi/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a system of government or organization that has many rules and officials",
              "th": "ระบบการปกครองหรือองค์กรที่มีกฎและเจ้าหน้าที่จำนวนมาก"
        }
  ],
    antonyms: ["meritocracy","democracy"],
    examples:   [
        "The bureaucracy in the government made it hard to get anything done.",
        "The company's bureaucracy was criticized for being slow and inefficient.",
        "The artist's work was a commentary on the bureaucracy and red tape in society."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'nostril',
    level: 'B2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈnɒstɹəl/',
    ipa_us: '/ˈnɒstɹəl/',
    meanings:   [
        {
              "pos": "noun",
              "en": "one of the two small openings in the nose through which air is breathed in and out",
              "th": "ช่องเปิดเล็กๆ สองช่องในจมูกที่ใช้ในการหายใจเข้าและออก"
        }
  ],
    antonyms: ["mouth","throat"],
    examples:   [
        "The doctor examined the patient's nostrils to check for any blockages.",
        "The athlete's nostrils flared as she took deep breaths before the competition.",
        "The child picked her nostrils, which was a bad habit."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'struggle',
    level: 'B2',
    partOfSpeech: ["verb","noun"],
    ipa_uk: '/ˈstrʌɡəl/',
    ipa_us: '/ˈstrʌɡəl/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to try very hard to do something, or to fight against something",
              "th": "พยายามอย่างหนักเพื่อทำบางสิ่ง หรือต่อสู้กับบางสิ่ง"
        },
        {
              "pos": "noun",
              "en": "a difficult or violent effort to achieve or resist something",
              "th": "ความพยายามอย่างยากลำบากหรือรุนแรงเพื่อบรรลุหรือต่อต้านบางสิ่ง"
        }
  ],
    antonyms: ["surrender","yield"],
    examples:   [
        "The team struggled to win the game, but eventually emerged victorious.",
        "The single mother struggled to make ends meet, but never gave up.",
        "The country struggled to recover from the economic crisis, but is now on the path to growth."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'pension',
    level: 'B2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈpɛnʃ(ə)n/',
    ipa_us: '/ˈpɛnʃ(ə)n/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a regular payment made to someone who has retired from work",
              "th": "การชำระเงินเป็นประจำให้กับบุคคลที่เกษียณอายุการทำงาน"
        }
  ],
    antonyms: ["salary","wage"],
    examples:   [
        "The retired teacher received a generous pension and was able to travel.",
        "The company offered a pension plan to its employees, which was a major benefit.",
        "The government increased the pension for veterans, which was a welcome change."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'sack',
    level: 'B2',
    partOfSpeech: ["verb","noun"],
    ipa_uk: '/sæk/',
    ipa_us: '/sæk/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to dismiss someone from their job",
              "th": "ให้ใครออกจากงาน"
        },
        {
              "pos": "noun",
              "en": "a bag made of flexible material, or a dismissal from a job",
              "th": "ถุงทำจากวัสดุอ่อน หรือการให้ใครออกจากงาน"
        }
  ],
    antonyms: ["hire","employ"],
    examples:   [
        "The company sacked the employee for poor performance.",
        "The manager was sacked after the team's losing streak.",
        "The worker carried his tools in a sack on his back."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'rafter',
    level: 'B2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈɹæftəɹ/',
    ipa_us: '/ˈɹæftəɹ/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a long, narrow piece of wood or metal that is part of a roof",
              "th": "แผ่นไม้หรือโลหะยาวและแคบที่เป็นส่วนหนึ่งของหลังคา"
        }
  ],
    antonyms: ["column","beam"],
    examples:   [
        "The contractor installed new rafters in the attic to support the roof.",
        "The old house had exposed rafters, which added to its charm.",
        "The carpenter used rafters to build a sturdy frame for the shed."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'risk',
    level: 'B2',
    partOfSpeech: ["noun","verb"],
    ipa_uk: '/ɹɪsk/',
    ipa_us: '/ɹɪsk/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a situation that could possibly cause harm or danger",
              "th": "สถานการณ์ที่อาจก่อให้เกิดอันตรายหรือความเสี่ยง"
        },
        {
              "pos": "verb",
              "en": "to take a chance or do something that might cause harm or danger",
              "th": "ที่จะรับความเสี่ยงหรือทำบางสิ่งที่อาจก่อให้เกิดอันตรายหรือความเสี่ยง"
        }
  ],
    antonyms: ["safety","security"],
    examples:   [
        "The investor took a risk by putting all his money into one stock.",
        "The hiker took a risk by climbing the mountain without a guide.",
        "The company assessed the risk of the new project before deciding to proceed."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'stress',
    level: 'B2',
    partOfSpeech: ["noun","verb"],
    ipa_uk: '/stɹɛs/',
    ipa_us: '/stɹɛs/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a state of anxiety or tension, or a force that causes this",
              "th": "สภาพของความวิตกกังวลหรือความตึงเครียด หรือแรงที่ทำให้เกิดสิ่งนี้"
        },
        {
              "pos": "verb",
              "en": "to emphasize or give importance to something",
              "th": "เน้นหรือให้ความสำคัญกับบางสิ่ง"
        }
  ],
    antonyms: ["relaxation","calmness"],
    examples:   [
        "The employee was under a lot of stress at work, which affected her health.",
        "The teacher tried to stress the importance of punctuality to the students.",
        "The company offered stress management workshops to its employees."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },

  {
    word: 'attraction',
    level: 'B1',
    partOfSpeech: ["noun"],
    ipa_uk: '/əˈtɹækʃən/',
    ipa_us: '/əˈtɹækʃən/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a person or thing that attracts",
              "th": "สิ่งดึงดูด"
        }
  ],
    antonyms: ["repulsion","aversion"],
    examples:   [
        "The city's main attraction is its beautiful park.",
        "She was a major attraction at the party.",
        "The museum's new exhibit is a big attraction for tourists."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'frustrated',
    level: 'B1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/fɹəsˈtɹeɪt.ɪd/',
    ipa_us: '/fɹəsˈtɹeɪt.ɪd/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "feeling or showing annoyance or disappointment",
              "th": "รู้สึกหรือแสดงออกถึงความไม่พอใจหรือความผิดหวัง"
        }
  ],
    antonyms: ["satisfied","content"],
    examples:   [
        "I feel frustrated when I'm stuck in traffic.",
        "She was frustrated with her job and decided to quit.",
        "He felt frustrated because he couldn't solve the puzzle."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'prejudice',
    level: 'B1',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈpɹɛd͡ʒədɪs/',
    ipa_us: '/ˈpɹɛd͡ʒədɪs/',
    meanings:   [
        {
              "pos": "noun",
              "en": "an unfair and unreasonable opinion or feeling, especially one that is based on race, sex, or religion",
              "th": "ความคิดเห็นที่ไม่ยุติธรรมและไม่มีเหตุผล"
        }
  ],
    antonyms: ["tolerance","acceptance"],
    examples:   [
        "The company has a policy against prejudice in the workplace.",
        "She tried to overcome her prejudice against people from different cultures.",
        "The media can perpetuate prejudice and stereotypes."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'relative',
    level: 'B1',
    partOfSpeech: ["noun","adjective"],
    ipa_uk: '[ˈɹɛl.ə.tʰɪv]',
    ipa_us: '[ˈɹɛl.ə.tʰɪv]',
    meanings:   [
        {
              "pos": "noun",
              "en": "a person who is connected to someone else by blood or marriage",
              "th": "บุคคลที่เกี่ยวข้องกับบุคคลอื่นโดยความสัมพันธ์ทางเลือดหรือการสมรส"
        },
        {
              "pos": "adjective",
              "en": "connected or related to something else",
              "th": "เกี่ยวข้องกับหรือเชื่อมโยงกับสิ่งอื่น"
        }
  ],
    antonyms: ["unrelated","absolute"],
    examples:   [
        "My relative is visiting from out of town.",
        "The relative importance of the issues is often debated.",
        "The two companies are relative newcomers to the market."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'gallon',
    level: 'B1',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈɡælən/',
    ipa_us: '/ˈɡælən/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a unit of measurement for liquids, equal to about 3.8 liters",
              "th": "หน่วยวัดของเหลวเท่ากับประมาณ 3.8 ลิตร"
        }
  ],
    antonyms: ["milliliter","ounce"],
    examples:   [
        "The car's gas tank holds about 15 gallons of fuel.",
        "The water bottle can hold a gallon of water.",
        "The recipe calls for a gallon of milk."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'discomfort',
    level: 'B1',
    partOfSpeech: ["noun"],
    ipa_uk: '/dɪsˈkʌmfət/',
    ipa_us: '/dɪsˈkʌmfət/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a feeling of being uncomfortable or uneasy",
              "th": "ความรู้สึกไม่สบายหรือไม่สบายใจ"
        }
  ],
    antonyms: ["comfort","relief"],
    examples:   [
        "The patient experienced discomfort after the surgery.",
        "The new shoes caused her discomfort and blisters.",
        "The noise in the room caused me discomfort and made it hard to focus."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'origin',
    level: 'B1',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈɒɹ.ə.dʒən/',
    ipa_us: '/ˈɒɹ.ə.dʒən/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the point or place where something begins or is created",
              "th": "จุดหรือสถานที่ที่สิ่งใดสิ่งหนึ่งเริ่มต้นหรือถูกสร้างขึ้น"
        }
  ],
    antonyms: ["destination","ending"],
    examples:   [
        "The origin of the species is still a topic of debate.",
        "The company's origin dates back to the 19th century.",
        "The origin of the word is unclear, but it is thought to have come from Latin."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'sidewalk',
    level: 'B1',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈsaɪdwɔːk/',
    ipa_us: '/ˈsaɪdwɔːk/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a path for pedestrians at the side of a road",
              "th": "ทางเดินสำหรับคนเดินอยู่ด้านข้างถนน"
        }
  ],
    antonyms: ["highway","roadway"],
    examples:   [
        "The city is improving the sidewalks to make them more accessible.",
        "The sidewalk was crowded with people walking to work.",
        "The vendor was selling food on the sidewalk."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'lorry',
    level: 'B1',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈlɒɹi/',
    ipa_us: '/ˈlɒɹi/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a large vehicle for carrying goods, especially one with a flat bed and no roof",
              "th": "ยานพาหนะขนาดใหญ่สำหรับขนส่งสินค้า"
        }
  ],
    antonyms: ["car","motorcycle"],
    examples:   [
        "The lorry was parked on the side of the road.",
        "The company uses lorries to transport goods across the country.",
        "The lorry driver was tired after driving all night."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'paid',
    level: 'B1',
    partOfSpeech: ["verb"],
    ipa_uk: '/ˈpeɪd/',
    ipa_us: '/ˈpeɪd/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to give someone money for something",
              "th": "จ่ายเงินให้ใครสักคนสำหรับสิ่งใดสิ่งหนึ่ง"
        }
  ],
    antonyms: ["unpaid","owed"],
    examples:   [
        "I paid the bill with my credit card.",
        "She paid the taxi driver and got out of the cab.",
        "The company paid its employees a bonus at the end of the year."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'souvenir',
    level: 'B1',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˌsuːvəˈnɪə(ɹ)/',
    ipa_us: '/ˌsuːvəˈnɪə(ɹ)/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a thing that you buy or keep to remind you of a holiday or a special place",
              "th": "สิ่งที่คุณซื้อหรือเก็บไว้เพื่อระลึกถึงวันหยุดหรือสถานที่พิเศษ"
        }
  ],
    antonyms: ["heirloom","keepsake"],
    examples:   [
        "I bought a souvenir t-shirt at the beach.",
        "The souvenir shop was filled with all sorts of trinkets and mementos.",
        "The souvenir from my trip to Paris is a beautiful painting."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'enthusiastic',
    level: 'B1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ɪnˌθjuːzɪˈæstɪk/',
    ipa_us: '/ɪnˌθjuːzɪˈæstɪk/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "feeling or showing a lot of excitement and interest",
              "th": "รู้สึกหรือแสดงออกถึงความตื่นเต้นและความสนใจ"
        }
  ],
    antonyms: ["apathetic","unenthusiastic"],
    examples:   [
        "The enthusiastic crowd cheered on their favorite team.",
        "She was enthusiastic about her new job and was eager to start.",
        "The enthusiastic teacher made the lesson fun and engaging."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'unwell',
    level: 'B1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ʌnˈwɛl/',
    ipa_us: '/ʌnˈwɛl/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "not in good health",
              "th": "ไม่สบาย"
        }
  ],
    antonyms: ["well","healthy"],
    examples:   [
        "I'm feeling unwell and need to stay in bed.",
        "She was unwell and couldn't attend the meeting.",
        "The patient was unwell and required immediate medical attention."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'resemble',
    level: 'B1',
    partOfSpeech: ["verb"],
    ipa_uk: '/ɹɪˈzɛmb(ə)l/',
    ipa_us: '/ɹɪˈzɛmb(ə)l/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to look or seem like someone or something else",
              "th": "มีลักษณะหรือดูเหมือนกับคนหรือสิ่งอื่น"
        }
  ],
    antonyms: ["differ","contrast"],
    examples:   [
        "The twins resemble each other closely.",
        "The new policy resembles the one that was introduced last year.",
        "The painting resembles a photograph in its level of detail."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'tragic',
    level: 'B1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈtɹædʒɪk/',
    ipa_us: '/ˈtɹædʒɪk/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "causing or characterized by great sadness or suffering",
              "th": "ทำให้เกิดหรือมีลักษณะของความเสียใจหรือทุกข์ทรมานอย่างมาก"
        }
  ],
    antonyms: ["happy","fortunate"],
    examples:   [
        "The tragic accident resulted in the loss of many lives.",
        "The tragic story of the hero's downfall was told in the play.",
        "The tragic event had a profound impact on the community."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'isle',
    level: 'B1',
    partOfSpeech: ["noun"],
    ipa_uk: '/aɪ̯l/',
    ipa_us: '/aɪ̯l/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a small island",
              "th": "เกาะเล็ก"
        }
  ],
    antonyms: ["continent","mainland"],
    examples:   [
        "The isle was a popular destination for honeymooners.",
        "The isle of Skye is known for its rugged landscape and picturesque villages.",
        "The isle was surrounded by crystal-clear waters and coral reefs."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'tie',
    level: 'B1',
    partOfSpeech: ["noun","verb"],
    ipa_uk: '/taɪ/',
    ipa_us: '/taɪ/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a long, narrow piece of cloth worn around the neck",
              "th": "ผ้าผืนยาวและแคบที่สวมรอบคอ"
        },
        {
              "pos": "verb",
              "en": "to fasten or connect something with a string or cord",
              "th": "มัดหรือเชื่อมสิ่งใดสิ่งหนึ่งด้วยเชือกหรือเส้นด้าย"
        }
  ],
    antonyms: ["untie","loosen"],
    examples:   [
        "I need to tie my shoelaces before I go for a run.",
        "The tie was a gift from my grandmother.",
        "The two teams were tied at the end of the game, so they had to play overtime."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'main',
    level: 'B1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/meɪn/',
    ipa_us: '/meɪn/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "most important or principal",
              "th": "สำคัญที่สุดหรือหลัก"
        }
  ],
    antonyms: ["secondary","minor"],
    examples:   [
        "The main reason for my trip was to visit my family.",
        "The main course was a delicious steak with roasted vegetables.",
        "The main street of the town was lined with shops and restaurants."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'feast',
    level: 'B1',
    partOfSpeech: ["noun","verb"],
    ipa_uk: '/fiːst/',
    ipa_us: '/fiːst/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a large and special meal, often to celebrate a particular occasion",
              "th": "อาหารที่ใหญ่และพิเศษ บ่อยครั้งเพื่อเฉลิมฉลองในโอกาสพิเศษ"
        },
        {
              "pos": "verb",
              "en": "to eat a large and enjoyable meal",
              "th": "รับประทานอาหารที่ใหญ่และน่าพึงพอใจ"
        }
  ],
    antonyms: ["fast","abstain"],
    examples:   [
        "The family gathered for a feast on Thanksgiving Day.",
        "The couple decided to feast on their favorite foods on their anniversary.",
        "The king and his guests feasted on roasted meats and sweet pastries."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },

  {
    word: 'behest',
    level: 'C2',
    partOfSpeech: ["noun"],
    ipa_uk: '/biˈhɛst/',
    ipa_us: '/biˈhɛst/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a formal or authoritative order or request",
              "th": "คำสั่งหรือคำขออย่างเป็นทางการ"
        }
  ],
    antonyms: ["refusal","rejection"],
    examples:   [
        "The king acted at the behest of his advisors.",
        "She did it at his behest, not because she wanted to.",
        "The company made the decision at the behest of its shareholders."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'depraved',
    level: 'C2',
    partOfSpeech: ["adjective"],
    ipa_uk: '/dɪˈpɹeɪvd/',
    ipa_us: '/dɪˈpɹeɪvd/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "morally corrupt or wicked",
              "th": "เสื่อมเสียหรือชั่วร้ายทางศีลธรรม"
        }
  ],
    antonyms: ["virtuous","moral"],
    examples:   [
        "The depraved actions of the criminal shocked the community.",
        "He was known for his depraved sense of humor.",
        "The depraved conditions in the prison were inhumane."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'amorphous',
    level: 'C2',
    partOfSpeech: ["adjective"],
    ipa_uk: '/əˈmɔɹfəs/',
    ipa_us: '/əˈmɔɹfəs/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "lacking a clear or definite shape or form",
              "th": "ไม่มีรูปร่างหรือรูปแบบที่ชัดเจน"
        }
  ],
    antonyms: ["defined","structured"],
    examples:   [
        "The amorphous mass of cells grew rapidly.",
        "The company's amorphous organizational structure made it hard to navigate.",
        "The amorphous nature of the cloud made it difficult to predict its behavior."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'remorseful',
    level: 'C2',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ɹɪˈmɔː(ɹ)sfʊl/',
    ipa_us: '/ɹɪˈmɔː(ɹ)sfʊl/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "feeling or showing regret or guilt for something",
              "th": "รู้สึกหรือแสดงความเสียใจหรือความผิดสำหรับบางสิ่ง"
        }
  ],
    antonyms: ["unrepentant","unremorseful"],
    examples:   [
        "He was remorseful for his actions and apologized to the victim.",
        "She felt remorseful for not visiting her grandmother more often.",
        "The remorseful expression on his face showed that he was truly sorry."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'exalted',
    level: 'C2',
    partOfSpeech: ["adjective","verb"],
    ipa_uk: '/ɪɡˈzɔːltɪd/',
    ipa_us: '/ɪɡˈzɔːltɪd/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "very great or impressive",
              "th": "ยิ่งใหญ่หรือน่าประทับใจมาก"
        },
        {
              "pos": "verb",
              "en": "to raise or elevate something or someone to a higher position or status",
              "th": "ยกหรือเลื่อนตำแหน่งบางสิ่งหรือบางคนไปสู่ตำแหน่งหรือสถานะที่สูงกว่า"
        }
  ],
    antonyms: ["humble","lowly"],
    examples:   [
        "The exalted position of the CEO came with a lot of responsibility.",
        "The exalted language used in the poem made it hard to understand.",
        "The exalted status of the artist was reflected in the high price of his paintings."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'rebuke',
    level: 'C2',
    partOfSpeech: ["verb","noun"],
    ipa_uk: '/ɹiˈbjuːk/',
    ipa_us: '/ɹiˈbjuːk/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to criticize or scold someone for something",
              "th": "วิพากษ์วิจารณ์หรือต่อว่าบางคนสำหรับบางสิ่ง"
        },
        {
              "pos": "noun",
              "en": "a criticism or scolding",
              "th": "คำวิพากษ์วิจารณ์หรือคำต่อว่า"
        }
  ],
    antonyms: ["praise","commend"],
    examples:   [
        "The teacher rebuked the student for talking out of turn.",
        "The rebuke from the boss was harsh but fair.",
        "The company issued a public rebuke to the employee for his actions."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'assimilation',
    level: 'C2',
    partOfSpeech: ["noun"],
    ipa_uk: '/əˌsɪməˈleɪʃən/',
    ipa_us: '/əˌsɪməˈleɪʃən/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the process of becoming similar to something or someone else",
              "th": "กระบวนการของการกลายเป็นเหมือนกับบางสิ่งหรือบางคน"
        }
  ],
    antonyms: ["differentiation","separation"],
    examples:   [
        "The assimilation of the new employee into the company culture took time.",
        "The assimilation of the immigrant community into the host country was a slow process.",
        "The assimilation of the new technology into the existing system was seamless."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'mariner',
    level: 'C2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈmæɹɪnə/',
    ipa_us: '/ˈmæɹɪnə/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a person who works on a ship, especially a sailor",
              "th": "คนงานบนเรือ โดยเฉพาะนักเดินเรือ"
        }
  ],
    antonyms: ["landlubber","inlander"],
    examples:   [
        "The mariner had spent his entire life at sea.",
        "The mariner's skills were essential for navigating the treacherous waters.",
        "The mariner's tale of adventure and bravery inspired the young boy."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'consternation',
    level: 'C2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˌkɒn.stəˈneɪ.ʃən/',
    ipa_us: '/ˌkɒn.stəˈneɪ.ʃən/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a feeling of shock, amazement, or dismay",
              "th": "ความรู้สึกของความตกใจ ความประหลาดใจ หรือความเสียใจ"
        }
  ],
    antonyms: ["delight","pleasure"],
    examples:   [
        "The news of the natural disaster caused consternation around the world.",
        "The consternation on her face was evident when she heard the bad news.",
        "The consternation among the investors was palpable when the stock market crashed."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'articulate',
    level: 'C2',
    partOfSpeech: ["adjective","verb"],
    ipa_uk: '/ɑː(ɹ)ˈtɪk.jʊ.lət/',
    ipa_us: '/ɑː(ɹ)ˈtɪk.jʊ.lət/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "having a clear and effective way of expressing thoughts or ideas",
              "th": "มีวิธีการแสดงความคิดหรือความคิดเห็นที่ชัดเจนและมีประสิทธิภาพ"
        },
        {
              "pos": "verb",
              "en": "to express or formulate a thought or idea clearly",
              "th": "แสดงหรือสร้างความคิดหรือความคิดเห็นอย่างชัดเจน"
        }
  ],
    antonyms: ["inarticulate","mute"],
    examples:   [
        "The articulate speaker was able to convey her message effectively.",
        "He was articulate about his feelings and was able to express them clearly.",
        "The articulate writing style of the author made the complex topic easy to understand."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'ruminant',
    level: 'C2',
    partOfSpeech: ["adjective","noun"],
    ipa_uk: '/ˈɹuːmɪnənt/',
    ipa_us: '/ˈɹuːmɪnənt/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "eating and digesting plant-based food, especially grasses and other tough vegetation",
              "th": "กินและย่อยอาหารที่มาจากพืช โดยเฉพาะหญ้าและพืชที่มีความทนทานอื่นๆ"
        },
        {
              "pos": "noun",
              "en": "an animal that eats and digests plant-based food, especially grasses and other tough vegetation",
              "th": "สัตว์ที่กินและย่อยอาหารที่มาจากพืช โดยเฉพาะหญ้าและพืชที่มีความทนทานอื่นๆ"
        }
  ],
    antonyms: ["carnivorous","omnivorous"],
    examples:   [
        "Cows are ruminant animals and have a four-chambered stomach.",
        "The ruminant nature of the deer allowed it to survive on a diet of twigs and leaves.",
        "The ruminant digestive system of the goat was adapted to break down cellulose in plant cell walls."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'spontaneity',
    level: 'C2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈspɒn.tə.neɪ.ə.ti/',
    ipa_us: '/ˈspɒn.tə.neɪ.ə.ti/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the quality of being spontaneous or happening without prior planning",
              "th": "คุณสมบัติของการเกิดขึ้นโดยไม่ได้มีการวางแผนล่วงหน้า"
        }
  ],
    antonyms: ["premeditation","deliberation"],
    examples:   [
        "The spontaneity of the moment made it unforgettable.",
        "The spontaneity of the child's laughter was infectious.",
        "The spontaneity of the improvisational performance was impressive."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'vestigial',
    level: 'C2',
    partOfSpeech: ["adjective"],
    ipa_uk: '/vɛˈstɪdʒəl/',
    ipa_us: '/vɛˈstɪdʒəl/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "remaining or surviving from an earlier time or stage of development",
              "th": "ยังคงอยู่หรือรอดจากช่วงเวลาก่อนหน้าหรือระยะการพัฒนา"
        }
  ],
    antonyms: ["modern","contemporary"],
    examples:   [
        "The vestigial tailbone in humans is a remnant of our evolutionary past.",
        "The vestigial remains of the ancient civilization were discovered in the desert.",
        "The vestigial language of the indigenous people was still spoken by a few elders."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'facsimile',
    level: 'C2',
    partOfSpeech: ["noun"],
    ipa_uk: '/fækˈsɪm.ə.li/',
    ipa_us: '/fækˈsɪm.ə.li/',
    meanings:   [
        {
              "pos": "noun",
              "en": "an exact copy or reproduction of something",
              "th": "สำเนาที่ถูกต้องหรือการทำซ้ำของบางสิ่ง"
        }
  ],
    antonyms: ["original","genuine"],
    examples:   [
        "The facsimile of the ancient manuscript was used for study purposes.",
        "The facsimile of the famous painting was almost indistinguishable from the real thing.",
        "The company produced a facsimile of the popular toy, but it was not as well-made."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },

  {
    word: 'muse',
    level: 'B2',
    partOfSpeech: ["noun","verb [T]"],
    ipa_uk: '/mjuːz/',
    ipa_us: '/mjuːz/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a person, especially a woman, who inspires a particular artist or writer",
              "th": "คนหรือสิ่งที่สร้างแรงบันดาลใจให้กับศิลปินหรือนักเขียน"
        },
        {
              "pos": "verb [T]",
              "en": "to think carefully and thoroughly about something",
              "th": "คิดอย่างรอบคอบและลึกซึ้งเกี่ยวกับเรื่องใดเรื่องหนึ่ง"
        }
  ],
    antonyms: ["distract","ignore"],
    examples:   [
        "The beautiful scenery was a muse for the young painter.",
        "She likes to muse about life and its meaning.",
        "The poet's muse was his beloved wife."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'spectacle',
    level: 'B2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈspɛktəkl̩/',
    ipa_us: '/ˈspɛktəkl̩/',
    meanings:   [
        {
              "pos": "noun",
              "en": "an unusual or impressive sight",
              "th": "สิ่งที่มองเห็นได้ซึ่งไม่ธรรมดาหรือทำให้ประทับใจ"
        }
  ],
    antonyms: ["normality","ordinariness"],
    examples:   [
        "The fireworks display was a spectacle that amazed the crowd.",
        "The city's skyline is a spectacle at sunset.",
        "The parade was a spectacle of music, dance, and colorful costumes."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'interpretation',
    level: 'B2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ɪntəpɹəˈteɪʃən/',
    ipa_us: '/ɪntəpɹəˈteɪʃən/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the act or process of explaining the meaning of something",
              "th": "การกระทำหรือกระบวนการอธิบายความหมายของสิ่งใดสิ่งหนึ่ง"
        }
  ],
    antonyms: ["misinterpretation","confusion"],
    examples:   [
        "The interpretation of the poem's meaning varied among the readers.",
        "The art critic's interpretation of the painting was insightful.",
        "The court's interpretation of the law was controversial."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'undoubtedly',
    level: 'B2',
    partOfSpeech: ["adverb"],
    ipa_uk: '/ʌnˈdaʊtɪdli/',
    ipa_us: '/ʌnˈdaʊtɪdli/',
    meanings:   [
        {
              "pos": "adverb",
              "en": "without any doubt",
              "th": "โดยไม่มีข้อสงสัย"
        }
  ],
    antonyms: ["doubtfully","questionably"],
    examples:   [
        "She is undoubtedly the most talented singer in the competition.",
        "He will undoubtedly succeed in his new business venture.",
        "The new policy will undoubtedly improve the company's efficiency."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'snap',
    level: 'B2',
    partOfSpeech: ["verb [I/T]","noun"],
    ipa_uk: '/snæp/',
    ipa_us: '/snæp/',
    meanings:   [
        {
              "pos": "verb [I/T]",
              "en": "to break or cause something to break suddenly",
              "th": "แตกหรือทำให้สิ่งใดสิ่งหนึ่งแตกอย่าง突然"
        },
        {
              "pos": "noun",
              "en": "a sudden, sharp noise",
              "th": "เสียงที่ดังและชัดเจน"
        }
  ],
    antonyms: ["attach","fasten"],
    examples:   [
        "The twig snapped in two when I bent it.",
        "She snapped a photo of the beautiful scenery.",
        "The firework snapped loudly in the night sky."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'thrilling',
    level: 'B2',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈθɹɪlɪŋ/',
    ipa_us: '/ˈθɹɪlɪŋ/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "extremely exciting or enjoyable",
              "th": "น่าตื่นเต้นหรือสนุกสนานอย่างมาก"
        }
  ],
    antonyms: ["boring","dull"],
    examples:   [
        "The thrilling rollercoaster ride was the highlight of the day.",
        "The movie was so thrilling that I watched it twice.",
        "The thrilling music made me want to dance all night."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'affectionately',
    level: 'B2',
    partOfSpeech: ["adverb"],
    ipa_uk: '/əˈfɛkʃənətli/',
    ipa_us: '/əˈfɛkʃənətli/',
    meanings:   [
        {
              "pos": "adverb",
              "en": "in a loving or fond manner",
              "th": "ด้วยความรักหรือความเอาใจใส่"
        }
  ],
    antonyms: ["coldly","distantly"],
    examples:   [
        "She spoke affectionately about her childhood memories.",
        "He looked at his wife affectionately and smiled.",
        "The old couple held hands affectionately as they walked."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'delicately',
    level: 'B2',
    partOfSpeech: ["adverb"],
    ipa_uk: '/ˈdɛlɪkətli/',
    ipa_us: '/ˈdɛlɪkətli/',
    meanings:   [
        {
              "pos": "adverb",
              "en": "in a careful and subtle manner",
              "th": "ด้วยความระมัดระวังและอ่อนไหว"
        }
  ],
    antonyms: ["roughly","coarsely"],
    examples:   [
        "The surgeon operated delicately to avoid damaging the surrounding tissue.",
        "She handled the fragile vase delicately to avoid breaking it.",
        "The artist painted the flowers delicately to capture their beauty."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'cone',
    level: 'B2',
    partOfSpeech: ["noun"],
    ipa_uk: '/kəʊn/',
    ipa_us: '/kəʊn/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a shape that is narrow at the top and wider at the bottom",
              "th": "รูปทรงที่แคบด้านบนและกว้างด้านล่าง"
        }
  ],
    antonyms: ["cylinder","sphere"],
    examples:   [
        "The ice cream cone was filled with her favorite flavor.",
        "The volcano's shape was like a cone.",
        "The traffic cone was used to divert the traffic."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'veteran',
    level: 'B2',
    partOfSpeech: ["noun","adjective"],
    ipa_uk: '[ˈvɛ.t̬ə.ɹən]',
    ipa_us: '[ˈvɛ.t̬ə.ɹən]',
    meanings:   [
        {
              "pos": "noun",
              "en": "a person who has a lot of experience in a particular field or activity",
              "th": "บุคคลที่มีประสบการณ์มากมายในด้านใดด้านหนึ่งหรือกิจกรรมใดกิจกรรมหนึ่ง"
        },
        {
              "pos": "adjective",
              "en": "having a lot of experience in a particular field or activity",
              "th": "มีประสบการณ์มากมายในด้านใดด้านหนึ่งหรือกิจกรรมใดกิจกรรมหนึ่ง"
        }
  ],
    antonyms: ["novice","amateur"],
    examples:   [
        "The veteran actor had been in the industry for over 30 years.",
        "She is a veteran of the marketing world.",
        "The veteran soldier was honored for his bravery."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'bartender',
    level: 'B2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈbɑːˌtɛndə(ɹ)/',
    ipa_us: '/ˈbɑːˌtɛndə(ɹ)/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a person who serves drinks in a bar or pub",
              "th": "บุคคลที่เสิร์ฟเครื่องดื่มในบาร์หรือผับ"
        }
  ],
    antonyms: ["customer","patron"],
    examples:   [
        "The bartender was friendly and made great cocktails.",
        "She worked as a bartender to pay for her college tuition.",
        "The bartender was skilled at making intricate designs on the drinks."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'transitive',
    level: 'B2',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈtɹænzɪtɪv/',
    ipa_us: '/ˈtɹænzɪtɪv/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "(of a verb) taking an object",
              "th": "(ของกริยา) ที่มีกรรม"
        }
  ],
    antonyms: ["intransitive","passive"],
    examples:   [
        "The verb 'eat' is transitive because it takes an object, such as 'food'.",
        "The sentence 'She wrote a letter' contains a transitive verb.",
        "The verb 'throw' is transitive because it requires a direct object."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'underwear',
    level: 'B2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈʌndəwɛə/',
    ipa_us: '/ˈʌndəwɛə/',
    meanings:   [
        {
              "pos": "noun",
              "en": "clothes worn next to the skin under other clothes",
              "th": "เสื้อผ้าที่สวมใส่ใกล้กับผิวหนังใต้เสื้อผ้าอื่น"
        }
  ],
    antonyms: ["outerwear","overclothes"],
    examples:   [
        "She bought a new set of underwear to match her favorite dress.",
        "He forgot to pack underwear for the trip.",
        "The store sold a variety of underwear for men and women."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'that',
    level: 'B2',
    partOfSpeech: ["pronoun","adverb","conjunction"],
    ipa_uk: '/ˈðæt/',
    ipa_us: '/ˈðæt/',
    meanings:   [
        {
              "pos": "pronoun",
              "en": "used to indicate a person, thing, or idea previously mentioned",
              "th": "ใช้เพื่อแสดงถึงบุคคล สิ่ง หรือความคิดที่กล่าวถึงก่อนหน้านี้"
        },
        {
              "pos": "adverb",
              "en": "to a certain extent or degree",
              "th": "ในระดับหรือปริมาณที่แน่นอน"
        },
        {
              "pos": "conjunction",
              "en": "used to introduce a subordinate clause",
              "th": "ใช้เพื่อนำ предложี ย่อย"
        }
  ],
    antonyms: ["this","these"],
    examples:   [
        "I like that book, can I borrow it?",
        "That is the best restaurant in town.",
        "I'm going to the store, and that is where I'll meet you."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'hint',
    level: 'B2',
    partOfSpeech: ["noun","verb [T]"],
    ipa_uk: '/hɪnt/',
    ipa_us: '/hɪnt/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a slight or indirect suggestion",
              "th": "คำแนะนำที่ไม่ชัดเจนหรือไม่ตรงไปตรงมา"
        },
        {
              "pos": "verb [T]",
              "en": "to give a slight or indirect suggestion",
              "th": "ให้คำแนะนำที่ไม่ชัดเจนหรือไม่ตรงไปตรงมา"
        }
  ],
    antonyms: ["declare","state"],
    examples:   [
        "She gave me a hint about the surprise party.",
        "The teacher hinted that the exam would be difficult.",
        "The detective tried to hint to the suspect that they knew more than they were letting on."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'furious',
    level: 'B2',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈfjʊə.ɹɪəs/',
    ipa_us: '/ˈfjʊə.ɹɪəs/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "extremely angry",
              "th": "โกรธมาก"
        }
  ],
    antonyms: ["calm","peaceful"],
    examples:   [
        "The furious driver honked his horn at the slow traffic.",
        "She was furious when she found out about the betrayal.",
        "The furious storm destroyed several houses in the neighborhood."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'ethnic',
    level: 'B2',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈɛθ.nɪk/',
    ipa_us: '/ˈɛθ.nɪk/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "relating to a particular group of people who share a common culture, language, or nationality",
              "th": "เกี่ยวข้องกับกลุ่มคนใดกลุ่มหนึ่งที่มีวัฒนธรรม ภาษา หรือสัญชาติเดียวกัน"
        }
  ],
    antonyms: ["national","cultural"],
    examples:   [
        "The ethnic diversity of the city is reflected in its cuisine.",
        "The ethnic minority group faced discrimination and prejudice.",
        "The festival celebrated the ethnic heritage of the community."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'foul',
    level: 'B2',
    partOfSpeech: ["adjective","noun","verb [T]"],
    ipa_uk: '/faʊl/',
    ipa_us: '/faʊl/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "unpleasant or disgusting",
              "th": "ไม่น่าดูหรือไม่น่ารับประทาน"
        },
        {
              "pos": "noun",
              "en": "a breach of the rules in a game or sport",
              "th": "การละเมิดกฎในเกมหรือกีฬา"
        },
        {
              "pos": "verb [T]",
              "en": "to commit a foul in a game or sport",
              "th": "ทำผิดกฎในเกมหรือกีฬา"
        }
  ],
    antonyms: ["fair","clean"],
    examples:   [
        "The foul smell from the garbage made me nauseous.",
        "The referee called a foul on the player for tripping.",
        "The company was fined for its foul practices."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'impartial',
    level: 'B2',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ɪmˈpɑɹ.ʃəl/',
    ipa_us: '/ɪmˈpɑɹ.ʃəl/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "not taking sides or showing bias",
              "th": "ไม่เข้าข้างหรือแสดงความลำเอียง"
        }
  ],
    antonyms: ["biased","partial"],
    examples:   [
        "The judge tried to remain impartial during the trial.",
        "The impartial observer reported the facts without opinion.",
        "The impartial jury delivered a verdict based on the evidence."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },

  {
    word: 'remedial',
    level: 'C1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ɹɪˈmiːdɪəl/',
    ipa_us: '/ɹɪˈmiːdɪəl/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "intended to correct or improve something",
              "th": "ที่มีจุดมุ่งหมายเพื่อแก้ไขหรือปรับปรุงสิ่งใดสิ่งหนึ่ง"
        }
  ],
    antonyms: ["harmful","detrimental"],
    examples:   [
        "The school offers remedial classes for students who are struggling with math.",
        "The new policy is intended to have a remedial effect on the economy.",
        "The doctor prescribed remedial exercise to help the patient recover from the injury."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'haggle',
    level: 'C1',
    partOfSpeech: ["verb"],
    ipa_uk: '/ˈhæɡəl/',
    ipa_us: '/ˈhæɡəl/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to argue or bargain about the price of something",
              "th": "โต้แย้งหรือต่อรองเกี่ยวกับราคาของสิ่งใดสิ่งหนึ่ง"
        }
  ],
    antonyms: ["accept","agree"],
    examples:   [
        "I had to haggle with the vendor to get a good price for the souvenir.",
        "The customer tried to haggle with the salesperson, but they wouldn't budge.",
        "You have to be prepared to haggle when shopping at a market in some countries."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'closeness',
    level: 'C1',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈkləʊsnəs/',
    ipa_us: '/ˈkləʊsnəs/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the state of being close or intimate",
              "th": "สภาพของการอยู่ใกล้หรือสนิทสนม"
        }
  ],
    antonyms: ["distance","separation"],
    examples:   [
        "The closeness between the two friends was palpable.",
        "The family's closeness was evident in the way they supported each other.",
        "The closeness of the relationship made it difficult for them to say goodbye."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'muscular',
    level: 'C1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈmʌs.kjə.lə/',
    ipa_us: '/ˈmʌs.kjə.lə/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "having well-developed muscles",
              "th": "มีกล้ามเนื้อที่พัฒนาแล้ว"
        }
  ],
    antonyms: ["weak","frail"],
    examples:   [
        "The muscular build of the athlete was impressive.",
        "The muscular tone of the model's body was evident in the photo shoot.",
        "Regular exercise helped him develop a more muscular physique."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'profound',
    level: 'C1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/pɹəˈfaʊnd/',
    ipa_us: '/pɹəˈfaʊnd/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "very great or intense",
              "th": "มากหรือเข้มข้น"
        }
  ],
    antonyms: ["superficial","shallow"],
    examples:   [
        "The professor's words had a profound impact on the students.",
        "The book's themes were profound and thought-provoking.",
        "The experience had a profound effect on her, changing her perspective on life."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'portrayal',
    level: 'C1',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˌpɔɹˈtɹeɪ.əl/',
    ipa_us: '/ˌpɔɹˈtɹeɪ.əl/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the act of describing or representing someone or something",
              "th": "การอธิบายหรือแสดงถึงใครบางคนหรือสิ่งใด"
        }
  ],
    antonyms: ["misrepresentation","distortion"],
    examples:   [
        "The portrayal of the character in the movie was inaccurate.",
        "The artist's portrayal of the landscape was breathtaking.",
        "The media's portrayal of the event was biased and misleading."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'bloom',
    level: 'C1',
    partOfSpeech: ["verb"],
    ipa_uk: '/bluːm/',
    ipa_us: '/bluːm/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to produce flowers",
              "th": "ผลิตดอกไม้"
        }
  ],
    antonyms: ["wither","die"],
    examples:   [
        "The flowers will bloom in the spring.",
        "The tree began to bloom after the warm weather.",
        "The garden was full of colorful flowers that bloom in the summer."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'protagonist',
    level: 'C1',
    partOfSpeech: ["noun"],
    ipa_uk: '/pɹəˈtæ.ɡə.nɪst/',
    ipa_us: '/pɹəˈtæ.ɡə.nɪst/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the main character in a story or play",
              "th": "ตัวละครหลักในเรื่องหรือละคร"
        }
  ],
    antonyms: ["antagonist","villain"],
    examples:   [
        "The protagonist of the novel was a young woman named Sarah.",
        "The protagonist's journey was the central theme of the story.",
        "The actor played the protagonist in the movie, and his performance was praised."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'versatility',
    level: 'C1',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˌvəɹsəˈtɪlɪti/',
    ipa_us: '/ˌvəɹsəˈtɪlɪti/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the ability to do many different things",
              "th": "ความสามารถในการทำสิ่งต่างๆ มากมาย"
        }
  ],
    antonyms: ["limitation","restriction"],
    examples:   [
        "The versatility of the tool made it useful for many tasks.",
        "The actor's versatility allowed her to play a wide range of roles.",
        "The versatility of the language made it easy to learn and use."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'persecute',
    level: 'C1',
    partOfSpeech: ["verb"],
    ipa_uk: '/ˈpəːsɪkjuːt/',
    ipa_us: '/ˈpəːsɪkjuːt/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to treat someone unfairly or cruelly, especially because of their race, religion, or beliefs",
              "th": "ปฏิบัติต่อใครบางคนอย่างไม่ยุติธรรมหรือโหดร้าย โดยเฉพาะอย่างยิ่งเนื่องจากเชื้อชาติ ศาสนา หรือความเชื่อ"
        }
  ],
    antonyms: ["protect","support"],
    examples:   [
        "The minority group was persecuted by the government.",
        "The company was accused of persecuting its employees who belonged to a certain union.",
        "The dictator persecuted anyone who opposed his regime."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'refurbish',
    level: 'C1',
    partOfSpeech: ["verb"],
    ipa_uk: '/ɹiːˈfɜːbɪʃ/',
    ipa_us: '/ɹiːˈfɜːbɪʃ/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to repair or renovate something, especially a building",
              "th": "ซ่อมแซมหรือปรับปรุงสิ่งใดสิ่งหนึ่ง โดยเฉพาะอาคาร"
        }
  ],
    antonyms: ["demolish","destroy"],
    examples:   [
        "The old hotel was refurbished and reopened as a luxury resort.",
        "The company decided to refurbish the office building instead of moving to a new location.",
        "The city plans to refurbish the park and add new amenities."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'farce',
    level: 'C1',
    partOfSpeech: ["noun"],
    ipa_uk: '/fɑːs/',
    ipa_us: '/fɑːs/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a comedic play or situation that is absurd or ridiculous",
              "th": "การแสดงตลกหรือสถานการณ์ที่เป็นเรื่องขบขันหรือน่าหัวเราะ"
        }
  ],
    antonyms: ["tragedy","drama"],
    examples:   [
        "The play was a farce, with characters and situations that were completely absurd.",
        "The meeting turned into a farce, with everyone arguing and shouting.",
        "The movie was a farce, with a plot that was ridiculous and unbelievable."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'lethargy',
    level: 'C1',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈlɛθədʒi/',
    ipa_us: '/ˈlɛθədʒi/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a state of physical or mental inactivity",
              "th": "สภาพของการไม่เคลื่อนไหวหรือไม่ทำงานของกายหรือใจ"
        }
  ],
    antonyms: ["energy","vitality"],
    examples:   [
        "The patient's lethargy was a symptom of the illness.",
        "The team's lethargy in the second half of the game cost them the win.",
        "The cold weather induced a state of lethargy, making it hard to get out of bed."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'ecstasy',
    level: 'C1',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈɛk.stə.si/',
    ipa_us: '/ˈɛk.stə.si/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a state of intense happiness or excitement",
              "th": "สภาพของความสุขหรือตื่นเต้นที่เข้มข้น"
        }
  ],
    antonyms: ["agony","misery"],
    examples:   [
        "The crowd was in ecstasy as the concert began.",
        "The news of the engagement filled her with ecstasy.",
        "The beauty of the sunset filled him with ecstasy and a sense of wonder."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },

  {
    word: 'leisure',
    level: 'A2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈliːʒə(ɹ)/',
    ipa_us: '/ˈliːʒə(ɹ)/',
    meanings:   [
        {
              "pos": "noun",
              "en": "time when you are not working or doing anything you have to do",
              "th": "เวลาว่าง"
        }
  ],
    antonyms: ["work","busy"],
    examples:   [
        "I love spending my leisure time playing sports.",
        "She uses her leisure time to read books and watch movies.",
        "He prefers to spend his leisure time traveling to new places."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'repair',
    level: 'A2',
    partOfSpeech: ["verb","noun"],
    ipa_uk: '/ɹɪˈpɛə/',
    ipa_us: '/ɹɪˈpɛə/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to fix something that is broken or damaged",
              "th": "ซ่อม"
        },
        {
              "pos": "noun",
              "en": "the act of fixing something",
              "th": "การซ่อม"
        }
  ],
    antonyms: ["break","damage"],
    examples:   [
        "The mechanic will repair the car tomorrow.",
        "The company will repair the road next month.",
        "She needs to repair her bike before she can ride it again."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'one',
    level: 'A2',
    partOfSpeech: ["number","pronoun"],
    ipa_uk: '/wan/',
    ipa_us: '/wan/',
    meanings:   [
        {
              "pos": "number",
              "en": "the number 1",
              "th": "หนึ่ง"
        },
        {
              "pos": "pronoun",
              "en": "used to refer to a single person or thing",
              "th": "คนหรือสิ่งหนึ่ง"
        }
  ],
    antonyms: ["many","none"],
    examples:   [
        "I have one book in my bag.",
        "One of my friends is coming over tonight.",
        "This is one of the best restaurants in town."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'dream',
    level: 'A2',
    partOfSpeech: ["verb","noun"],
    ipa_uk: '/dɹiːm/',
    ipa_us: '/dɹiːm/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to have a series of images or thoughts in your mind while you are sleeping",
              "th": "ฝัน"
        },
        {
              "pos": "noun",
              "en": "a series of images or thoughts in your mind while you are sleeping",
              "th": "ความฝัน"
        }
  ],
    antonyms: ["reality","wakefulness"],
    examples:   [
        "I dreamt about flying last night.",
        "Her dream is to become a famous actress.",
        "He dreams of traveling the world one day."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'senior',
    level: 'A2',
    partOfSpeech: ["adjective","noun"],
    ipa_uk: '/ˈsiːnjə(r)/',
    ipa_us: '/ˈsiːnjə(r)/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "older or more experienced",
              "th": "อาวุโส"
        },
        {
              "pos": "noun",
              "en": "a person who is older or more experienced",
              "th": "ผู้อาวุโส"
        }
  ],
    antonyms: ["junior","younger"],
    examples:   [
        "The senior manager will make the final decision.",
        "She is a senior student at the university.",
        "The senior citizens' club meets every Thursday."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'secretary',
    level: 'A2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈsɛk.ɹə.tɹi/',
    ipa_us: '/ˈsɛk.ɹə.tɹi/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a person who works in an office, typing letters and answering phone calls",
              "th": "เลขานุการ"
        }
  ],
    antonyms: ["boss","manager"],
    examples:   [
        "The secretary will take notes during the meeting.",
        "She is the secretary of the company.",
        "The secretary will answer your questions."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'explanation',
    level: 'A2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˌɛkspləˈneɪʃən/',
    ipa_us: '/ˌɛkspləˈneɪʃən/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a statement that explains something",
              "th": "คำอธิบาย"
        }
  ],
    antonyms: ["question","confusion"],
    examples:   [
        "The teacher gave a clear explanation of the lesson.",
        "I didn't understand the explanation of the math problem.",
        "The company will provide an explanation for the delay."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'hike',
    level: 'A2',
    partOfSpeech: ["verb","noun"],
    ipa_uk: '/haɪk/',
    ipa_us: '/haɪk/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to walk in the countryside, especially in mountains or woods",
              "th": "เดินป่า"
        },
        {
              "pos": "noun",
              "en": "a long walk in the countryside",
              "th": "การเดินป่า"
        }
  ],
    antonyms: ["descend","rest"],
    examples:   [
        "We will hike to the top of the mountain tomorrow.",
        "The hike was more difficult than I expected.",
        "She loves to hike in the woods on the weekends."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'familiar',
    level: 'A2',
    partOfSpeech: ["adjective"],
    ipa_uk: '/fəˈmɪl.i.ə/',
    ipa_us: '/fəˈmɪl.i.ə/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "known or recognized",
              "th": "คุ้นเคย"
        }
  ],
    antonyms: ["unfamiliar","strange"],
    examples:   [
        "The song is familiar, but I don't know the title.",
        "She is familiar with the city, having lived there before.",
        "The smell of freshly baked cookies is familiar and comforting."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'sunlight',
    level: 'A2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈsʌnˌlaɪt/',
    ipa_us: '/ˈsʌnˌlaɪt/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the light and warmth that come from the sun",
              "th": "แสงแดด"
        }
  ],
    antonyms: ["darkness","shade"],
    examples:   [
        "The sunlight streaming through the window is beautiful.",
        "She loves to sit in the sunlight and read a book.",
        "The sunlight makes the flowers bloom."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'mix',
    level: 'A2',
    partOfSpeech: ["verb","noun"],
    ipa_uk: '/ˈmɪks/',
    ipa_us: '/ˈmɪks/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to combine two or more things",
              "th": "ผสม"
        },
        {
              "pos": "noun",
              "en": "a combination of two or more things",
              "th": "ส่วนผสม"
        }
  ],
    antonyms: ["separate","divide"],
    examples:   [
        "Can you mix the paint for me?",
        "The mix of music at the party was great.",
        "She likes to mix different ingredients to create a new recipe."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'shampoo',
    level: 'A2',
    partOfSpeech: ["noun","verb"],
    ipa_uk: '/ʃamˈpuː/',
    ipa_us: '/ʃamˈpuː/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a liquid soap for washing hair",
              "th": "แชมพู"
        },
        {
              "pos": "verb",
              "en": "to wash your hair with shampoo",
              "th": "ล้างผม"
        }
  ],
    antonyms: ["conditioner","dry"],
    examples:   [
        "I need to buy some shampoo for my hair.",
        "She shampoos her hair every morning.",
        "The shampoo is gentle and suitable for all hair types."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'produce',
    level: 'A2',
    partOfSpeech: ["verb","noun"],
    ipa_uk: '/pɹəˈdjuːs/',
    ipa_us: '/pɹəˈdjuːs/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to make or create something",
              "th": "ผลิต"
        },
        {
              "pos": "noun",
              "en": "fresh fruit and vegetables",
              "th": "ผลผลิต"
        }
  ],
    antonyms: ["consume","destroy"],
    examples:   [
        "The company will produce a new product next year.",
        "The farm produces fresh produce every day.",
        "She loves to produce music and sing."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'unknown',
    level: 'A2',
    partOfSpeech: ["adjective","noun"],
    ipa_uk: '/ʌnˈnəʊn/',
    ipa_us: '/ʌnˈnəʊn/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "not known or familiar",
              "th": "ไม่ทราบ"
        },
        {
              "pos": "noun",
              "en": "a person or thing that is not known",
              "th": "สิ่งที่ไม่ทราบ"
        }
  ],
    antonyms: ["known","familiar"],
    examples:   [
        "The unknown artist became famous overnight.",
        "The unknown variable in the equation is x.",
        "She is afraid of the unknown."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'east',
    level: 'A2',
    partOfSpeech: ["noun","adverb"],
    ipa_uk: '/iːst/',
    ipa_us: '/iːst/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the direction of the rising sun",
              "th": "ทิศตะวันออก"
        },
        {
              "pos": "adverb",
              "en": "in or towards the east",
              "th": "ไปทางทิศตะวันออก"
        }
  ],
    antonyms: ["west","south"],
    examples:   [
        "The sun rises in the east.",
        "The city is located in the east of the country.",
        "She is traveling east for the summer."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'opinion',
    level: 'A2',
    partOfSpeech: ["noun"],
    ipa_uk: '/əˈpɪnjən/',
    ipa_us: '/əˈpɪnjən/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a thought or belief about something",
              "th": "ความคิดเห็น"
        }
  ],
    antonyms: ["fact","truth"],
    examples:   [
        "I have a strong opinion about the new policy.",
        "Her opinion is different from mine.",
        "The expert's opinion is highly respected."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'specific',
    level: 'A2',
    partOfSpeech: ["adjective"],
    ipa_uk: '/spəˈsɪf.ɪk/',
    ipa_us: '/spəˈsɪf.ɪk/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "clearly and exactly defined or identified",
              "th": "เฉพาะเจาะจง"
        }
  ],
    antonyms: ["general","vague"],
    examples:   [
        "The specific instructions were easy to follow.",
        "She has a specific goal in mind.",
        "The company is looking for someone with specific skills."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'chart',
    level: 'A2',
    partOfSpeech: ["noun","verb"],
    ipa_uk: '/tʃɑːt/',
    ipa_us: '/tʃɑːt/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a table or graph that shows information in a clear and simple way",
              "th": "แผนภูมิ"
        },
        {
              "pos": "verb",
              "en": "to draw or plan something on a chart",
              "th": "วาดแผนภูมิ"
        }
  ],
    antonyms: ["guess","estimate"],
    examples:   [
        "The chart shows the sales figures for the past year.",
        "She will chart the course of the ship.",
        "The doctor will chart the patient's progress."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'dentist',
    level: 'A2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈdɛntɪst/',
    ipa_us: '/ˈdɛntɪst/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a person who is trained to care for teeth and gums",
              "th": "ทันตแพทย์"
        }
  ],
    antonyms: ["patient","nurse"],
    examples:   [
        "I need to make an appointment with the dentist.",
        "The dentist will examine my teeth.",
        "She wants to be a dentist when she grows up."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'fascinating',
    level: 'A2',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈfæsɪˌneɪtɪŋ/',
    ipa_us: '/ˈfæsɪˌneɪtɪŋ/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "very interesting or attractive",
              "th": "น่าดึงดูด"
        }
  ],
    antonyms: ["boring","uninteresting"],
    examples:   [
        "The documentary was fascinating.",
        "She finds the history of art fascinating.",
        "The city is fascinating, with its rich culture and architecture."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'automatic',
    level: 'A2',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˌɔːtəˈmætɪk/',
    ipa_us: '/ˌɔːtəˈmætɪk/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "working or done without being controlled by someone",
              "th": "อัตโนมัติ"
        }
  ],
    antonyms: ["manual","controlled"],
    examples:   [
        "The automatic door opened by itself.",
        "The camera has an automatic focus.",
        "The washing machine is automatic, so you just need to press a button."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'less',
    level: 'A2',
    partOfSpeech: ["adverb","determiner"],
    ipa_uk: '/lɛs/',
    ipa_us: '/lɛs/',
    meanings:   [
        {
              "pos": "adverb",
              "en": "to a smaller degree or amount",
              "th": "น้อยกว่า"
        },
        {
              "pos": "determiner",
              "en": "not as much or as many",
              "th": "ไม่มาก"
        }
  ],
    antonyms: ["more","greater"],
    examples:   [
        "I have less time than you do.",
        "She eats less than her brother.",
        "The new policy will result in less pollution."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'political',
    level: 'A2',
    partOfSpeech: ["adjective"],
    ipa_uk: '/pəˈlɪtɪkəl/',
    ipa_us: '/pəˈlɪtɪkəl/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "relating to politics or the government",
              "th": "การเมือง"
        }
  ],
    antonyms: ["non-political","neutral"],
    examples:   [
        "The political situation in the country is unstable.",
        "She is interested in political science.",
        "The company tries to stay out of political issues."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'quietly',
    level: 'A2',
    partOfSpeech: ["adverb"],
    ipa_uk: '/ˈkwaɪ.ɪt.li/',
    ipa_us: '/ˈkwaɪ.ɪt.li/',
    meanings:   [
        {
              "pos": "adverb",
              "en": "in a quiet way, without making much noise",
              "th": "อย่างเงียบๆ"
        }
  ],
    antonyms: ["loudly","noisily"],
    examples:   [
        "She spoke quietly so as not to wake the baby.",
        "The students worked quietly on their project.",
        "The cat walked quietly across the floor."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },

  {
    word: 'intensive',
    level: 'B1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ɪnˈtɛnsɪv/',
    ipa_us: '/ɪnˈtɛnsɪv/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "strong or extreme",
              "th": "เข้มข้น หรือรุนแรง"
        }
  ],
    antonyms: ["mild","weak"],
    examples:   [
        "The intensive training program helped me prepare for the marathon.",
        "She had an intensive conversation with her friend about the recent news.",
        "The doctor recommended an intensive course of treatment for the patient."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'launch',
    level: 'B1',
    partOfSpeech: ["verb","noun"],
    ipa_uk: '/lɔːnt͡ʃ/',
    ipa_us: '/lɔːnt͡ʃ/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to start something",
              "th": "เริ่มต้นสิ่งใดสิ่งหนึ่ง"
        },
        {
              "pos": "noun",
              "en": "the act of starting something",
              "th": "การเริ่มต้นสิ่งใดสิ่งหนึ่ง"
        }
  ],
    antonyms: ["end","stop"],
    examples:   [
        "The company will launch a new product next month.",
        "The spaceship is ready to launch into orbit.",
        "The event will launch with a grand opening ceremony."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'record',
    level: 'B1',
    partOfSpeech: ["verb","noun"],
    ipa_uk: '/ˈɹɛkɔːd/',
    ipa_us: '/ˈɹɛkɔːd/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to set down or register something in writing",
              "th": "บันทึกหรือจดบันทึกสิ่งใดสิ่งหนึ่ง"
        },
        {
              "pos": "noun",
              "en": "a document or medium that holds information",
              "th": "เอกสารหรือสื่อที่บรรจุสารสนเทศ"
        }
  ],
    antonyms: ["erase","delete"],
    examples:   [
        "She will record the meeting to review later.",
        "The athlete set a new record in the 100-meter dash.",
        "The company keeps a record of all employee salaries."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'intermediate',
    level: 'B1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ɪntə(ɹ)ˈmidi.ət/',
    ipa_us: '/ɪntə(ɹ)ˈmidi.ət/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "at a middle level of difficulty or skill",
              "th": "อยู่ในระดับกลางของความยากหรือทักษะ"
        }
  ],
    antonyms: ["advanced","beginner"],
    examples:   [
        "The intermediate class is designed for students who have some experience.",
        "The intermediate level of the video game is quite challenging.",
        "She took an intermediate course in photography to improve her skills."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'impair',
    level: 'B1',
    partOfSpeech: ["verb"],
    ipa_uk: '/ɪmˈpɛə/',
    ipa_us: '/ɪmˈpɛə/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to damage or weaken something",
              "th": "ทำลายหรืออ่อนแอลง"
        }
  ],
    antonyms: ["improve","enhance"],
    examples:   [
        "The injury will impair his ability to play sports.",
        "The new policy may impair the company's reputation.",
        "The lack of sleep can impair your judgment."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'sheer',
    level: 'B1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈʃɪə/',
    ipa_us: '/ˈʃɪə/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "very great or extreme",
              "th": "มากหรือรุนแรง"
        }
  ],
    antonyms: ["mild","moderate"],
    examples:   [
        "The sheer size of the building was impressive.",
        "She felt a sheer sense of excitement when she won the contest.",
        "The sheer force of the wind blew the roof off the house."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'universe',
    level: 'B1',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈjuːnɪˌvɜːs/',
    ipa_us: '/ˈjuːnɪˌvɜːs/',
    meanings:   [
        {
              "pos": "noun",
              "en": "all of space and time",
              "th": "พื้นที่และเวลาทั้งหมด"
        }
  ],
    antonyms: ["nothingness","void"],
    examples:   [
        "The universe is still full of mysteries waiting to be solved.",
        "The scientist spent her career studying the universe and its secrets.",
        "The universe is vast and complex, with many unknowns."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'idiom',
    level: 'B1',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈɪdɪəm/',
    ipa_us: '/ˈɪdɪəm/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a phrase or expression with a non-literal meaning",
              "th": "ประโยคหรือคำที่มีความหมายที่ไม่ตรงตามตัวอักษร"
        }
  ],
    antonyms: ["literal","straightforward"],
    examples:   [
        "The idiom 'break a leg' means 'good luck'.",
        "The idiom 'cost an arm and a leg' means something is very expensive.",
        "The teacher explained the idiom 'bend over backwards' to the students."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'mosquito',
    level: 'B1',
    partOfSpeech: ["noun"],
    ipa_uk: '/məˈski.toʊ/',
    ipa_us: '/məˈski.toʊ/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a small flying insect that feeds on blood",
              "th": "แมลงบินที่เล็กและดูดเลือด"
        }
  ],
    antonyms: ["beneficial","harmless"],
    examples:   [
        "The mosquito bite gave me a nasty rash.",
        "The mosquito net will keep the insects away.",
        "The area is known for having a lot of mosquitoes during the summer."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'cave',
    level: 'B1',
    partOfSpeech: ["noun"],
    ipa_uk: '/keɪv/',
    ipa_us: '/keɪv/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a hollow place in the ground or in the side of a hill",
              "th": "ที่ว่างในพื้นดินหรือในด้านของเนินเขา"
        }
  ],
    antonyms: ["mountain","hill"],
    examples:   [
        "The cave was dark and spooky, but also fascinating.",
        "The explorer discovered a hidden cave deep in the forest.",
        "The family went on a tour of the cave system."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'resident',
    level: 'B1',
    partOfSpeech: ["noun","adjective"],
    ipa_uk: '/ˈɹɛzɪd(ə)nt/',
    ipa_us: '/ˈɹɛzɪd(ə)nt/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a person who lives in a particular place",
              "th": "บุคคลที่อาศัยอยู่ในสถานที่ใดสถานที่หนึ่ง"
        },
        {
              "pos": "adjective",
              "en": "living in a particular place",
              "th": "อาศัยอยู่ในสถานที่ใดสถานที่หนึ่ง"
        }
  ],
    antonyms: ["visitor","tourist"],
    examples:   [
        "The resident of the house next door is a kind old man.",
        "The resident doctor will see you now.",
        "The resident students have priority for on-campus housing."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'global',
    level: 'B1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈɡləʊbəl/',
    ipa_us: '/ˈɡləʊbəl/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "relating to the whole world",
              "th": "เกี่ยวข้องกับโลกทั้งหมด"
        }
  ],
    antonyms: ["local","regional"],
    examples:   [
        "The global economy is affected by many factors.",
        "The company has a global presence with offices in many countries.",
        "The global community is working together to address climate change."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'monthly',
    level: 'B1',
    partOfSpeech: ["adverb","adjective"],
    ipa_uk: '/ˈmʌnθli/',
    ipa_us: '/ˈmʌnθli/',
    meanings:   [
        {
              "pos": "adverb",
              "en": "happening or done every month",
              "th": "เกิดขึ้นหรือทำทุกเดือน"
        },
        {
              "pos": "adjective",
              "en": "happening or done every month",
              "th": "เกิดขึ้นหรือทำทุกเดือน"
        }
  ],
    antonyms: ["yearly","daily"],
    examples:   [
        "The monthly meeting will be held next Wednesday.",
        "The monthly subscription will be deducted from your account.",
        "The company pays its employees a monthly salary."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'poisonous',
    level: 'B1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈpɔɪznəs/',
    ipa_us: '/ˈpɔɪznəs/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "having a harmful or deadly effect",
              "th": "มีผลเสียหรือร้ายแรง"
        }
  ],
    antonyms: ["harmless","safe"],
    examples:   [
        "The poisonous snake bite can be deadly.",
        "The poisonous gas leaked from the factory.",
        "The poisonous plant should be handled with care."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'rely',
    level: 'B1',
    partOfSpeech: ["verb"],
    ipa_uk: '/ɹɪˈlaɪ/',
    ipa_us: '/ɹɪˈlaɪ/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to depend on something or someone",
              "th": "พึ่งพาสิ่งใดสิ่งหนึ่งหรือบุคคลใด"
        }
  ],
    antonyms: ["doubt","question"],
    examples:   [
        "I rely on my friends for support.",
        "The company relies on its employees to meet the deadline.",
        "She relies on her intuition to make important decisions."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'through',
    level: 'B1',
    partOfSpeech: ["preposition"],
    ipa_uk: '/θɹuː/',
    ipa_us: '/θɹuː/',
    meanings:   [
        {
              "pos": "preposition",
              "en": "from one side to the other",
              "th": "จากด้านหนึ่งไปอีกด้านหนึ่ง"
        }
  ],
    antonyms: ["around","over"],
    examples:   [
        "I walked through the park on my way home.",
        "The ball went through the hoop.",
        "The company will get through the difficult time with the help of its employees."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'faithful',
    level: 'B1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈfeɪθ.fəl/',
    ipa_us: '/ˈfeɪθ.fəl/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "loyal and dedicated",
              "th": "จงรักภักดีและอุทิศตน"
        }
  ],
    antonyms: ["disloyal","unfaithful"],
    examples:   [
        "The faithful dog waited for its owner at the door.",
        "The faithful employee worked for the company for over 20 years.",
        "The faithful fans supported their team through thick and thin."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'saucer',
    level: 'B1',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈsɔː.sə/',
    ipa_us: '/ˈsɔː.sə/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a small dish, typically used for serving coffee or tea",
              "th": "จานเล็กๆ ที่ใช้ในการเสิร์ฟกาแฟหรือชา"
        }
  ],
    antonyms: ["cup","bowl"],
    examples:   [
        "The saucer was filled with coffee.",
        "The delicate saucer was a family heirloom.",
        "The saucer was placed on the table next to the cup."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'remarkable',
    level: 'B1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ɹɪˈmɑːkəbl̩/',
    ipa_us: '/ɹɪˈmɑːkəbl̩/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "worthy of notice or attention",
              "th": "ควรได้รับความสนใจหรือสังเกต"
        }
  ],
    antonyms: ["unremarkable","ordinary"],
    examples:   [
        "The remarkable view from the top of the mountain was breathtaking.",
        "The scientist made a remarkable discovery that changed the field.",
        "The remarkable performance by the actor earned her an award."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'setting',
    level: 'B1',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈsɛtɪŋ/',
    ipa_us: '/ˈsɛtɪŋ/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the place or surroundings in which something happens",
              "th": "สถานที่หรือบริเวณที่สิ่งใดสิ่งหนึ่งเกิดขึ้น"
        }
  ],
    antonyms: ["plot","story"],
    examples:   [
        "The setting of the novel was in 19th century England.",
        "The setting of the play was a small village in France.",
        "The setting of the movie was in a futuristic city."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'slip',
    level: 'B1',
    partOfSpeech: ["verb","noun"],
    ipa_uk: '/slɪp/',
    ipa_us: '/slɪp/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to fall or slide accidentally",
              "th": "ลื่นหรือตกลงโดยไม่ตั้งใจ"
        },
        {
              "pos": "noun",
              "en": "a small piece of paper or a document",
              "th": "กระดาษหรือเอกสารขนาดเล็ก"
        }
  ],
    antonyms: ["catch","hold"],
    examples:   [
        "She slipped on the ice and fell.",
        "The slip of paper had the password written on it.",
        "The company will give you a slip to confirm your payment."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },

  {
    word: 'conceive',
    level: 'B2',
    partOfSpeech: ["verb [T]"],
    ipa_uk: '/kənˈsiːv/',
    ipa_us: '/kənˈsiːv/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to form an idea or opinion",
              "th": "คิดค้นหรือสร้างความคิด"
        }
  ],
    antonyms: ["misconceive","misunderstand"],
    examples:   [
        "She conceived a plan to start her own business.",
        "The idea was conceived by a team of experts.",
        "The artist's imagination helped her conceive unique sculptures."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'supervisor',
    level: 'B2',
    partOfSpeech: ["noun [C]"],
    ipa_uk: '/ˈsuːpɚˌvaɪzɚ/',
    ipa_us: '/ˈsuːpɚˌvaɪzɚ/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a person who is in charge of a particular job or activity",
              "th": "ผู้ดูแลหรือกำกับงาน"
        }
  ],
    antonyms: ["subordinate","assistant"],
    examples:   [
        "The supervisor of the project was very experienced.",
        "She was promoted to be a supervisor after five years.",
        "The supervisor helped the new employee to understand the task."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'cheerfully',
    level: 'B2',
    partOfSpeech: ["adverb"],
    ipa_uk: '/ˈtʃɪəfəli/',
    ipa_us: '/ˈtʃɪəfəli/',
    meanings:   [
        {
              "pos": "adverb",
              "en": "in a cheerful manner",
              "th": "ด้วยความสุขหรือร่าเริง"
        }
  ],
    antonyms: ["gloomily","unhappily"],
    examples:   [
        "She answered the phone cheerfully.",
        "The children played cheerfully in the park.",
        "He worked cheerfully, even on Mondays."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'innovation',
    level: 'B2',
    partOfSpeech: ["noun [C,U]"],
    ipa_uk: '/ˌɪnəˈveɪʃən/',
    ipa_us: '/ˌɪnəˈveɪʃən/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a new idea, method, or device",
              "th": "ความคิดหรือสิ่งประดิษฐ์ใหม่"
        }
  ],
    antonyms: ["tradition","convention"],
    examples:   [
        "The company's latest innovation was a huge success.",
        "Innovation is key to staying competitive in the market.",
        "The innovation of the internet changed the world."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'panel',
    level: 'B2',
    partOfSpeech: ["noun [C]"],
    ipa_uk: '/ˈpænəl/',
    ipa_us: '/ˈpænəl/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a group of people who are chosen to discuss or decide something",
              "th": "กลุ่มคนซึ่งถูกเลือกให้พูดคุยหรือตัดสินใจเกี่ยวกับเรื่องใดเรื่องหนึ่ง"
        }
  ],
    antonyms: ["individual","singleton"],
    examples:   [
        "The panel discussed the issue for hours.",
        "She was chosen to be on the panel of judges.",
        "The panel of experts provided valuable insights."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'comprehensive',
    level: 'B2',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˌkɒm.pɹɪˈhɛn.sɪv/',
    ipa_us: '/ˌkɒm.pɹɪˈhɛn.sɪv/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "including or dealing with all or many different parts of something",
              "th": "ครอบคลุมหรือเกี่ยวข้องกับส่วนต่างๆ ของสิ่งใดสิ่งหนึ่ง"
        }
  ],
    antonyms: ["limited","restricted"],
    examples:   [
        "The comprehensive report covered all aspects of the project.",
        "The comprehensive insurance policy covered everything.",
        "The comprehensive education system included many subjects."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'synonym',
    level: 'B2',
    partOfSpeech: ["noun [C]"],
    ipa_uk: '/ˈsɪnənɪm/',
    ipa_us: '/ˈsɪnənɪm/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a word or phrase that has the same or nearly the same meaning as another word or phrase",
              "th": "คำหรือวลีที่มีความหมายเหมือนหรือคล้ายกับคำหรือวลีอื่น"
        }
  ],
    antonyms: ["antonym","opposite"],
    examples:   [
        "The synonym for 'happy' is 'joyful'.",
        "The thesaurus provided a list of synonyms for the word.",
        "The teacher asked the students to find synonyms for the vocabulary words."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'hook',
    level: 'B2',
    partOfSpeech: ["noun [C]"],
    ipa_uk: '/huːk/',
    ipa_us: '/huːk/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a curved or bent piece of metal or other material used for catching or holding things",
              "th": "สิ่งที่มีรูปโค้งหรืองอทำจากโลหะหรือวัสดุอื่นใช้สำหรับจับหรือยึดสิ่งใดสิ่งหนึ่ง"
        }
  ],
    antonyms: ["unhook","release"],
    examples:   [
        "The fisherman used a hook to catch the fish.",
        "The hook on the door was rusty.",
        "The singer's hook caught the audience's attention."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'messenger',
    level: 'B2',
    partOfSpeech: ["noun [C]"],
    ipa_uk: '/ˈmɛs.n̩.d͡ʒə/',
    ipa_us: '/ˈmɛs.n̩.d͡ʒə/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a person or thing that takes or sends messages",
              "th": "บุคคลหรือสิ่งที่นำหรือส่งสาร"
        }
  ],
    antonyms: ["recipient","addressee"],
    examples:   [
        "The messenger delivered the package to the wrong address.",
        "The messenger app allowed users to send messages quickly.",
        "The messenger of the king was trusted with important information."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'haste',
    level: 'B2',
    partOfSpeech: ["noun [U]"],
    ipa_uk: '/heɪst/',
    ipa_us: '/heɪst/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the state of acting or doing something quickly, often without thinking carefully",
              "th": "การกระทำหรือการทำสิ่งใดสิ่งหนึ่งด้วยความเร็ว มักจะไม่คิดอย่างรอบคอบ"
        }
  ],
    antonyms: ["delay","slowness"],
    examples:   [
        "She made a mistake due to haste.",
        "The company's haste to launch the product resulted in errors.",
        "The driver's haste caused the accident."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'glow',
    level: 'B2',
    partOfSpeech: ["noun [C,U]"],
    ipa_uk: '/ɡləʊ/',
    ipa_us: '/ɡləʊ/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a soft, steady, and warm light",
              "th": "แสงสว่างอ่อนๆ ที่คงที่และอบอุ่น"
        }
  ],
    antonyms: ["darkness","shadow"],
    examples:   [
        "The glow of the sunset was beautiful.",
        "The glow of the candle lit up the room.",
        "The glow of the fireflies was mesmerizing."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'soliloquy',
    level: 'B2',
    partOfSpeech: ["noun [C]"],
    ipa_uk: '/səˈlɪləkwi/',
    ipa_us: '/səˈlɪləkwi/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a speech in a play in which a character speaks their thoughts aloud while alone on stage",
              "th": "การกล่าวสุนทรพจน์ในละครที่ตัวละครพูดความคิดของตนเองออกมาด้วยเสียงดังในขณะที่อยู่คนเดียวบนเวที"
        }
  ],
    antonyms: ["dialogue","conversation"],
    examples:   [
        "The actor's soliloquy was the highlight of the play.",
        "The soliloquy revealed the character's inner thoughts.",
        "The playwright used soliloquies to explore the characters' emotions."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'theme',
    level: 'B2',
    partOfSpeech: ["noun [C]"],
    ipa_uk: '/θiːm/',
    ipa_us: '/θiːm/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the main subject or idea of a piece of writing, film, or art",
              "th": "เรื่องหลักหรือความคิดหลักของงานเขียน ภาพยนตร์ หรือศิลปะ"
        }
  ],
    antonyms: ["subtext","undercurrent"],
    examples:   [
        "The theme of the novel was love and loss.",
        "The theme of the party was a masquerade ball.",
        "The artist explored the theme of identity in her work."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'stain',
    level: 'B2',
    partOfSpeech: ["noun [C]"],
    ipa_uk: '/steɪn/',
    ipa_us: '/steɪn/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a mark or spot on a surface, especially one that is difficult to remove",
              "th": "รอยหรือจุดบนพื้นผิว โดยเฉพาะอย่างยิ่งรอยที่ยากจะเอาออก"
        }
  ],
    antonyms: ["cleanliness","spotlessness"],
    examples:   [
        "The stain on the carpet was difficult to remove.",
        "The stain on her shirt was from red wine.",
        "The artist used stain to create a unique effect on the wood."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'cocktail',
    level: 'B2',
    partOfSpeech: ["noun [C]"],
    ipa_uk: '/ˈkɒkteɪl/',
    ipa_us: '/ˈkɒkteɪl/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a drink made from a mixture of spirits, fruit juice, and other ingredients",
              "th": "เครื่องดื่มที่ทำจากส่วนผสมของสุรา น้ำผลไม้ และส่วนผสมอื่นๆ"
        }
  ],
    antonyms: ["mocktail","soft drink"],
    examples:   [
        "The bartender created a new cocktail for the party.",
        "The cocktail party was a huge success.",
        "The restaurant served a variety of cocktails."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'programmer',
    level: 'B2',
    partOfSpeech: ["noun [C]"],
    ipa_uk: '/ˈpɹəʊɡɹæmə/',
    ipa_us: '/ˈpɹəʊɡɹæmə/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a person who writes computer programs",
              "th": "บุคคลที่เขียนโปรแกรมคอมพิวเตอร์"
        }
  ],
    antonyms: ["user","operator"],
    examples:   [
        "The programmer worked long hours to meet the deadline.",
        "The programmer created a new app for the company.",
        "The programmer's skills were in high demand."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'later',
    level: 'B2',
    partOfSpeech: ["adverb"],
    ipa_uk: '/ˈleɪtə/',
    ipa_us: '/ˈleɪtə/',
    meanings:   [
        {
              "pos": "adverb",
              "en": "happening or done after a particular time",
              "th": "เกิดขึ้นหรือทำหลังจากเวลาใดเวลาหนึ่ง"
        }
  ],
    antonyms: ["earlier","sooner"],
    examples:   [
        "I'll call you later.",
        "The movie starts later tonight.",
        "The company will announce the results later this year."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'inherit',
    level: 'B2',
    partOfSpeech: ["verb [T]"],
    ipa_uk: '/ɪnˈhɛɹɪt/',
    ipa_us: '/ɪnˈhɛɹɪt/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to receive money, property, or a title from someone who has died",
              "th": "ได้รับเงิน ที่ดิน หรือตำแหน่งจากบุคคลที่เสียชีวิต"
        }
  ],
    antonyms: ["disinherit","deprive"],
    examples:   [
        "She inherited a large sum of money from her grandmother.",
        "The prince will inherit the throne when his father dies.",
        "The company inherited a lot of debt from the previous owner."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },

  {
    word: 'commission',
    level: 'C2',
    partOfSpeech: ["noun"],
    ipa_uk: '/kəˈmɪʃən/',
    ipa_us: '/kəˈmɪʃən/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the act of committing or doing something",
              "th": "การกระทำหรือการทำสิ่งใดสิ่งหนึ่ง"
        }
  ],
    antonyms: ["omission","neglect"],
    examples:   [
        "The commission of the crime was a shock to the community.",
        "She was given a commission to paint a portrait of the CEO.",
        "The government established a commission to investigate the scandal."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'malice',
    level: 'C2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈmælɪs/',
    ipa_us: '/ˈmælɪs/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the intention or desire to do harm to someone",
              "th": "ความตั้งใจหรือความปรารถนาที่จะทำอันตรายต่อผู้อื่น"
        }
  ],
    antonyms: ["benevolence","kindness"],
    examples:   [
        "The defendant was accused of acting with malice.",
        "The malice in her eyes was unsettling.",
        "The company was sued for malice and negligence."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'leaven',
    level: 'C2',
    partOfSpeech: ["noun","verb"],
    ipa_uk: '/ˈlɛv.ən/',
    ipa_us: '/ˈlɛv.ən/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a substance that causes dough to rise",
              "th": "สิ่งที่ทำให้แป้งขึ้น"
        },
        {
              "pos": "verb",
              "en": "to add a substance to dough to make it rise",
              "th": "เพิ่มสิ่งที่ทำให้แป้งขึ้น"
        }
  ],
    antonyms: ["stale","flat"],
    examples:   [
        "Yeast is a common leaven used in baking.",
        "The recipe called for leaven to be added to the dough.",
        "The bread was light and fluffy, thanks to the leaven."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'ornate',
    level: 'C2',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ɔɹˈneɪt/',
    ipa_us: '/ɔɹˈneɪt/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "highly decorated or elaborate",
              "th": "ตกแต่งหรือประดับประดาอย่างสวยงาม"
        }
  ],
    antonyms: ["plain","simple"],
    examples:   [
        "The ornate furniture in the palace was stunning.",
        "The ornate details on the building were impressive.",
        "The ornate language used in the poem was beautiful."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'breadwinner',
    level: 'C2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈbɹɛdˌwɪnɚ/',
    ipa_us: '/ˈbɹɛdˌwɪnɚ/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the person who earns the money to support a family",
              "th": "บุคคลที่หาเงินเพื่อเลี้ยงดูครอบครัว"
        }
  ],
    antonyms: ["dependent","recipient"],
    examples:   [
        "As the breadwinner, she worked hard to provide for her family.",
        "The breadwinner of the family was struggling to make ends meet.",
        "After her husband's death, she became the breadwinner and had to work multiple jobs."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'daunting',
    level: 'C2',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈdɔːntɪŋ/',
    ipa_us: '/ˈdɔːntɪŋ/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "frightening or intimidating",
              "th": "น่ากลัวหรือน่าเกรงขาม"
        }
  ],
    antonyms: ["encouraging","reassuring"],
    examples:   [
        "The daunting task of public speaking made her nervous.",
        "The daunting mountain climb was a challenge she was willing to take.",
        "The daunting prospect of failure held him back from trying."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'imposition',
    level: 'C2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ɪm.pəˈzɪʃən/',
    ipa_us: '/ɪm.pəˈzɪʃən/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the act of imposing something, such as a tax or a rule",
              "th": "การกำหนดหรือบังคับใช้สิ่งใดสิ่งหนึ่ง เช่น ภาษีหรือกฎ"
        }
  ],
    antonyms: ["relief","exemption"],
    examples:   [
        "The imposition of the new tax was met with resistance.",
        "The imposition of the rule was seen as unfair.",
        "The imposition of the penalty was a harsh measure."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'nonchalant',
    level: 'C2',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈnɒn.ʃəl.ənt/',
    ipa_us: '/ˈnɒn.ʃəl.ənt/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "showing a lack of concern or interest",
              "th": "แสดงถึงการขาดความกังวลหรือความสนใจ"
        }
  ],
    antonyms: ["concerned","anxious"],
    examples:   [
        "He walked into the room with a nonchalant air.",
        "She responded to the question with a nonchalant tone.",
        "The nonchalant attitude of the manager was frustrating."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'artifact',
    level: 'C2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈɑːtɪfækt/',
    ipa_us: '/ˈɑːtɪfækt/',
    meanings:   [
        {
              "pos": "noun",
              "en": "an object made or used by humans, especially one of historical or cultural interest",
              "th": "วัตถุที่ทำหรือใช้โดยมนุษย์ โดยเฉพาะอย่างยิ่งวัตถุที่มีความสนใจทางประวัติศาสตร์หรือวัฒนธรรม"
        }
  ],
    antonyms: ["natural","organic"],
    examples:   [
        "The museum exhibited many artifacts from ancient civilizations.",
        "The artifact was a valuable relic from the past.",
        "The archaeologists uncovered an artifact that shed new light on the history of the region."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'palatable',
    level: 'C2',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈpæl.ə.tə.bəl/',
    ipa_us: '/ˈpæl.ə.tə.bəl/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "pleasant to eat or taste",
              "th": "มีรสชาติที่ดีหรือพึงพอใจ"
        }
  ],
    antonyms: ["unpalatable","distasteful"],
    examples:   [
        "The palatable flavors of the dish made it a favorite.",
        "The palatable aroma of the coffee filled the room.",
        "The chef worked hard to create a palatable menu for the restaurant."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'indolence',
    level: 'C2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈɪndələns/',
    ipa_us: '/ˈɪndələns/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a lack of energy or enthusiasm, often resulting in laziness",
              "th": "การขาดพลังงานหรือความกระตือรือร้น ซึ่งมักจะส่งผลให้เกิดความเกียจคร้าน"
        }
  ],
    antonyms: ["diligence","industry"],
    examples:   [
        "His indolence made it difficult for him to finish the project on time.",
        "The indolence of the summer days made her feel lazy.",
        "The indolence of the team was a major concern for the coach."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'lament',
    level: 'C2',
    partOfSpeech: ["noun","verb"],
    ipa_uk: '/ləˈmɛnt/',
    ipa_us: '/ləˈmɛnt/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a feeling or expression of sadness or regret",
              "th": "ความรู้สึกหรือการแสดงออกของความเศร้าใจหรือเสียใจ"
        },
        {
              "pos": "verb",
              "en": "to express sadness or regret for something",
              "th": "แสดงความเศร้าใจหรือเสียใจต่อสิ่งใดสิ่งหนึ่ง"
        }
  ],
    antonyms: ["celebrate","rejoice"],
    examples:   [
        "The lament of the mourners filled the air.",
        "She lamented the loss of her loved one.",
        "The poet wrote a lament for the fallen hero."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'mediate',
    level: 'C2',
    partOfSpeech: ["verb"],
    ipa_uk: '/ˈmidi.ət/',
    ipa_us: '/ˈmidi.ət/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to help resolve a dispute or conflict between two or more parties",
              "th": "ช่วยแก้ไขข้อพิพาทหรือความขัดแย้งระหว่างสองฝ่ายหรือมากกว่า"
        }
  ],
    antonyms: ["aggravate","exacerbate"],
    examples:   [
        "The mediator helped to mediate the dispute between the two companies.",
        "The teacher tried to mediate the argument between the two students.",
        "The government attempted to mediate the conflict between the warring nations."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'parasitic',
    level: 'C2',
    partOfSpeech: ["adjective"],
    ipa_uk: '/pæ.ɹəˈsɪt.ɪk/',
    ipa_us: '/pæ.ɹəˈsɪt.ɪk/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "relating to or characteristic of a parasite, especially one that lives on or in another organism",
              "th": "เกี่ยวข้องกับหรือมีลักษณะของปรสิต โดยเฉพาะอย่างยิ่งปรสิตที่อาศัยอยู่บนหรือในอินทรีย์อื่น"
        }
  ],
    antonyms: ["mutualistic","symbiotic"],
    examples:   [
        "The parasitic worm was removed from the patient's intestine.",
        "The parasitic relationship between the two organisms was fascinating.",
        "The parasitic behavior of the company was criticized by the public."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'perverse',
    level: 'C2',
    partOfSpeech: ["adjective"],
    ipa_uk: '/pəˈvɜːs/',
    ipa_us: '/pəˈvɜːs/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "deliberately deviating from what is considered normal or acceptable",
              "th": "เบี่ยงเบนอย่างเจตนาจากสิ่งที่ถือว่าเป็นปกติหรือยอมรับได้"
        }
  ],
    antonyms: ["normal","conventional"],
    examples:   [
        "The perverse sense of humor was not appreciated by everyone.",
        "The perverse behavior of the child was a concern for the parents.",
        "The perverse desire for attention led her to act out in public."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'haphazardly',
    level: 'C2',
    partOfSpeech: ["adverb"],
    ipa_uk: '/hæpˈhæzədli/',
    ipa_us: '/hæpˈhæzədli/',
    meanings:   [
        {
              "pos": "adverb",
              "en": "in a random or disorganized manner",
              "th": "ในลักษณะที่ไม่มีระเบียบหรือไม่สุ่มสี่สุ่มห้า"
        }
  ],
    antonyms: ["methodically","systematically"],
    examples:   [
        "The boxes were packed haphazardly, making it difficult to find anything.",
        "The haphazardly planned trip ended in disaster.",
        "The haphazardly written report was full of errors and inconsistencies."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'opaque',
    level: 'C2',
    partOfSpeech: ["adjective"],
    ipa_uk: '/əʊˈpeɪk/',
    ipa_us: '/əʊˈpeɪk/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "not able to be seen through, either because it is solid or because it is not transparent",
              "th": "ไม่สามารถมองผ่านได้ ไม่ว่าจะเป็นเพราะเป็นวัตถุหรือไม่โปร่งใส"
        }
  ],
    antonyms: ["transparent","clear"],
    examples:   [
        "The opaque glass blocked the view from the outside.",
        "The opaque language used in the contract was confusing.",
        "The opaque water made it difficult to see the fish swimming inside."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'bereft',
    level: 'C2',
    partOfSpeech: ["adjective"],
    ipa_uk: '/bəˈɹɛft/',
    ipa_us: '/bəˈɹɛft/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "left without something, especially something that is necessary or desirable",
              "th": "ถูกทิ้งไว้โดยไม่มีสิ่งใด โดยเฉพาะอย่างยิ่งสิ่งที่จำเป็นหรือพึงประสงค์"
        }
  ],
    antonyms: ["endowed","blessed"],
    examples:   [
        "The family was bereft of hope after the tragedy.",
        "The community was bereft of resources and support.",
        "The bereft expression on her face showed her deep sadness."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },

  {
    word: 'cessation',
    level: 'C1',
    partOfSpeech: ["noun"],
    ipa_uk: '/sɛˈseɪʃən/',
    ipa_us: '/sɛˈseɪʃən/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the act of stopping or bringing to an end",
              "th": "การหยุดหรือสิ้นสุด"
        }
  ],
    antonyms: ["continuation","persistence"],
    examples:   [
        "The company announced the cessation of its operations due to financial difficulties.",
        "The cessation of hostilities led to a period of peace.",
        "The doctor recommended the cessation of smoking to improve health."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'con',
    level: 'C1',
    partOfSpeech: ["noun","verb"],
    ipa_uk: '/kɒn/',
    ipa_us: '/kɒn/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a disadvantage or a swindle",
              "th": "ข้อเสียหรือการหลอกลวง"
        },
        {
              "pos": "verb",
              "en": "to swindle or cheat",
              "th": "หลอกลวงหรือโกง"
        }
  ],
    antonyms: ["pro","benefit"],
    examples:   [
        "The con artist convinced the victim to invest in a fake scheme.",
        "The new policy has a significant con: it will increase taxes.",
        "The scammer tried to con the elderly woman out of her savings."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'ethical',
    level: 'C1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈɛθɪkəl/',
    ipa_us: '/ˈɛθɪkəl/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "relating to moral principles or values",
              "th": "เกี่ยวกับหลักศีลธรรมหรือค่านิยม"
        }
  ],
    antonyms: ["unethical","immoral"],
    examples:   [
        "The company has an ethical policy of sourcing materials sustainably.",
        "The doctor had to make an ethical decision about the patient's treatment.",
        "The journalist's ethical standards were questioned after the scandal."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'sarcasm',
    level: 'C1',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈsɑːˌkæzəm/',
    ipa_us: '/ˈsɑːˌkæzəm/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the use of irony or mockery to express contempt",
              "th": "การใช้คำพูดที่มีเสียงเยาะเย้ยเพื่อแสดงความไม่พอใจ"
        }
  ],
    antonyms: ["sincerity","genuineness"],
    examples:   [
        "The teacher detected sarcasm in the student's tone and reprimanded him.",
        "The comedian's use of sarcasm made the audience laugh.",
        "The writer's sarcasm in the article was meant to criticize the government's policy."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'stylistic',
    level: 'C1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/staɪˈlɪstɪk/',
    ipa_us: '/staɪˈlɪstɪk/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "relating to style or aesthetics",
              "th": "เกี่ยวกับลักษณะหรือสุนทรียศาสตร์"
        }
  ],
    antonyms: ["substantive","factual"],
    examples:   [
        "The stylistic elements of the film were widely praised by critics.",
        "The author's stylistic approach to writing made the novel unique.",
        "The designer's stylistic vision for the brand was innovative and bold."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'clinical',
    level: 'C1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈklɪnɪkəl/',
    ipa_us: '/ˈklɪnɪkəl/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "relating to the observation, diagnosis, or treatment of patients",
              "th": "เกี่ยวกับการสังเกตการณ์ การวินิจฉัย หรือการรักษาผู้ป่วย"
        }
  ],
    antonyms: ["theoretical","hypothetical"],
    examples:   [
        "The clinical trial of the new drug showed promising results.",
        "The doctor's clinical experience helped her make an accurate diagnosis.",
        "The clinical psychologist worked with patients to develop coping strategies."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'overseer',
    level: 'C1',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈəʊvəˌsiːə(ɹ)/',
    ipa_us: '/ˈəʊvəˌsiːə(ɹ)/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a person who supervises or manages something",
              "th": "บุคคลที่ดูแลหรือจัดการสิ่งใดสิ่งหนึ่ง"
        }
  ],
    antonyms: ["subordinate","assistant"],
    examples:   [
        "The overseer of the project ensured that it was completed on time.",
        "The company appointed an overseer to monitor the factory's operations.",
        "The overseer of the estate managed the daily activities of the farm."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'faction',
    level: 'C1',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈfæk.ʃn̩/',
    ipa_us: '/ˈfæk.ʃn̩/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a small group within a larger group, often with different opinions or interests",
              "th": "กลุ่มเล็กๆ ภายในกลุ่มใหญ่ๆ มักจะมีความคิดเห็นที่แตกต่างหรือมีส่วนสนใจที่แตกต่าง"
        }
  ],
    antonyms: ["unity","solidarity"],
    examples:   [
        "The faction within the party opposed the leader's policies.",
        "The faction in the community wanted to secede from the rest of the city.",
        "The faction in the company was at odds with the management over wages."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'exhilarate',
    level: 'C1',
    partOfSpeech: ["verb"],
    ipa_uk: '/ɛɡ-/',
    ipa_us: '/ɛɡ-/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to make someone feel extremely happy or excited",
              "th": "ทำให้ใครบางคนรู้สึกมีความสุขหรือตื่นเต้นอย่างมาก"
        }
  ],
    antonyms: ["depress","dishearten"],
    examples:   [
        "The news of the wedding exhilarated the whole family.",
        "The rollercoaster ride exhilarated the children, who screamed with delight.",
        "The beautiful scenery exhilarated the hikers, who felt a sense of awe."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'slob',
    level: 'C1',
    partOfSpeech: ["noun"],
    ipa_uk: '/slɒb/',
    ipa_us: '/slɒb/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a person who is untidy or lazy",
              "th": "บุคคลที่ไม่เรียบร้อยหรือเกียจคร้าน"
        }
  ],
    antonyms: ["neat freak","perfectionist"],
    examples:   [
        "The slob left his dirty socks on the floor for weeks.",
        "The slob spent the entire day watching TV and eating junk food.",
        "The slob's apartment was a mess, with clothes and trash scattered everywhere."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'quip',
    level: 'C1',
    partOfSpeech: ["noun","verb"],
    ipa_uk: '/kwɪp/',
    ipa_us: '/kwɪp/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a witty or sarcastic remark",
              "th": "คำพูดที่มีไหวพริบหรือเยาะเย้ย"
        },
        {
              "pos": "verb",
              "en": "to make a witty or sarcastic remark",
              "th": "พูดหรือกล่าวคำที่มีไหวพริบหรือเยาะเย้ย"
        }
  ],
    antonyms: ["compliment","praise"],
    examples:   [
        "The comedian's quip about the politician's hairstyle got a lot of laughs.",
        "She quipped that the movie was so bad it was good.",
        "The teacher quipped that the student's excuse was the most creative she had ever heard."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'durable',
    level: 'C1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈd(j)ʊəɹəbəl/',
    ipa_us: '/ˈd(j)ʊəɹəbəl/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "able to withstand wear and tear or last for a long time",
              "th": "สามารถทนต่อการเสื่อมสภาพหรือใช้งานได้นาน"
        }
  ],
    antonyms: ["fragile","perishable"],
    examples:   [
        "The durable fabric of the sofa withstood the rough handling of the children.",
        "The durable construction of the building made it resistant to earthquakes.",
        "The company produced durable goods that could last for decades."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'cleanly',
    level: 'C1',
    partOfSpeech: ["adverb"],
    ipa_uk: '/ˈklɛnli/',
    ipa_us: '/ˈklɛnli/',
    meanings:   [
        {
              "pos": "adverb",
              "en": "in a clean and tidy manner",
              "th": "ด้วยวิธีการที่สะอาดและเรียบร้อย"
        }
  ],
    antonyms: ["messily","sloppily"],
    examples:   [
        "The surgeon performed the operation cleanly and efficiently.",
        "The chef prepared the meal cleanly, avoiding cross-contamination.",
        "The athlete played the game cleanly, without committing any fouls."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'strap',
    level: 'C1',
    partOfSpeech: ["noun","verb"],
    ipa_uk: '/stɹæp/',
    ipa_us: '/stɹæp/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a long, narrow piece of material used for fastening or supporting something",
              "th": "สิ่งที่ใช้สำหรับยึดหรือรองรับสิ่งใดสิ่งหนึ่ง"
        },
        {
              "pos": "verb",
              "en": "to fasten or secure something with a strap",
              "th": "ยึดหรือรักษาสิ่งใดสิ่งหนึ่งด้วยสายรัด"
        }
  ],
    antonyms: ["unfasten","release"],
    examples:   [
        "The strap on the backpack broke, causing the bag to fall off.",
        "She strapped the baby into the car seat to ensure safety.",
        "The hikers strapped on their gear and began the ascent."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'facial',
    level: 'C1',
    partOfSpeech: ["adjective","noun"],
    ipa_uk: '/ˈfeɪʃəl/',
    ipa_us: '/ˈfeɪʃəl/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "relating to the face",
              "th": "เกี่ยวกับใบหน้า"
        },
        {
              "pos": "noun",
              "en": "a treatment for the face, such as a massage or a skin care procedure",
              "th": "การรักษาใบหน้า เช่น การนวดหรือการดูแลผิว"
        }
  ],
    antonyms: ["bodily","physical"],
    examples:   [
        "The facial recognition software identified the suspect in the video.",
        "She got a facial at the spa to relax and rejuvenate her skin.",
        "The facial expression of the actor conveyed the emotions of the character."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },

  {
    word: 'bite',
    level: 'B1',
    partOfSpeech: ["verb [T]"],
    ipa_uk: '/bʌɪt/',
    ipa_us: '/bʌɪt/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to cut or wound with teeth",
              "th": "กัด"
        }
  ],
    antonyms: ["caress","kiss"],
    examples:   [
        "The dog will bite if it feels threatened.",
        "She took a bite of the sandwich and started chewing.",
        "The mosquito bite itched all night."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'basis',
    level: 'B1',
    partOfSpeech: ["noun [C]"],
    ipa_uk: '/ˈbeɪsɪs/',
    ipa_us: '/ˈbeɪsɪs/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a fact or situation that something is based on",
              "th": "พื้นฐาน"
        }
  ],
    antonyms: ["conclusion","outcome"],
    examples:   [
        "The decision was made on the basis of the available data.",
        "The new policy will be the basis for future changes.",
        "The company's success is on a solid basis of customer satisfaction."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'mayor',
    level: 'B1',
    partOfSpeech: ["noun [C]"],
    ipa_uk: '/ˈmeɪ.ə/',
    ipa_us: '/ˈmeɪ.ə/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the most important person in a town or city, elected by the people or by the members of the town or city council",
              "th": "นายกเทศมนตรี"
        }
  ],
    antonyms: ["citizen","resident"],
    examples:   [
        "The mayor of the city gave a speech at the ceremony.",
        "She has been the mayor for three terms.",
        "The mayor is responsible for the city's budget."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'revision',
    level: 'B1',
    partOfSpeech: ["noun [C]"],
    ipa_uk: '/riˈvɪ.ʒ(ə)n/',
    ipa_us: '/riˈvɪ.ʒ(ə)n/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the act of changing or making something newer or more modern",
              "th": "การแก้ไข"
        }
  ],
    antonyms: ["original","first"],
    examples:   [
        "The revision of the book took several months.",
        "The company is undergoing a major revision of its policies.",
        "The revision of the contract was necessary due to the changes in the market."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'enjoyable',
    level: 'B1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ɛnˈdʒɔɪ.jə.bəl/',
    ipa_us: '/ɛnˈdʒɔɪ.jə.bəl/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "giving pleasure or enjoyment",
              "th": "สนุกสนาน"
        }
  ],
    antonyms: ["boring","unpleasant"],
    examples:   [
        "The movie was enjoyable and entertaining.",
        "The trip was enjoyable despite the long journey.",
        "The food at the restaurant was enjoyable and delicious."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'involved',
    level: 'B1',
    partOfSpeech: ["verb [T]"],
    ipa_uk: '/ɪnˈvɒlvd/',
    ipa_us: '/ɪnˈvɒlvd/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to include someone or something in an activity or situation",
              "th": "เกี่ยวข้อง"
        }
  ],
    antonyms: ["excluded","separate"],
    examples:   [
        "She was involved in the project from the beginning.",
        "The company is involved in several charity events.",
        "The police are involved in the investigation of the crime."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'stylish',
    level: 'B1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈstaɪlɪʃ/',
    ipa_us: '/ˈstaɪlɪʃ/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "attractive and fashionable",
              "th": "ทันสมัย"
        }
  ],
    antonyms: ["old-fashioned","unattractive"],
    examples:   [
        "The new restaurant is stylish and modern.",
        "She has a stylish sense of fashion.",
        "The hotel room was stylish and comfortable."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'agenda',
    level: 'B1',
    partOfSpeech: ["noun [C]"],
    ipa_uk: '/əˈdʒɛn.də/',
    ipa_us: '/əˈdʒɛn.də/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a list of things to be discussed or done",
              "th": "วาระการประชุม"
        }
  ],
    antonyms: ["outcome","result"],
    examples:   [
        "The meeting had a long agenda.",
        "The agenda for the conference included several keynote speakers.",
        "The company's agenda is to increase profits."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'particularly',
    level: 'B1',
    partOfSpeech: ["adverb"],
    ipa_uk: '/pəˈtɪkjəli/',
    ipa_us: '/pəˈtɪkjəli/',
    meanings:   [
        {
              "pos": "adverb",
              "en": "more than usual or more than others",
              "th": "โดยเฉพาะ"
        }
  ],
    antonyms: ["generally","usually"],
    examples:   [
        "I like this restaurant, particularly their seafood dishes.",
        "She is good at languages, particularly Spanish.",
        "The city is crowded, particularly during rush hour."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'waterfall',
    level: 'B1',
    partOfSpeech: ["noun [C]"],
    ipa_uk: '/ˈwɔːtəfɔːl/',
    ipa_us: '/ˈwɔːtəfɔːl/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a place where water flows over the edge of a steep rock or cliff",
              "th": "น้ำตก"
        }
  ],
    antonyms: ["mountain","hill"],
    examples:   [
        "The waterfall was beautiful and picturesque.",
        "The hike to the waterfall was challenging but worth it.",
        "The waterfall is a popular tourist destination."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'survival',
    level: 'B1',
    partOfSpeech: ["noun [U]"],
    ipa_uk: '/sɚˈvaɪvəl/',
    ipa_us: '/sɚˈvaɪvəl/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the state of continuing to live or exist, especially in a difficult or dangerous situation",
              "th": "การอยู่รอด"
        }
  ],
    antonyms: ["death","extinction"],
    examples:   [
        "The survival of the species is at risk.",
        "The survival skills of the hikers helped them stay alive.",
        "The company's survival depends on its ability to adapt to the market."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'bilingual',
    level: 'B1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/baɪˈlɪŋ.ɡju.əl/',
    ipa_us: '/baɪˈlɪŋ.ɡju.əl/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "able to speak two languages fluently",
              "th": "พูดได้สองภาษา"
        }
  ],
    antonyms: ["monolingual","unilingual"],
    examples:   [
        "The bilingual teacher was able to communicate with students from different countries.",
        "The company is looking for a bilingual employee to work with international clients.",
        "The bilingual program at the school helps students learn two languages."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'murder',
    level: 'B1',
    partOfSpeech: ["noun [C]","verb [T]"],
    ipa_uk: '/ˈmɜːdə(ɹ)/',
    ipa_us: '/ˈmɜːdə(ɹ)/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the crime of killing someone deliberately",
              "th": "การฆ่าคน"
        }
  ],
    antonyms: ["save","protect"],
    examples:   [
        "The murder took place in a quiet neighborhood.",
        "The police are investigating the murder of the young woman.",
        "The suspect was arrested for the murder of his business partner."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'similarity',
    level: 'B1',
    partOfSpeech: ["noun [C]"],
    ipa_uk: '/sɪmɪˈlæɹɪti/',
    ipa_us: '/sɪmɪˈlæɹɪti/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the state of being similar",
              "th": "ความคล้ายคลึง"
        }
  ],
    antonyms: ["difference","dissimilarity"],
    examples:   [
        "The similarity between the two languages is striking.",
        "The similarity in their appearance is due to their shared ancestry.",
        "The company is looking for similarities in the data to identify trends."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'finding',
    level: 'B1',
    partOfSpeech: ["noun [C]"],
    ipa_uk: '/ˈfaɪndɪŋ/',
    ipa_us: '/ˈfaɪndɪŋ/',
    meanings:   [
        {
              "pos": "noun",
              "en": "something that is discovered or learned",
              "th": "สิ่งที่พบ"
        }
  ],
    antonyms: ["losing","misplacing"],
    examples:   [
        "The finding of the study was published in a journal.",
        "The archaeologist made a significant finding at the excavation site.",
        "The company's finding on the market research was surprising."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'mutual',
    level: 'B1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈmjuːt͡ʃuəl/',
    ipa_us: '/ˈmjuːt͡ʃuəl/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "shared by or affecting both sides",
              "th": "ร่วมกัน"
        }
  ],
    antonyms: ["one-sided","unilateral"],
    examples:   [
        "The mutual respect between the two leaders was evident.",
        "The company has a mutual agreement with its partner.",
        "The mutual fund is a popular investment option."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'largely',
    level: 'B1',
    partOfSpeech: ["adverb"],
    ipa_uk: '[ˈlaːdʒ.li]',
    ipa_us: '[ˈlaːdʒ.li]',
    meanings:   [
        {
              "pos": "adverb",
              "en": "to a great extent or degree",
              "th": "โดยส่วนใหญ่"
        }
  ],
    antonyms: ["slightly","partly"],
    examples:   [
        "The company's success is largely due to its innovative products.",
        "The city's population is largely made up of young people.",
        "The decision was largely influenced by the CEO's opinion."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'merely',
    level: 'B1',
    partOfSpeech: ["adverb"],
    ipa_uk: '/ˈmɪəli/',
    ipa_us: '/ˈmɪəli/',
    meanings:   [
        {
              "pos": "adverb",
              "en": "only or simply",
              "th": "เพียงเท่านั้น"
        }
  ],
    antonyms: ["mainly","mostly"],
    examples:   [
        "I'm merely a student, I don't have much experience.",
        "The problem is merely a matter of perspective.",
        "The solution is merely a temporary fix."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'switch',
    level: 'B1',
    partOfSpeech: ["noun [C]","verb [T]"],
    ipa_uk: '/swɪtʃ/',
    ipa_us: '/swɪtʃ/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a device for turning something on or off, or for changing from one thing to another",
              "th": "สวิตช์"
        }
  ],
    antonyms: ["stay","remain"],
    examples:   [
        "The switch on the wall controls the lights.",
        "I'm going to switch to a different phone plan.",
        "The company is going to switch to renewable energy sources."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'wizard',
    level: 'B1',
    partOfSpeech: ["noun [C]"],
    ipa_uk: '/ˈwɪ.zəd/',
    ipa_us: '/ˈwɪ.zəd/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a person who is skilled in magic or has a special power",
              "th": "พ่อมด"
        }
  ],
    antonyms: ["mortal","human"],
    examples:   [
        "The wizard in the story had the power to make things disappear.",
        "The IT specialist is a wizard when it comes to fixing computers.",
        "The company's financial wizard helped them navigate the crisis."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'consumption',
    level: 'B1',
    partOfSpeech: ["noun [U]"],
    ipa_uk: '/kənˈsʌmp.ʃən/',
    ipa_us: '/kənˈsʌmp.ʃən/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the act of eating, drinking, or using something",
              "th": "การบริโภค"
        }
  ],
    antonyms: ["production","creation"],
    examples:   [
        "The consumption of sugar is linked to various health problems.",
        "The company's energy consumption is high due to its manufacturing processes.",
        "The government is trying to reduce the country's water consumption."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },

  {
    word: 'radio',
    level: 'A1',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈɹeɪdiˌəʊ/',
    ipa_us: '/ˈɹeɪdiˌəʊ/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a device that receives radio programmes",
              "th": "เครื่องรับวิทยุ"
        }
  ],
    antonyms: ["television","newspaper"],
    examples:   [
        "I listen to the radio every morning.",
        "The radio is playing my favorite song.",
        "She turned off the radio and went to sleep."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'vegetable',
    level: 'A1',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈvɛd͡ʒtəbəl/',
    ipa_us: '/ˈvɛd͡ʒtəbəl/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a plant, such as a cabbage or potato, that is grown for food",
              "th": "พืชที่ปลูกเพื่อเป็นอาหาร"
        }
  ],
    antonyms: ["fruit","meat"],
    examples:   [
        "I love eating vegetables with my meals.",
        "The vegetable garden is full of fresh produce.",
        "She put the vegetable soup in the fridge."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'tea',
    level: 'A1',
    partOfSpeech: ["noun"],
    ipa_uk: '/tiː/',
    ipa_us: '/tiː/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a hot drink made from the dried leaves of the tea plant",
              "th": "เครื่องดื่มร้อนจากใบชา"
        }
  ],
    antonyms: ["coffee","juice"],
    examples:   [
        "I drink tea every morning.",
        "The tea is too hot to drink.",
        "She likes to have tea with her friends."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'off',
    level: 'A1',
    partOfSpeech: ["preposition","adverb"],
    ipa_uk: '/ɔːf/',
    ipa_us: '/ɔːf/',
    meanings:   [
        {
              "pos": "preposition",
              "en": "away from a place or position",
              "th": "ห่างจากที่หรือตำแหน่ง"
        },
        {
              "pos": "adverb",
              "en": "not operating or functioning",
              "th": "ไม่ทำงานหรือไม่ดำเนินการ"
        }
  ],
    antonyms: ["on","near"],
    examples:   [
        "The lights are off in the room.",
        "She turned the TV off and went to bed.",
        "The plane took off from the airport."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'money',
    level: 'A1',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈmʌni/',
    ipa_us: '/ˈmʌni/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a medium of exchange, such as coins or banknotes",
              "th": "สื่อกลางในการแลกเปลี่ยน เช่น เหรียญหรือธนบัตร"
        }
  ],
    antonyms: ["debt","poverty"],
    examples:   [
        "I don't have enough money to buy that.",
        "She saved her money for a year to buy a car.",
        "He earns a lot of money from his job."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'could',
    level: 'A1',
    partOfSpeech: ["verb"],
    ipa_uk: '/kʊd/',
    ipa_us: '/kʊd/',
    meanings:   [
        {
              "pos": "verb",
              "en": "past tense of 'can', used to express ability or possibility",
              "th": "รูปที่ผ่านมาของ 'can' ใช้เพื่อแสดงความสามารถหรือความเป็นไปได้"
        }
  ],
    antonyms: ["cannot","unable"],
    examples:   [
        "I could speak English when I was a child.",
        "She could play the piano very well.",
        "He could not finish the project on time."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'those',
    level: 'A1',
    partOfSpeech: ["pronoun"],
    ipa_uk: '/ðəʊz/',
    ipa_us: '/ðəʊz/',
    meanings:   [
        {
              "pos": "pronoun",
              "en": "used to refer to people or things that are not near the speaker",
              "th": "ใช้เพื่ออ้างถึงบุคคลหรือสิ่งที่ไม่ได้อยู่ใกล้กับผู้พูด"
        }
  ],
    antonyms: ["these","this"],
    examples:   [
        "Those books are mine.",
        "I like those shoes, they are very nice.",
        "Those people are my friends."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'hello',
    level: 'A1',
    partOfSpeech: ["interjection"],
    ipa_uk: '/həˈləʊ/',
    ipa_us: '/həˈləʊ/',
    meanings:   [
        {
              "pos": "interjection",
              "en": "used as a greeting when meeting someone",
              "th": "ใช้เพื่อแสดงความเคารพเมื่อพบใครสักคน"
        }
  ],
    antonyms: ["goodbye","farewell"],
    examples:   [
        "Hello, how are you?",
        "She said hello to her friend on the phone.",
        "He waved and said hello to the crowd."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'any',
    level: 'A1',
    partOfSpeech: ["determiner"],
    ipa_uk: '/ˈæni/',
    ipa_us: '/ˈæni/',
    meanings:   [
        {
              "pos": "determiner",
              "en": "used to indicate a small or indefinite quantity",
              "th": "ใช้เพื่อแสดงปริมาณเล็กหรือไม่แน่นอน"
        }
  ],
    antonyms: ["none","all"],
    examples:   [
        "Do you have any money?",
        "I don't have any friends here.",
        "Is there any food left?"
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'watch',
    level: 'A1',
    partOfSpeech: ["verb","noun"],
    ipa_uk: '/wɒt͡ʃ/',
    ipa_us: '/wɒt͡ʃ/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to look at something or someone for a period of time",
              "th": "มองหรือดูสิ่งใดสิ่งหนึ่งหรือบุคคลเป็นเวลานาน"
        },
        {
              "pos": "noun",
              "en": "a device that shows the time",
              "th": "อุปกรณ์ที่แสดงเวลา"
        }
  ],
    antonyms: ["ignore","neglect"],
    examples:   [
        "I watch TV every night.",
        "She watches her weight carefully.",
        "He gave me his watch as a gift."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'week',
    level: 'A1',
    partOfSpeech: ["noun"],
    ipa_uk: '/wiːk/',
    ipa_us: '/wiːk/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a period of seven days",
              "th": "ช่วงเวลาเจ็ดวัน"
        }
  ],
    antonyms: ["month","year"],
    examples:   [
        "I have a meeting next week.",
        "She works five days a week.",
        "He is on vacation for a week."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'what',
    level: 'A1',
    partOfSpeech: ["pronoun"],
    ipa_uk: '/wɔt/',
    ipa_us: '/wɔt/',
    meanings:   [
        {
              "pos": "pronoun",
              "en": "used to ask for information or clarification",
              "th": "ใช้เพื่อขอข้อมูลหรือการชี้แจง"
        }
  ],
    antonyms: ["which","that"],
    examples:   [
        "What is your name?",
        "What time is it?",
        "I don't know what to do."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'surprise',
    level: 'A1',
    partOfSpeech: ["verb","noun"],
    ipa_uk: '/səˈpɹaɪz/',
    ipa_us: '/səˈpɹaɪz/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to cause someone to feel sudden and unexpected pleasure or astonishment",
              "th": "ทำให้ใครสักคนรู้สึกตื่นเต้นหรือประหลาดใจอย่างไม่คาดคิด"
        },
        {
              "pos": "noun",
              "en": "an unexpected or astonishing event or situation",
              "th": "เหตุการณ์หรือสถานการณ์ที่ไม่คาดคิดหรือตื่นตะลึง"
        }
  ],
    antonyms: ["expect","predict"],
    examples:   [
        "The surprise party was a success.",
        "I surprised my friend with a gift.",
        "The news was a surprise to everyone."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'help',
    level: 'A1',
    partOfSpeech: ["verb","noun"],
    ipa_uk: '/hɛlp/',
    ipa_us: '/hɛlp/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to give assistance or support to someone",
              "th": "ให้ความช่วยเหลือหรือการสนับสนุนแก่ใครสักคน"
        },
        {
              "pos": "noun",
              "en": "assistance or support given to someone",
              "th": "ความช่วยเหลือหรือการสนับสนุนที่ให้แก่ใครสักคน"
        }
  ],
    antonyms: ["hinder","obstruct"],
    examples:   [
        "Can you help me with my homework?",
        "She helps her mother with the household chores.",
        "He needs help to finish the project."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'ready',
    level: 'A1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈɹɛdi/',
    ipa_us: '/ˈɹɛdi/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "prepared or willing to do something",
              "th": "เตรียมพร้อมหรือเต็มใจที่จะทำสิ่งใดสิ่งหนึ่ง"
        }
  ],
    antonyms: ["unprepared","unwilling"],
    examples:   [
        "I am ready to go.",
        "She is ready to start her new job.",
        "He is not ready for the exam."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'swimming',
    level: 'A1',
    partOfSpeech: ["noun","verb"],
    ipa_uk: '/ˈswɪmɪŋ/',
    ipa_us: '/ˈswɪmɪŋ/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the act of moving through water using the limbs",
              "th": "การเคลื่อนไหวผ่านน้ำโดยใช้ขาหรือมือ"
        },
        {
              "pos": "verb",
              "en": "to move through water using the limbs",
              "th": "เคลื่อนไหวผ่านน้ำโดยใช้ขาหรือมือ"
        }
  ],
    antonyms: ["sinking","drowning"],
    examples:   [
        "I love swimming in the ocean.",
        "She is swimming in the pool.",
        "He goes swimming every weekend."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'horse',
    level: 'A1',
    partOfSpeech: ["noun"],
    ipa_uk: '/hɔːs/',
    ipa_us: '/hɔːs/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a large, hoofed, herbivorous mammal",
              "th": "สัตว์เลี้ยงลูกด้วยนมที่มีขนาดใหญ่ มีเขี้ยว และกินพืช"
        }
  ],
    antonyms: ["donkey","mule"],
    examples:   [
        "I love riding a horse.",
        "The horse is a beautiful animal.",
        "She has a horse farm in the countryside."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'we',
    level: 'A1',
    partOfSpeech: ["pronoun"],
    ipa_uk: '/wiː/',
    ipa_us: '/wiː/',
    meanings:   [
        {
              "pos": "pronoun",
              "en": "used to refer to the speaker and one or more other people",
              "th": "ใช้เพื่ออ้างถึงผู้พูดและบุคคลอื่นหนึ่งหรือหลายคน"
        }
  ],
    antonyms: ["they","I"],
    examples:   [
        "We are going to the movies tonight.",
        "We have a meeting at 2 o'clock.",
        "We love playing soccer together."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'bad',
    level: 'A1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/bæːd/',
    ipa_us: '/bæːd/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "of poor quality or unpleasant",
              "th": "มีคุณภาพไม่ดีหรือไม่พึงประสงค์"
        }
  ],
    antonyms: ["good","excellent"],
    examples:   [
        "The food was bad, so I didn't eat it.",
        "He has a bad habit of smoking.",
        "The movie was bad, I didn't like it."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'desk',
    level: 'A1',
    partOfSpeech: ["noun"],
    ipa_uk: '/dɛsk/',
    ipa_us: '/dɛsk/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a piece of furniture with a flat surface, used for writing or working",
              "th": "เฟอร์นิเจอร์ที่มีพื้นผิวเรียบ ใช้สำหรับเขียนหรือทำงาน"
        }
  ],
    antonyms: ["chair","table"],
    examples:   [
        "I work at my desk every day.",
        "The desk is too small for my computer.",
        "She sat at her desk and started writing."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'grass',
    level: 'A1',
    partOfSpeech: ["noun"],
    ipa_uk: '[ɡɹ̠äːs]',
    ipa_us: '[ɡɹ̠äːs]',
    meanings:   [
        {
              "pos": "noun",
              "en": "a type of plant with narrow leaves that is commonly found in lawns and fields",
              "th": "พืชชนิดหนึ่งที่มีใบแคบและพบได้ทั่วไปในสนามและทุ่ง"
        }
  ],
    antonyms: ["concrete","asphalt"],
    examples:   [
        "The grass is green and soft.",
        "She likes to play on the grass.",
        "He cut the grass in the backyard."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'interested',
    level: 'A1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈɪntəɹɛstəd/',
    ipa_us: '/ˈɪntəɹɛstəd/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "feeling curious or wanting to learn more about something",
              "th": "รู้สึกอยากรู้หรือต้องการเรียนรู้เพิ่มเติมเกี่ยวกับสิ่งใดสิ่งหนึ่ง"
        }
  ],
    antonyms: ["bored","uninterested"],
    examples:   [
        "I am interested in learning a new language.",
        "She is interested in science and technology.",
        "He is not interested in sports."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'than',
    level: 'A1',
    partOfSpeech: ["conjunction"],
    ipa_uk: '/ðæn/',
    ipa_us: '/ðæn/',
    meanings:   [
        {
              "pos": "conjunction",
              "en": "used to compare two things",
              "th": "ใช้เพื่อเปรียบเทียบสองสิ่ง"
        }
  ],
    antonyms: ["like","as"],
    examples:   [
        "I am taller than my brother.",
        "She runs faster than me.",
        "He is more intelligent than his sister."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'again',
    level: 'A1',
    partOfSpeech: ["adverb"],
    ipa_uk: '/əˈɡeɪn/',
    ipa_us: '/əˈɡeɪn/',
    meanings:   [
        {
              "pos": "adverb",
              "en": "one more time, or another time",
              "th": "อีกครั้งหนึ่ง หรือครั้งอื่น"
        }
  ],
    antonyms: ["never","once"],
    examples:   [
        "I will see you again tomorrow.",
        "She wants to try again.",
        "He did it again, and I'm not happy."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },

  {
    word: 'recruit',
    level: 'B2',
    partOfSpeech: ["verb [T]","noun [C]"],
    ipa_uk: '/ɹɪˈkɹuːt/',
    ipa_us: '/ɹɪˈkɹuːt/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to find and employ new people to work for an organization",
              "th": "รับเข้าทำงานหรือเข้าร่วมองค์กร"
        },
        {
              "pos": "noun",
              "en": "a person who has recently joined a company, organization, or the army",
              "th": "บุคคลที่เพิ่งเข้าร่วมงาน องค์กร หรือทหาร"
        }
  ],
    antonyms: ["fire","dismiss"],
    examples:   [
        "The company will recruit new staff next month.",
        "She was a recruit in the army for two years.",
        "The football team will recruit new players for the upcoming season."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'colon',
    level: 'B2',
    partOfSpeech: ["noun [C]"],
    ipa_uk: '/ˈkəʊ.lɒn/',
    ipa_us: '/ˈkəʊ.lɒn/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a punctuation mark (:)",
              "th": "เครื่องหมายวรรคตอน (:) "
        },
        {
              "pos": "noun",
              "en": "a part of the large intestine",
              "th": "ส่วนหนึ่งของลำไส้ใหญ่"
        }
  ],
    antonyms: ["comma","semicolon"],
    examples:   [
        "Use a colon to separate hours from minutes.",
        "The doctor specialized in colon cancer treatment.",
        "The colon is an essential part of the digestive system."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'desolation',
    level: 'B2',
    partOfSpeech: ["noun [U]"],
    ipa_uk: '/ˌdɛsəˈleɪʃən/',
    ipa_us: '/ˌdɛsəˈleɪʃən/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a state of being empty or uninhabited",
              "th": "สภาพที่ว่างเปล่าหรือไม่มีผู้คนอาศัย"
        },
        {
              "pos": "noun",
              "en": "a feeling of great sadness or loneliness",
              "th": "ความรู้สึกที่น่าเศร้าหรือเหงา"
        }
  ],
    antonyms: ["happiness","prosperity"],
    examples:   [
        "The desolation of the landscape was depressing.",
        "The city was left in desolation after the war.",
        "The desolation in her eyes was heartbreaking."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'astronomy',
    level: 'B2',
    partOfSpeech: ["noun [U]"],
    ipa_uk: '/æˈstɹɑnəˌmi/',
    ipa_us: '/æˈstɹɑnəˌmi/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the study of the universe, stars, and planets",
              "th": "การศึกษาจักรวาล ดวงดาว และดาวเคราะห์"
        }
  ],
    antonyms: ["geology","biology"],
    examples:   [
        "Astronomy is a fascinating field of study.",
        "The astronomy club will meet tonight to observe the stars.",
        "The university offers a degree in astronomy."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'serial',
    level: 'B2',
    partOfSpeech: ["adjective","noun [C]"],
    ipa_uk: '/ˈsɪəɹiːəɫ/',
    ipa_us: '/ˈsɪəɹiːəɫ/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "happening or done in a series of events",
              "th": "เกิดขึ้นหรือทำเป็นชุดของเหตุการณ์"
        },
        {
              "pos": "noun",
              "en": "a story or show that is broadcast in several parts",
              "th": "เรื่องราวหรือรายการโทรทัศน์ที่ออกอากาศเป็นหลายตอน"
        }
  ],
    antonyms: ["single","individual"],
    examples:   [
        "The serial killer was caught by the police.",
        "The serial number on the product is unique.",
        "The serial drama was very popular among audiences."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'commonwealth',
    level: 'B2',
    partOfSpeech: ["noun [C]"],
    ipa_uk: '/ˈkɔmənˌwɛlθ/',
    ipa_us: '/ˈkɔmənˌwɛlθ/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a group of countries that were formerly part of the British Empire",
              "th": "กลุ่มประเทศที่เคยเป็นส่วนหนึ่งของจักรวรรดิบริติช"
        }
  ],
    antonyms: ["empire","kingdom"],
    examples:   [
        "The Commonwealth Games are held every four years.",
        "The country is a member of the Commonwealth.",
        "The Commonwealth is a voluntary association of countries."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'disciple',
    level: 'B2',
    partOfSpeech: ["noun [C]"],
    ipa_uk: '/dɪˈsaɪpl̩/',
    ipa_us: '/dɪˈsaɪpl̩/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a person who follows and learns from a teacher or leader",
              "th": "บุคคลที่ตามและเรียนรู้จากครูหรือผู้นำ"
        }
  ],
    antonyms: ["opponent","enemy"],
    examples:   [
        "Jesus had twelve disciples.",
        "The disciple of the famous artist became a great painter.",
        "The disciple was devoted to his master."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'miniature',
    level: 'B2',
    partOfSpeech: ["adjective","noun [C]"],
    ipa_uk: '/ˈmɪn(ɪ)ətʃə(ɹ)/',
    ipa_us: '/ˈmɪn(ɪ)ətʃə(ɹ)/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "very small",
              "th": "เล็กมาก"
        },
        {
              "pos": "noun",
              "en": "a small copy of something",
              "th": "สำเนาที่เล็กของสิ่งใดสิ่งหนึ่ง"
        }
  ],
    antonyms: ["enormous","giant"],
    examples:   [
        "The miniature dog was cute.",
        "The artist created a miniature sculpture.",
        "The miniature model of the car was detailed."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'unlimited',
    level: 'B2',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ʌnˈlɪmɪtɪd/',
    ipa_us: '/ʌnˈlɪmɪtɪd/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "having no limits or restrictions",
              "th": "ไม่มีข้อจำกัดหรือการจำกัด"
        }
  ],
    antonyms: ["limited","restricted"],
    examples:   [
        "The company offers unlimited internet data.",
        "The unlimited possibilities of the future are exciting.",
        "The unlimited budget allowed the team to be creative."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'abruptly',
    level: 'B2',
    partOfSpeech: ["adverb"],
    ipa_uk: '/ə.ˈbɹʌpt.li/',
    ipa_us: '/ə.ˈbɹʌpt.li/',
    meanings:   [
        {
              "pos": "adverb",
              "en": "suddenly and unexpectedly",
              "th": "อย่าง突然และไม่คาดคิด"
        }
  ],
    antonyms: ["gradually","slowly"],
    examples:   [
        "The meeting ended abruptly.",
        "The car stopped abruptly in the middle of the road.",
        "The weather changed abruptly from sunny to rainy."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'manipulate',
    level: 'B2',
    partOfSpeech: ["verb [T]"],
    ipa_uk: '/məˈnɪpjʊleɪt/',
    ipa_us: '/məˈnɪpjʊleɪt/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to control or influence someone or something in a clever or unfair way",
              "th": "ควบคุมหรือมีอิทธิพลต่อคนหรือสิ่งใดสิ่งหนึ่งด้วยวิธีที่ชาญฉลาดหรือไม่ยุติธรรม"
        }
  ],
    antonyms: ["respect","honor"],
    examples:   [
        "The politician tried to manipulate public opinion.",
        "The company manipulates the market to increase profits.",
        "The artist learned to manipulate light and shadow in her paintings."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'mansion',
    level: 'B2',
    partOfSpeech: ["noun [C]"],
    ipa_uk: '/ˈmæn(t)ʃən/',
    ipa_us: '/ˈmæn(t)ʃən/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a very large and impressive house",
              "th": "บ้านที่มีขนาดใหญ่และน่าประทับใจ"
        }
  ],
    antonyms: ["hut","shack"],
    examples:   [
        "The millionaire lived in a grand mansion.",
        "The mansion had a beautiful garden and a swimming pool.",
        "The mansion was built in the 19th century."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'fox',
    level: 'B2',
    partOfSpeech: ["noun [C]"],
    ipa_uk: '/fɒks/',
    ipa_us: '/fɒks/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a small to medium-sized omnivorous mammal",
              "th": "สัตว์เลี้ยงลูกด้วยนมกินได้ทุกอย่างขนาดเล็กถึงขนาดกลาง"
        },
        {
              "pos": "noun",
              "en": "a sly or cunning person",
              "th": "บุคคลที่ฉลาดหรือมีเล่ห์เหลี่ยม"
        }
  ],
    antonyms: ["lion","elephant"],
    examples:   [
        "The fox is a solitary animal.",
        "The fox is known for its intelligence and cunning.",
        "The fox and the grapes is a famous fable."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'encounter',
    level: 'B2',
    partOfSpeech: ["noun [C]","verb [T]"],
    ipa_uk: '/ɪnˈkaʊntə/',
    ipa_us: '/ɪnˈkaʊntə/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a meeting or meeting with someone or something",
              "th": "การพบปะหรือสัมผัสกับคนหรือสิ่งใดสิ่งหนึ่ง"
        },
        {
              "pos": "verb",
              "en": "to meet or experience something, especially something unpleasant",
              "th": "พบปะหรือประสบสิ่งใดสิ่งหนึ่ง โดยเฉพาะอย่างยิ่งสิ่งที่ไม่พึงประสงค์"
        }
  ],
    antonyms: ["avoid","evade"],
    examples:   [
        "The encounter between the two friends was emotional.",
        "The hikers encountered a bear in the woods.",
        "The company will encounter many challenges in the future."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'pessimistic',
    level: 'B2',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˌpɛ.səˈmɪs.tɪk/',
    ipa_us: '/ˌpɛ.səˈmɪs.tɪk/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "having a negative or hopeless outlook on life",
              "th": "มีมุมมองที่ไม่ดีหรือไม่มีความหวังต่อชีวิต"
        }
  ],
    antonyms: ["optimistic","hopeful"],
    examples:   [
        "The pessimistic view of the future is depressing.",
        "The pessimistic attitude of the team affected their performance.",
        "The pessimistic forecast predicted a recession."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'input',
    level: 'B2',
    partOfSpeech: ["noun [C]"],
    ipa_uk: '/ˈɪnpʊt/',
    ipa_us: '/ˈɪnpʊt/',
    meanings:   [
        {
              "pos": "noun",
              "en": "something that is put into a machine or system",
              "th": "สิ่งที่ใส่เข้าไปในเครื่องจักรหรือระบบ"
        },
        {
              "pos": "noun",
              "en": "a contribution or suggestion, especially one that is useful or helpful",
              "th": "การมีส่วนร่วมหรือคำแนะนำ โดยเฉพาะอย่างยิ่งคำแนะนำที่มีประโยชน์หรือมีประโยชน์"
        }
  ],
    antonyms: ["output","result"],
    examples:   [
        "The computer requires an input of data to function.",
        "The team needs input from the stakeholders to make a decision.",
        "The input of the expert was invaluable to the project."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'upgrade',
    level: 'B2',
    partOfSpeech: ["noun [C]","verb [T]"],
    ipa_uk: '/ˈʌp.ɡɹeɪd/',
    ipa_us: '/ˈʌp.ɡɹeɪd/',
    meanings:   [
        {
              "pos": "noun",
              "en": "an improvement or increase in quality, size, or amount",
              "th": "การปรับปรุงหรือเพิ่มขึ้นในด้านคุณภาพ ขนาด หรือปริมาณ"
        },
        {
              "pos": "verb",
              "en": "to improve or increase something, especially in quality, size, or amount",
              "th": "ปรับปรุงหรือเพิ่มขึ้น โดยเฉพาะอย่างยิ่งในด้านคุณภาพ ขนาด หรือปริมาณ"
        }
  ],
    antonyms: ["downgrade","deteriorate"],
    examples:   [
        "The company will upgrade its software next month.",
        "The upgrade to the new phone was worth it.",
        "The hotel room was upgraded to a suite."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'journalism',
    level: 'B2',
    partOfSpeech: ["noun [U]"],
    ipa_uk: '/ˈdʒɜːn(ə)lɪzəm/',
    ipa_us: '/ˈdʒɜːn(ə)lɪzəm/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the work of collecting, writing, and publishing news",
              "th": "งานเก็บข้อมูล เขียนและตีพิมพ์ข่าว"
        }
  ],
    antonyms: ["fiction","entertainment"],
    examples:   [
        "Journalism is a challenging and rewarding career.",
        "The journalism student won an award for her investigative report.",
        "The journalism industry is facing many changes."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },

  {
    word: 'aboard',
    level: 'C1',
    partOfSpeech: ["preposition","adverb"],
    ipa_uk: '/əˈbɔːd/',
    ipa_us: '/əˈbɔːd/',
    meanings:   [
        {
              "pos": "preposition",
              "en": "on or onto a ship, plane, or train",
              "th": "บนหรือเข้าสู่เรือ เครื่องบิน หรือรถไฟ"
        },
        {
              "pos": "adverb",
              "en": "on or onto something",
              "th": "บนหรือเข้าสู่สิ่งใดสิ่งหนึ่ง"
        }
  ],
    antonyms: ["ashore","onshore"],
    examples:   [
        "The passengers got aboard the plane and found their seats.",
        "The crew welcomed us aboard with a smile and a drink.",
        "The new policy will be implemented aboard all company ships."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'clutch',
    level: 'C1',
    partOfSpeech: ["verb","noun"],
    ipa_uk: '/klʌt͡ʃ/',
    ipa_us: '/klʌt͡ʃ/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to hold something tightly",
              "th": "จับหรือยึดสิ่งใดสิ่งหนึ่งให้แน่น"
        },
        {
              "pos": "noun",
              "en": "a device for connecting and disconnecting two rotating shafts",
              "th": "อุปกรณ์สำหรับต่อและแยกแกนหมุนสองแกน"
        }
  ],
    antonyms: ["release","let go"],
    examples:   [
        "She clutched her purse tightly as she walked through the crowded market.",
        "The driver had to clutch the steering wheel to avoid the accident.",
        "The clutch in my car is broken, I need to get it fixed."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'restorative',
    level: 'C1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ɹɪˈstɒɹətɪv/',
    ipa_us: '/ɹɪˈstɒɹətɪv/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "helping to restore or improve something",
              "th": "ช่วยให้ฟื้นฟูหรือปรับปรุงสิ่งใดสิ่งหนึ่ง"
        }
  ],
    antonyms: ["detrimental","harmful"],
    examples:   [
        "The restorative justice program aims to repair the harm caused by the crime.",
        "The restorative powers of sleep can help improve cognitive function.",
        "The restorative properties of the cream can help soothe and heal the skin."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'elastic',
    level: 'C1',
    partOfSpeech: ["adjective","noun"],
    ipa_uk: '/iˈlæstɪk/',
    ipa_us: '/iˈlæstɪk/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "able to stretch or deform and then return to its original shape",
              "th": "สามารถยืดหรือเปลี่ยนรูปและกลับสู่รูปเดิม"
        },
        {
              "pos": "noun",
              "en": "a type of fabric or material that can stretch",
              "th": "ประเภทของเนื้อผ้าหรือวัสดุที่สามารถยืดได้"
        }
  ],
    antonyms: ["inflexible","rigid"],
    examples:   [
        "The elastic band snapped back into place after being stretched.",
        "The elastic properties of the material make it ideal for clothing.",
        "The elastic in my pants is worn out, I need to get them fixed."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'ingenuity',
    level: 'C1',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˌɪndʒəˈn(j)uːəti/',
    ipa_us: '/ˌɪndʒəˈn(j)uːəti/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the quality of being clever and inventive",
              "th": "คุณสมบัติของการเป็นคนฉลาดและคิดค้น"
        }
  ],
    antonyms: ["ineptness","incompetence"],
    examples:   [
        "The ingenuity of the solution impressed the judges.",
        "The ingenuity of the inventor led to the creation of many innovative products.",
        "The ingenuity of the team helped them overcome the challenges and achieve their goal."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'portray',
    level: 'C1',
    partOfSpeech: ["verb"],
    ipa_uk: '/pɔɹˈtɹeɪ/',
    ipa_us: '/pɔɹˈtɹeɪ/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to describe or represent someone or something in a particular way",
              "th": "อธิบายหรือแสดงถึงใครหรือสิ่งใดในลักษณะเฉพาะ"
        }
  ],
    antonyms: ["misrepresent","distort"],
    examples:   [
        "The artist's painting portrays a beautiful landscape.",
        "The movie portrays the life of a famous historical figure.",
        "The writer's words portray a sense of sadness and loss."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'raunchy',
    level: 'C1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈɹɔːntʃi/',
    ipa_us: '/ˈɹɔːntʃi/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "having or showing a strong and often shocking sexual quality",
              "th": "มีคุณภาพทางเพศที่เข้มข้นและบางครั้งทำให้ตกใจ"
        }
  ],
    antonyms: ["tame","innocent"],
    examples:   [
        "The raunchy humor in the movie was not suitable for all audiences.",
        "The raunchy lyrics of the song were criticized by some listeners.",
        "The raunchy atmosphere of the club was not what I expected."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'sap',
    level: 'C1',
    partOfSpeech: ["verb","noun"],
    ipa_uk: '/sæp/',
    ipa_us: '/sæp/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to weaken or drain the energy or strength of something",
              "th": "ทำให้อ่อนแอหรือหมดพลังหรือความแข็งแรงของสิ่งใดสิ่งหนึ่ง"
        },
        {
              "pos": "noun",
              "en": "a fluid that flows through the vessels of a plant",
              "th": "ของเหลวที่ไหลผ่านหลอดเลือดของพืช"
        }
  ],
    antonyms: ["strengthen","energize"],
    examples:   [
        "The disease can sap the strength of the infected person.",
        "The sap of the tree is used to make medicine.",
        "The long journey can sap your energy, so be sure to rest."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'monotony',
    level: 'C1',
    partOfSpeech: ["noun"],
    ipa_uk: '/məˈnɒtəni/',
    ipa_us: '/məˈnɒtəni/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the quality of being dull and uninteresting",
              "th": "คุณสมบัติของการเป็นคนน่าเบื่อและไม่น่าสนใจ"
        }
  ],
    antonyms: ["variety","diversity"],
    examples:   [
        "The monotony of the task made it difficult to stay focused.",
        "The monotony of the landscape made the journey feel long and boring.",
        "The monotony of the routine was broken by the surprise party."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'commend',
    level: 'C1',
    partOfSpeech: ["verb"],
    ipa_uk: '/kəˈmɛnd/',
    ipa_us: '/kəˈmɛnd/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to praise or express approval of someone or something",
              "th": "เพื่อชื่นชมหรือแสดงความเห็นชอบต่อใครหรือสิ่งใด"
        }
  ],
    antonyms: ["criticize","condemn"],
    examples:   [
        "The manager commended the team for their hard work.",
        "The teacher commended the student for their excellent grades.",
        "The company commended the employee for their innovative idea."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'unison',
    level: 'C1',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈjunɨsən/',
    ipa_us: '/ˈjunɨsən/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the state of being in harmony or agreement",
              "th": "สถานะของการอยู่ในความสามัคคีหรือความเห็นชอบ"
        }
  ],
    antonyms: ["discord","disagreement"],
    examples:   [
        "The choir sang in unison, their voices blending together beautifully.",
        "The team worked in unison to achieve their goal.",
        "The crowd spoke in unison, demanding justice for the victim."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'forensic',
    level: 'C1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/fəˈɹɛn.sɪk/',
    ipa_us: '/fəˈɹɛn.sɪk/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "relating to the use of science or technology in the investigation of crimes",
              "th": "เกี่ยวข้องกับการใช้วิทยาศาสตร์หรือเทคโนโลยีในการสืบสวนอาชญากรรม"
        }
  ],
    antonyms: ["unscientific","amateur"],
    examples:   [
        "The forensic evidence was used to solve the crime.",
        "The forensic team analyzed the DNA samples to identify the suspect.",
        "The forensic expert testified in court about the findings."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'sacrifice',
    level: 'C1',
    partOfSpeech: ["verb","noun"],
    ipa_uk: '/ˈsækɹɪfaɪs/',
    ipa_us: '/ˈsækɹɪfaɪs/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to give up something valuable or important",
              "th": "ให้บางสิ่งที่มีค่าหรือสำคัญ"
        },
        {
              "pos": "noun",
              "en": "the act of giving up something valuable or important",
              "th": "การกระทำของการให้บางสิ่งที่มีค่าหรือสำคัญ"
        }
  ],
    antonyms: ["gain","benefit"],
    examples:   [
        "She sacrificed her own needs for the sake of her family.",
        "The team made a sacrifice to win the game, giving up their best player.",
        "The sacrifice of the hero will never be forgotten."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'compel',
    level: 'C1',
    partOfSpeech: ["verb"],
    ipa_uk: '/kəmˈpɛl/',
    ipa_us: '/kəmˈpɛl/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to force or persuade someone to do something",
              "th": "บังคับหรือชักชวนให้ใครทำบางสิ่ง"
        }
  ],
    antonyms: ["deter","discourage"],
    examples:   [
        "The evidence compelled the jury to deliver a guilty verdict.",
        "The circumstances compelled her to make a difficult decision.",
        "The need to survive compelled the group to work together."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'midwife',
    level: 'C1',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈmɪd.waɪf/',
    ipa_us: '/ˈmɪd.waɪf/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a person who helps women give birth",
              "th": "บุคคลที่ช่วยเหลือผู้หญิงให้กำเนิด"
        }
  ],
    antonyms: ["obstetrician","doctor"],
    examples:   [
        "The midwife assisted the mother during the delivery.",
        "The midwife provided emotional support to the new mother.",
        "The midwife played a crucial role in the birth of the baby."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'jurisdiction',
    level: 'C1',
    partOfSpeech: ["noun"],
    ipa_uk: '/d͡ʒɔːɹɪsˈdɪkʃən/',
    ipa_us: '/d͡ʒɔːɹɪsˈdɪkʃən/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the authority of a court or government to make decisions",
              "th": "อำนาจของศาลหรือรัฐบาลในการตัดสินใจ"
        }
  ],
    antonyms: ["exclusion","exception"],
    examples:   [
        "The court had jurisdiction over the case and made a ruling.",
        "The jurisdiction of the local government was limited.",
        "The company was subject to the jurisdiction of the regulatory agency."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'supple',
    level: 'C1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈsʌpəl/',
    ipa_us: '/ˈsʌpəl/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "able to bend or flex easily",
              "th": "สามารถงอหรือยืดได้ง่าย"
        }
  ],
    antonyms: ["stiff","rigid"],
    examples:   [
        "The supple leather made the shoes comfortable to wear.",
        "The supple branches of the tree swayed in the wind.",
        "The supple muscles of the athlete allowed her to perform complex movements."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },

  {
    word: 'married',
    level: 'A2',
    partOfSpeech: ["verb","adjective"],
    ipa_uk: '/ˈmæɹ.ɪd/',
    ipa_us: '/ˈmæɹ.ɪd/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to become someone's husband or wife",
              "th": "แต่งงาน"
        },
        {
              "pos": "adjective",
              "en": "having a husband or wife",
              "th": "ที่แต่งงานแล้ว"
        }
  ],
    antonyms: ["single","unmarried"],
    examples:   [
        "They got married last year.",
        "My married friends have a lot of responsibilities.",
        "The married couple has two kids."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'prediction',
    level: 'A2',
    partOfSpeech: ["noun"],
    ipa_uk: '/pɹɪˈdɪkʃn/',
    ipa_us: '/pɹɪˈdɪkʃn/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a statement about what will happen in the future",
              "th": "การทำนาย"
        }
  ],
    antonyms: ["fact","reality"],
    examples:   [
        "The weather forecast is just a prediction.",
        "Her prediction about the company's success was correct.",
        "The prediction of the earthquake was made by scientists."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'ankle',
    level: 'A2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈæŋ.kəl/',
    ipa_us: '/ˈæŋ.kəl/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the joint that connects the foot to the leg",
              "th": "ข้อเท้า"
        }
  ],
    antonyms: ["knee","elbow"],
    examples:   [
        "She twisted her ankle while running.",
        "The doctor examined my ankle and said it was broken.",
        "The ankle is a common injury in sports."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'violent',
    level: 'A2',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈvaɪ(ə)lənt/',
    ipa_us: '/ˈvaɪ(ə)lənt/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "using or involving physical force intended to hurt or kill",
              "th": "ที่ใช้ความรุนแรง"
        }
  ],
    antonyms: ["peaceful","nonviolent"],
    examples:   [
        "The violent storm caused a lot of damage.",
        "The movie was too violent for children.",
        "The violent crime rate has increased in the city."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'receive',
    level: 'A2',
    partOfSpeech: ["verb"],
    ipa_uk: '/ɹɪˈsiːv/',
    ipa_us: '/ɹɪˈsiːv/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to get or be given something",
              "th": "ได้รับ"
        }
  ],
    antonyms: ["send","give"],
    examples:   [
        "I receive a lot of emails every day.",
        "She will receive a prize for her outstanding work.",
        "The company will receive a large investment from investors."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'bill',
    level: 'A2',
    partOfSpeech: ["noun","verb"],
    ipa_uk: '/bɪl/',
    ipa_us: '/bɪl/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a document that shows the amount of money you owe for something",
              "th": "ใบเรียกเก็บเงิน"
        },
        {
              "pos": "verb",
              "en": "to ask someone to pay for something",
              "th": "เรียกเก็บเงิน"
        }
  ],
    antonyms: ["pay","refund"],
    examples:   [
        "The bill for the dinner was very expensive.",
        "The company will bill you for the services provided.",
        "I need to pay the bill before the deadline."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'truth',
    level: 'A2',
    partOfSpeech: ["noun"],
    ipa_uk: '/tɹuːθ/',
    ipa_us: '/tɹuːθ/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the quality of being true or accurate",
              "th": "ความจริง"
        }
  ],
    antonyms: ["lie","falsehood"],
    examples:   [
        "The truth is that I don't like the movie.",
        "She told the truth about what happened.",
        "The truth will come out eventually."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'crazy',
    level: 'A2',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈkɹeɪzi/',
    ipa_us: '/ˈkɹeɪzi/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "mentally ill or unstable",
              "th": "บ้า"
        },
        {
              "pos": "adjective",
              "en": "extremely foolish or absurd",
              "th": "บ้าๆ บอๆ"
        }
  ],
    antonyms: ["sane","reasonable"],
    examples:   [
        "He's crazy about playing football.",
        "The crazy driver almost hit me.",
        "I think it's crazy to spend that much money on a car."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'whatever',
    level: 'A2',
    partOfSpeech: ["pronoun","adverb"],
    ipa_uk: '/wɒtˈɛvə/',
    ipa_us: '/wɒtˈɛvə/',
    meanings:   [
        {
              "pos": "pronoun",
              "en": "anything or everything",
              "th": "อะไรก็ได้"
        },
        {
              "pos": "adverb",
              "en": "used to show that you do not care about something",
              "th": "อะไรก็ได้"
        }
  ],
    antonyms: ["nothing","none"],
    examples:   [
        "You can eat whatever you want.",
        "I'll do whatever it takes to succeed.",
        "Whatever happens, I'll be there for you."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'youth',
    level: 'A2',
    partOfSpeech: ["noun"],
    ipa_uk: '/juθ/',
    ipa_us: '/juθ/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the period of life when someone is young",
              "th": "วัยหนุ่มสาว"
        }
  ],
    antonyms: ["old age","adulthood"],
    examples:   [
        "The youth of today are very different from the past.",
        "Youth is a time of discovery and exploration.",
        "The youth center provides activities for young people."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'modern',
    level: 'A2',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈmɒd(ə)n/',
    ipa_us: '/ˈmɒd(ə)n/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "new and up-to-date",
              "th": "สมัยใหม่"
        }
  ],
    antonyms: ["old","traditional"],
    examples:   [
        "The modern city is very different from the old town.",
        "The company uses modern technology to improve efficiency.",
        "The modern art museum has a unique collection."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'loose',
    level: 'A2',
    partOfSpeech: ["adjective","verb"],
    ipa_uk: '/luːs/',
    ipa_us: '/luːs/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "not tight or secure",
              "th": "หลวม"
        },
        {
              "pos": "verb",
              "en": "to make something loose or free",
              "th": "ทำให้หลวม"
        }
  ],
    antonyms: ["tight","secure"],
    examples:   [
        "The loose screw needs to be tightened.",
        "She has a loose tooth that needs to be pulled out.",
        "The dog was loose in the park and ran away."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'champagne',
    level: 'A2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ʃæmˈpeɪn/',
    ipa_us: '/ʃæmˈpeɪn/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a type of sparkling wine",
              "th": "แชมเปญ"
        }
  ],
    antonyms: ["water","juice"],
    examples:   [
        "We drank champagne to celebrate our anniversary.",
        "The champagne was very expensive.",
        "Champagne is often served at weddings and parties."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'knowledge',
    level: 'A2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈnɒlɪdʒ/',
    ipa_us: '/ˈnɒlɪdʒ/',
    meanings:   [
        {
              "pos": "noun",
              "en": "information, understanding, or skill that you get from experience or education",
              "th": "ความรู้"
        }
  ],
    antonyms: ["ignorance","lack of understanding"],
    examples:   [
        "The professor has a lot of knowledge about history.",
        "The company values knowledge and innovation.",
        "The knowledge of a new language can open up new opportunities."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'feature',
    level: 'A2',
    partOfSpeech: ["noun","verb"],
    ipa_uk: '/ˈfiːtʃə/',
    ipa_us: '/ˈfiːtʃə/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a part of something that is interesting or important",
              "th": "คุณลักษณะ"
        },
        {
              "pos": "verb",
              "en": "to include or show something as a special part of a program or performance",
              "th": "นำเสนอ"
        }
  ],
    antonyms: ["缺点","disadvantage"],
    examples:   [
        "The new smartphone has many exciting features.",
        "The movie will feature a famous actor.",
        "The feature of the new car is its advanced safety system."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'track',
    level: 'A2',
    partOfSpeech: ["noun","verb"],
    ipa_uk: '/tɹæk/',
    ipa_us: '/tɹæk/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a path or route, especially one made for walking, running, or driving",
              "th": "เส้นทาง"
        },
        {
              "pos": "verb",
              "en": "to follow or find the path or route of something or someone",
              "th": "ติดตาม"
        }
  ],
    antonyms: ["lose","misplace"],
    examples:   [
        "The track was very difficult to follow.",
        "The athlete will track her progress to improve her performance.",
        "The company will track the sales data to make informed decisions."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'ring',
    level: 'A2',
    partOfSpeech: ["noun","verb"],
    ipa_uk: '/ɹɪŋ/',
    ipa_us: '/ɹɪŋ/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a circular piece of jewelry, especially one that is worn on the finger",
              "th": "แหวน"
        },
        {
              "pos": "verb",
              "en": "to make a loud, clear sound, like a bell",
              "th": "ดัง"
        }
  ],
    antonyms: ["silent","quiet"],
    examples:   [
        "The ring on her finger is very beautiful.",
        "The phone will ring when someone calls.",
        "The bell will ring to signal the start of the class."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'beauty',
    level: 'A2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈbuːti/',
    ipa_us: '/ˈbuːti/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the quality of being pleasing, attractive, or beautiful",
              "th": "ความสวยงาม"
        }
  ],
    antonyms: ["ugliness","unattractiveness"],
    examples:   [
        "The beauty of nature is breathtaking.",
        "The beauty of the city is its unique architecture.",
        "The beauty of the painting is its use of color and light."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'forever',
    level: 'A2',
    partOfSpeech: ["adverb"],
    ipa_uk: '/fəˈɹɛvə(ɹ)/',
    ipa_us: '/fəˈɹɛvə(ɹ)/',
    meanings:   [
        {
              "pos": "adverb",
              "en": "always, or for a very long time",
              "th": "ตลอดไป"
        }
  ],
    antonyms: ["never","temporarily"],
    examples:   [
        "I will love you forever.",
        "The company will be in business forever.",
        "The memory of the event will last forever."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'sew',
    level: 'A2',
    partOfSpeech: ["verb"],
    ipa_uk: '/səʊ/',
    ipa_us: '/səʊ/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to join or repair something using a needle and thread",
              "th": "เย็บ"
        }
  ],
    antonyms: ["tear","unsew"],
    examples:   [
        "She will sew the torn page back together.",
        "The tailor will sew a new suit for the wedding.",
        "The seamstress will sew a beautiful dress for the party."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'belong',
    level: 'A2',
    partOfSpeech: ["verb"],
    ipa_uk: '/bɪˈlɒŋ/',
    ipa_us: '/bɪˈlɒŋ/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to be a part of something, or to be in a place where you feel comfortable or at home",
              "th": "เป็นส่วนหนึ่ง"
        }
  ],
    antonyms: ["not belong","be excluded"],
    examples:   [
        "I feel like I belong in this community.",
        "The book belongs on the shelf.",
        "The keys belong to my brother."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'comic',
    level: 'A2',
    partOfSpeech: ["noun","adjective"],
    ipa_uk: '/ˈkɒmɪk/',
    ipa_us: '/ˈkɒmɪk/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a book or magazine that contains cartoons or humorous stories",
              "th": "หนังสือการ์ตูน"
        },
        {
              "pos": "adjective",
              "en": "funny or amusing",
              "th": "ตลก"
        }
  ],
    antonyms: ["tragic","serious"],
    examples:   [
        "The comic book is very popular among kids.",
        "The comic actor is known for his funny performances.",
        "The comic strip is a fun way to tell a story."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'architecture',
    level: 'A2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈɑː.kɪ.ˌtɛk.tʃə/',
    ipa_us: '/ˈɑː.kɪ.ˌtɛk.tʃə/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the art or science of designing and building buildings, bridges, and other structures",
              "th": "สถาปัตยกรรม"
        }
  ],
    antonyms: ["destruction","demolition"],
    examples:   [
        "The architecture of the city is very unique.",
        "The company specializes in sustainable architecture.",
        "The architecture of the ancient temple is impressive."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'oil',
    level: 'A2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ɔɪl/',
    ipa_us: '/ɔɪl/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a liquid substance that is used as a fuel, lubricant, or in cooking",
              "th": "น้ำมัน"
        }
  ],
    antonyms: ["water","gas"],
    examples:   [
        "The car needs oil to run.",
        "The cook used oil to fry the food.",
        "The company drills for oil in the ocean."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },

  {
    word: 'sponsor',
    level: 'B1',
    partOfSpeech: ["noun","verb"],
    ipa_uk: '/ˈspɒn.sə/',
    ipa_us: '/ˈspɒn.sə/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a person or organization that gives money to support an event, person, or activity",
              "th": "ผู้สนับสนุนหรือองค์กรที่ให้เงินสนับสนุนกิจกรรม บุคคล หรืองาน"
        },
        {
              "pos": "verb",
              "en": "to support an event, person, or activity by giving money",
              "th": "ให้การสนับสนุนโดยการให้เงินแก่บุคคล กิจกรรม หรืองาน"
        }
  ],
    antonyms: ["opponent","rival"],
    examples:   [
        "The company will sponsor the charity event.",
        "She sponsored her friend's education.",
        "The sports team is looking for a sponsor to support their tournament."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'dishwasher',
    level: 'B1',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈdɪʃˌwɒʃə/',
    ipa_us: '/ˈdɪʃˌwɒʃə/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a machine that washes dishes",
              "th": "เครื่องล้างจาน"
        }
  ],
    antonyms: ["dishwasher","manual"],
    examples:   [
        "I loaded the dishwasher with dirty dishes.",
        "The dishwasher is broken, we need to fix it.",
        "She prefers to wash dishes by hand instead of using the dishwasher."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'massive',
    level: 'B1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈmæs.ɪv/',
    ipa_us: '/ˈmæs.ɪv/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "very large or heavy",
              "th": "ใหญ่มากหรือหนักมาก"
        }
  ],
    antonyms: ["small","tiny"],
    examples:   [
        "The massive stone statue stood in the city center.",
        "The company has a massive debt to pay off.",
        "The massive earthquake destroyed the city."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'majority',
    level: 'B1',
    partOfSpeech: ["noun"],
    ipa_uk: '/məˈd͡ʒɒɹɪti/',
    ipa_us: '/məˈd͡ʒɒɹɪti/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the larger number of people or things in a group",
              "th": "จำนวนมากในกลุ่ม"
        }
  ],
    antonyms: ["minority","few"],
    examples:   [
        "The majority of students voted for the new school policy.",
        "The majority of people in the town speak English as their first language.",
        "The majority of the company's profits come from overseas sales."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'weapon',
    level: 'B1',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈwɛ.pən/',
    ipa_us: '/ˈwɛ.pən/',
    meanings:   [
        {
              "pos": "noun",
              "en": "an object used for fighting or attacking",
              "th": "อาวุธ"
        }
  ],
    antonyms: ["shield","protection"],
    examples:   [
        "The soldier carried a weapon into battle.",
        "The new weapon is more powerful than the old one.",
        "The company develops weapons for the military."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'arise',
    level: 'B1',
    partOfSpeech: ["verb"],
    ipa_uk: '/əˈɹaɪz/',
    ipa_us: '/əˈɹaɪz/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to get up or stand up",
              "th": "ลุกขึ้นหรือยืนขึ้น"
        },
        {
              "pos": "verb",
              "en": "to come into existence or become apparent",
              "th": "เกิดขึ้นหรือปรากฏชัดเจน"
        }
  ],
    antonyms: ["sit","lie"],
    examples:   [
        "She will arise early in the morning to meditate.",
        "A new problem has arisen that needs to be solved.",
        "The issue arose during the meeting and was discussed."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'deprive',
    level: 'B1',
    partOfSpeech: ["verb"],
    ipa_uk: '/dɪˈpɹaɪv/',
    ipa_us: '/dɪˈpɹaɪv/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to take something away from someone or something",
              "th": "เอาอะไรบางอย่างไปจากใครบางคนหรืออะไรบางอย่าง"
        }
  ],
    antonyms: ["provide","supply"],
    examples:   [
        "The company will deprive employees of their benefits if they are late.",
        "The lack of sleep will deprive you of your energy.",
        "The government's policy will deprive the poor of their rights."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'opening',
    level: 'B1',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈəʊ.pənɪŋ/',
    ipa_us: '/ˈəʊ.pənɪŋ/',
    meanings:   [
        {
              "pos": "noun",
              "en": "an act of opening something",
              "th": "การเปิดอะไรบางอย่าง"
        },
        {
              "pos": "noun",
              "en": "a vacant position or opportunity",
              "th": "ตำแหน่งว่างหรือโอกาส"
        }
  ],
    antonyms: ["closing","end"],
    examples:   [
        "The opening ceremony of the Olympics was spectacular.",
        "There is an opening for a sales manager at the company.",
        "The opening of the new restaurant was a huge success."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'alike',
    level: 'B1',
    partOfSpeech: ["adverb"],
    ipa_uk: '/əˈlaɪk/',
    ipa_us: '/əˈlaɪk/',
    meanings:   [
        {
              "pos": "adverb",
              "en": "in a similar way or to a similar degree",
              "th": "ในลักษณะที่คล้ายคลึงกันหรือในระดับที่คล้ายคลึงกัน"
        }
  ],
    antonyms: ["different","distinct"],
    examples:   [
        "The two sisters look alike and have similar personalities.",
        "The two companies have alike business models.",
        "The two paintings are alike in style and color."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'naked',
    level: 'B1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈnɛkɪd/',
    ipa_us: '/ˈnɛkɪd/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "without clothes",
              "th": "ไม่มีเสื้อผ้า"
        }
  ],
    antonyms: ["clothed","dressed"],
    examples:   [
        "The baby was naked and needed a diaper.",
        "The model posed naked for the art class.",
        "The tree was naked of leaves in the winter."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'trail',
    level: 'B1',
    partOfSpeech: ["noun","verb"],
    ipa_uk: '/tɹeɪl/',
    ipa_us: '/tɹeɪl/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a path or track made or used for walking, riding, or driving",
              "th": "เส้นทางหรือรอยที่ทำหรือใช้สำหรับการเดิน ขี่ หรือขับรถ"
        },
        {
              "pos": "verb",
              "en": "to follow or move behind someone or something",
              "th": "ติดตามหรือเคลื่อนที่หลังใครบางคนหรืออะไรบางอย่าง"
        }
  ],
    antonyms: ["lead","precede"],
    examples:   [
        "The trail in the park is perfect for hiking.",
        "The detective trailed the suspect to the hideout.",
        "The company will trail behind its competitors if it doesn't innovate."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'preserve',
    level: 'B1',
    partOfSpeech: ["verb","noun"],
    ipa_uk: '/pɹəˈzɜːv/',
    ipa_us: '/pɹəˈzɜːv/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to keep something in its original state or condition",
              "th": "เก็บรักษาอะไรบางอย่างให้คงเดิม"
        },
        {
              "pos": "noun",
              "en": "a place where animals or plants are protected",
              "th": "สถานที่ที่สัตว์หรือพืชได้รับการคุ้มครอง"
        }
  ],
    antonyms: ["destroy","harm"],
    examples:   [
        "We need to preserve the environment for future generations.",
        "The company will preserve the old building as a historic landmark.",
        "The nature preserve is home to many endangered species."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'jog',
    level: 'B1',
    partOfSpeech: ["verb","noun"],
    ipa_uk: '/dʒɒɡ/',
    ipa_us: '/dʒɒɡ/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to run at a slow and steady pace",
              "th": "วิ่งด้วยความเร็วที่ช้าและสม่ำเสมอ"
        },
        {
              "pos": "noun",
              "en": "a slow and steady run, especially as a form of exercise",
              "th": "การวิ่งที่ช้าและสม่ำเสมอ โดยเฉพาะเป็นการออกกำลังกาย"
        }
  ],
    antonyms: ["sprint","rush"],
    examples:   [
        "I like to jog in the morning to stay healthy.",
        "The jog along the beach was refreshing.",
        "She went for a jog to clear her mind."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'mustard',
    level: 'B1',
    partOfSpeech: ["noun"],
    ipa_uk: '[ˈmas.təd]',
    ipa_us: '[ˈmas.təd]',
    meanings:   [
        {
              "pos": "noun",
              "en": "a pungent powder or paste made from the seeds of the mustard plant, used as a condiment",
              "th": "ผงหรือเปียกที่มีรสเข้มจากเมล็ดพืชมัสตาร์ด ใช้เป็นเครื่องปรุง"
        }
  ],
    antonyms: ["mayonnaise","ketchup"],
    examples:   [
        "I put mustard on my hot dog.",
        "The recipe calls for a teaspoon of mustard.",
        "The mustard plant is easy to grow in the garden."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'ape',
    level: 'B1',
    partOfSpeech: ["noun"],
    ipa_uk: '/eɪp/',
    ipa_us: '/eɪp/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a large, intelligent primate that lives in trees",
              "th": "ไพรเมทขนาดใหญ่ที่มีเหตุผลอาศัยอยู่บนต้นไม้"
        }
  ],
    antonyms: ["human","monkey"],
    examples:   [
        "The ape swung from tree to tree with ease.",
        "The ape is an endangered species due to habitat loss.",
        "The ape is known for its intelligence and problem-solving skills."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'teller',
    level: 'B1',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈtɛlə/',
    ipa_us: '/ˈtɛlə/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a person who operates a cash register or handles money transactions",
              "th": "คนซึ่งปฏิบัติงานเครื่องจ่ายเงินหรือจัดการธุรกรรมเงิน"
        }
  ],
    antonyms: ["receiver","collector"],
    examples:   [
        "The teller helped me with my banking transaction.",
        "The teller counted the money carefully.",
        "The bank teller was friendly and helpful."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'confidence',
    level: 'B1',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈkɒnfɪdəns/',
    ipa_us: '/ˈkɒnfɪdəns/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the feeling of being certain or sure about something",
              "th": "ความรู้สึกที่มั่นใจหรือแน่ใจเกี่ยวกับอะไรบางอย่าง"
        }
  ],
    antonyms: ["doubt","uncertainty"],
    examples:   [
        "She has confidence in her abilities.",
        "The team has confidence that they will win the game.",
        "The company's confidence in the market has increased."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'examination',
    level: 'B1',
    partOfSpeech: ["noun"],
    ipa_uk: '/ɪɡˌzæmɪˈneɪʃən/',
    ipa_us: '/ɪɡˌzæmɪˈneɪʃən/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a formal test of someone's knowledge or ability",
              "th": "การสอบหรือการทดสอบความรู้หรือความสามารถของใครบางคนอย่างเป็นทางการ"
        }
  ],
    antonyms: ["ignorance","lack"],
    examples:   [
        "The student studied hard for the examination.",
        "The doctor will perform a thorough examination to diagnose the illness.",
        "The examination results will be announced next week."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'pond',
    level: 'B1',
    partOfSpeech: ["noun"],
    ipa_uk: '/pɒnd/',
    ipa_us: '/pɒnd/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a small body of still water, typically smaller than a lake",
              "th": "แหล่งน้ำนิ่งขนาดเล็ก โดยทั่วไปมีขนาดเล็กกว่าทะเลสาบ"
        }
  ],
    antonyms: ["ocean","sea"],
    examples:   [
        "The pond in the park is home to many fish and frogs.",
        "The children loved playing near the pond.",
        "The pond is a popular spot for fishing and boating."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'sphere',
    level: 'B1',
    partOfSpeech: ["noun"],
    ipa_uk: '/sfɪə/',
    ipa_us: '/sfɪə/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a round three-dimensional shape, like a ball",
              "th": "รูปทรงกลมสามมิติ เช่น ลูกบอล"
        },
        {
              "pos": "noun",
              "en": "an area of activity or interest",
              "th": "พื้นที่ของกิจกรรมหรือความสนใจ"
        }
  ],
    antonyms: ["cube","rectangle"],
    examples:   [
        "The sphere is a perfect shape for a basketball.",
        "The company operates in the sphere of technology.",
        "The sphere of influence of the city extends to the surrounding areas."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'rotten',
    level: 'B1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈɹɒtn̩/',
    ipa_us: '/ˈɹɒtn̩/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "decayed or decomposed, especially due to fungal or bacterial action",
              "th": "เน่าหรือย่อยสลาย โดยเฉพาะเนื่องจากการกระทำของเชื้อราหรือแบคทีเรีย"
        }
  ],
    antonyms: ["fresh","healthy"],
    examples:   [
        "The rotten food was thrown away.",
        "The rotten wood was replaced with new wood.",
        "The rotten smell came from the garbage."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },

  {
    word: 'ease',
    level: 'B2',
    partOfSpeech: ["noun","verb"],
    ipa_uk: '/iːz/',
    ipa_us: '/iːz/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a state of comfort and relaxation",
              "th": "สภาพที่สบายและผ่อนคลาย"
        },
        {
              "pos": "verb",
              "en": "to make something less severe or unpleasant",
              "th": "ทำให้สิ่งหนึ่งลดความรุนแรงหรือไม่สบาย"
        }
  ],
    antonyms: ["difficulty","tension"],
    examples:   [
        "The warm bath helped to ease her muscles after the long run.",
        "The new policy aims to ease the financial burden on low-income families.",
        "The teacher tried to ease the students into the difficult topic with a simple example."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'province',
    level: 'B2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈpɹɒvɪns/',
    ipa_us: '/ˈpɹɒvɪns/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a large area of land that is part of a country",
              "th": "พื้นที่ขนาดใหญ่ที่เป็นส่วนหนึ่งของประเทศ"
        }
  ],
    antonyms: ["city","capital"],
    examples:   [
        "The province of Quebec is known for its beautiful mountains and lakes.",
        "The company has offices in several provinces across the country.",
        "The new policy will be implemented in all provinces next year."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'malady',
    level: 'B2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈmæl.ə.di/',
    ipa_us: '/ˈmæl.ə.di/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a disease or illness",
              "th": "โรคหรือความเจ็บป่วย"
        }
  ],
    antonyms: ["health","wellness"],
    examples:   [
        "The doctor specialized in treating rare maladies.",
        "The new medicine has been proven to cure the malady.",
        "The malady spread quickly through the small village."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'acquisition',
    level: 'B2',
    partOfSpeech: ["noun"],
    ipa_uk: '/æ.kwɪ.ˈzɪ.ʃən/',
    ipa_us: '/æ.kwɪ.ˈzɪ.ʃən/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the act of getting or obtaining something",
              "th": "การได้มาหรือครอบครองสิ่งใดสิ่งหนึ่ง"
        }
  ],
    antonyms: ["loss","sale"],
    examples:   [
        "The company's latest acquisition is a small startup in Silicon Valley.",
        "The museum's new acquisition is a rare painting by a famous artist.",
        "The acquisition of the new skill took several months of practice."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'maestro',
    level: 'B2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈmaɪstɹoʊ/',
    ipa_us: '/ˈmaɪstɹoʊ/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a person who is very skilled or talented in a particular field",
              "th": "บุคคลที่มีทักษะหรือความสามารถพิเศษในด้านใดด้านหนึ่ง"
        }
  ],
    antonyms: ["amateur","novice"],
    examples:   [
        "The maestro conducted the symphony with precision and passion.",
        "The famous chef is a maestro in the kitchen.",
        "The artist is a maestro of color and light."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'fear',
    level: 'B2',
    partOfSpeech: ["noun","verb"],
    ipa_uk: '/fɪə/',
    ipa_us: '/fɪə/',
    meanings:   [
        {
              "pos": "noun",
              "en": "an unpleasant emotion caused by the belief that someone or something is dangerous",
              "th": "อารมณ์ที่ไม่สบายใจที่เกิดจากความเชื่อที่ว่าบางสิ่งหรือบางคนเป็นอันตราย"
        },
        {
              "pos": "verb",
              "en": "to feel afraid or anxious about something",
              "th": "รู้สึกกลัวหรือกังวลเกี่ยวกับบางสิ่ง"
        }
  ],
    antonyms: ["courage","confidence"],
    examples:   [
        "She has a fear of spiders.",
        "I fear that I may not be able to finish the project on time.",
        "The fear of failure held him back from pursuing his dreams."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'falter',
    level: 'B2',
    partOfSpeech: ["verb"],
    ipa_uk: '/ˈfɒltə(r)/',
    ipa_us: '/ˈfɒltə(r)/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to become weaker or less confident",
              "th": "อ่อนลงหรือสูญเสียความมั่นใจ"
        }
  ],
    antonyms: ["strengthen","improve"],
    examples:   [
        "The runner began to falter in the last mile of the marathon.",
        "The company's sales began to falter after the economic downturn.",
        "Her voice faltered as she tried to speak in front of the large crowd."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'discriminate',
    level: 'B2',
    partOfSpeech: ["verb"],
    ipa_uk: '/dɪsˈkɹɪmɪneɪt/',
    ipa_us: '/dɪsˈkɹɪmɪneɪt/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to treat someone or something unfairly or differently because of a particular characteristic",
              "th": "ปฏิบัติต่อบางคนหรือบางสิ่งไม่ยุติธรรมหรือแตกต่างเนื่องจากลักษณะเฉพาะ"
        }
  ],
    antonyms: ["accept","include"],
    examples:   [
        "The company was accused of discriminating against job applicants based on their age.",
        "The policy aims to prevent people from discriminating against others based on their race.",
        "The algorithm was designed to discriminate between relevant and irrelevant information."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'mass',
    level: 'B2',
    partOfSpeech: ["noun"],
    ipa_uk: '/mæs/',
    ipa_us: '/mæs/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a large quantity of something",
              "th": "ปริมาณมากของสิ่งใดสิ่งหนึ่ง"
        }
  ],
    antonyms: ["individual","single"],
    examples:   [
        "The mass of the crowd made it difficult to move.",
        "The company has a mass of data that needs to be analyzed.",
        "The mass of the planet is much greater than that of the moon."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'considering',
    level: 'B2',
    partOfSpeech: ["preposition"],
    ipa_uk: '/kənˈsɪdəɹɪŋ/',
    ipa_us: '/kənˈsɪdəɹɪŋ/',
    meanings:   [
        {
              "pos": "preposition",
              "en": "thinking about something before making a decision",
              "th": "คิดเกี่ยวกับบางสิ่งก่อนตัดสินใจ"
        }
  ],
    antonyms: ["ignoring","disregarding"],
    examples:   [
        "Considering the cost, I think we should choose the cheaper option.",
        "Considering her experience, she is the best candidate for the job.",
        "Considering the weather forecast, we should cancel the outdoor event."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'sanitation',
    level: 'B2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˌsænɪˈteɪʃən/',
    ipa_us: '/ˌsænɪˈteɪʃən/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the practice of keeping places clean and free from disease",
              "th": "การปฏิบัติที่เกี่ยวกับการรักษาสิ่งแวดล้อมให้สะอาดและปลอดจากโรค"
        }
  ],
    antonyms: ["pollution","contamination"],
    examples:   [
        "The city has improved its sanitation system in recent years.",
        "The importance of sanitation cannot be overstated.",
        "The lack of sanitation in the refugee camp has led to the spread of diseases."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'breakdown',
    level: 'B2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈbɹeɪkdaʊn/',
    ipa_us: '/ˈbɹeɪkdaʊn/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a failure or collapse of something",
              "th": "ความล้มเหลวหรือการล่มสลายของสิ่งใดสิ่งหนึ่ง"
        }
  ],
    antonyms: ["success","recovery"],
    examples:   [
        "The breakdown of the relationship was due to a lack of communication.",
        "The car had a breakdown on the highway and had to be towed.",
        "The emotional breakdown was a result of the traumatic event."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'listener',
    level: 'B2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈlɪs(ə)nə/',
    ipa_us: '/ˈlɪs(ə)nə/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a person who listens to something, such as music or a conversation",
              "th": "บุคคลที่ฟังสิ่งใดสิ่งหนึ่ง เช่น เพลงหรือการสนทนา"
        }
  ],
    antonyms: ["speaker","talker"],
    examples:   [
        "The listener was completely absorbed in the story.",
        "The listener called in to the radio show to ask a question.",
        "The listener was moved to tears by the beautiful music."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'divert',
    level: 'B2',
    partOfSpeech: ["verb"],
    ipa_uk: '/daɪˈvɜːt/',
    ipa_us: '/daɪˈvɜːt/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to change the direction or course of something",
              "th": "เปลี่ยนทิศทางหรือแนวทางของสิ่งใดสิ่งหนึ่ง"
        }
  ],
    antonyms: ["continue","proceed"],
    examples:   [
        "The river was diverted to supply water to the nearby town.",
        "The flight was diverted to a different airport due to bad weather.",
        "The conversation was diverted to a more interesting topic."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'hail',
    level: 'B2',
    partOfSpeech: ["noun","verb"],
    ipa_uk: '/heɪl/',
    ipa_us: '/heɪl/',
    meanings:   [
        {
              "pos": "noun",
              "en": "small balls of ice that fall from the sky during a storm",
              "th": "ลูกกลมๆ ของน้ำแข็งที่ตกลงมาจากฟ้าระหว่างพายุ"
        },
        {
              "pos": "verb",
              "en": "to greet or welcome someone enthusiastically",
              "th": "ทักทายหรือต้อนรับบางคนด้วยความกระตือรือร้น"
        }
  ],
    antonyms: ["ignore","dismiss"],
    examples:   [
        "The hail storm damaged the crops and cars.",
        "The crowd hailed the new champion with cheers and applause.",
        "The taxi driver hailed us on the street and offered a ride."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'relay',
    level: 'B2',
    partOfSpeech: ["noun","verb"],
    ipa_uk: '/ˌɹiːˈleɪ/',
    ipa_us: '/ˌɹiːˈleɪ/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a device that receives and retransmits a signal",
              "th": "อุปกรณ์ที่รับสัญญาณและถ่ายทอดสัญญาณ"
        },
        {
              "pos": "verb",
              "en": "to pass on information or a message",
              "th": "ส่งต่อข้อมูลหรือส่งข้อความ"
        }
  ],
    antonyms: ["block","interrupt"],
    examples:   [
        "The satellite relayed the signal back to Earth.",
        "The team relayed the message to the next station.",
        "The runner relayed the baton to her teammate."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'ambiguity',
    level: 'B2',
    partOfSpeech: ["noun"],
    ipa_uk: '/æmbɪˈɡjuːɪti/',
    ipa_us: '/æmbɪˈɡjuːɪti/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the state of being unclear or open to multiple interpretations",
              "th": "สภาพที่ไม่ชัดเจนหรือเปิดให้ตีความได้หลายอย่าง"
        }
  ],
    antonyms: ["clarity","certainty"],
    examples:   [
        "The ambiguity of the sentence made it difficult to understand.",
        "The ambiguity of the law led to conflicting interpretations.",
        "The artist intentionally created ambiguity in her artwork to spark discussion."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'thirdly',
    level: 'B2',
    partOfSpeech: ["adverb"],
    ipa_uk: '/ˈθɜːdli/',
    ipa_us: '/ˈθɜːdli/',
    meanings:   [
        {
              "pos": "adverb",
              "en": "in the third position or stage",
              "th": "ในตำแหน่งหรือระยะที่สาม"
        }
  ],
    antonyms: ["firstly","secondly"],
    examples:   [
        "Firstly, we need to gather all the necessary materials. Secondly, we need to assemble the parts. Thirdly, we need to test the product.",
        "The teacher explained the concept in three steps: firstly, the introduction; secondly, the analysis; and thirdly, the conclusion.",
        "The company has three main goals: firstly, to increase revenue; secondly, to expand market share; and thirdly, to improve customer satisfaction."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'dove',
    level: 'B2',
    partOfSpeech: ["noun","verb"],
    ipa_uk: '/dʌv/',
    ipa_us: '/dʌv/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a type of bird that is often associated with peace",
              "th": "ประเภทของนกที่มักจะเกี่ยวข้องกับสันติภาพ"
        },
        {
              "pos": "verb",
              "en": "to plunge or dive into something",
              "th": "ลงหรือดำลงไปในบางสิ่ง"
        }
  ],
    antonyms: ["hawk","attack"],
    examples:   [
        "The dove is a symbol of peace and love.",
        "The dove flew back to its nest with a twig in its beak.",
        "She dove into the pool and swam several laps."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'knot',
    level: 'B2',
    partOfSpeech: ["noun","verb"],
    ipa_uk: '/nɒt/',
    ipa_us: '/nɒt/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a tie or fastening made by intertwining threads or strings",
              "th": "การผูกหรือยึดโดยการบิดหรือพันเส้นด้ายหรือเชือก"
        },
        {
              "pos": "verb",
              "en": "to tie or fasten something with a knot",
              "th": "ผูกหรือยึดบางสิ่งด้วยการบิดหรือพัน"
        }
  ],
    antonyms: ["untie","loosen"],
    examples:   [
        "The sailor tied a knot in the rope to secure the boat.",
        "The knot in the wood made it difficult to cut.",
        "She knotted her hair to keep it out of her face."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },

  {
    word: 'commode',
    level: 'C2',
    partOfSpeech: ["noun"],
    ipa_uk: '/kəˈməʊd/',
    ipa_us: '/kəˈməʊd/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a piece of furniture with drawers or shelves, especially in a bedroom",
              "th": "เฟอร์นิเจอร์ที่มีลิ้นชักหรือชั้นวาง โดยเฉพาะในห้องนอน"
        },
        {
              "pos": "noun",
              "en": "a toilet, especially in a portable or self-contained unit",
              "th": "ห้องน้ำ โดยเฉพาะในหน่วยพกพาหรืออิสระ"
        }
  ],
    antonyms: ["wardrobe","outhouse"],
    examples:   [
        "The antique commode in the bedroom was beautifully crafted with intricate carvings.",
        "The commode in the RV was compact and efficient, making it ideal for camping trips.",
        "She struggled to assemble the commode, following the complicated instructions."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'colloquial',
    level: 'C2',
    partOfSpeech: ["adjective"],
    ipa_uk: '/kəˈləʊ.kwɪəl/',
    ipa_us: '/kəˈləʊ.kwɪəl/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "used in informal conversation, but not in formal writing or speech",
              "th": "ใช้ในการสนทนาที่ไม่เป็นทางการ แต่ไม่ใช่ในการเขียนหรือพูดอย่างเป็นทางการ"
        }
  ],
    antonyms: ["formal","technical"],
    examples:   [
        "The colloquial expression 'break a leg' is often used to wish someone good luck.",
        "The author's use of colloquial language made the novel feel more relatable and authentic.",
        "In formal writing, it's best to avoid using colloquial terms or slang."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'euphoria',
    level: 'C2',
    partOfSpeech: ["noun"],
    ipa_uk: '/juːˈfɔːɹi.ə/',
    ipa_us: '/juːˈfɔːɹi.ə/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a state of intense happiness or excitement",
              "th": "สภาวะของความสุขหรือความตื่นเต้นที่รุนแรง"
        }
  ],
    antonyms: ["despair","melancholy"],
    examples:   [
        "The crowd erupted in euphoria when their team won the championship.",
        "She felt a rush of euphoria when she finally achieved her long-term goal.",
        "The music festival was a weekend of pure euphoria, with great music and wonderful company."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'austerity',
    level: 'C2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ɔˈstɛɹɪti/',
    ipa_us: '/ɔˈstɛɹɪti/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a state of being severe or strict in manner or appearance",
              "th": "สภาวะที่รุนแรงหรือเข้มงวดในลักษณะหรือการแสดงออก"
        },
        {
              "pos": "noun",
              "en": "a policy of reducing government spending, especially by cutting public services",
              "th": "นโยบายที่ลดการใช้จ่ายของรัฐบาล โดยเฉพาะอย่างยิ่งโดยการลดบริการสาธารณะ"
        }
  ],
    antonyms: ["luxury","extravagance"],
    examples:   [
        "The government's austerity measures led to widespread protests and unrest.",
        "The monastery was a place of austerity, where monks lived simple and ascetic lives.",
        "The company's austerity plan involved cutting costs and reducing staff."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'axiom',
    level: 'C2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈaks.ɪ.əm/',
    ipa_us: '/ˈaks.ɪ.əm/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a statement or idea that is widely accepted as true",
              "th": "คำสั่งหรือความคิดที่ได้รับการยอมรับอย่างกว้างขวางว่าเป็นความจริง"
        }
  ],
    antonyms: ["fallacy","misconception"],
    examples:   [
        "The axiom that 'all men are created equal' is a fundamental principle of democracy.",
        "The scientist's theory was based on a simple axiom: that the universe is governed by laws.",
        "The company's success was built on the axiom that 'the customer is always right'."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'anonymity',
    level: 'C2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ænəˈnɪmɪti/',
    ipa_us: '/ænəˈnɪmɪti/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the state of being anonymous, or not named or identified",
              "th": "สภาวะที่ไม่มีชื่อหรือไม่ได้รับการระบุ"
        }
  ],
    antonyms: ["fame","recognition"],
    examples:   [
        "The whistleblower chose to remain in anonymity to protect their identity.",
        "The artist's use of anonymity allowed them to create provocative works without fear of reprisal.",
        "The online forum allowed users to post comments with anonymity, which sometimes led to abusive behavior."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'liaise',
    level: 'C2',
    partOfSpeech: ["verb"],
    ipa_uk: '/liːˈeɪz/',
    ipa_us: '/liːˈeɪz/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to communicate or cooperate with someone, especially in a formal or official way",
              "th": "ติดต่อหรือร่วมมือกับใครบางคน โดยเฉพาะอย่างยิ่งในลักษณะที่เป็นทางการ"
        }
  ],
    antonyms: ["ignore","disregard"],
    examples:   [
        "The marketing team will liaise with the sales department to launch the new product.",
        "The ambassador will liaise with the foreign government to negotiate a trade agreement.",
        "The project manager will liaise with the contractors to ensure the project is completed on time."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'chronology',
    level: 'C2',
    partOfSpeech: ["noun"],
    ipa_uk: '/kɹəˈnɒl.ə.dʒi/',
    ipa_us: '/kɹəˈnɒl.ə.dʒi/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the study of the order in which events occur, especially in history",
              "th": "การศึกษาลำดับของเหตุการณ์ที่เกิดขึ้น โดยเฉพาะอย่างยิ่งในประวัติศาสตร์"
        }
  ],
    antonyms: ["randomness","disorder"],
    examples:   [
        "The historian's chronology of the war was meticulously researched and detailed.",
        "The company's chronology of major events was displayed on a timeline in the lobby.",
        "Understanding the chronology of the novel's plot was essential to appreciating its complexity."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'rife',
    level: 'C2',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ɹaɪf/',
    ipa_us: '/ɹaɪf/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "widespread or common, often in a way that is considered unpleasant or undesirable",
              "th": "แพร่หลายหรือทั่วไป โดยเฉพาะอย่างยิ่งในลักษณะที่ไม่พึงประสงค์"
        }
  ],
    antonyms: ["rare","uncommon"],
    examples:   [
        "Corruption is rife in the government, with many officials accused of bribery.",
        "The disease is rife in the developing world, where access to healthcare is limited.",
        "Rumor and speculation were rife in the days leading up to the announcement."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'munificence',
    level: 'C2',
    partOfSpeech: ["noun"],
    ipa_uk: '/mjuːˈnɪfɪsəns/',
    ipa_us: '/mjuːˈnɪfɪsəns/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the quality of being generous or liberal in giving, especially to a worthy cause",
              "th": "คุณสมบัติของการให้ที่มีใจกว้างหรือมีจิตกุศล โดยเฉพาะอย่างยิ่งในการบริจาคให้กับองค์กรที่ดี"
        }
  ],
    antonyms: ["stinginess","miserliness"],
    examples:   [
        "The philanthropist's munificence was renowned, with donations to numerous charities.",
        "The company's munificence in sponsoring the event was greatly appreciated.",
        "The king's munificence towards the poor was legendary, with many stories of his generosity."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'counsel',
    level: 'C2',
    partOfSpeech: ["noun","verb"],
    ipa_uk: '/ˈkaʊn.səl/',
    ipa_us: '/ˈkaʊn.səl/',
    meanings:   [
        {
              "pos": "noun",
              "en": "advice or guidance, especially from someone with experience or expertise",
              "th": "คำแนะนำหรือคำปรึกษาที่ได้รับ โดยเฉพาะอย่างยิ่งจากบุคคลที่มีประสบการณ์หรือความเชี่ยวชาญ"
        },
        {
              "pos": "verb",
              "en": "to give advice or guidance to someone",
              "th": "ให้คำแนะนำหรือคำปรึกษากับใครบางคน"
        }
  ],
    antonyms: ["ignore","dismiss"],
    examples:   [
        "The lawyer offered counsel to the client, helping them navigate the complex legal system.",
        "The counselor provided counsel to the student, helping them choose a career path.",
        "The expert will counsel the company on how to improve their marketing strategy."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'depravity',
    level: 'C2',
    partOfSpeech: ["noun"],
    ipa_uk: '/dəˈpɹævɪti/',
    ipa_us: '/dəˈpɹævɪti/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a state of moral corruption or wickedness, especially in a way that is considered shocking or disgusting",
              "th": "สภาวะของความเสื่อมหรือความชั่ว โดยเฉพาะอย่างยิ่งในลักษณะที่น่ากลัวหรือน่ารังเกียจ"
        }
  ],
    antonyms: ["virtue","morality"],
    examples:   [
        "The depravity of the crime scene was shocking, with evidence of brutal violence.",
        "The novel explored themes of depravity and redemption, highlighting the human condition.",
        "The city's depravity was evident in its high crime rates and social inequality."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'ephemera',
    level: 'C2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ɪˈfɛməɹə/',
    ipa_us: '/ɪˈfɛməɹə/',
    meanings:   [
        {
              "pos": "noun",
              "en": "things that are transitory or fleeting, especially things that are written or printed",
              "th": "สิ่งที่ไม่คงทนหรือชั่วคราว โดยเฉพาะอย่างยิ่งสิ่งที่ถูกเขียนหรือพิมพ์"
        }
  ],
    antonyms: ["permanence","timelessness"],
    examples:   [
        "The ephemera of the digital age, such as tweets and selfies, are often lost forever.",
        "The artist's use of ephemera, such as newspaper clippings and ticket stubs, added a sense of nostalgia to the piece.",
        "The historian studied the ephemera of the past, including letters and diaries, to gain insight into the lives of people who lived during that time."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'seedy',
    level: 'C2',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈsiːdi/',
    ipa_us: '/ˈsiːdi/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "having a disreputable or unsavory character, especially in a way that is considered run-down or dilapidated",
              "th": "มีลักษณะที่ไม่น่าเชื่อถือหรือไม่น่าดู โดยเฉพาะอย่างยิ่งในลักษณะที่ทรุดโทรมหรือพังทลาย"
        }
  ],
    antonyms: ["respectable","upstanding"],
    examples:   [
        "The seedy part of town was known for its crime and poverty.",
        "The seedy appearance of the hotel made it an unappealing place to stay.",
        "The seedy character of the politician was exposed in the scandal, revealing their corrupt activities."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },

  {
    word: 'dependent',
    level: 'C1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/dɪˈpɛndənt/',
    ipa_us: '/dɪˈpɛndənt/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "needing or relying on something or someone for support or existence",
              "th": "พึ่งพา"
        }
  ],
    antonyms: ["independent","self-sufficient"],
    examples:   [
        "The company is financially dependent on its main investor.",
        "She is emotionally dependent on her partner.",
        "The plant is dependent on sunlight to undergo photosynthesis."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'tangle',
    level: 'C1',
    partOfSpeech: ["verb","noun"],
    ipa_uk: '/ˈtæŋ.ɡəl/',
    ipa_us: '/ˈtæŋ.ɡəl/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to twist or turn something together in a confusing or complicated way",
              "th": "ปมหรือพันกัน"
        },
        {
              "pos": "noun",
              "en": "a twisted or confused mass of something",
              "th": "สิ่งที่ปมหรือพันกัน"
        }
  ],
    antonyms: ["untangle","unravel"],
    examples:   [
        "The hair tangle made it difficult to comb.",
        "The fishing lines began to tangle in the water.",
        "The plot of the story started to tangle, making it hard to follow."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'tedious',
    level: 'C1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈtiː.dɪəs/',
    ipa_us: '/ˈtiː.dɪəs/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "too long, slow, or dull; boring or uninteresting",
              "th": "น่าเบื่อ"
        }
  ],
    antonyms: ["exciting","interesting"],
    examples:   [
        "The tedious lecture put the whole class to sleep.",
        "Filling out the tax forms was a tedious task.",
        "The tedious drive through the traffic jam was frustrating."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'exterior',
    level: 'C1',
    partOfSpeech: ["noun","adjective"],
    ipa_uk: '/ɛkˈstɪəɹɪə/',
    ipa_us: '/ɛkˈstɪəɹɪə/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the outside surface of something, especially a building",
              "th": "ภายนอก"
        },
        {
              "pos": "adjective",
              "en": "located on or relating to the outside",
              "th": "ภายนอก"
        }
  ],
    antonyms: ["interior","inside"],
    examples:   [
        "The exterior of the house needs to be painted.",
        "The exterior design of the car is very sleek.",
        "The exterior shots of the movie were filmed on location."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'discard',
    level: 'C1',
    partOfSpeech: ["verb"],
    ipa_uk: '/ˈdɪskɑːd/',
    ipa_us: '/ˈdɪskɑːd/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to get rid of something because it is no longer needed, useful, or wanted",
              "th": "ทิ้ง"
        }
  ],
    antonyms: ["keep","retain"],
    examples:   [
        "Please discard the trash after the party.",
        "The company will discard any unnecessary documents.",
        "She had to discard her old clothes to make room for new ones."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'fiddler',
    level: 'C1',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈfɪdlə(ɹ)/',
    ipa_us: '/ˈfɪdlə(ɹ)/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a person who plays a fiddle, especially in traditional or folk music",
              "th": "นักดนตรีที่เล่นไวโอลิน"
        }
  ],
    antonyms: ["pianist","drummer"],
    examples:   [
        "The fiddler's music was lively and entertaining.",
        "The fiddler played a beautiful melody at the wedding.",
        "The traditional band featured a skilled fiddler."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'speculative',
    level: 'C1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈspɛkjuləˌtɪv/',
    ipa_us: '/ˈspɛkjuləˌtɪv/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "based on guesses or ideas, rather than on facts or evidence",
              "th": "เกี่ยวกับการคาดเดา"
        }
  ],
    antonyms: ["factual","concrete"],
    examples:   [
        "The article presented a speculative view of the future of technology.",
        "The company's speculative investments did not pay off.",
        "The philosopher's speculative ideas about the universe were thought-provoking."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'otter',
    level: 'C1',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈɒt.ə/',
    ipa_us: '/ˈɒt.ə/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a carnivorous, semi-aquatic mammal with a long, slender body and a thick, soft fur",
              "th": "นาก"
        }
  ],
    antonyms: ["beaver","raccoon"],
    examples:   [
        "The otter swam playfully in the river.",
        "The otter's fur was soft and luxurious.",
        "The zoo had an exhibit featuring otters and other aquatic animals."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'beforehand',
    level: 'C1',
    partOfSpeech: ["adverb"],
    ipa_uk: '/bɪˈfɔːhænd/',
    ipa_us: '/bɪˈfɔːhænd/',
    meanings:   [
        {
              "pos": "adverb",
              "en": "before something happens or is done",
              "th": "ก่อนหน้านั้น"
        }
  ],
    antonyms: ["afterwards","later"],
    examples:   [
        "I need to prepare everything beforehand to ensure a smooth presentation.",
        "She studied beforehand to get a good grade on the test.",
        "The company planned the event beforehand to make sure everything went well."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'lapse',
    level: 'C1',
    partOfSpeech: ["verb","noun"],
    ipa_uk: '/læps/',
    ipa_us: '/læps/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to stop or come to an end, especially because of a lack of activity or attention",
              "th": "หยุดชะงัก"
        },
        {
              "pos": "noun",
              "en": "a period of time when something, especially a right or a privilege, is not used or is forgotten",
              "th": "ช่วงเวลา"
        }
  ],
    antonyms: ["continue","persist"],
    examples:   [
        "The subscription will lapse if the payment is not made.",
        "The company's insurance policy will lapse if they do not pay the premium.",
        "There was a lapse in the conversation, and it became awkward."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'incisor',
    level: 'C1',
    partOfSpeech: ["noun"],
    ipa_uk: '/ɪnˈsaɪzə/',
    ipa_us: '/ɪnˈsaɪzə/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a tooth, especially a front tooth, that is used for cutting food",
              "th": "ฟันหน้า"
        }
  ],
    antonyms: ["molar","canine"],
    examples:   [
        "The incisor tooth was chipped and needed to be fixed.",
        "The dentist examined the incisors for any signs of decay.",
        "The incisors are the most visible teeth when smiling."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'premises',
    level: 'C1',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈpɹɛməsiːz/',
    ipa_us: '/ˈpɹɛməsiːz/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a building or part of a building, especially one used for a particular purpose",
              "th": "อาคาร"
        }
  ],
    antonyms: ["outdoors","outside"],
    examples:   [
        "The company's premises are located in the city center.",
        "The restaurant's premises were clean and well-maintained.",
        "The school's premises include a playground and a library."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'suffice',
    level: 'C1',
    partOfSpeech: ["verb"],
    ipa_uk: '/səˈfaɪs/',
    ipa_us: '/səˈfaɪs/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to be enough or adequate for a particular purpose",
              "th": "เพียงพอ"
        }
  ],
    antonyms: ["fail","be insufficient"],
    examples:   [
        "A simple apology will suffice in this situation.",
        "The money I have will suffice for the trip.",
        "A brief explanation will suffice, there is no need to go into details."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'psychiatric',
    level: 'C1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˌsaɪ.ki.ˈæt.ɹɪk/',
    ipa_us: '/ˌsaɪ.ki.ˈæt.ɹɪk/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "relating to the branch of medicine that deals with the study, diagnosis, treatment, and prevention of mental, emotional, and behavioral disorders",
              "th": "จิตเวช"
        }
  ],
    antonyms: ["surgical","medical"],
    examples:   [
        "The psychiatric hospital provided treatment for patients with mental illnesses.",
        "The doctor specialized in psychiatric care for children.",
        "The psychiatric evaluation helped determine the cause of the patient's symptoms."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'recite',
    level: 'C1',
    partOfSpeech: ["verb"],
    ipa_uk: '/ɹɪˈsaɪt/',
    ipa_us: '/ɹɪˈsaɪt/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to say or repeat something, especially a poem or a piece of writing, from memory",
              "th": "朗读"
        }
  ],
    antonyms: ["improvise","make up"],
    examples:   [
        "The student had to recite a poem in front of the class.",
        "The actor recited the lines from the script perfectly.",
        "The child recited the alphabet with ease."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'trampoline',
    level: 'C1',
    partOfSpeech: ["noun"],
    ipa_uk: '/tɹæmpəˈliːn/',
    ipa_us: '/tɹæmpəˈliːn/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a device with a strong fabric or plastic sheet stretched over a frame, used for jumping or performing gymnastic exercises",
              "th": "เครื่องเล่นกระโดด"
        }
  ],
    antonyms: ["balance beam","uneven bars"],
    examples:   [
        "The kids loved playing on the trampoline in the backyard.",
        "The gymnast used the trampoline to practice her routine.",
        "The trampoline park was a popular destination for birthday parties."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'indefinite',
    level: 'C1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ɪnˈdɛfɪnɪt/',
    ipa_us: '/ɪnˈdɛfɪnɪt/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "not clearly defined or determined; vague or uncertain",
              "th": "ไม่แน่นอน"
        }
  ],
    antonyms: ["definite","certain"],
    examples:   [
        "The company's future plans are indefinite.",
        "The indefinite article 'a' is used to refer to a nonspecific noun.",
        "The indefinite nature of the project made it difficult to plan."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },

  {
    word: 'lyrics',
    level: 'B2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈlɪɹ.ɪks/',
    ipa_us: '/ˈlɪɹ.ɪks/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the words of a song",
              "th": "เนื้อเพลง"
        }
  ],
    antonyms: ["music","melody"],
    examples:   [
        "The lyrics of this song are very meaningful.",
        "She wrote the lyrics for her favorite band.",
        "The poet's lyrics were published in a book."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'dissident',
    level: 'B2',
    partOfSpeech: ["noun","adjective"],
    ipa_uk: '/ˈdɪsɪdənt/',
    ipa_us: '/ˈdɪsɪdənt/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a person who strongly disagrees with an established government or institution",
              "th": "ผู้ไม่เห็นด้วย"
        }
  ],
    antonyms: ["loyalist","supporter"],
    examples:   [
        "The dissident was arrested for speaking out against the government.",
        "The dissident movement gained momentum over the years.",
        "She was a dissident in her own party, always questioning the leadership."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'demanding',
    level: 'B2',
    partOfSpeech: ["adjective"],
    ipa_uk: '/dɪˈmɑːndɪŋ/',
    ipa_us: '/dɪˈmɑːndɪŋ/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "requiring a lot of energy, effort, or resources",
              "th": "ต้องการมาก"
        }
  ],
    antonyms: ["undemanding","easy"],
    examples:   [
        "The job was demanding, but she loved the challenge.",
        "The course was demanding, with a lot of homework and exams.",
        "The hike was demanding, but the view from the top was worth it."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'prevention',
    level: 'B2',
    partOfSpeech: ["noun"],
    ipa_uk: '/pɹɪˈvɛnʃən/',
    ipa_us: '/pɹɪˈvɛnʃən/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the act of stopping something from happening",
              "th": "การป้องกัน"
        }
  ],
    antonyms: ["treatment","cure"],
    examples:   [
        "Prevention is better than cure, especially when it comes to diseases.",
        "The company implemented a prevention program to reduce accidents.",
        "The prevention of crime is a top priority for the government."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'charming',
    level: 'B2',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈtʃɑː(ɹ).mɪŋ/',
    ipa_us: '/ˈtʃɑː(ɹ).mɪŋ/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "pleasant and attractive",
              "th": "น่าดึงดูด"
        }
  ],
    antonyms: ["unpleasant","unattractive"],
    examples:   [
        "The city was charming, with its old buildings and narrow streets.",
        "He was a charming person, always making people laugh.",
        "The hotel room was charming, with a beautiful view of the ocean."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'roam',
    level: 'B2',
    partOfSpeech: ["verb"],
    ipa_uk: '/ɹəʊm/',
    ipa_us: '/ɹəʊm/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to move around a place or area without a fixed direction or purpose",
              "th": "เดินเล่น"
        }
  ],
    antonyms: ["stay","settle"],
    examples:   [
        "The dog likes to roam around the park.",
        "She likes to roam around the city, exploring new places.",
        "The nomads roam the desert, searching for food and water."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'defeat',
    level: 'B2',
    partOfSpeech: ["noun","verb"],
    ipa_uk: '/dɪˈfiːt/',
    ipa_us: '/dɪˈfiːt/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the state of being beaten or overcome",
              "th": "ความพ่ายแพ้"
        }
  ],
    antonyms: ["victory","win"],
    examples:   [
        "The team suffered a defeat in the final game.",
        "The defeat was a hard lesson for the young player.",
        "The company's defeat in the market was due to poor management."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'boost',
    level: 'B2',
    partOfSpeech: ["noun","verb"],
    ipa_uk: '/buːst/',
    ipa_us: '/buːst/',
    meanings:   [
        {
              "pos": "noun",
              "en": "an increase in amount, degree, or intensity",
              "th": "การเพิ่มขึ้น"
        }
  ],
    antonyms: ["decrease","reduction"],
    examples:   [
        "The new policy gave a boost to the economy.",
        "The boost in morale was evident after the team's win.",
        "The company needs a boost in sales to stay competitive."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'component',
    level: 'B2',
    partOfSpeech: ["noun"],
    ipa_uk: '/kʌmˈpoʊnənt/',
    ipa_us: '/kʌmˈpoʊnənt/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a part or element of something larger",
              "th": "ส่วนประกอบ"
        }
  ],
    antonyms: ["whole","entirety"],
    examples:   [
        "The component parts of the machine were complex and difficult to assemble.",
        "The component of the team that worked on the project was very skilled.",
        "The component of the recipe that made it unique was the special spice."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'deceive',
    level: 'B2',
    partOfSpeech: ["verb"],
    ipa_uk: '/dɪˈsiːv/',
    ipa_us: '/dɪˈsiːv/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to make someone believe something that is not true",
              "th": "หลอกลวง"
        }
  ],
    antonyms: ["reveal","disclose"],
    examples:   [
        "The company tried to deceive the public with false advertising.",
        "She was deceived by the fake website and lost her money.",
        "The politician was accused of trying to deceive the voters with his promises."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'stack',
    level: 'B2',
    partOfSpeech: ["noun","verb"],
    ipa_uk: '/stæk/',
    ipa_us: '/stæk/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a pile of objects, especially one that is neatly arranged",
              "th": "กอง"
        }
  ],
    antonyms: ["scatter","disperse"],
    examples:   [
        "The stack of books on the table was impressive.",
        "She stacked the dishes in the kitchen.",
        "The stack of paperwork on the desk was overwhelming."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'applicant',
    level: 'B2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈæp.lə.kɪnt/',
    ipa_us: '/ˈæp.lə.kɪnt/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a person who applies for a job, a loan, or something else",
              "th": "ผู้สมัคร"
        }
  ],
    antonyms: ["employer","interviewer"],
    examples:   [
        "The applicant for the job was very qualified.",
        "The company received many applications from interested applicants.",
        "The applicant for the scholarship had to submit a personal statement."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'insult',
    level: 'B2',
    partOfSpeech: ["noun","verb"],
    ipa_uk: '/ɪnˈsʌlt/',
    ipa_us: '/ɪnˈsʌlt/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a remark or action that is intended to offend or hurt someone's feelings",
              "th": "คำดูถูก"
        }
  ],
    antonyms: ["compliment","praise"],
    examples:   [
        "The insult was meant to hurt her feelings.",
        "He was accused of insulting the teacher.",
        "The insult was a personal attack, and it was not acceptable."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'illustration',
    level: 'B2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˌɪləˈstɹeɪʃən/',
    ipa_us: '/ˌɪləˈstɹeɪʃən/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a picture or diagram that is used to explain or decorate something",
              "th": "ภาพประกอบ"
        }
  ],
    antonyms: ["text","description"],
    examples:   [
        "The illustration in the book was beautiful and detailed.",
        "The artist created an illustration for the magazine cover.",
        "The illustration of the concept was helpful in understanding it."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'intrusion',
    level: 'B2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ɪnˈtɹuːʒən/',
    ipa_us: '/ɪnˈtɹuːʒən/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the act of entering a place or situation without being invited or welcome",
              "th": "การบุกรุก"
        }
  ],
    antonyms: ["welcome","invitation"],
    examples:   [
        "The intrusion of the stranger into the private party was unwelcome.",
        "The company's intrusion into the market was seen as a threat.",
        "The intrusion of the noise into the quiet room was disturbing."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'outskirts',
    level: 'B2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈaʊtskɜːts/',
    ipa_us: '/ˈaʊtskɜːts/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the outer areas of a town or city",
              "th": "ชานเมือง"
        }
  ],
    antonyms: ["center","downtown"],
    examples:   [
        "The outskirts of the city were less crowded and more peaceful.",
        "The company built a new factory on the outskirts of town.",
        "The outskirts of the forest were home to many wild animals."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },

  {
    word: 'burden',
    level: 'B1',
    partOfSpeech: ["noun","verb"],
    ipa_uk: '/ˈbɜːdn/',
    ipa_us: '/ˈbɜːdn/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a heavy load",
              "th": "ภาระ"
        },
        {
              "pos": "verb",
              "en": "to give someone a lot of work or responsibility",
              "th": "ให้ภาระ"
        }
  ],
    antonyms: ["relief","ease"],
    examples:   [
        "The company has a heavy burden of debt.",
        "She felt burdened by her many responsibilities.",
        "The new policy has placed a burden on small businesses."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'uncover',
    level: 'B1',
    partOfSpeech: ["verb"],
    ipa_uk: '/ʌnˈkʌvə(ɹ)/',
    ipa_us: '/ʌnˈkʌvə(ɹ)/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to find or discover something",
              "th": "ค้นพบ"
        },
        {
              "pos": "verb",
              "en": "to remove a cover from something",
              "th": "ถอดหน้าปัด"
        }
  ],
    antonyms: ["cover","hide"],
    examples:   [
        "The police uncovered a plot to rob the bank.",
        "She uncovered a hidden talent for painting.",
        "The archaeologists uncovered an ancient city."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'breath',
    level: 'B1',
    partOfSpeech: ["noun"],
    ipa_uk: '/bɹɛθ/',
    ipa_us: '/bɹɛθ/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the air that goes in and out of the lungs",
              "th": "ลมหายใจ"
        },
        {
              "pos": "noun",
              "en": "a slight wind",
              "th": "ลมพัด"
        }
  ],
    antonyms: ["suffocation","stillness"],
    examples:   [
        "She took a deep breath before diving into the pool.",
        "The fresh air filled my lungs with a refreshing breath.",
        "The doctor checked the patient's breath sounds."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'display',
    level: 'B1',
    partOfSpeech: ["verb","noun"],
    ipa_uk: '/dɪsˈpleɪ/',
    ipa_us: '/dɪsˈpleɪ/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to show or exhibit something",
              "th": "แสดง"
        },
        {
              "pos": "noun",
              "en": "a show or exhibition of something",
              "th": "การแสดง"
        }
  ],
    antonyms: ["hide","conceal"],
    examples:   [
        "The museum will display the new exhibit next month.",
        "She displayed her artwork at the local gallery.",
        "The store window display was very attractive."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'spelling',
    level: 'B1',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈspɛlɪŋ/',
    ipa_us: '/ˈspɛlɪŋ/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the act of writing or saying the letters of a word",
              "th": "การสะกด"
        },
        {
              "pos": "noun",
              "en": "the way in which a word is spelled",
              "th": "การสะกดคำ"
        }
  ],
    antonyms: ["misspelling","error"],
    examples:   [
        "The student had trouble with the spelling of the word.",
        "The teacher checked the spelling of the words on the test.",
        "The spelling of the name was incorrect."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'circle',
    level: 'B1',
    partOfSpeech: ["noun","verb"],
    ipa_uk: '/ˈsɜɹkəl/',
    ipa_us: '/ˈsɜɹkəl/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a shape with no beginning or end",
              "th": "วงกลม"
        },
        {
              "pos": "verb",
              "en": "to move in a circle",
              "th": "เคลื่อนที่เป็นวงกลม"
        }
  ],
    antonyms: ["square","line"],
    examples:   [
        "The circle of friends was very close.",
        "The car circled the block before parking.",
        "The circle of life is a concept in many cultures."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'gown',
    level: 'B1',
    partOfSpeech: ["noun"],
    ipa_uk: '/ɡaʊn/',
    ipa_us: '/ɡaʊn/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a long, formal dress",
              "th": "ชุดราตรี"
        },
        {
              "pos": "noun",
              "en": "a robe or uniform worn for a particular purpose",
              "th": "ชุดพิธี"
        }
  ],
    antonyms: ["pants","shorts"],
    examples:   [
        "She wore a beautiful gown to the wedding.",
        "The doctor wore a gown to protect himself from germs.",
        "The graduation gown was a traditional color."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'thumb',
    level: 'B1',
    partOfSpeech: ["noun"],
    ipa_uk: '/θʌm/',
    ipa_us: '/θʌm/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the short, thick finger on the side of the hand",
              "th": "นิ้วหัวแม่มือ"
        },
        {
              "pos": "noun",
              "en": "a general idea or rough plan",
              "th": "แนวคิด"
        }
  ],
    antonyms: ["finger","index"],
    examples:   [
        "She hurt her thumb while playing sports.",
        "The rule of thumb is to always be on time.",
        "The thumb of the glove was worn out."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'novelist',
    level: 'B1',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈnɒvəlɪst/',
    ipa_us: '/ˈnɒvəlɪst/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a person who writes novels",
              "th": "นักเขียนนวนิยาย"
        }
  ],
    antonyms: ["poet","journalist"],
    examples:   [
        "The novelist wrote a best-selling book.",
        "She was a famous novelist in her country.",
        "The novelist's writing style was unique."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'fool',
    level: 'B1',
    partOfSpeech: ["noun","verb"],
    ipa_uk: '/fuːl/',
    ipa_us: '/fuːl/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a person who acts unwisely or foolishly",
              "th": "คนโง่"
        },
        {
              "pos": "verb",
              "en": "to deceive or trick someone",
              "th": "หลอกลวง"
        }
  ],
    antonyms: ["wise","intelligent"],
    examples:   [
        "He was a fool to invest all his money in one stock.",
        "She fooled him into thinking she was rich.",
        "The fool's errand was a waste of time."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'parrot',
    level: 'B1',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈpæɹət/',
    ipa_us: '/ˈpæɹət/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a colorful bird that can imitate human speech",
              "th": "นกแก้ว"
        },
        {
              "pos": "noun",
              "en": "a person who repeats what someone else has said without thinking",
              "th": "คนพูดตาม"
        }
  ],
    antonyms: ["original","creative"],
    examples:   [
        "The parrot repeated everything its owner said.",
        "He was called a parrot because he never had an original thought.",
        "The parrot's feathers were brightly colored."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'failure',
    level: 'B1',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈfeɪl.jɚ/',
    ipa_us: '/ˈfeɪl.jɚ/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the state of not succeeding",
              "th": "ความล้มเหลว"
        },
        {
              "pos": "noun",
              "en": "a person or thing that does not succeed",
              "th": "สิ่งที่ล้มเหลว"
        }
  ],
    antonyms: ["success","achievement"],
    examples:   [
        "The failure of the business was due to poor management.",
        "He felt like a failure after not getting the job.",
        "The failure of the experiment was a setback."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'electron',
    level: 'B1',
    partOfSpeech: ["noun"],
    ipa_uk: '/ɪˈlɛktɹɒn/',
    ipa_us: '/ɪˈlɛktɹɒn/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a small particle with a negative charge",
              "th": "อิเล็กตรอน"
        }
  ],
    antonyms: ["proton","neutron"],
    examples:   [
        "Electrons are found in atoms.",
        "The electron microscope was used to study the sample.",
        "The flow of electrons is called electricity."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'log',
    level: 'B1',
    partOfSpeech: ["noun","verb"],
    ipa_uk: '/lɑɡ/',
    ipa_us: '/lɑɡ/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a section of a tree trunk",
              "th": "ท่อนซุง"
        },
        {
              "pos": "verb",
              "en": "to write down or record something",
              "th": "บันทึก"
        }
  ],
    antonyms: ["branch","leaf"],
    examples:   [
        "The log was used for firewood.",
        "She logged her hours of work.",
        "The ship's log was an important record."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'documentary',
    level: 'B1',
    partOfSpeech: ["noun","adjective"],
    ipa_uk: '/ˌdɒk.jəˈmɛn.tɹi/',
    ipa_us: '/ˌdɒk.jəˈmɛn.tɹi/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a film or television program that shows real events or people",
              "th": "ภาพยนตร์สารคดี"
        },
        {
              "pos": "adjective",
              "en": "relating to or consisting of documents",
              "th": "เกี่ยวกับเอกสาร"
        }
  ],
    antonyms: ["fiction","entertainment"],
    examples:   [
        "The documentary was about the history of the city.",
        "The documentary evidence was used in court.",
        "The documentary film won several awards."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'flow',
    level: 'B1',
    partOfSpeech: ["verb","noun"],
    ipa_uk: '/fləʊ/',
    ipa_us: '/fləʊ/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to move smoothly and continuously",
              "th": "ไหล"
        },
        {
              "pos": "noun",
              "en": "the act of moving smoothly and continuously",
              "th": "การไหล"
        }
  ],
    antonyms: ["stop","block"],
    examples:   [
        "The river flowed gently to the sea.",
        "The flow of traffic was heavy.",
        "The flow of ideas was constant."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'differ',
    level: 'B1',
    partOfSpeech: ["verb"],
    ipa_uk: '/ˈdɪfə/',
    ipa_us: '/ˈdɪfə/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to be unlike or dissimilar",
              "th": "แตกต่าง"
        },
        {
              "pos": "verb",
              "en": "to have or express a different opinion",
              "th": "มีความคิดเห็นที่แตกต่าง"
        }
  ],
    antonyms: ["agree","resemble"],
    examples:   [
        "The two languages differ greatly.",
        "She differs from her sister in many ways.",
        "The two theories differ in their approach."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'definition',
    level: 'B1',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˌdɛfɪˈnɪʃ(ə)n/',
    ipa_us: '/ˌdɛfɪˈnɪʃ(ə)n/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a statement that explains the meaning of a word or phrase",
              "th": "คำจำกัดความ"
        },
        {
              "pos": "noun",
              "en": "the act of defining or explaining something",
              "th": "การกำหนด"
        }
  ],
    antonyms: ["ambiguity","uncertainty"],
    examples:   [
        "The definition of the word was unclear.",
        "The definition of art is subjective.",
        "The definition of the term was provided in the dictionary."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'possess',
    level: 'B1',
    partOfSpeech: ["verb"],
    ipa_uk: '/pəˈzɛs/',
    ipa_us: '/pəˈzɛs/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to have or hold something as one's own",
              "th": "มี"
        },
        {
              "pos": "verb",
              "en": "to have a strong influence or control over someone",
              "th": "มีอิทธิพล"
        }
  ],
    antonyms: ["lack","lose"],
    examples:   [
        "She possesses a rare talent.",
        "The company possesses a large market share.",
        "The ghost was said to possess the house."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },

  {
    word: 'camping',
    level: 'A2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈkæmpɪŋ/',
    ipa_us: '/ˈkæmpɪŋ/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the activity of staying outdoors overnight in a tent",
              "th": "การกางเต็นท์"
        }
  ],
    antonyms: ["hiking","hotel"],
    examples:   [
        "Camping is a fun outdoor activity.",
        "We went camping in the mountains last summer.",
        "Camping allows us to connect with nature."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'petrol',
    level: 'A2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈpɛt.ɹəl/',
    ipa_us: '/ˈpɛt.ɹəl/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a liquid fuel used for cars and other vehicles",
              "th": "น้ำมันเบนซิน"
        }
  ],
    antonyms: ["diesel","electric"],
    examples:   [
        "The car runs on petrol.",
        "We need to fill up the petrol tank.",
        "The price of petrol is increasing."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'till',
    level: 'A2',
    partOfSpeech: ["preposition","conjunction"],
    ipa_uk: '/tɪl/',
    ipa_us: '/tɪl/',
    meanings:   [
        {
              "pos": "preposition",
              "en": "up to a particular time",
              "th": "จนถึง"
        },
        {
              "pos": "conjunction",
              "en": "up to the time that",
              "th": "จนกระทั่ง"
        }
  ],
    antonyms: ["since","from"],
    examples:   [
        "I'll work till 5 o'clock.",
        "We'll wait till you arrive.",
        "I've been waiting till the morning."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'running',
    level: 'A2',
    partOfSpeech: ["verb","noun"],
    ipa_uk: '/ˈɹʌnɪŋ/',
    ipa_us: '/ˈɹʌnɪŋ/',
    meanings:   [
        {
              "pos": "verb",
              "en": "moving quickly on foot",
              "th": "วิ่ง"
        },
        {
              "pos": "noun",
              "en": "the act of moving quickly on foot",
              "th": "การวิ่ง"
        }
  ],
    antonyms: ["walking","standing"],
    examples:   [
        "I'm running late for work.",
        "Running is a great way to stay fit.",
        "She's running in the marathon tomorrow."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'thought',
    level: 'A2',
    partOfSpeech: ["noun"],
    ipa_uk: '/θɔːt/',
    ipa_us: '/θɔːt/',
    meanings:   [
        {
              "pos": "noun",
              "en": "an idea or opinion in your mind",
              "th": "ความคิด"
        }
  ],
    antonyms: ["action","feeling"],
    examples:   [
        "I had a strange thought last night.",
        "Her thought was that we should try again.",
        "The thought of flying scares me."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'road',
    level: 'A2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ɹəʊd/',
    ipa_us: '/ɹəʊd/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a path or way made for vehicles to travel on",
              "th": "ถนน"
        }
  ],
    antonyms: ["path","highway"],
    examples:   [
        "The road to the beach is closed.",
        "We're driving down the road to the city.",
        "The road was under construction."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'latest',
    level: 'A2',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈleɪt.ɪst/',
    ipa_us: '/ˈleɪt.ɪst/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "newest or most recent",
              "th": "ใหม่ล่าสุด"
        }
  ],
    antonyms: ["oldest","earliest"],
    examples:   [
        "I have the latest iPhone.",
        "The latest news is that the concert is cancelled.",
        "The latest fashion trends are from Paris."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'abroad',
    level: 'A2',
    partOfSpeech: ["adverb"],
    ipa_uk: '/əˈbɹɔːd/',
    ipa_us: '/əˈbɹɔːd/',
    meanings:   [
        {
              "pos": "adverb",
              "en": "in or to a foreign country",
              "th": "ต่างประเทศ"
        }
  ],
    antonyms: ["home","locally"],
    examples:   [
        "I'm going abroad for vacation.",
        "She's studying abroad in the US.",
        "He's working abroad for a year."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'other',
    level: 'A2',
    partOfSpeech: ["adjective","pronoun"],
    ipa_uk: '/ˈɐðə/',
    ipa_us: '/ˈɐðə/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "different from the one or ones already mentioned",
              "th": "อื่น"
        },
        {
              "pos": "pronoun",
              "en": "a person or thing that is different from the one or ones already mentioned",
              "th": "อีกคนหนึ่ง"
        }
  ],
    antonyms: ["same","similar"],
    examples:   [
        "I have other plans for tonight.",
        "The other day, I saw a great movie.",
        "There's another way to solve the problem."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'latter',
    level: 'A2',
    partOfSpeech: ["adjective","noun"],
    ipa_uk: '/ˈlæt̬.əɹ/',
    ipa_us: '/ˈlæt̬.əɹ/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "happening or done near the end of a period of time",
              "th": "ช่วงหลัง"
        },
        {
              "pos": "noun",
              "en": "the second of two things mentioned",
              "th": "ส่วนที่สอง"
        }
  ],
    antonyms: ["former","earlier"],
    examples:   [
        "I prefer the latter option.",
        "The latter part of the book is more interesting.",
        "The latter half of the year was busier."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'kilo',
    level: 'A2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈkiːləʊ/',
    ipa_us: '/ˈkiːləʊ/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a unit of weight or mass equal to 1,000 grams",
              "th": "กิโลกรัม"
        }
  ],
    antonyms: ["gram","ton"],
    examples:   [
        "I weigh 60 kilos.",
        "The bag weighs 5 kilos.",
        "The price is 10 euros per kilo."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'friendship',
    level: 'A2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈfɹɛndʃɪp/',
    ipa_us: '/ˈfɹɛndʃɪp/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the state of being friends",
              "th": "มิตรภาพ"
        }
  ],
    antonyms: ["enmity","hatred"],
    examples:   [
        "Our friendship has lasted for years.",
        "Friendship is important for our well-being.",
        "The friendship between the two countries is strong."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'shadow',
    level: 'A2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈʃædəʊ/',
    ipa_us: '/ˈʃædəʊ/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a dark shape made on the ground or on a surface by something blocking the light",
              "th": "เงา"
        }
  ],
    antonyms: ["light","silhouette"],
    examples:   [
        "The tree cast a shadow on the ground.",
        "I saw a shadow moving in the corner.",
        "The shadow of the mountain was visible from afar."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'depend',
    level: 'A2',
    partOfSpeech: ["verb"],
    ipa_uk: '/dɪˈpɛnd/',
    ipa_us: '/dɪˈpɛnd/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to rely on something or someone for support or existence",
              "th": "พึ่งพา"
        }
  ],
    antonyms: ["independent","self-sufficient"],
    examples:   [
        "I depend on my parents for financial support.",
        "The company depends on its employees.",
        "The plant depends on sunlight to grow."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'advertisement',
    level: 'A2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ədˈvɜːtɪsmənt/',
    ipa_us: '/ədˈvɜːtɪsmənt/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a message or notice designed to persuade people to buy something",
              "th": "โฆษณา"
        }
  ],
    antonyms: ["review","criticism"],
    examples:   [
        "The advertisement on TV was very convincing.",
        "The company spent a lot on advertisement.",
        "The advertisement in the magazine caught my eye."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'quality',
    level: 'A2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈkwɒlɪti/',
    ipa_us: '/ˈkwɒlɪti/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a high standard or level of something",
              "th": "คุณภาพ"
        }
  ],
    antonyms: ["poor","low"],
    examples:   [
        "The quality of the product is excellent.",
        "The hotel is known for its high quality service.",
        "The quality of the air is improving."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'frightened',
    level: 'A2',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈfɹaɪtn̩d/',
    ipa_us: '/ˈfɹaɪtn̩d/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "feeling scared or afraid",
              "th": "กลัว"
        }
  ],
    antonyms: ["brave","courageous"],
    examples:   [
        "The child was frightened by the loud noise.",
        "I'm frightened of spiders.",
        "She was frightened by the dark."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'production',
    level: 'A2',
    partOfSpeech: ["noun"],
    ipa_uk: '/pɹəˈdʌkʃən/',
    ipa_us: '/pɹəˈdʌkʃən/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the process of making or manufacturing something",
              "th": "การผลิต"
        }
  ],
    antonyms: ["consumption","destruction"],
    examples:   [
        "The production of the play was a huge success.",
        "The company increased its production last year.",
        "The production costs are very high."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'personality',
    level: 'A2',
    partOfSpeech: ["noun"],
    ipa_uk: '/-i/',
    ipa_us: '/-i/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the combination of characteristics or traits that form an individual's distinctive character",
              "th": "บุคลิก"
        }
  ],
    antonyms: ["appearance","behavior"],
    examples:   [
        "She has a great personality.",
        "His personality is very outgoing.",
        "The personality of the team leader is very important."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'structure',
    level: 'A2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈstɹʌktʃə(ɹ)/',
    ipa_us: '/ˈstɹʌktʃə(ɹ)/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a building or other physical construction",
              "th": "โครงสร้าง"
        }
  ],
    antonyms: ["chaos","disorder"],
    examples:   [
        "The structure of the bridge is very complex.",
        "The company is changing its structure.",
        "The structure of the sentence is simple."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'euro',
    level: 'A2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈjʊəɹəʊ/',
    ipa_us: '/ˈjʊəɹəʊ/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the official currency of the European Union",
              "th": "ยูโร"
        }
  ],
    antonyms: ["dollar","pound"],
    examples:   [
        "The euro is the currency used in many European countries.",
        "I exchanged my dollars for euros.",
        "The price is 10 euros per night."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'break',
    level: 'A2',
    partOfSpeech: ["verb","noun"],
    ipa_uk: '/bɹeɪk/',
    ipa_us: '/bɹeɪk/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to separate or become separated into two or more parts",
              "th": "แตก"
        },
        {
              "pos": "noun",
              "en": "a pause or interval in a activity",
              "th": "การหยุดพัก"
        }
  ],
    antonyms: ["fix","continue"],
    examples:   [
        "I need to break for lunch.",
        "The glass will break if you drop it.",
        "The break in the weather was welcome."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'safe',
    level: 'A2',
    partOfSpeech: ["adjective","noun"],
    ipa_uk: '/seɪf/',
    ipa_us: '/seɪf/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "protected from harm or danger",
              "th": "ปลอดภัย"
        },
        {
              "pos": "noun",
              "en": "a strongbox or container for keeping valuable things secure",
              "th": "ตู้นิรภัย"
        }
  ],
    antonyms: ["dangerous","risky"],
    examples:   [
        "The safe is locked.",
        "I feel safe in this neighborhood.",
        "The company ensures that its employees are safe at work."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'balloon',
    level: 'A2',
    partOfSpeech: ["noun"],
    ipa_uk: '/bəˈluːn/',
    ipa_us: '/bəˈluːn/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a flexible bag that can be filled with air or gas",
              "th": "ลูกโป่ง"
        }
  ],
    antonyms: ["pin","needle"],
    examples:   [
        "The balloon popped when I touched it.",
        "The child was playing with a balloon.",
        "The hot air balloon flew high in the sky."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },

  {
    word: 'orphan',
    level: 'C1',
    partOfSpeech: ["noun [C]"],
    ipa_uk: '/ˈɔːfən/',
    ipa_us: '/ˈɔːfən/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a child whose parents are dead",
              "th": "เด็กกำพร้า"
        }
  ],
    antonyms: ["parent","guardian"],
    examples:   [
        "The orphan was adopted by a loving family.",
        "The orphanage provided a safe haven for the orphan.",
        "The story of the orphan who became a successful entrepreneur is inspiring."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'divergent',
    level: 'C1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/daɪˈvɜːdʒənt/',
    ipa_us: '/daɪˈvɜːdʒənt/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "different or moving in different directions",
              "th": "แตกต่าง"
        }
  ],
    antonyms: ["convergent","similar"],
    examples:   [
        "The divergent opinions on the issue made it difficult to reach a consensus.",
        "The company's divergent business strategies led to confusion among its employees.",
        "The artist's divergent style was reflected in her eclectic art pieces."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'stray',
    level: 'C1',
    partOfSpeech: ["verb [I]"],
    ipa_uk: '/stɹeɪ/',
    ipa_us: '/stɹeɪ/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to wander away from a place or path",
              "th": "หลงทาง"
        }
  ],
    antonyms: ["stay","remain"],
    examples:   [
        "The dog strayed from its owner and got lost in the woods.",
        "The conversation strayed from the topic and became unproductive.",
        "The hikers strayed from the trail and had to navigate through the dense forest."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'rudimentary',
    level: 'C1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˌɹuːdɪˈmɛntəɹi/',
    ipa_us: '/ˌɹuːdɪˈmɛntəɹi/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "very basic or simple",
              "th": "พื้นฐาน"
        }
  ],
    antonyms: ["advanced","complex"],
    examples:   [
        "The rudimentary tools made it difficult to complete the project.",
        "The rudimentary language skills of the tourist made communication challenging.",
        "The company's rudimentary website needed to be updated."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'grounds',
    level: 'C1',
    partOfSpeech: ["noun [C]"],
    ipa_uk: '/ɡɹaʊndz/',
    ipa_us: '/ɡɹaʊndz/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a reason or explanation for something",
              "th": "เหตุผล"
        }
  ],
    antonyms: ["no reason","no excuse"],
    examples:   [
        "The company was sued on grounds of negligence.",
        "The student was expelled from school on grounds of misconduct.",
        "The employee was fired on grounds of poor performance."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'ghostly',
    level: 'C1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈɡoʊstli/',
    ipa_us: '/ˈɡoʊstli/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "like a ghost, or giving the feeling of being a ghost",
              "th": "เหมือนผี"
        }
  ],
    antonyms: ["real","tangible"],
    examples:   [
        "The ghostly figure appeared in the abandoned mansion.",
        "The ghostly atmosphere of the forest was eerie.",
        "The ghostly sound of the violin was haunting."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'enviable',
    level: 'C1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈɛnvi.əbl̩/',
    ipa_us: '/ˈɛnvi.əbl̩/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "deserving to be envied, or making someone feel envious",
              "th": "น่า羨ย"
        }
  ],
    antonyms: ["unenviable","undesirable"],
    examples:   [
        "The enviable lifestyle of the rich and famous was often portrayed in the media.",
        "The enviable skills of the musician made her a sought-after performer.",
        "The enviable location of the house made it a prime real estate."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'dispensary',
    level: 'C1',
    partOfSpeech: ["noun [C]"],
    ipa_uk: '/dɪsˈpɛnsəɹi/',
    ipa_us: '/dɪsˈpɛnsəɹi/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a place where medicines or other supplies are given out",
              "th": "คลินิก"
        }
  ],
    antonyms: ["pharmacy","store"],
    examples:   [
        "The dispensary provided free medical care to the community.",
        "The dispensary was open 24 hours a day.",
        "The company had a dispensary on site for its employees."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'absolute',
    level: 'C1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈæb.səˌljuːt/',
    ipa_us: '/ˈæb.səˌljuːt/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "complete and total, or not limited in any way",
              "th": "สมบูรณ์"
        }
  ],
    antonyms: ["relative","conditional"],
    examples:   [
        "The absolute power of the dictator was frightening.",
        "The absolute silence of the library was peaceful.",
        "The company's absolute commitment to quality was impressive."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'calf',
    level: 'C1',
    partOfSpeech: ["noun [C]"],
    ipa_uk: '/kæf/',
    ipa_us: '/kæf/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a young cow, or the back of the leg below the knee",
              "th": "ลูกวัว"
        }
  ],
    antonyms: ["adult","human"],
    examples:   [
        "The calf was separated from its mother and needed to be fed.",
        "The hiker strained her calf muscle while climbing the mountain.",
        "The farmer raised calves for beef production."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'gnaw',
    level: 'C1',
    partOfSpeech: ["verb [I/T]"],
    ipa_uk: '/nɔː/',
    ipa_us: '/nɔː/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to bite or chew on something constantly, often in a nervous or anxious way",
              "th": "กัด"
        }
  ],
    antonyms: ["stop","cease"],
    examples:   [
        "The mouse began to gnaw on the wire, causing a short circuit.",
        "The dog liked to gnaw on bones to clean its teeth.",
        "The anxiety made her gnaw on her nails nervously."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'ground',
    level: 'C1',
    partOfSpeech: ["noun [C]"],
    ipa_uk: '/ɡɹaʊnd/',
    ipa_us: '/ɡɹaʊnd/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the surface of the earth, or a reason or basis for something",
              "th": "พื้น"
        }
  ],
    antonyms: ["sky","air"],
    examples:   [
        "The ground was wet and muddy after the rain.",
        "The company had solid ground to stand on after the merger.",
        "The teacher helped the student find common ground with her peers."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },

  {
    word: 'rickety',
    level: 'C2',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈɹɪk.e.ti/',
    ipa_us: '/ˈɹɪk.e.ti/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "weak and likely to fall or collapse",
              "th": "ไม่แข็งแรงและอาจล้มหรือพังลงมาได้ง่าย"
        }
  ],
    antonyms: ["sturdy","stable"],
    examples:   [
        "The rickety bridge creaked ominously as we walked across it.",
        "She was afraid to climb the rickety ladder to the top of the treehouse.",
        "The old, rickety chair collapsed under the weight of the heavy man."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'informant',
    level: 'C2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ɪnˈfɔːmənt/',
    ipa_us: '/ɪnˈfɔːmənt/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a person who gives information, especially to the police or another authority",
              "th": "บุคคลที่ให้ข้อมูล โดยเฉพาะแก่ตำรวจหรือหน่วยงานอื่น"
        }
  ],
    antonyms: ["withholder","concealer"],
    examples:   [
        "The police relied on an informant to gather evidence against the suspect.",
        "The informant's testimony was crucial in solving the crime.",
        "The company used an informant to gather information about its competitors."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'ostensibly',
    level: 'C2',
    partOfSpeech: ["adverb"],
    ipa_uk: '/ɒˈstɛn.sɪ.bli/',
    ipa_us: '/ɒˈstɛn.sɪ.bli/',
    meanings:   [
        {
              "pos": "adverb",
              "en": "apparently or seemingly, but not necessarily actually",
              "th": "ดูเหมือนว่าหรือปรากฏว่า แต่ไม่จำเป็นต้องเป็นความจริงเสมอไป"
        }
  ],
    antonyms: ["actually","really"],
    examples:   [
        "He was ostensibly working on a new project, but he was actually playing video games.",
        "The company ostensibly cares about its employees, but it doesn't show it in its actions.",
        "She ostensibly agreed to go to the party, but she didn't show up."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'derisive',
    level: 'C2',
    partOfSpeech: ["adjective"],
    ipa_uk: '/dɪˈɹaɪ.sɪv/',
    ipa_us: '/dɪˈɹaɪ.sɪv/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "expressing contempt or ridicule",
              "th": "แสดงความเยาะเย้ยหรือเหยียดหยาม"
        }
  ],
    antonyms: ["respectful","admiring"],
    examples:   [
        "The derisive laughter of the crowd made the performer feel humiliated.",
        "The derisive comments of the critics were devastating to the artist.",
        "The derisive tone of the article was meant to mock the politician's statement."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'cognitive',
    level: 'C2',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈkɒɡnɪtɪv/',
    ipa_us: '/ˈkɒɡnɪtɪv/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "relating to the mental processes of perception, attention, memory, learning, and problem-solving",
              "th": "เกี่ยวกับกระบวนการทางจิตของการรับรู้, ความสนใจ, ความจำ, การเรียนรู้, และการแก้ปัญหา"
        }
  ],
    antonyms: ["emotional","instinctive"],
    examples:   [
        "Cognitive psychology is the study of mental processes and behavior.",
        "The cognitive abilities of the child were assessed through a series of tests.",
        "The cognitive effects of the medication were still unknown and required further research."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'teem',
    level: 'C2',
    partOfSpeech: ["verb"],
    ipa_uk: '/tiːm/',
    ipa_us: '/tiːm/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to be full of or abundant in something, especially living things",
              "th": "เต็มไปด้วยหรือมีมากมายในบางสิ่ง โดยเฉพาะสิ่งมีชีวิต"
        }
  ],
    antonyms: ["lack","be devoid of"],
    examples:   [
        "The forest teemed with wildlife, including deer, birds, and insects.",
        "The city teemed with people, making it difficult to navigate the streets.",
        "The ocean teemed with fish, making it a popular spot for fishing."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'archetype',
    level: 'C2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈɑːkɪtaɪp/',
    ipa_us: '/ˈɑːkɪtaɪp/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a very typical example of a person, thing, or idea",
              "th": "ตัวอย่างที่เป็นแบบอย่างมากของบุคคล, สิ่ง, หรือแนวคิด"
        }
  ],
    antonyms: ["exception","anomaly"],
    examples:   [
        "The hero of the story is an archetype of the brave warrior.",
        "The archetype of the mother figure is often depicted in literature and art.",
        "The company's founder was an archetype of the successful entrepreneur."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'parochial',
    level: 'C2',
    partOfSpeech: ["adjective"],
    ipa_uk: '/pəˈɹəʊkɪəl/',
    ipa_us: '/pəˈɹəʊkɪəl/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "narrowly focused on local or regional issues, often to the exclusion of broader concerns",
              "th": "มุ่งเน้นไปที่ประเด็นระดับท้องถิ่นหรือระดับภูมิภาค โดยมักจะไม่สนใจประเด็นที่กว้างขึ้น"
        }
  ],
    antonyms: ["global","cosmopolitan"],
    examples:   [
        "The parochial views of the local community made it difficult to implement national policies.",
        "The parochial focus of the newspaper was on local news and events.",
        "The parochial mindset of the company limited its ability to expand globally."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'egalitarian',
    level: 'C2',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ɪˌɡæl.ɪˈtɛə.ɹi.ən/',
    ipa_us: '/ɪˌɡæl.ɪˈtɛə.ɹi.ən/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "believing in or advocating for the principle of equal rights and opportunities for all people",
              "th": "เชื่อหรือสนับสนุนหลักการของสิทธิและโอกาสที่เท่าเทียมกันสำหรับทุกคน"
        }
  ],
    antonyms: ["elitist","hierarchical"],
    examples:   [
        "The egalitarian society aimed to eliminate social and economic inequalities.",
        "The egalitarian approach to education emphasized the importance of equal access to resources.",
        "The egalitarian values of the company were reflected in its policies and practices."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'dissemination',
    level: 'C2',
    partOfSpeech: ["noun"],
    ipa_uk: '/dɨˌsɛmɨˈneɪʃən/',
    ipa_us: '/dɨˌsɛmɨˈneɪʃən/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the act of spreading or sharing information, ideas, or knowledge",
              "th": "การกระจายหรือแบ่งปันข้อมูล, ความคิด, หรือความรู้"
        }
  ],
    antonyms: ["concealment","suppression"],
    examples:   [
        "The dissemination of the news was rapid, spreading quickly through social media.",
        "The dissemination of the research findings was crucial for advancing the field.",
        "The dissemination of the company's mission and values was essential for its success."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'smattering',
    level: 'C2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈsmæ.təɹ.ɪŋ/',
    ipa_us: '/ˈsmæ.təɹ.ɪŋ/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a small amount or scattering of something, especially knowledge or skill",
              "th": "ปริมาณเล็กน้อยหรือการกระจายของบางสิ่ง โดยเฉพาะความรู้หรือทักษะ"
        }
  ],
    antonyms: ["proficiency","mastery"],
    examples:   [
        "She had a smattering of French, but was not fluent.",
        "The artist had a smattering of experience with sculpture, but was primarily a painter.",
        "The tourist had a smattering of knowledge about the local customs, but still got lost in the city."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'combustion',
    level: 'C2',
    partOfSpeech: ["noun"],
    ipa_uk: '/kəmˈbʌs.tʃən/',
    ipa_us: '/kəmˈbʌs.tʃən/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the process of burning, especially in a chemical reaction that releases heat and light",
              "th": "กระบวนการเผาไหม้ โดยเฉพาะในปฏิกิริยาเคมีที่ปล่อยความร้อนและแสง"
        }
  ],
    antonyms: ["extinction","quenching"],
    examples:   [
        "The combustion engine is a type of engine that generates power through the combustion of fuel.",
        "The combustion of fossil fuels releases carbon dioxide and other pollutants into the atmosphere.",
        "The combustion reaction is a critical process in many industrial applications, including power generation and transportation."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'demystify',
    level: 'C2',
    partOfSpeech: ["verb"],
    ipa_uk: '/diːˈmɪstɪfaɪ/',
    ipa_us: '/diːˈmɪstɪfaɪ/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to make something seem less mysterious or intimidating by explaining or interpreting it in a clear and simple way",
              "th": "ทำให้บางสิ่งดูไม่น่ากลัวหรือไม่น่าประหลาดใจโดยอธิบายหรือตีความมันในลักษณะที่ชัดเจนและง่าย"
        }
  ],
    antonyms: ["mystify","obscure"],
    examples:   [
        "The scientist aimed to demystify the complex concept of quantum physics for the general public.",
        "The teacher tried to demystify the difficult math problem by breaking it down into simpler steps.",
        "The author's goal was to demystify the writing process, making it more accessible to aspiring writers."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'incongruous',
    level: 'C2',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ɪnˈkɒn.ɡɹʊu.ʌs/',
    ipa_us: '/ɪnˈkɒn.ɡɹʊu.ʌs/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "not matching or fitting in with something else, often in a way that is noticeable or unpleasant",
              "th": "ไม่เข้ากันหรือไม่เหมาะสมกับบางสิ่งอื่น โดยมักจะเห็นได้ชัดหรือไม่พึงประสงค์"
        }
  ],
    antonyms: ["congruous","harmonious"],
    examples:   [
        "The modern skyscraper looked incongruous among the historic buildings in the old town.",
        "The loud music was incongruous with the peaceful atmosphere of the park.",
        "The formal dress code was incongruous with the casual tone of the party."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'diligent',
    level: 'C2',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈdɪlɪdʒənt/',
    ipa_us: '/ˈdɪlɪdʒənt/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "showing careful and consistent effort or attention to detail",
              "th": "แสดงความพยายามหรือความสนใจอย่างรอบคอบและต่อเนื่อง"
        }
  ],
    antonyms: ["lazy","negligent"],
    examples:   [
        "The diligent student spent hours each day studying for the exam.",
        "The diligent employee was always on time and met deadlines.",
        "The diligent researcher spent years collecting data and analyzing results."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'predecessor',
    level: 'C2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈpɹiːdɪsɛsɚ/',
    ipa_us: '/ˈpɹiːdɪsɛsɚ/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a person who had a particular job or position before someone else",
              "th": "บุคคลที่มีงานหรือตำแหน่งนั้นมาก่อนใคร"
        }
  ],
    antonyms: ["successor","replacement"],
    examples:   [
        "The predecessor of the current CEO was a well-respected leader in the industry.",
        "The predecessor of the modern computer was the mainframe.",
        "The predecessor of the current president was a popular figure, but had some controversies during their term."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'predilection',
    level: 'C2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˌpɹiː.dəˈlɛk.ʃn̩/',
    ipa_us: '/ˌpɹiː.dəˈlɛk.ʃn̩/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a preference or liking for something, especially one that is considered unusual or unjustified",
              "th": "ความชอบหรือความนิยมสำหรับบางสิ่ง โดยเฉพาะอย่างยิ่งถ้าเป็นสิ่งที่ไม่ธรรมดาหรือไม่มีเหตุผล"
        }
  ],
    antonyms: ["aversion","dislike"],
    examples:   [
        "She had a predilection for spicy food, which often surprised her friends.",
        "He had a predilection for classical music, despite being a rock musician.",
        "The company had a predilection for hiring candidates with unconventional backgrounds."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'allotment',
    level: 'C2',
    partOfSpeech: ["noun"],
    ipa_uk: '/əˈlɔt.mɛnt/',
    ipa_us: '/əˈlɔt.mɛnt/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a part or share of something that is assigned or allocated to someone or something",
              "th": "ส่วนหนึ่งหรือส่วนแบ่งของบางสิ่งที่ได้รับการกำหนดหรือจัดสรรให้กับใครบางคนหรือบางสิ่ง"
        }
  ],
    antonyms: ["withholding","denial"],
    examples:   [
        "The allotment of land to the farmer was sufficient for their needs.",
        "The allotment of funds for the project was limited, requiring careful budgeting.",
        "The allotment of time for the presentation was strict, leaving no room for extensions."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'deterrent',
    level: 'C2',
    partOfSpeech: ["noun"],
    ipa_uk: '/dɪˈtɛɹənt/',
    ipa_us: '/dɪˈtɛɹənt/',
    meanings:   [
        {
              "pos": "noun",
              "en": "something that discourages or prevents someone from doing something",
              "th": "สิ่งที่ขัดขวางหรือป้องกันไม่ให้ใครบางคนทำบางสิ่ง"
        }
  ],
    antonyms: ["incentive","encouragement"],
    examples:   [
        "The threat of punishment was a deterrent to potential criminals.",
        "The high cost of the product was a deterrent to many potential buyers.",
        "The strict rules were a deterrent to anyone considering breaking them."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },

  {
    word: 'each',
    level: 'A1',
    partOfSpeech: ["determiner"],
    ipa_uk: '/iːt͡ʃ/',
    ipa_us: '/iːt͡ʃ/',
    meanings:   [
        {
              "pos": "determiner",
              "en": "used to refer to individual items in a group",
              "th": "ทุกๆ"
        }
  ],
    antonyms: ["none","all"],
    examples:   [
        "I have two dogs, and each one is very friendly.",
        "Each student will receive a copy of the textbook.",
        "We visited three cities, and each city was unique."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'work',
    level: 'A1',
    partOfSpeech: ["verb [T]","noun [C/U]"],
    ipa_uk: '/wɜːk/',
    ipa_us: '/wɜːk/',
    meanings:   [
        {
              "pos": "verb [T]",
              "en": "to do a job or activity",
              "th": "ทำงาน"
        },
        {
              "pos": "noun [C/U]",
              "en": "a job or activity",
              "th": "งาน"
        }
  ],
    antonyms: ["rest","play"],
    examples:   [
        "I work as an engineer.",
        "My work is very challenging.",
        "I need to work harder to finish this project."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'August',
    level: 'A1',
    partOfSpeech: ["noun [P]"],
    ipa_uk: '/ɔːˈɡʌst/',
    ipa_us: '/ɔːˈɡʌst/',
    meanings:   [
        {
              "pos": "noun [P]",
              "en": "the eighth month of the year",
              "th": "สิงหาคม"
        }
  ],
    antonyms: ["January","December"],
    examples:   [
        "I was born in August.",
        "We always go on vacation in August.",
        "August is a very hot month."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'life',
    level: 'A1',
    partOfSpeech: ["noun [C/U]"],
    ipa_uk: '/laɪf/',
    ipa_us: '/laɪf/',
    meanings:   [
        {
              "pos": "noun [C/U]",
              "en": "the state of being alive",
              "th": "ชีวิต"
        }
  ],
    antonyms: ["death","nothing"],
    examples:   [
        "Life is very precious.",
        "My life is very busy.",
        "I love my life in the city."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'bed',
    level: 'A1',
    partOfSpeech: ["noun [C]"],
    ipa_uk: '/bed/',
    ipa_us: '/bed/',
    meanings:   [
        {
              "pos": "noun [C]",
              "en": "a piece of furniture for sleeping",
              "th": "เตียง"
        }
  ],
    antonyms: ["table","chair"],
    examples:   [
        "I sleep in my bed every night.",
        "The bed is very comfortable.",
        "I made my bed this morning."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'feel',
    level: 'A1',
    partOfSpeech: ["verb [T]"],
    ipa_uk: '/fiːl/',
    ipa_us: '/fiːl/',
    meanings:   [
        {
              "pos": "verb [T]",
              "en": "to have a particular emotion or sensation",
              "th": "รู้สึก"
        }
  ],
    antonyms: ["not feel","ignore"],
    examples:   [
        "I feel happy today.",
        "I feel tired after working all day.",
        "I feel sad when I'm alone."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'yellow',
    level: 'A1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/jɛlə/',
    ipa_us: '/jɛlə/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "having the color of the sun or gold",
              "th": "สีเหลือง"
        }
  ],
    antonyms: ["blue","black"],
    examples:   [
        "The sun is yellow.",
        "I love yellow flowers.",
        "The yellow car is very bright."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'hope',
    level: 'A1',
    partOfSpeech: ["verb [T]","noun [C/U]"],
    ipa_uk: '/həʊp/',
    ipa_us: '/həʊp/',
    meanings:   [
        {
              "pos": "verb [T]",
              "en": "to want something to happen",
              "th": "หวัง"
        },
        {
              "pos": "noun [C/U]",
              "en": "a feeling of wanting something to happen",
              "th": "ความหวัง"
        }
  ],
    antonyms: ["fear","despair"],
    examples:   [
        "I hope it doesn't rain tomorrow.",
        "My hope is to travel the world.",
        "I have hope that everything will be okay."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'gold',
    level: 'A1',
    partOfSpeech: ["noun [U]","adjective"],
    ipa_uk: '/ɡɒʊld/',
    ipa_us: '/ɡɒʊld/',
    meanings:   [
        {
              "pos": "noun [U]",
              "en": "a valuable yellow metal",
              "th": "ทอง"
        },
        {
              "pos": "adjective",
              "en": "having the color of gold",
              "th": "สีทอง"
        }
  ],
    antonyms: ["silver","copper"],
    examples:   [
        "Gold is a very valuable metal.",
        "The gold necklace is very expensive.",
        "The gold medal is the highest award."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'lazy',
    level: 'A1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈleɪzi/',
    ipa_us: '/ˈleɪzi/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "not wanting to work or make an effort",
              "th": "ขี้เกียจ"
        }
  ],
    antonyms: ["hardworking","active"],
    examples:   [
        "I'm feeling lazy today.",
        "He's a lazy person and never helps.",
        "The lazy dog is sleeping all day."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'yet',
    level: 'A1',
    partOfSpeech: ["adverb"],
    ipa_uk: '/jɛt/',
    ipa_us: '/jɛt/',
    meanings:   [
        {
              "pos": "adverb",
              "en": "at this time, but not before",
              "th": "ยัง"
        }
  ],
    antonyms: ["already","never"],
    examples:   [
        "I haven't eaten yet.",
        "She hasn't arrived yet.",
        "I'm not tired yet, let's keep going."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'everywhere',
    level: 'A1',
    partOfSpeech: ["adverb"],
    ipa_uk: '/ɛv.ɹi.(h)weə(ɹ)/',
    ipa_us: '/ɛv.ɹi.(h)weə(ɹ)/',
    meanings:   [
        {
              "pos": "adverb",
              "en": "in or to all places",
              "th": "ทุกที่"
        }
  ],
    antonyms: ["nowhere","rarely"],
    examples:   [
        "There are people everywhere.",
        "I see her everywhere I go.",
        "The music is playing everywhere in the city."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'kiss',
    level: 'A1',
    partOfSpeech: ["verb [T]","noun [C]"],
    ipa_uk: '/kɪs/',
    ipa_us: '/kɪs/',
    meanings:   [
        {
              "pos": "verb [T]",
              "en": "to touch someone's face or lips with your own",
              "th": "จูบ"
        },
        {
              "pos": "noun [C]",
              "en": "the act of kissing",
              "th": "การจูบ"
        }
  ],
    antonyms: ["slap","hate"],
    examples:   [
        "He kissed her on the cheek.",
        "The couple shared a romantic kiss.",
        "I got a kiss from my mom."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'airport',
    level: 'A1',
    partOfSpeech: ["noun [C]"],
    ipa_uk: '/ˈɛə.pɔːt/',
    ipa_us: '/ˈɛə.pɔːt/',
    meanings:   [
        {
              "pos": "noun [C]",
              "en": "a place where planes take off and land",
              "th": "สนามบิน"
        }
  ],
    antonyms: ["seaport","train station"],
    examples:   [
        "The airport is very busy.",
        "I'm going to the airport to pick up my friend.",
        "The airport is far from the city center."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'beach',
    level: 'A1',
    partOfSpeech: ["noun [C]"],
    ipa_uk: '/biːt͡ʃ/',
    ipa_us: '/biːt͡ʃ/',
    meanings:   [
        {
              "pos": "noun [C]",
              "en": "an area of land along a sea or lake",
              "th": "ชายหาด"
        }
  ],
    antonyms: ["mountain","city"],
    examples:   [
        "I love going to the beach.",
        "The beach is very crowded.",
        "We had a picnic on the beach."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'slow',
    level: 'A1',
    partOfSpeech: ["adjective","adverb"],
    ipa_uk: '/sləʊ/',
    ipa_us: '/sləʊ/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "moving or happening at a lower speed",
              "th": "ช้า"
        },
        {
              "pos": "adverb",
              "en": "at a lower speed",
              "th": "อย่างช้า"
        }
  ],
    antonyms: ["fast","quick"],
    examples:   [
        "The slow car is behind us.",
        "I'm driving slow because of the traffic.",
        "The slow music is very relaxing."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'sad',
    level: 'A1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/sæd/',
    ipa_us: '/sæd/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "feeling unhappy or sorrowful",
              "th": "เสียใจ"
        }
  ],
    antonyms: ["happy","joyful"],
    examples:   [
        "I'm feeling sad today.",
        "The sad news made me cry.",
        "The sad movie is very depressing."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'dictionary',
    level: 'A1',
    partOfSpeech: ["noun [C]"],
    ipa_uk: '/ˈdɪkʃəˌnɛɹi/',
    ipa_us: '/ˈdɪkʃəˌnɛɹi/',
    meanings:   [
        {
              "pos": "noun [C]",
              "en": "a book that lists words and their meanings",
              "th": "พจนานุกรม"
        }
  ],
    antonyms: ["thesaurus","encyclopedia"],
    examples:   [
        "I use a dictionary to learn new words.",
        "The dictionary is very helpful.",
        "I need a dictionary to translate this text."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'open',
    level: 'A1',
    partOfSpeech: ["adjective","verb [T]"],
    ipa_uk: '/ˈəʊ.pən/',
    ipa_us: '/ˈəʊ.pən/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "not closed or blocked",
              "th": "เปิด"
        },
        {
              "pos": "verb [T]",
              "en": "to move something so that it is not closed or blocked",
              "th": "เปิด"
        }
  ],
    antonyms: ["closed","shut"],
    examples:   [
        "The door is open.",
        "I need to open the window.",
        "The store is open every day."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'correct',
    level: 'A1',
    partOfSpeech: ["adjective","verb [T]"],
    ipa_uk: '/kəˈɹɛkt/',
    ipa_us: '/kəˈɹɛkt/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "right or accurate",
              "th": "ถูกต้อง"
        },
        {
              "pos": "verb [T]",
              "en": "to make something right or accurate",
              "th": "แก้ไข"
        }
  ],
    antonyms: ["incorrect","wrong"],
    examples:   [
        "The answer is correct.",
        "I need to correct my mistake.",
        "The teacher will correct our homework."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'cake',
    level: 'A1',
    partOfSpeech: ["noun [C]"],
    ipa_uk: '/keɪk/',
    ipa_us: '/keɪk/',
    meanings:   [
        {
              "pos": "noun [C]",
              "en": "a sweet food made from flour, sugar, and eggs",
              "th": "เค้ก"
        }
  ],
    antonyms: ["bread","pie"],
    examples:   [
        "I love eating cake.",
        "The cake is very delicious.",
        "We had cake at the party."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'easy',
    level: 'A1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈiːzi/',
    ipa_us: '/ˈiːzi/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "not difficult or requiring a lot of effort",
              "th": "ง่าย"
        }
  ],
    antonyms: ["hard","difficult"],
    examples:   [
        "This test is easy.",
        "I found the solution easy.",
        "The easy way is not always the best way."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'white',
    level: 'A1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/waɪt/',
    ipa_us: '/waɪt/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "having the color of snow or milk",
              "th": "สีขาว"
        }
  ],
    antonyms: ["black","dark"],
    examples:   [
        "The white cat is very beautiful.",
        "I love wearing white clothes.",
        "The white house is very big."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },

  {
    word: 'elite',
    level: 'B2',
    partOfSpeech: ["noun","adjective"],
    ipa_uk: '/eɪˈliːt/',
    ipa_us: '/eɪˈliːt/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a group of people considered to be the best or most skilled in a particular area",
              "th": "กลุ่มคนที่ถือว่าดีที่สุดหรือมีทักษะสูงสุดในด้านใดด้านหนึ่ง"
        },
        {
              "pos": "adjective",
              "en": "representing the most skilled or superior group",
              "th": "เป็นตัวแทนของกลุ่มที่มีทักษะสูงสุดหรือเหนือกว่า"
        }
  ],
    antonyms: ["average","ordinary"],
    examples:   [
        "The elite team of scientists worked tirelessly to find a cure for the disease.",
        "As an elite athlete, she had to maintain a strict training schedule.",
        "The elite group of businessmen controlled a significant portion of the country's economy."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'exhaustion',
    level: 'B2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ɪɡˈzɔːs.tʃən/',
    ipa_us: '/ɪɡˈzɔːs.tʃən/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a state of extreme physical or mental tiredness",
              "th": "สภาพของความเหนื่อยล้าทางกายหรือใจอย่างรุนแรง"
        }
  ],
    antonyms: ["energy","vitality"],
    examples:   [
        "After working non-stop for 24 hours, she felt complete exhaustion.",
        "The exhaustion from the long hike made it difficult for him to enjoy the scenic view.",
        "The doctor warned that prolonged exhaustion could lead to serious health problems."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'personnel',
    level: 'B2',
    partOfSpeech: ["noun"],
    ipa_uk: '/-el/',
    ipa_us: '/-el/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the people who work for an organization or business",
              "th": "บุคคลที่ทำงานให้กับองค์กรหรือธุรกิจ"
        }
  ],
    antonyms: ["machinery","equipment"],
    examples:   [
        "The company's personnel department is responsible for hiring new staff.",
        "The hotel's personnel were friendly and helpful during our stay.",
        "The personnel manager had to deal with a lot of conflicts between employees."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'regret',
    level: 'B2',
    partOfSpeech: ["verb","noun"],
    ipa_uk: '/ɹiˈɡɹɛt/',
    ipa_us: '/ɹiˈɡɹɛt/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to feel sorry or disappointed about something",
              "th": "รู้สึกเสียใจหรือผิดหวังเกี่ยวกับบางสิ่ง"
        },
        {
              "pos": "noun",
              "en": "a feeling of sadness or disappointment about something",
              "th": "ความรู้สึกเสียใจหรือผิดหวังเกี่ยวกับบางสิ่ง"
        }
  ],
    antonyms: ["delight","satisfaction"],
    examples:   [
        "I regret not taking the opportunity to travel when I was younger.",
        "She expressed regret over her decision to quit her job.",
        "He felt regret for not spending more time with his family before they moved away."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'flat',
    level: 'B2',
    partOfSpeech: ["adjective","noun","adverb"],
    ipa_uk: '/flæt/',
    ipa_us: '/flæt/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "having a surface that is level or even",
              "th": "มีพื้นผิวที่เรียบหรือราบ"
        },
        {
              "pos": "noun",
              "en": "a set of rooms for living in, especially on one floor of a building",
              "th": "ชุดของห้องสำหรับอยู่อาศัย โดยเฉพาะอยู่บนชั้นเดียวของอาคาร"
        },
        {
              "pos": "adverb",
              "en": "completely or utterly",
              "th": "อย่างสมบูรณ์หรือสิ้นเชิง"
        }
  ],
    antonyms: ["steep","hilly"],
    examples:   [
        "The flat landscape stretched out as far as the eye could see.",
        "The rent for the flat was quite expensive, but it was in a great location.",
        "The tire was flat, so we had to stop and change it."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'saw',
    level: 'B2',
    partOfSpeech: ["verb","noun"],
    ipa_uk: '/sɔː/',
    ipa_us: '/sɔː/',
    meanings:   [
        {
              "pos": "verb",
              "en": "past tense of 'see'",
              "th": "รูปที่ผ่านมาของ 'see'"
        },
        {
              "pos": "noun",
              "en": "a tool for cutting through wood or other materials",
              "th": "เครื่องมือสำหรับตัดผ่านไม้หรือวัสดุอื่น"
        }
  ],
    antonyms: ["missed","ignored"],
    examples:   [
        "I saw the movie last night and really enjoyed it.",
        "The carpenter used a saw to cut the wood into smaller pieces.",
        "She saw the accident happen right in front of her eyes."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'drain',
    level: 'B2',
    partOfSpeech: ["verb","noun"],
    ipa_uk: '/dɹeɪn/',
    ipa_us: '/dɹeɪn/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to remove liquid from something",
              "th": "เอาเหลวออกจากสิ่งใดสิ่งหนึ่ง"
        },
        {
              "pos": "noun",
              "en": "a pipe or channel for carrying away waste water or other liquids",
              "th": "ท่อหรือช่องทางสำหรับนำน้ำเสียหรือของเหลวอื่นออกไป"
        }
  ],
    antonyms: ["fill","accumulate"],
    examples:   [
        "The sink was clogged, so I had to drain the water manually.",
        "The drain in the shower was blocked, causing water to accumulate.",
        "The company's financial problems began to drain its resources."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'glocal',
    level: 'B2',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈɡləʊk(ə)l/',
    ipa_us: '/ˈɡləʊk(ə)l/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "relating to or denoting a product or service that is both global and local",
              "th": "เกี่ยวข้องกับหรือแสดงถึงผลิตภัณฑ์หรือบริการที่ทั้งโลกและท้องถิ่น"
        }
  ],
    antonyms: ["global","universal"],
    examples:   [
        "The glocal approach to marketing allowed the company to tailor its products to local tastes.",
        "Glocalization is a key strategy for businesses looking to expand into new markets.",
        "The glocal nature of the internet has enabled people from different cultures to connect and share ideas."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'yawn',
    level: 'B2',
    partOfSpeech: ["verb","noun"],
    ipa_uk: '/jɔːn/',
    ipa_us: '/jɔːn/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to open your mouth wide and take a deep breath, often because you are tired",
              "th": "เปิดปากกว้างและหายใจลึกๆ บ่อยครั้งเพราะความเหนื่อย"
        },
        {
              "pos": "noun",
              "en": "the act of yawning",
              "th": "การหาว"
        }
  ],
    antonyms: ["smile","laugh"],
    examples:   [
        "I yawned loudly during the boring lecture.",
        "The yawn that escaped her lips was a clear sign that she was tired.",
        "He let out a big yawn after waking up from his nap."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'bankruptcy',
    level: 'B2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈbæŋkɹʌptsɪ/',
    ipa_us: '/ˈbæŋkɹʌptsɪ/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the state of being unable to pay your debts",
              "th": "สถานะที่ไม่สามารถชำระหนี้ได้"
        }
  ],
    antonyms: ["prosperity","solvent"],
    examples:   [
        "The company filed for bankruptcy after years of struggling financially.",
        "The threat of bankruptcy forced the business to restructure its debts.",
        "Personal bankruptcy can have serious consequences on one's credit score."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'accommodation',
    level: 'B2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ə.ˌkɒm.ə.ˈdeɪ.ʃən/',
    ipa_us: '/ə.ˌkɒm.ə.ˈdeɪ.ʃən/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a place to stay, especially in a hotel or other establishment",
              "th": "ที่พัก โดยเฉพาะอยู่ในโรงแรมหรือสถานประกอบการอื่น"
        }
  ],
    antonyms: ["eviction","expulsion"],
    examples:   [
        "The hotel offered comfortable accommodation for its guests.",
        "The university provided accommodation for its students in the form of dormitories.",
        "The company's accommodation policy included reimbursement for travel expenses."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'proposed',
    level: 'B2',
    partOfSpeech: ["verb"],
    ipa_uk: '/pɹəˈpəʊzd/',
    ipa_us: '/pɹəˈpəʊzd/',
    meanings:   [
        {
              "pos": "verb",
              "en": "past tense of 'propose', to suggest or put forward an idea or plan",
              "th": "รูปที่ผ่านมาของ 'propose' เสนอหรือเสนอความคิดหรือแผน"
        }
  ],
    antonyms: ["rejected","dismissed"],
    examples:   [
        "The committee proposed a new budget for the upcoming year.",
        "She proposed a solution to the problem that everyone agreed with.",
        "The company proposed a merger with its rival, which was met with skepticism."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'bestow',
    level: 'B2',
    partOfSpeech: ["verb"],
    ipa_uk: '/bɪˈstəʊ/',
    ipa_us: '/bɪˈstəʊ/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to give something, especially an honor or a gift, to someone",
              "th": "ให้บางสิ่ง โดยเฉพาะอย่างยิ่งเกียรติหรือของขวัญแก่ใครบางคน"
        }
  ],
    antonyms: ["withhold","deny"],
    examples:   [
        "The king bestowed a knighthood upon the brave soldier.",
        "The university bestowed an honorary degree upon the distinguished guest.",
        "The company will bestow a bonus on its employees for their hard work."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'enterprise',
    level: 'B2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈɛntɚˌpɹaɪz/',
    ipa_us: '/ˈɛntɚˌpɹaɪz/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a business or organization, especially a small one",
              "th": "ธุรกิจหรือองค์กร โดยเฉพาะอย่างยิ่งธุรกิจขนาดเล็ก"
        }
  ],
    antonyms: ["closure","dissolution"],
    examples:   [
        "The small enterprise struggled to compete with larger corporations.",
        "The entrepreneur's new enterprise quickly gained popularity.",
        "The government provided support for small enterprises to encourage economic growth."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'relic',
    level: 'B2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈɹɛlɪk/',
    ipa_us: '/ˈɹɛlɪk/',
    meanings:   [
        {
              "pos": "noun",
              "en": "an object that has survived from a past time, especially one that is interesting or valuable",
              "th": "วัตถุที่รอดชีวิตมาจากสมัยก่อน โดยเฉพาะอย่างยิ่งวัตถุที่น่าสนใจหรือมีค่า"
        }
  ],
    antonyms: ["innovation","novelty"],
    examples:   [
        "The museum exhibited a relic from the ancient civilization.",
        "The old watch was a relic from her grandfather's time.",
        "The relic of the past was a reminder of how far technology has come."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'linger',
    level: 'B2',
    partOfSpeech: ["verb"],
    ipa_uk: '/ˈlɪŋɡə/',
    ipa_us: '/ˈlɪŋɡə/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to stay in a place for a longer time than necessary, often because you do not want to leave",
              "th": "อยู่ในสถานที่เป็นเวลานานกว่าที่จำเป็น โดยทั่วไปเนื่องจากคุณไม่ต้องการออกไป"
        }
  ],
    antonyms: ["hurry","rush"],
    examples:   [
        "The smell of freshly baked cookies lingered in the air.",
        "She lingered by the window, watching the sunset.",
        "The memory of the beautiful vacation lingered in his mind long after he returned home."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'botany',
    level: 'B2',
    partOfSpeech: ["noun"],
    ipa_uk: '/-ɪ/',
    ipa_us: '/-ɪ/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the scientific study of plants, including their structure, growth, evolution, and distribution",
              "th": "การศึกษาวิทยาศาสตร์ของพืช รวมถึงโครงสร้าง การเติบโต การพัฒนา และการกระจาย"
        }
  ],
    antonyms: ["zoology","entomology"],
    examples:   [
        "The botany class went on a field trip to study the local flora.",
        "Her interest in botany led her to pursue a career in horticulture.",
        "The botany department at the university was renowned for its research on plant genetics."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'motion',
    level: 'B2',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈməʊʃən/',
    ipa_us: '/ˈməʊʃən/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the act of moving or the state of being in movement",
              "th": "การเคลื่อนไหวหรือสภาพของการเคลื่อนไหว"
        }
  ],
    antonyms: ["stillness","immobility"],
    examples:   [
        "The motion of the waves was soothing to watch.",
        "The company is in motion to expand its operations to new markets.",
        "The athlete's motion was smooth and efficient, allowing her to win the competition."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'profile',
    level: 'B2',
    partOfSpeech: ["noun","verb"],
    ipa_uk: '/ˈpɹəʊfaɪl/',
    ipa_us: '/ˈpɹəʊfaɪl/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a description of someone's character, abilities, or background",
              "th": "คำอธิบายเกี่ยวกับบุคลิกภาพ ทักษะ หรือพื้นหลังของใครบางคน"
        },
        {
              "pos": "verb",
              "en": "to create a profile of someone or something",
              "th": "สร้างโปรไฟล์ของใครบางคนหรือบางสิ่ง"
        }
  ],
    antonyms: ["ignore","dismiss"],
    examples:   [
        "The company created a profile of its ideal customer to tailor its marketing strategy.",
        "Her social media profile was very popular, with thousands of followers.",
        "The detective profiled the suspect to predict their next move."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'turbulent',
    level: 'B2',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈtɜːbjələnt/',
    ipa_us: '/ˈtɜːbjələnt/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "characterized by conflict, disorder, or instability",
              "th": "มีลักษณะของความขัดแย้ง ความไม่สงบ หรือความไม่มั่นคง"
        }
  ],
    antonyms: ["peaceful","stable"],
    examples:   [
        "The turbulent relationship between the two countries made trade negotiations difficult.",
        "The turbulent sea made it hard for the ship to stay on course.",
        "The company's turbulent financial history made it difficult to secure investments."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },

  {
    word: 'crush',
    level: 'B1',
    partOfSpeech: ["verb [T]","noun [C]"],
    ipa_uk: '/kɹʌʃ/',
    ipa_us: '/kɹʌʃ/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to squeeze or press something very hard so that it becomes flat or broken",
              "th": "บดหรือกดสิ่งใดสิ่งหนึ่งจนแบนหรือแตก"
        },
        {
              "pos": "noun",
              "en": "a strong feeling of love or attraction",
              "th": "ความรู้สึกรักหรือดึงดูดที่รุนแรง"
        }
  ],
    antonyms: ["release","love"],
    examples:   [
        "She has a crush on her classmate.",
        "The machine will crush the rocks into small pieces.",
        "He had a crush on his colleague, but she didn't feel the same way."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'enthusiasm',
    level: 'B1',
    partOfSpeech: ["noun [U]"],
    ipa_uk: '/-θuː-/',
    ipa_us: '/-θuː-/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a feeling of great interest, excitement, or energy",
              "th": "ความรู้สึกสนใจ สนุกสนาน หรือมีพลังงานมาก"
        }
  ],
    antonyms: ["apathy","boredom"],
    examples:   [
        "The team played with great enthusiasm and won the game.",
        "Her enthusiasm for the project was contagious and inspired the whole team.",
        "The crowd showed their enthusiasm by cheering and clapping loudly."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'loaf',
    level: 'B1',
    partOfSpeech: ["noun [C]","verb [I]"],
    ipa_uk: '/ləʊf/',
    ipa_us: '/ləʊf/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a shaped mass of bread",
              "th": "ก้อนขนมปังที่มีรูปทรง"
        },
        {
              "pos": "verb",
              "en": "to spend time doing nothing or very little",
              "th": "ใช้เวลาทำอะไรไม่มากหรือไม่ทำอะไรเลย"
        }
  ],
    antonyms: ["work","hurry"],
    examples:   [
        "She bought a loaf of bread from the bakery.",
        "He loves to loaf around on Sundays and watch TV all day.",
        "The dog likes to loaf in the sunbeams that come through the windows."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'including',
    level: 'B1',
    partOfSpeech: ["preposition"],
    ipa_uk: '/ɪnˈkluːdɪŋ/',
    ipa_us: '/ɪnˈkluːdɪŋ/',
    meanings:   [
        {
              "pos": "preposition",
              "en": "with something or someone as a part of it",
              "th": "พร้อมสิ่งใดสิ่งหนึ่งเป็นส่วนหนึ่งของมัน"
        }
  ],
    antonyms: ["excluding","leaving out"],
    examples:   [
        "The price includes all taxes, including VAT.",
        "The hotel package, including breakfast and dinner, costs $200 per night.",
        "The company's products, including smartphones and laptops, are very popular."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'chuckle',
    level: 'B1',
    partOfSpeech: ["verb [I]","noun [C]"],
    ipa_uk: '/ˈt͡ʃʌkəl/',
    ipa_us: '/ˈt͡ʃʌkəl/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to laugh quietly, often in a silly or amused way",
              "th": "หัวเราะเบาๆ โดยมักจะด้วยความงี่เง่าหรือความสนุกสนาน"
        },
        {
              "pos": "noun",
              "en": "a quiet laugh",
              "th": "การหัวเราะเบาๆ"
        }
  ],
    antonyms: ["cry","scream"],
    examples:   [
        "She couldn't help but chuckle at the silly joke.",
        "He let out a chuckle when he saw the funny video.",
        "The audience gave a collective chuckle at the comedian's witty remark."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'interest',
    level: 'B1',
    partOfSpeech: ["noun [C/U]","verb [T]"],
    ipa_uk: '/ˈɪntəɹɪst/',
    ipa_us: '/ˈɪntəɹɪst/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a feeling of wanting to learn or know more about something",
              "th": "ความรู้สึกอยากที่จะเรียนรู้หรือรู้เพิ่มเติมเกี่ยวกับบางสิ่ง"
        },
        {
              "pos": "verb",
              "en": "to make someone want to learn or know more about something",
              "th": "ทำให้บางคนอยากเรียนรู้หรือรู้เพิ่มเติมเกี่ยวกับบางสิ่ง"
        }
  ],
    antonyms: ["boredom","indifference"],
    examples:   [
        "She has a strong interest in science and technology.",
        "The movie didn't interest me, so I fell asleep.",
        "The teacher tried to interest the students in the subject by making it more interactive."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'rubbish',
    level: 'B1',
    partOfSpeech: ["noun [U/C]"],
    ipa_uk: '/ˈɹʌbɪʃ/',
    ipa_us: '/ˈɹʌbɪʃ/',
    meanings:   [
        {
              "pos": "noun",
              "en": "waste material or unwanted things",
              "th": "วัสดุหรือสิ่งของที่ไม่ต้องการ"
        },
        {
              "pos": "noun",
              "en": "something that is of very poor quality",
              "th": "สิ่งที่มีคุณภาพต่ำมาก"
        }
  ],
    antonyms: ["treasure","valuable"],
    examples:   [
        "Please take out the rubbish and put it in the bin.",
        "The movie was rubbish, and I didn't enjoy it at all.",
        "The football team played rubbish and lost the game."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'theory',
    level: 'B1',
    partOfSpeech: ["noun [C]"],
    ipa_uk: '/ˈθiːəɹi/',
    ipa_us: '/ˈθiːəɹi/',
    meanings:   [
        {
              "pos": "noun",
              "en": "an idea or explanation for something that is based on a set of principles or ideas",
              "th": "ความคิดหรือคำอธิบายสำหรับบางสิ่งที่อาศัยหลักการหรือความคิด"
        }
  ],
    antonyms: ["fact","reality"],
    examples:   [
        "The theory of evolution explains how species change over time.",
        "The detective had a theory about who committed the crime.",
        "The scientist developed a new theory to explain the phenomenon."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'request',
    level: 'B1',
    partOfSpeech: ["noun [C]","verb [T]"],
    ipa_uk: '/ɹɪˈkwɛst/',
    ipa_us: '/ɹɪˈkwɛst/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a polite or formal ask for something",
              "th": "การขออย่างสุภาพหรือเป็นทางการ"
        },
        {
              "pos": "verb",
              "en": "to ask for something in a polite or formal way",
              "th": "ขออะไรบางอย่างด้วยวิธีสุภาพหรือเป็นทางการ"
        }
  ],
    antonyms: ["refuse","deny"],
    examples:   [
        "I made a request to the manager for a day off.",
        "The company will request a meeting with the supplier to discuss the issue.",
        "She requested a song on the radio, and it was played immediately."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'currency',
    level: 'B1',
    partOfSpeech: ["noun [C/U]"],
    ipa_uk: '/ˈkʌɹ.ən.si/',
    ipa_us: '/ˈkʌɹ.ən.si/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the money used in a particular country or region",
              "th": "เงินที่ใช้ในประเทศหรือภูมิภาคใดภูมิภาคหนึ่ง"
        }
  ],
    antonyms: ["barter","trade"],
    examples:   [
        "The currency in Japan is the yen.",
        "The value of the currency can fluctuate depending on the economy.",
        "The company has to exchange its currency to do business abroad."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'goddess',
    level: 'B1',
    partOfSpeech: ["noun [C]"],
    ipa_uk: '/-ɪs/',
    ipa_us: '/-ɪs/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a female deity or a woman who is greatly admired",
              "th": "สตรีศักดิ์สิทธิ์หรือผู้หญิงที่ได้รับการยกย่องอย่างมาก"
        }
  ],
    antonyms: ["god","mortal"],
    examples:   [
        "In ancient mythology, the goddess of love was often depicted as beautiful and powerful.",
        "The actress was considered a goddess by her fans due to her stunning looks and talent.",
        "The statue of the goddess was discovered in the ancient temple."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'total',
    level: 'B1',
    partOfSpeech: ["adjective","noun [C]"],
    ipa_uk: '/ˈtəʊ.təl/',
    ipa_us: '/ˈtəʊ.təl/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "complete or entire",
              "th": "สมบูรณ์หรือทั้งหมด"
        },
        {
              "pos": "noun",
              "en": "the whole amount or sum of something",
              "th": "จำนวนหรือผลรวมทั้งหมดของบางสิ่ง"
        }
  ],
    antonyms: ["partial","incomplete"],
    examples:   [
        "The total cost of the project was higher than expected.",
        "The company has a total of 500 employees.",
        "The total amount of money in the account is $10,000."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'base',
    level: 'B1',
    partOfSpeech: ["noun [C]","verb [T]"],
    ipa_uk: '/beɪs/',
    ipa_us: '/beɪs/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the lowest part of something",
              "th": "ส่วนล่างสุดของบางสิ่ง"
        },
        {
              "pos": "verb",
              "en": "to establish or locate something on a particular place or thing",
              "th": "จัดตั้งหรือวางบางสิ่งที่จุดหรือสิ่งใดสิ่งหนึ่ง"
        }
  ],
    antonyms: ["top","remove"],
    examples:   [
        "The base of the mountain is covered in trees.",
        "The company will base its new office in the city center.",
        "The research is based on data from several sources."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'stupid',
    level: 'B1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈstjuːpɪd/',
    ipa_us: '/ˈstjuːpɪd/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "lacking intelligence or common sense",
              "th": "ขาดความฉลาดหรือความเข้าใจทั่วไป"
        }
  ],
    antonyms: ["intelligent","wise"],
    examples:   [
        "It was stupid of me to forget my phone at home.",
        "The movie was so stupid that I fell asleep.",
        "He made a stupid mistake that cost the team the game."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'exit',
    level: 'B1',
    partOfSpeech: ["noun [C]","verb [I/T]"],
    ipa_uk: '/ˈɛksɪt/',
    ipa_us: '/ˈɛksɪt/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a way out of a place or a system",
              "th": "ทางออกจากที่หรือระบบ"
        },
        {
              "pos": "verb",
              "en": "to leave a place or a system",
              "th": "ออกจากที่หรือระบบ"
        }
  ],
    antonyms: ["enter","join"],
    examples:   [
        "The exit from the highway is closed due to construction.",
        "She will exit the company after five years of service.",
        "The program will exit automatically if there's an error."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'headline',
    level: 'B1',
    partOfSpeech: ["noun [C]"],
    ipa_uk: '/ˈhɛd.laɪn/',
    ipa_us: '/ˈhɛd.laɪn/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the title of a newspaper article, typically in large letters",
              "th": "ชื่อเรื่องของบทความในหนังสือพิมพ์ โดยปกติจะเขียนด้วยตัวอักษรขนาดใหญ่"
        }
  ],
    antonyms: ["subtitle","footnote"],
    examples:   [
        "The headline of the news article was 'Economic Crisis Hits Country'.",
        "The headline grabbed my attention, and I read the whole article.",
        "The journalist wrote a catchy headline to attract more readers."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },

  {
    word: 'conform',
    level: 'C1',
    partOfSpeech: ["verb [I/T]"],
    ipa_uk: '/kənˈfɔːm/',
    ipa_us: '/kənˈfɔːm/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to match or be in harmony with something",
              "th": "สอดคล้องหรือเป็นไปตาม"
        }
  ],
    antonyms: ["conflict","clash"],
    examples:   [
        "The company will conform to the new regulations.",
        "She tried to conform to the social norms of the group.",
        "The architect designed the building to conform to the surrounding landscape."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'integral',
    level: 'C1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈɪntɪɡɹəl/',
    ipa_us: '/ˈɪntɪɡɹəl/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "necessary or important for something to be complete or successful",
              "th": "จำเป็นหรือสำคัญสำหรับบางสิ่งที่จะสมบูรณ์หรือประสบความสำเร็จ"
        }
  ],
    antonyms: ["peripheral","optional"],
    examples:   [
        "The new employee was an integral part of the team.",
        "The integral component of the machine was missing.",
        "The company's integral values were reflected in its mission statement."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'humble',
    level: 'C1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈhʌmbəl/',
    ipa_us: '/ˈhʌmbəl/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "not proud or arrogant, and often willing to listen and learn",
              "th": "ไม่ภูมิใจหรือเย่อหยิ่งและมักเต็มใจที่จะฟังและเรียนรู้"
        }
  ],
    antonyms: ["arrogant","proud"],
    examples:   [
        "The humble leader was loved by his people.",
        "She was humble about her achievements and didn't like to brag.",
        "The humble beginnings of the company were a testament to its hard work."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'suburban',
    level: 'C1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/səˈbɜː(ɹ)bən/',
    ipa_us: '/səˈbɜː(ɹ)bən/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "relating to or characteristic of the suburbs",
              "th": "เกี่ยวข้องกับหรือมีลักษณะของชานเมือง"
        }
  ],
    antonyms: ["urban","rural"],
    examples:   [
        "The suburban area was quiet and peaceful.",
        "She lived in a suburban house with a big garden.",
        "The suburban train took her to the city center."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },

  {
    word: 'spontaneous',
    level: 'C1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/spɒnˈteɪ.ni.əs/',
    ipa_us: '/spɒnˈteɪ.ni.əs/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "done or said without prior thought or planning",
              "th": "เกิดขึ้นโดยไม่ได้คิดหรือวางแผนไว้ก่อน"
        }
  ],
    antonyms: ["planned","premeditated"],
    examples:   [
        "The spontaneous applause from the crowd was overwhelming.",
        "She made a spontaneous decision to quit her job and travel the world.",
        "The spontaneous combustion of the dry leaves surprised everyone."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'ingenious',
    level: 'C1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ɪnˈdʒiːniəs/',
    ipa_us: '/ɪnˈdʒiːniəs/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "cleverly inventive or resourceful",
              "th": "ฉลาดในการคิดค้นหรือใช้ไหวพริบ"
        }
  ],
    antonyms: ["unimaginative","uncreative"],
    examples:   [
        "The ingenious design of the new smartphone made it a bestseller.",
        "She came up with an ingenious solution to the complex problem.",
        "The ingenious use of recycled materials in the art piece was impressive."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'demographic',
    level: 'C1',
    partOfSpeech: ["noun","adjective"],
    ipa_uk: '/dɛməˈɡɹæfɪk/',
    ipa_us: '/dɛməˈɡɹæfɪk/',
    meanings:   [
        {
              "pos": "noun",
              "en": "the study of the characteristics of a population",
              "th": "การศึกษาลักษณะของประชากร"
        },
        {
              "pos": "adjective",
              "en": "relating to the study of the characteristics of a population",
              "th": "เกี่ยวข้องกับการศึกษาลักษณะของประชากร"
        }
  ],
    antonyms: ["individual","personal"],
    examples:   [
        "The demographic data revealed a significant shift in the population's age distribution.",
        "The company's demographic analysis helped them target their marketing efforts effectively.",
        "The demographic changes in the city had a profound impact on its culture."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'elaborate',
    level: 'C1',
    partOfSpeech: ["verb","adjective"],
    ipa_uk: '/ɪˈlæbəɹeɪt/',
    ipa_us: '/ɪˈlæbəɹeɪt/',
    meanings:   [
        {
              "pos": "verb",
              "en": "to add more details or explanation to something",
              "th": "เพิ่มรายละเอียดหรือคำอธิบายให้กับบางสิ่ง"
        },
        {
              "pos": "adjective",
              "en": "complex or detailed",
              "th": "ซับซ้อนหรือมีรายละเอียด"
        }
  ],
    antonyms: ["simple","straightforward"],
    examples:   [
        "The professor elaborated on the concept, providing examples and illustrations.",
        "The elaborate design of the palace was a testament to the architect's skill.",
        "The elaborate plot of the novel was engaging, but difficult to follow."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'prophet',
    level: 'C1',
    partOfSpeech: ["noun"],
    ipa_uk: '/ˈpɹɒf.ɪt/',
    ipa_us: '/ˈpɹɒf.ɪt/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a person who speaks on behalf of a god or divine being",
              "th": "บุคคลที่พูดแทนพระเจ้าหรือพระเจ้า"
        }
  ],
    antonyms: ["skeptic","doubter"],
    examples:   [
        "The prophet's words were seen as a message from God, guiding the people.",
        "The company's founder was like a prophet, predicting the future of technology.",
        "The prophet's vision for a better world inspired a generation of activists."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'obscure',
    level: 'C1',
    partOfSpeech: ["adjective","verb"],
    ipa_uk: '/əbˈskjɔː(ɹ)/',
    ipa_us: '/əbˈskjɔː(ɹ)/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "not well-known or difficult to understand",
              "th": "ไม่ค่อยรู้จักหรือยากต่อการเข้าใจ"
        },
        {
              "pos": "verb",
              "en": "to make something difficult to see or understand",
              "th": "ทำให้บางสิ่งยากต่อการมองเห็นหรือเข้าใจ"
        }
  ],
    antonyms: ["famous","clear"],
    examples:   [
        "The obscure reference in the text was difficult to decipher.",
        "The obscure artist's work was only recognized after her death.",
        "The obscure language used in the contract made it hard to understand."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'sedentary',
    level: 'C1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/ˈsɛd(ə)ntɛɹi/',
    ipa_us: '/ˈsɛd(ə)ntɛɹi/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "spending a lot of time sitting or not being active",
              "th": "ใช้เวลานั่งมากหรือไม่ได้เคลื่อนไหว"
        }
  ],
    antonyms: ["active","mobile"],
    examples:   [
        "A sedentary lifestyle can lead to health problems, such as obesity and diabetes.",
        "The sedentary job required long hours of sitting at a desk, staring at a computer screen.",
        "The sedentary behaviour of the children was a concern for their parents, who encouraged them to play outside."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'monotonous',
    level: 'C1',
    partOfSpeech: ["adjective"],
    ipa_uk: '/məˈnɒtənəs/',
    ipa_us: '/məˈnɒtənəs/',
    meanings:   [
        {
              "pos": "adjective",
              "en": "dull and uninteresting, with too much repetition",
              "th": "น่าเบื่อและไม่น่าสนใจ มีการซ้ำซ้อนมากเกินไป"
        }
  ],
    antonyms: ["exciting","varied"],
    examples:   [
        "The monotonous sound of the engine made it difficult to sleep.",
        "The monotonous job required doing the same tasks every day.",
        "The monotonous landscape of the desert stretched out as far as the eye could see."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    word: 'impediment',
    level: 'C1',
    partOfSpeech: ["noun"],
    ipa_uk: '/ɪmˈpɛdɪmənt/',
    ipa_us: '/ɪmˈpɛdɪmənt/',
    meanings:   [
        {
              "pos": "noun",
              "en": "a thing that hinders or obstructs progress or movement",
              "th": "สิ่งที่ขัดขวางหรือยับยั้งความก้าวหน้าหรือการเคลื่อนไหว"
        }
  ],
    antonyms: ["aid","assistance"],
    examples:   [
        "The impediment in her speech made it difficult for her to communicate effectively.",
        "The company's debt was a significant impediment to its growth and expansion.",
        "The lack of funding was a major impediment to the project's success."
  ],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
];

// ===== DISTRACTORS MAP =====
const DISTRACTORS = {
  'achieve':      ['ล้มเหลว','ละทิ้ง','รอคอย','หลีกเลี่ยง'],
  'negotiate':    ['สั่งการ','หลีกเลี่ยง','ตัดสิน','บังคับ'],
  'contribute':   ['ขัดขวาง','ปฏิเสธ','แข่งขัน','เพิกเฉย'],
  'emphasize':    ['ลดความสำคัญ','ซ่อนเร้น','เปรียบเทียบ','คัดค้าน'],
  'persist':      ['ยอมแพ้','หยุดพัก','เปลี่ยนใจ','ล้มเลิก'],
  'analyze':      ['เดาสุ่ม','ละเลย','รวบรวม','คาดเดา'],
  'interpret':    ['เพิกเฉย','บิดเบือน','คำนวณ','สับสน'],
  'consequence':  ['สาเหตุ','โอกาส','ความตั้งใจ','วิธีการ'],
  'significant':  ['ไม่สำคัญ','ชัดเจน','เล็กน้อย','ลึกลับ'],
  'establish':    ['ทำลาย','ยกเลิก','ลังเล','ระงับ'],
  'assumption':   ['ข้อเท็จจริง','คำพิพากษา','การพิสูจน์','ผลลัพธ์'],
  'circumstance': ['ความบังเอิญ','แผนการ','ผลที่ตามมา','ความตั้งใจ'],
  'consistent':   ['ไม่แน่นอน','ตรงกันข้าม','สับสน','เปลี่ยนแปลง'],
  'demonstrate':  ['ซ่อนเร้น','เดาสุ่ม','ปฏิเสธ','ยอมรับ'],
  'evaluate':     ['เพิกเฉย','เดาสุ่ม','คาดเดา','หลีกเลี่ยง'],
  'flexible':     ['แข็งกร้าว','ตายตัว','ไม่แน่ใจ','ล้มเหลว'],
  'generate':     ['ทำลาย','ลดลง','ป้องกัน','ระงับ'],
  'indicate':     ['ซ่อนเร้น','คัดค้าน','เพิกเฉย','หลีกเลี่ยง'],
  'justify':      ['คัดค้าน','ปฏิเสธ','โต้แย้ง','ขัดขวาง'],
  'maintain':     ['ละทิ้ง','ทำลาย','เพิกเฉย','ลดลง'],
  'obtain':       ['สูญเสีย','ยอมแพ้','ปฏิเสธ','ละทิ้ง'],
  'potential':    ['ข้อจำกัด','ความล้มเหลว','ปัญหา','อุปสรรค'],
  'relevant':     ['ไม่เกี่ยวข้อง','สับสน','คลุมเครือ','ไม่ชัดเจน'],
  'sufficient':   ['ไม่เพียงพอ','มากเกินไป','น้อยเกินไป','ขาดแคลน'],
  'tendency':     ['ข้อยกเว้น','ความบังเอิญ','ผลลัพธ์','สาเหตุ'],
  'apparent':     ['ซ่อนเร้น','คลุมเครือ','ลึกลับ','ไม่ชัดเจน'],
  'despite':      ['เพราะว่า','เนื่องจาก','ดังนั้น','ในขณะที่'],
  'whereas':      ['เพราะว่า','ดังนั้น','นอกจากนี้','ยิ่งไปกว่านั้น'],
  'approximate':  ['แน่นอน','เกินจริง','ผิดพลาด','สมบูรณ์'],
  'diverse':      ['เหมือนกัน','เดียว','สม่ำเสมอ','แน่นอน'],
  'essential':    ['ไม่จำเป็น','ไม่สำคัญ','ไม่เกี่ยวข้อง','ทางเลือก'],
  'fundamental':  ['ผิวเผิน','ไม่สำคัญ','รอง','ชั่วคราว'],
  'guarantee':    ['ปฏิเสธ','สงสัย','คาดเดา','ทดสอบ'],
  'influence':    ['ไม่เกี่ยวข้อง','ป้องกัน','ขัดขวาง','ต่อต้าน'],
  'perception':   ['ความจริง','ข้อเท็จจริง','ผลลัพธ์','การพิสูจน์'],
  'resolve':      ['ปล่อยทิ้ง','หลีกเลี่ยง','ซับซ้อน','เพิกเฉย'],
  'strategy':     ['ความบังเอิญ','ผลลัพธ์','ปัญหา','ความสับสน'],
  'transition':   ['ความหยุดนิ่ง','ความคงที่','การยืนกราน','การปฏิเสธ'],
  'voluntary':    ['บังคับ','จำเป็น','ฝืนใจ','บีบบังคับ'],
  'widespread':   ['หายาก','จำกัด','เฉพาะที่','น้อยมาก'],
};

// ===== QUIZ QUESTIONS (grammar fill-in) =====
const GRAMMAR_QUESTIONS = [
  {
    word:'achieve', ipa:'/əˈtʃiːv/', topic:'Past Simple',
    sentence:'She ___ her goal after years of hard work.',
    options:['achieved','achieves','has achieved','was achieving'],
    answer:'achieved',
    explanation:'ใช้ Past Simple (V2) เพราะ "after years of hard work" บ่งบอกว่าเหตุการณ์นี้จบสมบูรณ์แล้วในอดีต',
  },
  {
    word:'negotiate', ipa:'/nɪˈɡəʊʃieɪt/', topic:'Present Perfect',
    sentence:'The two companies ___ a new agreement since last year.',
    options:['have negotiated','negotiated','are negotiating','will negotiate'],
    answer:'have negotiated',
    explanation:'ใช้ Present Perfect เพราะ "since last year" เชื่อมอดีตกับปัจจุบัน การเจรจายังมีผลถึงตอนนี้',
  },
  {
    word:'contribute', ipa:'/kənˈtrɪbjuːt/', topic:'Passive Voice',
    sentence:'Many useful ideas ___ by the students during the meeting.',
    options:['were contributed','contributed','have contributed','are contributing'],
    answer:'were contributed',
    explanation:'ใช้ Passive Voice (were + V3) เพราะ "ideas" คือสิ่งที่ถูกกระทำ ไม่ใช่ผู้กระทำ',
  },
  {
    word:'persist', ipa:'/pəˈsɪst/', topic:'Conditionals',
    sentence:'If she ___ with her training, she would become a champion.',
    options:['persisted','persists','had persisted','would persist'],
    answer:'persisted',
    explanation:'Second Conditional ใช้ V2 ใน if-clause เพื่อแสดงสถานการณ์สมมติที่ไม่น่าเป็นจริงในปัจจุบัน',
  },
  {
    word:'maintain', ipa:'/meɪnˈteɪn/', topic:'Modal Verbs',
    sentence:'You ___ a consistent study routine if you want to improve.',
    options:['should maintain','maintained','are maintaining','have maintained'],
    answer:'should maintain',
    explanation:'ใช้ Modal Verb "should" + V1 เพื่อแสดงคำแนะนำ โครงสร้างคือ Subject + modal + V1',
  },
  {
    word:'establish', ipa:'/ɪˈstæblɪʃ/', topic:'Past Simple',
    sentence:'The university ___ its first international programme in 1998.',
    options:['established','establishes','has established','was establishing'],
    answer:'established',
    explanation:'ใช้ Past Simple เพราะมีการระบุเวลาในอดีตชัดเจน "in 1998"',
  },
  {
    word:'analyze', ipa:'/ˈænəlaɪz/', topic:'Present Perfect',
    sentence:'The researchers ___ the data three times already.',
    options:['have analyzed','analyzed','are analyzing','will analyze'],
    answer:'have analyzed',
    explanation:'ใช้ Present Perfect เพราะ "already" บ่งบอกว่าทำเสร็จแล้วก่อนเวลาปัจจุบันและยังเกี่ยวข้องกับตอนนี้',
  },
  {
    word:'evaluate', ipa:'/ɪˈvæljueɪt/', topic:'Passive Voice',
    sentence:'The proposals ___ by the committee last Friday.',
    options:['were evaluated','evaluated','have been evaluated','are evaluating'],
    answer:'were evaluated',
    explanation:'ใช้ Passive Voice Past Simple เพราะ "committee" เป็นผู้กระทำ แต่ไม่ใช่ประธาน และมีบอกเวลา "last Friday"',
  },
];
