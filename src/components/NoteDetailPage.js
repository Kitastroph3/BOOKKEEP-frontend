//frontend\src\components\NoteDetailPage.js

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateNote, deleteNote } from '../features/note/noteSlice';

const NoteDetailPage = () => {
  const { bookId, noteId } = useParams();
  const dispatch = useDispatch();
  const { notes } = useSelector((state) => state.notes || {});
  const [noteContent, setNoteContent] = useState('');

  useEffect(() => {
    const note = notes.find(note => note._id === noteId);
    if (note) {
      setNoteContent(note.content);
    }
  }, [notes, noteId]);

  const handleNoteUpdate = () => {
    dispatch(updateNote({ bookId, noteId, content: noteContent }))
      .catch((error) => {
        console.error('Failed to update note:', error);
        // Handle error here, such as displaying a toast message
      });
  };

  const handleNoteDelete = () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      dispatch(deleteNote({ noteId, bookId }))
        .catch((error) => {
          console.error('Failed to delete note:', error);
          // Handle error here, such as displaying a toast message
        });
    }
  };

  return (
    <div>
      <h2>Note Detail</h2>
      <textarea
        value={noteContent}
        onChange={(e) => setNoteContent(e.target.value)}
        placeholder="Enter your note here..."
        required
      />
      <button onClick={handleNoteUpdate}>Update Note</button>
      <button onClick={handleNoteDelete}>Delete Note</button>
    </div>
  );
};

export default NoteDetailPage;