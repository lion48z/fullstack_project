import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

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
        console.log(token);
        localStorage.setItem('authToken', token);
        onLoginSuccess(token);
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

  return (
    <div>
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
      <button onClick={handleLogin}>Log In</button>
      <p>Not a user? Click below <Link to="/register">Register</Link></p>
    </div>
  );
};

export default Login;

