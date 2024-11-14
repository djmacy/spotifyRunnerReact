import React, {useState} from 'react';
import './DemoPlaylists.css'
import cardImage from "../../images/card1.png";
import cardImage2 from "../../images/card2.png";
import cardImage3 from "../../images/card3.png";

const DemoPlaylists = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const songs = [
        {
            title: "Song One",
            artist : "Artist One",
            coverImage : cardImage,
            duration : "3:45"
        },
        {
            title: "Song two",
            artist : "Artist two",
            coverImage : cardImage,
            duration : "3:45"
        },
        {
            title: "Song three",
            artist : "Artist three",
            coverImage : cardImage,
            duration : "3:45"
        },

        {
            title: "Song four",
            artist : "Artist One",
            coverImage : cardImage,
            duration : "3:45"
        },

        {
            title: "Song five",
            artist : "Artist One",
            coverImage : cardImage,
            duration : "3:45"
        },

        {
            title: "Song six",
            artist : "Artist One",
            coverImage : cardImage,
            duration : "3:45"
        },
    ];

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleQueue = () => {
        console.log("Queue button clicked");
        // Add functionality for queuing the playlist here
    };

    return(

        <div className="demo-playlists-container">
            <div>
                <h1>Demo Playlists</h1>
                <p>Select one of our hand picked playlists for songs at 180 bpm to keep you on track during your next
                    run</p>
            </div>
            <div className="card-container">
                <div className="card" style={{backgroundImage: `url(${cardImage}`}}>
                    <h3 className="card-title">Pop</h3>
                    <button className="preview-button" onClick={toggleSidebar}>Preview</button>
                </div>
                <div className="card" style={{backgroundImage: `url(${cardImage2}`}}>
                    <h3 className="card-title">Hip Hop</h3>
                    <button className="preview-button" onClick={toggleSidebar}>Preview</button>
                </div>
                <div className="card" style={{backgroundImage: `url(${cardImage3}`}}>
                    <h3 className="card-title">Rock</h3>
                    <button className="preview-button" onClick={toggleSidebar}>Preview</button>
                </div>
            </div>

            <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <h2 style={{color: '#fff'}}>Playlist Preview</h2>
                <p style={{color: '#e0e0e0'}}>Songs in this playlist:</p>

                {/* Render each song */}
                <div className="song-list">
                    {songs.map((song, index) => (
                        <div key={index} className="song-item">
                            <img src={song.coverImage} alt={song.title} className="song-image"/>
                            <div className="song-details">
                                <p className="song-title">{song.title}</p>
                                <p className="song-artist">{song.artist}</p>
                            </div>
                            <p className="song-duration">{song.duration}</p>
                        </div>
                    ))}
                </div>
                {/* Buttons at the bottom */}
                <div className="sidebar-buttons">
                    <button className="pill-button" onClick={handleQueue}>Queue</button>
                    <button className="pill-button" onClick={toggleSidebar}>Close</button>
                </div>
            </div>
        </div>
    );
}

export default DemoPlaylists;