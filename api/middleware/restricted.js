const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../secret')
module.exports = (req, res, next) => {
  const token = req.headers.authorization
  if (!token) {
    next({status: 401, message: "token required"})
  } else {
    jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
      if (err) {
        next({status: 401, message: 'token invalid'})
      } else {
        req.decodedToken = decodedToken
        next()
      }      
    })
  }
  /*
    IMPLEMENT

    1- On valid token in the Authorization header, call next.

    2- On missing token in the Authorization header,
      the response body should include a string exactly as follows: "token required".

    3- On invalid or expired token in the Authorization header,
      the response body should include a string exactly as follows: "token invalid".
  */
};
