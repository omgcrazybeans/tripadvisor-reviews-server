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
  title: {type: String, required: true},
  review: {type: String, required: true},
  tripType: String,
  reviewDate: Date,
  dateOfTrip: Date,
  helpful: Boolean,
  sharedPicUrl: Array
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


  getAllTrips: (req, res) => {
    return Trip.find().exec((err, list) => {
      if (err) {
        return next(err)
      }
      console.log('newlyListed: ', list)
      res.json(list);
    });

    // Return All documents
    // res.json(allTrips);

    // console.log(`ALL MY DOCS: `, allTrips);
    // Trip.find( {"userName" : "JimBob OvalDress" } );
     // Returns all reviews by JimBob OvalDress
  },

  getTripById: (req, res) => {
    var docId = req.params.id;
    var tripId = "88cfe1fa-3da1-4790-b072-16ee5396f968";
    console.log(`docId: `, docId);

    return Trip.find( { _id : tripId } ).exec((err, list) => {
      if (err) {
        return next(err)
      }
      console.log('newlyListed: ', list)
      res.json(list);
    });


  },

    //********************[ADD NEW REVIEW SCHEMA]******************** */

  addReview: async (req, res) => {
    // req.params.tripId for trip _id number
    let changeBackToNewReview = req.body;
    let tripId = "88cfe1fa-3da1-4790-b072-16ee5396f968";
    let newReview =
      {
        _id: 'eb11f200-e014-4679-80f6-baceba7326b2',
        userInfo: {
          userName: 'Meagan_Bruen',
          userCity: 'Hellerview',
          userCountry: 'Puerto Rico',
          userProfilePicUrl: 'http://lorempixel.com/640/480/food',
          userContributions: 0
        },
        rating: 2,
        title: 'aggregate Pants Soft',
        review: 'If we copy the port, we can get to the THX protocol through the auxiliary SAS monitor!',
        tripTyper: 'family2',
        reviewDate: new Date(2019, 1),
        dateOfTrip: new Date(2018, 10),
        helpful: false,
        sharedPicUrl: [
          'http://lorempixel.com/640/480/nightlife',
          'http://lorempixel.com/640/480/city'
        ]
      };

    if (newReview._id === undefined) {
      newReview._id = uuid.v4();
    };

    var reviewIdObj = {_id: newReview._id};

    Trip.create(newReview, (err, addedReview) => {
      if (err) {
        return console.error(err);
      }
      console.log(`Successfully added review`, addedReview);
    });

    Trip.findOne({ _id: tripId }).exec((err, list) => {
      if (err) {
        return next(err)
      }
      // res.json(list);
      var reviewsArray = list.reviews;
      reviewsArray.push(reviewIdObj);
      console.log(`ADD REVIEW, REVIEWS ARRAY: `, reviewsArray);
      list.save((err, updatedDocument) => {
          if (err) {
            return console.error(err);
          }
          console.log(`Successfully added reviewId to trip document: `,  updatedDocument);
        });
    });

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

  saveTripToDb: (tripWithReviews) => {

    console.log('Im in saveTripToDb: ', tripWithReviews);

    // tripWithReviews.forEach(reviews => {
    //   var trip = new Trip(reviews); //new document
    //   trip.save((err, tripReview) => {
    //     if (err) {
    //       console.log(err);
    //     } else {
    //       console.log('DATA SAVED IN database/indexMongoDb.js: ', tripReview)
    //     }
    //   })
    // })
      // propertyArray.push(propertyObj);
  },

  saveReviewsToDb: (reviewsContainer) => {
    console.log(`SAVE REVIEWS TO DB: `, reviewsContainer)
    var containerLength = reviewsContainer.length;

    if (containerLength === 0) {
      console.log(`No reviews to save`);
    } else {
      // reviewsContainer.forEach();
    };
  }

};