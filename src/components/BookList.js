// frontend/src/components/BookList.js

const BookList = ({ books, handleSaveBook }) => {
  return (
    <div className="book-list">
      {books.map((book, index) => (
        <div className="book-item" key={index}>
          <h3>{book.title}</h3>
          <p>Author: {book.author}</p>
          {book.coverImage ? (
            <img src={book.coverImage} alt={book.title} />
          ) : (
            <div className="placeholder">No Cover Image Available</div>
          )}
          <button onClick={() => handleSaveBook(book)}>Save</button>
        </div>
      ))}
    </div>
  );
};

export default BookList;
