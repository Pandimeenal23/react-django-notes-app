import React from "react";

function DeleteModal(props) {

  function handleDelete() {
    props.onDelete(props.note.id);
    props.onClose();
  }

  return (
    <div className="modal-overlay">

      <div className="modal">

        <div className="modal-header">

          <h2>🗑️ Delete Note</h2>

          <button
            className="close-btn"
            onClick={props.onClose}
          >
            &times;
          </button>

        </div>

        <div className="modal-body">

          <p>
            Are you sure you want to delete this note?
          </p>

          <p style={{ color: "red", fontWeight: "bold" }}>
            This action cannot be undone.
          </p>

        </div>

        <div className="modal-footer">

          <button
            className="cancel-btn"
            onClick={props.onClose}
          >
            Cancel
          </button>

          <button
            className="delete-btn"
            onClick={handleDelete}
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}

export default DeleteModal;