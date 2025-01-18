/* eslint-disable no-console */
import React, { JSX, useEffect, useRef, useState } from 'react';

interface GridProps {
  n: number; // 세로 크기
  m: number; // 가로 크기
  cellSize: number;
}

const ExamplePage: React.FC<GridProps> = ({ n = 5, m = 5, cellSize = 50 }) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState<boolean>(false);
  const [lastGridId, setLastGridId] = useState<string | null>(null);
  const [startGridId, setStartGridId] = useState<string | null>(null);
  const [rectangles, setRectangles] = useState<
    { left: number; top: number; width: number; height: number }[]
  >([]);

  const [rectanglePosition, setRectanglePosition] = useState<{
    left: number;
    top: number;
    width: number;
    height: number;
  } | null>(null);

  const handleMouseDown = (event: React.MouseEvent) => {
    setDragging(true);
    if (gridRef.current) {
      const gridRect = gridRef.current.getBoundingClientRect();
      const mouseX = event.clientX - gridRect.left;
      const mouseY = event.clientY - gridRect.top;
      const row = Math.floor(mouseY / cellSize);
      const col = Math.floor(mouseX / cellSize);
      if (row >= 0 && row < n && col >= 0 && col < m) {
        const gridId = `${row * m + col}`;
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
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (dragging && gridRef.current) {
      const gridRect = gridRef.current.getBoundingClientRect();
      const mouseX = event.clientX - gridRect.left;
      const mouseY = event.clientY - gridRect.top;
      const row = Math.floor(mouseY / cellSize);
      const col = Math.floor(mouseX / cellSize);
      if (row >= 0 && row < n && col >= 0 && col < m) {
        const gridId = `${row * m + col}`;
        console.log(gridId);
        if (gridId !== lastGridId) {
          setLastGridId(gridId); // 이 업데이트가 비동기적으로 이루어짐
        }
      }
    }
  };

  useEffect(() => {
    if (startGridId && lastGridId) {
      console.log(`startGrid : ${startGridId}`);
      console.log(`endGrid : ${lastGridId}`);
      if (gridRef.current) {
        const _startId = parseInt(startGridId, 10);
        const _endId = parseInt(lastGridId, 10);
        const startId = Math.min(_startId, _endId);
        const endId = Math.max(_startId, _endId);
        const startRow = Math.floor(startId / m);
        const startCol = startId % m;
        const endRow = Math.floor(endId / m);
        const endCol = endId % m;
        const left = startCol * (cellSize + 2) + 2;
        const top = startRow * (cellSize + 2) + 2;
        const width = (endCol - startCol + 1) * cellSize;
        const height = (endRow - startRow + 1) * cellSize;
        console.log(`width : ${width}`);
        console.log(`height : ${height}`);
        setRectanglePosition({ left: left, top: top, width: width, height: height });
      }
    }
  }, [lastGridId, startGridId]); // lastGridId나 startGridId가 변경될 때마다 실행됨

  const handleMouseUp = () => {
    if (rectanglePosition) {
      const left = rectanglePosition.left;
      const top = rectanglePosition.top;
      const width = rectanglePosition.width;
      const height = rectanglePosition.height;
      setRectangles((prev) => [...prev, { left, top, width, height }]);
    }
    setRectanglePosition(null);
    setDragging(false);
  };

  const renderGrid = () => {
    const grid: JSX.Element[] = [];
    for (let i = 0; i < n; i++) {
      const row: JSX.Element[] = [];
      for (let j = 0; j < m; j++) {
        const uniqueId = `${i * m + j}`;
        const newRec = (
          <div
            key={uniqueId}
            id={uniqueId}
            style={{
              width: `${cellSize}px`,
              height: `${cellSize}px`,
              backgroundColor: '#4CAF50',
              display: 'inline-block',
              textAlign: 'center',
              lineHeight: `${cellSize}px`,
              color: 'white',
              cursor: 'pointer',
              border: '1px solid black',
            }}>
            {uniqueId}
          </div>
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
        {rectanglePosition && (
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
        )}
        {rectangles.map((rect, index) => (
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
        ))}
      </div>
    </div>
  );
};

export default ExamplePage;
