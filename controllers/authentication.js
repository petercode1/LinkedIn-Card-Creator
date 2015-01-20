var User = require('../models/schemas/userSchema.js');
var passport = require('passport');
var request = require('request');
var profileController = require('../controllers/profile.js');
var keys = require('../accessKeys.js');



if (process.env.NODE_ENV === 'production') {
	var myURL = 'http://cardlink.herokuapp.com';
}

else {
	var myURL = 'http://localhost:9092';
}
var Linkedin = require('node-linkedin')(keys.consumerKey, keys.consumerSecret, myURL + '/auth/linkedincallback');


var authentController = {
	signIn: function(req, res) {
		// passport.use
		console.log('HI');

	},
	URLsignIN: function(req, res) {

		// console.log("URLsignIN RES", res.redirect);
		res.redirect('https://www.linkedin.com/uas/oauth2/authorization?response_type=code&client_id=' + keys.consumerKey + '&scope=r_fullprofile%20r_basicprofile%20r_network%20rw_nus%20w_messages&state=ADKaf79uiadfkadfadhf87uahdJDFH&redirect_uri=' + myURL + '/auth/linkedincallback');
	},
	sendToProfile: function(req, res) {
		res.redirect('/profile/user' + req.user.customID);
	},
	requestToken: function(req, res) {

			// console.log("AUTHENTCONTROLLER REQ", req);
		// if (!req.params.)

		request.post('https://www.linkedin.com/uas/oauth2/accessToken?grant_type=authorization_code&code=' + req.query.code + '&redirect_uri=' + myURL + '/auth/linkedincallback&client_id=' + keys.consumerKey + '&client_secret=' + keys.consumerSecret, function(err, response) {
			
			// console.log("AUTHENTCONTROLLER RESPONSE", response);

			var accessToken = JSON.parse(response.body).access_token;

			
			profileController.getProfile({user: req.user, accessToken: accessToken, res: res});
			return;
		});
	},
	getToken: function(req, res) {
		console.log(req);
	},
	passLogin: function(req, res, next) {
		// console.log('HI');
		// console.log('USER: ', req.user);
			
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