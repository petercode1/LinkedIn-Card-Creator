
/*+++++++++++++++++++++++++++++++++++ MODULES +++++++++++++++++++++++++++++++++++*/
var User = require('../models/schemas/userSchema.js');
var request = require('request');
var profileController = require('../controllers/profile.js');
var keys = require('../accessKeys.js');


/*++++ ENVIRONMENT CHECK ++++*/
if (process.env.NODE_ENV === 'production') {
	var myURL = 'http://cardlink.herokuapp.com';
} else {
	var myURL = 'http://localhost:9092';
}

var Linkedin = require('node-linkedin')(keys.consumerKey, keys.consumerSecret, myURL + '/auth/linkedincallback');



/*+++++++++++++++++++++++++++++++ EXPORTED MODULE +++++++++++++++++++++++++++++++*/
var authentController = {

	/* FUNCTION: redirect to LinkedIn authorization
		LinkedIn redirects to this app's callback
	*/
	URLsignIN: function(req, res) {
		// console.log("URLsignIN RES", res.redirect);
		res.redirect('https://www.linkedin.com/uas/oauth2/authorization?response_type=code&client_id=' + keys.consumerKey + '&scope=r_fullprofile%20r_basicprofile%20r_network%20rw_nus%20w_messages&state=ADKaf79uiadfkadfadhf87uahdJDFH&redirect_uri=' + myURL + '/auth/linkedincallback');
	},

	/* FUNCTION: redirect to unique URL
		for user to edit card
	*/
	sendToProfile: function(req, res) {
		res.redirect('/profile/user' + req.user.customID);
	},

	/* FUNCTION: redirect to LinkedIn for Access Token
		LinkedIn returns JSON object with Access Token
		END: Call profile controller to render card
	*/
	requestToken: function(req, res) {

			// console.log("AUTHENTCONTROLLER REQ", req);

		// LinkedIn Access Token request post method
		request.post('https://www.linkedin.com/uas/oauth2/accessToken?grant_type=authorization_code&code=' + req.query.code + '&redirect_uri=' + myURL + '/auth/linkedincallback&client_id=' + keys.consumerKey + '&client_secret=' + keys.consumerSecret, function(err, response) {
			
			// console.log("AUTHENTCONTROLLER RESPONSE", response);

			var accessToken = JSON.parse(response.body).access_token;

			profileController.getProfile({user: req.user, accessToken: accessToken, res: res});
			return;
		});
	}
};


module.exports = authentController;