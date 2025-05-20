import styled from 'styled-components';
import SearchArea from '../search/SearchArea';
import TimeBlock from '../interface/Timeblock';
import Divider from '../Divider';
import Button from '../Button';
import Icon from '../Icon';
import FlexWrapper from '../FlexWrapper';
import Typography from '../Typography';
import { useEffect, useState } from 'react';
import LectureGroupBlock from '@/common/daily-tf/timetable/lecture/LectureGroupBlock';
import Lecture from '@/common/daily-tf/interface/Lecture';
import { mockLectureSearchResult } from '@/common/daily-tf/mock/mockLectureSearchResult';
import { SearchLecture } from '@/common/daily-tf/interface/SearchLecture';

interface LectureSearchAreaProps {
  timeFilter: null | TimeBlock;
  setTimeFilter: React.Dispatch<React.SetStateAction<TimeBlock | null>>;
  hoveredLecture: null | Lecture;
  setHoveredLecture: React.Dispatch<React.SetStateAction<Lecture | null>>;
  selectedLecture: null | Lecture;
  setSelectedLecture: React.Dispatch<React.SetStateAction<Lecture | null>>;
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

const LectureSearchArea: React.FC<LectureSearchAreaProps> = ({
  timeFilter,
  setTimeFilter,
  hoveredLecture,
  setHoveredLecture,
  selectedLecture,
  setSelectedLecture,
}) => {
  const [isFavorite, setIsfavorite] = useState<boolean>(false);
  const handleFavoriteOnclick = () => {
    setIsfavorite(!isFavorite);
  };
  const [wishList, setWishList] = useState<SearchLecture[]>([]);

  // course id를 기준으로 강의를 분류하는 로직
  const [lectureSearchResult, setLectureSearchResult] = useState<{
    [code: string]: SearchLecture[];
  }>({});
  useEffect(() => {
    const fetchLectureSearchResult = mockLectureSearchResult;
    const classifiedLectures: { [code: string]: SearchLecture[] } = {};
    fetchLectureSearchResult.forEach((lecture) => {
      const code = lecture.code;
      if (!classifiedLectures[code]) {
        classifiedLectures[code] = [];
      }
      classifiedLectures[code].push(lecture);
    });
    setLectureSearchResult(classifiedLectures);
  }, []);

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
      <ListWrapper onClick={() => setSelectedLecture(null)}>
        {Object.keys(lectureSearchResult).map((code) => (
          <LectureGroupBlock
            key={code}
            lectures={lectureSearchResult[code]}
            completedCourse={false}
            wishList={wishList}
            setWishList={setWishList}
            timeTableLectures={[]}
            hoveredLecture={hoveredLecture}
            setHoveredLecture={setHoveredLecture}
            selectedLecture={selectedLecture}
            setSelectedLecture={setSelectedLecture}
          />
        ))}
      </ListWrapper>
    </Wrapper>
  );
};

export default LectureSearchArea;
