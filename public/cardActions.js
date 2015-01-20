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
			$('.user-name-input').attr('placeholder', newName);

			$('.user-title.editable').text(newTitle);
			$('.user-description-input').attr('placeholder', newDescription);

			$('#skill-1, #p-skill-1').text(newSkill1);
			$('#skill-2, #p-skill-2').text(newSkill2);
			$('#skill-3, #p-skill-3').text(newSkill3);
			$('#skill-4, #p-skill-4').text(newSkill4);
			$('#skill-5, #p-skill-5').text(newSkill5);

			$('#skill1-input').attr('placeholder', newSkill1);
			$('#skill2-input').attr('placeholder', newSkill2);
			$('#skill3-input').attr('placeholder', newSkill3);
			$('#skill4-input').attr('placeholder', newSkill4);
			$('#skill5-input').attr('placeholder', newSkill5);

			$('#extra-bio-positions, #p-extra-bio-positions').text(newExtraPosition);
			$('#user-extra-position-input').attr('placeholder', newExtraPosition);

			$('#extra-bio-connections, #p-extra-bio-connections').text(newExtraConnections);
			$('#user-extra-connections-input').attr('placeholder', newExtraConnections);

			$('#extra-skill-1, #p-extra-skill-1').text(newExtraSkill1);
			$('#extra-skill-2, #p-extra-skill-2').text(newExtraSkill2);
			$('#extra-skill-3, #p-extra-skill-3').text(newExtraSkill3);
			$('#extra-skill-4, #p-extra-skill-4').text(newExtraSkill4);

			$('#extra-skill1-input').attr('placeholder', newExtraSkill1);
			$('#extra-skill2-input').attr('placeholder', newExtraSkill2);
			$('#extra-skill3-input').attr('placeholder', newExtraSkill3);
			$('#extra-skill4-input').attr('placeholder', newExtraSkill4);

			$('#extra-info-industry, #p-extra-info-industry').text(newExtraIndustry);
			$('#user-extra-industry-input').attr('placeholder', newExtraIndustry);

			$('#extra-info-location, #p-extra-info-location').text(newExtraLocation);
			$('#user-extra-location-input').attr('placeholder', newExtraLocation);

			$('input, textarea').val('');

		});
	};






	
	var share = function (recip, subject, message) {
		// console.log('Share');

		$.post('/profile/share/connection', {userID: userID, recip: recip, subject: subject, message: message}, function(response) {
			// console.log('RESPONSE', response);
			if (response.statusCode < 300) {
				alert('Message Sent!');
			}
			else {
				alert('We are sorry, something went wrong.\n\n(You may have already posted this)\n\nPlease try again later');
			}
			return;
		});
	};


	// Funcion determines which dropdown field to toggle
	var showPopup = function (button, extraToggle) {

		var allContent = button.closest('.content-container');

		switch (extraToggle) {

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
		showPopup(nthis, nthis.attr('extra-toggle'));
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
	$('.connection').on('mousedown', function() {
		var nthis = $(this);
		nthis.siblings('.connection').removeClass('selected');
		nthis.parents('.btn-group-vertical').siblings('.post-wall').removeClass('selected');
	});

	$('.connection').on('mouseup', function() {
		var nthis = $(this);
		nthis.addClass('selected');
		shareTo = nthis.attr('liID');
		// console.log("Share To:", shareTo);
	});

	var userLiID = '';

	// POST TO LINKEDIN CLICKED
	$('.post-wall').on('click', function() {
		var nthis = $(this);
		nthis.addClass('selected');
		shareTo = nthis.attr('liID');
		userLiID = nthis.attr('liID');
		nthis.siblings('.btn-group-vertical').find('.connection').removeClass('selected');
		// console.log("Share To:", shareTo);
	});

	// POST TO LINKEDIN CLICKED
	$('#url-post').on('click', function() {
		var postSubject = $(this).parents('.modal-footer').siblings('.modal-body').find('#url-post-subject').val();
		var postText = $(this).parents('.modal-footer').siblings('.modal-body').find('#url-post-content').val();

		if (shareTo === '') {
			alert('Please Choose Recipient');
			return;
		}


		// Post the the overall feed
		else if (shareTo === 'wall') {


			// $.post('https://api.linkedin.com/v1/people/~/shares',

				
			$.post('/profile/share/wall', {comment: 'CardLink Card',
					userID: userID,
					title: postSubject,
					description: postText
				}, function (response, status, jXHR) {
					// console.log('RESPONSE', response);
					// console.log('STATUS', status);
				if (response.statusCode < 300) {
					alert('Message Sent!');
				}
				else {
					alert('We are sorry, something went wrong.\n\n(You may have already posted this)\n\nPlease try again later');
				}
			});
			return;
		}
		else {
			
			// console.log('Message Content', postText);
			share(shareTo, postSubject, postText);
		}
	});


	// EDITABLE AREA CLICKED
	$('.editable').on('click', function() {
		$('.share').hide();
		$('.btn-save').show();
	});

}); // --> END JQUERY