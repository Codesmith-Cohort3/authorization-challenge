var Cookies = require('cookies');
var sessionController = require('./../session/sessionController');

var cookieController = {};
cookieController.setCookie = setCookie;
cookieController.setSSIDCookie = setSSIDCookie;

function setCookie(req, res, next) {
  //write code here
  console.log('hi');

  //maxAge is how long it lasts. httpOnly means if true, javascript cant grab the cookie
  res.cookie('codesmith', 'hi', {maxAge: 50000, httpOnly: true})
  res.cookie('secret', Math.random()*99, {maxAge: 50000, httpOnly: true})
  next();

}

function setSSIDCookie(req, res, next) {
  // write code here
  // console.log(id);
  res.cookie('ssid', req.userIdMongo);
  next();
}

module.exports = cookieController;