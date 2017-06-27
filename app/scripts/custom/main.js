jQuery(document).ready(function(){
	
	
	
	
	
	
	jQuery('.footer .footer-left h4, .footer .contact-details h4').click(function() {
		if(jQuery(window).width() < 768) {
			if(jQuery(this).hasClass('boxOpen')) {
				jQuery(this).removeClass('boxOpen');
			   jQuery(this).next('.footer-links').slideUp();
			} else {
			  jQuery(this).addClass('boxOpen');
			  jQuery(this).next('.footer-links').slideDown();
			}
		}
	});
	
	
	
	/*Top Nav Fixed*/
	$(document).on("scroll", function() {
	  if ($(document).scrollTop() > 0) {
		$(".navbar").addClass("header-fixed");
	  } else {
		$(".navbar").removeClass("header-fixed");
	  }
	});

	jQuery(document).ready(function() {
		jQuery('select, input[type="file"], input[type="checkbox"], input[type="radio"]').uniform();
	});
	
});//ready over


// Resize Function
jQuery(window).resize(function() {

});