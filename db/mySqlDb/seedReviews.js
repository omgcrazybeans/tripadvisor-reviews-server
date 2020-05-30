const dbGen = require('../dataMakers/dataMakerMySql.js');
const db = require('./indexMySql.js');
const v8 = require('v8');

v8.getHeapStatistics()

module.exports = {

  // bringMeMyReviews: (numOfReviews, tripId, dateNum) => {
  //   if (numOfReviews === 0) {
  //     return;
  //   }
  //   var objContainer = [];

  //   for (var i = 0; i < numOfReviews; i++) {
  //     let review = dbGen.reviewMaker(tripId, dateNum);
  //     objContainer.push(review);
  //   }
  //   return objContainer;
  // }

};