import { useState } from "react"
import { DEFAULT_SELECTED, MOCK_DATA, MockData } from "../data/mock_data"

export const useElements = () => {
  const [selected, setSelected] = useState<MockData[]>(DEFAULT_SELECTED)

  return { data: MOCK_DATA, selected, handleSubmit: setSelected }
}
