# grunt-anchors

> Create clickable links by automatically generating anchor tags  to your files directly inside an html file.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-anchors --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-anchors');
```

## The "anchors" task

### Overview
In your project's Gruntfile, add a section named `anchors` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  anchors: {
    options: {
      expand: 'true',
      cwd: 'public'
    },
    targetHtml: ['path/to/index.html'],
    anchors: {
      htmlFiles: ['path/to/htmlFiles/*.html'],
      linkToAssets: ['path/to/assets/*']
    },
  },
});
```

### Usage Examples

#### Default 
If you pass an array through anchors then the grunt plugin will look for the default "begin:anchors" directive in targetHtml, and insert anchor tags to all of the selected files there.

Example:

```js
grunt.initConfig({
  anchors: {
    options: {
      expand: 'true',
      cwd: 'public'
    },
    targetHtml: ['path/to/index.html'],
    anchors: ['path/to/html/*.html'],
  },
});
```

```html
<!doctype html>
<html>
  <head>
  </head>
  <body>
    <!-- begin:anchors -->
    <!-- end:anchors -->
  </body>
</html>
```

becomes:
```html
<!doctype html>
<html>
  <head>
  </head>
  <body>
    <!-- begin:anchors -->
    <a href="file1.html">file1</a>
    <a href="file2.html">file2</a>
    <!-- end:anchors -->
  </body>
</html>
```

#### Custom Directives
If you pass an object through anchors then each key in the object will be linked to custom directives. This is useful if you want to create different groups of links on a page.

Example:

```js
grunt.initConfig({
  anchors: {
    options: {
      expand: 'true',
      cwd: 'public'
    },
    targetHtml: ['path/to/index.html'],
    anchors: {
      group1: ['path/to/group1/*'],
      group2: ['path/to/group2/*'],
      textFiles: ['path/to/text/*.txt']
      }
  },
});
```

```html
<!doctype html>
<html>
  <head>
  </head>
  <body>
    <!-- begin:anchors -->
    <!-- end:anchors -->
  </body>
</html>
```

becomes:
```html
<!doctype html>
<html>
  <head>
  </head>
  <body>
    <!-- begin:group1 -->
    <!-- end:group1 -->

    <h1>Text Files</h1>
    <!-- begin:textFiles -->
    <!-- end:textFiles -->
  </body>
</html>
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
