// frontend/src/app/store.js

import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import bookReducer from '../features/book/bookSlice';
import noteReducer from '../features/note/noteSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    books: bookReducer,
    notes: noteReducer,
  },
});
