var mongoose = require('mongoose'),
	User = mongoose.model('User'),
	_ = require('underscore'),
	passwordHash = require('password-hash');;

exports.getAll = function(req, res){
	User.find({},'-password', function(err, users){
		if(err) throw new Error(err);
		res.send(users);
	});
};

exports.getById = function(req, res){
	console.log('controller/user getById: ' + req.params);

	User.findById(req.params.id,'-password',function(err, user){
		if(err) throw new Error(err);
		res.send(user);
	});
};

exports.validateSignIn = function(req, res){
	console.log('controller/user validateSignIn: ' + req.body.email);

	if (passwordHash.isHashed(req.body.password)) {
		User.findOne({ email: req.body.email, passwordHash: req.body.password}, function (err, user) {
			if (err) throw new Error(err);
			if (!user) res.status(404).send('Not found');
			res.send(user);		
		});				
	} else {
		User.findOne({ email: req.body.email, password: req.body.password}, function (err, user) {
			if (err) throw new Error(err);
			if (!user) res.status(404).send('Not found');
			res.send(user);		
		});		
	}
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