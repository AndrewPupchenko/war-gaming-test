import { FC, useCallback } from "react"
import { MockData } from "../../data/mock_data"

type SelectedGroupProps = {
  name?: string
  data: MockData[]
  handleSelect: (el: MockData[]) => void
}

export const SelectedGroup: FC<SelectedGroupProps> = ({
  name,
  handleSelect,
  data,
}) => {
  const handleChangeItems = useCallback(
    (curr: MockData) => () => {
      const isExist = data.find((el) => el === curr)

      if (!isExist) {
        if (data.length < 3) return handleSelect([...data, curr])
        return handleSelect(data)
      }
      return handleSelect(data.filter((el) => el !== curr))
    },
    [data, handleSelect]
  )

  return (
    <div className="selected-group" data-name={name}>
      {data.map((el) => (
        <div key={el} className="selected-item">
          <p>{el}</p>
          <button className="close-btn" onClick={handleChangeItems(el)}>
            Х
          </button>
        </div>
      ))}
    </div>
  )
}
