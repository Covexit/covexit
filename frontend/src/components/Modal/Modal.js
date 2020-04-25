import React, { useState, useRef} from "react";
import "./Modal.scss";
import Button from "../Button/Button";

function Modal(props) {
    const [modalShow, setModalShow] = useState(true);
    const modalRef = useRef();
    const handleClick = () => {
          setModalShow(false);
         }

    window.addEventListener("click", function (e) {
      if (e.target !== modalRef.current) {
        setModalShow(false);
      }
    });

    return (
<div>
      <div
        className={`Modal Modal--${modalShow ? "opened" : "closed"}`}
        ref={modalRef}
      >
        <div className="Modal-body">
                <div className="Modal-header">
                    <h3>{props.children}</h3>
                    <span className="Close-modal-btn" onClick={handleClick}>×</span>
                </div>
                <div className="Modal-content">
                    <p>
                       {props.children}
                    </p>
                </div>
                <div className="Modal-footer">
                    <Button className="btn-primary">Sign Up</Button>
                </div>
            </div>
        </div>
     </div>
    )
}

export default Modal;
