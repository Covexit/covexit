import React, { useState, useRef } from "react";
import "./Modal.scss";

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
        <div className="Modal-header">{header}</div>
        <div className="Modal-content">{children}</div>
        <div className="Modal-footer">{footer}</div>
        <button className="Close-modal-btn" onClick={onClose}>x</button>
      </div>
    </div>
  )
}

export default Modal;






