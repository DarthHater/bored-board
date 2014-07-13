/**
 * Bower install and copy
 *
 * ---------------------------------------------------------------
 *
 * This grunt task is configured to do a bower install and copy
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-clean
 */

module.exports = function(grunt) {

	grunt.config.set('bower', {

      install: {
        options: {
          install: true,
          copy: true,
          targetDir: './assets/',
          cleanTargetDir: false
        }
      }

	});

	grunt.loadNpmTasks('grunt-bower-task');
};
