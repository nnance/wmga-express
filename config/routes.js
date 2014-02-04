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

	//result route
	var Result = require('../app/controllers/result');
	app.get('/rest/results', Result.getAll);
	app.get('/rest/results/:id', Result.getById);
	app.post('/rest/results', Result.addResult);
	app.put('/rest/results/:id', Result.updateResult);
	app.delete('/rest/results/:id', Result.deleteResult);

	//attachments route
	var Attachment = require('../app/controllers/attachment');
	app.post('/rest/attachments', Attachment.saveAttachment);
};
