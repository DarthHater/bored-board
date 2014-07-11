// Location: /config/passport.js
var passport    = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  bcrypt        = require('bcrypt'),
  db            = require('../api/services/db');

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  db.User.findOne({ _id: id }, function (err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy (
  function(username, password, done) {
    db.User.findOne({ username: username }, function(err, user) {
      if (err) { return done(null, err); }
      if (!user || user.length < 1) { return done(null, false, { message: 'Incorrect User'}); }
      //bcrypt.compare(password, user.password, function(err, res) {
        //if (!res) return done(null, false, { message: 'Invalid Password'});
        if(password == user.password) {
          return done(null, user);
        }
        else {
          return done(null, false, {message: 'Invalid Password'});
        }
        
      //});
    });
  })
);

module.exports = {
 express: {
    customMiddleware: function(app) {
      console.log('express midleware for passport');
      app.use(passport.initialize());
      app.use(passport.session());
    }
  }
};