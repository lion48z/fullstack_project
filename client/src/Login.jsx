import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import {Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
 useEffect(() => {
    console.log('client token: ', token);
   
  }, [token]);

  const handleLogin = async () => {
   
    try {
      const response = await axios.post('http://localhost:3001/login', {
        username,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
          
        },
      });
    
      

      if (response.status === 200) {
        const { token } = response.data
        console.log(token);
        setToken(token);
        localStorage.setItem('authToken', token);
        
        setIsLoggedIn(true);  
        console.log(isLoggedIn)     
        setUsername('');
        setPassword('');
        navigate('/dashboard');
      } else {
        alert('Login failed!');
      }
    } catch (error) {
      alert('An error occurred while logging in.');
    }
  }
 
  useEffect(() => {
    const fetchToken = async () => {
     
      // Retrieve the token from local storage
      const storedToken = localStorage.getItem('authToken');
    
      if (storedToken) {
        // Set the token in the component state or global state management
        setToken(storedToken);
        setIsLoggedIn(true);
      } else {
        // Handle the case when the user is not logged in
        console.log('User is not logged in');
      }
    };
  
    fetchToken();
  }, []);

     
    return (
    <div>
     {isLoggedIn && token ? (
        <p>Welcome back to your dashboard!</p>
      ) : (
        <>
          <input
            type='text'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleLogin}>Log In</Button>
          <p>Not a user? Click below <Link to="/register">Register</Link></p>
        </>
      )}
    </div>
  )
}

export default Login

