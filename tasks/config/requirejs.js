module.exports = function(grunt) {
  grunt.config.set('requirejs', {
    dev: {
        options: {
            baseUrl: "assets/",
            name: 'main',
            optimize: "uglify2",//'none',//"uglify2",
            //wrap: true,
            paths: {
                // Major libraries
                    jquery: '../js/dependencies/jquery/jquery.min.js',
                    angular: '../js/dependencies/angular/angular.min.js',
                    angularroute: '../js/dependencies/angular-route/angular-route.min.js',
                    sailsio: '../js/dependencies/sails.io.js',
                    controllers: '../js/controllers.js',
                    services: '../js/services.js',
                    // Require.js plugins

                },
                removeCombined: true,
                inlineText: true,
                useStrict: true,
                out: "build/main.js",
                waitSeconds: 200
            },
        }
    });

  grunt.loadNpmTasks('grunt-contrib-requirejs');
};