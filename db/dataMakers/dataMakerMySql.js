const generator = require('./randomGenerator.js');
const faker = require('faker');
const uuid = require('uuid');

module.exports = {

  tripMaker: (dateNum) => {
    var tripObj = {};
    var tripLocationObj = {};
    var reviewObj = {};
    var userInfoObj = {};
    var mysqlTrip = ['','NULL','','','','',''];

    let tripNamer = (city, country) => {
      mysqlTrip[0] = `${faker.random.words()} in ${city}`;
    };

    let tripLocationer = () => {
      var city = faker.address.city();
      var cityPrefix = faker.address.cityPrefix();
      var citySuffix = faker.address.citySuffix();
      var country = faker.address.country();
      mysqlTrip[2] = city;
      mysqlTrip[3] = country;

      tripNamer(city, country);
    };

    let tripUrler = () => {
      var tripNameSplit = mysqlTrip[0].split(' ');
      var arrayJoin = tripNameSplit.join('_');
      mysqlTrip[4] = `https://www.tripadvisor.com/AttractionProductReview-g60750-${arrayJoin}.html`;

    };

    let tripPicUrler = () => {
      mysqlTrip[5] = `https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/07/${generator.twoDigits()}/${generator.twoDigits()}/${generator.twoDigits()}.jpg`;
      // faker.image.imageUrl();
    };

    let tripDater = () => {
      mysqlTrip[6] = generator.mySqlTripDate(dateNum);
    };

    tripNamer();
    tripLocationer();
    tripUrler();
    tripPicUrler();
    tripDater();
    return mysqlTrip;
  },

  reviewMaker: (tripId, dateNum) => {
    var reviewObj = {};
    var userInfoObj = {};
    var mysqlReview = ['name0','city1','country2','profilePicUrl3','contributions4','rating5','title6','review7','tripType8','tripDate9','reviewDate10','helpful11', 'sharedPicUrl12', tripId];

    let userInfoer = () => {
      mysqlReview[0] = faker.internet.userName();
      mysqlReview[1] = faker.address.city();
      mysqlReview[2] = faker.address.country();
      mysqlReview[3] = generator.userProfilePic();
      mysqlReview[4] = generator.randomNum();
    };

    let ratinger = () => {
      mysqlReview[5] = generator.rating();
    };

    let titler = () => {
      var noun = faker.hacker.noun();
      var verb = faker.hacker.verb();
      var adjective = faker.hacker.adjective();
      var phrase = faker.random.words();
      var ingverb = faker.hacker.ingverb();
      mysqlReview[6] = `${phrase} ${adjective} ${noun}`;
    };

    let reviewer = () => {
      var phrase = faker.hacker.phrase();
      mysqlReview[7] = `${phrase}`;
    };

    let tripTyper = () => {
      mysqlReview[8] = generator.tripType();
    };

    let reviewDater = (dateOfTrip) => {
      var dateOfReview = generator.mySqlUserTripDateGen(dateOfTrip);
      var reviewDate = generator.mySqlTripDate(dateOfReview);

      mysqlReview[10] = reviewDate;
    };

    let dateOfTriper = () => {
      var dateOfTrip = generator.mySqlUserTripDateGen(dateNum);
      var tripDate = generator.mySqlTripDate(dateOfTrip);

      reviewDater(dateOfTrip);

      mysqlReview[9] = tripDate;

    };

    let helpfuler = () => {
      mysqlReview[11] = generator.helpful();
    };

    let sharedPicUrl = () => {
      var sharedPicArray = generator.sharedPic();
      var stringJoinedArray = sharedPicArray.join();
      mysqlReview[12] = stringJoinedArray;
    };

    userInfoer();
    ratinger();
    titler();
    reviewer();
    tripTyper();
    dateOfTriper();
    helpfuler();
    sharedPicUrl();

    return mysqlReview;
  }


};