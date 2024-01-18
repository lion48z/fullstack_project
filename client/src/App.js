import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import axios from 'axios';
import Dashboard from './Dashboard';
import Login from './Login';
import Register from './Register';

function App() {
  const [token, setToken] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);



  const handleLoginSuccess = (token) => {
    setToken(token);
    setIsLoggedIn(true);
   
  }

  return (
    <Router>
      <>
        <div>
          <h1>Workout Tracker</h1>
          {!isLoggedIn ? (
            <Login onLoginSuccess={handleLoginSuccess} />
          ) : null}
        </div>
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={<Dashboard  />}
          />
        </Routes>
      </>
    </Router>
  );
}

export default App;

