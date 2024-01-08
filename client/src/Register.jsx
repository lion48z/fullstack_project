import React, { useState } from 'react'
import axios from 'axios'

const Register = () => {
  const [formData, setFormData] = useState({
    username:"",
    email: "",
    password: "",
  });
const { username, email, password } = formData   //hashed password?? 
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
  const hashedPassword = 'your_hashed_password';
  const body = JSON.stringify({ ...newUser, password: hashedPassword });
  const result = await axios.post('http://localhost:3001/register', body, config);
  console.log(result.data);
} catch (error) {
  alert('Registration failed', error.response.data)
}
};

  return (
    <div>
   
      <input
        type="text"
        placeholder="Username"        
        value={username}
        onChange={onChange}
      />
      <br />
      <input
        type="email"
        placeholder="Email"        
        value={email}
        onChange={onChange}
      />
      <br />
      <input
        type="password"
        placeholder="Password"       
        value={password}
        onChange={onChange}
      />
      <br />
      <button type="submit" onClick={onSubmit}>Register</button>
    
  </div>
  )
}

export default Register; 

