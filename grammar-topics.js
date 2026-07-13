// ===== GRAMMAR LEARNING DATA (Memory Anchor system) =====
const GRAMMAR_TOPICS = [
  {
    id: 'present_simple',
    level: 'A1',
    group: 'A',
    pairedWith: 'present_continuous',
    name_th: 'ปัจจุบันกาลธรรมดา',
    name_en: 'Present Simple',
    icon: 'ti-calendar',
    color: 'accent',
    anchor_th: 'ตารางชีวิต / กิจวัตรประจำวัน',
    anchor_en: 'A daily schedule / routine',
    description_th: 'ใช้พูดถึงสิ่งที่เกิดเป็นประจำ เป็นความจริงทั่วไป ไม่ใช่แค่ตอนนี้',
    structure_positive: 'Subject + V1 (+s/es)',
    structure_negative: 'Subject + do/does not + V1',
    structure_question: 'Do/Does + Subject + V1?',
    examples: ['She works at a hospital.', 'The sun rises in the east.', 'I usually wake up at 7 AM.'],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
  {
    id: 'present_continuous',
    level: 'A1',
    group: 'A',
    pairedWith: 'present_simple',
    name_th: 'ปัจจุบันกาลต่อเนื่อง',
    name_en: 'Present Continuous',
    icon: 'ti-camera',
    color: 'teal',
    anchor_th: 'กล้องวิดีโอกำลังถ่ายอยู่ตอนนี้',
    anchor_en: 'A video camera recording right now',
    description_th: 'ใช้พูดถึงสิ่งที่กำลังเกิดขึ้น ณ ขณะนี้เท่านั้น',
    structure_positive: 'Subject + am/is/are + V-ing',
    structure_negative: 'Subject + am/is/are + not + V-ing',
    structure_question: 'Am/Is/Are + Subject + V-ing?',
    examples: ['She is working right now.', 'Look! It is raining.', 'They are studying at the moment.'],
    box: 1, correct: 0, seen: 0, lastSeen: null,
  },
];

// ===== TEST QUESTIONS (discrimination task สำหรับกลุ่ม A) =====
const GRAMMAR_TEST_BANK = {
  'present_simple__present_continuous': [
    {
      situation_th: 'เธอทำงานที่โรงพยาบาล (เป็นอาชีพประจำ) / ตอนนี้เธอกำลังทำงานอยู่',
      blanks: [
        { sentence: 'She ___ at a hospital.', answer: 'works', options: ['works', 'is working'], topicId: 'present_simple' },
        { sentence: 'She ___ right now.', answer: 'is working', options: ['works', 'is working'], topicId: 'present_continuous' },
      ],
    },
    {
      situation_th: 'ปกติเขาดื่มกาแฟทุกเช้า / ตอนนี้เขากำลังดื่มกาแฟอยู่',
      blanks: [
        { sentence: 'He ___ coffee every morning.', answer: 'drinks', options: ['drinks', 'is drinking'], topicId: 'present_simple' },
        { sentence: 'He ___ coffee right now.', answer: 'is drinking', options: ['drinks', 'is drinking'], topicId: 'present_continuous' },
      ],
    },
    {
      situation_th: 'พระอาทิตย์ขึ้นทางทิศตะวันออก (ความจริงทั่วไป) / ฝนกำลังตกอยู่ตอนนี้',
      blanks: [
        { sentence: 'The sun ___ in the east.', answer: 'rises', options: ['rises', 'is rising'], topicId: 'present_simple' },
        { sentence: 'Look! It ___ outside.', answer: 'is raining', options: ['rains', 'is raining'], topicId: 'present_continuous' },
      ],
    },
    {
      situation_th: 'นักเรียนไปโรงเรียนทุกวัน / ตอนนี้พวกเขากำลังเรียนอยู่ในห้อง',
      blanks: [
        { sentence: 'Students ___ to school every day.', answer: 'go', options: ['go', 'are going'], topicId: 'present_simple' },
        { sentence: 'They ___ in the classroom now.', answer: 'are studying', options: ['study', 'are studying'], topicId: 'present_continuous' },
      ],
    },
    {
      situation_th: 'บริษัทนี้ผลิตรถยนต์ (ธุรกิจปกติ) / ตอนนี้พวกเขากำลังผลิตรุ่นใหม่',
      blanks: [
        { sentence: 'This company ___ cars.', answer: 'makes', options: ['makes', 'is making'], topicId: 'present_simple' },
        { sentence: 'They ___ a new model this month.', answer: 'are making', options: ['make', 'are making'], topicId: 'present_continuous' },
      ],
    },
  ],
};
