// bring in promise version of mysql2
const mysql = require('mysql2/promise');
// set up dotenv config to use variables from dotenv file
require('dotenv').config();

// create and run async function to initialize database
(async () => {
  try {
    // get database name from process.env
    const { DB_NAME } = process.env;
    // await mysql connection
    const db = await mysql.createConnection('mysql://root@127.0.0.1:3306');
    // if npm run seed is the process.argv, then drop database if exists in order to reinitialize database
    if (process.argv[2] === 'seed') {
      await db.execute(`DROP DATABASE IF EXISTS ${DB_NAME}`);
      console.log(`${DB_NAME} dropped`);
    }
    const [header] = await db.execute(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`);
    // display message in console if database was created/exists
    console.log(`${DB_NAME} ${!header.warningStatus ? 'created' : 'exists'}`);
    process.exit(0);
    // catch any errors and respond with them
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();