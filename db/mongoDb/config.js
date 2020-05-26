const SERVER = '127.0.0.1:27017';
const DB = 'tripTest1';
const URI = `mongodb://${SERVER}/${DB}`;
const OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
const COLLECTION = 'trips';

module.exports = {
  COLLECTION,
  OPTIONS,
  URI,
};
