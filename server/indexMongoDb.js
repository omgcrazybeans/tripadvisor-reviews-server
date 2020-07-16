require('newrelic');
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

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: true }) );

// Logger Middleware
app.use(morgan('dev'));

app.use(express.static(__dirname + '../client/dist'));

app.use(helmet())

CORS Middleware
app.use(cors());

// Serve the public directory to the root of the web server.
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/seedtest', (req, res) => {
  dbGenerator.bringMeMyTrips();
});

app.get('/trip', db.getAllTrips);
app.get('/trip1', db.getAllTrips1);
app.get('/review1', db.getAllReviews1);
app.get('/review', db.getAllReviews);
app.get('/trip/:id', db.getTripById);
app.post('/trip', db.addTrip);
app.post('/review', db.addReview);
app.put('/trip/:id', db.updateTrip);
app.put('/review/:id', db.updateReview);
app.delete('/trip/:id', db.deleteTrip);
app.delete('/review/:id', db.deleteReview);
app.delete('/thefinalcountdown', db.killAllData); // Deletes all documents in database
app.get('/datasize', db.dataSize);
app.get('/querytest1', db.queryTest1);
app.get('/querytest2', db.queryTest2);

app.listen(port, () => {
  console.log(`MongoDb server listening on port ${port}!`);
});