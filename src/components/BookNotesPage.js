import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotes, createNote } from '../features/note/noteSlice';
import { useParams } from 'react-router-dom';

const BookNotesPage = () => {
  const { bookId } = useParams();
  const dispatch = useDispatch();
  
  const { loading, error, notes } = useSelector((state) => state.notes || {}); 
  const isLoading = loading || !notes;

  useEffect(() => {
    dispatch(fetchNotes(bookId));
  }, [dispatch, bookId]);

  const [noteContent, setNoteContent] = useState('');

  const handleNoteSubmit = (e) => {
    e.preventDefault();
    dispatch(createNote({ bookId, content: noteContent }))
      .then(() => {
        setNoteContent('');
      })
      .catch((error) => {
        console.error('Failed to create note:', error);
        // Handle error here, such as displaying a toast message
      });
  };

  return (
    <div>
      <h1>Book Notes</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {error ? (
            <p>Error: {error}</p>
          ) : (
            <>
              {notes && notes.length > 0 ? (
                <>
                  {/* Display book information on the left */}
                  <div className="book-info">
                    {/* Display book information such as title, author, cover image, etc. */}
                  </div>
                  {/* Display notes management section on the right */}
                  <div className="notes-section">
                    <h2>Notes</h2>
                    {/* Render notes here */}
                    {notes.map((note) => (
                      <div key={note._id} className="note">
                        <p>{note.content}</p>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  {/* No notes found for this book */}
                  <p>No notes found for this book.</p>
                </>
              )}
              {/* Add a form to add notes */}
              <form onSubmit={handleNoteSubmit}>
                <textarea
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  placeholder="Enter your note here..."
                  required
                />
                <button type="submit">Add Note</button>
              </form>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default BookNotesPage;