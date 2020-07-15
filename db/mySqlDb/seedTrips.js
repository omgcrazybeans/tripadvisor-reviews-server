const dbGen = require('../dataMakers/dataMakerMySql.js');
const generator = require('../dataMakers/randomGenerator.js');
const db = require('./indexMySql.js');
const seedReview = require('./seedReviews.js');

module.exports = {

  bringMeMyTrips: () => {
    var tripsContainer = [];
    var reviewsContainer = [];
    var trips;
    var reviews;
    var incriment = 0; // increase by 1 for every .5 mill successful queries
    var tripId = 500000 * incriment;

    for (var i = 0; i < 500000; i++) {
      let dateNum = generator.mySqlDateGen();
      let numOfReviews = generator.numOfReviews();

      trips = dbGen.tripMaker(dateNum);
      tripsContainer.push(trips);

      for (var j = 0; j < numOfReviews; j++) {
        let reviews = dbGen.reviewMaker((tripId + (i + 1)), dateNum);
        reviewsContainer.push(reviews);
      };

      if ((i % 1000) === 0) {
        console.log(`Generated ${i} trips`);
      };
    };
    db.seedTrips(tripsContainer);
    db.seedReviews(reviewsContainer);
  }
};