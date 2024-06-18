import { useState } from "react"

export const useModal = () => {
  const [isModalOpen, setModalOpen] = useState(false)

  const changeModal = () => {
    setModalOpen((el) => !el)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  return { isModalOpen, changeModal, closeModal }
}
