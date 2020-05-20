# tripadvisor-reviews-server

======= 1. Seeding Instructions =======

============= Terminal  1 =============
$ npm run seed

============= Terminal  2 =============

$ mongo

> show dbs
> use tripAdvisor
> show collections
> db.listings.count()
> db.listings.findOne({}, { "_id": 1 })





========= 2. API Instructions =========

============ 2A Terminal 3 ============
$ npm start

============ 2B Terminal 4 ============
$ npm run api

========= 2C Close Terminal 3 =========





========= 3. Test Instruction =========

============= Terminal  5 =============
$ npm test





========= 4. Run  Application =========

============= Terminal  6 =============
$ npm start

============= Terminal  7 =============
$ npm run react-dev





========== Test NightWatchJS ==========

============= Terminal  X =============
$ ./node_modules/.bin/nightwatch node_modules/nightwatch/examples/tests/ecosia.js
