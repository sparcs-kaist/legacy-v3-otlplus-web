import renderGrid from '@/common/daily-tf/utils/renderGrid';
import renderTargetArea from '@/common/daily-tf/utils/renderTargetArea';
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import getColumnIndex from './utils/getColumnIndex';
import filterMapByRange from './utils/filterMapByRange';
import generateMockCoworkerList from './mock/mockCoworker';
import HoverContainer from './HoverContainer';
import Typography from './Typography';

interface GridProps {
  n?: number; // 세로 크기
  m?: number; // 가로 크기
  cellWidth?: number;
  cellHeight?: number;
  rowPadding?: number;
  colPadding?: number;
  myArea: Map<number, boolean[]>;
  isModal?: boolean;
  placeholderIndex?: number[];
  placeholderWidth?: number;
  pageStart?: number;
  pageEnd?: number;
  // mockCoworker generate를 위해 추가한 변수, API 연결 후 삭제 예정.
  coworkerArea: Map<string, Map<number, boolean[]>>;
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
  coworkerArea,
  isModal = false,
  placeholderIndex = [],
  placeholderWidth = 10,
  pageStart = 0,
  pageEnd = 6,
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const worker = [...coworkerArea.keys(), myName];
  const scale = 1 / worker.length;

  const [hoverGridID, setHoverGridID] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMouseInsideGrid, setIsMouseInsideGrid] = useState<boolean>(false);
  const [ableWorker, setAbleWorker] = useState<string[]>([]);

  const handleMouseMoveGroup = (event: MouseEvent) => {
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
          const col = getColumnIndex(
            X,
            m,
            placeholderIndex,
            placeholderWidth,
            cellWidth,
            colPadding,
            pageStart,
          );
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
      document.addEventListener('mousemove', handleMouseMoveGroup);

      return () => {
        document.removeEventListener('mousemove', handleMouseMoveGroup);
      };
    }
  }, [hoverGridID, isModal]);

  useEffect(() => {
    const res: string[] = [];
    if (hoverGridID) {
      const hoverID = parseInt(hoverGridID, 10);
      const row = Math.floor(hoverID / m);
      const col = hoverID % m;
      if (!placeholderIndex.includes(col + pageStart)) {
        coworkerArea.forEach((value, key) => {
          const able = value.get(col + pageStart)![row];
          if (able === true) {
            res.push(key);
          }
        });

        const myAble = myArea.get(col + pageStart)![row];
        if (myAble === true) {
          res.push(myName);
        }
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
          <HoverContainer
            top={mousePosition.y + 10}
            left={mousePosition.x + 10}
            width={cellWidth * 2}>
            <Typography type="SmallBold">{`가능 (${ableWorker.length}명)`}</Typography>
            <Typography>{ableWorker.join(', ')}</Typography>
            <br />
            <Typography type="SmallBold">{`불가능 (${getUnableWorker().length}명)`}</Typography>
            <Typography>{getUnableWorker().join(', ')}</Typography>
          </HoverContainer>,
          document.body,
        )}
      {renderGrid(
        n,
        m,
        cellWidth,
        cellHeight,
        colPadding,
        placeholderIndex,
        placeholderWidth,
        pageStart,
      )}
      {renderTargetArea(
        true,
        filterMapByRange(myArea, pageStart, pageEnd),
        `rgba(229, 76, 101,${scale})`,
        cellHeight,
        cellWidth,
        rowPadding,
        colPadding,
        placeholderIndex,
        placeholderWidth,
        pageStart,
      )}
      {coworkerArea &&
        Array.from(coworkerArea.entries()).map(([coworkerName, area]) => (
          <React.Fragment key={coworkerName}>
            {renderTargetArea(
              true,
              filterMapByRange(area, pageStart, pageEnd),
              `rgba(229, 76, 101,${scale})`,
              cellHeight,
              cellWidth,
              rowPadding,
              colPadding,
              placeholderIndex,
              placeholderWidth,
              pageStart,
            )}
          </React.Fragment>
        ))}
    </div>
  );
};

export default GroupTimeGrid;
