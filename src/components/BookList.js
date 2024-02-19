// frontend/src/components/BookList.js

const BookList = ({ books, handleSaveBook }) => {
  return (
    <div className="book-list">
      {books.map((book, index) => (
        <div className="book-item" key={index}>
          <h3 className="title">{book.title}</h3>
          <p className="title">{book.author}</p>
          <p className="title">Published: {book.published}</p>
          <button onClick={() => handleSaveBook(book)}>Save</button>
          {book.coverImage ? (
            <div>
            <img src={book.coverImage} alt={book.title} />
            </div>
          ) : (
            <div className="placeholder">No Cover Image Available</div>
          )}
          <p className="bookdesc">{book.description.value}</p>
        </div>
      ))}
    </div>
  );
};

export default BookList;
