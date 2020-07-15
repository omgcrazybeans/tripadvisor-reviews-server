const db = require('./config.js');

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

    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
    });
  },

  addReview: (req, res) => {
    var sql = `INSERT INTO trips VALUES ${allValues}`;

    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
    });
  },

  updateTrip: (req, res) => {
    var sql = `UPDATE trips SET ${fieldBeingUpdated} = ${newValue} WHERE ${fieldBeingUpdated} = ${oldValue}`;

    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
    });
  },

  updateReview: (req, res) => {
    var sql = `UPDATE trips SET ${fieldBeingUpdated} = ${newValue} WHERE ${fieldBeingUpdated} = ${oldValue}`;

    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result.affectedRows + " record(s) deleted");
    });
  },

  deleteTrip: (req, res) => {
    var sql = `DELETE FROM trips WHERE _id = ${idNum}`;

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

  queryTest1: (req, res) => {
    var sql = `SELECT * FROM trips where trip_id = 888569`;
    db.query(sql, (err, results) => {
      if (err) {
        console.error(err);
      }
      console.log(`Query results: `, results);
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

    db.query(sql, shell, (err, results, fields) => {
      if (err) {
        return console.error(err.message);
      }
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
      console.log('Review row inserted:' + results.affectedRows);
    });
  }

}