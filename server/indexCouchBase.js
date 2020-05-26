// Set up our express application
const db = require('../db/couchBase/index.js');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const express = require('express');
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Serve the public directory to the root of the web server.
app.use(express.static(path.join(__dirname, '../client/dist')));



app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/reviews', (req, res) => {
  db.getAll(res, (error, result) => {
    if (error) {
      return res.status(400).send(error);
    }
    console.log('GETALL result: ', result);
    res.send(result);
  });
});



app.get('/reviews/:id', (req, res) => {
  var userId = "46cb41d6-c8e0-43eb-af60-6160465bf700"
  var realUserId = req.params.id;

  db.getById(userId, (error, result) => {
    if (error) {
      return res.status(400).send(error);
    }
    res.send(result);
  });
});



app.post('/addUser', (req, res) => { // For seeding purposes

  var testReqBody = {
    "name": {
      "first": "Joey",
      "last": "Ramon"
    },
    "email": "blitzkrieg_bop@gmail.com",
    "contributions": 23
  };

  db.saveUser(testReqBody, (error, result) => {
    if (error) {
      return res.status(400).send(error);
    }
    res.send(result);
  });
});

app.post('/reviews', (req, res) => {
  let userInfo = req.params;
  let userReview = req.body
  let newReview = {
    id: "46cb41d6-c8e0-43eb-af60-6160465bf700",
    title: `Worst trip ever!`,
    message: `Hotel was full of bugs and room service wsa non-existant!`,
    timestamp: (new Date()),
    location: {
      Hotel: `Hilton`,
      City: `Dubai`,
      County: `U.A.E`
    },
    rating: 1,
    dateOfTrip: `2020-05-22`,
    tripType: `hotel stay`,
    helpful: 3,
    type: 'comment'
  }

  return db.createReview(newReview, userInfo, res);

});

app.put('/reviews', (req, res) => {
  let userId = `User id number`;
  let reviewId = `Review id number`;
  let reviewContent = `Review content`;

  db.createReview(userId, reviewId, reviewContent, res);
})

app.delete('/reviews', (req, res) => {
  let userId = `Some id number`;
  let reviewId = `Some id number as well`;

  db.deleteReview(userId, reviewId, res);
})

app.listen(4040, () => {
  console.log('Couchbase express server listening on port 4040!');
});