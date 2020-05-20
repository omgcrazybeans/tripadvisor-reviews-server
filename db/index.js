const colors = require('colors');
const Promise = require('bluebird');
const mongoose = Promise.promisifyAll(require('mongoose'));
const { COLLECTION, OPTIONS, URI } = require('./config.js');

const { Schema } = mongoose;

// instance of child schema
const reviewSchema = new Schema({
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
});

// instance of parent schema
const listingsSchema = new Schema({
  _id: Number, // override ObjectId - the SHA
  reviews: [reviewSchema],
});

// create model(model_name, instance_of_schema, collection_name)
const Listings = mongoose.model(COLLECTION, listingsSchema);

// initial conn and handle initial conn errors
mongoose.connect(URI, OPTIONS)
  .then(() => console.log(`Connected to ${colors.green('mongoDB')} Database`))
  .catch(console.error);

// conn to database
const { connection } = mongoose;

// handle errors after initial conn was established by listening for error events on the conn
connection.on('error', (err) => console.error(err));

// successful conn
connection.once('open', () => {
  console.log(`Using database ${connection.name.green}`);
});

module.exports = {
  connection, // conn to database
  Listings, // db.listings collection
  listingsSchema,
  reviewSchema,
};
