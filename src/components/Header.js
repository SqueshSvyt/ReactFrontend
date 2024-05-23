// Header.js
import React from 'react';
import {Link} from 'react-router-dom';
import Logo from '../assets/images/Logo_bird2.jpg';
import '../assets/css/header.css';

const Header = () => {
    let checker = false

    const isLogged = () => {
        // Get the user data from localStorage
        let user = localStorage.getItem('user');

        checker = !!user;
    };

    const logoutUser = () => {
        localStorage.removeItem('jwt');
        localStorage.removeItem('user');
        localStorage.removeItem('id');
        window.location.href = '/';
    }

    const isSuperuser = () => {
        // Get the user data from localStorage
        const user = JSON.parse(localStorage.getItem('user'));
        // Check if user exists and if it has a superuser property
        return user && user.superuser;
    };

    isLogged()

    return (
        <header className="header-outer">
            <div className="header-inner responsive-wrapper-navbar">
                <div className="header-logo">
                    <img src= {Logo} alt="Not Found" />
                </div>
                <nav className="header-navigation">
                    <Link to="/">Home</Link>
                    <Link to="/about_us">About</Link>
                    {checker ? (
                        <>

                            {isSuperuser() && <Link to="/admin">Admin</Link>}
                            <Link to="/userplaylist">Playlists</Link>
                            <Link to="/profile">Profile</Link>
                            <Link to="/" onClick={logoutUser}>Log Out</Link>
                        </>
                    ) : (
                        <>

                            <Link to="/login">Log In</Link>
                            <Link to="/register">Register</Link>
                        </>
                    )}
                    <button>Menu</button>
                </nav>
            </div>
        </header>
    );
};

export default Header;
