require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { Pool } = require('pg'); // Pool package from pg postgres package
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


//initialize express app
const app = express();
//set up middleware
app.use(cors()); // middleware for allowing cross origin resource sharing 
app.use(express.json()); // built in middleware for parsing json sent in requests 

 const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'workout_tracker',
    password: process.env.DB_PASSWORD,   
    port: 5432  
 });
const authenticateToken = (req, res, next) => {
  //get the token from the authorization header
  const authHeader = req.headers['Authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  //let token = null;
 // if (authHeader) {
 // token = authHeader.split(' ')[1]; //"Bearer : flkjslkfjdlkfjwelkd"
 // }
  if (!token) { 
     res.status(401).send();
     //res.sendStatus(401);
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error(err);
      res.sendStatus(403);
    }
    console.log('Decoded Token:', user);
    
    //store the user in a property called user in the request object 
    req.user = user;
    //proceed to the next middleware in the chain 
    next();
  })
}

 //post request handler for registration
 app.post('/register', async (req, res) => {
  //extracting the username and password from the body using destructuring
  const { username, email, password } = req.body;
  //store password with bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);

  //insert the new user into the users table 
  try{
//query database to insert into the users table
console.log('Received request for registration', req.body)
    await pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [username, email, hashedPassword]);
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
    const { rows } = await pool.query('SELECT * FROM users WHERE username = $1', [username]) 
    //get row with matching username if it exists 
    console.log('Rows from database:', rows);
    if (rows.length > 0) {
      //a user with username exists 
      //check if password matches 
      //create variable for waiting for bcrypt
      const isValid = await bcrypt.compare(password, rows[0].password); // store the boolean result of bcrypt result in variable 
    if (isValid) {
      //if valid combo create jwt token
      console.log('User ID from database:', rows[0].user_id);
      const token = jwt.sign(
        {  userId: rows[0].user_id, username }, 
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

// Function to get total distance accumulated for a specific activity type with the user's id 
//coalesce is function to return frist non-null expression among its arguments
const getTotalDistance = async (activityType, userId) => {
  const result = await pool.query(`SELECT COALESCE(SUM(distance), 0) FROM ${activityType} WHERE user_id = $1`, [userId]);
  return result.rows[0].coalesce;
};

app.get('/dashboard', authenticateToken, async (req, res) => {
  const userId = req.user.userId;

  try {
    // Fetch user's total distance accumulated and recent activities (runs, walks, and bikes) limit to most recent 5 
    const runData = await pool.query('SELECT run_id AS activity_id, date, distance, duration FROM run WHERE user_id = $1 ORDER BY date DESC LIMIT 5', [userId]);
    const walkData = await pool.query('SELECT walk_id AS activity_id, date, distance, duration FROM walk WHERE user_id = $1 ORDER BY date DESC LIMIT 5', [userId]);
    const bikeData = await pool.query('SELECT bike_id AS activity_id, date, distance, duration FROM bike WHERE user_id = $1 ORDER BY date DESC LIMIT 5', [userId]);
//calls total distance for each activity 
    const totalRunDistance = await getTotalDistance('run', userId);
    const totalWalkDistance = await getTotalDistance('walk', userId);
    const totalBikeDistance = await getTotalDistance('bike', userId);
//create dashboard object , combines latest activity with the total distance for each activity type
//maps through each activity 
const combinedData = [
  ...runData.rows.map(activity => ({ ...activity, activity_type: 'run' })),
  ...walkData.rows.map(activity => ({ ...activity, activity_type: 'walk' })),
  ...bikeData.rows.map(activity => ({ ...activity, activity_type: 'bike' })),
];
// Sort the combinedData array in descending order based on the 'date' property,
// then take the first 5 items to get the most recent 5 activities.
const sortedData = combinedData.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
//display total distance with as dashboardData using sortedDatat and total Distance for each activity
const dashboardData = {
  activities: sortedData,
  totalRunDistance,
  totalWalkDistance,
  totalBikeDistance,
};

    res.json(dashboardData);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

app.post('/dashboard', authenticateToken, async (req, res) => {
  console.log('REq:',req, req.user)
  const userId = req.user.userId;
console.log('userId:', userId)
  const { activity_type, date, distance, duration } = req.body;

  try {
    let result;
    
    switch (activity_type) {
      case 'run':
        result = await pool.query('INSERT INTO run (user_id, date, distance, duration) VALUES ($1, $2, $3, $4) RETURNING *', [userId, date, distance, duration]);
        break;
      case 'walk':
        result = await pool.query('INSERT INTO walk (user_id, date, distance, duration) VALUES ($1, $2, $3, $4) RETURNING *', [userId, date, distance, duration]);
        break;
      case 'bike':
        result = await pool.query('INSERT INTO bike (user_id, date, distance, duration) VALUES ($1, $2, $3, $4) RETURNING *', [userId, date, distance, duration]);
        break;
      default:
        return res.status(400).json({ error: 'Invalid activity type' });
    }

    res.json(result.rows[0]); // Return the inserted activity data
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});



//start server at given port 
const PORT = process.env.PORT || 3001; // use value in .env or use 3001 
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
})



