import axios from 'axios';

const API_URL = '/api/books';

// Function to save a book with user data
export const saveBook = async (bookData, userData) => {
    try {
        const response = await axios.post(API_URL, { ...bookData, userId: userData.id, desc: bookData.desc, key: bookData.key, coverImage: bookData.coverImage }, {
            headers: {
                Authorization: `Bearer ${userData.token}` // Include the user's token in the request headers
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

// Function to fetch all saved books for a user
export const fetchBooks = async (userData) => {
    try {
        const response = await axios.get(API_URL, {
            headers: {
                Authorization: `Bearer ${userData.token}` // Include the user's token in the request headers
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

// Function to delete a saved book
export const deleteBook = async (bookId, userData) => {
    try {
        const response = await axios.delete(`${API_URL}/${bookId}`, {
            headers: {
                Authorization: `Bearer ${userData.token}` // Include the user's token in the request headers
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

export const deleteAllnotes = async (bookId, userData) => { 
    try {
        const response = await axios.delete(`${API_URL}/${bookId}/notes`, {
            headers: {
                Authorization: `Bearer ${userData.token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}