# grunt-iconprocessor-imweb-tpl

> extract all icon names from imweb-tpl files, and generate iconfont files according to these names.
Generate folder structure below:
-outputDir
  -fonts
    -iconfont.eot
    -iconfont.svg
    -iconfont.ttf
    -iconfont.woff
  -demo.html
  -iconfont-embedded.css
  -iconfont.css
  -iconfont.scss


## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-iconprocessor-imweb-tpl --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-iconprocessor-imweb-tpl');
```

## The "iconprocessor_imweb_tpl" task

### Overview
In your project's Gruntfile, add a section named `iconprocessor_imweb_tpl` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  iconprocessor_imweb_tpl: {
    options: {
      // Task-specific options go here.
    },
    src: [
      // your html, tpl files
    ],
    // output directory
    dest: 'output/'
  },
});
```

### Options

#### options.svgPath
Type: `String`
Default: No
This option must be configured.

A string value that is used to store your svg files.

### Usage Examples

In this example, the options are used to specify local svg folder is 'svgs/'.

```js
grunt.initConfig({
  iconprocessor_imweb_tpl: {
    options: {
      svgPath: 'svgs/'
    },
    files: {
      'dest/outputDir/': ['src/**/*.html'],
    },
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
* 2015-08-12  v0.1.0  Initial release.
...
