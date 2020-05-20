const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const {
  connection,
  Listings,
  listingsSchema,
  reviewSchema,
} = require('../db/index.js');

const { modelName } = Listings;
const { expect } = chai;

chai.use(chaiAsPromised);
chai.should();

describe('#countDocuments()', () => {
  const count = 100;

  // test correct number of documents in collection
  it(`expect '${modelName.yellow}' collection to have ${count.cyan} documents`, (done) => {
    Listings.countDocuments().should.eventually.equal(count);
    done(); // notify Mocha asynchronous test done

    // alternatively:
    // Listings.countDocuments()
    // .then(res => expect(res).to.equal(count)) // assertion test
    // .catch(console.error)
    // .finally(() => connection.close()) // close the database connection
  });
});

describe('Parent Schema', () => {
  // expected parent schema
  const parent = {
    _id: Number,
    reviews: Array,
  };
  const fields = Object.keys(parent);

  // test parent schema's fields
  it(`expect '${modelName.yellow}' schema to have ${fields.join(', ').green} fields`, (done) => {
    Listings.findOne().should.eventually.have.all.keys(...fields); // spread syntax
    done();
  });

  // test parent schema's fields' data types
  Object.entries(parent).forEach(([field, { name }]) => {
    it(`expect '${modelName.yellow}' schema '${field.green}' field to be of type ${name.cyan}`, () => {
      expect(listingsSchema.path(field).instance).to.equal(name);
    });
  });
});

describe('Child Schema', () => {
  // expected child schema
  const child = {
    _id: Array,
    username: String,
    location: String,
    contributions: Number,
    rating: Number,
    title: String,
    review: String,
    dateOfReview: String,
    dateOfTrip: String,
    tripType: String,
    helpful: Number,
  };
  const fields = Object.keys(child);
  const childName = listingsSchema.childSchemas[0].model.path;

  // test child schema's fields
  it(`expect '${childName.yellow}' schema to have fields: ${fields.join(', ').green}`, (done) => {
    Listings.findOne()
      .then(({ reviews }) => reviews[0].to.have.all.keys(...fields))
      .catch(console.error);
    done();
  });

  // test child schema's fields' data types
  Object.entries(child).forEach(([field, { name }]) => {
    it(`expect '${childName.yellow}' schema '${field.green}' field to be of type ${name.cyan}`, () => {
      expect(reviewSchema.path(field).instance).to.equal(name);
    });
  });
});

// close MongoDB database connection
connection.close();
