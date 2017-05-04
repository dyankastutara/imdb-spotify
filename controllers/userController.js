var User = require('../models/user')
var bcrypt   = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken')
var methods = {}

methods.signup = (req, res)=>{
  User.findOne({
      username : req.body.username
    }
  )
  .then ((user)=>{
    if(!user){
      if (req.body.username.length==0){
        // res.send("Username Cannot Empty")
        res.alert('Username cannot null')
      } else if(req.body.password.length < 6){
        // res.send('Password must be minimum length 6 characters')
        res.alert('Password must be minimum length 6 characters')
      } else {
        User.create({
          username : req.body.username,
          password : bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null)
        })
        .then(()=>{
          res.send('OK')
          // res.redirect('login')
        })
      }
    }
    else{
      res.send('Username already exists')
    }
  })
};

methods.signin = function(req, res){
	var user = req.user
	var token = jwt.sign({
    username: user.username}, 'secret', {expiresIn : '1h'});
		res.send({
			'token' : token
		})
}

methods.getAll = function(req, res){
  User.find(function(err,query){
    if(!err){
      res.send(query)
    }else{
      res.send(err)
    }
  })
}
methods.findByUsername = (req, res) => {
  User.findOne({username : req.body.username})
  .then((err, query)=>{
    if (err) return console.error(err);
      res.send(query);
  })
}
module.exports = methods
