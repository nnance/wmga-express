var mongoose = require('mongoose'),
	User = mongoose.model('User'),
	_ = require('underscore');

exports.getAll = function(req, res){
	User.find(function(err, users){
		if(err) throw new Error(err);
		res.send(users);
	});
};

exports.getById = function(req, res){
	console.log('controller/user getById: ' + req.params);

	User.findById(req.params.id,function(err, user){
		if(err) throw new Error(err);
		res.send(user);
	});
};

exports.addUser = function(req, res){
	console.log('controller/user postMessage: ' + req.body);

	var user = new User(req.body);
	user.save(function() {
		res.send(user);
	});
};

exports.updateUser = function(req, res){
	console.log('controller/user putMessage: ' + req.body);

	var updateObj = _.omit(req.body, ['_id', '__v']);

	User.findById(req.params.id,function(err, user){
		if(err) throw new Error(err);
		user.update(updateObj,function(err,count){
			if(err) throw new Error(err);
			res.send(req.body);
		});
	});
};

exports.deleteUser = function(req, res){
	console.log('controller/user deleteMessage: ' + req.body);

	User.findById(req.params.id,function(err, user){
		if(err) throw new Error(err);
		user.remove(function(err,count){
			if(err) throw new Error(err);
			res.send(req.body);
		});
	});
};