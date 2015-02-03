/*+++++++++++++++++++++++++++++++++++ MODULES +++++++++++++++++++++++++++++++++++*/
var User = require('../models/schemas/userSchema.js');

/*++++ ENVIRONMENT CHECK ++++*/
if (process.env.NODE_ENV === 'production') {
	var myURL = 'http://cardlink.herokuapp.com';
} else {
	var myURL = 'http://localhost:9092';
}

/*+++++++++++++++++++++++++++++++ EXPORTED MODULE +++++++++++++++++++++++++++++++*/
var publicController = {

	/* FUNCTION: redirect to custom URL
		that is visible to the public
	*/
	generatePublic: function(req, res) {
		// console.log('Generate Public', res);
		res.redirect(myURL + '/public/' + req.params.userID + '/share');
	},

	/* FUNCTION: grabs user information from
		the database
		END: renders the public card
	*/
	publicProfile: function (req, res) {

		// console.log('PUBLIC PROFILE');

		/*=======================================================
								DATABASE CHECK
		=======================================================*/
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
	}
};

module.exports = publicController;