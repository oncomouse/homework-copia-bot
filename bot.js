var lodash = require('lodash');
var twitter = require('twode');
//var RiTa = require('rita');
var Copia = require('./lib/Copia');

function Bot(handle) {
	this.handle = handle.charAt(0) === '@' ? handle : '@' + handle;
	this.twitter = new twitter({
		consumer_key: process.env.CONSUMER_KEY,
		consumer_secret: process.env.CONSUMER_SECRET,
		access_token_key: process.env.ACCESS_TOKEN_KEY,
		access_token_secret: process.env.ACCESS_TOKEN_SECRET
	});
	this.copia = new Copia();
}

Bot.prototype.run = function() {
	this.twitter.updateStatus(this.copia.get_copia(1), function (err, data) {
      console.log(err, data);
    })
	//setInterval(function() {
	//	this.twitter.updateStatus(this.copia.get_copia(1), function (err, data) {
	//      console.log(err, data);
	//    });
	//}.bind(this), 60 * 60 * 1000);
}

var copia = new Bot('HomeworkCopia');
copia.run();