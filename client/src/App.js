import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from './Login';
import Register from './Register';

function App() {
  const [token, setToken] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = localStorage.getItem('authToken',token);
  
      if (storedToken) {
        console.log('Token retrieved:', storedToken);
        setToken(storedToken);
        setIsLoggedIn(true);
      } else {
        console.log('No token found');
        setIsLoggedIn(false);
      }
    };
  
    fetchToken();
  }, []);

  const handleLoginSuccess = (newToken) => {
    setToken(newToken);
    setIsLoggedIn(true);
    localStorage.setItem('authToken', newToken);
  };

  const handleLogout = () => {
    setToken('');
    setIsLoggedIn(false);
    localStorage.removeItem('authToken');
  };

  return (
    <Router>
      <>
        <div>
          <h1>Workout Tracker</h1>
          {isLoggedIn ? (
            <>
              <h2>Welcome back to your dashboard!</h2>
              <button onClick={handleLogout}>Logout</button>
              {/* You can use the Link component for navigation */}
              <Link to="/dashboard">Dashboard</Link>
            </>
          ) : (
            <Login onLoginSuccess={handleLoginSuccess} />
          )}
          <Routes>
            <Route path="/" element={<div>Home Page</div>} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </>
    </Router>
  );
}

export default App;




