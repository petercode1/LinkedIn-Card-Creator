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
	}
};

module.exports = profileController;