import React, { useState, useRef } from "react";
import "./Modal.scss";
import Button from "../Button/Button";

function Share() {
  const [modalShow, setModalShow] = useState(false);

  const modalRef = useRef();
  const handleClick = () => {
    setModalShow(!modalShow);
  };
  window.addEventListener("click", function (e) {
    if (e.target === modalRef.current) {
      setModalShow(false);
    }
  });

    setTimeout(() => {
      setModalShow(false);
    }, 3000);
  

  return (
    <div className="Modal">

      <div
        className={`Modal Modal--${modalShow ? "opened" : "closed"}`}
        ref={modalRef}
      >
        <div className="Modal-body">
        <Button type="dismiss" label="x" onClick={handleClick} />
  
         
     
        </div>
      </div>
    </div>
  );
}

export default Modal;
