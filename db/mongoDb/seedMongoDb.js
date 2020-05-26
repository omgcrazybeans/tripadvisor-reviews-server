// const propPic = require('./images');
const dbGen = require('../dataMakers/dataMakerMongoDb.js');
// const db = require('./indexMongoDb.js');

module.exports = {

  bringMeMyTrips: () => {
    var objContainer = [];

    for (var i = 0; i < 1; i++) {
      let properties = dbGen.tripMaker();
      objContainer.push(properties);
    }

    // db.save(objContainer);
    console.log(`bringMeMyTrips: `, objContainer)

  },

  bringMeMyReviews: () => {
    var objContainer = [];

    for (var i = 0; i < 1; i++) {
      let properties = dbGen.reviewMaker();
      objContainer.push(properties);
    }

    // db.save(objContainer);
    console.log(`bringMeMyReviews: `, objContainer)
  }
};
