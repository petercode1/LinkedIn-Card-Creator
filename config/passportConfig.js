var User = require('../models/schemas/userSchema');
var keys = require('../accessKeys');

var passport = require('passport');
var LinkedInStrategy = require('passport-linkedin').Strategy;


passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(obj, done) {

	// User.findById(id, function(err, user) {
	// 	done(err, user);
	// });
	done(null, obj);
});


// Loggin in with LinkedIn
passport.use(new LinkedInStrategy({
	consumerKey: keys.consumerKey,
	consumerSecret: keys.consumerSecret,
	callbackURL: 'http://localhost:9092/auth/linkedincallback'
},
function(token, tokenSecret, profile, done){

	console.log("Token", token);
	console.log("DONE", done);
	console.log("Secret Token", secretToken);
	console.log("Authen Profile", profile);

	var randomNum = Math.floor(Math.random() * (10 - 0));

	// console.log('LinkedIn Profile', profile);
	
		// console.log('LinkedIn Response', profile);
//*	// Check for users in Data Base
	User.findOne({liID: profile.id}, function(err, user) {

		if (err) {
			console.log ('Login Error', err);
			return done(err);
		}

		// Create a new User
		if (!user) {
			delete profile._json;
			delete profile._raw;
			var newUser = new User({
				profile: profile,
				liID: profile.id,
				customID: (profile.name.familyName + '.' + profile.name.givenName + '.' + randomNum),
				token: token
			});

			newUser.save(function(err, user) {
				return done(err, user);
			});
		}
		else {

			// console.log('User', user);
			user.token = token;
			user.markModified('token');
			user.save(function(err, user){
				if (err) {
					console.log('Save error', err);
				}
			return done(null, user);
			});
		}
	});
//*/
}));



var authentController = {
	ensureAuthent: function(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}
		res.redirect('/auth/login');
	}
};

module.exports = authentController;