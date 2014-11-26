var mongoose = require('mongoose');

var userSchema = mongoose.Schema({

	// All personal information seen on card
	profile: {
		image: String,
		name: String,
		title: String,
		about: String,
		skills: Array,
		publicURL: String,
		extra: {
			extraBio: {
				positions: String,
				connections: Number
			},
			extraSkills: Array,
			extraContact: {
				industry: String,
				location: String
			}
		}

	},

	// All user connections
	connections: {
		type: Array,
		required: false,
		unique: false
	},

	/*---- Database values ----*/
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
	customAccess: {
		type: Number,
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