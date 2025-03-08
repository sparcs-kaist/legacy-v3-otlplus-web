import { MeetingSchedule } from '../interface/groupInfoType';
import { TimeBlock } from '../interface/timeBlockType';

// Grid index로 쓰고 있던 time을 API call을 위해 Timeblock으로 바꾼다 (MeetingSchedule을 반환함)
// TODO: placeholder 고려해서 바꿔줘야 함!
export function formatGroupTimeGridtoTimeblock(
  myTime: Map<number, boolean[]>,
  coworkerTime: Map<string, Map<number, boolean[]>>,
  begin: number,
  end: number,
  tunedDateArray: Date[],
  myName: string = 'casio',
): MeetingSchedule[] {
  const res: MeetingSchedule[] = [];

  for (let i = 0; i < tunedDateArray.length; i++) {
    for (let j = 0; j < end - begin + 1; j++) {
      const timeBlock = formatIndextoTimeblock(i, j, begin, tunedDateArray);
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

// Grid가 Map으로 들어왔을 때, ture로 선택된 영역에 해당하는 Timeblock을 반환 (연속하면 하나의 Timeblock으로 저장)
export function formatSelectedGridtoTimeblock(
  target: Map<number, boolean[]>,
  begin: number,
  end: number,
  tunedDateArray: Date[],
): TimeBlock[] {
  const res: TimeBlock[] = [];
  let currentBlock: TimeBlock | null = null;

  for (let i = 0; i < tunedDateArray.length; i++) {
    for (let j = 0; j < (end - begin + 1) * 2; j++) {
      const isSelected = target.get(i)?.[j] || false;

      if (isSelected) {
        const timeBlock = formatIndextoTimeblock(i, j, begin, tunedDateArray);

        if (
          currentBlock &&
          +currentBlock.day === +timeBlock.day &&
          currentBlock.endTime === timeBlock.startTime
        ) {
          currentBlock.endTime = timeBlock.endTime;
        } else {
          if (currentBlock) res.push(currentBlock);
          currentBlock = timeBlock;
        }
      }
    }
    if (currentBlock) {
      res.push(currentBlock);
      currentBlock = null;
    }
  }
  return res;
}

// row, col로부터 Timeblock을 반환함
export function formatIndextoTimeblock(
  row: number,
  col: number,
  begin: number,
  tunedDateArray: Date[],
): TimeBlock {
  const day = tunedDateArray[row];
  const timeIndex = col + (begin - 8) * 2;
  const startTime = `${8 + Math.floor(timeIndex / 2)}:${timeIndex % 2 == 0 ? '00' : '30'}`;
  const endTime = `${8 + Math.floor((timeIndex + 1) / 2)}:${
    (timeIndex + 1) % 2 == 0 ? '00' : '30'
  }`;

  return {
    day,
    timeIndex,
    startTime,
    endTime,
    duration: 1,
  };
}
