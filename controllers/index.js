/*+++++++++++++++++++++++++++++++ EXPORTED MODULE +++++++++++++++++++++++++++++++*/
var indexController = {
	/* FUNCTION: redirect to login screen*/
	index: function(req, res) {
		res.redirect('/auth/login');
	},
	/* FUNCTION: render login screen*/
	login: function(req, res) {
		res.render('login');
	},
	/* FUNCTION: redirect to custom URL
		for editable card
	*/
	sendToProfile: function(req, res) {
		// console.log("INDEXCONTROLLER REQ", req);
		res.redirect('/profile/user' + req.user.customID);
	},
};

module.exports = indexController;