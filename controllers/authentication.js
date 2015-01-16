var User = require('../models/schemas/userSchema.js');
var passport = require('passport');
var request = require('request');
var profileController = require('../controllers/profile.js');
var keys = require('../accessKeys.js');

var Linkedin = require('node-linkedin')(keys.consumerKey, keys.consumerSecret, 'http://localhost:9092/auth/linkedincallback');


var authentController = {
	signIn: function(req, res) {
		// passport.use
		console.log('HI');

	},
	URLsignIN: function(req, res) {
		res.redirect('https://www.linkedin.com/uas/oauth2/authorization?response_type=code&client_id=' + keys.consumerKey + '&scope=r_fullprofile%20r_basicprofile&state=ADKaf79uiadfkadfadhf87uahdJDFH&redirect_uri=http://localhost:9092/auth/linkedincallback');
	},
	sendToProfile: function(req, res) {
		res.redirect('/profile/user' + req.user.customID);
	},
	requestToken: function(req, res) {

			// console.log("AUTHENTCONTROLLER REQ", req);
		// if (!req.params.)
		// res.redirect('https://www.linkedin.com/uas/oauth2/accessToken?grant_type=authorization_code&code=' + req.query.code + '&redirect_uri=http://localhost:9092/auth/linkedincallback&client_id=' + keys.consumerKey + '&client_secret=' + keys.consumerSecret);
		// return;
		request.post('https://www.linkedin.com/uas/oauth2/accessToken?grant_type=authorization_code&code=' + req.query.code + '&redirect_uri=http://localhost:9092/auth/linkedincallback&client_id=' + keys.consumerKey + '&client_secret=' + keys.consumerSecret, function(err, response) {
			
			// console.log("AUTHENTCONTROLLER RESPONSE", response);

			var accessToken = JSON.parse(response.body).access_token;

			// console.log(accessToken);
			// res.send(accessToken);
			profileController.getProfile({user: req.user, accessToken: accessToken});
			return;
		});
	},
	getToken: function(req, res) {
		console.log(req);
	},
	passLogin: function(req, res, next) {
		// console.log('HI');
		console.log('USER: ', req.user);
			
	// Linkedin.auth.getAccessToken(res, req.query.code, function(err, results) {
	// 	if (err) {
	// 		return console.log(err);
	// 	}

	// 	console.log( 'Linked In Results', results);
	// });
	console.log(req.user);
		res.redirect('/profile/base/' + req.user.customID);
	}
};


module.exports = authentController;