/* eslint-disable no-console */
import React, { JSX, useEffect, useRef, useState } from 'react';

interface GridProps {
  n?: number; // 세로 크기
  m?: number; // 가로 크기
  cellSize?: number;
}

const fillDisabledMock = (m: number, n: number) => {
  const disabledArea = new Map(
    Array.from({ length: m }, (_, rowIndex) => [
      rowIndex,
      Array.from({ length: n }, (_, index) => {
        if ((rowIndex * n + index) % 3 == 0 || (rowIndex * n + index) % 5 == 2) {
          return true;
        } else {
          return false;
        }
      }),
    ]),
  );

  return disabledArea;
};
const randomDisabledArea = fillDisabledMock(4, 5);

const ExamplePage: React.FC<GridProps> = ({ n = 5, m = 4, cellSize = 50 }) => {
  const rowPadding = 5;
  const colPadding = 10;
  const gridRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState<boolean>(false);
  const [lastGridId, setLastGridId] = useState<string | null>(null);
  const [startGridId, setStartGridId] = useState<string | null>(null);
  const [rectangles, setRectangles] = useState<
    { left: number; top: number; width: number; height: number }[]
  >([]);

  const [index, setIndex] = useState<boolean>(true);

  /* TODO : API로 disabledArea 받아오기 */

  const [selectedArea, setSelectedArea] = useState<Map<number, boolean[]>>(
    new Map(
      Array.from({ length: m }, (_, rowIndex) => [
        rowIndex,
        Array(n).fill(false), // 각 행(row)마다 m개의 `false`로 초기화된 배열
      ]),
    ),
  );

  const [draggingArea, setDraggingArea] = useState<Map<number, boolean[]>>(
    new Map(
      Array.from({ length: m }, (_, rowIndex) => [
        rowIndex,
        Array(n).fill(null), // 각 행(row)마다 m개의 `false`로 초기화된 배열
      ]),
    ),
  );

  const getArea = (
    startRow: number,
    startCol: number,
    endRow: number,
    endCol: number,
    index: boolean,
  ): Map<number, boolean[]> => {
    const result = new Map(
      Array.from({ length: m }, (_, rowIndex) => [
        rowIndex,
        Array(n).fill(null), // 각 행(row)마다 m개의 `false`로 초기화된 배열
      ]),
    );
    for (let i = startCol; i < endCol + 1; i++) {
      for (let j = startRow; j < endRow + 1; j++) {
        if (randomDisabledArea.get(i)![j] == false) {
          result.get(i)![j] = !index;
        } else {
          result.get(i)![j] = null;
        }
      }
    }

    return result;
  };

  const compareArea = (
    target: Map<number, boolean[]>,
    newValue: Map<number, boolean[]>,
  ): Map<number, boolean[]> => {
    console.log('target', target, 'newValue', newValue);
    const result = new Map(
      Array.from({ length: m }, (_, rowIndex) => [rowIndex, Array(n).fill(false)]),
    );

    target.forEach((value1, key) => {
      // 두 개의 map에서 같은 key에 대해 배열을 비교
      const value2 = newValue.get(key);
      const disabled = randomDisabledArea.get(key);
      for (let i = 0; i < n; i++) {
        if (disabled![i] == true) {
          result.get(key)![i] = null;
        } else {
          if (value2![i] == null) {
            result.get(key)![i] = value1[i];
          } else {
            result.get(key)![i] = value2![i];
          }
        }
      }
    });

    console.log('res', result);

    return result;
  };

  const [rectanglePosition, setRectanglePosition] = useState<{
    left: number;
    top: number;
    width: number;
    height: number;
  } | null>(null);

  const handleMouseDown = (event: React.MouseEvent) => {
    if (gridRef.current) {
      const gridRect = gridRef.current.getBoundingClientRect();
      const mouseX = event.clientX - gridRect.left;
      const mouseY = event.clientY - gridRect.top;
      const row = Math.floor(mouseY / cellSize);
      const col = Math.floor(mouseX / (cellSize + colPadding));
      if (row >= 0 && row < n && col >= 0 && col < m) {
        const gridId = `${row * m + col}`;
        if (randomDisabledArea.get(col)![row] == false) {
          setDragging(true);
          setStartGridId(gridId);
          setLastGridId(gridId);
          setRectanglePosition({
            left: col * (cellSize + 2) + 2,
            top: row * (cellSize + 2) + 2,
            width: cellSize,
            height: cellSize,
          });
        }
      }
    }
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (dragging && gridRef.current) {
      const gridRect = gridRef.current.getBoundingClientRect();
      const mouseX = event.clientX - gridRect.left;
      const mouseY = event.clientY - gridRect.top;
      const row = Math.floor(mouseY / cellSize);
      const col = Math.floor(mouseX / (cellSize + colPadding));
      if (row >= 0 && row < n && col >= 0 && col < m) {
        const gridId = `${row * m + col}`;
        console.log(gridId);
        if (gridId !== lastGridId) {
          setLastGridId(gridId);
        }
      }
    }
  };

  const renderDraggingArea = (idx: boolean) => {
    console.log('called!');
    const rectangles: JSX.Element[] = [];
    const backgroundColor = idx ? 'rgba(255, 0, 0, 0.5)' : 'rgba(255, 255, 0, 0.5)';

    draggingArea.forEach((value, key) => {
      let startIndex: number | null = null;

      // 행 내에서 연속된 true 구간을 찾아 직사각형을 생성
      value.forEach((val, index) => {
        if (val == idx) {
          // true인 구간 시작
          if (startIndex === null) {
            startIndex = index;
          }
        } else {
          // false인 구간에서 true 구간이 끝났다면 직사각형을 추가
          if (startIndex !== null) {
            const top = startIndex * cellSize + rowPadding;
            const left = key * cellSize + colPadding * key;
            console.log(index, startIndex);
            const height = (index - startIndex) * cellSize - rowPadding * 2;
            const width = cellSize;

            rectangles.push(
              <div
                key={`${key}-${startIndex}`}
                style={{
                  position: 'absolute',
                  left: left,
                  top: top,
                  width: width,
                  height: height,
                  backgroundColor: backgroundColor, // 빨간색 직사각형
                  pointerEvents: 'none',
                  borderRadius: '5px',
                }}
              />,
            );
            startIndex = null; // 직사각형이 추가되었으면, 새로운 구간을 찾기 위해 startIndex 초기화
          }
        }
      });

      // 마지막에 true 구간이 끝난 경우 (행의 끝까지 true인 경우)
      if (startIndex !== null) {
        const top = startIndex * cellSize + rowPadding;
        const left = key * cellSize + colPadding * key;
        const height = (value.length - startIndex) * cellSize - rowPadding * 2;
        const width = cellSize;

        rectangles.push(
          <div
            key={`${key}-${startIndex}`}
            style={{
              position: 'absolute',
              left: left,
              top: top,
              width: width,
              height: height,
              backgroundColor: backgroundColor, // 빨간색 직사각형
              pointerEvents: 'none',
              borderRadius: '5px',
            }}
          />,
        );
      }
    });

    return rectangles;
  };

  const renderSelectedArea = () => {
    console.log('called!');
    const rectangles: JSX.Element[] = [];

    selectedArea.forEach((value, key) => {
      let startIndex: number | null = null;
      // 행 내에서 연속된 true 구간을 찾아 직사각형을 생성
      value.forEach((val, index) => {
        if (val) {
          // true인 구간 시작
          if (startIndex === null) {
            startIndex = index;
          }
        } else {
          // false인 구간에서 true 구간이 끝났다면 직사각형을 추가
          if (startIndex !== null) {
            const top = startIndex * cellSize + rowPadding;
            const left = key * cellSize + colPadding * key;
            console.log(index, startIndex);
            const height = (index - startIndex) * cellSize - rowPadding * 2;
            const width = cellSize;

            rectangles.push(
              <div
                key={`${key}-${startIndex}`}
                style={{
                  position: 'absolute',
                  left: left,
                  top: top,
                  width: width,
                  height: height,
                  backgroundColor: 'rgba(0, 0, 255, 0.5)', // 빨간색 직사각형
                  pointerEvents: 'none',
                  borderRadius: '5px',
                }}
              />,
            );
            startIndex = null; // 직사각형이 추가되었으면, 새로운 구간을 찾기 위해 startIndex 초기화
          }
        }
      });

      // 마지막에 true 구간이 끝난 경우 (행의 끝까지 true인 경우)
      if (startIndex !== null) {
        const top = startIndex * cellSize + rowPadding;
        const left = key * cellSize + colPadding * key;
        const height = (value.length - startIndex) * cellSize - rowPadding * 2;
        const width = cellSize;

        rectangles.push(
          <div
            key={`${key}-${startIndex}`}
            style={{
              position: 'absolute',
              left: left,
              top: top,
              width: width,
              height: height,
              backgroundColor: 'rgba(0, 0, 255, 0.5)', // 빨간색 직사각형
              pointerEvents: 'none',
              borderRadius: '5px',
            }}
          />,
        );
      }
    });

    return rectangles;
  };

  const renderDisabledArea = () => {
    console.log('called!');
    const rectangles: JSX.Element[] = [];

    randomDisabledArea.forEach((value, key) => {
      let startIndex: number | null = null;
      // 행 내에서 연속된 true 구간을 찾아 직사각형을 생성
      value.forEach((val, index) => {
        if (val) {
          // true인 구간 시작
          if (startIndex === null) {
            startIndex = index;
          }
        } else {
          // false인 구간에서 true 구간이 끝났다면 직사각형을 추가
          if (startIndex !== null) {
            const top = startIndex * cellSize + rowPadding;
            const left = key * cellSize + colPadding * key;
            console.log(index, startIndex);
            const height = (index - startIndex) * cellSize - 2 * rowPadding;
            const width = cellSize;

            rectangles.push(
              <div
                key={`${key}-${startIndex}`}
                style={{
                  position: 'absolute',
                  left: left,
                  top: top,
                  width: width,
                  height: height,
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  borderRadius: '5px',
                  pointerEvents: 'none',
                }}
              />,
            );
            startIndex = null; // 직사각형이 추가되었으면, 새로운 구간을 찾기 위해 startIndex 초기화
          }
        }
      });

      // 마지막에 true 구간이 끝난 경우 (행의 끝까지 true인 경우)
      if (startIndex !== null) {
        const top = startIndex * cellSize + rowPadding;
        const left = key * cellSize + colPadding * key;
        console.log(index, startIndex);
        const height = (value.length - startIndex) * cellSize - rowPadding * 2;
        const width = cellSize;

        rectangles.push(
          <div
            key={`${key}-${startIndex}`}
            style={{
              position: 'absolute',
              left: left,
              top: top,
              width: width,
              height: height,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              borderRadius: '5px',
              pointerEvents: 'none',
            }}
          />,
        );
      }
    });

    return rectangles;
  };

  useEffect(() => {
    if (startGridId && lastGridId) {
      console.log(`startGrid : ${startGridId}`);
      console.log(`endGrid : ${lastGridId}`);
      if (gridRef.current) {
        // 좌표 찾기
        const _startId = parseInt(startGridId, 10);
        const _endId = parseInt(lastGridId, 10);
        const startId = Math.min(_startId, _endId);
        const endId = Math.max(_startId, _endId);
        const startRow = Math.floor(startId / m);
        const startCol = startId % m;
        const endRow = Math.floor(endId / m);
        const endCol = endId % m;
        const index = selectedArea.get(startCol)?.[startRow] || false;

        // 여기부터 보이는 영역 고르는 부분
        const targetArea = getArea(startRow, startCol, endRow, endCol, index);
        setIndex(!index);
        //const newArea = compareArea(draggingArea, targetArea);
        //console.log('newArea :', newArea);
        setDraggingArea(targetArea);
      }
    }
  }, [lastGridId, startGridId]);

  const handleMouseUp = () => {
    /*if (rectanglePosition) {
      const left = rectanglePosition.left;
      const top = rectanglePosition.top;
      const width = rectanglePosition.width;
      const height = rectanglePosition.height;
      setRectangles((prev) => [...prev, { left, top, width, height }]);
    }*/
    console.log('selectedArea', selectedArea);
    const updatedArea = compareArea(selectedArea, draggingArea);
    console.log('updateArea', updatedArea);
    setSelectedArea(updatedArea);
    //setRectanglePosition(null);
    setDraggingArea(
      new Map(
        Array.from({ length: m }, (_, rowIndex) => [
          rowIndex,
          Array(n).fill(null), // 각 행(row)마다 m개의 `null`로 초기화된 배열
        ]),
      ),
    );
    setStartGridId(null);
    setLastGridId(null);
    setDragging(false);
  };

  useEffect(() => {
    console.log('Updated selectedArea:', selectedArea);
  }, [selectedArea]);

  useEffect(() => {
    console.log('Updated draggingArea:', draggingArea, startGridId, lastGridId);
  }, [draggingArea]);

  const renderGrid = () => {
    const grid: JSX.Element[] = [];
    for (let i = 0; i < n; i++) {
      const row: JSX.Element[] = [];
      for (let j = 0; j < m; j++) {
        const uniqueId = `${i * m + j}`;
        const disabled = randomDisabledArea.get(j)![i];
        const newRec = (
          <div
            key={uniqueId}
            id={uniqueId}
            style={{
              width: `${cellSize}px`,
              height: `${cellSize}px`,
              display: 'inline-block',
              textAlign: 'center',
              lineHeight: `${cellSize}px`,
              cursor: disabled ? 'none' : 'pointer',
              borderTop: `${i % 2 == 0 ? '1px solid grey' : '1px dashed grey'}`,
              borderBottom: `${i == n - 1 ? '1px solid grey' : '0px'}`,
              marginRight: `${j < m - 1 ? `${colPadding}px` : '0px'}`,
            }}
          />
        );
        row.push(newRec);
      }
      grid.push(
        <div key={i} style={{ display: 'flex' }}>
          {row}
        </div>,
      );
    }
    return grid;
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        backgroundColor: '#f0f0f0',
      }}>
      <div
        ref={gridRef}
        style={{
          display: 'inline-block',
          position: 'relative',
          userSelect: 'none',
          cursor: 'pointer',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}>
        {renderGrid()}
        {renderDisabledArea()}
        {renderDraggingArea(index)}
        {renderSelectedArea()}
        {/*rectanglePosition && (
          <div
            style={{
              position: 'absolute',
              left: rectanglePosition.left,
              top: rectanglePosition.top,
              width: rectanglePosition.width,
              height: rectanglePosition.height,
              backgroundColor: 'rgba(255, 0, 0, 0.5)',
              border: '2px solid blue',
              pointerEvents: 'none',
            }}
          />
        )*/}
        {/* rectangles.map((rect, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              left: rect.left,
              top: rect.top,
              width: rect.width,
              height: rect.height,
              backgroundColor: 'rgba(0, 0, 255, 0.5)',
              border: '2px solid blue',
              pointerEvents: 'none',
            }}
          />
        )) */}
      </div>
    </div>
  );
};

export default ExamplePage;
