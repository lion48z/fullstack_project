import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link,  } from 'react-router-dom';
import  Register  from './Register';
import axios from 'axios';
import Dashboard from './Dashboard';



function App() {
  
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState('');
  //create state variable to store auth token and logged in status
  const [token, setToken] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //const navigate = useNavigate();

  useEffect(() => {
    console.log("client token: ", token);
  }, [token]);  
  
  //handleLogin
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
        //navigate('/dashboard');
       
      } else {
        alert("Login failed!");
      }
    } catch (error) {
      alert('An error occurred while logging in.');
    }
  }


  return (
    <Router>
      <>
        <div>
          <h1>Workout Tracker</h1>
          {!isLoggedIn ? ( 
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
