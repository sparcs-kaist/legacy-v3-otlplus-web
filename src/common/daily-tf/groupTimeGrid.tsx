import renderGrid from '@/common/daily-tf/utils/renderGrid';
import renderTargetArea from '@/common/daily-tf/utils/renderTargetArea';
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import mockCoworker from './mock/mockCoworker';

interface GridProps {
  n?: number; // 세로 크기
  m?: number; // 가로 크기
  cellWidth?: number;
  cellHeight?: number;
  rowPadding?: number;
  colPadding?: number;
  myArea: Map<number, boolean[]>;
  coworkerArea?: Map<string, Map<number, boolean[]>>;
  isModal?: boolean;
}

// test
const myName = 'caiso';
//

const GroupTimeGrid: React.FC<GridProps> = ({
  n = 10,
  m = 5,
  cellHeight = 50,
  cellWidth = 100,
  rowPadding = 5,
  colPadding = 10,
  myArea,
  coworkerArea = mockCoworker,
  isModal = false,
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const worker = [...coworkerArea.keys(), myName];
  const scale = 1 / worker.length;

  const [hoverGridID, setHoverGridID] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMouseInsideGrid, setIsMouseInsideGrid] = useState<boolean>(false);
  const [ableWorker, setAbleWorker] = useState<string[]>([]);

  const handleMouseMove = (event: MouseEvent) => {
    if (!isModal) {
      const mouseX = event.clientX;
      const mouseY = event.clientY;
      setMousePosition({ x: mouseX, y: mouseY });

      if (gridRef.current) {
        const gridRect = gridRef.current.getBoundingClientRect();
        const isInside =
          mouseX >= gridRect.left &&
          mouseX <= gridRect.left + gridRect.width &&
          mouseY >= gridRect.top &&
          mouseY <= gridRect.top + gridRect.height;

        setIsMouseInsideGrid(isInside);

        if (isInside) {
          const X = mouseX - gridRect.left;
          const Y = mouseY - gridRect.top;
          const row = Math.floor(Y / cellHeight);
          const col = Math.floor(X / (cellWidth + colPadding));
          if (row >= 0 && row < n && col >= 0 && col < m) {
            const gridId = `${row * m + col}`;
            if (gridId !== hoverGridID) {
              setHoverGridID(gridId);
            }
          }
        }
      }
    }
  };

  useEffect(() => {
    if (!isModal) {
      document.addEventListener('mousemove', handleMouseMove);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, [hoverGridID, isModal]);

  useEffect(() => {
    const res: string[] = [];
    if (hoverGridID) {
      const hoverID = parseInt(hoverGridID, 10);
      const row = Math.floor(hoverID / m);
      const col = hoverID % m;

      coworkerArea.forEach((value, key) => {
        const able = value.get(col)![row];
        if (able === true) {
          res.push(key);
        }
      });

      const myAble = myArea.get(col)![row];
      if (myAble === true) {
        res.push(myName);
      }
    }
    setAbleWorker(res);
  }, [hoverGridID]);

  function getUnableWorker(): string[] {
    const setAble = new Set(ableWorker);
    return worker.filter((item) => !setAble.has(item));
  }

  return (
    <div
      ref={gridRef}
      style={{
        display: 'inline-block',
        position: 'relative',
        userSelect: 'none',
        cursor: 'pointer',
      }}>
      {isMouseInsideGrid &&
        ableWorker.length > 0 &&
        ReactDOM.createPortal(
          <div
            style={{
              position: 'absolute',
              top: mousePosition.y + 10,
              left: mousePosition.x + 10,
              backgroundColor: 'white',
              border: '1px solid #ccc',
              padding: '10px',
              borderRadius: '4px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              pointerEvents: 'none',
              width: 'auto',
              height: 'auto',
              overflow: 'auto',
            }}>
            {`able : ${ableWorker}`}
            <br />
            {`unable : ${getUnableWorker()}`}
          </div>,
          document.body,
        )}
      {renderGrid(n, m, cellWidth, cellHeight, colPadding)}
      {renderTargetArea(
        true,
        myArea,
        `rgba(229, 76, 101,${scale})`,
        cellHeight,
        cellWidth,
        rowPadding,
        colPadding,
      )}
      {coworkerArea &&
        Array.from(coworkerArea.entries()).map(([coworkerName, area]) => (
          <React.Fragment key={coworkerName}>
            {renderTargetArea(
              true,
              area,
              `rgba(229, 76, 101,${scale})`,
              cellHeight,
              cellWidth,
              rowPadding,
              colPadding,
            )}
          </React.Fragment>
        ))}
    </div>
  );
};

export default GroupTimeGrid;
