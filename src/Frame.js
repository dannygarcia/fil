/*
 * Frame.js – Part of FIL (The Front-end Interactive Libraries)
 * Copyright (c) 2012, Danny Garcia. All rights reserved.
 * Code licensed under the MIT License
 * https://github.com/dannyx0/fil/
 */

define(function () {


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

					window.requestAnimationFrame = (function(){
						return  window.requestAnimationFrame       ||
								window.webkitRequestAnimationFrame ||
								window.mozRequestAnimationFrame    ||
								window.oRequestAnimationFrame      ||
								window.msRequestAnimationFrame     ||
								function( callback ){
									window.setTimeout(callback, 1000 / 60);
								};
					})();

				}

				if (typeof window.cancelAnimationFrame === 'undefined') {

					window.cancelAnimationFrame = (function(){
						return  window.cancelAnimationFrame       ||
								window.webkitCancelAnimationFrame ||
								window.mozCancelAnimationFrame    ||
								window.oCancelAnimationFrame      ||
								window.msCancelAnimationFrame;
					})();

				}

				animationLoop();
				this.active = true;

			}

		},


		stop : function () {

			if (this.active) {
				window.cancelAnimationFrame(this.request);
			}

		},


		// Essentially resets everything
		// to the state before this.init().
		destroy : function () {

		}


	};
});