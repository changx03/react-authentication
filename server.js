const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./config/config');
const authRoutes = require('./server/routes/auth');
const localSignupStrategy = require('./server/passport/local-signup');
const localLoginStrategy = require('./server/passport/local-login');
const authCheck = require('./server/middleware/auth-check');
const apiRoutes = require('./server/routes/api');

// Connect to the database and load models
require('./server/models').connect(config.dbUri);

const app = express();
const PORT = process.env.PORT || 3001;
app.set('port', PORT);

app.use(express.static('./server/static/'));
app.use(express.static('./client/dist/'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

// load passport strategies
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

// pass the authenticaion checker middleware
app.use('/api', authCheck);

// routes
app.use('/api', apiRoutes);
app.use('/auth', authRoutes);

// Route all url to React app
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(`${__dirname}/server/static/index.html`));
});

app.listen(app.get('port'), () => {
  console.log(`Express started on http://localhost:${app.get('port')} press Ctrl-C to terminate`);
});
