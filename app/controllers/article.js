var mongoose = require('mongoose'),
	Article = mongoose.model('Article'),
	_ = require('underscore');

exports.getAll = function(req, res){
	Article.find(function(err, articles){
		if(err) throw new Error(err);
		res.send(articles);
	});
};

exports.getById = function(req, res){
	console.log('controller/article getById: ' + req.params);

	Article.findById(req.params.id,function(err, article){
		if(err) throw new Error(err);
		res.send(article);
	});
};

exports.addArticle = function(req, res){
	console.log('controller/article postMessage: ' + req.body);

	var article = new Article(req.body);
	article.save(function() {
		res.send(article);
	});
};

exports.updateArticle = function(req, res){
	console.log('controller/article putMessage: ' + req.body);

	var updateObj = _.omit(req.body, ['_id', '__v']);

	Article.findById(req.params.id,function(err, article){
		if(err) throw new Error(err);
		article.update(updateObj,function(err,count){
			if(err) throw new Error(err);
			res.send(req.body);
		});
	});
};

exports.deleteArticle = function(req, res){
	console.log('controller/article deleteMessage: ' + req.body);

	Article.findById(req.params.id,function(err, article){
		if(err) throw new Error(err);
		article.remove(function(err,count){
			if(err) throw new Error(err);
			res.send(req.body);
		});
	});
};