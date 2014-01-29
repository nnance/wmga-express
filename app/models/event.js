// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var EventSchema = new Schema({
	attachedfile: String,
	startdate: Date,
	description: String,
	enddate: Date,
	photo: String,
	title: String
});

mongoose.model('Event', EventSchema);
