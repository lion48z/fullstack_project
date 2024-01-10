import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [username, setUsername]= useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const handleLogin = async () => {
        //try logging in
        try {
          //send post request to /login route with the username and password in the body
          const response = await axios.post('http://localhost:3001/login', {
            username,
            password
          }, {
            headers: {
              'Content-Type': 'application/json'
            },
            
          });
          //check if fetch was successful 
          if (response.status === 200) {
            // const data = await response.json();
            // setToken(data.token)
    
            //extracting the token from the response and setting the token and isLoggedIn state variable
            const { token } = response.data;
            console.log(response.data)
            setToken(token);          
            setIsLoggedIn(true);
            navigate('/dashboard');
            setUsername('');
            setPassword('');
           
          } else {
            alert("Login failed!");
          }
        } catch (error) {
          alert('An error occurred while logging in.');
        }
      }
      const handleLoginSuccess = (token) => {
        setToken(token);
        setIsLoggedIn(true);
      }
     
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
      <p>Not a user? Click below</p>
      <Link to="/register">Register</Link>
    </div>
  )
}

export default Login
