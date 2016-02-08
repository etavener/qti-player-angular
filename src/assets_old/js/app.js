(function (mt) {
	'use strict';

	mt.app = {
		instances: {}
	};

	// TODO: refactor this into something more permanent/reusable/DRY etc.

	var dropDowns = mt.app.instances.dropDowns = [];
	var dropDownEls = document.querySelectorAll('[data-mt-selectable]');

	[].slice.call(dropDownEls).forEach(function (dropDown) {
		dropDowns.push(
			new mt.components.DropDown({
				el: dropDown
			})
		);
	});

	var carousels = mt.app.instances.carousels = [];
	var carouselAttribute = 'data-mt-carousel';
	var carouselEls = document.querySelectorAll('[' + carouselAttribute + ']');

	console.log('carouselEls', carouselEls, carouselEls.length);
	[].slice.call(carouselEls).forEach(function (carousel) {
		console.log('carousel', carousel);
		carousels.push(
			new mt.components.Carousel({
				el: carousel,
				modifier: carousel.getAttribute(carouselAttribute)
			})
		);
	});
	console.log('carousel initiated.............');

}(this.mindtree));
