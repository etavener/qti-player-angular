angular.module("contentplayer")
.controller('flexcarusel', ["$scope", "$element", "$attrs", "$compile", function (scope, element, attrs, compile){
	scope.sliderImages = [];
	this.initSlider = function () {
		this.setSliderImagesArray();
		// remove the "old" images from the dom
		element.find(".imagesDisplay").remove();
	};

	this.setSliderImagesArray = function () {
		// set array of slider images
		element.find("img").each(function () {
			scope.sliderImages.push ( {
				"identifier": $(this).parent().attr("identifier"),
				"matchmax": $(this).parent().attr("matchmax"),
				"src": $( this ).attr("src") 
			});
		});
	};

	
	

	// this.initialise = function(){
	// 	var carousels = [];
	// 	var carouselAttribute = 'data-mt-carousel';
	// 	var carouselEls = document.querySelectorAll('[' + carouselAttribute + ']');

	// 	[].slice.call(carouselEls).forEach(function (carousel) {
	// 		//console.log('carousel', carousel);
	// 		carousels.push(
	// 			new Carousel({
	// 				el: carousel,
	// 				modifier: carousel.getAttribute(carouselAttribute)
	// 			})
	// 		);
	// 	});
	// }
	
	// var i18n = {
	// 	prev: 'Previous question',
	// 	next: 'Next question',
	// 	navItem: 'Slide: '
	// };

	// var htmlClasses = {
	// 	root: 'carousel',
	// 	ready: 'carousel--ready',

	// 	// Carousel items (individual slides)
	// 	item: 'carousel__item',
	// 	itemCurrent: 'carousel__item--current',
	// 	itemPrev: 'carousel__item--prev',
	// 	itemNext: 'carousel__item--next',

	// 	// Nav UI
	// 	button: 'carousel-nav__button',
	// 	buttonActive: 'carousel-nav__button--active',
	// 	prevButton: 'carousel-nav__button--prev',
	// 	nextButton: 'carousel-nav__button--next',
	// 	navListContainer: 'carousel-nav__list-container',
	// 	navList: 'carousel-nav__list',
	// 	navListItem: 'carousel-nav__list-item',
	// 	navItem: 'carousel-nav__item'
	// };

	// // TODO: move this out
	// var templateStr =   '<nav class="carousel-nav <%= modifier && \'carousel-nav--\' + modifier %>">' +
	// 						'<div class="<%= htmlClasses.navListContainer %>">' +
	// 							'<ul class="<%= htmlClasses.navList %>">' +
	// 							'<% _.each(items, function (item, i) { %>' +
	// 								'<li class="<%= htmlClasses.navListItem %>">' +
	// 									'<input type="radio" name="<%= id %>" id="in_<%= id %>-<%= i %>" class="visually-hidden">' +
	// 									'<label for="in_<%= id %>-<%= i %>" class="mt__selectable <%= htmlClasses.navItem %>"><%= i18n.navItem %><%= i+1 %></label>' +
	// 								'</li>' +
	// 							'<% }); %>' +
	// 							'</ul>' +
	// 						'</div>' +
	// 						'<button class="<%= htmlClasses.button %> <%= htmlClasses.prevButton %>" title="<%= i18n.prev %>">' +
	// 							'<svg class="mt__icon"><use xlink:href="/assets/svg/icons.svg#mt-icon-arrow-left"></use></svg>' +
	// 						'</button>' +
	// 						'<button class="<%= htmlClasses.button %> <%= htmlClasses.nextButton %>" title="<%= i18n.next %>">' +
	// 							'<svg class="mt__icon"><use xlink:href="/assets/svg/icons.svg#mt-icon-arrow-right"></use></svg>' +
	// 						'</button>' +
	// 					'</nav>';

	// function Carousel(options) {
	// 	//TODO: add options overrides for i18n & htmlClasses
	// 	this._$el = $(options.el);
	// 	this._$items = this._$el.find('.' + htmlClasses.item);
	// 	this._currentItemIndex = 0;
	// 	this._modifier = options.modifier || null;

	// 	this._$nav = null;
	// 	this._$navItems = null;
	// 	this._$navPrev = null;
	// 	this._$navNext = null;

	// 	this._populateNav(_.template(templateStr));

	// 	this._bindEvents();
	// 	this.setCurrentItem(this._currentItemIndex);

	// 	this._$el.addClass(htmlClasses.ready);
	// 	// TODO: reconsider this
	// 	this._$el.addClass(htmlClasses.root + '--' + this._modifier);
	// }

	// Carousel.prototype.setCurrentItem = function (index) {
	// 	if (index < 0 || index >= this._$items.length) { return; }

	// 	function itemIterator(i, item) {
	// 		var $item = $(item);
	// 		// If item is new previous, add class, otherwise remove
	// 		$item.toggleClass(htmlClasses.itemPrev, i < index);
	// 		// New current
	// 		$item.toggleClass(htmlClasses.itemCurrent, i === index);
	// 		// New next
	// 		$item.toggleClass(htmlClasses.itemNext, i > index);
	// 		// Kill keyboard focusability for non-current-slide inputs
	// 		$item.find('input').attr('tabindex', (i === index) ? 0 : -1);
	// 	}

	// 	this._$items.each(itemIterator);

	// 	this._currentItemIndex = index;
	// 	this._updateNav();
	// };

	// Carousel.prototype._updateNav = function () {
	// 	var currentIndex = this._currentItemIndex;
	// 	this._$navItems.each(function (i, el) {
	// 		$(el).prop('checked', (i === currentIndex));
	// 	});
	// 	this._$navPrev.toggleClass(htmlClasses.buttonActive, currentIndex > 0);
	// 	this._$navNext.toggleClass(htmlClasses.buttonActive, currentIndex < this._$navItems.length - 1);
	// };

	// Carousel.prototype._populateNav = function (templateFn) {
	// 	this._$nav = $(templateFn({ id: _.uniqueId(), items: this._$items, htmlClasses: htmlClasses, i18n: i18n, modifier: this._modifier }));
	// 	this._$navItems = this._$nav.find('input');
	// 	this._$navPrev = this._$nav.find('.' + htmlClasses.prevButton);
	// 	this._$navNext = this._$nav.find('.' + htmlClasses.nextButton);
	// 	this._$el.after(this._$nav);
	// };

	// Carousel.prototype.previous = function () {
	// 	this.setCurrentItem(this._currentItemIndex - 1);
	// };

	// Carousel.prototype.next = function () {
	// 	this.setCurrentItem(this._currentItemIndex + 1);
	// };

	// Carousel.prototype._handleNavItemChange = function (e) {
	// 	var choiceIndex = this._$navItems.index(e.currentTarget);
	// 	this.setCurrentItem(choiceIndex);
	// };

	// Carousel.prototype._bindEvents = function () {
	// 	_.bindAll(this, 'previous', 'next', '_handleNavItemChange');
	// 	this._$nav.on('click', '.' + htmlClasses.prevButton, this.previous);
	// 	this._$nav.on('click', '.' + htmlClasses.nextButton, this.next);
	// 	this._$nav.on('change', 'input', this._handleNavItemChange);
	// };

	//this.Carousel = Carousel;
}]);