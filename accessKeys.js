if (process.env.NODE_ENV === 'production') {
	var accessKeys = {
		consumerKey: process.env.LINKEDIN_KEY,
		consumerSecret: process.env.LINKEDIN_SECRET
	};
}

else {

	var keys = require('./private/keys.js');

	var accessKeys = {
		consumerKey: keys.consumerKey,
		consumerSecret: keys.consumerSecret
	};
}

module.exports = accessKeys;