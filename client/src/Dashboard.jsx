import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';

const Dashboard = ({ dashboardData }) => {
  if (!dashboardData || !dashboardData.activities) {
    // If dashboardData or activities is undefined, you can return a loading state or an empty component.
    return <div>Loading...</div>;
  }

  const { activities, totalRunDistance, totalWalkDistance, totalBikeDistance } = dashboardData;

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
      {activities.map((activity) => (
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


