import { MeetingResult } from '../interface/Group';

import { LectureSummary } from '../interface/Timetable';
import { DisabledAreaType } from '../interface/disabledAreaType';
import PersonalBlock from '../interface/Personal';

export function timeToTimeIndex(time: string): number {
  const [hour, minute] = time.split(' : ');
  const hourNum = parseInt(hour, 10);
  const minuteNum = parseInt(minute, 10);

  return (hourNum - 8) * 2 + minuteNum / 30;
}

function lectureSummaryToDisabledArea(target: LectureSummary[]): DisabledAreaType[] {
  const res: DisabledAreaType[] = [];

  for (let i = 0; i < target.length; i++) {
    const lecture = target[i];
    const timeBlockList = lecture.timeBlocks;
    timeBlockList.forEach((val, _) => {
      const startIndex = timeToTimeIndex(val.startTime);
      const endIndex = timeToTimeIndex(val.endTime);
      const title = lecture.title;
      const desc = `${lecture.professor_name}₩n${lecture.classroom}`;
      res.push({
        name: title,
        startIndex: startIndex,
        endIndex: endIndex,
        desc: desc,
      });
    });
  }

  return res;
}

function personalAndMeetingToDisabledArea(
  target: PersonalBlock[] | MeetingResult[],
): DisabledAreaType[] {
  const res: DisabledAreaType[] = [];

  for (let i = 0; i < target.length; i++) {
    const personal = target[i];
    const timeBlockList = personal.timeBlocks;
    timeBlockList.forEach((val, _) => {
      const startIndex = timeToTimeIndex(val.startTime);
      const endIndex = timeToTimeIndex(val.endTime);
      const title = personal.title;
      res.push({
        name: title,
        startIndex: startIndex,
        endIndex: endIndex,
      });
    });
  }

  return res;
}

// 각 day에 대해 index : TimeBlock[] 형식으로 API response를 받을 계획 (BE와 원만한 합의 필요)
export function getDisabledArea(
  lecture: Map<number, LectureSummary[]>,
  personal: Map<number, PersonalBlock[]>,
  meeting: Map<number, MeetingResult[]>,
  rows: number,
): Map<number, DisabledAreaType[]> {
  const res: Map<number, DisabledAreaType[]> = new Map(
    Array.from({ length: rows }, (_, rowIndex) => [rowIndex, []]),
  );

  for (let i = 0; i < rows; i++) {
    // 일단 인덱스로 다 바꾸기
    const lectureDisabled = lectureSummaryToDisabledArea(lecture.get(i)!);
    const personalDisabled = personalAndMeetingToDisabledArea(personal.get(i)!);
    const meetingDisabled = personalAndMeetingToDisabledArea(meeting.get(i)!);
    const mergedList = [...lectureDisabled, ...personalDisabled, ...meetingDisabled];
    res.set(i, mergedList);
  }

  return res;
}
