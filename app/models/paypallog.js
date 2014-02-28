// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var PayPalLogSchema = new Schema({
	paymentStatus: String,
	itemNumber: String,
	invoice: String,
	fname: String,
	lname: String,
	payerEmail: String,
	payerStatus: String,
	paymentFee: String,
	paymentType: String,
	paymentAmt: String
});

mongoose.model('PayPalLog', PayPalLogSchema);
