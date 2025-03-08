import renderGrid from '@/common/daily-tf/utils/renderGrid';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import FlexWrapper from './FlexWrapper';
import renderLectureTile from './utils/renderLectureTile';
import { LectureSummary } from './interface/timetableType';

interface GridProps {
  cellWidth?: number;
  cellHeight?: number;
  lectureSummary: LectureSummary[];
}

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  align-items: center;
`;

const TimeWrapper = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  gap: 37px;
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
  cellHeight = 24,
  cellWidth = 120,
  lectureSummary,
}) => {
  const colPadding = 5;
  const n = 38;
  const m = 7;
  const begin = 8;
  const end = 27;
  const gridRef = useRef<HTMLDivElement>(null);
  const dateHeader = ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'];
  const [selected, setSelected] = useState<LectureSummary | null>(null);
  const [hover, setHover] = useState<LectureSummary | null>(null);

  return (
    <SectionWrapper>
      <TimeWrapper>
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
          }}>
          {renderGrid(n, m, cellWidth, cellHeight, colPadding, [], 10, 0)}
          {renderLectureTile(
            lectureSummary,
            cellWidth,
            cellHeight,
            colPadding,
            selected,
            setSelected,
            hover,
            setHover,
          )}
        </div>
      </FlexWrapper>
    </SectionWrapper>
  );
};

export default CustomTimeTableGrid;
