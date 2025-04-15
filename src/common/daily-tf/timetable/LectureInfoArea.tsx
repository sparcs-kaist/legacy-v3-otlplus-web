import { styled } from 'styled-components';
import Lecture from '../interface/Lecture';
import PlaceholderComponenet from '../Placeholder';
import LectureInfoNested from './lecture/LectureInfoNested';
import Review from '../interface/Review';
import { useState } from 'react';
// 테스트를 위해 mockReviews를 기본으로 설정해 둠. 나중에 API로 리뷰 받아올 수 있게 연결해야 함.
import { default as mockReviews } from '@/dummy/reviews';
import Divider from '../Divider';
import LectureFriendList from './lecture/LectureFriendList';

interface LectureInfoAreaProps {
  lecture: Lecture | null;
}

const Wrapper = styled.div`
  width: 380px;
  height: 100%;
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ListWrapper = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow: scroll;
`;

const MockTile = styled.div`
  width: 100%;
  height: 100px;
  background-color: blue;
`;

const LectureInfoAreaContents: React.FC<LectureInfoAreaProps> = ({ lecture }) => {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);

  return (
    <ContentWrapper>
      <LectureInfoNested lecture={lecture!} />
      <Divider direction="row" />
      <LectureFriendList lecture={lecture!} />
      <Divider direction="row" />
      <ListWrapper>
        <MockTile />
        <MockTile />
        <MockTile />
        <MockTile />
        <MockTile />
        <MockTile />
        <MockTile />
      </ListWrapper>
    </ContentWrapper>
  );
};

const LectureInfoArea: React.FC<LectureInfoAreaProps> = ({ lecture }) => {
  return (
    <Wrapper>
      {lecture == null ? <PlaceholderComponenet /> : <LectureInfoAreaContents lecture={lecture} />}
    </Wrapper>
  );
};

export default LectureInfoArea;
