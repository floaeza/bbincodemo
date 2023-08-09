
var actualPanel = 0;

var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

var carouselElement = $('.featured-carousel');

var carousel = function() {
		carouselElement.owlCarousel({
	    margin:30,
	    animateOut: 'fadeOut',
	    animateIn: 'fadeIn',
	    nav:true,
	    dots: true,
	    autoplayHoverPause: false,
	    items: 1,
	    navText : ["<span class='ion-ios-arrow-back'></span>","<span class='ion-ios-arrow-forward'></span>"],
	    responsive:{
	      0:{
	        items:1
	      },
	      600:{
	        items:2
	      },
	      1000:{
	        items:3
	      }
	    }
		});

	};
	carousel();
var firstVisibleItemIndex 			= null;
var visibleSlidesIndexes		  	= null;
	$('.featured-carousel').on('changed.owl.carousel', function(event) {
				firstVisibleItemIndex 	= event.item.index; 
		});
function MenuRight() {

	switch (actualPanel) {
		case 0:
			var totalItems = $('.owl-dot').length;
			var currentIndex = $('.owl-dot.active').index();
				if (currentIndex < totalItems - 1) {
					carouselElement.trigger('to.owl.carousel', [currentIndex + 1]);
				} else {
					carouselElement.trigger('to.owl.carousel', [0]);
				}
					break;
		case 1:
			var visibleItems = $(".featured-carousel .owl-item.active").get();


			break;
	}

}
function MenuLeft(){
	alert(actualPanel);
	switch (actualPanel) {
		case 0:
			var totalItems = $('.owl-dot').length;
			var currentIndex = $('.owl-dot.active').index();
				if (currentIndex > 0) {
					carouselElement.trigger('to.owl.carousel', [currentIndex - 1]);
				} else {
					carouselElement.trigger('to.owl.carousel', [totalItems - 1]);
				}
			break;
		case 1:
			alert('ajnconc');
			break;
	}

}
function MenuUp(){
	switch (actualPanel) {
		case 0:
			actualPanel = 1;
			$('.owl-dot').removeClass('active');
			$('.item').eq(firstVisibleItemIndex).find('.img').css({
				'transform': 'scale(1.1)',
				'transition': 'transform .2s'
			  });
			break;
		case 1:
			actualPanel = 0;
			$('.item').eq(firstVisibleItemIndex).find('.img').css({
				'transform': 'scale(1)',
				'transition': 'transform .2s'
			  });
			$('.owl-dot').eq(firstVisibleItemIndex).addClass('active');
			break;
	}
}
function MenuDown(){
	switch (actualPanel) {
		case 0:
			actualPanel = 1;
			$('.owl-dot').removeClass('active');
			$('.item').eq(firstVisibleItemIndex).find('.img').css({
				'transform': 'scale(1.1)',
				'transition': 'transform .2s'
			  });
			break;
		case 1:
				actualPanel = 0;
				$('.item').eq(firstVisibleItemIndex).find('.img').css({
					'transform': 'scale(1)',
					'transition': 'transform .2s'
				  });
				$('.owl-dot').eq(firstVisibleItemIndex).addClass('active');
			break;
	}
}