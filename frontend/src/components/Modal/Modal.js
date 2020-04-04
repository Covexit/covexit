import React from "react";
import ReactDOM from "react-dom";
import "./Modal.scss";
import PropTypes from "prop-types";

export default class Modal extends React.Component {
  onClose = e => {
    this.props.onClose && this.props.onClose(e);
  };
  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div class="modal" className="modal">
        <div class="content">{this.props.children}</div>

          <button class="skip" onClick={this.onClose}>
           Skip
          </button>
        </div>

    );
  }
}
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
};


const rootElement = document.getElementById("root");
ReactDOM.render(<Modal />, rootElement);
