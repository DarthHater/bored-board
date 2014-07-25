/**
 * authentication
 *
 * @module      :: Policy
 * @description :: Simple policy to check if a user is authenticated or not
 *                 Assumes that passport is managing authentication
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */

module.exports = function(req, res, next) {
  if (req.isAuthenticated()){
    return next();
  } else {
    return res.send(403, { message: 'Not Authorized' });
  }
};