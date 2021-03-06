/*
* Frame.js Tests
*/

frame = new fil.Frame();
exports.Frame = {
	'Load Frame.js' : function (test) {
		test.ok(typeof this.frame === 'object', "Frame.js should load an object.");
		test.done();
	},
	'Start & Stop' : function (test) {

		// Start...
		test.doesNotThrow(function () {
			frame.start();
		}, undefined, "Starting...");

		// Increase...
		test.ok(frame.frame > 0, "Frame count should increase.");

		// Stopped.
		test.doesNotThrow(function () {
			var stopAt = frame.frame;
			frame.stop();
			if (frame.frame !== stopAt) {
				throw "Frame count should stop, not continue";
			}
		}, undefined, "Stopped.");
		test.done();

	}
};
