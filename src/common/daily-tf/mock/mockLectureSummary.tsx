import { WeekdayEnum } from '../enum/weekdayEnum';
import { LectureSummary } from '../interface/Timetable';

const mockLectureSummaries: LectureSummary[] = [
  {
    id: 1,
    course_id: 3678,
    title: '화학 및 생물 제품디자인',
    title_en: 'Chemical and Biological Product Design',
    professor_name: '장용근',
    professor_name_en: 'Chulsoo Kim',
    classroom: '(E2) 산업경영학동 1225',
    classroom_en: 'B102',
    timeBlocks: [
      {
        day: WeekdayEnum.Mon,
        timeIndex: 4, // 10:00 ~ 12:00
        startTime: '10:00',
        endTime: '12:00',
        duration: 4,
      },
      {
        day: WeekdayEnum.Wed,
        timeIndex: 10, // 14:00 ~ 16:00
        startTime: '14:00',
        endTime: '16:00',
        duration: 4,
      },
    ],
  },
  {
    id: 2,
    course_id: 295,
    title: '공정 및 제품 디자인',
    title_en: 'Techniques of Process and Product Design',
    professor_name: '이재우, 장용근',
    professor_name_en: 'Younghee Lee, Jihoon Park',
    classroom: '(W1-3) 응용공학동 (2501-1호) 세미나실',
    classroom_en: '(W1-3) Applied Enginnering B/D (2501-1) Seminar Room',
    timeBlocks: [
      {
        day: WeekdayEnum.Thu,
        timeIndex: 12,
        startTime: '16:00',
        endTime: '18:00',
        duration: 4,
      },
    ],
  },
  {
    id: 3,
    course_id: 1599,
    title: '생명화학공학 디자인 프로젝트',
    title_en: 'Chemical and Biomolecular Engineering Capstone Design Project',
    professor_name: '리섕',
    professor_name_en: 'Minsu Cho',
    classroom: '(W1-1) 응용공학동 2122',
    classroom_en: '(W1-1) Applied Enginnering B/D 2122',
    timeBlocks: [
      {
        day: WeekdayEnum.Sat,
        timeIndex: 0,
        startTime: '08:00',
        endTime: '10:00',
        duration: 4,
      },
      {
        day: WeekdayEnum.Mon,
        timeIndex: 8,
        startTime: '12:00',
        endTime: '14:00',
        duration: 4,
      },
    ],
  },
];

export default mockLectureSummaries;
