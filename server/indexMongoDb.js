// Set up our express application
var db = require('../db/mongoDb/indexMongoDb.js');
var dbGenerator = require('../db/mongoDb/seedMongoDb.js');
var bodyParser = require('body-parser');
var cors = require('cors');
var express = require('express');
var app = express();

app.use(cors());
app.use(bodyParser.json());

// Serve the public directory to the root of the web server.
app.use(express.static('public'));

app.get('/seedtest', (req, res) => {
  var results = dbGenerator.bringMeMyReviews();
  console.log('seeded data: ', results)
});

app.get('/trips', db.getAllTrips);
app.post('/trips', db.addReview);
app.put('/trips/:id', db.updateReview);
app.delete('/trips/:id', db.deleteReview);
app.get('/trips/datasize', db.dataSize);

app.listen(4060, () => {
  console.log('MongoDb server listening on port 4060!');
});