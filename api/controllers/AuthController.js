/**
 * AuthController
 *
 * @description :: Server-side logic for managing Auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var passport = require("passport"),
    db = require('../services/db');

module.exports = {
  /**
   * `AuthController.login()`
   */
  login: function (req, res) {
    return res.view('auth/login');
  },


  /**
   * `AuthController.logout()`
   */
  logout: function (req, res) {
    req.logout();
    res.clearCookie('userid');
    res.redirect('/login');
  },

  /**
   * `AuthController.create()`
   */
  create: function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var emailAddress = req.body.email;

    db.User(
        { username: username, 
          password: password,
          emailaddress: emailAddress }
          )
    .save( function(err, user) {
      if (err) return res.json('Shit done fucked up', 500);

      // this seems odd you have to access controllers via this long method, but whatever? DRY
      sails.controllers.auth.process(req, res);
    });
  },

  /**
   * `AuthController.register()`
   */
  register: function(req, res) {
    return res.view('auth/create');
  },


  /**
   * `AuthController.process()`
   */
  process: function (req, res) {
    passport.authenticate('local', function(err, user, info) {
      if ((err) || (!user)) { 
        res.json('Uh oh not logged in!', 401);
        
        return;
      }
      req.logIn(user, function (err) {
        if (err) res.json('Sorry, cannot log you in!', 401);

        res.cookie('userid', user._id, { maxAge: 2592000000 });
        
        return res.json('Logged in!', 200);
      });
    })(req, res);
  }
};