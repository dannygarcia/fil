/*
* Transformer.js Tests
*/

var tr = new fil.Transformer();
exports.Transformer =  {
	'Load Transformer.js' : function (test) {
		test.ok(typeof tr === 'object', "Transformer.js should load an object.");
		test.done();
	},
	'Transform Element with Object' : function (test) {
		var evaluates = false,
			el = document.getElementById('target'),
			originalOffset = el.offsetLeft;

		tr.transform(el, {
			translateX : '10px',
			translateY : '10px'
		});

		if (el.style.cssText.indexOf("transform: translateX(10px) translateY(10px)") !== -1) {
			evaluates = true;
		}

		// Reset styles.
		tr.transform(el);

		test.ok(evaluates, "Transform container by a few pixels with Object.");
		test.done();
	},
	'Transform Element with Array' : function (test) {
		var evaluates = false,
			el = document.getElementById('target'),
			originalOffset = el.offsetLeft;

		tr.transform(el, {
			translateX : '10px',
			translateY : '10px'
		});
		tr.transform(el, [
			{ property : 'translateX', value : '10px' },
			{ property : 'translateY', value : '10px' }
		]);

		if (el.style.cssText.indexOf("transform: translateX(10px) translateY(10px)") !== -1) {
			evaluates = true;
		}

		// Reset styles.
		tr.transform(el);

		test.ok(evaluates, "Transform container by a few pixels with Array.");
		test.done();
	}
};
