import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);
  const [editNote, setEditNote] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/notes/")
      .then((response) => response.json())
      .then((data) => {
        setNotes(data);
      })
      .catch((error) => {
        console.error("Error fetching notes:", error);
      });
  }, []);

function addNote(newNote) {
  fetch("http://127.0.0.1:8000/api/notes/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newNote),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Response:", data);

      return fetch("http://127.0.0.1:8000/api/notes/");
    })
    .then((res) => res.json())
    .then((data) => {
      setNotes(data);   
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function deleteNote(id) {
  fetch(`http://127.0.0.1:8000/api/notes/${id}/delete/`, {
    method: "DELETE",
  })
    .then((response) => {
      console.log("Delete status:", response.status);
      return fetch("http://127.0.0.1:8000/api/notes/");
    })
    .then((res) => res.json())
    .then((data) => {
      setNotes(data);  
    })
    .catch((error) => {
      console.error("Error deleting note:", error);
    });
}

function handleEdit(note) {
  setEditNote(note);
}

function updateNote(updatedNote) {
  fetch(`http://127.0.0.1:8000/api/notes/${editNote.id}/update/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedNote),
  })
    .then((res) => res.json())
    .then(() => {
      return fetch("http://127.0.0.1:8000/api/notes/");
    })
    .then((res) => res.json())
    .then((data) => {
      setNotes(data);
      setEditNote(null);   
    })
     .catch((err) => console.error(err));
}

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} 
      onUpdate={updateNote}
      editNote={editNote} />
      {notes.map((noteItem) => {
        return (
          <Note
            key={noteItem.id}        
            id={noteItem.id}        
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
            onEdit={handleEdit}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
