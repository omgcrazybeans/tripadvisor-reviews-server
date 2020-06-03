const URI = require('./mongoConfig.js');
const config = require('./key');
const SERVER = '127.0.0.1:27017';
const DB = 'tripTest1';

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
};
const COLLECTION = 'trips';

module.exports = {
  COLLECTION,
  OPTIONS,
  URI,
};
