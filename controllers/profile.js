var User = require('../models/schemas/userSchema.js');
var keys = require('../accessKeys.js');
var Linkedin = require('node-linkedin')(keys.consumerKey, keys.consumerSecret, 'http://localhost:9092/auth/linkedincallback');

var profileController = {
	getProfile: function(req, res) {
		var userInfo = {
			profile: req.user.profile
		};
		console.log('userInfo', userInfo);
		// console.log('base user', req.user);
		
		res.render('profile', {user: userInfo});
	},
	getInfo: function(req, res) {


		// console.log('User Token', req.user.token);
		console.log('User Profile', req.user.token);

		var linkedin = Linkedin.init(req.user.token);
			linkedin.people.me(function (err, liResult) {
		// });
		// IN.API.Profile('petergail').result(function(result) {
			console.log('IN Rsult', liResult);
			
		});
	},
	updateProfile: function (req, res) {
		User.findOne({customID: req.user.customID}, function(err, user) {
			if (err) {
				console.log("Update Error", err);
				return done(err);
			}
			user.markModified('profile');
			user.save(function(err, user) {
				if (err) {
					console.log("Save error", err);
					return done(err);
				}	
			});
		});
	},
	share: function(req, res) {
		res.redirect('/profile:' + req.user.customID + '/share');
	}
};

module.exports = profileController;