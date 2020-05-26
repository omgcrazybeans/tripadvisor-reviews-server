var uuid = require('uuid');
const couchbase = require('couchbase');
var n1qlQuery = require('couchbase').N1qlQuery;
// var {bucket, cluster} = require('./index.js');


// Create a Couchbase Cluster connection
const cluster = new couchbase.Cluster(
  'couchbase://localhost',
  { username: 'HRSF_SJ',
  password: 'superSecret'
});

// get a reference to our bucket 'travel-sample'
// Open tripAdvisorReviews bucket from local cluster
const bucket = cluster.bucket('tripAdvisorReviews');

// get a reference to the default collection
const collection = bucket.defaultCollection()

// Query example
// SELECT name, brewery_id from `beer-sample` WHERE brewery_id IS NOT MISSING LIMIT 2;

// Query example 2
// `SELECT META(person).id, person.id, person.name, (SELECT timestamp, message FROM ${bucket._name} USE KEYS person.comments) AS comments FROM ${bucket._name} AS person WHERE person.type = 'person'`;

module.exports = {

  getAllTrips: (res, callback) => {

    var query1 = `SELECT * FROM ${bucket._name}`;

    const dbFetch = async (query) => {
      try {
        var result = await cluster.query(query); // May be able to change to collection.get()
        console.log('Upsert Result: ', result);

        let rows = result.rows;
        res.json(rows);
      }
      catch (error) {
        console.error(error)
      }
    }
    dbFetch(query1);
  },

  saveTrip: (data) => { // Create or Update trip function
    var trip = {
      tripName: data.tripName,
      tripLocation: {
        city: data.tripLocation.city,
        country: data.tripLocation.country
      },
      tripUrl: data.tripUrl,
      tripPicUrl: data.tripPicUrl,
      type: 'trip',
      timestamp: (new Date()),
    }; // Review documents appended to trip.reviews = [] and pushed into this array

    // If user doesnt exist, create a new ID and save
    var id = data.id ? data.id : uuid.v4();

    // For KV operations (get, insert, upsert, delete, replace, etc), you would work against the collection.
    // For queries, you use the cluster.
    // For queries, you need a query statement,
    // So, your query should read:


    const upsertUser = async (tripDoc) => {
      try {
        const key = `${tripDoc.type}_${tripDoc.id}` // Either use key or id to index document
        var result = await collection.upsert(id, tripDoc)
        console.log('Trip upsert Result: ', result);
      } catch (error) {
        console.error(error)
      }
    }
    upsertTrip(trip);
  },

  getById: (docId, res) => {
    var query = `SELECT * FROM tripAdvisorReviews`;

    const fetchById = async (query) => {
      try {
        let rows = result.rows;
        var result = await cluster.query(query, {parameters: [docId]});

        console.log('getById :', rows);
        res.json(rows);
      }
      catch (error) {
        console.error(error);
        res.status(404).json({"error": "No match for " + error})
      }
    }
    fetchById(query);
  },

  createReview: (data, user, res) => { // Create or Update review function

    var review = {
      userInfo: {                 // From imaginary user database/document
        userName: data.userInfo.userName,
        userCity: data.userInfo.userCity,
        userCountry: data.userInfo.userCountry
        userProfilePicUrl: data.userInfo.userProfilePicUrl,
        userContributions: data.userInfo.userContributions, // Optional
      },
      rating: data.rating,
      title: data.title,
      review: data.review,
      tripType: data.tripType,
      reviewDate: (new Date()),
      dateOfTrip: data.dot,
      helpful: data.helpful,
      sharedPicUrl: data.sharedPicUrl,
      type: 'review'
    };

    // Get userInfo document
    var userInfo = this.getById(user); // how do I reference this function?
    var id = uuid.v4();

    const upsertReview = async (reviewDoc, userDoc) => {
      try {
        var result = await collection.upsert(id, reviewDoc);
        console.log('User upsert Result: ', result);

      // If userInfo doesn't have a reviews section appended to it
      // add a reviews section to the userInfo document
      if (!userDoc.reviews) {
        userDoc.reviews = [];
      }

      // Push review into array
      // This array can accomodate multiple reviews from 1 user
      userDoc.reviews.push(results.id);
      userDoc.id = req.body.id;

      // Update user document with new review info
      // Should return user info plus review
      this.saveUser(userDoc);

      // Return new person with getById function
      return this.getById(user);
      }


      catch (error) {
        console.error(error);
      }
    }
    upsertReview(data, userInfo);
  },

  deleteReview: (userId, reviewId, res) => {
    console.log(`I'm in the deleteReview function`);

    const deleteReview = async (userId, reviewId) => {
      try {
        var result = await collection.remove(userId);
        console.log('Review delete result: ', result);
      }
      catch (error) {
        console.error(error);
        res.status(404).json({"error": "Could not delete " + error})
      }
    }
    deleteReview(userId, reviewId, res);
  }

};

