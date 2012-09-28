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
