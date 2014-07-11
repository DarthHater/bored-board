/**
 * AuthController
 *
 * @description :: Server-side logic for managing Auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var passport = require("passport");

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
    return res.json({
      todo: 'logout() is not implemented yet!'
    });
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
      req.logIn(user, function(err) {
        if (err) res.redirect('login');
        return res.redirect('/');
      });
    })(req, res);
  }
};

