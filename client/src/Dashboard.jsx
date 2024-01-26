import React, { useState, useEffect } from 'react';
import axios from 'axios';
import  './DashboardStyle.css'
import DashboardForm from './DashboardForm'


const Dashboard = () => {
  const [token, setToken] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    activities: [],
    totalRunDistance: '',
    totalWalkDistance: '',
    totalBikeDistance: '',
  });
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
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
  const handleEdit = (activity) => {
    console.log('Editing activity:', activity);
    // Set the formData state in DashboardForm for editing
    setEditing(true);
   // You can use a state variable like editing to differentiate between creating and editing
    setFormData({
      activityType: activity.activity_type,
      date: activity.date,
      distance: activity.distance,
      duration: activity.duration,
      activityId: activity.activity_id,
    });
  };
 
  const handleDelete = async (activityId, activityType) => {
    console.log(activityId)
    console.log('Delete activity:', activityId);
    try {
      const response = await axios.delete(`http://localhost:3001/dashboard/delete/${activityId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        data: { activityType }
      });
  
      if (response.status === 200) {
        // Handle successful deletion (e.g., update state to remove the deleted activity)
        console.log('Activity deleted successfully');
        // Update state or refetch dashboard data
        getDashboard();
      } else {
        // Handle deletion failure
        console.error('Delete failed');
      }
    } catch (error) {
      // Handle error, display an error message, or perform any other actions
      console.error('Error:', error.response.data);
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
    <div>
       {editing ? (
     <DashboardForm
        token={token}
        editing={editing}
        setEditing={setEditing}
        getDashboard={getDashboard}
        formData={formData}
        setFormData={setFormData}
      />
      ) : (
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
    
    <button onClick={() => handleEdit(activity)}>Edit</button>
    <button onClick={() => handleDelete(activity.activity_id, activity.activity_type)}>Delete</button>
  </div>
 

))}
</div>
  )}
</div>
)}

export default Dashboard;


