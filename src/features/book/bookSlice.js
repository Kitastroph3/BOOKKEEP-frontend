import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchBooks, saveBook as saveBookAPI, deleteBook as deleteBookAPI, deleteAllnotes } from './bookService';

// Async thunk to fetch all books
export const fetchAllBooks = createAsyncThunk('books/fetchAll', async (_, { rejectWithValue, getState }) => {
  try {
    const userData = getState().auth.user; // Get user data from the state
    return await fetchBooks(userData);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Async thunk to save a book
export const saveBook = createAsyncThunk('books/save', async (bookData, { rejectWithValue, getState }) => {
  try {
    const userData = getState().auth.user;
    const updatedBookData = {
      ...bookData,
      desc: bookData.description ? bookData.description.value : 'No description available'
    };
    return await saveBookAPI(updatedBookData, userData);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Async thunk to delete a book and notes
export const deleteBook = createAsyncThunk('books/delete', async (bookId, { rejectWithValue, getState }) => {
  try {
    const userData = getState().auth.user; // Get user data from the state
    await deleteBookAPI(bookId, userData);
    await deleteAllnotes(bookId, userData);
    return { bookId };
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const bookSlice = createSlice({
  name: 'books',
  initialState: {
    books: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(fetchAllBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(saveBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveBook.fulfilled, (state, action) => {
        state.loading = false;
        state.books.push(action.payload.book);
      })
      .addCase(saveBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.loading = false;
        state.books = state.books.filter(book => book._id !== action.payload.bookId);
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default bookSlice.reducer;