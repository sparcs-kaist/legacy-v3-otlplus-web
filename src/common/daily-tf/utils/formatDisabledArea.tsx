import { DisabledAreaType } from './disabledAreaType';

// 타입을 정의하고, 반환값을 올바르게 설정
export function formatDisabledArea(
  target: Map<number, DisabledAreaType[]>, // target은 현재 사용되지 않으므로 필요 없다면 삭제 가능
  rows: number,
  columns: number,
): Map<number, boolean[]> {
  // 반환 타입에 => 대신 : 사용
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
