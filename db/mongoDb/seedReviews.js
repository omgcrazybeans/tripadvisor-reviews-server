const dbGen = require('../dataMakers/dataMakerMongoDb.js');
const generator = require('../dataMakers/randomGenerator.js');
const triggerMore = require('./seedTrips.js');

module.exports = {

  bringMeMyReviews: (dateNum) => {
    triggerMore.bringMeMyTrips();
  }
};