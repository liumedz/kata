module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        less: {
            development: {
                options: {
                    paths: ["assets"]
                },
                files: {
                    "assets/css/index.css": "assets/less/*.less"
                }
            }
        },

        watch: {
            css: {
                files: 'assets/less/*.less',
                tasks: ['less'],
                options: {
                    livereload: true
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['less']);

};