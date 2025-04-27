import styled from 'styled-components';
import TimeBlock from './interface/Timeblock';
import Divider from './Divider';
import LectureSearchArea from './timetable/LecutureSearchArea';
import LectureInfoArea from './timetable/LectureInfoArea';
import Lecture from './interface/Lecture';

interface LectureInfoAreaProps {
  hovered: null | Lecture;
  selected: null | Lecture;
  timeFilter: null | TimeBlock;
  setTimeFilter: React.Dispatch<React.SetStateAction<TimeBlock | null>>;
}

const AreaWrapper = styled.div`
  display: flex;
  flex-direction: row;
  background-color: white;
  height: 100%;
  border-radius: 12px;
  padding: 16px;
  gap: 12px;
`;

const LectureSearchSubsection: React.FC<LectureInfoAreaProps> = ({
  hovered,
  selected,
  timeFilter,
  setTimeFilter,
}) => {
  return (
    <AreaWrapper>
      <LectureSearchArea timeFilter={timeFilter} setTimeFilter={setTimeFilter} />
      <Divider />
      <LectureInfoArea lecture={selected ?? hovered ?? null}></LectureInfoArea>
    </AreaWrapper>
  );
};

export default LectureSearchSubsection;
