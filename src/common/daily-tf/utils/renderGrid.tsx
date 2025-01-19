import { JSX } from 'react';

const renderGrid = (
  disabledArea: Map<number, boolean[]> | null,
  n: number,
  m: number,
  cellWidth: number,
  cellHeight: number,
  colPadding: number,
) => {
  const grid: JSX.Element[] = [];
  for (let i = 0; i < n; i++) {
    const row: JSX.Element[] = [];
    for (let j = 0; j < m; j++) {
      const uniqueId = `${i * m + j}`;
      const disabled = disabledArea?.get(j)![i] ?? false;
      const newRec = (
        <div
          key={uniqueId}
          id={uniqueId}
          style={{
            width: `${cellWidth}px`,
            height: `${cellHeight}px`,
            display: 'inline-block',
            textAlign: 'center',
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

export default renderGrid;
