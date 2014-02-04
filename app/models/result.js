// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ResultSchema = new Schema({
  title: String,
  text: String,
  attachedfile: String,
  itemdate: Date,
  createdate: { type: Date, default: Date.now },
  photo: String,
});

mongoose.model('Result', ResultSchema);
