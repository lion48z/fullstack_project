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
 //post request handler for registration
app.post('/register', async (req, res) => {
    //extracting the username and password from the body using destructuring
    const { username, password } = req.body;
    //store password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
  
    //insert the new user into the users table 
    try{
  //query database to insert into the users table
      await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashedPassword]);
      res.status(201).send('User registered successfully');
    } catch (error) {
      res.status(500).send(error.message);
  
    }
  })
  //post request handler for login
  
  app.post('/login', async (req, res) => {
    const {username, password} = req.body
    try {
      //check if user exists 
      const { rows } = await pool.query('SELECT * FROM users WHERE username = $1', [username]) //get row with matching username if it exists 
      if (rows.length > 0) {
        //a user with username exists 
        //check if password matches 
        //create variable for waiting for bcrypt
        const isValid = await bcrypt.compare(password, rows[0].password); // store the boolean result of bcrypt result in variable 
      if (isValid) {
        //if valid combo create jwt token
        const token = jwt.sign(
          {username}, 
          process.env.JWT_SECRET,
          { expiresIn: '1h'}
          );
          res.json({ token });
  
        } else {
          res.status(403).send('Invalid password')
        }
      } else {
        res.status(404).send('User not found');
      }
    }catch (error) {
      res.status(500).send(error.message); //if anything in the post fails 
    }
  });


//start server at given port 
const PORT = process.env.PORT || 3001; // use value in .env or use 3001 
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
})