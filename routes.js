var home = require('./controllers/home');

function routes(app) {
	app.get('/' , home.getIndex);
	app.post('/tags', home.postTags);
}

module.exports = routes;