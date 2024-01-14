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



  const getDashboard = async () => {
    try {
      if (isLoggedIn) {
        const response = await axios.get('http://localhost:3001/dashboard', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log('Full API Response:', response.rows);
        if (response.status === 200) {
          
          console.log('Dashboard Data:', response.data);
          setDashboardData(response.data);
        }
      } else {
        // Handle the case when the user is not logged in
        console.log('User is not logged in');
      }
    } catch (error) {
      alert('Error retrieving dashboard data', error);
    }
  };
 console.log(getDashboard()); 

  const handleLoginSuccess = (token) => {
    setToken(token);
    setIsLoggedIn(true);
    
    getDashboard();
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
            element={<Dashboard dashboardData={dashboardData} />}
          />
        </Routes>
      </>
    </Router>
  );
}

export default App;

