import { JSX, useRef } from 'react';
import { LectureSummary } from '../interface/Timetable';

import { WeekdayEnum } from '../enum/weekdayEnum';
import LectureTile from '../LectureTile';
import TimeBlock from '../interface/Timeblock';
import Lecture from '../interface/Lecture';
import lectures from '@/dummy/lectures';

const renderLectureTile = (
  lectureSummary: LectureSummary[],
  cellWidth: number,
  cellHeight: number,
  colPadding: number,
  selected: Lecture | null,
  setSelected: React.Dispatch<React.SetStateAction<Lecture | null>>,
  hover: Lecture | null,
  setHover: React.Dispatch<React.SetStateAction<Lecture | null>>,
  holding: boolean,
  setHolding: React.Dispatch<React.SetStateAction<boolean>>,
  dragging: boolean,
) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const rectangles: JSX.Element[] = [];

  const findItemById = (arr: Lecture[], id: number): Lecture | undefined => {
    return arr.find((item) => item.id === id);
  };

  for (let i = 0; i < lectureSummary.length; i++) {
    const lecture: LectureSummary = lectureSummary[i];
    const course: Lecture | undefined = findItemById(lectures, lecture.course_id);
    const timeBlocks: TimeBlock[] = lecture.timeBlocks;
    const isSelected = selected == course;
    const isHovered = hover == course && selected == null;

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
            if (course == selected) {
              setSelected(null);
            } else {
              if (course != undefined) {
                setSelected(course);
              }
            }
          }}
          onMouseEnter={() => {
            if (!dragging && course != undefined) {
              setHover(course);
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
