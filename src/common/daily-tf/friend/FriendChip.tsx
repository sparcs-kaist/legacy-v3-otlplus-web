import styled from 'styled-components';
import Friend from '../interface/Friend';

import { useNavigate } from 'react-router-dom';
import Typography from '../Typography';

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.Background.Block.default};
  padding: 8px 16px;
  border-radius: 16px;
  color: ${({ theme }) => theme.colors.Text.light};
  cursor: default;

  &:hover {
    background-color: ${({ theme }) => theme.colors.Background.Block.dark};
  }
`;

const FriendChip: React.FC<{ friend: Friend }> = ({ friend }) => {
  const navigate = useNavigate();
  const onClickChip = () => {
    navigate(`/friend?startFriendId=${friend.id}`);
  };
  return (
    <Wrapper onClick={onClickChip}>
      <Typography>{`${friend.user_profile.firstName}${friend.user_profile.lastName}`}</Typography>
    </Wrapper>
  );
};

export default FriendChip;
