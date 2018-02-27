// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');
var mysql = require('mysql');
const app = express();

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'user',
  password : '1234',
  database : 'passport'
});

connection.connect();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//Authentication middleware
app.use(expressSession({ secret: 'thisIsASecret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());



// Catch all other routes and return the index file
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/Login.html'));
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login?err',
}));


passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new LocalStrategy(function(username, password, done) {
  if ((username === "john") && (password === "password")) {
    return done(null, { username: username, id: 1 });
  } else {
    return done(null, false);
  }
}));

// Point static path to dist
app.use(authOnly, express.static(path.join(__dirname, 'dist')));



function authOnly(req,res,next){
  if (req.isAuthenticated()){
    next();
  } else {
    res.redirect('/login');
  }
}

app.get('/userDetails', authOnly, function (req, res){
  if (req.isAuthenticated()){
    res.send(req.user);
  } else {
    res.redirect('/login');
  }
});

app.post('/addUser', function (req, res,rows) {
  console.log(req.body)
  connection.query('insert into users set ?',req.body, function(err, rows, fields) {
    if (!err)
      res.send(rows);
    else
      res.send('Error while performing Query.');
  });
});
app.get('/logout', function (req, res) {
  req.logout();
  res.send('Logged out!');
});

app.get('*', authOnly, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.use((err, req, res, next) => {
  res.status(500).send(err);
});

const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log(`API running on localhost:${port}`));
