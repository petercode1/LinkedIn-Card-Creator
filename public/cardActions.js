$(document).on('ready', function() {


	var sendProfile = function() {
		IN.API.Profile("me").result(function(profiles) {

				console.log(profiles.values[0]);
		});
	};

	var edit = function () {
		$('.editable').hide();
		$('.write').show();

	};

	var save = function () {

		$('.editable').show();
		$('.write').hide();

		var name = $('.user-name.editable').text();
		var newName = $('.user-name-input').val() || name;

		var title = $('.user-title.editable').text();
		var newTitle = $('.user-title-input').val() || title;
		
		var description = $('.user-description.editable').text();
		var newDescription = $('.user-description-input').val() || description;

		var skill1 = $('#skill-1').text();
		var skill2 = $('#skill-2').text();
		var skill3 = $('#skill-3').text();
		var skill4 = $('#skill-4').text();
		var skill5 = $('#skill-5').text();

		var newSkill1 = $('#skill1-input').val() || skill1;
		var newSkill2 = $('#skill2-input').val() || skill2;
		var newSkill3 = $('#skill3-input').val() || skill3;
		var newSkill4 = $('#skill-input-4').val() || skill5;
		var newSkill5 = $('#skill-input-5').val() || skill5;


		var extraSkill1 = $('#extra-skill-1').text();
		var extraSkill2 = $('#extra-skill-2').text();
		var extraSkill3 = $('#extra-skill-3').text();
		var extraSkill4 = $('#extra-skill-4').text();
		var extraSkill5 = $('#extra-skill-5').text();

		var newExtraSkill1 = $('#extra-skill1-input').val() || extraSkill1;
		var newExtraSkill2 = $('#extra-skill2-input').val() || extraSkill2;
		var newExtraSkill3 = $('#extra-skill3-input').val() || extraSkill3;
		var newExtraSkill4 = $('#extra-skill-input-4').val() || extraSkill5;
		var newExtraSkill5 = $('#extra-skill-input-5').val() || extraSkill5;

		var phone = $('.user-phone.editable').text();
		var newPhone = $('.user-phone-input').val() || phone;


		var extraBio = $('#extra-bio').text();
		var newExtraBio = $('#user-extra-bio-input').val() || extraBio;
		
		// var extraSkills = $('#extra-skills').text();
		// var newExtraSkills = $('#user-extra-skills-input').val() || extraSkills;
		
		var extraInfo = $('#extra-info').text();
		var newExtraInfo = $('#user-extra-info-input').val() || extraInfo;


		if (newName.length > 40 || newTitle.length > 40 || newDescription.length > 290) {
			alert("One or more of your input fields exceeds maximum length\nPlease edit before continuing");
		}

		if (newExtraBio.length > 40 || newExtraInfo.length > 40) {
			alert("One or more of your input fields exceeds maximum length\nPlease edit before continuing");
		}
	

		var profile = {
			name: newName,
			title: newTitle,
			description: newDescription,
			skills: [newSkill1, newSkill2, newSkill3, newSkill4, newSkill5],
			phone: newPhone,
			extra: {
				extraBio: newExtraBio,
				extraSkills: newExtraSkills,
				extraInfo: newExtraInfo
			}
		};
// 		// console.log(profile);

// $('#skill-1').text = newSkill1;
// 			$('#skill-2').text = newSkill2;
// 			$('#skill-3').text = newSkill3;
// 			$('#skill-4').text = newSkill4;
// 			$('#skill-5').text = newSkill5;
		// Update database with any new user input
		$.post('profile/updateProfile', {profile: profile}, function() {

			// Once Database is saved, callback updates the card information
			$('.user-name.editable').text = newName;
			$('.user-title.editable').text = newTitle;
			$('.user-description.editable').text = newDescription;

			$('#skill-1').text = newSkill1;
			$('#skill-2').text = newSkill2;
			$('#skill-3').text = newSkill3;
			$('#skill-4').text = newSkill4;
			$('#skill-5').text = newSkill5;

			$('.user-phone').text = newPhone;

			$('#extra-bio').text = newExtraBio;
			$('#extra-skill-1').text = NewExtraSkill1;
			$('#extra-skill-2').text = NewExtraSkill2;
			$('#extra-skill-3').text = NewExtraSkill3;
			$('#extra-skill-4').text = NewExtraSkill4;
			$('#extra-skill-5').text = NewExtraSkill5;
			// $('#extra-skills').text = newExtraSkills;
			$('#extra-info').text = newExtraInfo;

		});
	};

	
	var share = function () {
		$.get('/card/generatePublic');
	};


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



	$('.btn-list button').on('click', function() {
		var nthis = $(this);

		showPopup(nthis, nthis.attr('id'));
	});



	$('.btn-edit').on('click', function() {
		edit();
	});

	$('.btn-save').on('click', function() {
		save();
	});

	$('.btn-share').on('click', function() {
		share();
	});

	$('.editable').on('click', function() {
		$('.btn-share').hide();
		$('.btn-save').show();
	});

}); // --> END JQUERY