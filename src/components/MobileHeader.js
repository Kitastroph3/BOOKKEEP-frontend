import React, { useState } from 'react';
import { FaSignOutAlt, FaBookmark, FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import logo from '../downloads/logo.png';

const MobileHeader = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const logoutFn = () => { 
        dispatch(logout());
        dispatch(reset());
        navigate('/');
    };

    return (
        <header className='header'>
            <div className='logo'>
                <Link to="/">
                    <img src={ logo } alt="BookKeep" id="logo" />
                </Link>
            </div>
            <div className='menu-icon' onClick={toggleMenu}>
                {isMenuOpen ? <FaTimes style={{ width: '30px', height: '30px' }}/> : <FaBars style={{ width: '30px', height: '30px' }} />}
            </div>
            <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
                    {isMenuOpen && (
                        <ul>
                            <li><Link to="/books"><FaBookmark /> My Books</Link></li>
                            <li><Link to="/search"><FaSearch /> Search</Link></li>
                            {user && <li><button className='btn' onClick={logoutFn}><FaSignOutAlt /> Logout</button></li>}
                        </ul>
                    )}
                </nav>
        </header>
    );
};

export default MobileHeader;