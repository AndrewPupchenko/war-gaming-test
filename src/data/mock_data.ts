const DEFAULT_LENGTH = 300

export type MockData = string

export const MOCK_DATA: MockData[] = Array.from(
  { length: DEFAULT_LENGTH },
  (_, i) => `Element ${i + 1}`
)
export const DEFAULT_SELECTED: MockData[] = [MOCK_DATA[4], MOCK_DATA[50]]
export const DEFAULT_OPTIONS = [10, 100, 200]
