
import React from "react";
import ReactDOM from "react-dom";
import "./ErrorModal.css";

const ErrorModal = (props) => {
  return ReactDOM.createPortal(
    <div className="ErrorModalOverlay" onClick={props.onConfirm}>
      <div className="ErrorModal">
        <header>
          <h2>{props.title}</h2>
        </header>
        <div>
          <p>{props.message}</p>
        </div>
        <footer>
          <button onClick={props.onConfirm}>Okay</button>
        </footer>
      </div>
    </div>,
    document.getElementById("portal-root")
  );
};

export default ErrorModal;