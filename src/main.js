require(["src/Canvas", "src/Input", "src/Pen", "src/Frame", "src/Transformer"], function (canvas, input, pen, frame, tr) {

	// Custom ajax function to avoid using jQuery (°-°)
	var ajax = function (url, callback) {
		url = "http://jsonp.jit.su/?url=" + url;
		var xhr = new XMLHttpRequest();
		xhr.open('GET', url, true);
		xhr.send();
		xhr.onreadystatechange = function (e) {
			if (e.target.status === 200 && e.target.readyState === 4) {
				callback(JSON.parse(e.target.response));
			}
		};
	};

	var buildGithubTree = function (repo) {

		var self = this,
			distance = 70,
			rad = 20;

		this.level = 0;
		this.struct = [];
		this.c = {};
		this.el = document.getElementById('tooltip');

		this.distance = function (f, t) {
			var dx = f.x - t.x,
				dy = f.y - t.y;
			return Math.sqrt( dx * dx + dy * dy );
		};

		this.update = function (c) {
			this.c = c;
			this.changePosition(this.struct, true);
			this.drawTree(this.struct);

		};

		this.setItemPosition = function (item, pos) {
			var self = this;

			item.pos = {
				x : pos.x,
				y : pos.y,
				_x : (5) * (Math.random() < 0.5 ? -1 : 1),
				_y : (5) * (Math.random() < 0.5 ? -1 : 1),
				level : self.level
			};
			return item;
		};

		this.changePosition = function (items, first) {

			var item,
				parent,
				i;

			if (first) {
				self.level = 0;
			}

			for (i = 0; i < items.length; i++) {

				item = items[i].item;
				parent = items[i].parent.item;

				if (!item.pos) {
					self.setItemPosition(item, parent.pos);
				}

				if (this.distance(item.pos, parent.pos) <= 50) {
					item.pos.x += item.pos._x + parent.pos._x;
					item.pos.y += item.pos._y + parent.pos._y;
				}

				if (items[i].children) {
					self.level += 1;
					self.changePosition(items[i].children);
				}
			}

			// this.drawTree(items);

			item = null;
			parent = null;
			i = null;
		};

		this.showToolTip = function (c, item) {

			c.x = Math.ceil(c.x);
			c.y = Math.ceil(c.y);

			pen.circle(c, 12);

			this.el.textContent = item.name;
			this.el.textContent +=  (item.type === "dir") ? '/' : '';
			this.el.style.backgroundColor = 'rgb(' + (255 / item.pos.level) + ',0,0)';

			tr.transform(this.el, {
				translateX : c.x + 'px',
				translateY : c.y + 'px'
			});

		};

		this.drawTree = function (items) {
			for (var i = 0; i < items.length; i++) {

				var node = items[i];

				if (node.item.pos) {

					if (typeof this.c.x !== 'undefined' && typeof this.c.y !== 'undefined') {

						if ((this.c.x > node.item.pos.x - rad && this.c.x < node.item.pos.x + rad) && (this.c.y > node.item.pos.y - rad && this.c.y < node.item.pos.y + rad)) {
							this.showToolTip(node.item.pos, node.item);
						}

					}

					pen.stroke('rgb(' + Math.ceil((node.item.pos.level / self.level) * 255) + ',0,0)');
					pen.fill('rgb(' + Math.ceil((node.item.pos.level / self.level) * 255) + ',0,0)');
					pen.line(node.item.pos, node.parent.item.pos);
					pen.circle(node.item.pos, node.item.type === 'dir' ? 10 : 5);
				}

				if (node.children) {
					self.drawTree(node.children);
				}

				item = null;

			}
		};

		this.addBranch = function (array, item) {
			ajax(item._links.self + '?cacheBust=' + (new Date()).getTime(), function (data) {
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

			}

		};

		if (typeof repo === 'undefined') {
			repo = 'dannyx0/fil';
		}

		ajax('https://api.github.com/repos/' + repo + '/contents/?cacheBust=' + (new Date()).getTime(), function (data) {
			self.processTree(self.struct, data, {
				item : {
					pos : {
						x : canvas.width / 2,
						y : canvas.height / 2,
						_x : 0,
						_y : 0,
						level : 0
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

		var canvasEl = document.getElementById('canvas'),
			form = document.getElementById('form'),
			tree,
			hash = false;

		form.addEventListener('submit', function (e) {
			e.preventDefault();

			var user = document.getElementById('user').value,
				repo = document.getElementById('repo').value,
				dir = user + '/' + repo;

			tree = new buildGithubTree(dir);

			// set url
			window.location.hash = dir;

		}, false);

		// Start tracking mouse input on the whole doc.
		input.init({
			ratio : false
		});

		// Initialize the canvas.
		canvas.init({
			container : canvasEl,
			ratio : false
		});

		// Prep the context.
		var ctx = canvas.context();
		ctx.lineStroke = '#000';
		pen.context(ctx);

		var prev = {},
			curr = {};

		// input.ontapstart = function (average) {
		//	pen.circle(average, 10);
		// };

		input.ontapmove = function (average) {
			curr = average;
		};

		// input.ontapend = function (average) {
		//	pen.circle(average, 10);
		// };

		if (window.location.hash) {
			hash = window.location.hash.replace('#', '');
			tree = new buildGithubTree(hash);
			document.getElementById('user').value = hash.split('/')[0];
			document.getElementById('repo').value = hash.split('/')[1];
		} else {
			tree = new buildGithubTree();
		}


		frame.start();
		frame.step = function (f) {

			canvas.clear();

			tree.update(curr);

			// prev = curr;

			if (f > 120) {
				// frame.stop();
			}

		};

	};

	init();

});
