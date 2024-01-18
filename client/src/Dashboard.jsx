import React, { useState, useEffect } from 'react';
import axios from 'axios';
import  DashboardForm  from './DashboardForm';
//import { Grid, Paper, Typography } from '@mui/material';

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
    const storedToken = localStorage.getItem('authToken', token);

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
  useEffect(() => {
    // Fetch dashboard data whenever token or isLoggedIn changes
    if (token && isLoggedIn) {
      getDashboard();
    }
  }, [token, isLoggedIn]);
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
      if (error.response && error.response.status === 403) {
        // Token may be expired, try refreshing or obtaining a new token
        console.log('Token may be expired, try refreshing or obtaining a new token');
      } else {
        alert('Error retrieving dashboard data', error);
      }
    }
  };
  const { activities, totalRunDistance, totalWalkDistance, totalBikeDistance } = dashboardData;

  if (!isLoggedIn) {
    return <div>User is not logged in.</div>; // Handle the case when the user is not logged in
  }

  if (!activities || activities.length === 0) {
    return <div>Loading...</div>; // or render a loading state or an error message
  }


  return (
    <div>
    <DashboardForm />

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

      {activities.map((activity) => (
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


