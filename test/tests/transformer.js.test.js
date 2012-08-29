/*
* Transformer.js Tests
*/

var tests = tests || [];
var tr = new fil.Transformer();
var transformer_tests = [
	{
		'Load Transformer.js' : function (test) {
			test.ok(typeof tr === 'object', "Transformer.js should load an object.");
			test.done();
		},
		'Transform Element' : function (test) {
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

			test.ok(evaluates, "Transform container by a few pixels.");
			test.done();
		}
	}
];

// Combine with existing list.
tests = tests.concat(transformer_tests);