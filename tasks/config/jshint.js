
module.exports = function(grunt) {
	grunt.config.set('jshint', {
		all: ['Gruntfile.js', 'assets/js/*.js', 'test/**/*.js', 'api/**/*.js']
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
};