/*
 * Input.js – Part of FIL (The Front-end Interactive Libraries)
 * Copyright (c) 2012, Danny Garcia. All rights reserved.
 * Code licensed under the MIT License
 * https://github.com/dannygarcia/fil/
 */


(function (fil) {

	"use strict";

	/*
	*
	* Options:
	*
	* element			[dom]	-	DOM element to track input on.
	* preventDefault	[bool]	-	Should default event behavior be prevented?
	*
	*/

	var Input = function () {


		// Default options and other predetermined variables.
		var _options = {
				element : document.body,
				preventDefault : false,
				ratio : false,
				forceTouch : false,
				type : 'object'
			},
			_ratio = 1,
			_bound = false,
			_touch = false,
			// Proxy pulled from jQuery
			_pxy = function (fn, context) {
				var tmp, args, proxy;

				if ( typeof context === "string" ) {
					tmp = fn[ context ];
					context = fn;
					fn = tmp;
				}

				// Quick check to determine if target is callable, in the spec
				// this throws a TypeError, but we will just return undefined.
				if ( typeof fn !== 'function' ) {
					return undefined;
				}

				// Simulated bind
				args = Array.prototype.slice.call( arguments, 2 );
				proxy = function() {
					return fn.apply( context, args.concat( Array.prototype.slice.call( arguments ) ) );
				};

				// Set the guid of unique handler to the same of original handler, so it can be removed
				proxy.guid = fn.guid = fn.guid || proxy.guid;

				return proxy;
			};


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

				// Update the device pixel ratio accordingly.
				if (typeof window.devicePixelRatio !== 'undefined' && _options.ratio) {
					_ratio = window.devicePixelRatio;
				}

				// Check touch support.
				_touch = (_options.forceTouch || this.supportsTouch());

				this.bindAllInputs();

				return this;

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


			setCoordinates : function (e) {

				if (_options.preventDefault) {
					e.preventDefault();
				}

				var c = [],
					sum = (_options.type === 'object') ? { x : 0, y : 0 } : [0, 0];

				if (_touch) {

					// For each touch input, generate its coordinates.
					for (var i = 0; i < e.touches.length; i++) {
						c[i] = (_options.type === 'object') ? {
							x : e.touches[i].pageX * _ratio,
							y : e.touches[i].pageY * _ratio
						} : [e.touches[i].pageX * _ratio, e.touches[i].pageY * _ratio];
						// sum+=c[i];
						if (_options.type === 'object') {
							sum.x+=c[i].x;
							sum.y+=c[i].y;
						} else {
							sum[0]+=c[i][0];
							sum[1]+=c[i][1];
						}
					}

				} else {

					// Regular Mouse Event Coordinates
					c[0] = (_options.type === 'object') ? {
						x : e.pageX * _ratio,
						y : e.pageY * _ratio
					} : [e.pageX * _ratio, e.pageY * _ratio];

					sum = c[0];

				}

				// Update the inputs array.
				this.inputs = c;

				// Update the average value.
				this.average = (_options.type === 'object') ? {
					x : Math.ceil(sum.x / c.length),
					y : Math.ceil(sum.y / c.length)
				} : [Math.ceil(sum[0] / c.length), Math.ceil(sum[1] / c.length)];

			},


			// NOTE: This can / should be optimized somehow so
			// that only one method is called instead of three.
			// They are called separately so we can pass the
			// specific type to this.setCoordinates() easily.
			bindAllInputs : function () {
				_bound = true;
				this.bindTapStart();
				this.bindTapMove();
				this.bindTapEnd();
			},


			unbindAllInputs : function () {
				if (_bound) {
					this.unbindTapStart();
					this.unbindTapMove();
					this.unbindTapEnd();
				}
				_bound = false;
			},


			/* ============================
			* Tap / Click Down
			* ========================== */

			bindTapStart : function () {
				var event = this.getEventType('start');
				_options.element.addEventListener(event, _pxy(this.tapStart, this), false);
			},

			tapStart : function (e) {
				this.setCoordinates(e, 'start');
				this.ontapstart(this.average, this.inputs);
			},

			// This is the hook for the fired event.
			ontapstart : function (average, inputs) {},

			unbindTapStart : function () {
				var event = this.getEventType('start');
				_options.element.removeEventListener(event, _pxy(this.tapStart, this), false);
			},


			/* ============================
			* Tap / Click Move Over
			* ========================== */

			bindTapMove : function () {
				var event = this.getEventType('move');
				_options.element.addEventListener(event, _pxy(this.tapMove, this), false);
			},

			tapMove : function (e) {
				this.setCoordinates(e, 'move');
				this.ontapmove(this.average, this.inputs);
			},

			// This is the hook for the fired event.
			ontapmove : function (average, inputs) {},

			unbindTapMove : function () {
				var event = this.getEventType('move');
				_options.element.removeEventListener(event, _pxy(this.tapMove, this), false);
			},


			/* ============================
			* Tap / Click Down
			* ========================== */

			bindTapEnd : function () {
				var event = this.getEventType('end');
				_options.element.addEventListener(event, _pxy(this.tapEnd, this), false);
			},

			tapEnd : function (e) {
				this.setCoordinates(e, 'end');
				this.ontapend(this.average, this.inputs);
			},

			// This is the hook for the fired event.
			ontapend : function (average, inputs) {},

			unbindTapEnd : function () {
				var event = this.getEventType('end');
				_options.element.removeEventListener(event, _pxy(this.tapEnd, this), false);
			},


			// Returns the appropriate event type
			// based on whether or not it supports touch.
			getEventType : function (type) {

				var prefix = _touch ? 'touch' : 'mouse';

				if (type === 'start' && !_touch) {
					// Convert 'start' to 'down'
					type = 'down';
				} else if (type === 'end' && !_touch) {
					// Convert 'end' to 'up'
					type = 'up';
				}

				return prefix + type;

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

				this.unbindAllInputs();

			}


		};

	};

	// Attach to the global fil object.
	fil.Input = Input;

	// Look for AMD
	if (typeof this.define === "function" && this.define.amd) {
		
		this.define("Input", [], function () {
			return fil.Input;
		});

	}

}.call(this, (function () {
		this.fil = this.fil || {};
		return this.fil;
	}.call(this))
));
