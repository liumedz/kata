module.exports = function(grunt) {

    var adminAppCss = [
        './client/development/admin/css/style.css'
    ]

    var adminAppJs = [
        './client/development/admin/app.js'
    ]

    require('load-grunt-tasks')(grunt);

    var tmpFilePath = '.tmp/';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),


        clean: {
            dev: [tmpFilePath]
        },

        copy: {
            main: {
                files: [
                    {expand: true, src: ['client/development/**'], dest: tmpFilePath}
                ]
            }
        },

        concat: {

            adminAppCss: {
                src: adminAppCss,
                dest: tmpFilePath + 'client/development/admin/production.css'
            },

            adminAppJs: {
                src: adminAppJs,
                dest: tmpFilePath + 'client/development/admin/production.js'
            }
        },

        cssmin: {
            adminAppCss: {
                src: [tmpFilePath + 'client/development/admin/production.css'],
                dest: './client/production/admin/production.css'
            }
        },

        uglify: {
            adminAppJs: {
                src: [tmpFilePath + 'client/development/admin/production.js'],
                dest: './client/production/admin/production.js'
            }
        }

    });

    grunt.registerTask('default', [
        'copy'
        ,'concat'
        ,'cssmin'
        ,'uglify'
        ,'clean'
    ]);
};