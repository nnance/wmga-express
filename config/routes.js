module.exports = function(app){

	//article route
	var Article = require('../app/controllers/article');
	app.get('/rest/articles', Article.getAll);
	app.get('/rest/articles/:id', Article.getById);
	app.post('/rest/articles', Article.addArticle);
	app.put('/rest/articles/:id', Article.updateArticle);
	app.delete('/rest/articles/:id', Article.deleteArticle);

	//event route
	var Event = require('../app/controllers/event');
	app.get('/rest/events', Event.getAll);
	app.get('/rest/events/:id', Event.getById);
	app.post('/rest/events', Event.addEvent);
	app.put('/rest/events/:id', Event.updateEvent);
	app.delete('/rest/events/:id', Event.deleteEvent);
};
