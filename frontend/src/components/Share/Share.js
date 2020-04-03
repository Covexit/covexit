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
    const url= "wwww.covexit.de"
    let value=url
    document.execCommand("copy")
    this.setState({copySuccess: true})

  }

  handleCopy (e) {
    e.preventDefault();
    e.clipboardData.setData("www.covexit.de");

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
          <h4>Share Covexit and help others with this crisis.</h4>
           <input
          type="text"
          value="wwww.covexit.de"
          onCopy={this.handleCopy}
         />

   <button class="Btn" onClick={() => this.copyCodeToClipboard()}>
            Copy Link       {
          this.state.copySuccess ?
            <div>
           ∞ copied!
            </div> : null

           }

          </button>

        </Modal>
</div>
    );
  }
}

export default Share;
