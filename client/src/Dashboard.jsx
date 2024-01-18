import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardForm from './DashboardForm';
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
      alert('Error retrieving dashboard data', error);
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
    <>
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
  </>
  );
};

export default Dashboard;


