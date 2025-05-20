import { MeetingSchedule } from '../interface/groupInfoType';
import { TimeBlock } from '../interface/timeBlockType';

// Grid index로 쓰고 있던 time을 API call을 위해 Timeblock으로 바꾼다 (MeetingSchedule을 반환함)
export function formatGridtoTimeblock(
  myTime: Map<number, boolean[]>,
  coworkerTime: Map<string, Map<number, boolean[]>>,
  begin: number,
  end: number,
  days: Date[],
  myName: string = 'casio',
): MeetingSchedule[] {
  const res: MeetingSchedule[] = [];

  for (let i = 0; i < days.length; i++) {
    for (let j = 0; j < end - begin + 1; j++) {
      const timeBlock = formatIndextoTimeblock(i, j, begin, days);
      const available_members: string[] = [];
      const unavailable_members: string[] = [];

      // 우선 내가 가능한 시간인지 확인하기
      if (myTime.get(i)![j]) {
        available_members.push(myName);
      } else {
        unavailable_members.push(myName);
      }

      // coworker에 대해 가능한 시간인지 확인하기
      coworkerTime.forEach((val, key) => {
        const available = val.get(i)![j];
        if (available) {
          available_members.push(key);
        } else {
          unavailable_members.push(key);
        }
      });

      res.push({
        timeBlock,
        availableMembers: available_members,
        unavailableMembers: unavailable_members,
      });
    }
  }
  return res;
}

// row, col로부터 Timeblock을 반환함
export function formatIndextoTimeblock(
  row: number,
  col: number,
  begin: number,
  days: Date[],
): TimeBlock {
  const day = days[row];
  const timeIndex = col + (begin - 8) * 2;
  const startTime = `${8 + Math.floor(timeIndex / 2)}:${timeIndex % 2 == 0 ? '00' : '30'}`;
  const endTime = `${8 + Math.floor((timeIndex + 1) / 2)}:${
    (timeIndex + 1) % 2 == 0 ? '00' : '30'
  }`;

  return { day, timeIndex, startTime, endTime };
}
