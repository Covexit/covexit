import React, { useState, useRef } from "react";
import "./Share.scss";
import share from "../../assets/share.svg";

function Share() {

  const [modalShow, setModalShow] = useState(false);
  const [copySuccess, setcopySuccess] = useState(false);
  const message = "Share Covexit with others and help during this crisis.";
  const inputRef = useRef(null);
  const urlRef = window.location.href;

  function copyLink() {
    inputRef.current.select();
    document.execCommand("copy");
    setcopySuccess("∞ copied!");
    setTimeout(() => {
      setModalShow(false);
      setcopySuccess(false);
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
          <div className="Message">{message}</div>
          <input className="Copy-Link" ref={inputRef} value={urlRef} />

          <div class="Success">{copySuccess}</div>

          <div className="Btn-group">
            <button
              className="Btn"
              onClick={() => copyLink(document.execCommand("copy"))}
            >
              Copy Link
            </button>

            <button
              className="Btn--Secondary"
              onClick={() => setModalShow(false)}
            >
              Skip
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Share;
