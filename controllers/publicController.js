var User = require('../models/schemas/userSchema.js');

var publicController = {

	generatePublic: function(req, res) {
		// console.log('Generate Public', res);
		res.redirect('http://localhost:9092/public/' + req.params.userID + '/share');
			// '/public/test');
	},
	publicProfile: function (req, res) {

		console.log('PUBLIC PROFILE');
		User.findOne({customID: req.params.userID}, function(err, user) {
			if (err) {
				console.log("Database Error", err);
				res.redirect('/auth/linkedin');
				return;
			}

			if (user) {
				res.render('publicCard', {user: user});
				return;
			}
			if (!user) {
				res.send('Sorry, no user found');
				return;
			}
		});
	},
	test: function(req, res) {
		console.log('Test');
		res.send('Hello');
	}
};

module.exports = publicController;