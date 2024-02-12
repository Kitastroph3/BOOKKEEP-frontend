import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { saveBook } from '../features/book/bookSlice';
import BookList from './BookList';

const Searchbar = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      const encodedQuery = encodeURIComponent(query);
      const response = await axios.get(`http://openlibrary.org/search.json?title=${encodedQuery}&limit=60`);
      const books = response.data.docs.map(book => ({
        title: book.title,
        author: (book.author_name && book.author_name.length > 0) ? book.author_name[0] : 'Unknown',
        coverImage: book.cover_i ? `http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : null,
        key: book.key,
        author_key: book.author_key
      }));
      console.log(response);
      setSearchResults(books);
      console.log(books);
    } catch (error) {
      setError('Failed to search books');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveBook = (book) => {
    dispatch(saveBook(book));
  };

  return (
    <>
      <div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for books..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        <BookList books={searchResults} handleSaveBook={handleSaveBook} />
      </div>
    </>
  );
};

export default Searchbar;