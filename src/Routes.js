import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import DemoPlaylists from "./components/pages/DemoPlaylists";

const RoutesComponent = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/DemoPlaylists" element={<DemoPlaylists/>}></Route>
            </Routes>
        </Router>
    )
}

export default RoutesComponent;