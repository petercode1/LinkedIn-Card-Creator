var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	profile: {
		type: Object,
		required: true,
		unique: true
	},
	LI_id: {
		type: String,
		required: true,
		unique: true,
	},
	token: {
		type: String,
		required: true,
		unique: true
	}
});

module.exports = mongoose.model('user', userSchema)