var lodash = require('lodash');
var twitter = require('twode');
var Copia = require('./lib/Copia');
var BotEnvironment = require('twitter-bot-environment');

var environment = new BotEnvironment();

function Bot(handle) {
	this.handle = handle.charAt(0) === '@' ? handle : '@' + handle;
	this.twitter = new twitter(environment.getEnvironment());
	this.copia = new Copia();
}

Bot.prototype.run = function() {
	this.twitter.updateStatus(this.copia.get_copia(1), function (err, data) {
      console.log(err, data);
	  console.log(environment.getEnvironment());
    })
}

var copia = new Bot('HomeworkCopia');
copia.run();