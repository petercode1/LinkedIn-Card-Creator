var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	profile: {
		image: String,
		name: String,
		title: String,
		about: String,
		skills: Array,
		extra: {
			extraSkills: String,
			extraBio: String,
			extraContact: String
		}

	},
	liID: {
		type: String,
		required: true,
		unique: true,
	},
	customID: {
		type: String,
		required: true,
		unique: true
	},
	token: {
		type: String,
		required: true,
		unique: true
	}
});

module.exports = mongoose.model('user', userSchema);