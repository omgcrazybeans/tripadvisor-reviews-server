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

app.get('/trip', db.getAllTrips); // Dont need
app.get('/trip/:id', db.getTripById);
// app.post('/trip', db.addTrip);
app.post('/review', db.addReview);
// app.put('/trip/:id', db.updateTrip);
app.put('/review/:id', db.updateReview);
app.delete('/trip/:id', db.deleteReview);
// app.delete('/review/:id',)
app.get('/trip/datasize', db.dataSize);

app.listen(4060, () => {
  console.log('MongoDb server listening on port 4060!');
});