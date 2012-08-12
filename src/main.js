require(["src/Canvas", "src/Input", "src/Pen", "src/Frame", "src/Transformer"], function (canvas, input, pen, frame, tr) {

	// Custom ajax function to avoid using jQuery (°-°)
	var ajax = function (url, callback) {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', url, true);
		xhr.send();
		xhr.onreadystatechange = function (e) {
			if (e.target.status === 200 && e.target.readyState === 4) {
				callback(JSON.parse(e.target.response));
			}
		};
	};

	var processor  = function () {

		var self = this;

		this.struct = [];

		this.addBranch = function (array, item) {
			ajax(item._links.self, function (data) {
				self.processTree(array, data);
			});
		};

		this.processTree = function (array, items) {

			var item, i;

			for (i = 0; i < items.length; i++) {
				item = items[i];

				if (item.type === 'dir') {
					array[i] = {folder : []};
					this.addBranch(array[i].folder, item);
				} else {
					array[i] = {item : item};
				}

			}

		};

		ajax('https://api.github.com/repos/dannyx0/danny-garcia/contents/', function (data) {
			self.processTree(self.struct, data);
		});

		return this.struct;

	};

	var s = new processor();
	console.log(s);

	var init = function () {

		var canvasEl = document.getElementById('canvas');

		// Start tracking mouse input on the whole doc.
		input.init();

		// Initialize the canvas.
		canvas.init({
			container : canvasEl
		});

		// Prep the context.
		var ctx = canvas.context();
		pen.context(ctx);

		// Start requestAnimationFrame
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

	};

});
