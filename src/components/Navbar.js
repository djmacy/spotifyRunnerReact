import React from 'react';
import logo from "../images/spotifyRunnerLogo.png";
import './Navbar.css'

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="text-logo-container">
                <div className="logo">
                    <img src={logo} alt="Logo"/>
                </div>
                <div className="spotify-text">
                    <span>Spotify</span>
                    <span>Runner</span>
                </div>
            </div>
            <div className="navbar-right">
                <a href="#discover">Discover</a>
                <a href="#playlists">Playlists</a>
                <a href="#profile">Liked Songs</a>
                <a href="#settings">Login</a>
            </div>
        </div>
    );
};

export default Navbar;