import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    console.log('client token: ', token);
   
  }, [token]);
  

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/login', {
        username,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
          
        },
      });

      if (response.status === 200) {
        const { token } = response.data
        console.log(token);
        localStorage.setItem('authToken', token);
        setToken(token);
        setIsLoggedIn(true);       
        setUsername('');
        setPassword('');
        navigate('/dashboard');
      } else {
        alert('Login failed!');
      }
    } catch (error) {
      alert('An error occurred while logging in.');
    }
  }
  useEffect(() => {
    const fetchToken = async () => {
      // Retrieve the token from local storage
      const storedToken = localStorage.getItem('authToken');
    
      if (storedToken) {
        // Set the token in the component state or global state management
        setToken(storedToken);
      } else {
        // Handle the case when the user is not logged in
        console.log('User is not logged in');
      }
    };
  
    fetchToken();
  }, []);

     
    return (
    <div>
        <input
        type='text'
        placeholder='Username'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type='password'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Log In</button>
      {isLoggedIn ? null : <p>Not a user? Click below <Link to="/register">Register</Link></p>}
    </div>
  )
}

export default Login


import React, { useState, useEffect } from 'react';
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


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Paper, Typography } from '@mui/material';

const Dashboard = () => {
  const [token, setToken] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    activities: [],
    totalRunDistance: '',
    totalWalkDistance: '',
    totalBikeDistance: '',
  });
  useEffect(() => {
    // Retrieve the token from local storage
    const storedToken = localStorage.getItem('authToken');

    if (storedToken) {
      setToken(storedToken);
      setIsLoggedIn(true);
      // Fetch dashboard data using the stored token
      getDashboard(storedToken);
    } else {
      // Handle the case when the user is not logged in
      console.log('User is not logged in');
    }
  }, []);
  const getDashboard = async () => {
   
    try {
      if (isLoggedIn) {
        const response = await axios.get('http://localhost:3001/dashboard', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log('Full API Response:', response);
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
  const { activities, totalRunDistance, totalWalkDistance, totalBikeDistance } = dashboardData;
  useEffect(() => {
   
    getDashboard();
  }, [token, isLoggedIn]); 
  if (!activities || activities.length === 0) {
    return <div>Loading...</div>; // or render a loading state or an error message
  }

  return (
    <Grid container spacing={3}>
      {/* Display Total Run Distance */}
      <Grid item xs={12} md={4}>
        <Paper>
          <Typography variant="h6">Total Run Distance</Typography>
          <Typography>{totalRunDistance} miles</Typography>
        </Paper>
      </Grid>

      {/* Display Total Walk Distance */}
      <Grid item xs={12} md={4}>
        <Paper>
          <Typography variant="h6">Total Walk Distance</Typography>
          <Typography>{totalWalkDistance} miles</Typography>
        </Paper>
      </Grid>

      {/* Display Total Bike Distance */}
      <Grid item xs={12} md={4}>
        <Paper>
          <Typography variant="h6">Total Bike Distance</Typography>
          <Typography>{totalBikeDistance} miles</Typography>
        </Paper>
      </Grid>

      {/* Display Recent Activities */}
      {activities?.map((activity) => (
        <Grid key={activity.activity_id} item xs={12} md={4}>
          <Paper>
            <Typography variant="h6">{activity.activity_type}</Typography>
            <Typography>Date: {new Date(activity.date).toLocaleDateString()}</Typography>
            <Typography>Distance: {activity.distance} miles</Typography>
            <Typography>Duration: {activity.duration}</Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default Dashboard;


