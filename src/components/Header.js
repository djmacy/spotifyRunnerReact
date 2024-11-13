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

            <div className="banner">
                <div className="hero-container">
                    <h1 className="text-run">RUN</h1>
                    <h2 className="text-to-the">TO THE</h2>
                    <h1 className="text-beat">BEAT</h1>
                </div>
            </div>
            <div className="spacer"></div> {/* Spacer to create controlled distance */}
            <div className="feature-text">
                <h2 className="feature-title">Features</h2>
                <p className="feature-subtext">
                    Whether you're looking for motivation or just want to keep the beat,
                    Spotify Runner delivers songs that match your running cadence
                </p>
            </div>

            <div className="card-container">

                <div className="card" style={{backgroundImage: `url(${cardImage}`}}>

                    <h3 className="card-title">DEMO PLAYLISTS</h3>
                    <button className="preview-button">Preview</button>
                </div>
                <div className="card" style={{backgroundImage: `url(${cardImage2}`}}>

                    <h3 className="card-title">YOUR PLAYLISTS</h3>
                    <button className="preview-button">Preview</button>
                </div>
                <div className="card" style={{backgroundImage: `url(${cardImage3}`}}>
                    <h3 className="card-title">YOUR LIKED SONGS</h3>
                    <button className="preview-button">Preview</button>
                </div>

            </div>
        </header>
    );
};
export default Header;