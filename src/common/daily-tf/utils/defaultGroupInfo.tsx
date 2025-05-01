import { MeetingGroup } from '../interface/groupInfoType';

export const defaultGroupInfo: MeetingGroup = {
  title: '',
  maxMember: 5,
  days: [],
  begin: 8,
  end: 27,
  id: 0, // 나중에 로직 추가
  year: 0, // 현재 연도 가져오기로 항상 넣어도 괜찮은지 (겨울학기 넘어가는 거 고려)
  semester: 0, // 현재 학기 가져오는 로직?
  leaderUserProfileId: 0,
  schedule: [],
  members: [],
};
