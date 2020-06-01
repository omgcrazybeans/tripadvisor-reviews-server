const faker = require('faker');
const Promise = require('bluebird');

var attributes = [

  'Desert Sunset', 'Tundra Peaks', 'Mountain Ridge', 'Open Spaces', 'Field Of Dreams',
  'Urban Trails', 'Suburban Colonies', 'Rural Heights', 'Alpine Valley', 'Savannah',
  'Tropical Meadows', 'Chapparal', 'Roxbury', 'Morning Star', 'Hidden Hills',
  'Pasadena', 'decisive', 'Washington', 'Hidden Hollow', 'Telegraoh',
  'McCarthy', 'Forest Hills', 'Anaheim', 'Martin Luther King', 'Beverly',
  'Rodeo Estates', 'Rancho Vino', 'N. 32nd', 'Money Bags', 'The Lords Glory',
  'Mason', 'Facebook', 'Billionaires', 'Broken Dreams', 'Money Maker',
  'Toxic Masculinity', 'Litigious Battles', 'Petulant Falls', 'Apache Creek', 'Temperamental One Percent',
  'Amber Valley', 'Coral Coast', 'Ivory Hunts', 'Jet Blue', 'Nacre Caves',
  'Pearly White', 'Obsidian Ranch', 'Monocle', 'Saint Deigo', 'Saint Francisco',
  'Saint Cruz', 'Saint Bernardino', 'Saint Bruno', 'Saint Archer', 'Iron Rod',
  'Noble Brick', 'Horse Bridal', 'Saint Barbara', 'Saint Jose', 'Tahoe Mills',
  'Victora Heights', 'Summet Estates', 'Ceasar Chavez', 'Mar Vista', 'Evenshire Flats',
  'Wilmington',
];

var objects = [
  'Cir.', 'Dr.', 'Way', 'Blvd.', 'Rd.', 'Ct.', 'Path',
  'Ave.', 'St.', 'Vis.', 'Vlg.', 'Vl.', 'Tpke.', 'Vly.',
  'Trl.', 'Ter.', 'Sqr.', 'Spgs.', 'Rue', 'Shls.', 'Shr.',
  'Shrs.', 'Rdg.', 'Rnch.', 'Pl.',
  'Pt.', 'Prt.', 'Pass', 'Pkwy.', 'Oval', 'Mls.', 'Mnr.', 'Loop', 'Ln.',
  'Knls.', 'Is.', 'Isle.', 'Hvn.', 'Hls.', 'Holw.', 'Gln.', 'Grvs.', 'Gdns.', 'Fls.',
  'Crst.', 'Cmns.', 'Cv.', 'Crk.', 'Clfs.', 'Cvs.', 'Cyn.', 'Blfs.', 'Bch.', 'Bnd.', 'Brks.',
];

var cities = [
  'Pasedena', 'San Francisco', 'Los Altos Hills', 'Tenderloin', 'Hollywood', 'East Oakland', 'Oakland', 'Catalina', 'North Park', 'La Puente', 'Laguna Hills', 'Laguna Beach', 'Malibu Canyon', 'Santa Clara', 'Palo Alto', 'Tahoe', 'Merced', 'San Deigo', 'Santa Monica', 'Compton', 'Tijuana', 'Newport', 'Venice', 'NoHo', 'SoHo', 'Beverly Hills', 'Washington Heights', 'Carmel', 'Vallejo', 'Walnut Creek', 'Marthas Vineyard', 'Hampton Downs', 'North HamptonShire', 'South Buckinghamshire', 'Leicester', 'Winchester', 'Oxford',
];

