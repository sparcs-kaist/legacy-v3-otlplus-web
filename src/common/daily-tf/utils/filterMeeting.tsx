import { MeetingGroup } from '../interface/groupInfoType';

export function filterMeeting(groupMeetingList: MeetingGroup[]): Map<string, MeetingGroup[]> {
  const pendingGroup: MeetingGroup[] = []; // 참여 대기 모임
  const setUpGroup: MeetingGroup[] = []; // 다가오는 모임
  const readyGroup: MeetingGroup[] = []; // 확정 대기 모임 & 내가 리더 아님
  const leaderGroup: MeetingGroup[] = []; // 확정 대기 모임 & 내가 리더

  groupMeetingList.forEach((val, _) => {
    const isReady = val.maxMember == val.members.length;
    const isSetUp = val.result != undefined;
    const isLeader = val.leaderUserProfileId == 0; // 일단 placeholder로 0

    if (isSetUp) {
      setUpGroup.push(val);
    } else {
      if (isReady) {
        if (isLeader) {
          leaderGroup.push(val);
        } else {
          readyGroup.push(val);
        }
      } else {
        pendingGroup.push(val);
      }
    }
  });
  return new Map([
    ['pending', pendingGroup],
    ['setUp', setUpGroup],
    ['ready', leaderGroup.concat(readyGroup)],
  ]);
}
