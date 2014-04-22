module.exports = function(grunt) {

    var fs = require('fs');
    var path = require('path');

    var readFiles = require('./grunt-custom')();

    var jadeTemplatesDir = path.join(__dirname, 'views');
    var binDir = "bin";
    var sourceDir = 'client';
    var targetDir = 'bin/production';
    var targetViews = 'bin/views';

    var concatTask = readFiles.getConcatTask(jadeTemplatesDir, sourceDir, targetDir);
    var csMinTask = readFiles.getCsMinTask(jadeTemplatesDir, targetDir);
    var uglifyTask = readFiles.getUglifyTask(jadeTemplatesDir, targetDir);

    require('load-grunt-tasks')(grunt);

    grunt.task.registerTask("prepareStylesViews", "prepareStylesViews", function(arg1, arg2){
        readFiles.prepareStylesViews(targetViews, "production.min.css");
    });

    grunt.task.registerTask("prepareScriptsViews", "prepareScriptsViews",function(arg1, arg2){
        readFiles.prepareScriptsViews(targetViews, "production.min.js");
    });


    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        clean: {
            dev: [targetDir, targetViews]
        },

        copy: {
            main: {
                files: [
                    {expand: true, src: ['views/**'], dest: binDir},
                    {expand: true
                        ,cwd: 'client/vendor/bootstrap'
                        ,src: 'fonts/**'
                        ,dest: targetDir},
                    {expand: true
                        ,cwd: 'client'
                        ,src: 'images/**'
                        ,dest: targetDir}
                ]
            }
        },

        concat: concatTask.concat,

        cssmin: csMinTask.cssmin,

        uglify: uglifyTask.uglify

    });

    grunt.registerTask('default', [
        'clean'
        ,'concat'
        ,'cssmin'
        ,'uglify'
        ,'copy'
        ,'prepareStylesViews'
        ,'prepareScriptsViews'
    ]);
};