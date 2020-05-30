// Set up our express application
var db = require('../db/mongoDb/indexMongoDb.js');
var dbGenerator = require('../db/mongoDb/seedTrips.js');
var bodyParser = require('body-parser');
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
// app.get('/seedreviews', (req, res) => {
//   dbGenerator.bringMeMyTrips();
// });

app.get('/trip', db.getAllTrips); // Dont need
app.get('/review', db.getAllReviews);
app.get('/trip/:id', db.getTripById); // Done
app.post('/trip', db.addTrip); // Done
app.post('/review', db.addReview); // Done
app.put('/trip/:id', db.updateTrip); // Done +
app.put('/review/:id', db.updateReview); // Done +
app.delete('/trip/:id', db.deleteTrip); // Done ++
app.delete('/review/:id', db.deleteReview); // Can't save updated trip documemt after I pull the deleted review id out of reviews array
app.delete('/thefinalcountdown', db.killAllData); // Deletes all documents in both collections
app.get('/trip/datasize', db.dataSize);

app.listen(4060, () => {
  console.log('MongoDb server listening on port 4060!');
});