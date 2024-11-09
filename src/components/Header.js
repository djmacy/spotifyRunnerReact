import React from 'react';
import './Header.css';
import logo from '../images/spotifyRunnerLogo.png';
import cardImage from '../images/card1.png';
import cardImage2 from '../images/card2.png';
import cardImage3 from '../images/card3.png';
import cardImage4 from '../images/card4.png';
import cardImage5 from '../images/card5.png';

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
                    <a href="#profile">Liked Songs</a>
                    <a href="#settings">Login</a>
                </div>
            </div>
            <div className="banner">
                <div className="hero-container">
                    <h1 className="text-run">RUN</h1>
                    <h2 className="text-to-the">TO THE</h2>
                    <h1 className="text-beat">BEAT</h1>
                </div>
            </div>

            <div className="card-container">
                <div className="card" style={{backgroundImage: `url(${cardImage}`}}>

                    <h3 className="card-title">HIP HOP</h3>
                    <button className="preview-button">Preview</button>
                </div>
                <div className="card" style={{backgroundImage: `url(${cardImage2}`}}>

                    <h3 className="card-title">LATINO</h3>
                    <button className="preview-button">Preview</button>
                </div>
                <div className="card" style={{backgroundImage: `url(${cardImage3}`}}>
                    <h3 className="card-title">POP</h3>
                    <button className="preview-button">Preview</button>
                </div>
                <div className="card" style={{backgroundImage: `url(${cardImage4}`}}>
                    <h3 className="card-title">ROCK</h3>
                    <button className="preview-button">Preview</button>
                </div>
                <div className="card" style={{backgroundImage: `url(${cardImage5}`}}>
                    <h3 className="card-title">TECHNO</h3>
                    <button className="preview-button">Preview</button>
                </div>
            </div>
        </header>
    );
};
export default Header;