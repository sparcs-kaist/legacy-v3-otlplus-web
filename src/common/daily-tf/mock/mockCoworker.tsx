type RowIndex = number;
type ColIndex = number;
type Availability = boolean;

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
  for (let i = 0; i < member - 1; i++) {
    const name = `lorem${i + 1}`;
    if (i % 2 == 0) {
      const available = new Map(
        Array.from({ length: row }, (_, rowIndex) => [
          rowIndex,
          Array.from({ length: column }, (_, colIndex) => false),
        ]),
      );
      result.set(name, available);
    } else {
      const available = generateMockCoworker({ rows: row, columns: column });
      result.set(name, available);
    }
  }
  return result;
}

export default generateMockCoworkerList;
