import { JSX } from 'react';

const renderGrid = (
  n: number,
  m: number,
  cellWidth: number,
  cellHeight: number,
  colPadding: number,
  placeholderIndex: number[],
  placeholderWidth: number,
) => {
  const grid: JSX.Element[] = [];
  for (let i = 0; i < n; i++) {
    const row: JSX.Element[] = [];
    for (let j = 0; j < m; j++) {
      const uniqueId = `${i * m + j}`;
      const isShown = !placeholderIndex.includes(j);
      const newRec = (
        <div
          key={uniqueId}
          id={uniqueId}
          style={{
            width: `${isShown ? cellWidth : placeholderWidth}px`,
            height: `${cellHeight}px`,
            display: 'inline-block',
            textAlign: 'center',
            cursor: 'pointer',
            borderTop: `${
              isShown
                ? i % 2 == 0
                  ? '1px solid rgba(232, 232, 232, 1)'
                  : '1px dashed rgba(232, 232, 232, 1)'
                : '0px'
            }`,
            borderBottom: `${isShown && i == n - 1 ? '1px solid rgba(232, 232, 232, 1)' : '0px'}`,
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

export default renderGrid;
