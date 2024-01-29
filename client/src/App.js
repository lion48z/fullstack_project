import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Navigation from './Navigation'
import Login from './Login';
import Register from './Register';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
 const [token, setToken] = useState('');
  //const [isLoggedIn, setIsLoggedIn] = useState(false);

/*  const handleLoginSuccess = () => {
    setToken(token);
    setIsLoggedIn(true);
  };*/



  return (
    <Router>
      <>
      <Navigation  />
        <div>
          <h1 style={ {textAlign: "center"}}>Workout Tracker</h1>
          <Login   />
           
         
        </div>
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
         
        </Routes>
      </>
    </Router>
  );
}

export default App;





