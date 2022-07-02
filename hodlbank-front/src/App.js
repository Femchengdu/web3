import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Hodls from './pages/Hodls';
import './App.css';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hodls" element={<Hodls />} />
        </Routes>
    )
};

export default App;