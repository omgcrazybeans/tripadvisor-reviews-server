// Set up our express application
var db = require('../db/mySqlDb/indexMySql.js');
var bodyParser = require('body-parser');
var dbGenerator = require('../db/mySqlDb/seedTrips.js');
var cors = require('cors');
var express = require('express');
var app = express();

app.use(cors());
app.use(bodyParser.json());

// Serve the public directory to the root of the web server.
app.use(express.static('public'));

app.get('/seedtest', (req, res) => {
  dbGenerator.bringMeMyTrips();
});

app.get('/trip', db.getAllTrips);
app.get('/review', db.getAllReviews);
app.get('/trip/:id', db.getTripById);

app.post('/trip', db.addTrip);
app.post('/review', db.addReview);

app.put('/trip/:id', db.updateTrip);
app.put('/review/:id', db.updateReview);

app.delete('/trip/:id', db.deleteTrip);
app.delete('/review/:id', db.deleteReview);
app.delete('/thefinalcountdown', db.killAllData);

app.get('/tablesize', db.tableSize);
app.get('/datasize', db.dataSize);
app.get('/querytest1', db.queryTest1);

app.listen(4050, () => {
  console.log('MySql server listening on port 4050!');
});