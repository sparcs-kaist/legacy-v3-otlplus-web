import { useState } from 'react';
import Lecture from '../../interface/Lecture';
import Friend from '../../interface/Friend';
import { friends } from '../../mock/mockFriend';
import FlexWrapper from '../../FlexWrapper';
import Typography from '../../Typography';
import FriendChip from '../../friend/FriendChip';
import styled from 'styled-components';

const FriendChipWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 6px;
  flex-wrap: wrap;
`;

const LectureFriendList: React.FC<{ lecture: Lecture }> = ({ lecture }) => {
  // TODO: 여기에 API 연결하기!
  const [sharing, setSharing] = useState<Friend[]>(friends.slice(0, 6));
  const [taken, setTaken] = useState<Friend[]>(friends.slice(-4));

  return (
    <FlexWrapper direction="column" gap={24}>
      <FlexWrapper direction="column" gap={10}>
        <Typography type="NormalBold">이 수업을 같이 듣는 친구</Typography>
        <FriendChipWrapper>
          {sharing.map((val, idx) => (
            <FriendChip friend={val} key={idx} />
          ))}
        </FriendChipWrapper>
      </FlexWrapper>
      <FlexWrapper direction="column" gap={10}>
        <Typography type="NormalBold">이 수업을 수강한 친구</Typography>
        <FriendChipWrapper>
          {taken.map((val, idx) => (
            <FriendChip friend={val} key={idx} />
          ))}
        </FriendChipWrapper>
      </FlexWrapper>
    </FlexWrapper>
  );
};

export default LectureFriendList;
