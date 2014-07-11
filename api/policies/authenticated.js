// Location: /api/policies/authenticated.js
module.exports = function(req, res, next) {
  if (req.isAuthenticated()){
    return next();
  } else {
  	console.log(req.session);
    return res.send(403, { message: 'Not Authorized' });
  }
}