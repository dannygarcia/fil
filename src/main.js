require(["src/Canvas", "src/Input", "src/Pen", "src/Frame", "src/Transformer"], function (canvas, input, pen, frame, transformer) {
	var canvasNode = document.getElementById('canvas');

	transformer.transform(canvasNode, {
		translateX: '30px'
	});

	canvas.init({
		container : canvasNode
	});

	var ctx = canvas.context();

	ctx.fillStyle = 'rgba(234, 46, 73, 1)';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = ctx.strokeStyle = 'rgba(218,237,226,0.5)';

	pen.context(ctx);

	input.init();

	frame.start();

	var prev = {},
		curr = {};

	input.ontapstart = function (average) {
		pen.circle(average, 10);
	};

	input.ontapmove = function (average) {
		curr = average;
	};

	input.ontapend = function (average) {
		pen.circle(average, 10);
	};

	frame.step = function (f) {
		pen.circle(curr, 5);
		pen.line(prev, curr);
		prev = curr;
	};
});
