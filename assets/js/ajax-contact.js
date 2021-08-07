
$(function() {

	function getFormData($form){
		var unindexed_array = $form.serializeArray();
		var indexed_array = {};
	
		$.map(unindexed_array, function(n, i){
			indexed_array[n['name']] = n['value'];
		});
	
		return indexed_array;
	}

	// Get the form.
	var form = $('#contact-form');

	// Get the messages div.
	var formMessages = $('.form-message');

	// Set up an event listener for the contact form.
	$(form).submit(function(e) {
		// Stop the browser from submitting the form.
		e.preventDefault();

		// Serialize the form data.
		var formData = getFormData(form);
		console.log('submitting', formData);

		// Submit the form using AJAX.
		$.ajax({
			type: 'GET',
			dataType: "json",
			url: $(form).attr('action'),
			data: formData
		})
		.done(function(response) {
			// Make sure that the formMessages div has the 'success' class.
			$(formMessages).removeClass('error');
			$(formMessages).addClass('success');

			// Set the message text.
			$(formMessages).text("Gotcha! We'll get in touch with you soon.");

			// Clear the form.
			$('#contact-form input,#contact-form textarea').val('');
		})
		.fail(function(data) {
			// Make sure that the formMessages div has the 'error' class.
			$(formMessages).removeClass('success');
			$(formMessages).addClass('error');

			// Set the message text.
			if (data.responseText !== '') {
				$(formMessages).text(data.responseText);
			} else {
				$(formMessages).text('Oops! An error occured and your message could not be sent.');
			}
		});
	});

});
