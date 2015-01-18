var User = require('../models/schemas/userSchema.js');
var authentController = require('../controllers/authentication.js');
var keys = require('../accessKeys.js');
var request = require('request');
var indexController = require('../controllers/index.js');
var Linkedin = require('node-linkedin')(keys.consumerKey, keys.consumerSecret, 'http://localhost:9092/auth/linkedincallback');

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


		// var sendToProfile = function(user) {
		// };
		// console.log('REQ token', req.accessToken);
		var linkedin = Linkedin.init(authentObj.accessToken);
			linkedin.people.me(function (err, liResult) {
			// console.log('IN Rsult', liResult);

			// var summary = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur vel ab, accusantium sint officiis odit cupiditate minima, doloribus ut eligendi consequuntur consectetur. Praesentium repellat esse placeat reiciendis voluptas error sed!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea temporibus dicta provident vel voluptas enim consequatur incidunt? Ipsa incidunt ipsam, quo. Dolorem, quam! Esse eius iure consectetur ut aliquam minus.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error rerum aliquid reiciendis laudantium fuga similique a impedit voluptatem repellat maiores cum hic vel, eum quasi rem! Eveniet magnam, dolor dicta!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse vel alias modi error distinctio architecto, neque nemo iure aspernatur, placeat dolorum ab veritatis at aperiam, animi, provident temporibus et! Maxime.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis quisquam, libero. Ipsum nisi quaerat ipsam, explicabo unde veniam quo. Id, consectetur in, accusantium maxime officia natus hic consequatur dolorum repudiandae?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias quos sunt eligendi possimus neque vero quaerat exercitationem iure adipisci mollitia error at sapiente, doloribus, earum itaque pariatur culpa, dignissimos accusantium?';
			var about;
			if (liResult.summary.length >= 290) {
				about = "SUMMARY TOO LONG\nPLEASE SHORTEN YOUR SUMMARY HERE:\n" + liResult.summary.substr(0, 230) + '...';
			}
			else {
				about = liResult.summary;
			}

			var allSkills = [];

			for (var i = 0; i < liResult.skills.values.length; i++) {
				var skill = liResult.skills.values[i];
				allSkills.push(skill.skill.name);
			}

			// var positions = [];

			// for (var j = 0; j < liResult.positions.values.length; j++) {
			// 	var position = liResult.positions.values[j];
			// 	positions.push(position.title);
			// }


			console.log("Connections", liResult.numConnections);
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
								liID: liResult.id,
								customID: (liResult.lastName + '.' + liResult.firstName + '.' + randomNum),
								customAccess: randomAccess
								// token: token
							});

							newUser.save(function(err, user) {
								if (err) {
									console.log('New Save error', err);
									// return;
								}

								else {
									console.log("NEW USER");
									// sendToProfile(user);
									// authentController.signIn({user: user});
									// indexController.sendToProfile({user: newUser});
									// console.log("REDIRECT OBJECT", authentObj.res.redirect);
									authentObj.res.redirect('http://localhost:9092/profile/editable/' + user.customID + '/' + user.customAccess);//, {user: user});
									// authentObj.res.redirect('http://www.google.com');//, {user: user});
									// request.post('http://localhost:9092/profile/base/' + newUser.customID, {user: newUser});
									// return done(err, user);
									return;
								}
							});
						}

						else {

							console.log('USER FOUND');
							user.customAccess = randomAccess;
							// user.token = token;
							user.markModified('customAccess');
							user.save(function(err, user){
								if (err) {
									return console.log('Save error', err);
								}

								else {
									// sendToProfile(user);
									// authentController.signIn({user: user});
									console.log("USER UPDATED", user);
									// indexController.sendToProfile({user: user});
								
									authentObj.res.redirect('http://localhost:9092/profile/editable/' + user.customID + '/' + user.customAccess);//, {user: user});
								
									// request.post('http://localhost:9092/profile/base/' + user.customID, {user: user});


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

		console.log("Update User", req.body);
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
				user.profile.skills = req.body.skills;

				user.markModified('positions');
				user.profile.extra.extraBio.positions = req.body.positions;

				user.markModified('connections');
				user.profile.extra.extraBio.connections = req.body.connections;

				user.markModified('extraSkills');
				user.profile.extra.extraSkills = req.body.extraSkills;

				user.markModified('industry');
				user.profile.extra.extraContact.industry = req.body.industry;

				user.markModified('location');
				user.profile.extra.extraContact.location = req.body.location;

				user.save(function(err, user) {
					if (err) {
						console.log("Save error", err);
					}
					else {
						res.send({message: 'save success'});
						return;
					}
				});
			}
		});
	},
	createCard: function(req, res) {
		
		User.findOne({customID: req.params.userID, customAccess: req.params.customAccess}, function(err, user) {
			if (err) {
				console.log("Database Error", err);
				res.redirect('/auth/login');
				return;
			}
			else if (!user) {
				res.redirect('/auth/login');
				return;
			}
			else {
				res.render('card', {user: user});
			}
		});
		// console.log(req);
	},
	share: function(req, res) {
		res.redirect('/profile' + req.user.customID + '/share');
	}
};

module.exports = profileController;