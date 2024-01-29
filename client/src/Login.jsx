import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = localStorage.getItem('authToken');

      if (storedToken) {
        setToken(storedToken);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false); 
      }
    };

    fetchToken();
  }, []);

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
        const { token } = response.data;
        setToken(token);
        localStorage.setItem('authToken', token);
        setIsLoggedIn(true);
        setUsername('');
        setPassword('');
        navigate('/dashboard');
      } else {
        alert('Login failed!');
      }
    } catch (error) {
      alert('An error occurred while logging in.');
    }
  };

  const handleLogout = () => {
    
    localStorage.removeItem('authToken');
  
    setIsLoggedIn(false);
  
  };

  return (
    <div>
      {isLoggedIn ? (
        <>
          <p style={{ textAlign: 'center' }}>Welcome back to your dashboard!</p>
          <Button variant="danger" onClick={handleLogout}>Log Out</Button>
        </>
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
          <p>
            Not a user? Click below <Link to='/register'>Register</Link>
          </p>
        </>
      )}
    </div>
  );
};

export default Login;

