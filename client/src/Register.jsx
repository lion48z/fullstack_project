import React, { useState } from 'react'

const Register = () => {
  const [formData, setFormData] = useState({
    username:"",
    email: "",
    password: "",
  });
const { username, email, password } = formData   //hashed password?? 
  return (
    <div>
      
    </div>
  )
}

export default Register

