import React, {useEffect, useState} from 'react';
import './Playlists.css';
import PlaylistCard from "../PlaylistCard";
import { getUserPlaylist } from "../../services/spotifyService";

const Playlists = () => {
    const [minBpm, setMinBpm] = useState(165);
    const [playlists, setPlaylists] = useState([]);
    const [selectedCards, setSelectedCards] = useState([]);

    useEffect(() => {
        const fetchPlaylists = async() => {
            const data = await getUserPlaylist();
            if (data) {
                setPlaylists(data);
            }
        };
        fetchPlaylists();
    }, []);


    const handleSliderChange = (event) => {
        setMinBpm(parseInt(event.target.value, 10));
    };

    const handleSelect = (id) => {
        setSelectedCards((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((cardId) => cardId !== id)
                : [...prevSelected, id]
        );
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
                <div className="playlists-grid">
                    {playlists.map((playlist) => (
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
