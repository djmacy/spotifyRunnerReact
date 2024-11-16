import React, {useEffect, useRef, useState} from 'react';
import './DemoPlaylists.css'
import cardImage from "../../images/card1.png";
import cardImage2 from "../../images/card2.png";
import cardImage3 from "../../images/card3.png";
import { getPopPlaylist } from "../../services/spotifyService";

const DemoPlaylists = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarRef = useRef(null);
    const [songs, setSongs] = useState([]);
    const [popSongs, setPopSongs] = useState([]);
    const [rockSongs, setRockSongs] = useState([]);
    const [hipHopSongs, setHipHopSongs] = useState([]);
    const [currentCard, setCurrentCard] = useState(null);

    const cards = [
        {
            id: 1,
            title: "Pop",
            image: cardImage,
            songs: popSongs,
        },
        {
            id: 2,
            title: "Hip Hop",
            image: cardImage2,
            songs: [
                { title: "Track 1", artists: "Artist A", duration: "2:50", coverImage: "coverA.jpg" },
                { title: "Track 2", artists: "Artist B", duration: "3:15", coverImage: "coverB.jpg" },
            ],
        },
        {
            id: 3,
            title: "Rock",
            image: cardImage3,
            songs: rockSongs,
        },
    ];

    const toggleSidebar = (card, event) => {
        event.stopPropagation();
        // console.log(card);
        // console.log(currentCard);
        // console.log(isSidebarOpen);
        // console.log(`card Check: ${card === currentCard}`)
        // console.log("Are they deeply equal? ", JSON.stringify(card) === JSON.stringify(currentCard));

        //setIsSidebarOpen(true);
        //Timeout created to hopefully deal with conflict with useEffect handleClickOutside
        setTimeout(() => {
            const shouldClose = isSidebarOpen && currentCard?.id === card.id;

            if (shouldClose) {
                setIsSidebarOpen(false);
                return;
            }

            if (currentCard?.id !== card.id) {
                setIsSidebarOpen(false);
                setTimeout(() => {
                    setSongs(card.songs);
                    setCurrentCard(card);
                    setIsSidebarOpen(true);
                }, 300);
            } else {
                setSongs(card.songs);
                setCurrentCard(card);
                setIsSidebarOpen(true);
            }
        }, 0)
    };

    useEffect(() => {
       const handleClickOutside = (event) => {
           //console.log('Clicked outside:', event.target);
           //Close the sidebar if preview is clicked again for same button
           if (sidebarRef.current && !sidebarRef.current.contains(event.target) && !event.target.closest(".preview-button")) {
                setIsSidebarOpen(false);
            }
       };

       if (isSidebarOpen) {
           document.addEventListener('mousedown', handleClickOutside);
       }

       return () => {
           document.removeEventListener('mousedown', handleClickOutside);
       }
    }, [isSidebarOpen]);

    const handleQueue = () => {
        console.log("Queue button clicked");
        // Add functionality for queuing the playlist here
    };

    useEffect(() => {
        const popPlaylist = async () => {
            const songs = await getPopPlaylist();
            console.log(songs);
            const formattedSongs = songs.tracks.items.map((item) => {
                const track = item.track;
                return {
                    id: track.id,
                    title: track.name,
                    artists: track.artists.map((artist) => artist.name).join(', '),
                    duration: formatDuration(track.duration_ms),
                    coverImage: track.album.images[0].url,
                };
            });
            setPopSongs(formattedSongs);
        };
        popPlaylist();
    }, [])

    const formatDuration = (durationMs) => {
        const minutes = Math.floor(durationMs / 60000);
        const seconds = ((durationMs % 60000) / 1000).toFixed(0);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    return(

        <div className="demo-playlists-container">
            <div>
                <h1>Demo Playlists</h1>
                <p>Select one of our hand picked playlists for songs at 180 bpm to keep you on track during your next
                    run</p>
            </div>
            <div className="card-container">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className="card"
                        style={{backgroundImage: `url(${card.image})`}}
                    >
                        <h3 className="card-title">{card.title}</h3>
                        <button className="preview-button" onClick={(event) => toggleSidebar(card, event)}>
                            Preview
                        </button>
                    </div>
                ))}
            </div>

            <div ref={sidebarRef} className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <h2 style={{color: '#fff'}}>Playlist Preview</h2>
                <p style={{color: '#e0e0e0'}}>Songs in this playlist:</p>

                {/* Render each song */}
                <div className="song-list">
                    {songs.map((song, index) => (
                        <div key={index} className="song-item">
                            <img src={song.coverImage} alt={song.title} className="song-image"/>
                            <div className="song-details">
                                <p className="song-title">{song.title}</p>
                                <p className="song-artist">{song.artists}</p>
                            </div>
                            <p className="song-duration">{song.duration}</p>
                        </div>
                    ))}
                </div>
                {/* Buttons at the bottom */}
                <div className="sidebar-buttons">
                    <button className="pill-button" onClick={handleQueue}>Queue</button>
                    <button className="pill-button" onClick={() => setIsSidebarOpen(false)}>Close</button>
                </div>
            </div>
        </div>
    );
}

export default DemoPlaylists;