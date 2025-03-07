import renderGrid from '@/common/daily-tf/utils/renderGrid';
import renderTargetArea from '@/common/daily-tf/utils/renderTargetArea';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import getColumnIndex from './utils/getColumnIndex';
import filterMapByRange from './utils/filterMapByRange';
import HoverContainer from './HoverContainer';
import Typography from './Typography';
import renderScheduleArea from './utils/renderScheduleArea';

interface GridProps {
  n: number; // 세로 크기
  m: number; // 가로 크기
  cellWidth: number;
  cellHeight: number;
  rowPadding?: number;
  colPadding?: number;
  myArea: Map<number, boolean[]>;
  placeholderIndex: number[];
  placeholderWidth?: number;
  pageStart: number;
  pageEnd: number;
  // mockCoworker generate를 위해 추가한 변수, API 연결 후 삭제 예정.
  coworkerArea: Map<string, Map<number, boolean[]>>;
  selectedArea: Map<number, boolean[]>;
  setSelectedArea: React.Dispatch<React.SetStateAction<Map<number, boolean[]>>>;
  tunedDateArray: Date[];
  title: string;
  parentRef: React.RefObject<HTMLDivElement | null>;
}

// test
const myName = 'caiso';
//

const ScheduleSetupGrid: React.FC<GridProps> = ({
  n = 10,
  m = 5,
  cellHeight = 50,
  cellWidth = 100,
  rowPadding = 2,
  colPadding = 5,
  myArea,
  coworkerArea,
  placeholderIndex,
  placeholderWidth = 10,
  pageStart,
  pageEnd,
  selectedArea,
  setSelectedArea,
  tunedDateArray,
  title,
  parentRef,
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const worker = [...coworkerArea.keys(), myName];
  const scale = 1 / worker.length;

  const [hoverGridID, setHoverGridID] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMouseInsideGrid, setIsMouseInsideGrid] = useState<boolean>(false);
  const [ableWorker, setAbleWorker] = useState<string[]>([]);

  const [dragging, setDragging] = useState<boolean>(false);
  const [lastGridId, setLastGridId] = useState<string | null>(null);
  const [startGridId, setStartGridId] = useState<string | null>(null);

  const [index, setIndex] = useState<boolean>(true);

  const [draggingArea, setDraggingArea] = useState<Map<number, boolean[]>>(
    new Map(Array.from({ length: m }, (_, rowIndex) => [rowIndex, Array(n).fill(null)])),
  );

  const getArea = (
    startRow: number,
    startCol: number,
    endRow: number,
    endCol: number,
    index: boolean,
  ): Map<number, boolean[]> => {
    const result = new Map(
      Array.from({ length: m }, (_, rowIndex) => [rowIndex, Array(n).fill(null)]),
    );
    for (let i = startCol; i < endCol + 1; i++) {
      for (let j = startRow; j < endRow + 1; j++) {
        result.get(i)![j] = !index;
      }
    }

    return result;
  };

  const compareArea = (
    target: Map<number, boolean[]>,
    newValue: Map<number, boolean[]>,
  ): Map<number, boolean[]> => {
    const result = new Map(
      Array.from({ length: tunedDateArray.length }, (_, rowIndex) => [
        rowIndex,
        Array(n).fill(false),
      ]),
    );

    target.forEach((value1, key) => {
      if (key >= pageStart && key <= pageEnd) {
        const value2 = newValue.get(key - pageStart);
        for (let i = 0; i < n; i++) {
          if (value2![i] == null) {
            result.get(key)![i] = value1[i];
          } else {
            result.get(key)![i] = value2![i];
          }
        }
      } else {
        for (let i = 0; i < n; i++) {
          result.get(key)![i] = value1[i];
        }
      }
    });

    return result;
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    if (gridRef.current) {
      const gridRect = gridRef.current.getBoundingClientRect();
      const mouseX = event.clientX - gridRect.left;
      const mouseY = event.clientY - gridRect.top;
      const row = Math.floor(mouseY / cellHeight);
      const col = getColumnIndex(
        mouseX,
        m,
        placeholderIndex,
        placeholderWidth,
        cellWidth,
        colPadding,
        pageStart,
      );
      if (row >= 0 && row < n && col >= 0 && col < m) {
        setDragging(true);
        const gridId = `${row * m + col}`;
        setStartGridId(gridId);
        setLastGridId(gridId);
      }
    }
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (dragging && gridRef.current) {
      const gridRect = gridRef.current.getBoundingClientRect();
      const mouseX = event.clientX - gridRect.left;
      const mouseY = event.clientY - gridRect.top;
      const row = Math.floor(mouseY / cellHeight);
      const col = getColumnIndex(
        mouseX,
        m,
        placeholderIndex,
        placeholderWidth,
        cellWidth,
        colPadding,
        pageStart,
      );
      if (row >= 0 && row < n && col >= 0 && col < m) {
        const gridId = `${row * m + col}`;
        if (gridId !== lastGridId) {
          setLastGridId(gridId);
        }
      }
    }
  };

  useLayoutEffect(() => {
    if (startGridId && lastGridId) {
      if (gridRef.current) {
        // 좌표 찾기
        const startId = parseInt(startGridId, 10);
        const endId = parseInt(lastGridId, 10);
        const startRow = Math.floor(startId / m);
        const startCol = startId % m;
        const endRow = Math.floor(endId / m);
        const endCol = endId % m;
        const index = selectedArea.get(startCol + pageStart)?.[startRow] || false;

        const _startRow = Math.min(startRow, endRow);
        const _endRow = Math.max(startRow, endRow);
        const _startCol = Math.min(startCol, endCol);
        const _endCol = Math.max(startCol, endCol);

        const targetArea = getArea(_startRow, _startCol, _endRow, _endCol, index);
        setDraggingArea(targetArea);

        setIndex(!index);
      }
    }
  }, [lastGridId, startGridId]);

  const handleMouseUp = () => {
    const updatedArea = compareArea(selectedArea, draggingArea);
    setSelectedArea(updatedArea);
    setDraggingArea(
      new Map(Array.from({ length: m }, (_, rowIndex) => [rowIndex, Array(n).fill(null)])),
    );
    setStartGridId(null);
    setLastGridId(null);
    setDragging(false);
  };

  const handleMouseMoveGroup = (event: MouseEvent) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    setMousePosition({ x: mouseX, y: mouseY });

    if (gridRef.current) {
      const gridRect = gridRef.current.getBoundingClientRect();
      const parendRect = parentRef.current?.getBoundingClientRect();

      const isInside =
        mouseX >= gridRect.left &&
        mouseX <= gridRect.left + gridRect.width &&
        mouseY >= gridRect.top &&
        mouseY <= gridRect.top + gridRect.height &&
        mouseX >= parendRect!.left &&
        mouseX <= parendRect!.left + parendRect!.width &&
        mouseY >= parendRect!.top &&
        mouseY <= parendRect!.top + parendRect!.height;

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
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMoveGroup);

    return () => {
      document.removeEventListener('mousemove', handleMouseMoveGroup);
    };
  }, [hoverGridID]);

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
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}>
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
      {renderTargetArea(
        index,
        draggingArea,
        `${index ? 'rgba(137, 160, 234, 1)' : 'rgba(255, 255, 255, 1)'}`,
        cellHeight,
        cellWidth,
        rowPadding,
        colPadding,
        placeholderIndex,
        placeholderWidth,
        pageStart,
      )}
      {renderScheduleArea(
        true,
        filterMapByRange(selectedArea, pageStart, pageEnd),
        'rgba(137, 160, 234, 1)',
        cellHeight,
        cellWidth,
        rowPadding,
        colPadding,
        placeholderIndex,
        placeholderWidth,
        pageStart,
        title,
      )}
    </div>
  );
};

export default ScheduleSetupGrid;
