import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage'; 
import Login from './components/Login'; 
import Signup from './components/Signup'; 
const App = () => {
    return (
      <div className="w-screen h-screen bg-[#131217]">
        <Router>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </Router>
      </div>
        
    );
};

export default App;
