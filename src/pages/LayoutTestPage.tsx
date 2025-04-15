import styled from 'styled-components';
import DividedLayout from '../common/daily-tf/DividedLayout';
import LectureSearchSubsection from '@/common/daily-tf/LectureSearchSubsection';
import { useState } from 'react';
import TimeBlock from '@/common/daily-tf/interface/Timeblock';
import DividedLayoutRight from '@/common/daily-tf/DividedLayoutRight';
import Lecture from '@/common/daily-tf/interface/Lecture';
import lectures from '@/dummy/lectures';

const ContentInnerRight = styled.div`
  width: 100px;
  height: 500px;
  background-color: pink;
`;

const ContentRight = styled.div`
  width: 200px;
`;

const LayoutTestPage: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState<TimeBlock | null>(null);
  const [hovered, setHovered] = useState<Lecture | null>(null);
  const [selected, setSelected] = useState<Lecture | null>(null);
  return (
    <DividedLayoutRight>
      <LectureSearchSubsection
        hovered={lectures[0]}
        selected={selected}
        timeFilter={timeFilter}
        setTimeFilter={setTimeFilter}
      />
      <ContentRight>
        <ContentInnerRight></ContentInnerRight>
      </ContentRight>
    </DividedLayoutRight>
  );
};

export default LayoutTestPage;
