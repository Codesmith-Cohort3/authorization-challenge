var Session = require('./sessionModel');
var Cookies = require('cookies');

var sessionController = {};
sessionController.isLoggedIn = isLoggedIn;
sessionController.startSession = startSession;

function isLoggedIn(req, res, next) {
  // write code here
	console.log(req.cookies.ssid);
  if(req.cookies.ssid) {
  	Session.findOne({cookieId: req.cookies.ssid}, function(err){
  		if(err){
	  		console.log(err)	
  		} else {
		  	next();
  		}

  	})
  } else {
		return res.redirect('/signup')
  }
}

function startSession(req, res) {
  //write code here
  Session.create({
  	cookieId: req.userIdMongo,
  	expires: Date.now()
  }, function(err, data) {
  	// console.log(data);
  	if(err){
	  	res.render('./../client/signup', {error: err}) //sets 'error' in the .ejs file to err
	  } else {
	  return res.redirect('/secret');
	}
  })

	

}

module.exports = sessionController;