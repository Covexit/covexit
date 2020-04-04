import React from 'react';
import './Share.scss';
import Modal from "../Modal/Modal"
import share from "../../assets/share.svg";

class Share extends React.Component {
  state = {
    show: false
  };
  showModal = e => {
    this.setState({
      show: !this.state.show
    });
  };
    constructor(props) {
       super(props)

        this.state = {
        copySuccess: false
    }
  }
 copyCodeToClipboard = () => {
    const urlRef= window.location.href;
    this.urlRef.select();

    document.execCommand("copy")
    this.setState({copySuccess: true})

  }

  handleCopy (e) {
    e.preventDefault();
    e.clipboardData.setData("url","www.covexit.de");
  }
  render() {
    return (
      <div className="Share">
        <button
          class="toggle-button"
          id="centered-toggle-button"
          onClick={e => {
            this.showModal(e);
          }}
        ><img src={share} alt="Share Icon" className="Share-icon" />
          {" "}
         Share{" "}
        </button>

        <Modal onClose={this.showModal} show={this.state.show}>
          <p class="message">Share Covexit and help others with this crisis.</p>
         {
          this.state.copySuccess ?
            <div id="success">
           ∞ copied!
            </div> : null

           }
          <input id="copy"
            disabled
            ref={(urlRef) => this.urlRef = urlRef}
            placeholder="www.covexit.de"
          />


   <button class="Btn" onClick={() => this.copyCodeToClipboard()}>
            Copy Link
          </button>

        </Modal>
</div>
    );
  }
}

export default Share;
