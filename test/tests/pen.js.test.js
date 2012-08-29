/*
* Pen.js Tests
*/

var tests = tests || [];
var pen = new fil.Pen();
var pen_tests = [
	{
		'Load Pen.js' : function (test) {
			test.ok(typeof pen === 'object', "Pen.js should load an object.");
			test.done();
		},
		'Get / Set Context' : function (test) {
			var newCtx = pen.context(cvs.context());
			test.deepEqual(newCtx, pen.context(), "Gotten and Set contexts are equal.");
			test.done();
		},
		'Fill' : function (test) {
			var chosenColor = '#00ff00';
			pen.fill(chosenColor);
			test.deepEqual(chosenColor, pen.ctx.fillStyle, 'Change fill color style.');
			test.done();
		},
		'Stroke' : function (test) {
			var chosenColor = '#00ff00',
				chosenWidth = 5;
			pen.stroke(chosenColor, chosenWidth);
			test.deepEqual(chosenColor, pen.ctx.strokeStyle, 'Change stroke color style.');
			test.deepEqual(chosenWidth, pen.ctx.lineWidth, 'Change stroke width style.');
			test.done();
		},
		'Draw Line' : function (test) {
			test.doesNotThrow(function () {
				pen.line({ x : 0, y : 0}, { x : 10, y : 10});
			}, undefined, "Draw line.");
			test.done();
		},
		'Draw Circle' : function (test) {
			test.doesNotThrow(function () {
				pen.circle({ x : 0, y : 0}, 5);
			}, undefined, "Draw circle.");
			test.done();
		}
	}
];

// Combine with existing list.
tests = tests.concat(pen_tests);