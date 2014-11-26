var profileController = {
	getProfile: function(req, res) {
		res.render('profile', {user: req.user});
	}
}

module.exports = profileController;