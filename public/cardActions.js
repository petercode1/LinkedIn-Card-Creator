$(document).on('ready', function() {


var edit = function () {

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
		console.log('Clicked');
		var nthis = $(this);

		showPopup(nthis, nthis.attr('id'));
	});

}); // --> END JQUERY