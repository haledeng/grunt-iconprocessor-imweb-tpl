/*
 * grunt-iconprocessor-imweb-tpl
 * 
 *
 * Copyright (c) 2015 moxhe
 * Licensed under the MIT license.
 */

'use strict';
var os = require('os');
// var fs = require('fs');
// var path = require('path');
var async = require('async');
var svgParser = require('./lib/svg_parser.js');
var concurrencyCount = (os.cpus().length || 1) * 4;
var win32 = process.platform === 'win32';

module.exports = function(grunt) {

  // Can be followed by: letters (A-Za-z), digits (0-9), hyphens ("-"), and underscores ("_")
  // 由于js不支持负向零宽断言，只能在下面对匹配的数组项作处理, 开头用\b会匹配到类似c-i-teacher的情况
  var iconReg = /[\s\"]i-[A-Za-z0-9\-\_]+/g;
  var lineBreak = win32 ? '\r\n' : '\n';

  // put utils function here
  function isExist(filepath) {
      if (!grunt.file.exists(filepath)) {
        grunt.log.warn('Source file "' + filepath + '" not found.');
        return false;
      } else {
        return true;
      }
  }

  function uniq(arr) {
    var ret = [arr[0]];
    for (var i = 1, len = arr.length; i < len; i++) {
      var flag = false;
      for (var j = 0, _len = ret.length; j < _len; j++) {
        if (arr[i] === ret[j]) {
          flag = true;
          break;
        }
      }
      if (flag) continue;
      ret.push(arr[i]);
    }
    return ret;
  }

  function isSame(arrx, arry) {
    return arrx.sort().toString() === arry.sort().toString();
  }

  function extractIcons(filepath) {
    var content = grunt.file.read(filepath);
    var icons = content.match(iconReg);
    if (!icons) {
      icons = [];
    } else {
      icons = icons.map(function(icon) {
        return icon.replace(/[\s\"]i-/, '');
      });
    }
    // if (icons.length) {
    //   console.log('From ' + filepath + ' find icons:\n\t' + uniq(icons).join(','));
    // }
    return icons;
  }

  grunt.registerMultiTask('iconprocessor_imweb_tpl', 'extract all icon names from imweb-tpl files', function() {
    // tell grunt that this task is async.
    // var cb = this.async();
    // Merge task-specific and/or target-specific options with these defaults.
    // svgDir, outputDir
    var options = this.options();
    var svgDir = options.svgDir,
        outputDir = options.outputDir;

    if (!outputDir) {
      outputDir = 'iconfont_output/';
    }
    if (!svgDir) {
      grunt.log.error('You don\'t have svg dir config.');
      return false;
    } else if (!grunt.file.isDir(svgDir)) {
      grunt.log.error('Invalid svg dir.');
      return false;
    }
    outputDir = outputDir[outputDir.length - 1] === '/' ? outputDir : outputDir + '/';
    svgDir = svgDir[svgDir.length - 1] === '/' ? svgDir : svgDir + '/';

    async.eachLimit(this.files, concurrencyCount, function(file, next) {

      var allicons = [];

      var src = file.src.filter(isExist).map(extractIcons).forEach(function(item, index) {
        allicons = allicons.concat(item);
      });
      // confirm single
      var tmp = [];
      uniq(allicons).map(function(iconname) {
        if (isExist(svgDir + iconname + '.svg')) tmp.push(iconname);
        return iconname;
      });
      allicons = tmp;

      if (grunt.file.exists(outputDir + 'icons')) {
        var oldiconsContent = grunt.file.read(outputDir + 'icons');
        var oldicons = oldiconsContent.split(lineBreak).map(function(iconname) {
          return iconname.trim();
        });
        if (isSame(allicons, uniq(oldicons))) return true;
      }

      svgParser.parse(svgDir, outputDir, allicons);
      grunt.file.write(outputDir + '/icons', allicons.join(lineBreak));
      console.log(outputDir + ' iconfont generation finished.');
      console.log(outputDir + 'icons file write finished.');

    }, null);

  });
};
