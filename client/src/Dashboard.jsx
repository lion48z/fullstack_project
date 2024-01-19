import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import DashboardForm from './DashboardForm';
import './Dashboard.css';
//import { Grid, Paper, Typography } from '@mui/material';

const Dashboard = () => {
  //const [token, setToken] = useState('');
  //const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    activities: [],
    totalRunDistance: '',
    totalWalkDistance: '',
    totalBikeDistance: '',
  });
  useEffect(() => {
    // Retrieve the token from local storage
    const storedToken = localStorage.getItem('authToken');
    console.log('Stored Token:', storedToken);
    if (storedToken) {
     // setToken(storedToken);
     // setIsLoggedIn(true);
      console.log('About to fetch dashboard data');
      // Fetch dashboard data using the stored token
      getDashboard(storedToken);
    } else {
      // Handle the case when the user is not logged in
      console.log('User is not logged in');
    }
  }, []);

  const getDashboard = async (storedToken) => {
    try {
      console.log('Making request with token:', storedToken);
      const response = await axios.get('http://localhost:3001/dashboard', {
        headers: {
          'Authorization': `Bearer ${storedToken}`
        }
      });
      console.log('Full API Response:', response);

      if (response.status === 200) {
        console.log('Dashboard Data:', response.data);
        setDashboardData(response.data);
      }
    } catch (error) {
      alert('Error retrieving dashboard data', error);
    }
  };

  const { activities, totalRunDistance, totalWalkDistance, totalBikeDistance } = dashboardData;
 
  if (!activities || activities.length === 0) {
    return <div>Loading...</div>; // or render a loading state or an error message
  }


  return (
    <div>
    {/*<DashboardForm  />*/}

    <div className="dashboard-grid">
      <div className="dashboard-item">
        <h3>Total Run Distance</h3>
        <p>{totalRunDistance} miles</p>
      </div>

      <div className="dashboard-item">
        <h3>Total Walk Distance</h3>
        <p>{totalWalkDistance} miles</p>
      </div>

      <div className="dashboard-item">
        <h3>Total Bike Distance</h3>
        <p>{totalBikeDistance} miles</p>
      </div>

      {activities?.map((activity) => (
        <div key={activity.activity_id} className="dashboard-item">
          <h3>{activity.activity_type}</h3>
          <p>Date: {new Date(activity.date).toLocaleDateString()}</p>
          <p>Distance: {activity.distance} miles</p>
          <p>Duration: {activity.duration}</p>
        </div>
      ))}
    </div>
  </div>
  );
};

export default Dashboard;


