import { JSX, useRef } from 'react';
import { LectureSummary } from '../interface/timetableType';
import { TimeBlock } from '../interface/timeBlockType';
import { WeekdayEnum } from '../enum/weekdayEnum';
import LectureTile from '../LectureTile';

const renderLectureTile = (
  lectureSummary: LectureSummary[],
  cellWidth: number,
  cellHeight: number,
  colPadding: number,
  selected: LectureSummary | null,
  setSelected: React.Dispatch<React.SetStateAction<LectureSummary | null>>,
  hover: LectureSummary | null,
  setHover: React.Dispatch<React.SetStateAction<LectureSummary | null>>,
  holding: boolean,
  setHolding: React.Dispatch<React.SetStateAction<boolean>>,
  dragging: boolean,
) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const rectangles: JSX.Element[] = [];

  for (let i = 0; i < lectureSummary.length; i++) {
    const lecture: LectureSummary = lectureSummary[i];
    const timeBlocks: TimeBlock[] = lecture.timeBlocks;
    const isSelected = selected == lecture;
    const isHovered = hover == lecture && selected == null;

    for (let j = 0; j < timeBlocks.length; j++) {
      const timeBlock = timeBlocks[j];
      const weekDay = (timeBlock.day as unknown as WeekdayEnum) - 1;
      const left = weekDay * (cellWidth + colPadding);
      const startIndex = timeBlock.timeIndex;
      const top = startIndex * cellHeight;

      rectangles.push(
        <div
          ref={gridRef}
          style={{
            position: 'absolute',
            left: left,
            top: top,
          }}
          key={`${i}-${j}`}
          onClick={(event: React.MouseEvent) => {
            event.stopPropagation();
            setSelected(lecture);
          }}
          onMouseEnter={() => {
            if (!dragging) {
              setHover(lecture);
            }
            setHolding(true);
          }}
          onMouseLeave={() => {
            setHover(null);
          }}>
          <LectureTile
            lecture={lecture}
            timeBlock={timeBlock}
            cellWidth={cellWidth}
            isSelected={isSelected}
            isHovered={isHovered}
            cellHeight={cellHeight}
          />
        </div>,
      );
    }
  }

  return rectangles;
};

export default renderLectureTile;
