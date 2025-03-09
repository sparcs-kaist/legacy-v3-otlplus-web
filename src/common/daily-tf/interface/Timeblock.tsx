import { WeekdayEnum } from '../enum/weekdayEnum';

export type TimeBlockDay = Date | WeekdayEnum;
export default interface TimeBlock {
  day: TimeBlockDay;
  timeIndex: number; // 0~
  duration: number; //30분 단위로 몇 칸인지
  startTime: string; // ("HH:MM, 8:00~29:30"), 8+timeindex / 2 : timeIndex%2 * 30
  endTime: string; // ("HH:MM, 8:30~30:00")
}
