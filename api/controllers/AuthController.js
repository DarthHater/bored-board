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
    return res.json({
      todo: 'process() is not implemented yet!'
    });
  }
};

