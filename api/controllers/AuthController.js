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
    res.redirect('/login');
  },

  /**
   * `AuthController.create()`
   */
  create: function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var emailAddress = req.body.emailaddress;

    db.User(
        { username: username, 
          password: password,
          emailaddress: emailAddress }
          )
    .save( function(err, user) {
      if (err) return res.json('Shit done fucked up', 500);
      req.logIn(user, function (err) {
        if (err) {
          return res.redirect('/login');
        }
        else {
          return res.redirect('/');
        }     
      });
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
        res.redirect('login');
        return;
      }
      req.logIn(user, function (err) {
        if (err) res.redirect('login');
        return res.redirect('/');
      });
    })(req, res);
  }
};

