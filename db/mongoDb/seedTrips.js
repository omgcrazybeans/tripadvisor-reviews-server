const dbGen = require('../dataMakers/dataMakerMongoDb.js');
const generator = require('../dataMakers/randomGenerator.js');
const db = require('./indexMongoDb.js');
const seedReview = require('./seedReviews.js');

module.exports = {

  bringMeMyTrips: () => {
    var numOfReviews = generator.numOfReviews();
    var reviewsArray = seedReview.bringMeMyReviews(numOfReviews);
    var objContainer = [];
    var trips;

    for (var i = 0; i < 1; i++) { // the amount of trip documents to make
      trips = dbGen.tripMaker();
      trips.reviews = reviewsArray;
      objContainer.push(trips);
    };
    db.saveTripToDb(objContainer);
  }
};
