var users = require('../lib/users');
var twitter = require('../lib/twitter');

exports.getIndex = function(req, res) {

	var userId;

	if (req.session.userId) {
		userId = req.session.userId;
	}
	else {
		userId = req.session.userId = users.addUser();
	}

	var tags = users.getTags(userId);
	//render la page views / home / index .html
	console.log(tags);
	res.render('home/index', {
		tags: tags,
		userId: userId
	});
};

exports.postTags = function(req, res) {

	users.addTags(req.session.userId, req.body.tags);
	var tags = users.getTags(req.session.userId);
	twitter.refreshStream(tags);
	//redirige vers la home page
	res.redirect('/');
};