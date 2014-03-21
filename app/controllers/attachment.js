var fs 		= require('fs');
	config 	= require('../../config/config');

exports.saveAttachment = function(req, res){
	console.log('controller/attachment post: ' + req.files[0].path );

	var newLocation = config.root + '/public/files/' + req.files[0].name;
	console.log('controller/attachment newLocation: ' + newLocation);

	fs.rename(req.files[0].path, newLocation, function (err) {
		if (err) {
			throw err;
		} else {
			res.send({
				path: newLocation,
				fileName: req.files[0].name
			});			
		}
	});
};
