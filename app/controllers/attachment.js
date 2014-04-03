var fs 		= require('fs'),
	AWS 	= require('aws-sdk'),
	config 	= require('../../config/config');

exports.saveAttachment = function(req, res){
	console.log('controller/attachment post: ' + req.files[0].path );

	// var newLocation = config.root + '/public/files/' + req.files[0].name;
	// console.log('controller/attachment newLocation: ' + newLocation);

	fs.readFile(req.files[0].path, function (err, data) {

 		var bucket = 'wmga';

		var s3 = new AWS.S3();
		s3.putObject({
			ACL: 'public-read', // by default private access
			Bucket: bucket,
			Key: req.files[0].name,
			Body: data
		}, function (err, data) {
			if (err) {
				console.log(err);
				res.send(500, {msg: 'image upload failed', error: err})
			} else {
				console.log('S3 upload Successful');
				res.send({
					path: newLocation,
					fileName: req.files[0].name
				});			
			}
		});
	});
};
