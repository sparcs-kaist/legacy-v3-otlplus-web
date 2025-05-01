import { LectureSummary } from '../interface/timetableType';

// 이걸 바탕으로 disabledArea를 생성
const mockLectureSummaries: LectureSummary[] = [
  {
    id: 1,
    title: '데이터 구조',
    title_en: 'Data Structures',
    professor_name: '김철수',
    professor_name_en: 'Chulsoo Kim',
    classroom: '공학관 301호',
    classroom_en: 'Engineering Building 301',
    timeBlocks: [
      {
        day: new Date(),
        timeIndex: 4,
        startTime: '10:00',
        endTime: '11:30',
      },
      {
        day: new Date(),
        timeIndex: 4,
        startTime: '10:00',
        endTime: '11:30',
      },
    ],
  },
  {
    id: 2,
    title: '운영체제',
    title_en: 'Operating Systems',
    professor_name: '이영희',
    professor_name_en: 'Younghee Lee',
    classroom: 'IT관 204호',
    classroom_en: 'IT Building 204',
    timeBlocks: [
      {
        day: new Date(),
        timeIndex: 6,
        startTime: '13:00',
        endTime: '14:30',
      },
      {
        day: new Date(),
        timeIndex: 6,
        startTime: '13:00',
        endTime: '14:30',
      },
    ],
  },
  {
    id: 3,
    title: '알고리즘',
    title_en: 'Algorithms',
    professor_name: '박민수',
    professor_name_en: 'Minsu Park',
    classroom: '과학관 102호',
    classroom_en: 'Science Building 102',
    timeBlocks: [
      {
        day: new Date(),
        timeIndex: 8,
        startTime: '15:00',
        endTime: '16:30',
      },
    ],
  },
];
