import { SemesterEnum } from '@/common/daily-tf/enum/semesterEnum';
import { Professor } from '@/common/daily-tf/interface/Professor';

export interface SearchLecture {
  id: number;
  title: string;
  title_en: string;
  course: number;
  old_old_code: string;
  old_code: string;
  class_no: string;
  year: number;
  semester: SemesterEnum;
  code: string;
  department: number;
  department_code: string;
  department_name: string;
  department_name_en: string;
  type: string;
  type_en: string;
  limit: number;
  num_people: number;
  is_english: boolean;
  num_classes: number;
  num_labs: number;
  credit: number;
  credit_au: number;
  common_title: string;
  common_title_en: string;
  class_title: string;
  class_title_en: string;
  review_total_weight: number;
  professors: Professor[];
  grade: number;
  load: number;
  speech: number;
  classtimes: ClassTimeBlock[];
  examtimes: ExamTimeBlock[];
}

interface ClassTimeBlock {
  building_code: string;
  room_name: string;
  classroom: string;
  classroom_en: string;
  classroom_short: string;
  classroom_short_en: string;
  day: number;
  begin: number;
  end: number;
}

interface ExamTimeBlock {
  day: number;
  str: string;
  str_en: string;
  begin: number;
  end: number;
}
