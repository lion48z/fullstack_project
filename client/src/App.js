import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from './Login';
import Register from './Register';

function App() {
  const [token, setToken] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = localStorage.getItem('authToken');
  
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

  const PrivateRoute = ({ element, ...rest }) => {
    return isLoggedIn ? (
      <Route {...rest} element={element} />
    ) : (
      <Navigate to="/login" replace />
    );
  };

  return (
    <Router>
      <>
        <div>
          <h1>Workout Tracker</h1>
          {isLoggedIn ? (
            <h2>Welcome back to your dashboard!</h2>
          ) : (
            <Login onLoginSuccess={handleLoginSuccess} />
          )}
           <React.Fragment>
            <Routes>
              <Route path="/" element={<div>Home Page</div>} />
              <Route path="/register" element={<Register />} />
              <PrivateRoute path="/dashboard" element={<Dashboard />} />
            </Routes>
          </React.Fragment>
        </div>
      </>
    </Router>
  );
}

export default App;



