import React from 'react'
import { FaSignInAlt, FaSignOutAlt, FaUser, FaSearch, FaBookmark } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import logo from '../downloads/logo.png'

const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)

    const logoutFn = () => { 
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

    return (
    
    <header className='header'>
        <div className='logo'>
            <Link to="/">
                <img src={ logo } alt="BookKeep" id="logo" />
            </Link>
        </div>    
            <ul>
                {user ? (
                    <>
                        <li>
                            <Link to="/books">
                                <FaBookmark />My Books
                            </Link>
                        </li>
                        <li>
                            <Link to="/search" >
                                <FaSearch /> Search
                            </Link>
                        </li>
                        <li>
                            <button className='btn' onClick={logoutFn}>
                                <FaSignOutAlt /> Logout
                            </button>    
                        </li>
                    </>
                ) : (       
                    <>
                        <li>
                            <Link to="/login">
                                <FaSignInAlt /> Login
                            </Link>    
                        
                        </li>
                        <li>
                            <Link to="/register">
                                <FaUser /> Register
                            </Link>  
                        </li>
                    </>
                )}
            </ul>  
    </header>
  )
}

export default Header