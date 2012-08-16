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

		var self = this,
			distance = 70;

		this.struct = [];

		this.update = function () {

			this.changePosition(this.struct);
			this.drawTree(this.struct);

		};

		this.changePosition = function (items) {
			for (var i = 0; i < items.length; i++) {

				items[i].item.pos.x += items[i].item.pos._x;
				items[i].item.pos.y += items[i].item.pos._y;

				items[i].parent.item.pos.x += items[i].parent.item.pos._x;
				items[i].parent.item.pos.y += items[i].parent.item.pos._y;

				if (items[i].children) {
					self.changePosition(items[i].children);
				}
			}
		};

		this.drawTree = function (items) {
			for (var i = 0; i < items.length; i++) {

				var node = items[i];

				pen.line(node.item.pos, node.parent.item.pos);
				pen.circle(node.item.pos, node.item.type === 'dir' ? 10 : 5);

				if (node.children) {
					self.drawTree(node.children);
				}

				item = null;

			}
		};

		this.drawNode = function (item, parent) {

			item.pos = {
				x : parent.item.pos.x + (Math.random()  * distance),
				y : parent.item.pos.y + (Math.random()  * distance),
				_x : 1 * (Math.random() < 0.5 ? -1 : 1),
				_y : 1 * (Math.random() < 0.5 ? -1 : 1)
			};

			if (Math.random() < 0.5) {
				item.pos.x -= distance;
			}

			if (Math.random() < 0.5) {
				item.pos.y -= distance;
			}

			pen.stroke('#ff0000');
			// pen.line(item.pos, parent.item.pos);
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

			}

		};

		ajax('https://api.github.com/repos/dannyx0/danny-garcia/contents/', function (data) {
			self.processTree(self.struct, data, {
				item : {
					pos : {
						x : canvas.width / 2,
						y : canvas.height / 2,
						_x : 2 * (Math.random() < 0.5 ? -1 : 1),
						_y : 2 * (Math.random() < 0.5 ? -1 : 1)
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

		var tree = new buildGithubTree();

		frame.start();
		frame.step = function (f) {

			canvas.clear();

			tree.update();

			prev = curr;

			if (f > 60) {
				frame.stop();
			}

		};

	};

	init();

});
