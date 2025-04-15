import Department from '../interface/Departmet';
import UserProfile from '../interface/User';

const departments: Department[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: `Department ${i + 1}`,
  name_en: `Department_${i + 1}_EN`,
  code: `DPT${i + 1}`,
}));

export const userProfiles: UserProfile[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  email: `user${i + 1}@example.com`,
  student_id: `202100${i}`,
  firstName: `First${i + 1}`,
  lastName: `Last${i + 1}`,
  majors: [departments[i % departments.length]],
  department: departments[i % departments.length],
  departments: [departments[i % departments.length], departments[(i + 1) % departments.length]],
  favorite_departments: [],
  review_writable_lectures: [],
  my_timetable_lectures: [],
  reviews: [],
}));
