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

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Searchbar />
          <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path="/books" element={<MyBooksList />} />
              <Route path="/books/:bookId" element={<BookNotesPage />} /> {/* Route for managing notes */}
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;