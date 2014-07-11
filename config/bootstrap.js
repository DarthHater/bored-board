/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://links.sailsjs.org/docs/config/bootstrap
 */

module.exports.bootstrap = function(cb) {

  // It's very important to trigger this callack method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  
  var passport = require('passport'),
    initialize = passport.initialize(),
    session = passport.session(),
    http = require('http'),
    methods = ['login', 'logIn', 'logout', 'logOut', 'isAuthenticated', 'isUnauthenticated'];

  sails.removeAllListeners('router:request');
  sails.on('router:request', function(req, res) {
    initialize(req, res, function () {
      session(req, res, function (err) {
        if (err) {
          return sails.config[500](500, req, res);
        }
        for (var i = 0; i < methods.length; i++) {
          req[methods[i]] = http.IncomingMessage.prototype[methods[i]].bind(req);
        }
        sails.router.route(req, res);
      });
    });
  });
  cb();
};