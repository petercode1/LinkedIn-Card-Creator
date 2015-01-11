var User = require('../models/schemas/userSchema.js');
var passport = require('passport');
var keys = require('../accessKeys.js');

var Linkedin = require('node-linkedin')(keys.consumerKey, keys.consumerSecret, 'http://localhost:9092/auth/linkedincallback');


var authentController = {
	signIn: function(req, res) {
		// passport.use

	},
	passLogin: function(req, res, next) {
		// console.log('HI');
		// console.log(req.user);
			
	// Linkedin.auth.getAccessToken(res, req.query.code, function(err, results) {
	// 	if (err) {
	// 		return console.log(err);
	// 	}

	// 	console.log( 'Linked In Results', results);
	// });
		res.redirect('/profile/base/' + req.user.customID);
	}
};


module.exports = authentController;