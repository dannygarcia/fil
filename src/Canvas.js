/*
 * Canvas.js – Part of FIHL (The Front-end Interactive Helper Libraries)
 * Copyright (c) 2012, Danny Garcia. All rights reserved.
 * Code licensed under the MIT License
 * https://github.com/dannyx0/feihl/
 */

define(function () {

	/*
	*
	* Options
	*
	* Context	[str]		-	Context type.
	* container	[dom]		-	<canvas> container.
	* width		[num/str]	-	Canvas width. "auto" fits to container.
	* height	[num/str]	-	Canvas height. "auto" fits to container.
	*
	* Example
	* canvas.init({
	*   container : document.getElementById('canvas')
	* });
	*
	*/

	// Default options and other predetermined variables.
	var _options = {
			context : "2d",
			container : document.body,
			width : "auto",
			height : "auto",
			resize : false
		},
		_canvas = null,
		_context = null,
		_ratio = 1;

	return {


		width : null,
		height : null,


		/*
		* Initializes the module with a container.
		* @param userOptions [obj]	-	Options object (see above).
		*/
		init : function (userOptions) {

			// Update the device pixel ratio accordingly.
			if (typeof window.devicePixelRatio !== 'undefined') {
				_ratio = window.devicePixelRatio;
			}

			// Set user options.
			if (typeof userOptions !== 'undefined') {
				this.options(userOptions);
			}

			// Append a <canvas> node to the container.
			canvas = _options.container.appendChild(document.createElement('canvas'));

			// Set the canvas context.
			this.context(_options.context);

			// Bind to window resizing.
			this.resize(null, _options.width, _options.height);
			if (_options.resize) {
				window.addEventListener('resize', this.resize, false);
			}

		},


		/*
		* Gets / Sets canvas options.
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


		/*
		* Gets / Sets the canvas object context.
		* @param [object] ctx	-	Canvas Context Object
		*/
		context : function (ctx) {

			if (typeof ctx === 'undefined') {
				return context;
			}

			context = canvas.getContext(ctx);
			return context;

		},


		/*
		* Resizes the canvas width and height.
		* @param [event] e		-	unused
		* @param [num] width	-	optional
		* @param [num] height	-	optional
		*/
		resize : function (e, width, height) {

			// Determine the appropriate width.
			if (typeof width === 'undefined' || width === 'auto') {
				width = _options.container.offsetWidth;
			}

			// Determine the appropriate height.
			if (typeof height === 'undefined' || height === 'auto') {
				height = _options.container.offsetHeight;
			}

			width *= _ratio;
			height *= _ratio;

			// Set the appropriate canvas resolution.
			this.width = context.canvas.width = width;
			this.height = context.canvas.height = height;

			// Set the actual canvas width and height.
			canvas.style.width = width / _ratio;
			canvas.style.height = height / _ratio;

		},


		// Essentially resets everything to the state before this.init().
		destroy : function () {

			// Unbind resize.
			if (_options.resize) {
				window.removeEventListener('resize', this.resize, false);
			}

			// Remove canvas node.
			_options.container.removeChild(canvas);

			// Reset variables.
			_options = {
				context : "2d",
				container : document.body,
				width : "auto",
				height : "auto",
				resize : false
			};
			canvas = null;
			context = null;
			_ratio = 1;
			dimensions = {};

		}


	};

});