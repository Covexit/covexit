import React, { useState, useRef } from "react";
import "./Modal.scss";

const Modal = ({ header, body, footer }) => {
  const [modalShow, setModalShow] = useState(true);
  const modalRef = useRef();
  const onClose = () => {
    setModalShow(false);
  }

  window.addEventListener("click", function (e) {
    if (e.target === modalRef.current) {
      setModalShow(false);
    }
  });

  return (

    <div
      className={`Modal Modal--${modalShow ? "opened" : "closed"}`}
      ref={modalRef}
    >
      <div className="Modal-body">
        <div className="Modal-header">
        <span className="Close-modal-btn" onClose={onClose}>x</span>
        {header}
        </div>
        <div className="Modal-content">{body}</div>
        <div className="Modal-footer">{footer}</div>
      </div>
    </div>
  )
}

export default Modal;






