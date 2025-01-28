/* TODO: 코드 정리 - 중복되는 거 밖으로 빼던가 해야지,,*/
import renderGrid from '@/common/daily-tf/utils/renderGrid';
import renderTargetArea from '@/common/daily-tf/utils/renderTargetArea';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import getColumnIndex from './utils/getColumnIndex';
import filterMapByRange from './utils/filterMapByRange';
import ReactDOM from 'react-dom';
import getFormattedDate from './utils/getFormattedDate';
import HoverContainer from './HoverContainer';
import { DisabledAreaType } from './utils/disabledAreaType';
import renderDisabledArea from './utils/renderDisabledArea';

interface GridProps {
  n?: number; // 세로 크기
  m?: number; // 가로 크기
  cellWidth?: number;
  cellHeight?: number;
  rowPadding?: number;
  colPadding?: number;
  selectedArea: Map<number, boolean[]>;
  setSelectedArea: React.Dispatch<React.SetStateAction<Map<number, boolean[]>>>;
  isModal?: boolean;
  placeholderIndex?: number[];
  placeholderWidth?: number;
  pageStart?: number;
  pageEnd?: number;
  tunedDateArray?: Date[];
  startTime?: number;
  disabledArea?: Map<number, DisabledAreaType[]>;
  formattedDisabledArea?: Map<number, boolean[]>;
}

const MyTimeGrid: React.FC<GridProps> = ({
  n = 10,
  m = 5,
  cellHeight = 50,
  cellWidth = 100,
  rowPadding = 2,
  colPadding = 5,
  selectedArea,
  setSelectedArea,
  isModal = false,
  placeholderIndex = [],
  placeholderWidth = 10,
  pageStart = 0,
  pageEnd = 6,
  tunedDateArray = [],
  startTime = 8,
  disabledArea = new Map(),
  formattedDisabledArea = new Map(),
}) => {
  /* TODO : API로 disabledArea 받아오기 */
  /* 밖으로 빼서 처리해야 함 (랜더링 될 때마다 호출 xx) */
  // test

  const gridRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState<boolean>(false);
  const [lastGridId, setLastGridId] = useState<string | null>(null);
  const [startGridId, setStartGridId] = useState<string | null>(null);
  const [isIndisabled, setIsIndisabled] = useState<boolean>(false);

  const [index, setIndex] = useState<boolean>(true);

  const [draggingArea, setDraggingArea] = useState<Map<number, boolean[]>>(
    new Map(Array.from({ length: m }, (_, rowIndex) => [rowIndex, Array(n).fill(null)])),
  );

  const [hoverGridID, setHoverGridID] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMouseInsideGrid, setIsMouseInsideGrid] = useState<boolean>(false);

  const getArea = (
    startRow: number,
    startCol: number,
    endRow: number,
    endCol: number,
    index: boolean,
    disabledArea: Map<number, boolean[]>,
  ): Map<number, boolean[]> => {
    const result = new Map(
      Array.from({ length: m }, (_, rowIndex) => [rowIndex, Array(n).fill(null)]),
    );
    for (let i = startCol; i < endCol + 1; i++) {
      for (let j = startRow; j < endRow + 1; j++) {
        if (disabledArea.get(i + pageStart)![j] == false) {
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
    if (!isModal) {
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
          const isDisabled: boolean = formattedDisabledArea.get(col + pageStart)![row] == true;
          setIsIndisabled(isDisabled);
        }
      }
    }
  };

  const getTimefromRow = (row: number) => {
    const generalIndex = row + startTime * 2;
    const hour = Math.floor(generalIndex / 2);
    const minute = (generalIndex % 2) * 30;
    if (hour <= 12) {
      return `오전 ${hour}시 ${minute != 0 ? '30분' : ''}`;
    } else {
      if (hour <= 24) {
        return `오후 ${hour - 12}시 ${minute != 0 ? '30분' : ''}`;
      } else {
        return `오전 ${hour - 24}시 ${minute != 0 ? '30분' : ''}`;
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

        if (!isIndisabled) {
          const targetArea = getArea(
            _startRow,
            _startCol,
            _endRow,
            _endCol,
            index,
            formattedDisabledArea,
          );
          setDraggingArea(targetArea);
        } else {
          const targetArea = getArea(
            _startRow,
            _startCol,
            _endRow,
            _endCol,
            index,
            new Map(
              Array.from({ length: tunedDateArray.length }, (_, rowIndex) => [
                rowIndex,
                Array(n).fill(false),
              ]),
            ),
          );
          setDraggingArea(targetArea);
        }
        setIndex(!index);
      }
    }
  }, [lastGridId, startGridId]);

  const handleMouseUp = () => {
    if (!isIndisabled) {
      const updatedArea = compareArea(selectedArea, draggingArea);
      setSelectedArea(updatedArea);
    } else {
      const updatedArea = compareArea(selectedArea, draggingArea);
      setSelectedArea(updatedArea);
    }
    setDraggingArea(
      new Map(Array.from({ length: m }, (_, rowIndex) => [rowIndex, Array(n).fill(null)])),
    );
    setStartGridId(null);
    setLastGridId(null);
    setDragging(false);
  };

  const handleMouseHover = (event: MouseEvent) => {
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
              if (!placeholderIndex.includes(col)) {
                setHoverGridID(gridId);
              } else {
                setHoverGridID(null);
              }
            }
          }
        }
      }
    }
  };

  useEffect(() => {
    if (!isModal) {
      document.addEventListener('mousemove', handleMouseHover);

      return () => {
        document.removeEventListener('mousemove', handleMouseHover);
      };
    }
  }, [hoverGridID, isModal]);

  return (
    <div
      ref={gridRef}
      style={{
        display: 'inline-block',
        position: 'relative',
        userSelect: 'none',
        cursor: 'pointer',
        overflow: 'auto',
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}>
      {isMouseInsideGrid &&
        hoverGridID &&
        ReactDOM.createPortal(
          <HoverContainer top={mousePosition.y + 10} left={mousePosition.x + 10}>
            {`${getFormattedDate(
              tunedDateArray[(parseInt(hoverGridID, 10) % m) + pageStart],
            )}  ${getTimefromRow(Math.floor(parseInt(hoverGridID, 10) / m))}`}
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
      {renderDisabledArea(
        filterMapByRange(disabledArea, pageStart, pageEnd),
        cellHeight,
        cellWidth,
        rowPadding,
        colPadding,
        placeholderIndex,
        placeholderWidth,
        pageStart,
      )}
      {renderTargetArea(
        index,
        draggingArea,
        `${index ? 'rgba(237, 140, 156, 0.5)' : 'rgba(255, 255, 255, 1)'}`,
        cellHeight,
        cellWidth,
        rowPadding,
        colPadding,
        placeholderIndex,
        placeholderWidth,
        pageStart,
      )}
      {renderTargetArea(
        true,
        filterMapByRange(selectedArea, pageStart, pageEnd),
        'rgba(237, 140, 156, 0.5)',
        cellHeight,
        cellWidth,
        rowPadding,
        colPadding,
        placeholderIndex,
        placeholderWidth,
        pageStart,
      )}
    </div>
  );
};

export default MyTimeGrid;
