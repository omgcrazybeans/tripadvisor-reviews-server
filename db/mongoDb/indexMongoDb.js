const colors = require('colors');
const Promise = require('bluebird');
const mongoose = Promise.promisifyAll(require('mongoose'));
const { COLLECTION, OPTIONS, URI } = require('./config.js');

const { Schema } = mongoose;

// instance of child schema
const reviewSchema = new Schema({
  _id: String,
  userInfo: Object,
  rating: Number,
  title: String,
  review: String,
  tripType: String,
  reviewDate: Date,
  dateOfTrip: Date,
  helpful: Boolean,
  sharedPicUrl: String
});

// userInfo: {
//   userName: String,
//   userCity: String,
//   userCountry: String,
//   userProfilePicUrl: String,
//   userContributions: String
// }

// instance of parent schema
const tripSchema = new Schema({
  _id: String,
  tripName: {type: String, unique: true},
  tripLocation: Object,
  tripUrl: String,
  tripPicUrl: String,
  reviews: Array
});

// tripLocation: {
//     city: String,
//     country: String,
//   }

// reviews: Array


// create model(model_name, instance_of_schema, collection_name)
const Trip = mongoose.model(COLLECTION, tripSchema);

// Trip.init().then(() => {
    // safe to create users now.
    // Do this or else tripName: { type: String, unique: true } won't work
// });

// initial conn and handle initial conn errors
mongoose.connect(URI, OPTIONS)
  .then(() => console.log(`Connected to mongoDB on PORT: 27017`))
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

  connection: connection, // conn to database
  tripsCol: Trip,  // db.trips collection
  tripSchema: tripSchema,
  reviewSchema: reviewSchema,


  getAllTrips: () => {
    Trip.find(); // Return All documents

    Trip.find( {"userName" : "JimBob OvalDress" } ); // Returns all reviews by JimBob OvalDress
  },

    //********************[ADD NEW REVIEW SCHEMA]******************** */

  addReview: (req, res) => {

    let newReview = req.body;

    const trip = Trip.findOne({ _id: req.body._id });

    const reviews = trip.tripReviews;
    console.log(reviews);
    console.log(Array.isArray(reviews)); // true

    trip.reviews.push(newReview);

    const updated = trip.save((err,cust) => {
      if (err) {
        return console.error(err);
      }
      console.log(`Successfully added review`)
    });
    console.log(`Complete new document: `, updated); // Return trip object plus appended reviews
  },

  //****************************[UPDATE REVIEW SCHEMA]************ */

  updateReview: (req, res) => { // Update reviews if reviews were appended to trips document

    let updatedReview = req.body;

    const trip = Trip.findOne({ _id: req.body._id });

    const specificReview =
    trip.reviews.findOne({ _id: req.body.reviewId });

    specificReview = updatedReview;

    const updated = specificReview.save((err, rev) => {
      if (err) {
        return console.error(err);
      }
      console.log(`Successfully updated review`)
    });
    console.log(updated);
  },

  updatedReview2: (req, res) => { // Update review. If reviews were saved as docs
    let revInfo = req.body;

    Trip.update(
      { _id: req.body._id },
      { $set: {
        rating: `${revInfo.rating}`,
        title: `${revInfo.title}`,
        review: `${revInfo.review}`,
        tripType: `${revInfo.tripType}`,
        reviewDate: `${revInfo.reviewDate}`,
        dateOfTrip: `${revInfo.dateOfTrip}`,
        helpful: `${revInfo.helpful}`,
        sharedPicUrl: `${revInfo.sharedPicUrl}`
        }
      }, (err, rev) => {
        if (err) {
          console.error(err);
        }
        console.log(`Review was successfully updated`);
      });
  },

  deleteReview: (req, res) => {

    let reviewId = req.body._id;

    Trip.remove( { } ); // Remove all documents in collection

    Trip.remove( { userName: req.body.userName } ); // Removes all documents with a specific username

    Trip.remove( {_id: reviewId }, (err, rev) => {
      if (err) {
        console.error(err);
      }
      console.log(`Review was successfully deleted`)
    });
  },

  dataSize: (req, res) => {

    Trip.totalSize(); // Returns size of data in database (in bytes)
  },

  //*************************************************[SEEDING FUNCTIONS]*********************************** */

  addTrip: () => {
    console.log(`I'm in the addTrip function`);
  },

  saveToDb: (tripWithReviews) => {
    console.log('save: ', tripWithReviews)

    tripWithReviews.forEach(reviews => {
      var trip = new Trip(reviews); //new document
      trip.save((err, tripReview) => {
        if (err) {
          console.log(err);
        } else {
          console.log('DATA SAVED IN database/indexMongoDb.js: ', tripReview)
        }
      })
    })
      // propertyArray.push(propertyObj);
  },

};