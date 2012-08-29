/*
* Canvas.js Tests
*/

var tests = tests || [];
var cvs = new fil.Canvas();
var canvas_tests = [
	{
		'Load Canvas.js' : function (test) {
			test.ok(typeof cvs === 'object', "Canvas.js should load an object.");
			test.done();
		},
		'Initialize With Options' : function (test) {

			var init = cvs.init({
				context : '2d',
				container : document.body,
				width : 'auto',
				height : 'auto',
				resize : false,
				ratio : false
			});

			// Primary initialization passed.
			test.ok(init, "Canvas.js should initialize with options.");

			// Check type.
			test.ok(typeof init === 'object', ".init() should return an object.");

			test.done();

		},
		'Get / Set Options' : function (test) {

			var newOptions = cvs.options({
				context : '3d',
				container : document.body,
				width : 300,
				height : 100,
				resize : true,
				ratio : true
			});

			var setOptions = cvs.options();

			for (var option in newOptions) {
				test.equal(newOptions.option, setOptions.option, option);
			}

			test.done();

		},
		'Initialize Without Options' : function (test) {

			cvs.destroy();
			var init = cvs.init();

			// Primary initialization passed.
			test.ok(init, "Canvas.js should initialize without options.");

			// Check type.
			test.ok(typeof init === 'object', ".init() should return an object.");

			test.done();

		},
		'Get / Set Context' : function (test) {

			var ctx = cvs.context('2d');
			test.equal(ctx, cvs.context(), "Canvas context should be equal.");
			test.done();

		},
		'Resize' : function (test) {
			test.doesNotThrow(function () {
				cvs.resize(undefined, 10, 10);
			}, undefined, "Should resize element.");
			test.done();
		},
		'Clear' : function (test) {
			test.doesNotThrow(function () {
				cvs.clear();
			}, undefined, "Should clear the canvas.");
			test.done();
		},
		'Destroy Canvas.js' : function (test) {
			test.doesNotThrow(function () {
				cvs.destroy();
			}, undefined, "Should destroy the canvas and reset defaults.");
			test.done();
		}
	}
];

// Combine with existing list.
tests = tests.concat(canvas_tests);