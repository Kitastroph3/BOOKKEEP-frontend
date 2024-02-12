import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllBooks, deleteBook } from '../features/book/bookSlice';
import { Link } from 'react-router-dom'; // Import Link from React Router

const MyBooksList = () => {
  const dispatch = useDispatch();
  const { books, loading, error } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchAllBooks());
  }, [dispatch]);

  const handleDelete = async (bookId) => {
    try {
      await dispatch(deleteBook(bookId));
      window.location.reload(); // Refresh the page after successful deletion
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div>
      <h1>My Books</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {books.length === 0 && <p>No books found.</p>}
      {books.length > 0 && (
        <ul>
          {books.map((book) => (
            <li key={book._id}>
              <h3>{book.title}</h3>
              <p>Author: {book.author}</p>
              {book.coverImage && (
                <img src={book.coverImage} alt="Book Cover" style={{ maxWidth: '200px' }} />
              )}
              <button onClick={() => handleDelete(book._id)}>Delete</button>
              <Link to={`/books/${book._id}`}>Manage Notes</Link> {/* Add Link to BookNotesPage */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyBooksList;