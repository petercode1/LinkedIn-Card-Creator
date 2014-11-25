var User = require('../models/schemas/userSchema.js');
var keys = require('../accessKeys');

var passport = require('passport');
var LinkedInnStrategy = require('passport-linkedin').Strategy;


passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {

	User.findById(id, function(err, user) {
		done(err, user);
	});
})


// Loggin in with LinkedIn
passport.use(new LinkedInStrategy({
	consumerKey: keys.consumerKey,
	consumerSecret: keys.consumerSecret,
	callbackURl: 'http://localhost:9092/auth/linkedincallback'
},
function(token, secretToken, profile, done){

	console.log('LinkedIn Profile', profile);
	
/*	// Check for users in Data Base
	User.findOne({LI_id: profile.id}, function(err, user) {
		if (err) {
			return console.log ('Login Error', err);
		}

		// Create a new User
		else if (!user) {
			var newUser = new User({
				profile: profile,
				LI_id: profile.id,
				token: token
			});
		}
		else {
			user.token = token;
			user.markModified('token');
			user.save(function(err, user){
				if (err) {
					return console.log('Save error', err);
				}
			})
		}
	})
//*/
}))

var authentConfig = {
	ensureAuthent: function(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}
		res.redirect('/auth/login');
	}
};

module.exports = authentConfig;