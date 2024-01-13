import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link,  } from 'react-router-dom';
import  Register  from './Register';
//import axios from 'axios';
import Dashboard from './Dashboard';
import Login from './Login';



function App() {   
  const [token, setToken] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dashboardData, setDashboardData] = useState([]);
  
  useEffect( async () =>{
    try{
      const result = await axios.get('http://localhost:3001/dashboard')
    }catch (error) {

    }
  })

  useEffect(() => {
    console.log("client token: ", token);
  }, [token]);  
  

  const handleLoginSuccess = (token) => {
    setToken(token);
    setIsLoggedIn(true);
  }
  return (
    <Router>
      <>
        <div>
          <h1>Workout Tracker</h1>
          {!isLoggedIn ? (
            <Login onLoginSuccess={handleLoginSuccess} />
          ) : null}
        </div>
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="/users" element={<div>Users Page</div>} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </>
    </Router>
  );
  
}

export default App;
