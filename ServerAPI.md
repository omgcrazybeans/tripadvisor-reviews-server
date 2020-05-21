Server API

GET REVIEWS

GET /reviews

Path Parameters: NONE

Success Status Code: 200

Returns: JSON

    {
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
      helpful: Number
    }

GET SPECIFIC REVIEW INFO

GET /reviews/:id
Path Parameters:

id review id
Success Status Code: 200

Returns: JSON

    {
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
      helpful: Number
    }

ADD REVIEW

POST /reviews
Success Status Code: 201

Request Body: Expects JSON with the following keys.

    {
      username: String,
      location: String,
      contributions: Number,
      rating: Number,
      title: String,
      review: String,
      dateOfReview: String,
      dateOfTrip: String,
      tripType: String,
      helpful: Number
    }

UPDATE REVIEW INFO

PATCH /reviews/:id
Path Parameters:

id review id
Success Status Code: 204

Request Body: Expects JSON with any of the following keys (include only keys to be updated)

    {
      rating: Number,
      title: String,
      review: String
    }

DELETE REVIEW

DELETE restaurant/:id
Path Parameters:

id review id
Success Status Code: 204
