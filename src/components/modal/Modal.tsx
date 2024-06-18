// Modal.js
import { FC, PropsWithChildren } from "react"
import "./Modal.css"

export type ModalProps = {
  title?: string
  isOpen: boolean
  onClose: () => void
}

const Modal: FC<PropsWithChildren<ModalProps>> = ({
  title,
  isOpen,
  onClose,
  children,
}) => {
  if (!isOpen) return null

  return (
    <div className="modal">
      <div className="modal-content">
        <header>
          <p>{title}</p>
          <button className="modal-close" onClick={onClose}>
            X
          </button>
        </header>
        {children}
      </div>
    </div>
  )
}

export default Modal
