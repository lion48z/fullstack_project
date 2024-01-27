import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import {Button} from 'react-bootstrap'

const DashboardForm = ({token, getDashboard, editing, setEditing, formData, setFormData}) => {


  const navigate = useNavigate();
const { activityType, date, distance, duration, activityId } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/dashboard', formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        // Handle successful submission
        console.log('Success', response.data);
        setFormData({
          activityType: '',
          date: '',
          distance: '',
          duration: '',
        });
        navigate('/dashboard', { replace: true });
        getDashboard()
      } else {
        // Handle submission failure
        console.error('Post failed');
      }
    } catch (error) {
      // Handle error, display an error message, or perform any other actions
      console.error('Error:', error.response.data);
    }
  };

  
  const handleUpdate = async (e) => {
    e.preventDefault();
    
    try {
      if (!formData.activityId) {
        console.error('Activity ID is undefined or null');
        return;
      }

      const response = await axios.put(`http://localhost:3001/dashboard/edit/${activityId}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (response.status === 200) {
        // Handle successful update
        console.log('Update success', response.data);
        setFormData({
          activityType: '',
          date: '',
          distance: '',
          duration: '',
          activityId: formData.activityId || null,  
        });
        setEditing(false); 
        navigate('/dashboard', { replace: true });
        getDashboard();
      } else {
        // Handle update failure
        console.error('Update failed');
      }
    } catch (error) {
      // Handle error, display an error message, or perform any other actions
      console.error('Error:', error.response.data);
    }
  };

  return (
    <>
    <h3>Submit New Activity</h3>
    <form  onSubmit={editing ? handleUpdate : onSubmit}>
      <input
        className="form-control"
        type="text"
        value={activityType}
        onChange={onChange}
        name="activityType"
        placeholder="Activity Type"
      />
      <input 
      className="form-control"
      type="text" value={date} 
      onChange={onChange} name="date" placeholder="Date" />
      <input
        className="form-control"
        type="text"
        value={distance}
        onChange={onChange}
        name="distance"
        placeholder="Distance"
      />
      <input
        className="form-control"
        type="text"
        value={duration}
        onChange={onChange}
        name="duration"
        placeholder="Duration 00:00:00"
      />
    {editing && <Button variant="warning" onClick={handleUpdate}>Update</Button>}
    {!editing && <Button type="submit">Submit</Button>}
    </form>
    </>
  );
};

export default DashboardForm;


  