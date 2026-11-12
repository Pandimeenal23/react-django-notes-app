import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Note from "../components/Note";
import CreateArea from "../components/CreateArea";
import EditModal from "../components/EditModal";
import DeleteModal from "../components/DeleteModal";
import { toast } from "react-toastify";
import { fetchWithAuth } from "../utils/auth";


function Home() {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
 


  useEffect(() => {
    fetchWithAuth("http://127.0.0.1:8000/api/notes/")
    .then((response) => response.json())
    .then((data) => {
      setNotes(data);
      setLoading(false);
    })
    .catch((error) => {
     console.error("Error fetching notes:", error);
     setLoading(false);
    });
  }, []);

function addNote(newNote) {
  fetchWithAuth("http://127.0.0.1:8000/api/notes/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newNote),
  })
    .then(async (response) => {
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Failed to add note");
      }

      toast.success("Note Added Successfully!");

      return fetchWithAuth("http://127.0.0.1:8000/api/notes/");
    })
    .then((res) => res.json())
    .then((data) => {
      setNotes(data);
    })
    .catch((error) => {
      console.error(error);
      toast.error(error.message);
    });
}

function openDeleteModal(note) {
  setNoteToDelete(note);
  setShowDeleteModal(true);
}

function closeDeleteModal() {
  setShowDeleteModal(false);
}

function deleteNote(id) {
  fetchWithAuth(`http://127.0.0.1:8000/api/notes/${id}/delete/`, {
    method: "DELETE",
  })
    .then(() => {
      toast.success("Note Deleted!");

      return fetchWithAuth("http://127.0.0.1:8000/api/notes/");
    })
    .then((res) => res.json())
    .then((data) => {
      setNotes(data);
    })
    .catch((error) => {
      console.error("Error deleting note:", error);
      toast.error("Failed to delete note!");
    });
}


function openEditModal(note) {
  setSelectedNote(note);
  setShowModal(true);
}

function closeEditModal() {
  setShowModal(false);
}


function updateNote(id, updatedNote) {
  fetchWithAuth(`http://127.0.0.1:8000/api/notes/${id}/update/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedNote),
  })
    .then((response) => response.json())
    .then(() => {
      toast.success("Note Updated!");

      return fetchWithAuth("http://127.0.0.1:8000/api/notes/");
    })
    .then((res) => res.json())
    .then((data) => {
      setNotes(data);
    })
    .catch((error) => {
      console.error("Error updating note:", error);
      toast.error("Failed to update note!");
    });
}

const filteredNotes = notes.filter((note) =>
  note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  note.content.toLowerCase().includes(searchTerm.toLowerCase())
);

if (loading) {
  return (
    <div>
      <Header />
      <div className="loading">
        <h2>⏳ Loading notes...</h2>
      </div>
      <Footer />
    </div>
  );
}
  return (
    <div>
      <Header onSearch={setSearchTerm} />
      {!showModal && <CreateArea onAdd={addNote} />}

      <div className="notes-container">
  {notes.length === 0 ? (

    <div className="empty-search">
      <h2>📝</h2>
      <h3>No Notes Yet</h3>
      <p>Create your first note!</p>
    </div>

  ) : filteredNotes.length > 0 ? (

    filteredNotes.map((noteItem) => (
      <Note
        key={noteItem.id}
        id={noteItem.id}
        title={noteItem.title}
        content={noteItem.content}
        createdAt={noteItem.created_at}
        updatedAt={noteItem.updated_at}
        onDelete={() => openDeleteModal(noteItem)}
        onEdit={() => openEditModal(noteItem)}
      />
    ))

  ) : (

    <div className="empty-search">
      <h2>🔍</h2>
      <h3>No matching notes found</h3>
      <p>Try searching with a different keyword.</p>
    </div>

  )}
</div>

      {showModal && (
        <EditModal
        note={selectedNote}
        onClose={closeEditModal}
        onSave={updateNote}
        />
      )}

      {showDeleteModal && (
  <DeleteModal
    note={noteToDelete}
    onClose={closeDeleteModal}
    onDelete={deleteNote}
  />
)}
      <Footer />
    </div>
  );
}

export default Home;
