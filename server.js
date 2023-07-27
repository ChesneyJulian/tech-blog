// bring in express and sequelize instance from connectin.js
const express = require('express');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT ?? 3001;


app.use(express.json());
app.use(express.urlencoded({ extended: true}));



app.listen(PORT, () => {
  console.log( `listening at http://localhost:${PORT}`);
});