import React from 'react';
import './Header.css';
import logo from '../images/spotifyRunnerLogo.png';


const Header = () => {
    return (
        <header className="header">
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
                    <a href="#profile">Profile</a>
                    <a href="#settings">Settings</a>
                </div>
            </div>
            <div className="banner">
                <div className="hero-container">
                    <h1 className="text-run">RUN</h1>
                    <h2 className="text-to-the">TO THE</h2>
                    <h1 className="text-beat">BEAT</h1>
                </div>
            </div>
        </header>
    );
};
export default Header;