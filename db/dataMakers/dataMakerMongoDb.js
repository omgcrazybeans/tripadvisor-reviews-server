const generator = require('./randomGenerator.js');
const faker = require('faker');
const uuid = require('uuid');

module.exports = {

  tripMaker: (tripId, dateNum) => {
    var tripObj = {};
    var tripLocationObj = {};
    var reviewObj = {};
    var userInfoObj = {};

    let idMaker = () => {
      tripObj._id = tripId;
    };

    let tripNamer = (city, country) => {
      let word = faker.random.word();
      let words = faker.random.words();
      let noun = faker.hacker.noun();
      let adjective = faker.hacker.adjective();
      let ing = faker.hacker.ingverb();
      tripObj.tripName = `${adjective} ${city} ${ing} ${word} ${noun}`;
    };

    let tripLocationer = () => {
      var city = faker.address.city();
      var cityPrefix = faker.address.cityPrefix();
      var citySuffix = faker.address.citySuffix();
      var country = faker.address.country();
      tripObj.tripLocation = {
        city: city,
        country: country
      };

      tripNamer(city, country);
    };

    let tripUrler = () => {
      var tripNameSplit = tripObj.tripName.split(' ');
      var arrayJoin = tripNameSplit.join('_');
      tripObj.tripUrl = `https://www.tripadvisor.com/AttractionProductReview-g60750-${tripObj._id}-${arrayJoin}.html`;

    };

    let tripPicUrler = () => {
      tripObj.tripPicUrl = `https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/07/${generator.twoDigits()}/${generator.twoDigits()}/${generator.twoDigits()}.jpg`;faker.image.imageUrl();
    };

    let tripDater = () => {
      let date = generator.mongoDbTripDate(dateNum);

      tripObj.tripDate = new Date(date[0], date[1]);
    };

    idMaker();
    tripNamer();
    tripLocationer();
    tripUrler();
    tripPicUrler();
    tripDater();
    return tripObj;
  },

  reviewMaker: (tripId, dateNum) => {
    var reviewObj = {};
    var userInfoObj = {};

    let idMaker = () => {
      reviewObj._id = uuid.v4();
    };

    let userInfoer = () => {
      userInfoObj.userName = faker.internet.userName();
      userInfoObj.userCity = faker.address.city();
      userInfoObj.userCountry = faker.address.country();
      userInfoObj.userProfilePicUrl = generator.userProfilePic();
      userInfoObj.userContributions = generator.randomNum();
      reviewObj.userInfo = userInfoObj;
    };

    let ratinger = () => {
      reviewObj.rating = generator.rating();
    };

    let titler = () => {
      var noun = faker.hacker.noun();
      var verb = faker.hacker.verb();
      var adjective = faker.hacker.adjective();
      var phrase = faker.random.words();
      var ingverb = faker.hacker.ingverb();
      reviewObj.title = `${phrase}`;
    };

    let reviewer = () => {
      var phrase = faker.hacker.phrase();
      reviewObj.review = `${phrase}`;
    };

    let tripTyper = () => {
      reviewObj.tripTyper = generator.tripType();
    };

    let reviewDater = (tripDate) => {
      let revDate = generator.mongoDbDateScrambler(tripDate);
      let date = generator.mongoDbTripDate(tripDate);

      reviewObj.reviewDate = new Date(date[0], date[1]);
    };

    let dateOfTriper = () => {
      let tripDate = generator.mongoDbDateScrambler(dateNum);
      let date = generator.mongoDbTripDate(tripDate);

      reviewDater(tripDate);
      reviewObj.dateOfTrip = new Date(date[0], date[1]);
    };

    let helpfuler = () => {
      reviewObj.helpful = generator.helpful();
    };

    let sharedPicUrl = () => {
      var sharedPicArray = generator.sharedPic();
      reviewObj.sharedPicUrl = sharedPicArray;
    };

    let parentIder = () => {
      reviewObj.parentId = tripId;
    };

    idMaker();
    userInfoer();
    ratinger();
    titler();
    reviewer();
    tripTyper();
    dateOfTriper();
    helpfuler();
    sharedPicUrl();
    parentIder();

    return reviewObj;
  }


};