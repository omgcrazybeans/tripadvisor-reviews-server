Server API

GET TRIP

GET /trip/:id

  Path Parameters:

    id: trip id
    Success Status Code: 200

  Returns: A single parent trip document in JSON that has a review array which contains id numbers that reference child review documents.

    parent trip document:

      {
        _id: String,
        tripName: {type: String, unique: true},
        tripLocation: Object,
        tripUrl: String,
        tripPicUrl: String,
        reviews: [review._id, review._id, ...]
      }

    child review document:

      {
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
      }


ADD TRIP

POST /trip

  Path Parameters: NONE

    Success Status Code: 201

  Request Body: Expects trip JSON object

    parent trip document:

      {
        _id: String,
        tripName: {type: String, unique: true},
        tripLocation: Object,
        tripUrl: String,
        tripPicUrl: String,
        reviews: []
      }

ADD REVIEW

POST /review

  Path Parameters:

    id: trip id
    Success Status Code: 201

  Request Body: Expects review JSON object

  child review document:

    {
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
    }

- title: is a mandatory parameter
- review: is a mandatory parameter
- helpful: is an optional perameter
- sharedPicUrl: is an optional parameter

UPDATE TRIP INFO

PATCH /trip/:id

  Path Parameters:

    id: review id
    Success Status Code: 204

  Request Body: Expects JSON with any of the following keys

    {
      tripName: {type: String, unique: true},
      tripLocation: Object,
      tripUrl: String,
      tripPicUrl: String,
      reviews: [review._id, review._id, ...]
    }

- No parameters are mandatory

UPDATE REVIEW INFO

PATCH /review/:id

  Path Parameters:

    id: review id
    Success Status Code: 204

  Request Body: Expects JSON with any of the following keys

    {
      title: String,
      review: String
    }

DELETE trip

DELETE trip/:id

  Path Parameters:

    id: trip id
    Success Status Code: 204

DELETE REVIEW

DELETE review/:id

  Path Parameters:

    id review id
    Success Status Code: 204