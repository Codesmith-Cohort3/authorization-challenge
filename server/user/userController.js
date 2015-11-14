var User = require('./userModel');
var cookieController = require('./../util/cookieController');
var sessionController = require('./../session/sessionController');
var SALT_WORK_FACTOR = 10;
var bcrypt = require('bcryptjs');


var userController = {};
userController.createUser = createUser;
userController.getAllUsers = getAllUsers;
userController.verifyUser = verifyUser;

function createUser(req, res, next) {
  // write code here
  // console.log('request body: ', req.body)
  bcrypt.hash(req.body.password, SALT_WORK_FACTOR, function(err, data) {
    User.create({
      username: req.body.username,
      password: data
    }, function(error, user) {
      if(error) {
        res.render('./../client/signup', {error: 'hello!'});
      } else {
        req.userIdMongo = user._id;
        //works because it uses the middleware from the server compared to res.render which takes the file and renders it to the page
        next();
      }
      
    })
  })
    // else return data;
 

	  

}

function verifyUser(req, res, next) {
  // write code here

  User.findOne({
  	username: req.body.username

  }, function(err, user){
bcrypt.compare(req.body.password, user.password, function(err,res){console.log(res)})
  		if(err || !user) {
  			return res.redirect('/signup');

  		} else { 
        bcrypt.compare(req.body.password, user.password, function(err,res){
          if(res){
            req.userIdMongo = user._id;
            next();
          } else {
            return res.redirect('/signup');
          }
        })
      }  		 

  })
  
}

function getAllUsers(cb) {
  User.find({}, function(err, users) {
    if (!err) return cb(users);
  });
}

module.exports = userController;