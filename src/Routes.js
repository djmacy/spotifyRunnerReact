import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import DemoPlaylists from "./components/pages/DemoPlaylists";
import Playlists from "./components/pages/Playlists";
import LikedSongs from "./components/pages/LikedSongs";

const RoutesComponent = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/DemoPlaylists" element={<DemoPlaylists/>}></Route>
                <Route path='Playlists' element={<Playlists/>}></Route>
                <Route path={'/LikedSongs'} element={<LikedSongs/>}></Route>
            </Routes>
        </Router>
    )
}

export default RoutesComponent;