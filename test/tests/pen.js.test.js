/*
* Pen.js Tests
*/

var pen = new fil.Pen();
exports.Pen = {
	'Load Pen.js' : function (test) {
		test.ok(typeof pen === 'object', "Pen.js should load an object.");
		test.done();
	},
	'Get / Set Context' : function (test) {
		var cvs = new fil.Canvas().init();
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
		}, undefined, "Draw line from object.");
		test.doesNotThrow(function () {
			pen.line([0, 0], [10, 10], 'array');
		}, undefined, "Draw line from array.");
		test.done();
	},
	'Draw Circle' : function (test) {
		test.doesNotThrow(function () {
			pen.circle({ x : 0, y : 0}, 5);
		}, undefined, "Draw circle from object.");
		test.doesNotThrow(function () {
			pen.circle([0, 0], 5, 'array');
		}, undefined, "Draw circle from array.");
		test.done();
	}
};
