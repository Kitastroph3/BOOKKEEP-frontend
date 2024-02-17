import React from 'react';
import NoteItem from './NoteItem'; // Import NoteItem component

const NoteList = ({ notes, onDeleteNote }) => {
  return (
    <div className="notes-section">
      <h2>Notes</h2>
      {/* Render notes using NoteItem */}
      {notes.map((note) => (
        <NoteItem key={note._id} note={note} onDelete={onDeleteNote} />
      ))}
    </div>
  );
};

export default NoteList;