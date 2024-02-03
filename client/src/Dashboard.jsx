import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  Card, Button } from 'react-bootstrap';

import './DashboardStyle.css';
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
        
        console.log('User is not logged in');
      }
    } catch (error) {
      alert('Error retrieving dashboard data', error);
    }
  };
  const handleEdit = (activity) => {
    console.log('Editing activity:', activity);
    
    setEditing(true);
  
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
        
        console.log('Activity deleted successfully');
        
        getDashboard();
      } else {
       
        console.error('Delete failed');
      }
    } catch (error) {
      
      console.error('Error:', error.response.data);
    }
  };

  const { activities, totalRunDistance, totalWalkDistance, totalBikeDistance } = dashboardData;
  useEffect(() => {
   
    getDashboard();
  }, [token, isLoggedIn]); 

  if (!isLoggedIn) {
    // Handle the case when the user is not logged in
    return <div>User is not logged in</div>;
  }

  if (!activities) {
    // Handle the case when activities are still loading
    return <div>Loading...</div>;
  }

  if (activities.length === 0) {
    // Render the DashboardForm when there are no activities
    return (
      <div>
        <DashboardForm
          token={token}
          editing={editing}
          setEditing={setEditing}
          getDashboard={getDashboard}
          formData={formData}
          setFormData={setFormData}
        />
        <div>No activities found. Start adding activities using the form above.</div>
      </div>
    );
  }

  return (
    <div>
   
     <DashboardForm
        token={token}
        editing={editing}
        setEditing={setEditing}
        getDashboard={getDashboard}
        formData={formData}
        setFormData={setFormData}
      />
  <h1 style={ {textAlign: "center"}} >Your Dashboard</h1>
      <div className="dashboard-grid" >
        
        <Card bg="success" >
          <Card.Body>
            <Card.Title>Total Run Distance</Card.Title>
            <Card.Text>{totalRunDistance} miles</Card.Text>
          </Card.Body>
        </Card>

        <Card bg="success">
          <Card.Body>
            <Card.Title>Total Walk Distance</Card.Title>
            <Card.Text>{totalWalkDistance} miles</Card.Text>
          </Card.Body>
        </Card>

        <Card bg="success">
          <Card.Body>
            <Card.Title>Total Bike Distance</Card.Title>
            <Card.Text>{totalBikeDistance} miles</Card.Text>
          </Card.Body>
        </Card>

        {activities?.map((activity) => (                            //mapping through with optional chaining to handle potential null or undefined
          <Card key={activity.activity_id} bg="primary">
            <Card.Body >
              <Card.Title>{activity.activity_type.toUpperCase()}</Card.Title>
              <Card.Text>Date: {new Date(activity.date).toLocaleDateString()}</Card.Text>
              <Card.Text>Distance: {activity.distance} miles</Card.Text>
              <Card.Text>Duration: {activity.duration}</Card.Text>
              <Button variant="warning" onClick={() => handleEdit(activity)}>
                Edit
              </Button>
              <Button variant="danger" onClick={() => handleDelete(activity.activity_id, activity.activity_type)}>
                Delete
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    
    </div>
  );
};

export default Dashboard;


