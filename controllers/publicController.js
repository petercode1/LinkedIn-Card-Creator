var User = require('../models/schemas/userSchema.js');


if (process.env.NODE_ENV === 'production') {
	var myURL = 'https://cardlink.herokuapp.com';
}

else {
	var myURL = 'http://localhost:9092';
}

var publicController = {



	generatePublic: function(req, res) {
		// console.log('Generate Public', res);
		res.redirect(myURL + '/public/' + req.params.userID + '/share');
			// '/public/test');
	},
	publicProfile: function (req, res) {

		console.log('PUBLIC PROFILE');
		User.findOne({customID: req.params.userID}, function(err, foundUser) {
			if (err) {
				console.log("Database Error", err);
				res.redirect('/auth/linkedin');
				return;
			}

			if (!foundUser) {
				res.send('Sorry, no user found');
				return;
			}

			if (foundUser) {
				
				// Grab only what is necessary from DB for rendering
				var user = {
					profile: foundUser.profile,
					connections: foundUser.connections,
					liID: foundUser.liID,
					customID: foundUser.customID,
					customAccess: foundUser.customAccess
				};

				res.render('publicCard', {user: user});
				return;
			}
		});
	},
	test: function(req, res) {
		// console.log('Test');
		res.send('Hello');
	}
};

module.exports = publicController;