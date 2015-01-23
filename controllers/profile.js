var User = require('../models/schemas/userSchema.js');
var authentController = require('../controllers/authentication.js');
var keys = require('../accessKeys.js');
var request = require('request');
var indexController = require('../controllers/index.js');

if (process.env.NODE_ENV === 'production') {
	var myURL = 'https://cardlink.herokuapp.com';
}

else {
	var myURL = 'http://localhost:9092';
}
var Linkedin = require('node-linkedin')(keys.consumerKey, keys.consumerSecret, myURL + '/auth/linkedincallback');

var profileController = {
	QgetProfile: function(req, res) {
		var userInfo = {
			profile: req.user.profile
		};
		// console.log('userInfo', userInfo);
		// console.log('base user', req.user);
		
		res.render('profile', {user: userInfo});
	},
	getProfile: function(authentObj) {

		// console.log('REQUEST', req);
		// console.log("PROFILECONTROLLER RES", res);

		// var IN = require('https://platform.linkedin.com/in.js');
		// console.log('User Token', req.user.token);
		// console.log('User Profile', req.user);

		var randomNum = Math.floor(Math.random() * (10 - 0));
		var randomAccess = (Math.random());

		var linkedin = Linkedin.init(authentObj.accessToken);
			linkedin.people.me(function (err, liResult) {
			// console.log('IN Rsult', liResult.connections.values[0].firstName);

			var connectionsArray = [];

			for (var c = 0; c < liResult.connections.values.length; c++) {

				var userConnection = {
					name: liResult.connections.values[c].firstName + ' ' + liResult.connections.values[c].lastName,
					liID: liResult.connections.values[c].id
				};

				// console.log("CONNECTION:", userConnection);
				connectionsArray.push(userConnection);
			}

			// console.log("all connections", connectionsArray);
	
			var about;
			if (liResult.summary.length >= 290) {
				about = "SUMMARY TOO LONG\nPLEASE SHORTEN YOUR SUMMARY HERE:\n";// + liResult.summary.substr(0, 230) + '...';
			}
			else {
				about = liResult.summary;
			}

			var allSkills = [];

			for (var i = 0; i < liResult.skills.values.length; i++) {
				var skill = liResult.skills.values[i];
				allSkills.push(skill.skill.name);
			}



			// console.log("Connections", liResult.numConnections);
			var profile = {
				image: liResult.pictureUrl,
				name: liResult.formattedName,
				title: liResult.headline,
				about: about,
				skills: allSkills.slice(1, 6),
				publicURL: liResult.publicProfileUrl,
				extra: {
					extraBio: {
						positions: liResult.positions.values[0].title,
						connections: liResult.numConnections	
					},
					extraSkills: allSkills.slice(6, 14),
					extraContact: {
						industry: liResult.industry,
						location: liResult.location.name
					}
				}
			};

			// console.log(profile);
			// console.log("EXTRA SKILLS", profile.extra.extraSkills);
			// async.auto({
				// checkDB: function() {
					User.findOne({liID: liResult.id}, function(err, user) {

						if (err) {
							console.log ('Login Error', err);
							return;
						}

						// Create a new User
						if (!user) {
							// delete liResult._json;
							// delete liResult._raw;
							var newUser = new User({
								profile: profile,
								connections: connectionsArray,
								liID: liResult.id,
								customID: (liResult.lastName + '.' + liResult.firstName + '.' + randomNum),
								customAccess: randomAccess,
								token: authentObj.accessToken
							});

							newUser.save(function(err, user) {
								if (err) {
									console.log('New Save error', err);
									// return;
								}

								else {
									console.log("NEW USER");
						
									authentObj.res.redirect(myURL + '/profile/editable/' + user.customID + '/' + user.customAccess);//, {user: user});
								
									return;
								}
							});
						}

						else {

							console.log('USER FOUND');
							user.customAccess = randomAccess;
							user.markModified('customAccess');

							user.profile = profile;
							user.markModified('profile');

							user.token = authentObj.accessToken;
							user.markModified('token');

							user.connections = connectionsArray;
							user.markModified('connections');

							user.save(function(err, user){
								if (err) {
									return console.log('Save error', err);
								}

								else {
									// sendToProfile(user);
									// authentController.signIn({user: user});
									console.log('USER UPDATED');
									// indexController.sendToProfile({user: user});
								
									authentObj.res.redirect(myURL + '/profile/editable/' + user.customID + '/' + user.customAccess);//, {user: user});
					
									return;
								}
							});
						}
					});
			// }
			// }

		});
	},
	updateProfile: function (req, res) {

		// console.log("Update User", req.body);
		User.findOne({customID: req.body.userID}, function(err, user) {
			if (err) {
				console.log("Update Error", err);
				return;
			}
			if (!user) {
				console.log("NO USER FOUND");
			}
			else {
				user.markModified('name');
				user.profile.name = req.body.name;

				user.markModified('title');
				user.profile.title = req.body.title;

				user.markModified('about');
				user.profile.about = req.body.about;

				user.markModified('skills');
				user.profile.skills = [req.body.skill1, req.body.skill2, req.body.skill3, req.body.skill4, req.body.skill5];

				user.markModified('positions');
				user.profile.extra.extraBio.positions = req.body.positions;

				user.markModified('connections');
				user.profile.extra.extraBio.connections = req.body.connections;

				user.markModified('extraSkills');
				user.profile.extra.extraSkills = [req.body.extraSkill1, req.body.extraSkill2, req.body.extraSkill3, req.body.extraSkill4];

				user.markModified('industry');
				user.profile.extra.extraContact.industry = req.body.industry;

				user.markModified('location');
				user.profile.extra.extraContact.location = req.body.location;

				user.save(function(err, user) {
					if (err) {
						console.log("Save error", err);
					}
					else {
						res.redirect(myURL + '/profile/editable/' + user.customID + '/' + user.customAccess);//, {user: user});
						// res.send({message: 'save success'});
						return;
					}
				});
			}
		});
	},
	createCard: function(req, res) {
		
		User.findOne({customID: req.params.userID, customAccess: req.params.customAccess}, function(err, foundUser) {
			if (err) {
				console.log("Database Error", err);
				res.redirect('/auth/login');
				return;
			}
			else if (!foundUser) {
				res.redirect('/auth/login');
				return;
			}
			else {

				// Grab only what is necessary from DB for rendering
				var user = {
					profile: foundUser.profile,
					connections: foundUser.connections,
					liID: foundUser.liID,
					customID: foundUser.customID,
					customAccess: foundUser.customAccess
				};

				res.render('card', {user: user});
			}
		});
		// console.log(req);
	},

	// WRITE A POST TO THE GENERAL FEED
	shareWall: function(req, res) {

		User.findOne({customID: req.body.userID}, function(err, user) {
			if (err) {
				console.log('DATABASE ERROR', err);
				return;
			}
			else if (!user) {
				console.log('No user found');
				return;
			}
			else {
				console.log('USER FOUND');
				var options = {
					uri: 'https://api.linkedin.com/v1/people/~/shares',
					headers: {
						authorization: 'Bearer ' + user.token,
						'x-li-format': 'json'
					},
					body: JSON.stringify({

					'comment': req.body.comment,
						'content': {
							'title': req.body.title,
							'description': req.body.description,
							'submittedUrl': 'http://cardlink.herokuapp.com',
							// 'submittedImageUrl': '#'
						},
						'visibility': {
							'code': 'connections-only' 
						}
					})
				};
				request.post(options, function(response, status) {
					res.send(status);
				});
			}
		});
	},

	// SEND AN "EMAIL" TO A CONNECTION
	shareConnection: function(req, res) {
		User.findOne({customID: req.body.userID}, function(err, user) {
			if (err) {
				console.log('DATABASE ERROR', err);
				return;
			}
			else if (!user) {
				console.log('No user found');
				return;
			}
			else {
				console.log('USER FOUND');
				var options = {
					uri: 'https://api.linkedin.com/v1/people/~/mailbox',
					headers: {
						authorization: 'Bearer ' + user.token,
						'x-li-format': 'json'
					},
					body: JSON.stringify({
						'recipients': {
							'values': [
								{
									'person': {
										'_path': '/people/id=' + req.body.recip
									}
								}
							]
						},
						'subject': req.body.subject,
						'body': req.body.message
					})
				};
				request.post(options, function(response, status) {
					res.send(status);
				});
			}
		});
	}
};

module.exports = profileController;