/*
* Input.js Tests
*/

var tests = tests || [];
var input = new fil.Input();
var input_tests = [
	{
		'Load Input.js' : function (test) {
			test.ok(typeof input === 'object', "Input.js should load an object.");
			test.done();
		},
		'Initialize With Options' : function (test) {

			var init = input.init({
				element : document.body,
				preventDefault : true,
				ratio : true
			});

			// Primary initialization passed.
			test.ok(init, "Input.js should initialize with options.");

			// Check type.
			test.ok(typeof init === 'object', ".init() should return an object.");

			test.done();

		},
		'Get / Set Options' : function (test) {

			var newOptions = input.options({
				element : document.body,
				preventDefault : false,
				ratio : false
			});

			var setOptions = input.options();

			for (var option in newOptions) {
				test.equal(newOptions.option, setOptions.option, option);
			}

			test.done();

		},
		'Initialize Without Options' : function (test) {

			input.destroy();
			var init = input.init();

			// Primary initialization passed.
			test.ok(init, "Input.js should initialize without options.");

			// Check type.
			test.ok(typeof init === 'object', ".init() should return an object.");

			test.done();

		},
		'Set Coordinates' : function (test) {
			var mouseE = { pageX : 10, pageY : 10 },
				touchE = { touches : [ {pageX : 10, pageY : 10}, {pageX : 20, pageY : 20} ] };

			// Test touch input.
			input.destroy();
			input.init({ forceTouch : true });
			input.setCoordinates(touchE);
			test.deepEqual(touchE.touches[0].pageX, input.inputs[0].x, "First Touch X should match first input X");
			test.deepEqual(touchE.touches[0].pageY, input.inputs[0].y, "First Touch Y should match first input Y");
			test.deepEqual(touchE.touches[1].pageX, input.inputs[1].x, "Second Touch X should match second input X");
			test.deepEqual(touchE.touches[1].pageY, input.inputs[1].y, "Second Touch Y should match second input Y");

			// Test mouse input.
			input.destroy();
			input.init({ forceTouch : false });
			input.setCoordinates(mouseE);
			test.deepEqual(mouseE.pageX, input.inputs[0].x, "Mouse X should match first input X");
			test.deepEqual(mouseE.pageY, input.inputs[0].y, "Mouse Y should match first input Y");

			test.done();
		},
		'Bind and Unbind Inputs' : function (test) {
			test.doesNotThrow(function () {
				input.unbindAllInputs();
			}, undefined, "Should unbind all inputs.");
			test.doesNotThrow(function () {
				input.bindAllInputs();
			}, undefined, "Should re-bind all inputs.");
			test.done();
		},
		'Tap Start' : function (test) {
			var e = { pageX : 10, pageY : 10 };

			input.ontapstart = function (a, i) {
				test.deepEqual(i[0].x, e.pageX, "Tap start on X");
				test.deepEqual(i[0].y, e.pageY, "Tap start on Y");
			};

			input.tapStart(e);

			test.done();
		},
		'Tap Move' : function (test) {
			var e = { pageX : 10, pageY : 10 };

			input.ontapmove = function (a, i) {
				test.deepEqual(i[0].x, e.pageX, "Tap move on X");
				test.deepEqual(i[0].y, e.pageY, "Tap move on Y");
			};

			input.tapMove(e);

			test.done();
		},
		'Tap End' : function (test) {
			var e = { pageX : 10, pageY : 10 };

			input.ontapend = function (a, i) {
				test.deepEqual(i[0].x, e.pageX, "Tap end on X");
				test.deepEqual(i[0].y, e.pageY, "Tap end on Y");
			};

			input.tapEnd(e);

			test.done();
		},
		'Destroy Input.js' : function (test) {
			test.doesNotThrow(function () {
				input.destroy();
			}, undefined, "Should unbind all inputs.");
			test.done();
		}
	}
];

// Combine with existing list.
tests = tests.concat(input_tests);