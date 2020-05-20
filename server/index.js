const colors = require('colors');
const compression = require('compression');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const path = require('path');
const Promise = require('bluebird');
const spdy = require('spdy');
const { OPTIONS, PORT } = require('./config.js');
const { Listings } = require('../db/index.js');


/* ======================================= Express server ======================================= */

// create express application
const app = express();

// enable cors
app.use(cors());

// compression middleware
app.use(compression());

// security-related HTTP middleware
app.use(helmet());

// set the 'Content-Type' that the middleware will parse
app.use(express.json());

// logger
app.use(({ body, method, secure, url }, res, next) => {
  console.log(`${method.yellow} request at ${secure} ${url.cyan}`);
  console.log(body);

  // next middleware
  next();
});

// serving static file
app.use(express.static(path.join(__dirname, '../client/dist')));

/* ==================================== HTTP request handlers =================================== */

// for '../test/server.test.js'
app.get('/reviews/:id', ({ params: { id } }, res) => {
  Listings.findById(id)
    .then((query) => res.status(200).send(query))
    .catch((err) => res.status(500).send(err));
});

app.get('/reviews', (req, res) => {
  Listings.findOne()
    .then(({ reviews }) => res.status(200).send(reviews))
    .catch((err) => res.status(500).send(err));
});

app.put('/reviews', ({ body: { _id } }, res) => { // nested destructuring
  Listings.findOne()
    .then((query) => {
      const doc = query;
      doc.reviews.id(_id).helpful += 1;
      return Listings.findByIdAndUpdate({ _id: _id[0] }, new Listings(doc));
    })
    .then(() => Listings.findOne())
    .then(({ reviews }) => res.status(200).send(reviews)) // update
    .catch((err) => res.status(500).send(err));
});

const server = spdy.createServer(OPTIONS, app);
server.listen = Promise.promisify(server.listen);
server.listen(PORT)
  .then(() => console.log(`HTTP/2 server listening on PORT ${colors.green(PORT)}`))
  .catch(console.error);

module.exports = {
  server,
};
