import React, { useState } from 'react';
import axios from 'axios';



function App() {
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState('');
  //create state variable to store auth token and logged in status
  const [token, setToken] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
        setToken(token);
        setIsLoggedIn(true);
      } else {
        alert("Login failed!");
      }
    } catch (error) {
      alert('An error occurred while logging in.');
    }
  }
  const handleRegistration = async () => {
    
  }

  return (
    <div>
      <h1>Basic Full Stack - Last Name DB Search</h1>


      {/* UI for log in form */}
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

      </div>
    </div>
  );
}

export default App;
