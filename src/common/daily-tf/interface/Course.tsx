import Department from './Departmet';
import Friend from './Friend';
import { NestedProfessor } from './Professor';
import TimeBlock from './Timeblock';

export interface Course {
  id: number;
  old_code: string;
  department?: Department;
  type: string;
  type_en: string;
  title: string;
  title_en: string;
  summary: string;
  review_total_weight: number;
  credit: number;
  credit_au: number;
  num_classes: number;
  num_labs: number;
  related_courses_prior: NestedCourse[];
  related_courses_posterior: NestedCourse[];
  professors: NestedProfessor[];
  grade: number;
  load: number;
  speech: number;
  common_title: number;
  classtimes: TimeBlock[];
  examtimes: TimeBlock[];
  classroom: string;
  classroom_en: string;
}

export interface NestedCourse {
  id: number;
  old_code: string;
  department: Department;
  type: string;
  type_en: string;
  title: string;
  title_en: string;
  summary: string;
  review_total_weight: number;
  professors: NestedProfessor[];
  credit: number;
  credit_au: number;
  num_classes: number;
  num_labs: number;
  // 원래 없었는데 추가함
  num_people: number;
  classroom: string;
  classroom_en: string;
  // Daily TF에서 추가되는 부분
  // 이름이 뭘까...? 진짜 뭘까
  classMate: Friend[];
  takenFriend: Friend[];
}
