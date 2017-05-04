const MovieDB = require('moviedb')('1ad666ec91a4fdd4791ec175eee11d5a');


var methods = {}

methods.searchFilm = function(req, res){
	MovieDB.searchMovie({ query: req.params.search }, (err, response) => {
	res.send(response)
});
}

module.exports = methods
