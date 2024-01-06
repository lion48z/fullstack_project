const express = require('express');
const cors = require('cors');
const { Pool } = require('pg'); // Pool package from pg postgres package
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

//initialize express app
const app = express();
//set up middleware
app.use(cors()); // middleware for allowing cross origin resource sharing 
app.use(express.json()); // built in middleware for parsing json sent in requests 
 // use Pool from pg package to create database connection
 //good idea to put all in env file
 const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'workout_tracker',
    password: process.env.DB_PASSWORD,   
    port: 5432  //default usually 5432
 });


//start server at given port 
const PORT = process.env.PORT || 3001; // use value in .env or use 3001 
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
})