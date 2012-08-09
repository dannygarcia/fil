/*
 * Pen.js – Part of FIL (The Front-end Interactive Libraries)
 * Copyright (c) 2012, Danny Garcia. All rights reserved.
 * Code licensed under the MIT License
 * https://github.com/dannyx0/fil/
 */

define(function () {


	/*
	*
	* Options:
	*
	* val	[type]	-	Description.
	*
	*/


	// Default options and other predetermined variables.
	var _options = {
		};


	return {


		ctx : null,


		/*
		* Initializes the module with a container.
		* @param userOptions [obj]	-	Options object (see above).
		*/
		init : function (userOptions) {

			// Set user options.
			if (typeof userOptions !== 'undefined') {
				this.options(userOptions);
			}

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


		/*
		* Gets / Sets the context value.
		* @param context [ctx]	-	Canvas context to set.
		*/
		context : function (context) {

			if (typeof context === 'undefined') {

				if (this.ctx === null) {
					throw 'You must provide a [ctx] to draw on. Try setting it with context(ctx)';
				}

				return this.ctx;
			}

			this.ctx = context;

		},


		/*
		* Draws a simple line.
		* @param from [object]	-	Holds x & y from coordinates.
		* @param to [object]	-	Holds x & y to coordinates.
		*/
		line : function (from, to) {
			var ctx = this.context();
			ctx.beginPath();
			ctx.moveTo(from.x, from.y);
			ctx.lineTo(to.x, to.y);
			ctx.stroke();
		},


		/*
		* Draws a centered circle.
		* @param pos [object]	-	Holds x & y position coordinates.
		* @param size [int]		-	Circle size.
		*/
		circle : function (pos, size) {
			var ctx = this.context();
			ctx.beginPath();
			ctx.arc(pos.x, pos.y, size, 0, Math.PI * 2, true);
			ctx.closePath();
			ctx.fill();
		},


		// Essentially resets everything
		// to the state before this.init().
		destroy : function () {

		}


	};
});