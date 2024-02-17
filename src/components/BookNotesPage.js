// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchNotes, createNote, updateNote, deleteNote } from '../features/note/noteSlice';
// import { useParams } from 'react-router-dom';

// const BookNotesPage = () => {
//   const { bookId } = useParams();
//   const dispatch = useDispatch();
//   const { loading, error, notes } = useSelector((state) => state.notes || {});
//   const isLoading = loading || !notes;

//   useEffect(() => {
//     dispatch(fetchNotes(bookId));
//   }, [dispatch, bookId]);

//   const [noteContent, setNoteContent] = useState('');
//   const [editingNoteId, setEditingNoteId] = useState(null);

//   const handleNoteSubmit = (e) => {
//     e.preventDefault();
//     if (editingNoteId) {
//       // If editingNoteId is set, update the note
//       dispatch(updateNote({ bookId, noteId: editingNoteId, content: noteContent }))
//         .then(() => {
//           setEditingNoteId(null);
//           setNoteContent('');
//         })
//         .catch((error) => {
//           console.error('Failed to update note:', error);
//           // Handle error here, such as displaying a toast message
//         });
//     } else {
//       // If editingNoteId is not set, create a new note
//       dispatch(createNote({ bookId, content: noteContent }))
//         .then(() => {
//           setNoteContent('');
//         })
//         .catch((error) => {
//           console.error('Failed to create note:', error);
//           // Handle error here, such as displaying a toast message
//         });
//     }
//   };

//   const handleEditNote = (noteId, noteContent) => {
//     // Set the note content and editingNoteId when editing a note
//     setNoteContent(noteContent);
//     setEditingNoteId(noteId);
//   };

//   const handleDeleteNote = (noteId) => {
//     dispatch(deleteNote({ noteId, bookId }));
//   };

//   return (
//     <div>
//       <h1>Book Notes</h1>
//       {isLoading ? (
//         <p>Loading...</p>
//       ) : (
//         <>
//           {error ? (
//             <p>Error: {error}</p>
//           ) : (
//             <>
//               {notes && notes.length > 0 ? (
//                 <>
//                   {/* Display book information */}
//                   <div className="book-info">
//                     {/* Display book information such as title, author, cover image, etc. */}
//                   </div>
//                   {/* Display notes */}
//                   <div className="notes-section">
//                     <h2>Notes</h2>
//                     {/* Render notes */}
//                     {notes.map((note) => (
//                       <div key={note._id} className="note">
//                         <p>{note.content}</p>
//                         <button onClick={() => handleEditNote(note._id, note.content)}>Edit</button>
//                         <button onClick={() => handleDeleteNote(note._id)}>Delete</button>
//                       </div>
//                     ))}
//                   </div>
//                 </>
//               ) : (
//                 <>
//                   {/* No notes found for this book */}
//                   <p>No notes found for this book.</p>
//                 </>
//               )}
//               {/* Add a form to add/update notes */}
//               <form onSubmit={handleNoteSubmit}>
//                 <textarea
//                   value={noteContent}
//                   onChange={(e) => setNoteContent(e.target.value)}
//                   placeholder="Enter your note here..."
//                   required
//                 />
//                 <button type="submit">{editingNoteId ? 'Update Note' : 'Add Note'}</button>
//               </form>
//             </>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default BookNotesPage;
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotes, createNote, deleteNote } from '../features/note/noteSlice';
import { Link, useParams } from 'react-router-dom';

const BookNotesPage = () => {
  const { bookId } = useParams();
  const dispatch = useDispatch();
  const { loading, notes } = useSelector((state) => state.notes); // Corrected state destructuring
  const isLoading = loading || !notes;

  useEffect(() => {
    dispatch(fetchNotes(bookId));
  }, [dispatch, bookId]);

  const [noteContent, setNoteContent] = useState('');

  const handleNoteCreate = (e) => {
    e.preventDefault();
    dispatch(createNote({ bookId, content: noteContent }))
      .then(() => {
        setNoteContent('');
      })
      .catch((error) => {
        console.error('Failed to create note:', error);
      });
  };

  const handleNoteDelete = (noteId) => {
    dispatch(deleteNote({ bookId, noteId })); // Corrected parameter usage
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {notes && notes.length > 0 ? (
            <div className="notes-section">
              <h2>Notes</h2>
              {notes.map((note) => (
                <div key={note._id} className="note">
                  <p>{note.content}</p>
                  <Link to={`/books/${bookId}/notes/${note._id}`}>Edit</Link>
                  <button onClick={() => handleNoteDelete(note._id)}>Delete</button>
                </div>
              ))}
            </div>
          ) : (
            <p>No notes found for this book.</p>
          )}
          <form onSubmit={handleNoteCreate}>
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
    </div>
  );
};

export default BookNotesPage;