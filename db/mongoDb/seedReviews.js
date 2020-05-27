const dbGen = require('../dataMakers/dataMakerMongoDb.js');
const db = require('./indexMongoDb.js');

module.exports = {

  bringMeMyReviews: (numOfReviews) => {
    var objContainer = [];
    var reviewsIdContainer = [];

    for (var i = 0; i < numOfReviews; i++) {
      let review = dbGen.reviewMaker();
      objContainer.push(review);
      reviewsIdContainer.push(review._id);
    }
    db.saveReviewsToDb(objContainer);
    return reviewsIdContainer;
  }
};