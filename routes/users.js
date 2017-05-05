var express = require('express');
var router = express.Router();
var controll = require("../controllers/userController")
const passport = require('passport');

router.get('/', controll.getAll);
router.post('/signup', controll.signup);
router.post('/signin', passport.authenticate('local', { session: false }), controll.signin);
router.get('/find', controll.findByUsername);
router.post('/validate', controll.userValidation);

module.exports = router;
