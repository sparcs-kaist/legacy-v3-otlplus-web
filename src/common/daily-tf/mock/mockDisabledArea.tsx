import { DisabledAreaType } from '../interface/disabledAreaType';

const getRandomInt = (idx: number): number => {
  return Math.floor(Math.random() * (idx - 1));
};

function generateMockDisabledArea(
  days: number,
  timeIndex: number,
): Map<number, DisabledAreaType[]> {
  const result = new Map();
  for (let i = 0; i < days; i++) {
    const randomInt = getRandomInt(timeIndex * 2 - 4);
    const _: DisabledAreaType = {
      name: `lorem${i * 2 + 1}`,
      startIndex: randomInt,
      endIndex: randomInt + 1,
    };
    const __: DisabledAreaType = {
      name: `lorem${(i + 1) * 2}`,
      startIndex: randomInt + 2,
      endIndex: randomInt + 3,
    };
    const disabled = [_, __];
    result.set(i, disabled);
  }
  return result;
}

export default generateMockDisabledArea;
