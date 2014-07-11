// Location: /api/policies/authenticated.js
module.exports = function(req, res, next) {
  if (req.isAuthenticated()){
    return next();
  } else {
    return res.send(403, { message: 'Not Authorized' });
  }
}