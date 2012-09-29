/*
 * fil.min.js – FIL (The Front-end Interactive Libraries)
 * Copyright (c) 2012, Danny Garcia. All rights reserved.
 * Code licensed under the MIT License
 * https://github.com/dannygarcia/fil/
 */
var fil = fil || {};
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
/*
 * Frame.js – Part of FIL (The Front-end Interactive Libraries)
 * Copyright (c) 2012, Danny Garcia. All rights reserved.
 * Code licensed under the MIT License
 * https://github.com/dannygarcia/fil/
 */

(function (fil) {

	"use strict";

	var Frame = function () {


		return {


			active : false,
			request : null,
			frame : 0,


			// This is the hook for the animation frame step.
			step : function (frame) {},


			start : function () {

				if (!this.active) {

					var self = this,
						animationLoop = function () {
							self.request = window.requestAnimationFrame(animationLoop);
							self.step(self.frame);
							self.frame++;
						};

					if (typeof window.requestAnimationFrame === 'undefined') {

						window.requestAnimationFrame = (function () {
							return  window.requestAnimationFrame       ||
									window.webkitRequestAnimationFrame ||
									window.mozRequestAnimationFrame    ||
									window.oRequestAnimationFrame      ||
									window.msRequestAnimationFrame     ||
									function (callback) {
										window.setTimeout(callback, 1000 / 60);
									};
						}());

					}

					if (typeof window.cancelAnimationFrame === 'undefined') {

						window.cancelAnimationFrame = (function () {
							return  window.cancelAnimationFrame       ||
									window.webkitCancelAnimationFrame ||
									window.mozCancelAnimationFrame    ||
									window.oCancelAnimationFrame      ||
									window.msCancelAnimationFrame;
						}());

					}

					animationLoop();
					this.active = true;

				}

			},


			stop : function () {

				if (this.active) {
					window.cancelAnimationFrame(this.request);
				}

			}


		};
	};

	// Attach to the global fil object.
	fil.Frame = Frame;

	// Look for AMD
	if (typeof this.define === "function" && this.define.amd) {

		this.define("Frame", [], function () {
			return fil.Frame;
		});

	}

}.call(this, (function () {
		this.fil = this.fil || {};
		return this.fil;
	}.call(this))
));
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

				if (typeof context === "string") {
					tmp = fn[context];
					context = fn;
					fn = tmp;
				}

				// Quick check to determine if target is callable, in the spec
				// this throws a TypeError, but we will just return undefined.
				if (typeof fn !== 'function') {
					return undefined;
				}

				// Simulated bind
				args = Array.prototype.slice.call(arguments, 2);
				proxy = function () {
					return fn.apply(context, args.concat(Array.prototype.slice.call(arguments)));
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
							sum.x += c[i].x;
							sum.y += c[i].y;
						} else {
							sum[0] += c[i][0];
							sum[1] += c[i][1];
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
				return (('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch);

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
/*
 * Pen.js – Part of FIL (The Front-end Interactive Libraries)
 * Copyright (c) 2012, Danny Garcia. All rights reserved.
 * Code licensed under the MIT License
 * https://github.com/dannygarcia/fil/
 */


(function (fil) {

	"use strict";

	var Pen = function () {


		return {


			ctx : null,


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
				return this.ctx;

			},


			fill : function (color) {
				var ctx = this.context();

				ctx.fillStyle = color;

			},


			stroke : function (color, width) {
				var ctx = this.context();

				if (color) {
					ctx.strokeStyle = color;
				}

				if (width) {
					ctx.lineWidth = width;
				}

			},


			/*
			* Draws a simple line.
			* @param from [o/a]	-	Holds x & y from coordinates.
			* @param to [o/a]	-	Holds x & y to coordinates.
			* @param type [str] -	object | array type.
			*/
			line : function (from, to, type) {
				type = type || 'object';
				var ctx = this.context();
				ctx.beginPath();
				if (type === 'array') {
					ctx.moveTo(from[0], from[1]);
					ctx.lineTo(to[0], to[1]);
				} else {
					ctx.moveTo(from.x, from.y);
					ctx.lineTo(to.x, to.y);
				}
				ctx.stroke();
			},


			/*
			* Draws a centered circle.
			* @param pos [o/a]		-	Holds x & y position coordinates.
			* @param size [int]		-	Circle size.
			* @param type [str]		-	object | array type.
			*/
			circle : function (pos, size, type) {
				type = type || 'object';
				var ctx = this.context();
				ctx.beginPath();
				if (type === 'array') {
					ctx.arc(pos[0], pos[1], size, 0, Math.PI * 2, true);
				} else {
					ctx.arc(pos.x, pos.y, size, 0, Math.PI * 2, true);
				}
				ctx.closePath();
				ctx.fill();
			}


		};

	};

	// Attach to the global fil object.
	fil.Pen = Pen;

	// Look for AMD
	if (typeof this.define === "function" && this.define.amd) {

		this.define("Pen", [], function () {
			return fil.Pen;
		});

	}

}.call(this, (function () {
		this.fil = this.fil || {};
		return this.fil;
	}.call(this))
));
/*
 * Transformer.js – Part of FIL (The Front-end Interactive Libraries)
 * Copyright (c) 2012, Danny Garcia. All rights reserved.
 * Code licensed under the MIT License
 * https://github.com/dannygarcia/fil/
 */


(function (fil) {

	"use strict";

	var Transformer = function () {


		// TODO: Look into not using this.
		var self = this;

		// Contains method borrowed from Modernizr
		this._contains = function contains(str, substr) {
			return !!~('' + str).indexOf(substr);
		};

		// Prefixing method borrowed from Modernizr
		this._prefixed = function (prop, style) {

			var prefixes = 'Webkit Moz O ms'.split(' '),
				ucProp  = prop.charAt(0).toUpperCase() + prop.slice(1),
				props = (prop + ' ' + prefixes.join(ucProp + ' ') + ucProp).split(' '),
				i, property;

			for (i in props ) {
				property = props[i];
				if (!this._contains(property, "-") && style[property] !== undefined) {
					return property;
				}
			}

			return false;

		};


		return {


			/*
			* Transforms the given element.
			* @param el [dom]			-	Dom element to transform.
			* @param transforms [a/o]	-	Array or Object of transformation objects.
			*/
			transform : function (el, transforms) {

				if (typeof el === 'undefined') {
					el = this.el;
				}

				this.el = el;

				var transform,
					transformation = '';

				if (transforms instanceof Array) {
					// [{ property : 'property', value : 'value' }, { property : 'property', value : 'value' }]
					for (var i = 0; i < transforms.length; i++) {
						transformation += transforms[i].property + '(' + transforms[i].value + ') ';
					}
				} else {
					// { 'property' : 'value', 'property' : 'value' }
					for (transform in transforms) {
						transformation += transform + '(' + transforms[transform] + ') ';
					}
				}

				el.style[self._prefixed('transform', el.style)] = transformation;

			},

			/*
			* Transforms the origin of the given element. ~!Untested
			* @param el [dom]		-	Dom element to originTransform.
			* @param originX [int]	-	X origin int or %.
			* @param originY [int]	-	Y origin int or %.
			*/
			transformOrigin : function (el, originX, originY) {

				if (typeof el === 'undefined') {
					el = this.el;
				}

				this.el = el;

				el.style[self._prefixed('transformOrigin', el.style)] = originX + ' ' + originY;

			}


		};
	};

	// Attach to the global fil object.
	fil.Transformer = Transformer;

	// Look for AMD
	if (typeof this.define === "function" && this.define.amd) {

		this.define("Transformer", [], function () {
			return fil.Transformer;
		});

	}

}.call(this, (function () {
		this.fil = this.fil || {};
		return this.fil;
	}.call(this))
));
