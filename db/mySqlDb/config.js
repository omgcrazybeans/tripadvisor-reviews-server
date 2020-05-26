const mysql = require('mysql');

const mysqlConfig = {
  host: 'localhost',
  user: 'root',
  password: 'asddsa12',
  database: 'tripAdvisorReviews',
};
const connection = mysql.createConnection(mysqlConfig);
module.exports = connection;