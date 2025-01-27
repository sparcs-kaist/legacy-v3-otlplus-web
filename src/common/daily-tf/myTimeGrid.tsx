/* TODO: 코드 정리 - 중복되는 거 밖으로 빼던가 해야지,,*/
import renderGrid from '@/common/daily-tf/utils/renderGrid';
import renderTargetArea from '@/common/daily-tf/utils/renderTargetArea';
import React, { useLayoutEffect, useRef, useState } from 'react';
import getColumnIndex from './utils/getColumnIndex';

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
}

const MyTimeGrid: React.FC<GridProps> = ({
  n = 10,
  m = 5,
  cellHeight = 50,
  cellWidth = 100,
  rowPadding = 5,
  colPadding = 10,
  selectedArea,
  setSelectedArea,
  isModal = false,
  placeholderIndex = [],
  placeholderWidth = 10,
}) => {
  /* TODO : API로 disabledArea 받아오기 */
  // test

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
          // return false;
        }),
      ]),
    );

    return disabledArea;
  };

  const randomDisabledArea = fillDisabledMock(m, n);
  const gridRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState<boolean>(false);
  const [lastGridId, setLastGridId] = useState<string | null>(null);
  const [startGridId, setStartGridId] = useState<string | null>(null);
  const [isIndisabled, setIsIndisabled] = useState<boolean>(false);

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
    disabledArea: Map<number, boolean[]> = randomDisabledArea,
  ): Map<number, boolean[]> => {
    const result = new Map(
      Array.from({ length: m }, (_, rowIndex) => [rowIndex, Array(n).fill(null)]),
    );
    for (let i = startCol; i < endCol + 1; i++) {
      for (let j = startRow; j < endRow + 1; j++) {
        if (disabledArea.get(i)![j] == false) {
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
      Array.from({ length: m }, (_, rowIndex) => [rowIndex, Array(n).fill(false)]),
    );

    target.forEach((value1, key) => {
      const value2 = newValue.get(key);
      for (let i = 0; i < n; i++) {
        if (value2![i] == null) {
          result.get(key)![i] = value1[i];
        } else {
          result.get(key)![i] = value2![i];
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
        );
        if (row >= 0 && row < n && col >= 0 && col < m) {
          setDragging(true);
          const gridId = `${row * m + col}`;
          setStartGridId(gridId);
          setLastGridId(gridId);
          const isDisabled: boolean = randomDisabledArea.get(col)![row] == true;
          setIsIndisabled(isDisabled);
        }
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
        const index = selectedArea.get(startCol)?.[startRow] || false;

        const _startRow = Math.min(startRow, endRow);
        const _endRow = Math.max(startRow, endRow);
        const _startCol = Math.min(startCol, endCol);
        const _endCol = Math.max(startCol, endCol);

        if (!isIndisabled) {
          const targetArea = getArea(_startRow, _startCol, _endRow, _endCol, index);
          setDraggingArea(targetArea);
        } else {
          const targetArea = getArea(
            _startRow,
            _startCol,
            _endRow,
            _endCol,
            index,
            new Map(Array.from({ length: m }, (_, rowIndex) => [rowIndex, Array(n).fill(false)])),
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
      {renderGrid(n, m, cellWidth, cellHeight, colPadding, placeholderIndex, placeholderWidth)}
      {renderTargetArea(
        true,
        randomDisabledArea,
        'rgba(214, 214, 214, 1)',
        cellHeight,
        cellWidth,
        rowPadding,
        colPadding,
        placeholderIndex,
        placeholderWidth,
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
      )}
      {renderTargetArea(
        true,
        selectedArea,
        'rgba(237, 140, 156, 0.5)',
        cellHeight,
        cellWidth,
        rowPadding,
        colPadding,
        placeholderIndex,
        placeholderWidth,
      )}
    </div>
  );
};

export default MyTimeGrid;
