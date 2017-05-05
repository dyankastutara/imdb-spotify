var express = require('express');
var router = express.Router();
var controll = require("../controllers/movieController")

router.get('/film/:search', controll.searchFilm);



module.exports = router;
