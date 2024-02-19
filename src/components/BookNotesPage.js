import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotes, createNote } from '../features/note/noteSlice';
import { Link, useParams } from 'react-router-dom';
import Spinner from './Spinner'
import { fetchAllBooks } from '../features/book/bookSlice';

const BookNotesPage = () => {
  const { bookId } = useParams();
  const dispatch = useDispatch();
  const { loading, notes, bookInfo } = useSelector((state) => ({
    loading: state.notes.loading,
    notes: state.notes.notes,
    bookInfo: state.books.books.find(book => book._id === bookId) 
  }));
  const isLoading = loading || !notes;

  useEffect(() => {
    dispatch(fetchNotes(bookId));
    dispatch(fetchAllBooks(bookId));
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

  // const handleNoteDelete = (noteId) => {
  //   dispatch(deleteNote({ bookId, noteId }));
  // };

  return (
    <div>
      <h1>Notes</h1>
      <div className='bookNotesPage'>
      {isLoading ? ( <Spinner />
      ) : (
        <>
          {bookInfo && (
            <div className="book-item myBook">
              <h3 className='title'>{bookInfo.title}</h3>
              <p>Author: {bookInfo.author}</p>
              {bookInfo.coverImage && <img src={bookInfo.coverImage} alt={bookInfo.title} />}
              <p>{bookInfo.desc}</p>
            </div>
          )}
              
            <div className='myNotes'>
              <form onSubmit={handleNoteCreate} className='noteForm'>
                <textarea
                  className='noteFormText'    
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  placeholder="Enter your note here..."
                  required
                />
                <button type="submit" className='notrsfm'>Add Note</button>
              </form>
                <h2 className='subhead'>Saved Notes</h2>  
              {notes && notes.length > 0 ? (
                <div className="notes-section">
                  {notes.map((note) => (
                    <div key={note._id} className="note">
                      <p>{note.content}</p>
                      <button className='noteActionBtns'>
                        <Link to={`/books/${bookId}/notes/${note._id}`} className='manage'>Edit</Link>
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No notes found for this book.</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BookNotesPage;