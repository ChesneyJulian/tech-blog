// bring in class constructor of sequelize
const Sequelize = require('sequelize');
// bring in dotenv and configure it to use for env variables
require('dotenv').config();

// set up new instance of sequelize to look for jawsdb and passed initializers from dotenv
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  // pass host information from mysql
    {
      host: '127.0.0.1',
      dialect: 'mysql',
      port: 3306
    }
  );
// export sequelize
  module.exports = sequelize;