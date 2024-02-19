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
      .then(() => {
        window.location.href = `/books/${bookId}/notes`;
      })
      .catch((error) => {
        console.error('Failed to update note:', error);
      });
  };

  const handleNoteDelete = () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      dispatch(deleteNote({ noteId, bookId }))
        .then(() => {
          window.location.href = `/books/${bookId}/notes`;
        })
        .catch((error) => {
          console.error('Failed to delete note:', error);
        });
    }
  };

  return (
    <div>
      <h1>Edit Note</h1>
      <div className='noteForm'>
        <textarea
          className='noteFormText'    
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          placeholder="Enter your note here..."
          required
        />
          <button onClick={handleNoteUpdate}>Update Note</button>
          <button onClick={handleNoteDelete}>Delete Note</button>
      </div>
    </div>
  );
};

export default NoteDetailPage;