const uuid = require('uuid');
const Promise = require('bluebird');
const config = require('./key');
const URI = require('./mongoConfig.js');
const mongoose = Promise.promisifyAll(require('mongoose'));
const { COLLECTION, OPTIONS } = require('./config.js');
const { Schema } = mongoose;

// instance of child schema
const reviewSchema = new Schema({
  _id: String,
  userInfo: Object,
  rating: {type: Number, min: 1, max: 5},
  title: {type: String, required: true},
  review: {type: String, required: true, minlength: 1, maxlength: 400},
  tripType: {type: String, enum: ['couples', 'family1', 'family2', 'friends', 'business', 'solo']},
  reviewDate: Date,
  dateOfTrip: Date,
  helpful: Boolean,
  sharedPicUrl: Array,
  parentId: String
});

// instance of parent schema
const tripSchema = new Schema({
  _id: String,
  tripName: {type: String, unique: true},
  tripLocation: Object,
  tripUrl: String,
  tripPicUrl: String,
  tripDate: Date,
  reviews: [{ type: String, ref: 'reviews' }]
});

// create model(model_name, instance_of_schema, collection_name)
const Trip = mongoose.model(COLLECTION, tripSchema);
const Review = mongoose.model('reviews', reviewSchema);

// initial conn and handle initial conn errors
mongoose.connect(URI.URI, OPTIONS)
  .then(() => console.log(`Connected to mongoDB on PORT: 27017`))
  .catch(error => console.error(error));

// conn to database
const { connection } = mongoose;

tripSchema.index({_id: 1, tripDate: 1});
reviewSchema.index({ _id: 1, parentId: -1, tripType: 1});

// handle errors after initial conn was established by listening for error events on the conn
connection.on('error', (err) => console.error(err));

// successful conn
connection.once('open', () => {
  console.log(`Using database ${connection.name}`);
});

Trip.collection.stats((err, results) => {
  var megabytes = (results.size / 1000000);
  var stats = {};
  stats.dataInDatabaseB = `${results.size} bytes of data in collection`;
  stats.dataInDatabaseMb = `${megabytes} Mb of data in collection`;
  stats.docCount = `${results.count} documents in collection`;
  stats.avgObjSize = results.avgObjSize;
  stats.storageSize = results.storageSize;

  console.log(`Trip stats: `, stats);
});

Review.collection.stats((err, results) => {
  var megabytes = (results.size / 1000000);
  var stats = {};
  stats.dataInDatabaseB = `${results.size} bytes of data in collection`;
  stats.dataInDatabaseMb = `${megabytes} Mb of data in collection`;
  stats.docCount = `${results.count} documents in collection`;
  stats.avgObjSize = results.avgObjSize;
  stats.storageSize = results.storageSize;

  console.log(`Review stats: `, stats);
});

