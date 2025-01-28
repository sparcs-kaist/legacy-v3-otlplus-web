import { JSX } from 'react';
import { DisabledAreaType } from './disabledAreaType';
import Typography from '../Typography';

const calcLeft = (
  index: number,
  placeholderIndex: number[],
  cellWidth: number,
  placeholderWidth: number,
  pageStart: number,
) => {
  let res: number = 0;

  for (let i = 0; i < index; i++) {
    if (placeholderIndex.includes(i + pageStart)) {
      res += placeholderWidth;
    } else {
      res += cellWidth;
    }
  }

  return res;
};

// 표시할 영역에 대한 정보를 전달 받아 디자인에 맞게 표시
const renderDisabledArea = (
  disabledArea: Map<number, DisabledAreaType[]>,
  cellHeight: number,
  cellWidth: number,
  rowPadding: number,
  colPadding: number,
  placeholderIndex: number[],
  placeholderWidth: number,
  pageStart: number,
) => {
  const rectangles: JSX.Element[] = [];
  disabledArea.forEach((value, key) => {
    if (!placeholderIndex.includes(key)) {
      value.map((val, index) => {
        const startIndex = val.startIndex;
        const endIndex = val.endIndex;

        const top = startIndex * cellHeight + rowPadding;
        const left =
          calcLeft(key, placeholderIndex, cellWidth, placeholderWidth, pageStart) +
          colPadding * key;
        const height = (endIndex - startIndex + 1) * cellHeight - rowPadding * 2;
        const width = cellWidth;
        rectangles.push(
          <div
            key={`${key}-${startIndex}`}
            style={{
              position: 'absolute',
              left: left,
              top: top,
              width: width,
              height: height,
              backgroundColor: 'rgba(214, 214, 214, 1)',
              pointerEvents: 'none',
              borderRadius: '2px',
              padding: '4px 6px',
            }}>
            <Typography type="Small">{val.name}</Typography>
          </div>,
        );
      });
    }
  });

  return rectangles;
};

export default renderDisabledArea;
