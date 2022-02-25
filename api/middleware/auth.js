const User = require('./../jokes/jokes-model')

const verifyInput = (req, res, next) => {
    if (!req.body.username || !req.body.password 
        || !req.body.username.trim() || !req.body.password.trim()) {
          next({status:401, message: "username and password required"})
    } else {
        next()
    }
}

const verifyUsername = (req, res, next) => {
    User.getBy({'username': req.body.username.trim()})
    .then(user => {
      if (!user) {
          req.user = user
          next()
        } else {
          next({status: 401, message: "username taken"})
      }
    })
    .catch(next)
}

const usernameExists = (req, res, next) => {
    User.getBy({'username': req.body.username.trim()})
    .then(user => {
      if (!user) {          
          next({status: 404, message: 'username does not exist'})
        } else {            
            req.user = user
            next()
      }
    })
    .catch(next)
}

module.exports = { verifyInput, verifyUsername, usernameExists }