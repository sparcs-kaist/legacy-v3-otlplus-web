import { TimeBlock, TimeBlockDay } from './timeBlockType';

export type MeetingGroup = {
  id: number;
  year: number;
  semester: number;
  begin: number;
  end: number;
  days: TimeBlockDay[];
  title: string;
  leaderUserProfileId: number;
  schedule: MeetingSchedule[];
  maxMember: number;
  members: MeetingMember[];
  result?: MeetingResult;
};

export type MeetingMember = {
  id: number;
  userId?: number;
  studentNumber: string;
  name: string;
  availableTimeBlock: TimeBlock[];
};

export type MeetingSchedule = {
  timeBlock: TimeBlock;
  availableMembers: [];
  unavailableMembers: MeetingMember[];
};

export type MeetingResult = {
  id: number; // meeting_group_result_id
  group_id: number; // meeting_group_id
  year: number;
  semester: number;

  //available_members: MeetingMember[];
  //unavailable_members: MeetingMember[];
  available_members: string[];
  unavailable_members: string[];

  title: string;
  timeBlocks: TimeBlock[];
  place: string | null; // 장소
  description: string | null; // 설명
  //color: COLOR_TYPE ; // 색상 원래 어떻게 저장하지
};
