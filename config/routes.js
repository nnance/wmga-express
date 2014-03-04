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

	//result route
	var User = require('../app/controllers/user');
	app.get('/rest/users', User.getList);
	app.get('/rest/users/:id', User.getById);
	app.post('/rest/users', User.addUser);
	app.put('/rest/users/:id', User.updateUser);
	app.delete('/rest/users/:id', User.deleteUser);
	//signin route
	app.post('/rest/signin', User.validateSignIn);
	app.post('/rest/users/requestpassword', User.requestPassword);

	//result route
	var Team = require('../app/controllers/team');
	app.get('/rest/teams', Team.getList);
	app.get('/rest/teams/:id', Team.getById);
	app.post('/rest/teams', Team.addTeam);
	app.put('/rest/teams/:id', Team.updateTeam);
	app.delete('/rest/teams/:id', Team.deleteTeam);

	//attachments route
	var Attachment = require('../app/controllers/attachment');
	app.post('/rest/attachments', Attachment.saveAttachment);

	//paypal ipn
	var PayPalIPN = require('../app/controllers/paypalipn');
	app.get('/paypal/cancel', PayPalIPN.cancelTakePayment);
	app.get('/paypal/success', PayPalIPN.successfulTakePayment);
	app.post('/paypal/ipn', PayPalIPN.processIPN);
};
