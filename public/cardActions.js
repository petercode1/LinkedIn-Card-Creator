$(document).on('ready', function() {


	var userID = $('#user-bio').attr('userID');

	var shareTo = '';

	
	// Function shows editable fields
	var edit = function () {
		$('.editable').hide();
		$('.share').hide();
		$('.noshow').show();
	};


	// Function saves information in the database
	var save = function () {

		$('.editable').show();
		$('.share').show();
		$('.noshow').hide();


		/* MAKE AND CHANGES TO BASIC BIO*/

		var name = $('.user-name.editable').text();
		var newName = $('.user-name-input').val().length > 0 ? $('.user-name-input').val() : name;

		var title = $('.user-title.editable').text();
		var newTitle = $('.user-title-input').val().length > 0 ? $('.user-title-input').val() : title;
		
		var description = $('.user-description.editable').text();
		var newDescription = $('.user-description-input').val().length > 0 ? $('.user-description-input').val() : description;




		/* MAKE AND CHANGES TO BASIC SKILLS*/

		var skill1 = $('#skill-1').text();
		var skill2 = $('#skill-2').text();
		var skill3 = $('#skill-3').text();
		var skill4 = $('#skill-4').text();
		var skill5 = $('#skill-5').text();

		var newSkill1 = $('#skill1-input').val().length > 0 ? $('#skill1-input').val() : skill1;
		var newSkill2 = $('#skill2-input').val().length > 0 ? $('#skill2-input').val() : skill2;
		var newSkill3 = $('#skill3-input').val().length > 0 ? $('#skill3-input').val() : skill3;
		var newSkill4 = $('#skill4-input').val().length > 0 ? $('#skill4-input').val() : skill4;
		var newSkill5 = $('#skill5-input').val().length > 0 ? $('#skill5-input').val() : skill5;




		/*--------------------- EXTRA CONTENT ---------------------*/


		/* MAKE AND CHANGES TO EXTRA BIO*/

		var extraPosition = $('#extra-bio-position').text();
		var newExtraPosition = $('#user-extra-position-input').val().length > 0 ? $('#user-extra-position-input').val() : extraPosition;
		
		var extraConnections = $('#extra-bio-connections').text();
		var newExtraConnections = $('#user-extra-connections-input').val().length > 0 ? $('#user-extra-connections-input').val() : extraConnections;




		/* MAKE AND CHANGES TO EXTRA SKILLS*/

		var extraSkill1 = $('#extra-skill-1').text();
		var extraSkill2 = $('#extra-skill-2').text();
		var extraSkill3 = $('#extra-skill-3').text();
		var extraSkill4 = $('#extra-skill-4').text();

		var newExtraSkill1 = $('#extra-skill1-input').val().length > 0 ? $('#extra-skill1-input').val() : extraSkill1;
		var newExtraSkill2 = $('#extra-skill2-input').val().length > 0 ? $('#extra-skill2-input').val() : extraSkill2;
		var newExtraSkill3 = $('#extra-skill3-input').val().length > 0 ? $('#extra-skill3-input').val() : extraSkill3;
		var newExtraSkill4 = $('#extra-skill4-input').val().length > 0 ? $('#extra-skill4-input').val() : extraSkill4;


		/* MAKE AND CHANGES TO EXTRA CONTACT */
		
		var extraIndustry = $('#extra-info-industry').text();
		var newExtraIndustry = $('#user-extra-industry-input').val().length > 0 ? $('#user-extra-industry-input').val() : extraIndustry;

		var extraLocation = $('#extra-info-location').text();
		var newExtraLocation = $('#user-extra-location-input').val().length > 0 ? $('#user-extra-location-input').val() : extraLocation;




		/* CHECK MAX LENGTH OF INPUT FIELDS */

		if (newName.length > 40 || newTitle.length > 40 || newDescription.length > 290) {
			alert("One or more of your input fields exceeds maximum length\nPlease edit before continuing");
		}

		if (newExtraPosition.length > 45 || newExtraConnections.length > 4 || newExtraIndustry.length > 20 || newExtraLocation.length > 20) {
			alert("One or more of your input fields exceeds maximum length\nPlease edit before continuing");
		}



		// console.log("NAME LENGTH: ", newName.length);
		// console.log("TITLE LENGTH: ", newTitle.length);
		// console.log("DESCRIPTION LENGTH: ", newDescription.length);
		// console.log("EXTRA POSITIONS LENGTH: ", newExtraPosition.length);
		// console.log("EXTRA CONNECTIONS LENGTH: ", newExtraConnections.length);
		// console.log("EXTRA INDUSTRY LENGTH: ", newExtraIndustry.length);
		// console.log("EXTRA LOCATION LENGTH: ", newExtraLocation.length);
	





		// PROFILE OBJECT HOLDS INFORMATION FROM THE CARD BEFORE SAVING
		var profile = {
			image: $('.user-picture').attr('src'),
			name: newName,
			title: newTitle,
			about: newDescription,
			skills: [newSkill1, newSkill2, newSkill3, newSkill4, newSkill5],
			publicURL: $('#user-linkedin').text(),
			extra: {
				extraBio: {
					positions: newExtraPosition,
					connections: newExtraConnections
				},
				extraSkills: [newExtraSkill1, newExtraSkill2, newExtraSkill3, newExtraSkill4],
				extraContact: {
					industry: newExtraIndustry,
					location: newExtraLocation
				}
			}
		};



		var extraBio = profile.extra.extraBio;
		var extraSkills = profile.extra.extraSkills;
		var extraContact = profile.extra.extraContact;


		// POST REQUEST TO SAVE THE PROFILE INFORMATION IN THE DATABASE
		$.post('/profile/updateProfile', {userID: userID, name: profile.name, title: profile.title, about: profile.about, skill1: profile.skills[0], skill2: profile.skills[1], skill3: profile.skills[2], skill4: profile.skills[3], skill5: profile.skills[4], positions: extraBio.positions, connections: extraBio.connections, extraSkill1: extraSkills[0], extraSkill2: extraSkills[1], extraSkill3: extraSkills[2], extraSkill4: extraSkills[3], industry: extraContact.industry, location: extraContact.location}, function(response, status, jXHR) {
		

			// console.log("profile", profile);
			// console.log("update");
			// console.log("response", response);
			// console.log("Status", status);

			/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
						Once database is saved,
				callback updates the card information
			++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
			$('.user-name.editable').text(newName);
			$('.user-title.editable').text(newTitle);
			$('.user-description.editable').text(newDescription);

			$('#skill-1').text(newSkill1);
			$('#skill-2').text(newSkill2);
			$('#skill-3').text(newSkill3);
			$('#skill-4').text(newSkill4);
			$('#skill-5').text(newSkill5);

			$('#extra-bio-positions').text(newExtraPosition);
			$('#extra-bio-connections').text(newExtraConnections);

			$('#extra-skill-1').text(newExtraSkill1);
			$('#extra-skill-2').text(newExtraSkill2);
			$('#extra-skill-3').text(newExtraSkill3);
			$('#extra-skill-4').text(newExtraSkill4);

			$('#extra-info-industry').text(newExtraIndustry);
			$('#extra-info-location').text(newExtraLocation);

		});
	};






	
	var share = function (recip, subject, message) {
		console.log('Share');

		$.post('/profile/share/connection', {userID: userID, recip: recip, subject: subject, message: message}, function(response) {
			console.log('RESPONSE', response);
			alert('Message Sent');
			return;
		});
		
		// $.post('https://api.linkedin.com/v1/people/' + recip + '/mailbox',
		// 	{
		// 	'recipients': {
		// 		'values': [
		// 			{
		// 				'person': {
		// 					'_path': '/people/' + recip
		// 				}
		// 			}
		// 		]
		// 	},
		// 	'subject': subject,
		// 	'body': message
		// 	}, function(response, status, jXHR) {
		// 	console.log('Status', status);
		// 	return;
		// });
	};


	// Funcion determines which dropdown field to toggle
	var showPopup = function (button, id) {

		var allContent = button.closest('.content-container');

		switch (id) {

			case 'see-bio':
				allContent.find('.extra-bio').slideToggle(500);
				break;
			case 'see-skill':
				allContent.find('.extra-skills').slideToggle(500);
				break;
			case 'see-info':
				allContent.find('.extra-info').slideToggle(500);
				break;
		}
	};





/*++++++++++++++++++++++++++++++++++++++++++++++++
				CLICK EVENTS
++++++++++++++++++++++++++++++++++++++++++++++++*/


	// NAV BUTTON CLICKED
	$('.btn-list button').on('click', function() {
		var nthis = $(this);
		showPopup(nthis, nthis.attr('id'));
	});


	// EDIT BUTTON CLICKED
	$('.btn-edit').on('click', function() {
		edit();
	});


	// SAVE BUTTON CLICKED
	$('.btn-save').on('click', function() {
		save();
	});


	// GENERATE URL/PRINT BUTTON CLICKED
	$('.btn-share').on('click', function() {
		// share();
	});


	// POST TO LINKEDIN CLICKED
	$('.connection').on('click', function() {
		shareTo = $(this).attr('liID');
		console.log("Share To:", shareTo);
	});

	var userLiID = '';

	// POST TO LINKEDIN CLICKED
	$('.post-wall').on('click', function() {
		shareTo = $(this).attr('liID');
		userLiID = $(this).attr('liID');
		console.log("Share To:", shareTo);
	});

	// POST TO LINKEDIN CLICKED
	$('#url-post').on('click', function() {
			var postSubject = $(this).parents('.modal-footer').siblings('.modal-body').find('#url-post-subject').val();
			var postText = $(this).parents('.modal-footer').siblings('.modal-body').find('#url-post-content').val();

		if (shareTo === '') {
			alert('Please Choose Recipient');
			return;
		}
		else if (shareTo === 'wall') {


			// $.post('https://api.linkedin.com/v1/people/~/shares',

				
			$.post('/profile/share/wall', {comment: 'My LinkedIn card via CardLink',
					userID: userID,
					title: postSubject,
					description: '\n\n' + postText
				}, function (response, status, jXHR) {
					console.log('RESPONSE', response);
					// console.log('STATUS', status);
				alert('Message Sent!');
			});
			return;
		}
		else {
			
			console.log('Message Content', postText);
			share(shareTo, postSubject, postText);
		}
	});


	// EDITABLE AREA CLICKED
	$('.editable').on('click', function() {
		$('.share').hide();
		$('.btn-save').show();
	});

}); // --> END JQUERY