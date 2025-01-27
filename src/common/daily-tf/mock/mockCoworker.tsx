const mockCoworker: Map<string, Map<number, boolean[]>> = new Map([
  [
    'gimme',
    new Map(
      Array.from({ length: 10 }, (_, rowIndex) => [
        rowIndex,
        Array.from({ length: 14 }, (_, index) => {
          if ((rowIndex * 10 + index) % 3 === 0 || (rowIndex * 10 + index) % 5 === 2) {
            return true;
          } else {
            return false;
          }
        }),
      ]),
    ),
  ],
  [
    'gb',
    new Map(
      Array.from({ length: 10 }, (_, rowIndex) => [
        rowIndex,
        Array.from({ length: 14 }, (_, index) => {
          if ((rowIndex * 10 + index) % 7 === 0 || (rowIndex * 10 + index) % 6 === 1) {
            return true;
          } else {
            return false;
          }
        }),
      ]),
    ),
  ],
  [
    'lorem',
    new Map(
      Array.from({ length: 10 }, (_, rowIndex) => [
        rowIndex,
        Array.from({ length: 14 }, (_, index) => {
          if ((rowIndex * 10 + index) % 11 === 5 || (rowIndex * 10 + index) % 9 === 4) {
            return true;
          } else {
            return false;
          }
        }),
      ]),
    ),
  ],
]);

export default mockCoworker;
