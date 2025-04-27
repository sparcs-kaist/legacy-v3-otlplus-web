import renderGrid from '@/common/daily-tf/utils/renderGrid';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import FlexWrapper from './FlexWrapper';
import renderLectureTile from './utils/renderLectureTile';
import { LectureSummary } from './interface/Timetable';
import { checkAnyOver24 } from './utils/checkAnyOver24';
import getColumnIndex from './utils/getColumnIndex';
import renderTargetArea from './utils/renderTargetArea';
import TimeBlock from './interface/Timeblock';
import Lecture from './interface/Lecture';

interface GridProps {
  cellWidth?: number;
  lectureSummary: LectureSummary[];
  setTimeFilter: React.Dispatch<React.SetStateAction<TimeBlock | null>>;
  hover: Lecture | null;
  setHover: React.Dispatch<React.SetStateAction<Lecture | null>>;
  selected: Lecture | null;
  setSelected: React.Dispatch<React.SetStateAction<Lecture | null>>;
}

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  align-items: center;
  height: fit-content;
`;

const TimeWrapper = styled.div<{ cellHeight: number }>`
  padding-top: 15px;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  height: 100%;
  justify-content: space-evenly;
  gap: ${({ cellHeight }) => `${cellHeight * 2 - 11}px`};
  font-size: 8px;
  line-height: 11px;
`;

const DateWrapper = styled.div<{ width: number }>`
  width: ${(props) => `${props.width}px`};
  align-items: center;
  font-size: 12px;
  line-height: 15px;
  padding-bottom: 5px;
  text-align: center;
`;

const CustomTimeTableGrid: React.FC<GridProps> = ({
  cellWidth = 120,
  lectureSummary,
  setTimeFilter,
  hover,
  setHover,
  selected,
  setSelected,
}) => {
  const colPadding = 5;
  const m = 5;
  const begin = 8;
  const gridRef = useRef<HTMLDivElement>(null);
  const dateHeader = ['월요일', '화요일', '수요일', '목요일', '금요일'];
  const isAnyOver24 = checkAnyOver24(lectureSummary);
  const n = isAnyOver24 ? 38 : 32;
  const end = isAnyOver24 ? 27 : 24;
  const [cellHeight, setCellHeight] = useState(isAnyOver24 ? 22 : 25);

  // 전체 셀 크기를 반응형으로 조정하는 부분
  useEffect(() => {
    const handleResize = () => {
      const fullHeight = window.innerHeight - 55 - 20 - 32 - 35.5 - 30; // 대충 스크롤이 안 넘어가게 맞춰준 거...
      const cellHeightUnscroll = isAnyOver24 ? fullHeight / 38 : fullHeight / 32;
      setCellHeight(
        isAnyOver24 ? Math.max(cellHeightUnscroll, 22) : Math.max(cellHeightUnscroll, 25),
      );
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [dragging, setDragging] = useState<boolean>(false);
  const [startRow, setStartRow] = useState<number | null>(null);
  const [lastRow, setLastRow] = useState<number | null>(null);
  const [col, setCol] = useState<number | null>(null);
  const [holding, setHolding] = useState<boolean>(false);

  const [draggingArea, setDraggingArea] = useState<Map<number, boolean[]>>(
    new Map(Array.from({ length: m }, (_, rowIndex) => [rowIndex, Array(n).fill(null)])),
  );

  const handleMouseDown = (event: React.MouseEvent) => {
    if (gridRef.current && hover == null && selected == null) {
      const gridRect = gridRef.current.getBoundingClientRect();
      const mouseX = event.clientX - gridRect.left;
      const mouseY = event.clientY - gridRect.top;
      const row = Math.floor(mouseY / cellHeight);
      const col = getColumnIndex(mouseX, m, [], 0, cellWidth, colPadding, 0);
      if (row >= 0 && row < n && col >= 0 && col < m) {
        setDragging(true);
        setStartRow(row);
        setLastRow(row);
        setCol(col);
        setSelected(null);
      }
    }
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (dragging && gridRef.current) {
      const gridRect = gridRef.current.getBoundingClientRect();
      const mouseY = event.clientY - gridRect.top;
      const row = Math.floor(mouseY / cellHeight);
      if (row >= 0 && row < n && col! >= 0 && col! < m) {
        if (row !== lastRow) {
          setLastRow(row);
        }
      }
    }
  };

  const handleMouseUp = () => {
    setDraggingArea(
      new Map(Array.from({ length: m }, (_, rowIndex) => [rowIndex, Array(n).fill(null)])),
    );
    if (startRow != null && lastRow != null && col != null) {
      const beginRow = Math.min(startRow, lastRow);
      const endRow = Math.max(startRow, lastRow);
      // 어차피 startTime, endTime은 없앨 예정!
      const timeBlock: TimeBlock = {
        day: col + 1,
        timeIndex: beginRow,
        duration: endRow - beginRow + 1,
        startTime: '',
        endTime: '',
      };
      setTimeFilter(timeBlock);
    }
    setStartRow(null);
    setLastRow(null);
    setDragging(false);
    setHolding(false);
  };

  const getArea = (startRow: number, endRow: number, col: number): Map<number, boolean[]> => {
    const result = new Map(
      Array.from({ length: m }, (_, rowIndex) => [rowIndex, Array(n).fill(null)]),
    );
    for (let j = startRow; j < endRow + 1; j++) {
      result.get(col)![j] = true;
    }

    return result;
  };

  useLayoutEffect(() => {
    if (gridRef.current && dragging && !holding) {
      const _startRow = Math.min(startRow!, lastRow!);
      const _endRow = Math.max(startRow!, lastRow!);
      const targetArea = getArea(_startRow, _endRow, col!);
      setDraggingArea(targetArea);
    }
  }, [lastRow, startRow]);

  return (
    <SectionWrapper>
      <TimeWrapper cellHeight={cellHeight}>
        {Array.from({ length: end - begin + 1 }, (_, index) => index + begin).map((number) => (
          <div key={number}>{number % 12 || 12}</div>
        ))}
      </TimeWrapper>
      <FlexWrapper direction="column" gap={0}>
        <FlexWrapper direction="row" gap={5}>
          {dateHeader.map(
            (date, index) =>
              date !== 'none' && (
                <DateWrapper key={index} width={date === '' ? 10 : cellWidth}>
                  {date}
                </DateWrapper>
              ),
          )}
        </FlexWrapper>
        <div
          ref={gridRef}
          style={{
            display: 'inline-block',
            position: 'relative',
            userSelect: 'none',
            cursor: 'pointer',
          }}
          onClick={() => {
            setSelected(null);
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}>
          {renderGrid(n, m, cellWidth, cellHeight, colPadding, [], 10, 0)}
          {renderTargetArea(
            true,
            draggingArea,
            'rgba(229, 76, 101, 0.5)',
            cellHeight,
            cellWidth,
            2,
            colPadding,
            [],
            0,
            0,
          )}
          {renderLectureTile(
            lectureSummary,
            cellWidth,
            cellHeight,
            colPadding,
            selected,
            setSelected,
            hover,
            setHover,
            holding,
            setHolding,
            dragging,
          )}
        </div>
      </FlexWrapper>
    </SectionWrapper>
  );
};

export default CustomTimeTableGrid;
