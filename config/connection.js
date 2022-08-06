//import Sequelize
const Sequelize = require('sequelize');

//import env file
require('dotenv').config();

let sequelize;
//this iff will use either heroku=>addOn or local host
if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
  });
}

module.exports = sequelize;