import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap'

const DashboardForm = ({token, getDashboard, editing, setEditing, formData, setFormData}) => {
 /* const [formData, setFormData] = useState({
    activityType: '',
    date: '',
    distance: '',
    duration: '',
    activityId: props.formData?.activityId || null,  // for editing
  });*/
  //const [editing, setEditing] = useState(false);
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
    <form onSubmit={onSubmit}>
      <input
        type="text"
        value={activityType}
        onChange={onChange}
        name="activityType"
        placeholder="Activity Type"
      />
      <input type="text" value={date} onChange={onChange} name="date" placeholder="Date" />
      <input
        type="text"
        value={distance}
        onChange={onChange}
        name="distance"
        placeholder="Distance"
      />
      <input
        type="text"
        value={duration}
        onChange={onChange}
        name="duration"
        placeholder="Duration"
      />
      
    {editing && <button onClick={handleUpdate}>Update</button>}
    {!editing && <button type="submit">Submit</button>}
    </form>
  );
};

export default DashboardForm;


  