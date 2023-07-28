// bring in express and sequelize instance from connectin.js
const express = require('express');
const sequelize = require('./config/connection');
// set up instance of express and port variable
const app = express();
const PORT = process.env.PORT ?? 3001;

// set up middleware for parsing json and form content
app.use(express.json());
app.use(express.urlencoded({ extended: true}));



app.listen(PORT, () => {
  console.log( `listening at http://localhost:${PORT}`);
});