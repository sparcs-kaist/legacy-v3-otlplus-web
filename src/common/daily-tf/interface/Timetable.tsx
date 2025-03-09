import { MeetingResult } from './Group';
import type PersonalBlock from './Personal';
import type TimeBlock from './Timeblock';

export interface TimetableSummary {
  id: number | null; // null 이면 학사시간표
  arrange_order: number; // 학사시간표이면 0
  lectures: LectureSummary[];
  personals: PersonalBlock[];
  meetings: MeetingResult[];
}
export interface TimetableResponse2 {
  id: number;
  lectures: LectureDetail2[];
  personals: PersonalBlock[];
  meetings: MeetingResult[];
  arrange_order: number;
}

export interface LectureSummary {
  id: number; //lecture.id
  course_id: number; // 색상 mapping용

  title: string;
  title_en: string;
  professor_name: string; // 여러명일 경우 join쳐서 줌
  professor_name_en: string;
  classroom: string;
  classroom_en: string;

  timeBlocks: TimeBlock[];
}

export interface LectureDetail2 {
  // 원래 detail

  timeBlocks: TimeBlock[];
}
