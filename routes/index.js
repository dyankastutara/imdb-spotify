var express = require('express');
var router = express.Router();
var controll = require("../controllers/userController")

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
// router.get('/signup', function(req, res, next) {
//   res.render('signup');
// });
// router.get('/login', function(req, res, next) {
//   res.render('login');
// });
// router.post('/login', function(req, res, next) {
//   res.render('homepage');
// });

router.get('/users', controll.getAll);
router.post('/users', controll.insert);
router.post('/signin', controll.signin);

module.exports = router;
