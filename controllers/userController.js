var User = require('../models/user')
var bcrypt   = require('bcrypt-nodejs');
var methods = {}

methods.insert = (req, res)=>{
  var insertUser = new User({
    username : req.body.username,
    password : bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null)
  })
  insertUser.save(function(err,query){
    if(err){
      res.send(err)
    }else{
      res.render("login")
    }
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

module.exports = methods
