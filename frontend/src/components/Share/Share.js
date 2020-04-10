import React, { useState, useRef } from "react";
import "./Share.scss";
import share from "../../assets/share.svg";
import Button from "../Button/Button";


function Share() {

  const [modalShow, setModalShow] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const message = "Share Covexit with others and help during this crisis.";
  const inputRef = useRef();
  const urlRef = window.location.href;

  function copyLink() {
    inputRef.current.select();
    setCopySuccess(" ∞ copied! ");
    setTimeout(() => {
      setModalShow(false);
      setCopySuccess(false);
    }, 3000);
  }

  return (
    <div className="Share">
      <button className="Share-toggle" onClick={() => setModalShow(!modalShow)}>
        <img src={share} alt="Share Icon" className="Share-icon" />
        Share
      </button>

      <div className={`Modal Modal--${modalShow ? "opened" : "closed"}`}>
        <div className="Modal-body">
          <div className="Share-message">{message}</div>
          <input className="Share-copy" ref={inputRef} value={urlRef} />

             <div className="Share-success">{copySuccess}</div>

      <div className="Btn-group">
            <Button
              label="Copy Link"
              onClick={() => copyLink(document.execCommand("copy"))}
            />

            <Button
              type="dismiss"
              label="Skip"
              onClick={() => setModalShow(false)}
             />
        </div>
        </div>
      </div>
    </div>
  );
}

export default Share;

