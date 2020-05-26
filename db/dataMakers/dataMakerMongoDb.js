const generator = require('./randomGenerator.js');
const faker = require('faker');
const uuid = require('uuid');

module.exports = {

  tripMaker: () => {
    var tripObj = {};
    var tripLocationObj = {};
    var reviewObj = {};
    var userInfoObj = {};

    let idMaker = () => {
      tripObj._id = uuid.v4();
    };

    let tripNamer = (city, country) => {
      tripObj.tripName = `verbPhrase Take a scenic wine tour around ${city}`;
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

    idMaker();
    tripNamer();
    tripLocationer();
    tripUrler();
    tripPicUrler();
    return tripObj;
  },

  reviewMaker: () => {
    var reviewObj = {};
    var userInfoObj = {};

    let idMaker = () => {
      userInfoObj._id = uuid.v4();
    };

    let userInfoer = () => {
      userInfoObj.userName = faker.internet.userName();
      userInfoObj.userCity = faker.address.city();
      userInfoObj.userCountry = faker.address.country();
      userInfoObj.userProfilePicUrl = faker.image.people();
      userInfoObj.userContributions = generator.randomNum();
      reviewObj.userInfo = userInfoObj;
    };

    let ratinger = () => {
      reviewObj.rating = generator.rating();
    };

    let titler = () => {
      reviewObj.title = `Best trip ever.`;
    };

    let reviewer = () => {
      var phrase = faker.random.words();
      reviewObj.review = `${phrase}`;
    };

    let tripTyper = () => {
      reviewObj.tripTyper = generator.tripType();
    };

    let reviewDater = (month, year) => {
      var reviewMonth = generator.randomMonth(month);
      var reviewYear = generator.randomYear(year, reviewMonth);
      var date = (new Date(reviewYear, reviewMonth));
      reviewObj.reviewDate = date;
    };

    let dateOfTriper = () => {
      var monthNum = generator.randomMonth();
      var yearNum = generator.randomYear();
      var tripDate = new Date(yearNum, monthNum);

      reviewDater(monthNum, yearNum);
      reviewObj.dateOfTrip = tripDate;

      console.log(`new Date: `, tripDate);
    };

    let helpfuler = () => {
      reviewObj.helpful = generator.helpful();
    };

    let sharedPicUrl = () => {
      var sharedPic = faker.image.nature();
      reviewObj.sharedPicUrl = sharedPic;
    };

    idMaker();
    userInfoer();
    ratinger();
    titler();
    reviewer();
    tripTyper();
    reviewDater();
    dateOfTriper();
    helpfuler();
    sharedPicUrl();

    // return reviewObj;

    console.log(`ReviewObj: `, reviewObj);
  }


};