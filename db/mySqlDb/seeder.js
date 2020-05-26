const db = require('../config.js');

for (let i = 1; i <= 100; i += 1) {
  db.query('INSERT INTO users (user_id) VALUES (?)', [i]);
  db.query('INSERT INTO reviews (review_id) VALUES (?)', [i]);
}