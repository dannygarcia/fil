/*
* Frame.js Tests
*/

var tests = tests || [];
var frame = new fil.Frame();
var frame_tests = [
	{
		'Load Frame.js' : function (test) {
			test.ok(typeof frame === 'object', "Frame.js should load an object.");
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
	}
];

// Combine with existing list.
tests = tests.concat(frame_tests);