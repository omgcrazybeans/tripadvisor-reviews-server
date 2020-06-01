const db = require('./config.js');

// Sample trips

var trips1 = [[[
  // 1,
  "U.C. Berkely Tour",
  '',
  "Berkeley",
  "United States",
  'https://www.tripadvisor.com/AttractionProductReview-g60750-verbPhrase_Take_a_scenic_wine_tour_around_East_Haleyport.html',
  'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/07/d5/wr/83.jpg',
  '2016-12-01']]];

var trips2 = [[[
  // 2,
  "Boogey boarding down the Colorado River", 'NULL', "Butesworth", 'Cambodia', 'https://www.tripadvisor.com/AttractionProductReview-g60750-verbPhrase_Take_a_scenic_wine_tour_around_Kuhnshire.html', 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/07/x6/x6/4t.jpg', '2016-12-01']]];

// Sample reviews

var review1 = [1, "Johnny Tsunami", "Ibeza", "Spain", "PicUrl", 4, "Omg! my face melted.", "Coldest trip I've ever been on. Full of sharks", "couples", "Dec 2019", "March 2020", 4, "SharedPicURL", 7, 2];

var reviews2 = [2, "Little Timmy", "Rhineland", "Germany", "PicUrl", 3, "Best trip ever!", "This  was the coolest trip except for that bear that stole our snacks. Not cool Mr. Bear.", "friends", "Aug 2019", "May 2020", 0, "SharedPicURL", 2, 2];

var reviews3 = [[[
  // 3,
  "Miles Freedman", "Super South", "South Georgia Isles", "PicUrl", 1, 1, "Could have been better", "Too many homeless people everywhere.", "family2", '2018-04-01', '2018-05-01', true, "SharedPicURL", 1]]];

var reviewLarge = [
  [
    [
      'Sigmund.Heller',
      'South Viviennemouth',
      'Israel',
      'http://lorempixel.com/640/480/food',
      1,
      5,
      'compress cross-platform deposit',
      "I'll connect the neural ADP transmitter, that should card the PCI interface!",
      'family1',
      '2015-10-01',
      '2015-11-01',
      false,
      'http://lorempixel.com/640/480/food,http://lorempixel.com/640/480/food,http://lorempixel.com/640/480/nature',
      2
    ],
    [
      'Kaelyn.Prohaska58',
      'Kirkfurt',
      'Luxembourg',
      'http://lorempixel.com/640/480/animals',
      0,
      5,
      'Human',
      'Try to navigate the XML driver, maybe it will compress the auxiliary pixel!',
      'friends',
      '2015-10-01',
      '2015-11-01',
      false,
      'http://lorempixel.com/640/480/animals,http://lorempixel.com/640/480/fashion',
      2
    ]
  ]
];

module.exports = {

  getAllTrips: (req, res) => {
    var query1 = `SELECT * FROM trips`;
    var query2 = `SELECT * FROM reviews`;

    var trips = db.query(query1, (error, res, fields) => {
      if(error) {
        console.error(error);
        // res.status(500).send(error);
      } else {
        // return res.status(200).send(res);
        // res.json(fields);
        console.log(res);


      };
    });

          var reviews = db.query(query2, (error, res, fields) => {
          if(error) {
            console.error(error);
            // res.status(500).send(error);
          } else {
            // return res.status(200).send(res);
            // res.json(fields);
            console.log(res);

          };
      });
      return [trips, reviews];
  },

  getTripsFromPastYear: (req, res) => {
    var sql = `SELECT * FROM trips ORDER BY trip_date DESC`;
  },

  getAllReviews: (req, res) => {
    var query = `SELECT * FROM tripAdvisorReviews`;
  },

  getTripById: (req, res) => {
    var query = `SELECT * FROM tripAdvisorReviews`;
  },

  addTrip: (req, res) => {
    var sql = `INSERT INTO trips VALUES ${allValues}`;

    // Look up trip_id
    // Get trip_id number
    // Add trip_id into the child review array
    // Insert that array into the reviews table

    db.query(sql, (err, result) => {
      if (err) throw err;
      // results.message is also a good return
      console.log(result.affectedRows + " record(s) updated");
    });
  },

  addReview: (req, res) => {
    var sql = `INSERT INTO trips VALUES ${allValues}`;

    // Look up trip_id
    // Get trip_id number
    // Add trip_id into the child review array
    // Insert that array into the reviews table

    db.query(sql, (err, result) => {
      if (err) throw err;
      // results.message is also a good return
      console.log(result.affectedRows + " record(s) updated");
    });
  },

  updateTrip: (req, res) => {
    // mysql.escape(adr)
    var sql = `UPDATE trips SET ${fieldBeingUpdated} = ${newValue} WHERE ${fieldBeingUpdated} = ${oldValue}`;

    db.query(sql, (err, result) => {
      if (err) throw err;
      // results.message is also a good return
      console.log(result.affectedRows + " record(s) updated");
    });
  },

  updateReview: (req, res) => {
    // mysql.escape(adr)
    var sql = `UPDATE trips SET ${fieldBeingUpdated} = ${newValue} WHERE ${fieldBeingUpdated} = ${oldValue}`;

    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result.affectedRows + " record(s) deleted");
    });
  },

  deleteTrip: (req, res) => {
    var sql = `DELETE FROM trips WHERE _id = ${idNum}`;

    // Make sure it deletes foreign key documents as well

    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result.affectedRows + " trip record(s) deleted");
    });
  },

  deleteReview: (req, res) => {
    var sql = `DELETE FROM reviews WHERE _id = ${idNum}`;


    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result.affectedRows + " reveiw record(s) deleted");
    });
  },

  killAllData: (req, res) => {
    var sql = `DROP DATABASE tripAdvisorReviews`;

    db.query(sqlTrips, (err, result) => {
      if (err) {
        console.erro(erro);
      }
      console.log(`Don't forget to reseed schema!`);
    });
  },


  tableSize: (req, res) => {
    var sql1 = `SELET * FROM tripAdvisorReviews`;
    var sql2 = ``;

    db.query(sql1, (err, results) => {
      if (err) {
        console.error(err);
      }
      console.log(`Table size results: `, results);
    });

    db.query(sql2, (err, results) => {
      if (err) {
        console.error(err);
      }
      console.log(`Table size results: `, results);
    });

    // https://dev.mysql.com/doc/refman/5.7/en/server-system-variables.html#sysvar_bulk_insert_buffer_size
  },

  dataSize: (req, res) => {
    var sql = `SELECT table_name AS "Table", ROUND(((data_length + index_length) / 1024 / 1024), 2) AS "Size (MB)" FROM information_schema.TABLES WHERE table_schema = "tripAdvisorReviews" ORDER BY (data_length + index_length) DESC`;

    db.query(sql, (err, results) => {
      if (err) {
        console.error(err);
      }
      console.log(`Data size results: `, results);
    });
  },

  seedTrips: (tripArray) => {

    var sql = `INSERT INTO trips (trip_name, trip_state, trip_city, trip_country, trip_url, trip_picurl, trip_date) VALUES ?`;

    var shell = [];

    shell.push(tripArray);

    console.log(`Seeding of ${tripArray.length} trip tables is commencing!`);

    db.query(sql, shell, (err, results, fields) => {
      if (err) {
        return console.error(err.message);
      }
      // get inserted rows
      console.log('Trip row inserted:' + results.affectedRows);
    });
  },

  seedReviews: (reviewArray) => {

    var sql = `INSERT INTO reviews (userdb_name, userdb_city ,userdb_country, userdb_profile_pic_url, userdb_contributions, rating, title, review, tripType, tripDate, reviewDate, helpful, sharedpicurl, local_trip_id) VALUES ?`;

    var shell = [];
    shell.push(reviewArray);

    console.log(`Seeding of ${reviewArray.length} review tables is commencing!`);

    db.query(sql, shell, (err, results, fields) => {
      if (err) {
        return console.error(err.message);
      }
      // get inserted rows
      console.log('Review row inserted:' + results.affectedRows);
    });
  }

}