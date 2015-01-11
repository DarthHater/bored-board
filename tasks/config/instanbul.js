module.exports = function (grunt) {
  grunt.config.set('mocha_istanbul', {
    coverage: {
      src: 'tests/**/*.spec.js',
      options: {
        coverageFolder: 'coverage',
        mask: '**/*.spec.js',
        root: 'api/'
      }
    }
  });

  grunt.loadNpmTasks('grunt-mocha-istanbul');
};