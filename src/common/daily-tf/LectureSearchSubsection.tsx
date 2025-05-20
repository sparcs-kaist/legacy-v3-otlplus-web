import styled from 'styled-components';
import TimeBlock from './interface/Timeblock';
import Divider from './Divider';
import LectureSearchArea from './timetable/LecutureSearchArea';
import LectureInfoArea from './timetable/LectureInfoArea';
import Lecture from './interface/Lecture';

interface LectureInfoAreaProps {
  hovered: null | Lecture;
  setHovered: React.Dispatch<React.SetStateAction<Lecture | null>>;
  selected: null | Lecture;
  setSelected: React.Dispatch<React.SetStateAction<Lecture | null>>;
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
  setHovered,
  selected,
  setSelected,
  timeFilter,
  setTimeFilter,
}) => {
  return (
    <AreaWrapper>
      <LectureSearchArea
        timeFilter={timeFilter}
        setTimeFilter={setTimeFilter}
        hoveredLecture={hovered}
        setHoveredLecture={setHovered}
        selectedLecture={selected}
        setSelectedLecture={setSelected}
      />
      <Divider />
      <LectureInfoArea lecture={selected ?? hovered ?? null}></LectureInfoArea>
    </AreaWrapper>
  );
};

export default LectureSearchSubsection;
