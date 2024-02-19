// frontend/src/App.js

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Searchbar from './components/Searchbar'
import MyBooksList from './components/MyBooksList';
import BookNotesPage from './components/BookNotesPage'; // Import the BookNotesPage component
import NoteDetailPage from './components/NoteDetailPage';
import MobileHeader from './components/MobileHeader';
import { useMediaQuery } from 'react-responsive'

function App() {
  const isMobile = useMediaQuery({ maxWidth: 600 });

  return (
    <>
      <Router>
        {isMobile ? <MobileHeader /> : <Header />}
        <div className='container'>
          <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path="/books" element={<MyBooksList />} />
              <Route path="/books/:bookId/notes" element={<BookNotesPage />} /> {/* Route for managing notes */}
              <Route path="/search" element={<Searchbar />} />
              <Route path='/books/:bookId/notes/:noteId' element={<NoteDetailPage />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;