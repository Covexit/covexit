import React, { useState, useRef } from "react";
import "./Modal.scss";
import Button from "../Button/Button";

const Modal = ({ header, body, footer }) => {
  const [modalShow, setModalShow] = useState(true);
  const modalRef = useRef();
  const handleClick = () => {
    setModalShow(false);
  }

  window.addEventListener("click", function (e) {
    if (e.target === modalRef.current) {
      setModalShow(false);
    }
  });

   header="Sign Up!"
   body = "Recieve updates and stay informed!"
   footer="*this is a disclaimer"

  return (
 <div>
    <div
      className={`Modal Modal--${modalShow ? "opened" : "closed"}`}
      ref={modalRef}
    >
      <div className="Modal-body">
        <div className="Modal-header">
                <span className="Close-modal-btn" onClick={handleClick}>x</span>
                {header}
        </div>
        <div className="Modal-content">{body}</div>

        <Button className="btn-primary">Sign Up</Button>
        <div className="Modal-footer">{footer}</div>
      </div>
      </div>
  </div>
  )
}

export default Modal;






