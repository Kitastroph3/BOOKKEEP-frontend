import React from 'react';

const NoteItem = ({ note, onUpdate, onDelete }) => {
  return (
    <div className="note">
      <p>{note.content}</p>
      <button onClick={() => onUpdate(note)}>Update</button>
      <button onClick={() => onDelete(note._id)}>Delete</button>
    </div>
  );
};

export default NoteItem;