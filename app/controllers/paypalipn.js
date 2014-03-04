var mongoose = require('mongoose'),
	PayPalLog = mongoose.model('PayPalLog'),
	User = mongoose.model('User'),
	Team = mongoose.model('Team'),
	ipn = require('paypal-ipn');

exports.cancelTakePayment = function(req, res) {
	console.log('controller/paypalipn cancelTakePayment: ' + req.body);
	res.redirect('/#membership');
};

exports.successfulTakePayment = function(req, res) {
	console.log('controller/paypalipn successfulTakePayment: ' + req.body);
	res.redirect('/#membership');
};

exports.processIPN = function(req, res){
	console.log('controller/paypalipn processIPN: ' + req.body);
	res.send(200);

	ipn.verify(req.body, function callback(err, msg) {
		if (err) {
			console.error(msg);
		} else {
		    //Do stuff with original params here
		    var payment = {
		    	paymentStatus: req.body.payment_status,
        		itemNumber: req.body.item_number,
        		invoice: req.body.invoice,
        		fname: req.body.first_name,
        		lname: req.body.last_name,
        		payerEmail: req.body.payer_email,
        		payerStatus: req.body.payer_status,
        		paymentFee: req.body.payment_fee,
        		paymentType: req.body.payment_type,
        		paymentAmt: req.body.payment_gross
        	};

		    var payPalLog = new PayPalLog(payment);
		    payPalLog.save(function() {

		    	if (payment.paymentStatus == 'Completed') {
					//Payment has been confirmed as completed

					console.log('payment invoice: ' + payment.invoice + ' item: ' + payment.itemNumber);
			        if (payment.itemNumber === 'Membership') {
						var email = payment.invoice.substring(5);
						console.log('member payment email: ' + email);

						User.findOne({email: email},function(err, user){
							if(err) {
								console.error(err);
							} else if (!user) {
								console.log('member not found!');
							} else {
								user.update({paid: true},function(err,count){
									if(err) console.error(err);
									console.log('member updated');
								});
							}
						});

			        } else if (payment.itemNumber === 'Team') {
						console.log('team payment id: ' + payment.invoice);
						Team.findById(payment.invoice, function(err, team){
							if(err) {
								console.error(err);
							} else if (!team) {
								console.log('team not found!');
							} else {
								team.update({paid: true},function(err,count){
									if(err) console.error(err);
									console.log('team updated');
								});
							}
						});
			        }
			  	}
			});
		}
	});
};

