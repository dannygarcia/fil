/*
 * Transformer.js – Part of FIL (The Front-end Interactive Libraries)
 * Copyright (c) 2012, Danny Garcia. All rights reserved.
 * Code licensed under the MIT License
 * https://github.com/dannyx0/fil/
 */

define(function () {

	this._contains = function contains( str, substr ) {
		return !!~('' + str).indexOf(substr);
	};

	this._prefixed = function (prop, style) {

		var prefixes = 'Webkit Moz O ms'.split(' '),
			ucProp  = prop.charAt(0).toUpperCase() + prop.slice(1),
			props = (prop + ' ' + prefixes.join(ucProp + ' ') + ucProp).split(' '),
			i, property;

		for (i in props ) {
			property = props[i];
			if ( !this._contains(property, "-") && style[property] !== undefined ) {
				return property;
			}
		}

		return false;

	};

	return {

		test : function (el) {
			console.log(_prefixed('transform', el.style));
		},

		/*
		* Transforms the given element.
		* @param el [dom]			-	Dom element to transform.
		* @param transforms [array]	-	Array of transformation objects:
		*		{ 'rotateX' : '3deg' }
		*/
		transform : function (el, transforms) {

			if (typeof el === 'undefined') {
				el = this.el;
			}

			this.el = el;

			var transform,
				transformation = '';

			// { 'property' : 'value', 'property' : 'value' }
			for (transform in transforms) {
				transformation += transform + '(' + transforms[transform] +') ';
			}

			el.style[_prefixed('transform', el.style)] = transformation;

		},

		/*
		* Transforms the origin of the given element.
		* @param el [dom]		-	Dom element to originTransform.
		* @param origin [obj]	-	X / Y origin object.
		*/
		transformOrigin : function (el, originX, originY) {

			if (typeof el === 'undefined') {
				el = this.el;
			}

			this.el = el;

			el.style[_prefixed('transformOrigin', el.style)] = originX + ' ' + originY;

		}


	};
});