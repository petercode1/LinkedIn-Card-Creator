var User = require('../models/schemas/userSchema.js');
var passport = require('passport');

var authentController = {
	signIn: function(req, res) {
		// passport.use

	},
	passLogin: function(req, res, next) {
		// console.log('HI');
		console.log(req.user);
		res.redirect('/profile/' + req.user.customID);
	}
};


module.exports = authentController;