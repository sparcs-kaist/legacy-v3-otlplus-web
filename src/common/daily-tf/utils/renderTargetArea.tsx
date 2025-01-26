import { JSX } from 'react';

// 표시할 영역에 대한 정보를 전달 받아 디자인에 맞게 표시
const renderTargetArea = (
  idx: boolean = true,
  targetArea: Map<number, boolean[]>,
  color: string,
  cellHeight: number,
  cellWidth: number,
  rowPadding: number,
  colPadding: number,
) => {
  const rectangles: JSX.Element[] = [];

  targetArea.forEach((value, key) => {
    let startIndex: number | null = null;
    value.forEach((val, index) => {
      if (val == idx) {
        // true인 구간 시작
        if (startIndex === null) {
          startIndex = index;
        }
      } else {
        if (startIndex !== null) {
          const top = startIndex * cellHeight + rowPadding;
          const left = key * cellWidth + colPadding * key;
          const height = (index - startIndex) * cellHeight - rowPadding * 2;
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
                backgroundColor: color,
                pointerEvents: 'none',
                borderRadius: '2px',
                zIndex: idx ? 0 : 1,
              }}
            />,
          );
          startIndex = null;
        }
      }
    });

    if (startIndex !== null) {
      const top = startIndex * cellHeight + rowPadding;
      const left = key * cellWidth + colPadding * key;
      const height = (value.length - startIndex) * cellHeight - rowPadding * 2;
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
            zIndex: idx ? 0 : 1,
            backgroundColor: color,
            pointerEvents: 'none',
            borderRadius: '2px',
          }}
        />,
      );
    }
  });

  return rectangles;
};

export default renderTargetArea;
