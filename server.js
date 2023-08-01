// bring in express and sequelize instance from connectin.js
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const session =  require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/connection');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
// set up instance of express and port variable
const PORT = process.env.PORT ?? 3001;
const app = express();

//  set up session with cookies default
const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));
const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// set up middleware for parsing json and form content
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);


sequelize.sync({force: false}).then(() => {
  app.listen(PORT, () => {
  console.log( `listening at http://localhost:${PORT}`)})
});