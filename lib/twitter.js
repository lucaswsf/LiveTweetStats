var configTwitter = require('../config/twitter');
var Twit = require('twit');
var T = new Twit({
	consumer_key:         configTwitter.consumerKey,
	consumer_secret:      configTwitter.consumerSecret,
	access_token:         configTwitter.accessToken,
	access_token_secret:  configTwitter.accessTokenSecret
});

var users = require('./users');
// var stream = T.stream('statuses/filter', { track: tags });
// stream.on('tweet', function (tweet) {
// 	users.broadcast(tweet);
// });

var stream;
exports.refreshStream = function(tags) {
	if (stream) {
		stream.stop();
		stream = null;
	}

	console.log('start stream on', tags);
	stream = T.stream('statuses/filter', { track: tags });
	stream.on('tweet', function (tweet) {
		users.broadcast(tweet);
	});
};