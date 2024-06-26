import React, { useState } from 'react'
import axios from 'axios'
import {Button} from 'react-bootstrap'


const Register = () => {
  const [formData, setFormData] = useState({
    username:"",
    email:"",
    password:"",
  });
const { username, email, password } = formData   
const onChange = (e) => {
 
  setFormData({ ...formData, [e.target.name]: e.target.value });
};
const onSubmit = async (e) => {
  e.preventDefault()
const newUser = {
  username,
  email,
  password,
}
try {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    },
  };
  
  const result = await axios.post('http://localhost:3001/register', newUser, config);
  console.log(result.data);
  alert('Registration successful. Please login.');
  setFormData({
    username:"",
    email:"",
    password:"",

  })
} catch (error) {
 console.log(error.response.message)
  alert('Registration failed', error.response.data)
}
};

  return (
    <div>
   <form onSubmit={onSubmit}>
   <input
          type="text"
          placeholder="Username"
          name="username"
          value={username}
          onChange={onChange}
        />
        <br />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={onChange}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={onChange}
        />
      <br />
      <Button type="submit" >Register</Button>
      </form>
    
  </div>
  )
}

export default Register; 

