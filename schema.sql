CREATE DATABASE tripAdvisorReviews;

USE tripAdvisorReviews;


DROP TABLE IF EXISTS trips;

CREATE TABLE trips (
   trip_id SERIAL PRIMARY KEY,
   trip_name VARCHAR(100) NOT NULL,
   trip_state VARCHAR(100) NOT NULL,
   trip_city VARCHAR(60) NOT NULL,
   trip_country VARCHAR(60) NOT NULL,
   trip_url VARCHAR(100) NOT NULL,
   trip_picurl VARCHAR(100) NOT NULL
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
   userdb_city VARCHAR(4) NOT NULL,
   userdb_country VARCHAR(30) NOT NULL,
   userdb_profile_pic_url VARCHAR(300) NOT NULL,
   rating SMALLINT NOT NULL,
   title VARCHAR(50) NOT NULL,
   review VARCHAR(300) NOT NULL,
   triptype VARCHAR(25) NOT NULL,
   tripDate TIMESTAMPTZ NOT NULL DEFAULT NOW(),
   reviewDate TIMESTAMPTZ NOT NULL DEFAULT NOW(),
   helpful SMALLINT NOT NULL,
   sharedpicurl VARCHAR(300) NOT NULL, -- Optional
   userdb_contributions INTEGER NOT NULL, -- Optional
   FOREIGN KEY(trips) REFERENCES trips(id)
);

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

-- Ex: Trips

   INSERT INTO trips VALUES (1, "U.C. Berkely Tour", "Berkeley", "CA", "United States", "", "");
   INSERT INTO trips VALUES (2, "Boogey boarding down the Colorado River", "Butesworth", "CO", "United States", "", "");

-- Ex: Reviews

   INSERT INTO reviews VALUES (1, "Johnny Tsunami", "Ibeza", "Spain", "PicUrl", 4, "Omg! my face melted.", "Coldest trip I've ever been on. Full of sharks", "couples", "Dec 2019", "March 2020", 4, "SharedPicURL", 7, 2);

   INSERT INTO reviews VALUES (2, "Little Timmy", "Rhineland", "Germany", "PicUrl", 3, "Best trip ever!", "This  was the coolest trip except for that bear that stole our snacks. Not cool Mr. Bear.", "friends", "Aug 2019", "May 2020", 0, "SharedPicURL", 2, 2);

   INSERT INTO reviews VALUES (3, "Miles Freedman", "Super South", "South Georgia Isles", "PicUrl", 1, "Could have been better", "Too many homeless people everywhere.", "family2", "April 2020", "May 2020", 1, "SharedPicURL", 12, 1);
