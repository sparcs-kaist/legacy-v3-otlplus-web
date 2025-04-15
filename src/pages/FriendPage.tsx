import CustomTimeTableGrid from '@/common/daily-tf/CustomTimeTableGrid';
import Review from '@/common/daily-tf/interface/Review';
import TimeBlock from '@/common/daily-tf/interface/Timeblock';
import { default as mockReviews } from '@/dummy/reviews';
import mockLectureSummaries from '@/common/daily-tf/mock/mockLectureSummary';
import PlaceholderComponenet from '@/common/daily-tf/Placeholder';
import SearchArea from '@/common/daily-tf/search/SearchArea';
import StyledDivider from '@/common/daily-tf/StyledDivider';
import TabButtonRow from '@/common/daily-tf/TabButtonRow';
import ReviewTile from '@/common/daily-tf/timetable/review/ReviewTile';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import LectureInfoNested from '@/common/daily-tf/timetable/lecture/LectureInfoNested';
import Lecture from '@/common/daily-tf/interface/Lecture';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  gap: 12px;
  padding-bottom: 20px;
  overflow: scroll;
  padding-top: 55px;
  height: 100vh;
  width: 100%;
`;

const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  width: fit-content;
  min-height: 100%;
  align-items: flex-start;
`;

const SearchArreaWrapper = styled.div`
  background-color: white;
  padding: 16px;
  display: flex;
  flex-direction: row;
  border-radius: 12px;
  align-items: flex-start;
  gap: 12px;
`;

const FilterAreaWrapper = styled.div`
  width: fit-content;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Block = styled.div`
  display: flex;
  flex-grow: 1;
  // 뒤에 100% 맞추려고 가라로 넣어두기
  height: fit-content;
  background-color: white;
  align-items: center;
  justify-content: flex-start;
  border-top-right-radius: 12px;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  padding: 16px;
  flex-direction: row;
  gap: 30px;
`;

const ListWrapper = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  overflow: hidden;
`;

const ScrollWrapper = styled.div`
  display: flex;
  width: 100%;
  overflow: scroll;
  flex-direction: column;
  gap: 12px;
`;

const ListCard = styled.div`
  width: 100%;
  background-color: red;
  height: 100px;
`;

const InfoArea = styled.div`
  display: flex;
  flex-grow: 1;
  width: 250px;
  height: 100%;
`;

const LectureInfoArea = styled.div`
  width: 380px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FriendPage: React.FC = () => {
  // 어떤 시간표인지 체크
  const [index, setIndex] = useState<number>(0);
  const [timeFilter, setTimeFilter] = useState<null | TimeBlock>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  const [hover, setHover] = useState<Lecture | null>(null);
  const [selected, setSelected] = useState<Lecture | null>(null);

  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    if (hover != null || selected != null) {
      setReviews(mockReviews);
    } else {
      setReviews([]);
    }
  }, [hover, selected]);

  // 이렇게 짜면 안되는 이유가 있을까? 일단 난 모르겠다
  useEffect(() => {
    function matchHeight() {
      if (leftRef.current && rightRef.current) {
        leftRef.current.style.height = `${rightRef.current.offsetHeight}px`;
      }
    }

    matchHeight();
    window.addEventListener('resize', matchHeight);
    return () => window.removeEventListener('resize', matchHeight);
  }, []);

  return (
    <PageWrapper>
      <SearchArreaWrapper ref={leftRef}>
        <FilterAreaWrapper>
          <SearchArea timeFilter={timeFilter} setTimeFilter={setTimeFilter} />
          <StyledDivider />
          <ListWrapper>
            <ScrollWrapper>
              <ListCard />
              <ListCard />
              <ListCard />
              <ListCard />
              <ListCard />
              <ListCard />
              <ListCard />
            </ScrollWrapper>
          </ListWrapper>
        </FilterAreaWrapper>
        <StyledDivider direction="column" />
        <LectureInfoArea>
          {hover != null || selected != null ? (
            <>
              {selected != null ? (
                <LectureInfoNested lecture={selected!} />
              ) : (
                <LectureInfoNested lecture={hover!} />
              )}
              <StyledDivider direction="row" />
              <ListWrapper>
                <ScrollWrapper>
                  {reviews.map((review, idx) => (
                    <ReviewTile key={idx} review={review} isDictionary={true} />
                  ))}
                </ScrollWrapper>
              </ListWrapper>
            </>
          ) : (
            <PlaceholderComponenet />
          )}
        </LectureInfoArea>
      </SearchArreaWrapper>
      <ContentsWrapper ref={rightRef}>
        <TabButtonRow rowLength={3} index={index} setIndex={setIndex} isTimetable={false} />
        <Block>
          <CustomTimeTableGrid
            lectureSummary={mockLectureSummaries}
            setTimeFilter={setTimeFilter}
            hover={hover}
            setHover={setHover}
            selected={selected}
            setSelected={setSelected}
          />
          <StyledDivider direction="column" />
          <InfoArea>아직 디자인이 확정이 안됐어용</InfoArea>
        </Block>
      </ContentsWrapper>
    </PageWrapper>
  );
};

export default FriendPage;
