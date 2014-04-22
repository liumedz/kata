module.exports = function(){

    var fs = require('fs');
    var path = require('path');

    var STYLES_START = '// styles start';
    var STYLES_END = '// styles end';

    var SCRIPTS_START = '// scripts start';
    var SCRIPTS_END = '// scripts end';

    var getFiles = function(dir , filter, dirName, fileArray){
        if(fileArray === undefined) fileArray = [];
        var files = fs.readdirSync(dir);
        for(var i in files){
            if (!files.hasOwnProperty(i)) continue;
            var name = path.join(dir, files[i]);
            if (fs.statSync(name).isDirectory()){
                getFiles(name, filter, path.basename(name), fileArray);
            }else{
                if(name.indexOf(filter) > 0){
                    fileArray.push({filePath: name, dirName: dirName});
                }
            }
        }
        return fileArray;
    }

    var get = function(dir, tagStart, tagEnd){

        var currentFiles = [];
        var files = getFiles(dir, '.jade');
        files.forEach(function(file){
            var data = fs.readFileSync(file.filePath, 'utf8');
            var start = data.indexOf(tagStart);
            var end = data.indexOf(tagEnd);

            if(start > 0){
                var scripts = data.substring(start + tagStart.length, end);
                var scriptLines = scripts.split('\n');

                var dirName = file.dirName;
                var filePaths = [];

                scriptLines.forEach(function(line){
                    line = line.replace("rel='stylesheet',", "");
                    var filePath = line.match(/'(.*?)'/);
                    if(filePath && filePath.length > 1){
                        filePaths.push(filePath[1])
                    }
                });
                if(filePaths.length > 0){
                    currentFiles.push({dirName: dirName, filePaths: filePaths});
                }
            }
        });
        return currentFiles;
    }

    var prepareScriptsViews = function(dir, fileName){

        var tagStart = SCRIPTS_START;
        var tagEnd = SCRIPTS_END;
        var currentFiles = [];
        var files = getFiles(dir, '.jade');
        files.forEach(function(file){
            var data = fs.readFileSync(file.filePath, 'utf8');
            var start = data.indexOf(tagStart);
            var end = data.indexOf(tagEnd);

            if(start > 0){
                var scripts = data.substring(start + tagStart.length, end);
                var filePath = '/' + file.dirName + '/' + fileName;
                data = data.replace(scripts, "\n    script(src='" + filePath  + "') \n");
                fs.writeFileSync(file.filePath, data);
            }
        });
        return currentFiles;
    }

    var prepareStylesViews = function(dir, fileName){

        var tagStart = STYLES_START;
        var tagEnd = STYLES_END;
        var currentFiles = [];
        var files = getFiles(dir, '.jade');
        files.forEach(function(file){
            var data = fs.readFileSync(file.filePath, 'utf8');
            var start = data.indexOf(tagStart);
            var end = data.indexOf(tagEnd);

            if(start > 0){
                var scripts = data.substring(start + tagStart.length, end);
                var filePath = '/' + file.dirName + '/' + fileName;
                data = data.replace(scripts, "\n    link(rel='stylesheet', href='" + filePath  + "') \n");
                fs.writeFileSync(file.filePath, data);
            }
        });
        return currentFiles;
    }

    var getStyles = function(dir){
        var files = get(dir, STYLES_START, STYLES_END);
        return files;
    }

    var getScripts = function(dir){
        var files = get(dir, SCRIPTS_START, SCRIPTS_END);
        return files;
    }

    var getConcatTask = function(jadeTemplatesDir, sourceDir, targetDir){

        var concatTask = {concat: {}}

        var files = getScripts(jadeTemplatesDir);
        files.forEach(function(item){
            concatTask.concat[item.dirName + 'Js'] = {
                src: item.filePaths.map(function(filePath){
                    return path.join(sourceDir, filePath);
                }),
                dest: path.join(targetDir, item.dirName, 'production.js')
            }
        });

        var files = getStyles(jadeTemplatesDir);
        files.forEach(function(item){
            concatTask.concat[item.dirName + 'Css'] = {
                src: item.filePaths.map(function(filePath){
                    return path.join(sourceDir, filePath);
                }),
                dest: path.join(targetDir, item.dirName, 'production.css')
            }
        });

        return concatTask;
    }

    var getCsMinTask = function(jadeTemplatesDir, targetDir){

        var csMinTask = {cssmin: {}}

        var files = getStyles(jadeTemplatesDir);
        files.forEach(function(item){
            csMinTask.cssmin[item.dirName + 'Css'] = {
                src: path.join(targetDir, item.dirName, 'production.css'),
                dest: path.join(targetDir, item.dirName, 'production.min.css')
            }
        });

        return csMinTask;
    }

    var getUglifyTask = function(jadeTemplatesDir, targetDir){

        var uglifyTask = {uglify: {}}

        var files = getScripts(jadeTemplatesDir);
        files.forEach(function(item){
            uglifyTask.uglify[item.dirName + 'Js'] = {
                src: path.join(targetDir, item.dirName,'production.js'),
                dest: path.join(targetDir, item.dirName, 'production.min.js')
            }
        });

        return uglifyTask;
    }


    return{
        getStyles: getStyles,
        getScripts: getScripts,
        getConcatTask: getConcatTask,
        getCsMinTask: getCsMinTask,
        getUglifyTask: getUglifyTask,
        prepareScriptsViews: prepareScriptsViews,
        prepareStylesViews: prepareStylesViews
    }
}

 //Tests
/*

var fs = require('fs');
var path = require('path');
var a = module.exports();
var jadeTemplatesDir = path.join(__dirname, 'views');
var sourceDir = 'client';
var targetDir = 'bin/production';
var targetViews = 'bin/views';
//var files = a.getStyles(jadeTemplatesDir);
//var files = a.getScripts(jadeTemplatesDir);
var tasks = a.getConcatTask(jadeTemplatesDir, sourceDir, targetDir);
var cstasks = a.getCsMinTask(jadeTemplatesDir, targetDir);
var jstasks = a.getUglifyTask(jadeTemplatesDir, targetDir);
 a.prepareScriptsViews(targetViews, "production.min.js");
 a.prepareStylesViews(targetViews, "production.min.css");

*/