module.exports = {

  connection: connection, // conn to database
  tripsCol: Trip,  // db.trips collection
  tripSchema: tripSchema,
  reviewSchema: reviewSchema,


  getAllTrips: (req, res) => {

    // asc, desc, ascending, descending, 1, and -1.
    // { field: 'asc', test: -1 }
    // .sort('field -test')
    var dateNum = new Date(2019, 07)
   let date = {
      $gte: new Date(2019, 07)
  };
  console.log(`Date: `, dateNum);
    return Trip.find().sort({tripDate: 'desc'}).limit(1).exec((err, list) => {
      if (err) {
        res.status(400).next(err)
      }
      console.log('Trips found: ', list)
      res.status(200).json(list);
    });
  },

  getAllTripsAndReviews: (req, res) => {
    console.time(`Time to get all trip documents`);

    Trip.find().populate('reviews').sort({tripDate: 'asc'}).limit(20).catch(error => console.error(error));
    console.timeEnd(`Time to get all trip documents`);
  },

  getAllTrips1: (req, res) => {
    var countries = ["Egypt", "Cuba", "Brazil", "Canada", "China", "Italy", "Saudi Arabia", "Sweden", "Mexico", "Japan", "South Africa", "Ireland"];
    var location = countries[Math.floor(Math.random() * countries.length)];
    let country = {"tripLocation.country": location};

    return Trip.find(country)
    .sort({tripDate: -1})
    .limit(20).exec((err, list) => {
      if (err) {
        return res.status(400).next(err)
      }
      console.log('Trips1 returned');
      res.status(200).json(list);
    });
},

getAllReviews1: (req, res) =>  {
  var dateNum = new Date(2019, 07)
  let date = {
     $gte: new Date(2019, 07)
 };
  var countries = ["Egypt", "Cuba", "Brazil", "Canada", "China", "Italy", "Saudi Arabia", "Sweden", "Mexico", "Japan", "South Africa", "Ireland"];
  var bool = [true,false];
  var rateNum = [1, 2, 3, 4, 5];
  var location = countries[Math.floor(Math.random() * countries.length)];
  var trueFalse = bool[Math.floor(Math.random() * bool.length)];
  var rating = rateNum[Math.floor(Math.random() * rateNum.length)];
  let search = {"rating": rating, "userInfo.userCountry": location, "helpful": trueFalse, "dateOfTrip": date};

  return Review.find(search)
    .sort({tripDate: -1})
    .limit(3).exec((err, list) => {
      if (err) {
        return res.status(400).next(err)
      }
      console.log('Reviews returned: ', list);
      res.status(200).json(list);
    });
},

  getAllReviews: (req, res) => {

    Review.find().then(reviewDoc => {
      res.json(reviewDoc);
    }).catch(error => console.error(error));
  },

  getTripById: (req, res) => {
    var tripId = req.params.id;

    return Trip.find( { _id : tripId } )
    .populate('reviews')
    .exec((err, list) => {
      if (err) {
        return next(err)
      }
      console.log('newlyListed: ', list)
      res.json(list);
    });
  },

  addReview: (req, res) => {
    let changeBackToNewReview = req.body;

    if (newReview._id === undefined) {
      newReview._id = uuid.v4();
    };

    var reviewIdObj = newReview._id;

    Review.create(newReview, (err, addedReview) => {
      if (err) {
        return console.error(err);
      }
      console.log(`Successfully added review`, addedReview);
    });

    Trip.findOne({ _id: tripId }).exec((err, list) => {
      if (err) {
        return next(err)
      }
      var reviewsArray = list.reviews;
      reviewsArray.push(reviewIdObj);
      console.log(`ADD REVIEW, REVIEWS ARRAY: `, reviewsArray);
      list.save((err, updatedDocument) => {
          if (err) {
            return console.error(err);
          }
          console.log(`Successfully added reviewId to trip document: `,  updatedDocument);
          res.status(200);
        });
    });
  },

  addTrip: (req, res) => {
    let changeBackToNewTrip = req.body;

    if (newTrip._id === undefined) {
      newTrip._id = uuid.v4();
    };

    var TripIdObj = {_id: newTrip._id};

    Trip.create(newTrip, (err, addedTrip) => {
      if (err) {
        return console.error(err);
      }
      console.log(`Successfully added Trip: `, addedTrip);
      res.status(200);
    });
  },

  updateTrip: (req, res) => {
    let tripId = req.params.is;

    Trip.update({ _id: testId }, updatedTrip, (err, tripDoc) => {
      if (err) {
        return console.error(err);
      }
      console.log(`Successfully updated Trip: `, tripDoc);
      res.status(200);
    });
  },

  updateReview: (req, res) => {

    Review.update({ _id: reviewId }, updatedReview, (err, reviewDoc) => {
      if (err) {
        return console.error(err);
      }
      console.log(`Successfully updated Review: `, reviewDoc);
      res.status(200);
    });
  },

  deleteTrip: (req, res) => {

    let tripId = req.params.id;

      Trip.find({_id: testId})
      .then(tripDoc => {
        console.log(`This is the trip doc: `, tripDoc[0].reviews);
        tripDoc[0].reviews.forEach(reviewId => {
          Review.deleteOne({_id: reviewId})
          .then((revIdNum) => console.log(`Successfully deleted review: ${revIdNum._id} from reviews array!`))
          .catch(error => console.error(error));
        });
      })
      .catch(error => console.error(error));

      Trip.deleteOne({_id: testId})
      .then((tripDoc) => console.log(`Successfully deleted trip document: ${tripId}`))
      .catch(error => console.error(error));
      res.status(200);
  },

  deleteReview: (req, res) => {

    let reviewId = req.params.reviewId;
    let tripId = req.params.tripId;

    Trip.find({ _id: tripId })
    .then(tripDoc => {
      let reviewsArray = tripDoc[0].reviews;
      reviewsArray.pull(reviewId)

      console.log(`THIS IS THE TRIP DOCUMENT: ${tripDoc}`);
      console.log(`THIS IS THE REVIEWS ARRAY: ${reviewsArray}`);
      tripDoc.set('reviews', reviewsArray, { new: true }).then(() => console.log(`Trip document has been updated`)).catch(error => console.error(error));
    })
    .catch(error => console.error(error));

    Review.deleteOne( {_id: reviewId })
    .then(() => console.log(`Review: ${reviewId} successfully deleted from database!`))
    .catch(error => console.error(error));
  },

  killAllData: (req, res) => {

    Trip.deleteMany({}).exec((err, rev) => {
      if (err) {
        console.error(err);
      }
      console.log(`All trip documents have been deleted!`)
    });

    Review.deleteMany({}).exec((err, rev) => {
      if (err) {
        console.error(err);
      }
      console.log(`All review documents have been deleted`)
    });
  },

  queryTest1: (req, res) => {
    let tripId = req.params.tripId;

    Trip.find({_id: tripId}).explain('executionStats').then(results => console.log(`Results: `, results));
  },

  queryTest2: (req, res) => {

    let reviewId = req.params.reviewId;

    Review.find({_id: reviewId}).explain('executionStats').then(results => console.log(`Results: `, results));
  },

  dataSize: (req, res) => {

    Trip.collection.stats(function(err, results) {
      console.log(results.storageSize);
    });

    var size = Review.stats(function(err, results) {
    console.log(results.storageSize);
    });
    return size;
  },

  //*************************************************[SEEDING FUNCTIONS]*********************************** */

  saveTripToDb: (tripsContainer, i) => {

    // let trips = tripsContainer;

    console.time(`Bulk trips saved to db`);

    Trip.create(tripsContainer)
    .then(tripDoc => console.log(`Trip documents saved: ${i}`))
    .catch(error => console.error(error));

    console.timeEnd(`Bulk trips saved to db`);
  },

  saveReviewsToDb: (reviewsContainer) => {

    let i = reviewsContainer.length;

      Review.create(reviewsContainer, {ordered: false})
      .then(revDoc => {
        console.log(`Review documents saved: ${i}`);
      })
      .catch(error => console.error(error));
  }

};