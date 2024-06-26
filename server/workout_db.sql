CREATE DATABASE workout_tracker;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(25) UNIQUE NOT NULL,
    password VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
);
ALTER TABLE users
DROP COLUMN user_name;
ALTER TABLE users
ADD COLUMN username VARCHAR(25) UNIQUE NOT NULL;



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
UPDATE users SET email = 'lion48z@yahoo.com' WHERE user_id = 6;
ALTER TABLE users
ALTER COLUMN email TYPE VARCHAR(100);
UPDATE users SET email = 'lion48z@yahoo.com' WHERE username = lion48z;
UPDATE users SET email = 'redlion48z@gmail.com' WHERE user_id = 7;
UPDATE walk
SET user_id = CASE
    WHEN walk_id = 1 THEN 7 
    WHEN walk_id = 2 THEN 6  
    WHEN walk_id = 3 THEN 7 
    WHEN walk_id = 4 THEN 6 
    WHEN walk_id = 5 THEN 7 
    WHEN walk_id = 6 THEN 6  
    WHEN walk_id = 7 THEN 7  
    WHEN walk_id = 8 THEN 7
    WHEN walk_id = 9 THEN 7  
    WHEN walk_id = 10 THEN 6 
    WHEN walk_id = 11 THEN 6 
    WHEN walk_id = 12 THEN 6  
    WHEN walk_id = 13 THEN 7  
    WHEN walk_id = 14 THEN 7
    WHEN walk_id = 15 THEN 6 
    WHEN walk_id = 16 THEN 6  
    WHEN walk_id = 17 THEN 7  
    WHEN walk_id = 18 THEN 7
    WHEN walk_id = 19 THEN 7  
    
    
    ELSE NULL  
END;
UPDATE walk 
SET user_id = CASE
    WHEN walk_id = 1 THEN 7
      
    ELSE NULL  
END;
UPDATE run
SET user_id = 6
WHERE run_id = 5;
INSERT INTO run (date, distance, duration, user_id) VALUES ('2024-01-7', 5.5, '01:30:00', 7);

