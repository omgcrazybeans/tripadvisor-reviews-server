CREATE DATABASE tripAdvisorReviews;

USE tripAdvisorReviews;

DROP TABLE IF EXISTS trips;

CREATE TABLE trips (
   trip_id SERIAL PRIMARY KEY,
   trip_name VARCHAR(200) NOT NULL,
   trip_state VARCHAR(100) NULL,
   trip_city VARCHAR(60) NOT NULL,
   trip_country VARCHAR(60) NOT NULL,
   trip_url VARCHAR(300) NOT NULL,
   trip_picurl VARCHAR(300) NOT NULL,
   trip_date DATE NOT NULL
);

DROP TABLE IF EXISTS reviews;

CREATE TABLE reviews (
   review_id SERIAL PRIMARY KEY,
   userdb_name VARCHAR(40) NOT NULL,
   userdb_city VARCHAR(50) NOT NULL,
   userdb_country VARCHAR(60) NOT NULL,
   userdb_profile_pic_url VARCHAR(300) NOT NULL,
   userdb_contributions INTEGER NULL,
   rating SMALLINT NOT NULL,
   title VARCHAR(300) NOT NULL,
   review VARCHAR(300) NOT NULL,
   tripType ENUM('couples', 'family1', 'family2', 'friends', 'business', 'solo') NOT NULL,
   tripDate DATE NOT NULL,
   reviewDate DATE NOT NULL,
   helpful BOOLEAN NOT NULL,
   sharedpicurl VARCHAR(300) NULL,
   local_trip_id BIGINT UNSIGNED NOT NULL,
   FOREIGN KEY(local_trip_id) REFERENCES trips(trip_id) ON DELETE CASCADE
);