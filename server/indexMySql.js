// Set up our express application
var db = require('../db/mySqlDb/indexMySql.js');
var bodyParser = require('body-parser');
var cors = require('cors');
var express = require('express');
var app = express();

app.use(cors());
app.use(bodyParser.json());

// Serve the public directory to the root of the web server.
app.use(express.static('public'));

app.post('/seed', db.tripMaker);

app.get('/trips', db.getAllData);
app.post('/trips', db.addReview);
app.put('/trips/:id', db.updateReview);
app.delete('/trips/:id', db.deleteReview)

app.listen(4050, () => {
  console.log('MySql server listening on port 4050!');
});