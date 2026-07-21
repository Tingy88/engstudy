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
