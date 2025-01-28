interface GenerateMockCoworkerParams {
  rows: number;
  columns: number;
}

function generateMockCoworker(params: GenerateMockCoworkerParams): Map<number, boolean[]> {
  const { rows, columns } = params;

  return new Map(
    Array.from({ length: rows }, (_, rowIndex) => [
      rowIndex,
      Array.from({ length: columns }, (_, colIndex) => Math.random() > 0.8),
    ]),
  );
}

function generateMockCoworkerList(
  member: number,
  row: number,
  column: number,
): Map<string, Map<number, boolean[]>> {
  const result = new Map();
  for (let i = 0; i < member; i++) {
    const name = `lorem${i + 1}`;
    const available = generateMockCoworker({ rows: row, columns: column });
    result.set(name, available);
  }
  return result;
}

export default generateMockCoworkerList;
