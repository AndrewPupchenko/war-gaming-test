import { useMemo } from "react"
import "./App.css"
import Modal from "./components/modal/Modal"
import { SelectForm } from "./components/select-form/SelectForm"
import { SelectedGroup } from "./components/selected-group/SelectedGroup"
import { useElements } from "./hooks/useElements"
import { useModal } from "./hooks/useModal"

function App() {
  const { isModalOpen, changeModal, closeModal } = useModal()
  const { data, selected, handleSubmit } = useElements()

  const selectedItemsString = useMemo(() => {
    const length = selected.length
    if (!length) return "No items selected."
    return `You currently have ${length} selected item${length > 1 ? "s" : ""}.`
  }, [selected])

  return (
    <div className="App">
      <h1>Select items</h1>
      <p className="subtitle">{selectedItemsString}</p>

      <SelectedGroup data={selected} handleSelect={handleSubmit} />

      <button className="change-btn" onClick={changeModal}>
        Change my choice
      </button>

      <Modal title="Select items" isOpen={isModalOpen} onClose={closeModal}>
        <SelectForm
          data={data}
          defaults={selected}
          onClose={closeModal}
          handleSubmitItems={handleSubmit}
        />
      </Modal>
    </div>
  )
}

export default App
