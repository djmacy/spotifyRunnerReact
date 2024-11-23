import React, {useEffect, useRef, useState} from 'react';
import './Playlists.css';
import PlaylistCard from "../PlaylistCard";
import {getUserPlaylist, getSongsFromPlaylists, queuePlaylist} from "../../services/spotifyService";
import SpriteAnimation from "../SpriteAnimation";

const Playlists = () => {
    const [minBpm, setMinBpm] = useState(165);
    const [playlists, setPlaylists] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCards, setSelectedCards] = useState([]);
    const [songs, setSongs] = useState([]);
    const [error, setError] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarRef = useRef(null);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const fetchPlaylists = async() => {
            const data = await getUserPlaylist();
            if (data) {
                const sortedPlaylists = data.sort((a, b) => a.name.localeCompare(b.name));
                setPlaylists(sortedPlaylists);
            }
        };
        fetchPlaylists();
    }, []);

    const filteredPlaylists = playlists.filter((playlist) => playlist.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const handleFindSongs = async () => {
        if (selectedCards.length > 0) {
            console.log('pressed');
            console.log(selectedCards)
            //const playlistIds = selectedCards.map((card) => card.id); // Extract the `id` from each selected card
            const lowerBound = minBpm; // Example lower bound for tempo
            const upperBound = parseInt(minBpm) + 10; // Example upper bound for tempo

            try {
                console.log('Finding songs with playlists:', selectedCards);
                const filteredSongs = await getSongsFromPlaylists(selectedCards, lowerBound, upperBound);
                console.log('Songs with playlists:', songs);
                if (filteredSongs.data?.length === 0) {
                    setSongs([]);
                    console.log(songs.length);
                    setError("No songs found matching the criteria."); // Update state for error message
                } else {
                    setSongs(filteredSongs);

                    console.log('Fetched songs:', filteredSongs);
                }
                setIsSidebarOpen(true);
            } catch (err) {
                console.error('Error fetching songs:', err);
                setError(err.message); // Update error state
            }
        } else {
            console.log('No playlists selected');
        }
    };

    const handleSliderChange = (event) => {
        setMinBpm(parseInt(event.target.value, 10));
    };

    const handleSelect = (id) => {
        console.log(id);
        setSelectedCards((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((cardId) => cardId !== id)
                : [...prevSelected, id]
        );
    };

    const handleSelectAll = () => {
        // Check if all playlists are already selected
        const allSelected = playlists.every((playlist) =>
            selectedCards.includes(playlist.id)
        );

        if (allSelected) {
            // If all are selected, clear the selection
            setSelectedCards([]);
        } else {
            // Otherwise, select all
            setSelectedCards(playlists.map((playlist) => playlist.id));
        }
    };

    const handleQueue = async () => {
        console.log("Queue button clicked");

        try {
            setLoading(true);
            const uris = songs.map((song) => song.uri);
            console.log(uris)
            const result = await queuePlaylist(uris);
            //setResponse(result);
            console.log(result);
        } catch (error) {
            console.log(`Failed to queue songs: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="playlists-container">
            <h2 className="bpm-title">Select BPM/Cadence</h2>
            <div className="slider-container">
                <input
                    type="range"
                    min="125"
                    max="215"
                    step="10"
                    value={minBpm}
                    onChange={handleSliderChange}
                    className="slider"
                />
                <div className="bpm-value">
                    {minBpm}-{minBpm + 10}
                </div>
            </div>

            <div className="playlists-page">
                <h1 className="playlists-title">Your Playlists</h1>
                <input
                    type="text"
                    className="playlist-search"
                    placeholder="Search playlists..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="my-playlists-actions">
                    <div className="left-column">
                        <button className="btn select-all" onClick={handleSelectAll}>
                            {selectedCards.length === playlists.length ? ('Deselect All (' + playlists.length + ')') : ('Select All (' + playlists.length + ')')}
                        </button>
                    </div>
                    <div className="right-column">
                        <button className="btn find-songs" onClick={handleFindSongs}
                                disabled={selectedCards.length === 0}>
                            Find Songs
                        </button>
                    </div>
                </div>
                <div className="playlists-grid">
                    {filteredPlaylists.map((playlist) => (
                        <PlaylistCard
                            key={playlist.id}
                            id={playlist.id}
                            name={playlist.name}
                            image={playlist.images[0]?.url || ''}
                            isSelected={selectedCards.includes(playlist.id)}
                            onSelect={handleSelect}
                        />
                    ))}
                </div>
            </div>

            <div ref={sidebarRef} className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-content-wrapper">
                    <h2 style={{color: '#fff'}}>Filtered Songs</h2>
                    <p style={{color: '#e0e0e0'}}>{songs.length === 0 ? ('No songs found matching your criteria') : (songs.length + ' Songs Found:')}</p>

                    {/* Scrollable song list */}
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
                </div>

                {/* Buttons outside the scrollable area */}
                <div className="sidebar-buttons">
                    <button className="pill-button" onClick={handleQueue} disabled={loading || songs.length === 0}>
                        {loading ? 'Queuing...' : 'Queue'}
                    </button>
                    <button className="pill-button" onClick={() => setIsSidebarOpen(false)}>Close</button>
                </div>
            </div>

            {/* Loading overlay with SpriteAnimation */}
            {loading && (
                <div className="loading-overlay">
                    <SpriteAnimation/> {/* Render the SpriteAnimation here */}
                </div>
            )}
        </div>
    );
};

export default Playlists;
