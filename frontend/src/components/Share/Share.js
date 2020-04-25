import React, { useState, useRef } from "react";
import "./Share.scss";
import share from "../../assets/share.svg";
import Button from "../Button/Button";
import Modal from '../Modal/Modal';

function Share() {
  const [modalShow, setModalShow] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const message = "Share Covexit with others and help during this crisis!";
  const urlRef = useRef();
  const url = window.location.href;
  const handleClick = () => {
    setModalShow(!modalShow);
  };

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
      {modalShow && <Modal onClose={() => setModalShow(false)} footer={
        <div className="Btn-group">
          <Button label="Copy Link" onClick={() => copyLink()} />
          <Button type="dismiss" label="Skip" onClick={handleClick} />
        </div>
      }>
        <div className="Share-message">{message}</div>
        <input className="TextInput-field"
          readOnly
          defaultValue={url}
          ref={urlRef}
        />
        <div className="Alert">{copySuccess}</div>
      </Modal>}
    </div>
  );
}

export default Share;
