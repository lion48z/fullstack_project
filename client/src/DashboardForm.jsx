import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap'

const DashboardForm = ({token}) => {
  const [formData, setFormData] = useState({
    activityType: '',
    date: '',
    distance: '',
    duration: '',
  });
  const navigate = useNavigate();
  const { activityType, date, distance, duration } = formData;

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

      <Button type="submit">Submit</Button>
    </form>
  );
};

export default DashboardForm;


  