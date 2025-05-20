import { SearchLecture } from '@/common/daily-tf/interface/SearchLecture';
import Lecture from '@/common/daily-tf/interface/Lecture';
import { WeekdayEnum } from '@/common/daily-tf/enum/weekdayEnum';

export function transferSearchLectureToLecture(searchLecture: SearchLecture): Lecture {
  return {
    ...searchLecture,
    classtimes: searchLecture.classtimes.map((time) => ({
      day: time.day as WeekdayEnum,
      timeIndex: (time.begin - 480) / 30,
      duration: (time.end - time.begin) / 30,
      startTime: `${String(Math.floor(time.begin / 60)).padStart(2, '0')}:${String(
        time.begin % 60,
      ).padStart(2, '0')}`,
      endTime: `${String(Math.floor(time.end / 60)).padStart(2, '0')}:${String(
        time.end % 60,
      ).padStart(2, '0')}`,
    })),
    examtimes: searchLecture.examtimes.map((time) => ({
      day: time.day as WeekdayEnum,
      timeIndex: (time.begin - 480) / 30,
      duration: (time.end - time.begin) / 30,
      startTime: `${String(Math.floor(time.begin / 60)).padStart(2, '0')}:${String(
        time.begin % 60,
      ).padStart(2, '0')}`,
      endTime: `${String(Math.floor(time.end / 60)).padStart(2, '0')}:${String(
        time.end % 60,
      ).padStart(2, '0')}`,
    })),
    classroom: searchLecture.classtimes[0].classroom,
    classroom_en: searchLecture.classtimes[0].classroom_en,
  };
}
