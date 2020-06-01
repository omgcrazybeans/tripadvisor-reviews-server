const dbGen = require('../dataMakers/dataMakerMongoDb.js');
const generator = require('../dataMakers/randomGenerator.js');
const db = require('./indexMongoDb.js');
const uuid = require('uuid');

module.exports = {

  bringMeMyTrips: () => {
    var tripsContainer = [];
    var reviewsContainer = [];
    var trips;

    console.time(`Time to generate 50000`);

    for (var i = 0; i < 50001; i++) {

      let dateNum = generator.mongoDbDateGen();
      let numOfReviews = generator.numOfReviews();
      let tripId = uuid.v4();
      let reviewsIdContainer = [];

      trips = dbGen.tripMaker(tripId, dateNum);
      tripsContainer.push(trips);

      for (var j = 0; j < numOfReviews; j++) {
        if (numOfReviews !== 0) {
          let review = dbGen.reviewMaker(tripId, dateNum);
          reviewsContainer.push(review);
          reviewsIdContainer.push(review._id);
        };
      };

      trips.reviews = reviewsIdContainer;

      if ((i % 1000) === 0) {
        console.log(`Generated ${i} trips`);
      };

      if ((i % 10000) === 0) {
        db.saveTripToDb(tripsContainer, i);
        db.saveReviewsToDb(reviewsContainer, i);

        tripsContainer.splice(0, tripsContainer.length);
        reviewsContainer.splice(0, reviewsContainer.length);
        // console.time(`Waiting on promise`);
        // generator.wait(.25)
        // console.timeEnd(`Waiting on promise`);
      };

      if (i === 9999999) {
        db.saveTripToDb(tripsContainer, i);
        db.saveReviewsToDb(reviewsContainer, i);
      };
    };
    console.timeEnd(`Time to generate 50000`);
  }
};
