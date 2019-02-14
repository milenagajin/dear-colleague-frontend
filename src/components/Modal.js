import React from "react";

const Modal = ({ inputName, inputValue, handleChange, handleSubmit }) => {
  return (
    <div
      className="modal fade"
      id="voteModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="voteModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Vote for colleague
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <input
              name={ inputName }
              value={ inputValue }
              onChange={ handleChange }
            />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <div>
              <input
                type="submit"
                value="SUBMIT"
                onClick={ handleSubmit }
                className="btn btn-primary"
                data-dismiss="modal"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
