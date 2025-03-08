import { LectureSummary } from '../interface/timetableType';

const mockLectureSummaries: LectureSummary[] = [
  {
    id: 1,
    course_id: 101,
    title: '컴퓨터 공학 개론',
    title_en: 'Introduction to Computer Science',
    professor_name: '김철수',
    professor_name_en: 'Chulsoo Kim',
    classroom: '(E2) 산업경영학동 1225',
    classroom_en: 'B102',
    timeBlocks: [
      {
        day: new Date('2025-03-09'),
        timeIndex: 4, // 10:00 ~ 12:00
        startTime: '10:00',
        endTime: '12:00',
        duration: 4,
      },
      {
        day: new Date('2025-03-11'),
        timeIndex: 10, // 14:00 ~ 16:00
        startTime: '14:00',
        endTime: '16:00',
        duration: 4,
      },
    ],
  },
  {
    id: 2,
    course_id: 102,
    title: '알고리즘',
    title_en: 'Algorithms',
    professor_name: '이영희, 박지훈',
    professor_name_en: 'Younghee Lee, Jihoon Park',
    classroom: 'A103',
    classroom_en: 'A103',
    timeBlocks: [
      {
        day: new Date('2025-03-10'),
        timeIndex: 12,
        startTime: '16:00',
        endTime: '18:00',
        duration: 4,
      },
    ],
  },
  {
    id: 3,
    course_id: 103,
    title: '인공지능 기초',
    title_en: 'Introduction to AI',
    professor_name: '조민수',
    professor_name_en: 'Minsu Cho',
    classroom: 'C204',
    classroom_en: 'C204',
    timeBlocks: [
      {
        day: new Date('2025-03-12'),
        timeIndex: 0,
        startTime: '08:00',
        endTime: '10:00',
        duration: 4,
      },
      {
        day: new Date('2025-03-13'),
        timeIndex: 8,
        startTime: '12:00',
        endTime: '14:00',
        duration: 4,
      },
    ],
  },
];

export default mockLectureSummaries;
