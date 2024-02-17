// frontend/src/features/note/noteService.js

import axios from 'axios';

const API_URL = '/api/books';

export const fetchNotesForBook = async (bookId, userData) => {
    try {
      const response = await axios.get(`${API_URL}/${bookId}/notes`, {
        headers: {
          Authorization: `Bearer ${userData.token}`
        }
      });
  
      // Check if response.data is empty or undefined
      if (!response.data || response.data.length === 0) {
        return []; // Return an empty array if there are no notes
      }
  
      return response.data;
    } catch (error) {
      // Handle error here
      throw new Error(error.response?.data?.message || 'An error occurred while fetching notes');
    }
  };

export const createNote = async (bookId, content, userData) => {
  try {
    const response = await axios.post(`${API_URL}/${bookId}/notes`, { content }, {
      headers: {
        Authorization: `Bearer ${userData.token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const updateNote = async (bookId, noteId, content, userData) => {
  try {
      const response = await axios.put(`${API_URL}/${bookId}/notes/${noteId}`, { content }, {
        headers: {
            Authorization: `Bearer ${userData.token}`
          }
      });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const deleteNote = async (bookId, noteId, userData) => {
  try {
      const response = await axios.delete(`${API_URL}/${bookId}/notes/${noteId}`, {
        headers: {
            Authorization: `Bearer ${userData.token}`
          }
      });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

