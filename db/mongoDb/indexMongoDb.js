const uuid = require('uuid');
const Promise = require('bluebird');
const mongoose = Promise.promisifyAll(require('mongoose'));
const { COLLECTION, OPTIONS, URI } = require('./config.js');
// const trigger = require('./seedReviews.js');

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
  tripDate: Date,
  reviews: [{ type: String, ref: 'reviews' }]
});

// tripLocation: {
//     city: String,
//     country: String,
//   }


// create model(model_name, instance_of_schema, collection_name)
const Trip = mongoose.model(COLLECTION, tripSchema);
const Review = mongoose.model('reviews', reviewSchema);

// initial conn and handle initial conn errors
mongoose.connect(URI, OPTIONS)
  .then(() => console.log(`Connected to mongoDB on PORT: 27017`))
  .catch(console.error);

// conn to database
const { connection } = mongoose;

// Make hashed ID's instead of uuid's
// Trip.createIndex( { _id: hashedValue } );
// Review.createIndex( { _id: hashedValue } );

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

    return Trip.find().sort({tripDate: 'desc'}).limit(20).exec((err, list) => {
      if (err) {
        return next(err)
      }
      console.log('newlyListed: ', list)
      res.json(list);
    });
  },

  getAllTripsAndReviews: (req, res) => {
    console.time(`Time to get all trip documents`);

    Trip.find().populate('reviews').sort({tripDate: 'asc'}).limit(20).catch(error => console.error(error));
    console.timeEnd(`Time to get all trip documents`);
  },

  getAllReviews: (req, res) => {
    console.time(`Time to get all review documents`);

    Review.find().then(reviewDoc => {
      res.json(reviewDoc);
    }).catch(error => console.error(error));
    console.timeEnd(`Time to get all review documents`);
  },

  getTripById: (req, res) => {
    console.time(`Time test`);
    console.timeEnd(`Time test`);
    var docId = req.params.id;
    var tripId = "88cfe1fa-3da1-4790-b072-16ee5396f968";
    console.log(`docId: `, docId);

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

    //********************[ADD NEW REVIEW SCHEMA]******************** */

  addReview: (req, res) => {
    // req.params.tripId for trip _id number
    console.time(`Time to add review`);

    let changeBackToNewReview = req.body;
    let tripId = "5a018bcc-5a4d-489a-b6a5-5b795e9612cb";
    let newReview =
      {
        // _id: 'eb11f200-e666-4679-80f6-baceba7326b2',
        userInfo: {
          userName: 'Test addReview 1',
          userCity: 'Hellerview',
          userCountry: 'Puerto Rico',
          userProfilePicUrl: 'http://lorempixel.com/640/480/food',
          userContributions: 0
        },
        rating: 2,
        title: 'Test addReview 2',
        review: 'Test addReview 2',
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

    // var reviewIdObj = {_id: newReview._id};
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
        });
    });
    console.timeEnd(`Time to add review`);
  },

  addTrip: (req, res) => {
    console.time(`Time to add trip`);

    let changeBackToNewTrip = req.body;
    let newTrip = {
      // _id: '81098ca3-80d2-4d1b-9cec-e8230398888b',
      tripName: 'What a wonderful time in Japan',
      tripLocation: { city: 'Osaka', country: 'Japan' },
      tripUrl: 'https://www.tripadvisor.com/AttractionProductReview-g60750-81098ca3-80d2-4d1b-9cec-e8230398888b-verbPhrase_Take_a_scenic_wine_tour_around_Aydenmouth.html',
      tripPicUrl: 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/07/6t/k0/eg.jpg',
      reviews: [
        'c3eed110-26ea-4b07-923b-7042abe25fc7',
        'd52e6cc2-fbb6-4cb9-bd69-6003f498c594'
      ]
    };

    if (newTrip._id === undefined) {
      newTrip._id = uuid.v4();
    };

    var TripIdObj = {_id: newTrip._id};

    Trip.create(newTrip, (err, addedTrip) => {
      if (err) {
        return console.error(err);
      }
      console.log(`Successfully added Trip: `, addedTrip);
    });
    console.timeEnd(`Time to add trip`);
  },

  //****************************[UPDATE REVIEW SCHEMA]************ */

  updateTrip: (req, res) => {
    console.time(`Time to update trip`);

    let tripId = req.params.is;
    var testId = '5a018bcc-5a4d-489a-b6a5-5b795e9612cb';
    let updatedTrip = {
      // _id: '81098ca3-80d2-4d1b-9cec-e8230398888b',
      tripName: 'Get white girl wasted around Lexington',
      tripLocation: { city: 'Lexington', country: 'Uganda' },
      tripUrl: 'https://www.tripadvisor.com/AttractionProductReview-g60750-81098ca3-80d2-4d1b-9cec-e8230398888b-verbPhrase_Take_a_scenic_wine_tour_around_Aydenmouth.html',
      tripPicUrl: 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/07/6t/k0/eg.jpg'
      // reviews: [
      //   'c3eed110-26ea-4b07-923b-7042abe25fc7',
      //   'd52e6cc2-fbb6-4cb9-bd69-6003f498c594'
      // ]
    }

    Trip.update({ _id: testId }, updatedTrip, (err, tripDoc) => {
      if (err) {
        return console.error(err);
      }
      console.log(`Successfully updated Trip: `, tripDoc);
    });
    console.timeEnd(`Time to update trip`);
  },

  updateReview: (req, res) => { // Update reviews if reviews were appended to trips document
    console.time(`Time to update review`);

    let reviewId = 'ae10c3bf-79c2-43a8-9584-642b2a9f6483';
    let updatedReview = {
      // _id: '92fc4820-0559-4b78-95ba-54a49baf1b2a',
      userInfo: {
        userName: 'Hellen_FisherBrough2020',
        userCity: 'Down Under',
        userCountry: 'South Compton Island',
        userProfilePicUrl: 'http://lorempixel.com/640/480/food',
        userContributions: 3
      },
      rating: 1,
      title: 'Damn birds everywhere',
      review: 'This will be the last time I ever go to the South Comptin Isles. A bird stole my wallet and a dingo ate my baby.',
      tripTyper: 'family1',
      reviewDate: new Date(2019, 1),
      dateOfTrip: new Date(2018, 10),
      helpful: false,
      sharedPicUrl: [
        'http://lorempixel.com/640/480/nightlife',
        'http://lorempixel.com/640/480/city'
      ]
    };

    Review.update({ _id: reviewId }, updatedReview, (err, reviewDoc) => {
      if (err) {
        return console.error(err);
      }
      console.log(`Successfully updated Review: `, reviewDoc);
    });
    console.timeEnd(`Time to update review`);
  },

  deleteTrip: (req, res) => {
    console.time(`Time to delete trip`);

    let tripId = req.params.id;
    let testId = '5a018bcc-5a4d-489a-b6a5-5b795e9612cb';

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

      console.timeEnd(`Time to delete trip`);
  },

  deleteReview: (req, res) => {
    console.time(`Time to delete review`);

    let reviewId = 'f460a978-9698-4a5f-9802-a2945287d0da';
    let tripId = '9bf6c091-3896-4d38-bd53-2bc3c4ea7dd4';

    Trip.find({ _id: tripId })
    .then(tripDoc => {
      let reviewsArray = tripDoc[0].reviews;
      reviewsArray.pull(reviewId)
      // .then(() => console.log( `Review: ${reviewId} has been deleted from trip document!`))
      // .catch(error => console.error(error));
      console.log(`THIS IS THE TRIP DOCUMENT: ${tripDoc}`);
      console.log(`THIS IS THE REVIEWS ARRAY: ${reviewsArray}`);
      tripDoc.set('reviews', reviewsArray, { new: true }).then(() => console.log(`Trip document has been updated`)).catch(error => console.error(error));
    })
    .catch(error => console.error(error));

    Review.deleteOne( {_id: reviewId })
    .then(() => console.log(`Review: ${reviewId} successfully deleted from database!`))
    .catch(error => console.error(error));

    console.timeEnd(`Time to delete review`);
  },

  killAllData: (req, res) => {
    console.time(`Time to kill all database`);

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

    console.timeEnd(`Time to kill all database`);
  },

  queryTest1: (req, res) => {
    let tripId = `0d518ee1-3c00-4317-b5f3-5930d3a802e1`;

    // 'queryPlanner', 'executionStats', or 'allPlansExecution'

    Trip.find({_id: tripId}).explain('executionStats').then(results => console.log(`Results: `, results));
  },

  queryTest2: (req, res) => {

    let reviewId = `098c87fc-88e6-44ba-8e5c-7024c04fbf91`;

    Review.find({_id: reviewId}).explain('executionStats').then(results => console.log(`Results: `, results));
  },

  dataSize: (req, res) => {

    Trip.collection.stats(function(err, results) {
      console.log(results.storageSize);
    });

    var size = Review.stats(function(err, results) {
    console.log(results.storageSize);
    });
    return size

    // // db.orders.countDocuments({});
    // connection.once('open', () => {
    //   // call stats directly
    //   connection.db.stats((err, data) => {
    //     logger.debug(data);

    //   });

    //   // or you can call your mongoUsage here
    // });
    // Trip.totalSize()
    // .then(results => console.log(`Results: `, results))
    // .catch(error => console.error(error)); // Returns size of data in database (in bytes)
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

    console.time(`Bulk reviews save to db`);

      Review.create(reviewsContainer, {ordered: false})
      .then(revDoc => {
        console.log(`Review documents saved: ${i}`);
        // if (i === 50000) {
        //   trigger.bringMeMyReviews();
        // }
      })
      .catch(error => console.error(error));

      console.timeEnd(`Bulk reviews save to db`);
  }

};