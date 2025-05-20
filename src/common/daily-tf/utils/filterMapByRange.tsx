const filterMapByRange = (map: Map<number, boolean[]>, startKey: number, endKey: number) => {
  const resultMap = new Map();

  // map의 key를 순차적으로 확인하면서 범위에 해당하는 키만 resultMap에 추가
  for (const [key, value] of map) {
    if (key >= startKey && key <= endKey) {
      resultMap.set(key - startKey, value);
    }
  }

  return resultMap;
};

export default filterMapByRange;