var alphaNum = [
  `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `0`, `a`, `b`, `c`, `d`, `e`, `f`, `g`, `h`, `i`, `j`, `k`, `l`, `m`, `n`, `o`, `p`, `q`, `r`, `s`, `t`, `u`, `v`, `w`, `x`, `y`, `z`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `0`
];

var tripTypeOptions = [
  'couples', 'family1', 'family2', 'friends', 'business', 'solo'
];

var monthStrings = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
];

var months = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
];

var years = [
  2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020
];

var mySqlMonths = [

];

var randomImages = [
  faker.image.city(), faker.image.food(), faker.image.nightlife(), faker.image.fashion(), faker.image.people(), faker.image.nature(), faker.image.animals()
]

module.exports = {

  streetName: function createAddress() {
    var randomAttribute = attributes[Math.floor(Math.random() * attributes.length)];
    var randomObject = objects[Math.floor(Math.random() * objects.length)];
    return randomAttribute + ' ' + randomObject;
  },
  cityName: function createCity() {
    var randomCity = cities[Math.floor(Math.random() * cities.length)];
    return randomCity;
  },
  twoDigits: () => {
    var firstDigit = alphaNum[Math.floor(Math.random() * alphaNum.length)];
    var secondDigit = alphaNum[Math.floor(Math.random() * alphaNum.length)];
    return `${firstDigit}${secondDigit}`;
  },
  randomNum: () => {
    var num = (Math.floor(Math.random() * 4));
    var numTwo = (Math.floor(Math.random() * 4));
    return (num * numTwo);
  },
  rating: () => {
    var num = (Math.ceil(Math.random() * 5));
    return num;
  },
  tripType: () => {
    var tripTypePicker = tripTypeOptions[Math.floor(Math.random() * tripTypeOptions.length)];
    return tripTypePicker;
  },
  helpful: () => {
    var helpfulPicker = (Math.floor(Math.random() * 100));
    if (helpfulPicker < 2) {
      return true;
    } else {
      return false;
    };
  },
  randomMonth: (month) => {
    var futureMonthPicker = Math.floor(Math.random() * 4);
    var futureMonth = month + futureMonthPicker;
    var numPicker = Math.floor(Math.random() * months.length);
    var monthPicker = months[numPicker];
    if (month === undefined) {
      return monthPicker;
    }
    if (month !== undefined) {
      if (futureMonth > 11) {
        var difference = futureMonth - 11;
        return months[difference];
      } else {
        return months[futureMonth];
      }
    }
  },
  randomYear: (year, month) => {
    var numPicker = Math.floor(Math.random() * years.length);
    var yearPicker = years[numPicker];

    if (year === undefined) {
      return yearPicker;
    }
    if (year !== undefined) {
      if (year === 2020) {
        return year;
      }
      if (month <= 3) {
        var newYear = year + 1;
        return newYear;
      } else {
        return year;
      }
    }
  },
  userProfilePic: () => {
    var picAPic = randomImages[Math.floor(Math.random() * randomImages.length)];
    return picAPic;
  },
  sharedPic: () => {
    var oddsPicker = Math.floor(Math.random() * 4);
    var picContainer = [];
    var numOfPics = 0;

    if (oddsPicker === 0) {
      let picOdds = Math.floor(Math.random() * 1);
      numOfPics = picOdds;
    }
    if (oddsPicker === 1) {
      let picOdds = Math.floor(Math.random() * 2);
      numOfPics = picOdds;
    }
    if (oddsPicker === 2) {
      let picOdds = Math.floor(Math.random() * 3);
      numOfPics = picOdds;
    }
    if (oddsPicker === 3) {
      let picOdds = Math.floor(Math.random() * 4);
      numOfPics = picOdds;
    }
    if (numOfPics === 0) {
      return picContainer;
    }
    for (var i = 0; i < numOfPics; i ++) {
      let picPicker = Math.floor(Math.random() * randomImages.length);
      let pic = randomImages[picPicker];

      picContainer.push(pic);
    }
    return picContainer;
  },
  numOfReviews: () => {
    var oddsPicker = Math.floor(Math.random() * 4);
    if (oddsPicker === 0) {
      return 0
    }
    if (oddsPicker === 1) {
      let odds = Math.floor(Math.random() * 2);
      let expGrowth = Math.floor(Math.exp(odds));
      return expGrowth;
    }
    if (oddsPicker === 2) {
      let odds = Math.floor(Math.random() * 3);
      let expGrowth = Math.floor(Math.exp(odds));
      return expGrowth;
    }
    if (oddsPicker === 3) {
      let odds = Math.floor(Math.random() * 4);
      let expGrowth = Math.floor(Math.exp(odds));
      return expGrowth;
    }
  },

  mySqlDateGen: () => {
    var dateNumPicker = Math.ceil(Math.random() * 90);
    return dateNumPicker;
  },

  mySqlTripDate: (datePicker) => {
    var month;
    var year;

    if (datePicker > 84) {
      year = 2020;
      month = datePicker - 84;
      if (month > 9) {
        return `${year}-${month}-01`;
      }
      return  `${year}-0${month}-01`;
    }
    if (datePicker > 72) {
      year = 2019;
      month = datePicker - 72;
      if (month > 9) {
        return `${year}-${month}-01`;
      }
      return  `${year}-0${month}-01`;
    }
    if (datePicker > 60) {
      year = 2018;
      month = datePicker - 60;
      if (month > 9) {
        return `${year}-${month}-01`;
      }
      return  `${year}-0${month}-01`;
    }
    if (datePicker > 48) {
      year = 2017;
      month = datePicker - 48;
      if (month > 9) {
        return `${year}-${month}-01`;
      }
      return  `${year}-0${month}-01`;
    }
    if (datePicker > 36) {
      year = 2016;
      month = datePicker - 36;
      if (month > 9) {
        return `${year}-${month}-01`;
      }
      return  `${year}-0${month}-01`;
    }
    if (datePicker > 24) {
      year = 2015;
      month = datePicker - 24;
      if (month > 9) {
        return `${year}-${month}-01`;
      }
      return  `${year}-0${month}-01`;
    }
    if (datePicker > 12) {
      year = 2014;
      month = datePicker - 12;
      if (month > 9) {
        return `${year}-${month}-01`;
      }
      return  `${year}-0${month}-01`;
    }
    if (datePicker > 0) {
      year = 2013;
      month = datePicker;
      if (month > 9) {
        return `${year}-${month}-01`;
      }
      return  `${year}-0${month}-01`;
    }
  },

  mySqlUserTripDateGen: (dateNum) => {
    var numGen = Math.floor(Math.random() * 4);
    return (dateNum + numGen);
  },

  mongoDbDateGen: () => {
    var dateNumPicker = Math.floor(Math.random() * 90);
    return dateNumPicker;
  },

  mongoDbTripDate: (datePicker) => {
    var dateArray = [];

    if (datePicker > 83) {
      dateArray[0] = 2020;
      dateArray[1] = datePicker - 83;
      return  dateArray;
    }
    if (datePicker > 71) {
      dateArray[0] = 2019;
      dateArray[1] = datePicker - 71;
      return  dateArray;
    }
    if (datePicker > 59) {
      dateArray[0] = 2018;
      dateArray[1] = datePicker - 59;
      return dateArray;
    }
    if (datePicker > 47) {
      dateArray[0] = 2017;
      dateArray[1] = datePicker - 47;
      return  dateArray;
    }
    if (datePicker > 35) {
      dateArray[0] = 2016;
      dateArray[1] = datePicker - 35;
      return  dateArray;
    }
    if (datePicker > 23) {
      dateArray[0] = 2015;
      dateArray[1] = datePicker - 23;
      return  dateArray;
    }
    if (datePicker > 11) {
      dateArray[0] = 2014;
      dateArray[1] = datePicker - 11;
      return dateArray;
    }
    if (datePicker >= 0) {
      dateArray[0] = 2013;
      dateArray[1] = datePicker;
      return  dateArray;
    }
  },

  mongoDbDateScrambler: (dateNum) => {
    var numGen = Math.floor(Math.random() * 4);
    return (dateNum + numGen);
  },

  wait: (n) => {
    let min = n * (1000 * 60);
    return new Promise(done => {
      setTimeout(() => {
        done();
      }, min);
    });
  }

};