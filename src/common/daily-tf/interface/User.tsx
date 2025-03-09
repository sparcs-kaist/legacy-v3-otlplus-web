import Department from './Departmet';
import Lecture from './Lecture';
import Review from './Review';

export default interface UserProfile {
  id: number;
  email: string;
  student_id: string;
  firstName: string;
  lastName: string;
  majors: Department[];
  department?: Department;
  departments: Department[];
  favorite_departments: Department[];
  review_writable_lectures: Lecture[];
  my_timetable_lectures: Lecture[];
  reviews: Review[];
}
