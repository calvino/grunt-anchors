'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.anchors = {
  setUp: function(done) {
    done();
  },
  default_options: function(test) {
    test.expect(2);

    var content = grunt.file.read('test/fixtures/index.html');
    console.log(content);

    var anchorCount = content.match(/<a href="views1/g).length;
    test.equal(3, anchorCount, '3 anchors should have been written');

    content = grunt.file.read('test/fixtures/index.html');
    console.log(content);

    anchorCount = content.match(/<a href="views2/g).length;
    test.equal(2, anchorCount, '2 anchors should have been written');

    test.done();
  },
  tearDown: function(done) {
    var htmlFile = '<!doctype html>\n' +
                 '<html>\n' +
                 '  <head>\n' +
                 '    <meta charset="utf-8">\n' +
                 '  </head>\n' +
                 '  <body>\n' +
                 '    <!-- begin:anchors -->\n' +
                 '    <!-- end:anchors -->\n' +
                 '    <!-- begin:htmlFiles -->\n' +
                 '    <!-- end:htmlFiles -->\n' +
                 '  </body>\n' +
                 '</html>\n';
    grunt.file.write('test/fixtures/index.html', htmlFile);
    done();
  }
};
