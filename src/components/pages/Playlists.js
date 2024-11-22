import React, {useEffect, useState} from 'react';
import './Playlists.css';
import PlaylistCard from "../PlaylistCard";
import { getUserPlaylist } from "../../services/spotifyService";

const Playlists = () => {
    const [minBpm, setMinBpm] = useState(165);
    const [playlists, setPlaylists] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCards, setSelectedCards] = useState([]);

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

    const handleFindSongs = () => {
        if (selectedCards.length > 0) {
            console.log('logic here for finding songs');
        } else {
            console.log('no playlists selected');
        }
    }

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
                            Select All
                        </button>
                    </div>
                    <div className="right-column">
                        <button className="btn find-songs" onClick={handleFindSongs} disabled={selectedCards.length === 0}>
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
        </div>
    );
};

export default Playlists;
