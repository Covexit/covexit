import React, { useRef } from "react";
import "./Modal.scss";
import { FiX } from 'react-icons/fi';

const Modal = ({ header, children, footer, onClose }) => {
  const modalRef = useRef();

  window.addEventListener("click", function (e) {
    if (e.target === modalRef.current) {
      onClose();
    }
  });

  return (
    <div
      className="Modal"
      ref={modalRef}
    >
      <div className="Modal-body">
        {!!header && <div className="Modal-header">{header}</div>}
        <div className="Modal-content">{children}</div>
        <div className="Modal-footer">{footer}</div>
        <button className="Modal-close" onClick={onClose}><FiX size={25}/></button>
      </div>
    </div>
  )
}

export default Modal;






