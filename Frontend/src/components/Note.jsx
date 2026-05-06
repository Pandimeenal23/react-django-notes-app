import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';

function Note(props) {
  function handleClick() {
    props.onDelete(props.id);
  }
  

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={() => props.onEdit({
      id: props.id,
      title: props.title,
      content: props.content
})}>
  <EditIcon />
</button>
      <button onClick={handleClick}>
        <DeleteIcon />
      </button>
    </div>
  );
}

export default Note;
