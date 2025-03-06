import { DisabledAreaType } from './disabledAreaType';

export function formatDisabledArea(
  target: Map<number, DisabledAreaType[]>,
  rows: number,
  columns: number,
): Map<number, boolean[]> {
  const res = new Map(
    Array.from({ length: rows }, (_, rowIndex) => [
      rowIndex,
      Array.from({ length: columns }, (_, colIndex) => false),
    ]),
  );

  target.forEach((value, key) => {
    value.map((val, index) => {
      for (let i = val.startIndex; i <= val.endIndex; i++) {
        res.get(key)![i] = true;
      }
    });
  });

  return res;
}
