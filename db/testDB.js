const { connection, Listings } = require('./index.js');

const review = {
  _id: [2, 0],
  username: 'Gaston94',
  location: 'North Glennieville, Oklahoma',
  contributions: 251,
  rating: 5,
  title: 'Dolores nobis aperiam et.',
  review: 'Voluptatem iste molestias voluptatem et architecto architecto. Enim cumque reprehenderit. Soluta aut blanditiis ea.',
  dateOfReview: 'December 2019',
  dateOfTrip: 'October 2019',
  tripType: 'Friends',
  helpful: 481,
};

const times = [
  { 'Mar-May': ['March', 'April', 'May'] },
  { 'Jun-Aug': ['June', 'July', 'August' ]},
  { 'Sep-Nov': ['September', 'October', 'November'] },
  { 'Dec-Feb': ['December', 'January', 'February'] },
];

times.map((time, index) => {
  const [key] = Object.keys(time);

  time[key]; // array of 3 months

});

const months = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
  'November', 'December',
];

Listings.findOne({ 'reviews.dateOfTrip': 'October 2019' })
  .then(console.log)
  .catch(console.error)
  .finally(() => connection.close());
  // $or: [{ dateOfTrip: { $regex: /September/ } }, { dateOfTrip: { $regex: /October/ } }, { dateOfTrip: { $regex: /November/ } }]
