/*
 * Canvas.js – Part of FIL (The Front-end Interactive Libraries)
 * Copyright (c) 2012, Danny Garcia. All rights reserved.
 * Code licensed under the MIT License
 * https://github.com/dannygarcia/fil/
 */


(function (fil) {

	"use strict";

	/*
	*
	* Options
	*
	* context	[str]		-	Context type.
	* container	[dom]		-	<canvas> container.
	* width		[num/str]	-	Canvas width. "auto" fits to container.
	* height	[num/str]	-	Canvas height. "auto" fits to container.
	* resize	[bool]		-	Should the canvas width/height be reset
	*							when the window is resized?
	*/


	var Canvas = function () {


		// Default options and other predetermined variables.
		var Canvas,
			_options = {
				context : "2d",
				container : document.body,
				width : "auto",
				height : "auto",
				resize : false,
				ratio : false
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

				// Set user options.
				if (typeof userOptions !== 'undefined') {
					this.options(userOptions);
				}

				// Update the device pixel ratio accordingly.
				if (typeof window.devicePixelRatio !== 'undefined' && _options.ratio) {
					_ratio = window.devicePixelRatio;
				}

				// Append a <canvas> node to the container.
				_canvas = _options.container.appendChild(document.createElement('canvas'));

				// Set the canvas context.
				_context = this.context(_options.context);

				// Bind to window resizing.
				this.resize(null, _options.width, _options.height);
				if (_options.resize) {
					window.addEventListener('resize', this.resize, false);
				}

				return this;

			},


			/*
			* Gets / Sets module options.
			* Does not initialize anything.
			* @param newOptions [obj]	-	Options object.
			*/
			options : function (newOptions) {

				if (typeof newOptions === 'undefined') {
					newOptions = _options;
				} else {

					// Check customized options and set them.
					for (var option in _options) {
						if (_options.hasOwnProperty(option) && typeof newOptions[option] !== 'undefined') {
							_options[option] = newOptions[option];
						}
					}

				}

				return newOptions;

			},


			/*
			* Gets / Sets the canvas object context.
			* @param ctx [obj]	-	Canvas Context Object
			*/
			context : function (ctx) {


				if (typeof ctx === 'undefined') {
					return _context;
				}

				_context = _canvas.getContext(ctx);
				return _context;

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
				this.width = _context.canvas.width = width;
				this.height = _context.canvas.height = height;

				// Set the actual canvas width and height.
				_canvas.style.width = width / _ratio;
				_canvas.style.height = height / _ratio;

			},


			// Clears the canvas.
			clear : function () {
				_context.clearRect(0, 0, this.width, this.height);
			},


			// Essentially resets everything
			// to the state before this.init().
			destroy : function () {

				// Unbind resize.
				if (_options.resize) {
					window.removeEventListener('resize', this.resize, false);
				}

				// Remove canvas node.
				if (_canvas) {
					_options.container.removeChild(_canvas);
				}

				// Reset variables.
				_options = {
					context : "2d",
					container : document.body,
					width : "auto",
					height : "auto",
					resize : false
				};
				_canvas = null;
				_context = null;
				_ratio = 1;

			}
		};

	};

	// Attach to the global fil object.
	fil.Canvas = Canvas;

	// Look for AMD
	if (typeof this.define === "function" && this.define.amd) {
		
		this.define("Canvas", [], function () {
			return fil.Canvas;
		});

	}

}.call(this, (function () {
		this.fil = this.fil || {};
		return this.fil;
	}.call(this))
));
