CREATE DATABASE workout_tracker;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(25) UNIQUE NOT NULL,
    password VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
);
ALTER TABLE users  -- may not need  to change this can limit access to information for other users 
DROP COLUMN email;

ALTER TABLE users
DROP COLUMN password;

CREATE TABLE run (
    run_id SERIAL PRIMARY KEY,
    date DATE,
    distance DECIMAL(10,2),
    duration TIME,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);


CREATE TABLE walk (
    walk_id SERIAL PRIMARY KEY,
    date DATE,
    distance DECIMAL(10,2),
    duration TIME,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE bike (
    bike_id SERIAL PRIMARY KEY,
    date DATE,
    distance DECIMAL(10,2),
    duration TIME,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Add a new column for total distance accumulated
ALTER TABLE run
ADD COLUMN total_distance_accumulated DECIMAL(10,2) DEFAULT 0;

ALTER TABLE walk
ADD COLUMN total_distance_accumulated DECIMAL(10,2) DEFAULT 0;

ALTER TABLE bike
ADD COLUMN total_distance_accumulated DECIMAL(10,2) DEFAULT 0;


