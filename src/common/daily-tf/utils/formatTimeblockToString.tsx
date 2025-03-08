import { WeekdayEnum, weekdayToKorean } from '../enum/weekdayEnum';
import { TimeBlock, TimeBlockDay } from '../interface/timeBlockType';

export function formatTimeblockToString(timeblock: TimeBlock): string {
  if (timeblock.day instanceof Date) {
    const date = timeblock.day;
    const formattedDate = date
      .toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .replace(/ /g, '');
    return `${formattedDate} ${timeblock.startTime} - ${timeblock.endTime}`;
  }
  return `${weekdayToKorean(timeblock.day)} ${timeblock.startTime} - ${timeblock.endTime}`;
}

type ResultTuple = [Date | WeekdayEnum, string, number, string];

const backTo24 = (date: TimeBlockDay, time: string): ResultTuple => {
  const [hourStr, minuteStr] = time.split(':');
  let hour = parseInt(hourStr, 10);

  if (date instanceof Date) {
    const newDate = new Date(date);
    if (hour >= 24) {
      newDate.setDate(newDate.getDate() + 1);
      hour -= 24;
    }

    const period = hour < 12 ? '오전' : '오후';
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;
    return [newDate, period, displayHour, minuteStr];
  } else {
    let weekDay = date;
    if (hour >= 24) {
      weekDay = ((weekDay + 1) % 7) + 1;
      hour -= 24;
    }

    const period = hour < 12 ? '오전' : '오후';
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;
    return [weekDay, period, displayHour, minuteStr];
  }
};

// 최종 일정 확정에 나오는 것처럼 format
export const formatTimeBlockToStringWithDate = (timeblock: TimeBlock): string => {
  const date = timeblock.day;
  const startTime = timeblock.startTime;
  const endTime = timeblock.endTime;

  const [startDate, startPeriod, startHour, startMinute] = backTo24(date, startTime);
  const [endDate, endPeriod, endHour, endMinute] = backTo24(date, endTime);

  if (startDate instanceof Date && endDate instanceof Date) {
    if (+startDate == +endDate) {
      const formattedDate = `${startDate.getMonth() + 1}월 ${startDate.getDate()}일`;
      return `${formattedDate} ${startPeriod} ${startHour}시 ${
        startMinute == '30' ? `${startMinute}분` : ''
      } - ${endPeriod} ${endHour}시 ${endMinute == '30' ? `${endMinute}분` : ''}`;
    } else {
      const startFormattedDate = `${startDate.getMonth() + 1}월 ${startDate.getDate()}일`;
      const endFormattedDate = `${endDate.getMonth() + 1}월 ${endDate.getDate()}일`;
      return `${startFormattedDate} ${startPeriod} ${startHour}시 ${
        startMinute == '30' ? `${startMinute}분` : ''
      } - ${endFormattedDate} ${endPeriod} ${endHour}시 ${
        endMinute == '30' ? `${endMinute}분` : ''
      }`;
    }
  } else {
    if (startDate == endDate) {
      return `${weekdayToKorean(startDate as WeekdayEnum)} ${startPeriod} ${startHour}시 ${
        startMinute == '30' ? `${startMinute}분` : ''
      } - ${endPeriod} ${endHour}시 ${endMinute == '30' ? `${endMinute}분` : ''}`;
    } else {
      return `${weekdayToKorean(startDate as WeekdayEnum)} ${startPeriod} ${startHour}시 ${
        startMinute == '30' ? `${startMinute}분` : ''
      } - ${weekdayToKorean(endDate as WeekdayEnum)} ${endPeriod} ${endHour}시 ${
        endMinute == '30' ? `${endMinute}분` : ''
      }`;
    }
  }
};
