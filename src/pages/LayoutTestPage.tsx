import styled from 'styled-components';
import LectureSearchSubsection from '@/common/daily-tf/LectureSearchSubsection';
import { useState } from 'react';
import TimeBlock from '@/common/daily-tf/interface/Timeblock';
import DividedLayoutRight from '@/common/daily-tf/DividedLayoutRight';
import Lecture from '@/common/daily-tf/interface/Lecture';
import lectures from '@/dummy/lectures';
import TabButtonRow from '@/common/daily-tf/TabButtonRow';
import Button from '@/common/daily-tf/Button';
import CustomTimeTableGrid from '@/common/daily-tf/CustomTimeTableGrid';
import mockLectureSummaries from '@/common/daily-tf/mock/mockLectureSummary';

const ContentRight = styled.div`
  width: 990px;
  min-height: 100%;
  display: flex;
  flex-direction: column;
`;

const RightTopWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const TimetableSubsectionWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  height: fit-content;
  background-color: white;
  align-items: flex-start;
  justify-content: flex-start;
  border-top-right-radius: 12px;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  padding: 16px;
  flex-direction: row;
  gap: 30px;
`;

const LayoutTestPage: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState<TimeBlock | null>(null);
  const [hovered, setHovered] = useState<Lecture | null>(null);
  const [selected, setSelected] = useState<Lecture | null>(null);
  // 이후에 timetable 개수도 세야하는데.. 이거는 API 구조 보고 결정하기로
  const [timetableID, setTimetableID] = useState<number>(0);

  return (
    <DividedLayoutRight>
      <LectureSearchSubsection
        hovered={hovered}
        selected={selected}
        timeFilter={timeFilter}
        setTimeFilter={setTimeFilter}
      />
      <ContentRight>
        <RightTopWrapper>
          <TabButtonRow
            rowLength={3}
            index={timetableID}
            setIndex={setTimetableID}
            isTimetable={false}
          />
          <Button type="default" $paddingLeft={7}>
            placeholder
          </Button>
        </RightTopWrapper>
        <TimetableSubsectionWrapper>
          <CustomTimeTableGrid
            lectureSummary={mockLectureSummaries}
            setTimeFilter={setTimeFilter}
            hover={hovered}
            setHover={setHovered}
            selected={selected}
            setSelected={setSelected}
          />
        </TimetableSubsectionWrapper>
      </ContentRight>
    </DividedLayoutRight>
  );
};

export default LayoutTestPage;
