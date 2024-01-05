CREATE DATABASE workout_tracker;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(25) UNIQUE NOT NULL,
    password VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
);

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

