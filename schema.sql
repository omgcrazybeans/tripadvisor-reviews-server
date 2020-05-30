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

-- FROM TRIPS TABLE/DATABASE:

   -- All seems self explanatory

DROP TABLE IF EXISTS reviews;

-- X Getting reviews by tour Id.
-- X CREATE A TABLE OF TOURS WITH TOUR ID
-- XAPI should also reference the tour ID
-- XReviews table reference foriegn key users
-- XForiegn key
-- XEach tour has many reviews

CREATE TABLE reviews (
   review_id SERIAL PRIMARY KEY,
   userdb_name VARCHAR(40) NOT NULL,
   userdb_city VARCHAR(50) NOT NULL,
   userdb_country VARCHAR(60) NOT NULL,
   userdb_profile_pic_url VARCHAR(300) NOT NULL,
   userdb_contributions INTEGER NULL, -- Optional
   rating SMALLINT NOT NULL,
   title VARCHAR(300) NOT NULL,
   review VARCHAR(300) NOT NULL,
   tripType ENUM('couples', 'family1', 'family2', 'friends', 'business', 'solo') NOT NULL,
   tripDate DATE NOT NULL,
   reviewDate DATE NOT NULL,
   helpful BOOLEAN NOT NULL,
   sharedpicurl VARCHAR(300) NULL, -- Optional
   local_trip_id BIGINT UNSIGNED NOT NULL,
   FOREIGN KEY(local_trip_id) REFERENCES trips(trip_id) ON DELETE CASCADE
);

-- show databases;
-- drop database;
-- use databaseName;
-- show tables;
-- describe tableName;
-- SHOW COLUMNS FROM tableName;


-- FROM USER TABLE/DATABASE:

   -- userdb_name: firstName_lastInitial
   -- userdb_city: city name
   -- userdb_country: country name
   -- userdb_profile_pic_url: url link to a profile pic

-- FROM REVIEWS TABLE/DATABASE:

   -- rating: (1)terrible, (2)poor, (3)average, (4)very good, (5)excellent
   -- triptype: couples, family1, family2, friends, business, solo
   -- tripdate: spans one year Ex: [May 2020] to [June 2019] in one month increments, no days shown
   -- helpful: How many people found this review helpful
   -- sharedpicsurl: Optional, single shared pic URL
   -- contributions: Optional, how many reviews this user has made

-- DATE FORMAT:
   -- someDate TIMESTAMPTZ NOT NULL DEFAULT NOW()

