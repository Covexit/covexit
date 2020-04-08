import React from 'react';
import './Share.scss';
import share from "../../assets/share.svg";

class Share extends React.Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);

    this.state = {
      showModal: false,
      copySuccess: false,

    };
  }

  handleClick() {
    if (!this.state.showModal) {
      // attach/remove event handler
      document.addEventListener('click', this.handleOutsideClick, false);
    } else {
      document.removeEventListener('click', this.handleOutsideClick, false);
    }

    this.setState(prevState => ({
       showModal: !prevState.showModal,
    }));
  }

  handleOutsideClick(e) {
    // ignore clicks on the component itself
    if (this.node.contains(e.target)) {
      return;
    }

    this.handleClick();
  }

   copyCodeToClipboard = () => {
    this.urlRef.select()
    document.execCommand("copy")
    this.setState({copySuccess: true})
      setTimeout(() => {
          this.setState(prevState => ({
       copySuccess: !prevState.copySuccess,
       showModal: !prevState.showModal,
    }))
         }, 3000);

  }

  render() {
    return (
      <div className="Share" ref={node => { this.node = node; }}>
        <button className="Share-toggle"
          onClick={this.handleClick}
        ><img src={share} alt="Share Icon" className="Share-icon" />
         Share
        </button>
        {this.state.showModal && (
          <div className="modal">
          <div className ="message">Share Covexit with others and help during this crisis.
          </div>

          <input id="copy"

            ref={(urlRef) => this.urlRef = urlRef}
            value={window.location.href}

          />

            {
          this.state.copySuccess ?
            <div id="copy">
           ∞ copied!
            </div> : null

           }

          <button class="Btn" onClick={() => this.copyCodeToClipboard()}>
            Copy Link
          </button>


          <button class="skip" onClick={this.handleClick}>
            Skip
          </button>
          </div>

         )}
      </div>
    );
  }
}



export default Share;
