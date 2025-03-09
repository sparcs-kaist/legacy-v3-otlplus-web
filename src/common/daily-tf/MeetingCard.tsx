import { styled } from 'styled-components';

import Typography from './Typography';
import FlexWrapper from './FlexWrapper';
import { formatTimeblockToString } from './utils/formatTimeblockToString';
import Button from './Button';
import { MeetingGroup } from './interface/Group';

const CardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.Line.default};
  background-color: ${({ theme }) => theme.colors.Background.Block.highlight};
  border-radius: 6px;
  padding: 12px 16px;
  gap: 4px;
  justify-content: space-between;
  align-items: center;
`;

const ScheduleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  max-width: 100%;
  flex-wrap: wrap;
`;

const MeetingCard: React.FC<{ group: MeetingGroup }> = ({ group }) => {
  const isReady = group.maxMember == group.members.length;
  const isSetUp = group.result != undefined;
  // 내가 방장인지. 우선은 placeholder로 0 넣어둠. 이후 내 id 받아와서 비교 필요
  const isLeader = group.leaderUserProfileId == 0;

  return (
    <CardWrapper>
      <FlexWrapper direction="column" gap={10}>
        <Typography type="NormalBold">{group.title}</Typography>
        <FlexWrapper direction="row" gap={6}>
          <Typography type="Normal">참여인원</Typography>
          <Typography type="Normal">{`${group.members.length}명/${group.maxMember}명`}</Typography>
        </FlexWrapper>
        {group.result && (
          <ScheduleWrapper>
            {group.result.timeBlocks.map((val, idx) => (
              <div key={idx}>{formatTimeblockToString(val)}</div>
            ))}
          </ScheduleWrapper>
        )}
      </FlexWrapper>
      <FlexWrapper direction="row" gap={4}>
        {isSetUp ? (
          <Button type="default" isFlexRow={false} isFlexColumn={false} onClick={() => {}}>
            일정 삭제
          </Button>
        ) : (
          <>
            <Button type="default" isFlexRow={false} isFlexColumn={false} onClick={() => {}}>
              링크 복사
            </Button>
            {isLeader && isReady ? (
              <Button type="highlighted" isFlexRow={false} isFlexColumn={false}>
                일정 확정
              </Button>
            ) : (
              <Button type="selected" isFlexRow={false} isFlexColumn={false}>
                일정 수정
              </Button>
            )}
          </>
        )}
      </FlexWrapper>
    </CardWrapper>
  );
};

export default MeetingCard;
