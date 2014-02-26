var mongoose = require('mongoose'),
	User = mongoose.model('User'),
	_ = require('underscore'),
	passwordHash = require('password-hash'),
	excludeList = '-password -passwordHash';

exports.getList = function(req, res){
	console.log('controller/user getList: ' + (req.query && req.query.email ? req.query.email : ''));

	User.find(req.query, excludeList, function(err, users){
		if(err) throw new Error(err);
		res.send(users);
	});
};

exports.getById = function(req, res){
	console.log('controller/user getById: ' + req.params);

	User.findById(req.params.id, excludeList, function(err, user){
		if(err) throw new Error(err);
		res.send(user);
	});
};

exports.validateSignIn = function(req, res){
	console.log('controller/user validateSignIn: ' + req.body.email);

	var options = { email: req.body.email };
	if (passwordHash.isHashed(req.body.password)) {
		options.passwordHash = req.body.password;
	} else {
		options.password = req.body.password;
	}

	User.findOne(options, function (err, user) {
		if (err) throw new Error(err);
		if (!user) res.status(404).send('Not found');
		res.send(user);
	});
};

exports.addUser = function(req, res){
	console.log('controller/user postMessage: ' + req.body);

	var user = new User(req.body);
	if (user.password) {
		user.passwordHash = passwordHash.generate(user.password);
	}
	user.save(function() {
		res.send(user);
	});
};

exports.updateUser = function(req, res){
	console.log('controller/user putMessage: ' + req.body);

	var updateObj = _.omit(req.body, ['_id', '__v']);

	User.findById(req.params.id,function(err, user){
		if(err) throw new Error(err);

		if (updateObj.password) {
			updateObj.passwordHash = passwordHash.generate(updateObj.password);
		}
		user.update(updateObj,function(err,count){
			if(err) throw new Error(err);
			res.send(user);
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