import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Dashboard = () => {
  const navigate = useNavigate()
  const { user } = useSelector(state => state.auth)

  useEffect(() => {
    if (!user) navigate('/login')
  }, [user, navigate])

  return (
      <>
        <section className='heading'>
          <h1 className='transform'>Welcome, {user && user.name}</h1>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button className='btn' onClick={() => navigate('/books')}>See My Books</button>
          </div>
        </section>
      </>
  )
}

export default Dashboard

// import React from 'react';
// import { useSelector } from 'react-redux';
// import Searchbar from './Searchbar'; // Import your SearchBar component
// import BookList from './BookList'; // Assuming you have a BookList component to display search results

// const Dashboard = () => {
//   const books = useSelector((state) => state.books.books);

//   return (
//     <div>
//       <h1>Dashboard</h1>
//       <Searchbar /> {/* Include your SearchBar component here */}
//       <div>
//         <h2>Search Results:</h2>
//         <BookList books={books} /> {/* Assuming you pass books to BookList component */}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;