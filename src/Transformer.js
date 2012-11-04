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
