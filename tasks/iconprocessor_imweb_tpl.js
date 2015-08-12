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
var path = require('path');
var async = require('async');
var _ = require('underscore');
var svgParser = require('./lib/svg_parser.js');
var concurrencyCount = (os.cpus().length || 1) * 4;
var win32 = process.platform === 'win32';

module.exports = function(grunt) {

  // Can be followed by: letters (A-Za-z), digits (0-9), hyphens ("-"), and underscores ("_")
  var iconReg = /\bi-[A-Za-z0-9\-\_]+/g;
  var lineBreak = win32 ? '\r\n' : '\n';
  var svgTmp = '.svgtmp/';

  // put utils function here
  function isExist(filepath) {
      if (!grunt.file.exists(filepath)) {
        grunt.log.warn('Source file "' + filepath + '" not found.');
        return false;
      } else {
        return true;
      }
  }

  function extractIcons(filepath) {
    var content = grunt.file.read(filepath);
    var icons = content.match(iconReg);
    if (!icons) {
      icons = [];
    } else {
      icons = icons.map(function(icon) {
        return icon.replace(/i-/, '');
      });
    }
    // if (icons.length) {
    //   console.log('From ' + filepath + ' find icons:\n\t' + _.uniq(icons).join(','));
    // }
    return icons = _.uniq(icons);
  }

  function extractSvgs(svgDir, icons) {
    icons.forEach(function(icon) {
      var svgPath = svgDir + '/' + icon + '.svg';
      if (!grunt.file.exists(svgPath)) {
        grunt.log.warn(icon + '.svg not found in svg floder.');
        return false;
      }
      var content = grunt.file.read(svgPath);
      var svgDest = svgTmp + icon + '.svg';
      grunt.file.write(svgDest, content);
    });
  }

  grunt.registerMultiTask('iconprocessor_imweb_tpl', 'extract all icon names from imweb-tpl files', function() {
    // tell grunt that this task is async.
    // var cb = this.async();
    // Merge task-specific and/or target-specific options with these defaults.
    // svgDir, outputDir
    var options = this.options();
    var svgDir = options.svgDir;

    if (!svgDir) {
      grunt.log.warn('You don\'t have svg dir config.');
      return false;
    } else if (!grunt.file.isDir(svgDir)) {
      grunt.log.warn('Invalid svg dir.');
      return false;
    }

    async.eachLimit(this.files, concurrencyCount, function(file, next) {

      var allicons = [];
      var outputDir = file.dest;
      var src = file.src.filter(isExist).map(extractIcons).forEach(function(item, index) {
        allicons = allicons.concat(item);
      });
      // confirm single
      allicons = _.uniq(allicons);

      if (!grunt.file.exists(outputDir)) {
        grunt.file.mkdir(outputDir);
      }

      extractSvgs(svgDir, allicons);
      svgParser.parse(svgTmp, outputDir);
      grunt.file.delete(svgTmp);
      console.log(outputDir + ' dir iconfont generation finished.');

      grunt.file.write(outputDir + '/icons', allicons.join(lineBreak));
      console.log(outputDir + '/icons file write finished.');

    }, null);

  });
};
