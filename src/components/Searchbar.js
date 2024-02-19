import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { saveBook } from '../features/book/bookSlice';
import BookList from './BookList';
import Spinner from './Spinner';

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
      const books = await Promise.all(response.data.docs.map(async book => {
        const bookDataResponse = await axios.get(`http://openlibrary.org${book.key}.json`);
        const bookData = bookDataResponse.data;
        return {
          title: book.title,
          author: (book.author_name && book.author_name.length > 0) ? book.author_name[0] : 'Unknown',
          coverImage: book.cover_i ? `http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : null,
          key: book.key,
          author_key: book.author_key,
          description: bookData.description || 'No description available',
          published: book.first_publish_year
        };
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
      <div id="search">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for books..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div>
        {loading ? (
          <Spinner />
        ) : (
          <>
            {error && <p>Error: {error}</p>}
            <BookList books={searchResults} handleSaveBook={handleSaveBook} />
          </>
        )}
      </div>
    </>
  );
};

export default Searchbar;
