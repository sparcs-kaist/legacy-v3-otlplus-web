export function checkIfAnyTrue(map: Map<number, boolean[]>): boolean {
  for (const value of map.values()) {
    if (value.includes(true)) {
      return true;
    }
  }
  return false;
}
