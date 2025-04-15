import styled from 'styled-components';
import SearchArea from '../search/SearchArea';
import TimeBlock from '../interface/Timeblock';
import Divider from '../Divider';
import Button from '../Button';
import Icon from '../Icon';
import FlexWrapper from '../FlexWrapper';
import Typography from '../Typography';
import { useState } from 'react';

interface LectureSearchAreaProps {
  timeFilter: null | TimeBlock;
  setTimeFilter: React.Dispatch<React.SetStateAction<TimeBlock | null>>;
}

const Wrapper = styled.div`
  width: 300px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow: hidden;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ListWrapper = styled.div`
  flex: 1;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ListTileMock = styled.div`
  width: 100%;
  height: 100px;
  background-color: red;
`;

const LectureSearchArea: React.FC<LectureSearchAreaProps> = ({ timeFilter, setTimeFilter }) => {
  const [isFavorite, setIsfavorite] = useState<boolean>(false);
  const handleFavoriteOnclick = () => {
    setIsfavorite(!isFavorite);
  };

  return (
    <Wrapper>
      <SearchArea timeFilter={timeFilter} setTimeFilter={setTimeFilter} />
      <Divider direction="row" />
      <ButtonWrapper>
        {isFavorite ? (
          <Button type="selected" $paddingLeft={12} $paddingTop={8} onClick={handleFavoriteOnclick}>
            <Typography>이전</Typography>
          </Button>
        ) : (
          <Button type="selected" $paddingLeft={12} $paddingTop={8} onClick={handleFavoriteOnclick}>
            <FlexWrapper direction="row" gap={8}>
              <Icon type="FavoriteBorder" size={17.5}></Icon>
              <Typography>찜 목록</Typography>
            </FlexWrapper>
          </Button>
        )}
        {/* 여기에는 나중에 칩이 들어가야 해요! */}
        <Button $paddingLeft={12} $paddingTop={8}>
          <Typography>placeholder</Typography>
        </Button>
      </ButtonWrapper>
      <ListWrapper>
        <ListTileMock />
        <ListTileMock />
        <ListTileMock />
      </ListWrapper>
    </Wrapper>
  );
};

export default LectureSearchArea;
