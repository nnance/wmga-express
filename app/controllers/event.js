var mongoose = require('mongoose'),
	Event = mongoose.model('Event'),
	_ = require('underscore');

exports.getAll = function(req, res){
	Event.find(function(err, events){
		if(err) throw new Error(err);
		res.send(events);
	});
};

exports.getById = function(req, res){
	console.log('controller/event getById: ' + req.params);

	Event.findById(req.params.id,function(err, event){
		if(err) throw new Error(err);
		res.send(event);
	});
};

exports.addEvent = function(req, res){
	console.log('controller/event postMessage: ' + req.body);

	var event = new Event(req.body);
	event.save(function() {
		res.send(event);
	});
};

exports.updateEvent = function(req, res){
	console.log('controller/event putMessage: ' + req.body);

	var updateObj = _.omit(req.body, ['_id', '__v']);

	Event.findById(req.params.id,function(err, event){
		if(err) throw new Error(err);
		event.update(updateObj,function(err,count){
			if(err) throw new Error(err);
			res.send(req.body);
		});
	});
};

exports.deleteEvent = function(req, res){
	console.log('controller/event deleteMessage: ' + req.body);

	Event.findById(req.params.id,function(err, event){
		if(err) throw new Error(err);
		event.remove(function(err,count){
			if(err) throw new Error(err);
			res.send(req.body);
		});
	});
};