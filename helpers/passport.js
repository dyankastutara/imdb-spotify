const User = require('../models/user.js');
const userControl = require('../controllers/userController.js');
const passport = require('passport');
var bcrypt   = require('bcrypt-nodejs');

let passportAuth = (username, password, next) => {
  User.findOne({username: username}, (err, user) => {
    if (err) {return next(err);}
    if (user==null) { return next(null, false); }
    if (!bcrypt.compareSync(password, user.password)) { return next(null, false); }
    return next(null, user);
  });
}
module.exports = passportAuth;
