/*
 * Input.js – Part of FIL (The Front-end Interactive Libraries)
 * Copyright (c) 2012, Danny Garcia. All rights reserved.
 * Code licensed under the MIT License
 * https://github.com/dannyx0/fil/
 */

define(function () {


	/*
	*
	* Options
	*
	* element	[dom]		-	DOM element to track input on.
	* container	[dom]		-	<canvas> container.
	* width		[num/str]	-	Canvas width. "auto" fits to container.
	* height	[num/str]	-	Canvas height. "auto" fits to container.
	* resize	[bool]		-	Should the canvas width/height be reset
	*							when the window is resized?
	*/


	// Default options and other predetermined variables.
	var _options = {
			element : document.body
		},
		_touch = false;


	return {


		inputs : [],	// An array of mouse / touch inputs - for each, an x/y object
		average : {},	// Averaged input - useful for normalizing multiple touches.


		/*
		* Initializes the module with a container.
		* @param userOptions [obj]	-	Options object (see above).
		*/
		init : function (userOptions) {


			// Set user options.
			if (typeof userOptions !== 'undefined') {
				this.options(userOptions);
			}

			// Check touch support.
			_touch = this.supportsTouch();

			this.bindAllInputs();

		},


		/*
		* Gets / Sets module options.
		* Does not initialize anything.
		* @param newOptions [obj]	-	Options object.
		*/
		options : function (newOptions) {

			if (typeof newOptions === 'undefined') {
				return _options;
			}

			// Check customized options and set them.
			for (var option in _options) {
				if (_options.hasOwnProperty(option) && typeof newOptions[option] !== 'undefined') {
					_options[option] = newOptions[option];
				}
			}

		},


		bindAllInputs : function () {
			this.bindHover();
			this.bindTapDown();
			this.bindTapUp();
			this.bindTap();
		},


		unbindAllInputs : function () {
			this.unbindHover();
			this.unbindTapDown();
			this.unbindTapUp();
			this.unbindTap();
		},


		bindMovement : function () {

		},


		unbindMovement : function () {

		},


		// Test for touch support.
		supportsTouch : function () {

			// This is a quick and simple test as borrowed from Modernizr.
			// It does not include the deeper CSS Media Query test.
			// Use Modernizr.touch for a more thorough test.
			return (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);

		},


		// Essentially resets everything
		// to the state before this.init().
		destroy : function () {


		}


	};
});