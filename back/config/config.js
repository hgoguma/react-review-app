const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    "development": {
      "username": "root",
      "password": process.env.DB_PASSWORD,
      "database": "react-movie-review",
      "host": "127.0.0.1",
      "dialect": "mysql",
      "timezone": "+09:00",
      "operatorsAliases": false
    },
    "test": {
      "username": "root",
      "password": process.env.DB_PASSWORD,
      "database": "react-movie-review",
      "host": "127.0.0.1",
      "dialect": "mysql",
      "timezone": "+09:00",
      "operatorsAliases": false
    },
    "production": {
      "username": "root",
      "password": process.env.DB_PASSWORD,
      "database": "react-movie-review",
      "host": "127.0.0.1",
      "dialect": "mysql",
      "timezone": "+09:00",
      "operatorsAliases": false
    }
}
  