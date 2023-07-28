// bring in express and sequelize instance from connectin.js
const express = require('express');
const sequelize = require('./config/connection');
const exphbs = require('express-handlebars');
const routes = require('./controllers');

// set up instance of express and port variable
const PORT = process.env.PORT ?? 3001;
const app = express();
const hbs = exphbs.create();

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// set up middleware for parsing json and form content
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(routes);


sequelize.sync({force: false}).then(() => {
  app.listen(PORT, () => {
  console.log( `listening at http://localhost:${PORT}`)})
});