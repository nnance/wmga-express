// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var TeamSchema = new Schema({
	name: String,
	teetime: String,
	comments: String,
	paid: Boolean,
	createdate: { type: Date, default: Date.now },
  	photo: String,
  	captainid: String,
  	members: [String]
});

mongoose.model('Team', TeamSchema);
