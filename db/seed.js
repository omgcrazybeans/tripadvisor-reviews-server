const _ = require('underscore');
const colors = require('colors');
const faker = require('faker');
const { connection, Listings } = require('./index.js');


/* =========================================== Faker ============================================ */

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const tripType = [
  'Couples', 'Family (young children)', 'Family (teens)',
  'Friends', 'Business', 'Solo',
];

/**
 * listings = [
 *  { reviews: [{}, {}, ..., {}] },
 *  { reviews: [{}, {}, ..., {}] }
 *  .
 *  .
 *  .
 *  { reviews: [{}, {}, ..., {}] }
 * ]
 */

let index = 0;
let year = 0;

const listings = _.range(0, 100).reduce((trips, listVal) => {
  trips.push({
    _id: listVal, // override ObjectId - the SHA
    reviews: _.range(0, _.random(1, 100)).reduce((reviews, reviewVal) => {
      index = _.random(0, months.length - 1);
      year = _.random(2015, 2020);

      reviews.push({
        _id: [listVal, reviewVal],
        username: faker.internet.userName(),
        location: `${faker.address.city()}, ${faker.address.state()}`,
        contributions: _.random(1, 1000),
        rating: _.random(1, 5),
        title: faker.lorem.sentence(),
        review: faker.lorem.paragraph(),
        dateOfReview: `${months[index]} ${year}`,
        dateOfTrip: `${months[_.random(0, index)]} ${year}`,
        tripType: tripType[_.random(0, tripType.length - 1)],
        helpful: _.random(1, 1000),
      });

      return reviews;
    }, []),
  });

  return trips;
}, []);


/* ========================================== MongoDB =========================================== */

// drop collection `listings` if exists
connection.dropCollection(Listings.modelName) // alternatively: Listings.collection.drop()
  .then((res) => (res ? console.log(`'${Listings.modelName.green}' ${'collection dropped'.yellow}`) : null))
  .catch(({ errmsg }) => console.error(colors.red(`'${Listings.modelName}': ${errmsg}`)));

// create an array of promises to save documents to collection
const promises = listings.reduce((accum, listing) => {
  accum.push(new Listings(listing).save());

  return accum;
}, []);

// save documents to collection
Promise.all(promises)
  .then(({ length }) => console.log(`${length.toString().cyan} documents saved to '${Listings.modelName.green}'`))
  .catch(console.error)
  .finally(() => connection.close());
