module.exports = function(grunt) {

	var hintOptions = require('config.js').options,
		files = [
			'src/*[!min].js',
			'fil.js'
		];

	// Project configuration.
	grunt.initConfig({
		lint : {
			all : files
		},
		concat : {
			dist : {
				src: files,
				dest: 'fil.js'
			}
		},
		jshint : {
			options : hintOptions
		},
		min : {
			dist : {
				src : files,
				dest : 'fil.min.js'
			}
		}
	});

	// Default Task
	grunt.registerTask('default', 'lint concat min');

};
