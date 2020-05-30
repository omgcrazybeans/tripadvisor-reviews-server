const mysql = require('mysql');

const mysqlConfig = {
  host: 'localhost',
  user: 'root',
  password: 'asddsa12',
  database: 'tripAdvisorReviews',
};
const connection = mysql.createConnection(mysqlConfig);

connection.connect(() => console.log('connected to the database'));

module.exports = connection;