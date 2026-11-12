import React, { useState } from "react";

function EditModal(props) {

  const [editedNote, setEditedNote] = useState({
    title: props.note.title,
    content: props.note.content,
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setEditedNote((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSave() {
    props.onSave(props.note.id, editedNote);
    props.onClose();
  }

  return (
    <div className="modal-overlay">

      <div className="modal">

        <div className="modal-header">

          <h2>✏️ Edit Note</h2>

          <button
            className="close-btn"
            onClick={props.onClose}
          >
            &times;
          </button>

        </div>

        <div className="modal-body">

          <label>TITLE</label>

          <input
            type="text"
            name="title"
            value={editedNote.title}
            onChange={handleChange}
          />

          <label>CONTENT</label>

          <textarea
            rows="6"
            name="content"
            value={editedNote.content}
            onChange={handleChange}
          />

        </div>

        <div className="modal-footer">

          <button
            className="cancel-btn"
            onClick={props.onClose}
          >
            Cancel
          </button>

          <button
            className="save-btn"
            onClick={handleSave}
          >
            Save Changes
          </button>

        </div>

      </div>

    </div>
  );
}

export default EditModal;