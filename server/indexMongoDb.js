// Set up our express application
// require('newrelic');
const db = require('../db/mongoDb/indexMongoDb.js');
const dbGenerator = require('../db/mongoDb/seedTrips.js');
const port = process.env.PORT || 4060
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const express = require('express');
const app = express();

// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: true }) );

// Logger Middleware
app.use(morgan('dev'));
// Serve the public directory to the root of the web server.
app.use(express.static(__dirname + '../client/dist'));

// Helmet helps you secure your Express apps by setting various HTTP headers.
// app.use(helmet())

// CORS Middleware
// app.use(cors());

// Serve the public directory to the root of the web server.
// app.use(express.static(path.join(__dirname, '../client/dist')));



// Serve static assets if in production
// if (process.env.NODE_ENV === "production") {

//   // Set static folder
//   // All the javascript and css files will be read and served from this folder
//   app.use(express.static("client/build"));

//   // index.html for all page routes  html or routing and naviagtion
  // app.get("*", (req, res) => {
  //   res.sendFile(path.resolve(__dirname, "../client", "dist", "index.html"));
  // });
// }



app.get('/seedtest', (req, res) => {
  dbGenerator.bringMeMyTrips();
});

app.get('/trip', db.getAllTrips);
app.get('/trip1', db.getAllTrips1);
app.get('/review1', db.getAllReviews1); // Dont need
app.get('/review', db.getAllReviews);
app.get('/trip/:id', db.getTripById); // Done
app.post('/trip', db.addTrip); // Done
app.post('/review', db.addReview); // Done
app.put('/trip/:id', db.updateTrip); // Done +
app.put('/review/:id', db.updateReview); // Done +
app.delete('/trip/:id', db.deleteTrip); // Done ++
app.delete('/review/:id', db.deleteReview); // Can't save updated trip documemt after I pull the deleted review id out of reviews array
app.delete('/thefinalcountdown', db.killAllData); // Deletes all documents in both collections
app.get('/datesize', db.dataSize);
app.get('/querytest1', db.queryTest1);
app.get('/querytest2', db.queryTest2);


app.listen(port, () => {
  console.log(`MongoDb server listening on port ${port}!`);
});