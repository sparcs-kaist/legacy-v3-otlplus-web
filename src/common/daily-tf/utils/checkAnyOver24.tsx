import { MeetingResult } from '../interface/groupInfoType';
import { PersonalBlock } from '../interface/personalType';
import { TimeBlock } from '../interface/timeBlockType';
import { LectureSummary } from '../interface/timetableType';

export function checkAnyOver24(
  schedule: LectureSummary[] | MeetingResult[] | PersonalBlock[],
): boolean {
  schedule.forEach((val, _) => {
    const timeBlocks = val.timeBlocks;
    timeBlocks.forEach((t, __) => {
      if (checkIfOver24(t)) {
        return true;
      }
    });
  });
  return false;
}

export function checkIfOver24(timeBlock: TimeBlock): boolean {
  const timeIndex = timeBlock.timeIndex;
  const duration = timeBlock.duration;
  return timeIndex + duration > 31;
}
