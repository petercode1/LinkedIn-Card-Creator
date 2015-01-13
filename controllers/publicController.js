var User = require('../models/schemas/userSchema.js');

var publicController = {

	generatePublic: function(req, res) {
		res.redirect('/public/' + req.user.customID + '/share');
	},
	publicProfile: function (req, res) {
		User.findOne({customID: req.params.profile}, function(err, user) {
			if (err) {
				console.log(err);
				return done(err);
			}

			if (user) {
				res.render('publicCard', user);
			}
			if (!user) {
				res.send('Sorry, no user found');
			}
		});
	}
};

module.exports = publicController;