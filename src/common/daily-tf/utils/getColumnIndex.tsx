const generateColumnBoundary = (
  m: number,
  placeholderIndex: number[],
  placeholderWidth: number,
  cellWidth: number,
  colPadding: number,
) => {
  const res: number[] = [0];
  let prev = 0;

  for (let i = 0; i < m; i++) {
    if (placeholderIndex.includes(i)) {
      prev += placeholderWidth + colPadding;
      res.push(prev);
    } else {
      prev += cellWidth + colPadding;
      res.push(prev);
    }
  }

  return res;
};

const getColumnIndex = (
  mouseX: number,
  m: number,
  placeholderIndex: number[],
  placeholderWidth: number,
  cellWidth: number,
  colPadding: number,
) => {
  const columnBoundary = generateColumnBoundary(
    m,
    placeholderIndex,
    placeholderWidth,
    cellWidth,
    colPadding,
  );
  for (let i = 0; i < m + 1; i++) {
    if (columnBoundary[i] > mouseX) {
      return i - 1;
    }
  }
  return m;
};

export default getColumnIndex;
