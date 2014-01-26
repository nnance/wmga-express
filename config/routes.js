module.exports = function(app){

	//article route
	var article = require('../app/controllers/article');
	app.get('/rest/articles', article.getAll);
	app.get('/rest/articles/:id', article.getById);
	app.post('/rest/articles', article.addArticle);
	app.put('/rest/articles/:id', article.updateArticle);
	app.delete('/rest/articles/:id', article.deleteArticle);
};
