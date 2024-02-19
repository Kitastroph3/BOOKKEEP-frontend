import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllBooks, deleteBook } from '../features/book/bookSlice';
import { Link } from 'react-router-dom'; 
import Spinner from './Spinner';

const MyBooksList = () => {
  const dispatch = useDispatch();
  const { books, loading, error } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchAllBooks());
  }, [dispatch]);

  const handleDelete = async (bookId) => {
    try {
      const confirm = window.confirm('Are you sure you want to delete this book?');
      if (confirm) {
        await dispatch(deleteBook(bookId));
        window.location.reload(); 
      }
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div>
      <h1>My Books</h1>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {error && <p>Error: {error}</p>}
          {books.length === 0 && <p>No books found.</p>}
          {books.length > 0 && (
            <div className='book-list'>
              {books.map((book) => (
                <div className='book-item' key={book._id}>
                  <h3 className='title'>{book.title}</h3>
                  <p className='title'>Author: {book.author}</p>
                  {book.coverImage && (
                    <div>
                      <img src={book.coverImage} alt="Book Cover" style={{ maxWidth: '200px' }} />
                    </div>
                  )}
                  {/* <p>{ book.desc }</p> */}
                  <div>  
                    <button className='wdthbtns'>
                      <Link to={`/books/${book._id}/notes`} className='manage'>Manage Notes</Link> {/* Add Link to BookNotesPage */}
                    </button> 
                    <button className='wdthbtns' onClick={() => handleDelete(book._id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MyBooksList;