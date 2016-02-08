(function (mt, _, $) {
	'use strict';

	var htmlClasses = {
		container: 'mt__drop-down mt__selectable__container',
		containerOpen: 'mt__drop-down--open',
		dropper: 'mt__drop-down__dropper',
		dropperText: 'mt__drop-down__dropper__text',
		items: 'mt__drop-down__items',
		item: 'mt__drop-down__item',
		focussed: 'mt__selectable--focussed',
		selected: 'mt__selectable--selected',
		hide: 'visually-hidden',
	};

	// TODO: move this out
	var templateStr =   '<p class="mt__selectable <%=htmlClasses.dropper%>">' +
							'<span class="<%=htmlClasses.dropperText%>"><%=items[0].textContent%></span>' +
							'<svg class="mt__icon mt__icon--drop-down-arrow">' +
								'<use xlink:href="/assets/svg/icons.svg#mt-icon-arrow-left" />' +
							'</svg>' +
						'</p>' +
						'<ul class="<%=htmlClasses.items%>">' +
						'<% _.each(items, function (item, index) { %>' +
							'<li class="mt__selectable <%=htmlClasses.item%><% if (!index) { %> <%=htmlClasses.focussed%><% } %>" data-value="<%=item.value%>"><%=item.textContent%></li>' +
						'<% }); %>' +
						'</ul>';

	function DropDown(options) {
		this._$originalEl = $(options.el);

		this._template = _.template(templateStr);

		this._$el = $('<div />', { class: htmlClasses.container });
		this._populate(options.el.options);

		this._$dropper = this._$el.find('.' + htmlClasses.dropper);
		this._$dropperText = this._$dropper.find('.' + htmlClasses.dropperText);
		this._$itemList = this._$el.find('.' + htmlClasses.items);
		this._$items = this._$el.find('.' + htmlClasses.item);
		this._isOpen = false;
		this._focussedIndex = 0;

		this._bindEvents();
		this._overrideOriginal();
	}

	DropDown.prototype._bindEvents = function () {
		_.bindAll(this, '_handleKeyboard', '_activate', '_deactivate', '_toggle', '_choose');

		this._$el.on('click', '.' + htmlClasses.dropper, this._toggle);
		this._$el.on('click', '.' + htmlClasses.item, this._choose);
		this._$el.on('focus', this._activate);
		this._$el.on('blur', this._deactivate);
	};

	DropDown.prototype._populate = function (selectOptions) {
		var html = this._template({
			htmlClasses: htmlClasses,
			items: selectOptions
		});
		this._$el.append(html);
	};

	DropDown.prototype._overrideOriginal = function () {
		this._$el.attr('tabindex', 0);
		this._$originalEl.after(this._$el);
		this._$originalEl.attr('tabindex', -1);
		this._$originalEl.addClass(htmlClasses.hide);
	};

	DropDown.prototype._handleKeyboard = function (e) {
		switch (e.keyCode) {
		// Enter
		case 13:
			if (this._isOpen) {
				this._choose();
			}
			break;
		// Esc
		case 27:
			this._close();
			break;
		// Space
		case 32:
			this._toggle();
			break;
		// Up
		case 38:
			e.preventDefault();
			if (this._isOpen) {
				this._navUp();
			} else {
				this._open();
			}
			break;
		// Down
		case 40:
			e.preventDefault();
			if (this._isOpen) {
				this._navDown();
			} else {
				this._open();
			}
			break;
		}
	};

	DropDown.prototype._activate = function () {
		$(document).on('keydown', this._handleKeyboard);
		this._$dropper.addClass(htmlClasses.focussed);
	};

	DropDown.prototype._deactivate = function () {
		$(document).off('keydown', this._handleKeyboard);
		this._$dropper.removeClass(htmlClasses.focussed);
		this._close();
	};

	DropDown.prototype._open = function () {
		this._isOpen = true;
		this._$el.addClass(htmlClasses.containerOpen);

		this._$el.css('width', this._$el.width());
		this._$itemList.css('position', 'absolute');
	};

	DropDown.prototype._close = function () {
		this._isOpen = false;
		this._$el.removeClass(htmlClasses.containerOpen);

		this._$el.css('width', 'auto');
		this._$itemList.css('position', 'static');
	};

	DropDown.prototype._toggle = function () {
		this[(this._isOpen) ? '_close' : '_open']();
	};

	DropDown.prototype._focusItem = function (newIndexDelta) {
		var newIndex = this._focussedIndex + newIndexDelta;

		if (newIndex >= 0 && newIndex < this._$items.length) {
			this._$items.eq(this._focussedIndex).removeClass(htmlClasses.focussed);
			this._$items.eq(newIndex).addClass(htmlClasses.focussed);
			this._focussedIndex = newIndex;
		}
	};

	DropDown.prototype._navUp = function () {
		this._focusItem(-1);
	};

	DropDown.prototype._navDown = function () {
		this._focusItem(1);
	};

	DropDown.prototype._choose = function (e) {
		var chosenItem = (e) ? e.currentTarget : this._$items[this._focussedIndex];

		this._$dropperText.text(chosenItem.textContent);
		this._$originalEl.val(chosenItem.getAttribute('data-value'));

		if (this._$originalEl[0].selectedIndex) {
			this._$dropper.addClass(htmlClasses.selected);
		} else {
			this._$dropper.removeClass(htmlClasses.selected);
		}

		this._close();
	};

	mt.components.DropDown = DropDown;

}(this.mindtree, this._, this.jQuery));
