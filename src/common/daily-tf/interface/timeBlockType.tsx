import { WeekdayEnum } from '../enum/weekdayEnum';

export type TimeBlockDay = Date;

export type TimeBlock = {
  day: TimeBlockDay;
  timeIndex: number; // 0~
  startTime: string; // ("HH:MM, 8:00~29:30"), 8+timeindex / 2 : timeIndex%2 * 30
  endTime: string; // ("HH:MM, 8:30~30:00")
};
