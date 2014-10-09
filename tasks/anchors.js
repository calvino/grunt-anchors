/*
 * grunt-anchors
 * https://github.com/chrisalvino/grunt-anchors
 *
 * Copyright (c) 2014 Chris Alvino
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.registerMultiTask('anchors', 'Create clickable links by automatically generating anchor tags  to your files directly inside an html file.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      expand: true,
      cwd: '.'
    });

    //TODO: test this method away from the rest of the code. not sure how to do that yet.
    var createAnchors = function(path, options){
      var files = grunt.file.expand(options, path);
      
      // generate anchor tag strings
      var anchorTags = files.map( function(file) {
        var template = '<a href="<%= filepath %>"><%= name %></a>';
        var name = file.split('.');

        name.pop();
        name = name.join();

        return grunt.template.process(template, {data: {filepath: file, name: name}});
      });

      // new lines
      anchorTags.unshift('');
      anchorTags = anchorTags.join('\n') + '\n';

      grunt.log.ok('Creating anchors:\n' + anchorTags);

      return anchorTags;
    };


    //TODO: test this method away from the rest of the code. not sure how to do that yet.
    var processIncludes = function(filepath, content, marker, tags) {
      grunt.log.writeln('replacing marker: ' + marker);

      var begin = content.html.match(new RegExp('<!--\\s*begin:' + marker + '\\s*-->'));
      var wrote = false;

      if (begin) {
        var end = content.html.match(new RegExp('<!--\\s*end:' + marker + '\\s*-->')).index;
        var startReplace = begin.index + begin[0].length;
        content.html = content.html.substring(0, startReplace) + tags + content.html.substring(end, content.html.length);
        wrote = true;
      } else {
        wrote = false;
        grunt.log.ok('Skipping ' + marker  + ' for '+ filepath);
      }

      return wrote;
    };

    var data = this.data;
    var targetFiles = grunt.file.expand(options, this.data.targetHtml);

    targetFiles.forEach(function(filepath) {
      var content = {
        html: grunt.file.read(options.cwd + '/' + filepath)
      };

      var skipped;
      var anchorTags;

      if (Array.isArray(data.anchors)) {
        anchorTags = createAnchors(data.anchors, options);
        if (processIncludes(filepath, content, 'anchors', anchorTags)) {
          grunt.log.ok('Writing file '+ filepath);
          grunt.file.write(options.cwd + '/' + filepath, content.html);
        }

      } else {
        for (var marker in data.anchors) {
          anchorTags = createAnchors(data.anchors[marker], options);
          if (processIncludes(filepath, content, marker, anchorTags)) {
            skipped = false;
          }
        }

        if (!skipped) {
          grunt.log.ok('Writing file '+ filepath);
          grunt.file.write(options.cwd + '/' + filepath, content.html);
        }
      }

    });

  });

};