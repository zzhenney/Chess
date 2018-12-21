if (process.env.NODE_ENV === 'development') {
  /* eslint-disable */
  require('dotenv').config();
  /* eslint-enable */
}

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');

const flash = require('connect-flash');
const passport = require('./config/passport');
const session = require('./config/session');

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');

const registrationRouter = require('./routes/registration');
const menuRouter = require('./routes/menu');
const rulesRouter = require('./routes/rules');
const scoreboardRouter = require('./routes/scoreboard');
const gameRouter = require('./routes/game');

const logoutRouter = require('./routes/logout');

const gamesAPIRouter = require('./routes/api/game');
const chatAPIRouter = require('./routes/api/chat');
const userAPIRouter = require('./routes/api/users');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  '/bootstrap',
  express.static(`${__dirname}/node_modules/bootstrap/dist/css/`)
);

app.use('/scripts', express.static(`${__dirname}/frontend`));

app.use(flash());
app.use(session);
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/game', gameRouter);
app.use('/login', loginRouter);

app.use('/registration', registrationRouter);
app.use('/menu', menuRouter);
app.use('/rules', rulesRouter);
app.use('/scoreboard', scoreboardRouter);
app.use('/game', gameRouter);

app.use('/logout', logoutRouter);

app.use('/api', gamesAPIRouter);
app.use('/api/chat', chatAPIRouter);
app.use('/api/users', userAPIRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('.env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
