var mongoose = require('mongoose'),
	Result = mongoose.model('Result'),
	_ = require('underscore');

exports.getAll = function(req, res){
	Result.find(function(err, results){
		if(err) throw new Error(err);
		res.send(results);
	});
};

exports.getById = function(req, res){
	console.log('controller/result getById: ' + req.params);

	Result.findById(req.params.id,function(err, result){
		if(err) throw new Error(err);
		res.send(result);
	});
};

exports.addResult = function(req, res){
	console.log('controller/result postMessage: ' + req.body);

	var result = new Result(req.body);
	result.save(function() {
		res.send(result);
	});
};

exports.updateResult = function(req, res){
	console.log('controller/result putMessage: ' + req.body);

	var updateObj = _.omit(req.body, ['_id', '__v']);

	Result.findById(req.params.id,function(err, result){
		if(err) throw new Error(err);
		result.update(updateObj,function(err,count){
			if(err) throw new Error(err);
			res.send(req.body);
		});
	});
};

exports.deleteResult = function(req, res){
	console.log('controller/result deleteMessage: ' + req.body);

	Result.findById(req.params.id,function(err, result){
		if(err) throw new Error(err);
		result.remove(function(err,count){
			if(err) throw new Error(err);
			res.send(req.body);
		});
	});
};