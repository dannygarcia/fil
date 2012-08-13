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

	var buildGithubTree = function () {

		var self = this;

		this.struct = [];

		this.drawNode = function (item, parent) {
			if (parent) {
				item.pos = {
					x : parent.item.pos.x + Math.random() * 100,
					y : parent.item.pos.y + Math.random() * 100
				};
			} else {
				item.pos = {
					x : Math.floor(Math.random() * (canvas.width - 0 + 1)) + 0,
					y : Math.floor(Math.random() * (canvas.height - 0 + 1)) + 0
				};
			}
			pen.circle(item.pos, item.type === 'dir' ? 10 : 5);

		};

		this.addBranch = function (array, item) {
			ajax(item._links.self, function (data) {
				self.processTree(array.children, data, array);
			});
		};

		this.processTree = function (array, items, parent) {

			var item, i;

			for (i = 0; i < items.length; i++) {

				item = items[i];

				array[i] = { item : item };

				if (item.type === 'dir') {
					array[i].children = [];
					self.addBranch(array[i], array[i].item);
				}

				array[i].parent = parent ? parent : false;

				this.drawNode(array[i].item, parent);

				if (array[i].parent) {
					pen.line(array[i].item.pos, array[i].parent.item.pos);
				}

			}

		};

		ajax('https://api.github.com/repos/dannyx0/danny-garcia/contents/', function (data) {
			self.processTree(self.struct, data, {
				item : {
					pos : {
						x : canvas.width / 2,
						y : canvas.height / 2
					}
				}
			});
		});

	};

	var node = function (pos, item) {

		this.pos = pos;

		this.draw = function (ctx) {

			pen.circle(this.pos, item.type === 'folder' ? 10 : 5);

		};

	};

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
		ctx.lineStroke = '#000';
		pen.context(ctx);

		var prev = {},
			curr = {};

		// input.ontapstart = function (average) {
		// 	pen.circle(average, 10);
		// };

		// input.ontapmove = function (average) {
		// 	curr = average;
		// };

		// input.ontapend = function (average) {
		// 	pen.circle(average, 10);
		// };

		var nodes = [],
			tree = new buildGithubTree();

		// frame.start();
		frame.step = function (f) {

			for (var i = 0; i < nodes.length; i++) {
				nodes[i].prev = nodes[i - 1];
				nodes[i].draw();
			}

			prev = curr;

			if (f > 60) {
				frame.stop();
			}

		};

	};

	init();

});
