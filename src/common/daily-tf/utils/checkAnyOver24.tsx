import { MeetingResult } from '../interface/Group';
import PersonalBlock from '../interface/Personal';
import TimeBlock from '../interface/Timeblock';

import { LectureSummary } from '../interface/Timetable';

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
