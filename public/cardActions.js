$(document).on('ready', function() {


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

		var phone = $('.user-phone.editable').text();
		var newPhone = $('.user-phone-input').val() || phone;


		var extraBio = $('#extra-bio').text();
		var newExtraBio = $('#user-extra-bio-input').val() || extraBio;
		
		var extraSkills = $('#extra-skills').text();
		var newExtraSkills = $('#user-extra-skills-input').val() || extraSkills;
		
		var extraInfo = $('#extra-info').text();
		var newExtraInfo = $('#user-extra-info-input').val() || extraInfo;


	


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
		console.log(profile);


		// Update database with any new user input
		$.post('profile/updateProfile', profile, function() {

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
			$('#extra-skills').text = newExtraSkills;
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