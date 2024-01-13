import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Dashboard from './Dashboard';
import Login from './Login';
import Register from './Register';

function App() {
  const [token, setToken] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dashboardData, setDashboardData] = useState([]);

  useEffect(() => {
    console.log('client token: ', token);
  }, [token]);

  const getDashboard = async () => {
    
    try {
      const response = await axios.get('http://localhost:3001/dashboard',{
        token
       
      }
      );
      if (response.status === 200) {
        console.log('Dashboard Data:', response.data);
        setDashboardData(response.data);
      }
    } catch (error) {
      alert('Error retrieving dashboard data', error);
    }
  };

  const handleLoginSuccess = (token) => {
    setToken(token);
    setIsLoggedIn(true);
    getDashboard(); 
  };

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
            element={<Dashboard dashboardData={dashboardData} />}
          />
        </Routes>
      </>
    </Router>
  );
}

export default App;

