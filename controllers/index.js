var indexController = {
	index: function(req, res) {
		res.redirect('/auth/login');
	},
	login: function(req, res) {
		res.render('login');
	}
};

module.exports = indexController;