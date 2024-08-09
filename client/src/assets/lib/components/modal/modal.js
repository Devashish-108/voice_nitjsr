import React from "react";

import "./modal.css";

const Modal = (props) => {
  const handleModalClose = (evt) => {
    if (evt.target.className === "modal-parent-container") {
      props.onClose();
    }
  };
  return (
    props.open && (
      <div className="modal-parent-container" onClick={handleModalClose}>
        <div className="modal-main-container">
          <div className="modal-header-container">
            <span className="modal-close" onClick={props.onClose}>
              <span>&times;</span>
            </span>
          </div>
          <div className="modal-content-container">{props.children}</div>
        </div>
      </div>
    )
  );
};

export default Modal;
