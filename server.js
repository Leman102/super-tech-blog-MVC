const express = require('express');
const sequelize = require('./config/connection');
const path = require('path');
const routes = require('./controllers');
//import helper function
const helpers = require('./utils/helpers');
//use express-session and connect-session-sequelize
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3001;

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: 'Super_secret',
    cookie: {
        //Session expires in 10 minutes
        expires: 10 * 60 * 1000
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//add express static an take all of the contents of a folder and serve them as static assets
//This is useful for front-end specific files like images, style sheets, and JavaScript files.
app.use(express.static(path.join(__dirname, 'public')));

// turn on routes
app.use(routes);

//set up handlebars.js as thr spp's template engine of choice
const exphbs = require('express-handlebars');
//pass helpers
const hbs = exphbs.create({ helpers });//helpers

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// turn on connection to db and server
// sequelize.sync() method to establish the connection to the database
//force: true drops all tables every time the server runs 
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on PORT ${PORT}`));
});