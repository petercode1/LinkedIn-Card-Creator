var indexController = {
	index: function(req, res) {
/*/
		res.render('card', {user: user});
	/*/	
		res.redirect('/auth/login');
	//*/
	},
	login: function(req, res) {
		res.render('login');
	},
  sendToProfile: function(req, res) {
    console.log("INDEXCONTROLLER REQ", req);
    res.redirect('/profile/user' + req.user.customID);
  },
};

module.exports = indexController;