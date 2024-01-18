import React, { useState, useEffect } from 'react';
import axios from 'axios';
const DashboardForm = () => {
    const [activityType, setActivityType] = useState('');
    const [date, setDate] = useState('');
    const [distance, setDistance] = useState('');
    const [duration, setDuration] = useState('');
    const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
   
  
    useEffect(() => {
      
    }, [activityType, date, distance, duration]);
    
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.post('/dashboard', {
          activity_type: activityType,
          date,
          distance,
          duration,
        });
        if (response.status === 200 ){
            setSubmitted(true);
            setError(false)
            setActivityType("")
            setDate("");
            setDistance("")
            setDuration("")
        }else {
            setError(response.data.error || "Post failed")
        }
        console.log('Success', response.data)
      } catch (error) {
        console.error('Error:', error.response.data);
        // Handle error, display an error message, or perform any other actions
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
       
        <input type="text" value={activityType} onChange={(e) => setActivityType(e.target.value)} placeholder="Activity Type" />
        <input type="text" value={date} onChange={(e) => setDate(e.target.value)} placeholder="Date" />
        <input type="text" value={distance} onChange={(e) => setDistance(e.target.value)} placeholder="Distance" />
        <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="Duration" />             
        <button type="submit">Submit</button>
      </form>
    );
  };
  
  export default DashboardForm;
  