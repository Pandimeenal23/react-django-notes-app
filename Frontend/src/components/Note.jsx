import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

function Note(props) {

  function handleDelete() {
    props.onDelete(props.id);
  }

  function handleEdit() {
    props.onEdit();
  }

const createdDate = new Date(props.createdAt);
const updatedDate = new Date(props.updatedAt);


const isEdited =
  createdDate.getTime() !== updatedDate.getTime();

const displayDate = isEdited ? updatedDate : createdDate;

const formattedDate = displayDate.toLocaleString("en-IN", {
  dateStyle: "medium",
  timeStyle: "short",
});

  return (
    <div className="note">
      <h1>{props.title}</h1>

      <p>{props.content}</p>

      <hr className="note-divider" />

      <p className="note-date">
  <CalendarTodayIcon sx={{ fontSize: 12, color: "#999" }} />
  <span>
    {isEdited ? "Updated: " : "Created: "}
    {formattedDate}
  </span>
</p>


      <div className="note-buttons">
        <button onClick={handleEdit}>
          <EditIcon />
        </button>

        <button onClick={handleDelete}>
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
}

export default Note;