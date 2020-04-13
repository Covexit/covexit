import React, { useState, useRef } from "react";
import "./Share.scss";
import share from "../../assets/share.svg";
import Button from "../Button/Button";

function Share() {
  const [modalShow, setModalShow] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const message = "Share Covexit with others and help during this crisis!";
  const urlRef = useRef();
  const url = window.location.href;
  const modalRef = useRef();
  const handleClick = () => {
    setModalShow(!modalShow);
  };
  window.addEventListener("click", function (e) {
    if (e.target === modalRef.current) {
      setModalShow(false);
    } else {
      return;
    }
  });

  function copyLink() {
    urlRef.current.select();
    document.execCommand("copy");
    setCopySuccess(" ∞ copied! ");
    setTimeout(() => {
      setModalShow(false);
      setCopySuccess(false);
    }, 3000);
  }

  return (
    <div className="Share">
      <button className="Share-toggle" onClick={handleClick}>
        <img src={share} alt="Share Icon" className="Share-icon" />
        Share
      </button>

      <div
        className={`Modal Modal--${modalShow ? "opened" : "closed"}`}
        ref={modalRef}
      >
        <div className="Modal-body">
          <div className="Share-message">{message}</div>
          <input
            type="value"
            className="TextInput-field"
            defaultValue={url}
            ref={urlRef}
          />
          <div className="Alert">{copySuccess}</div>
          <div className="Btn-group">
            <Button label="Copy Link" onClick={() => copyLink()} />
            <Button type="dismiss" label="Skip" onClick={handleClick} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Share;
