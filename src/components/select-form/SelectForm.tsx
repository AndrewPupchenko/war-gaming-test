import { useFormik } from "formik"
import { FC, useDeferredValue, useMemo } from "react"
import { DEFAULT_OPTIONS, MockData } from "../../data/mock_data"
import { SelectedGroup } from "../selected-group/SelectedGroup"
import { ModalProps } from "../modal/Modal"
import "./SelectForm.css"

export type SelectFormProps = Pick<ModalProps, "onClose"> & {
  data: MockData[]
  defaults: MockData[]
  handleSubmitItems: (el: MockData[]) => void
}

export const SelectForm: FC<SelectFormProps> = ({
  data,
  defaults,
  handleSubmitItems,
  onClose,
}) => {
  const { values, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      selected: defaults,
      filter: -1,
      search: "",
    },
    onSubmit: (values) => {
      handleSubmitItems(values.selected)
      onClose()
    },
  })

  const deferredSearch = useDeferredValue(values.search)
  const isDisabled = useMemo(
    () => values.selected.length >= 3,
    [values.selected]
  )

  const searchedItems = useMemo(() => {
    if (deferredSearch) {
      const searchString = deferredSearch.toLowerCase()
      return data.filter((el) => el.toLowerCase().includes(searchString))
    }
    return data
  }, [data, deferredSearch])

  const displayedItems = useMemo(() => {
    if (values.filter !== -1) {
      return searchedItems.slice(0, values.filter)
    }
    return searchedItems
  }, [values.filter, searchedItems])

  const selectedItemsMsg = useMemo(() => {
    const length = values.selected.length
    return length ? `Current selected items:` : "No items selected."
  }, [values.selected])

  return (
    <form onSubmit={handleSubmit}>
      <div className="modal-filter">
        <div className="input-group">
          <label htmlFor="search">Search</label>
          <input
            name="search"
            type="text"
            value={values.search}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label htmlFor="filter">Filter</label>
          <select name="filter" value={values.filter} onChange={handleChange}>
            <option value={-1} disabled hidden>
              No filter
            </option>
            {DEFAULT_OPTIONS.map((option) => (
              <option key={option} value={option}>{`>${option}`}</option>
            ))}
          </select>
        </div>
      </div>

      <ul className="modal-selected-content">
        {displayedItems.map((element) => {
          const checked = values.selected.includes(element)
          return (
            <li key={`checkbox-${element}`}>
              <input
                className="checkbox-input"
                type="checkbox"
                name="selected"
                value={element}
                disabled={!checked && isDisabled}
                checked={checked}
                onChange={handleChange}
              />
              <label htmlFor={element}>{element}</label>
            </li>
          )
        })}
      </ul>

      <div className="selected-items-footer">
        <p>{selectedItemsMsg}</p>

        <SelectedGroup
          data={values.selected}
          handleSelect={(el) => setFieldValue("selected", el)}
        />

        <div className="button-group">
          <button className="change-btn" type="submit">
            Save
          </button>
          <button
            className="change-btn cancel-btn"
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  )
}
