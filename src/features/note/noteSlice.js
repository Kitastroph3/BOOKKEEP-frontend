import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchNotesForBook, createNote as createNoteAPI, updateNote as updateNoteAPI, deleteNote as deleteNoteAPI } from './noteService';

export const fetchNotes = createAsyncThunk('notes/fetchNotes', async (bookId, { getState, rejectWithValue }) => {
  try {
    const userData = getState().auth.user; 
    return await fetchNotesForBook(bookId, userData);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const createNote = createAsyncThunk('notes/createNote', async ({ bookId, content }, { getState, rejectWithValue }) => {
  try {
    const userData = getState().auth.user; 
    return await createNoteAPI(bookId, content, userData);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const updateNote = createAsyncThunk('notes/updateNote', async ({ noteId, content }, { getState, rejectWithValue }) => {
  try {
    const userData = getState().auth.user; 
    return await updateNoteAPI(noteId, content, userData);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const deleteNote = createAsyncThunk('notes/deleteNote', async (noteId, { getState, rejectWithValue }) => {
  try {
    const userData = getState().auth.user; 
    return await deleteNoteAPI(noteId, userData);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const noteSlice = createSlice({
  name: 'notes',
  initialState: {
    notes: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.loading = false;
        state.notes.push(action.payload);
      })
      .addCase(createNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default noteSlice.reducer;