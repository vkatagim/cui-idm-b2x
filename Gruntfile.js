module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  grunt.initConfig ({
    watch:{
      css:{
        files: 'assets/scss/**/*',
        tasks: ['sass','autoprefixer']
      },
      scripts:{
        files: ['assets/**/*.js'],
        tasks: ['concat'],
        options: {
          spawn: false,
        },
      }
    },

    sass:{
      dist:{
        files:{
          'assets/concat/main.css': 'assets/scss/main.scss'
        }
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 3 versions']
      },
      dist: {
        files: {
          'assets/concat/main.css': 'assets/concat/main.css'
        }
      }
    },

    browserSync: {
      dev: {
        bsFiles: {
            src : [
                '**/*.html',
                'assets/concat/**/*.js',
                '**/*.css'
            ]
        },
        options: {
          ghostMode: false,
          watchTask: true,
          online: true,
          port: 9001,
          server:{
            baseDir: './'
          }
        }
      },
      demo: {
        bsFiles: {
            src : [
                '**/*.html',
                '**/*.js',
                '**/*.css'
            ]
        },
        options: {
          ghostMode: false,
          watchTask: false,
          online: true,
          server:{
            baseDir: 'build/'
          }
        }
      },
      demosdk: {
        bsFiles: {
          src : [
            '**/*.html',
            '**/*.js',
            '**/*.css'
          ]
        },
        options: {
          ghostMode: false,
          watchTask: false,
          online: true,
          server: {
            baseDir: 'build-sdk/'
          }
        }
      }
    },

    concat: {
      options: {
        separator: '\n\n'
      },
      build: {
        src: ['assets/angular-modules/app.intro.js','assets/angular-modules/templateCache.js','assets/app/**/*.js','assets/angular-modules/app.outro.js'],
        dest: 'assets/concatJS/app.js'
      },
      dev: {
        src: [ 'assets/_ajax.cache.js', 'assets/angular-modules/app.intro.js','assets/app/**/*.js','assets/angular-modules/app.outro.js'],
        dest: 'assets/concatJS/app.js'
      },
    },

    clean: {
      build: {
        src: ['build']
      },
      buildsdk: {
        src: ['build-sdk']
      },
      processhtml: {
        src: ['assets/app/processedHtml']
      }
    },

    copy: {
      build: {
        files: [
          {
            src: 'index.html',
            dest: 'build/index.html'
          }, {
            src: [
              'bower_components/cui-i18n/dist/cui-i18n/angular-translate/*.json',
              'bower_components/angular-i18n/*.js',
              'bower_components/cui-icons/iconList',
              'bower_components/cui-icons/dist/**/*.svg',
              'bower_components/cui-i18n/dist/cui-i18n/angular-translate/countries/*.json',
              'bower_components/cui-i18n/dist/cui-i18n/angular-translate/timezones/*.json'
            ],
            dest: 'build/'
          }
        ]
      },
      buildsdk: {
        files: [
          {
            src: 'index.html',
            dest: 'build-sdk/index.html'
          }, {
            src: [
              'bower_components/cui-i18n/dist/cui-i18n/angular-translate/*.json',
              'bower_components/angular-i18n/*.js',
              'bower_components/cui-icons/iconList',
              'bower_components/cui-icons/dist/**/*.svg',
              'bower_components/cui-i18n/dist/cui-i18n/angular-translate/countries/*.json',
              'bower_components/cui-i18n/dist/cui-i18n/angular-translate/timezones/*.json'
            ],
            dest: 'build-sdk/'
          }
        ]
      },
      dev: {
        src: 'appConfig-example.json',
        dest: 'appConfig.json'
      }
    },

    filerev: {
      build: {
        src: ['build/assets/css/main.css','build/assets/js/vendor.js','build/assets/js/app.js']
      },
      buildsdk: {
        src: ['build-sdk/assets/css/main.css','build-sdk/assets/js/vendor.js','build-sdk/assets/js/app.js']
      }
    },

    useminPrepare: {
      html: 'index.html',
      options: {
        src: './',
        dest: './build'
      }
    },

    useminPreparesdk: {
      html: './index.html',
      options: {
        src: './',
        dest: './build-sdk'
      }
    },

    usemin: {
      options: {
        assetsDirs: ['./build']
      },
      css: ['./build/assets/css/**/*.css'],
      js: ['./build/assets/js/**/*.js'],
      html: ['./build/index.html']
    },

    useminsdk: {
      options: {
        assetsDirs: ['./build-sdk']
      },
      css: ['./build-sdk/assets/css/**/*.css'],
      js: ['./build-sdk/assets/app/**/*.js'],
      html: ['./build-sdk/index.html']
    },

    uglify: {
      options: {
        mangle: false
      }
    },

    jshint: {
      app: ['assets/**/*.js']
    },

    ngtemplates: {
      build: {
        src: 'assets/app/processedHtml/assets/**/*.html',
        dest: 'assets/app/templateCache.js',
        options: {
          htmlmin: {
            collapseBooleanAttributes: true,
            collapseWhiteSpace: true,
            removeAttributeQuotes: true,
            removeComments: true,
            removeEmptyAttributes: true,
            removeReduntantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkAttributes: true
          },
          module: 'app',
          url: function(url) { return url.replace('assets/app/processedHtml/', ''); }
        }
      },
      buildsdk: {
        src: ['assets/modules/**/*.html','assets/common-templates/**/*.html'],
        dest: 'assets/app/templateCache.js',
        options: {
          htmlmin: {
            collapseBooleanAttributes: true,
            collapseWhiteSpace: true,
            removeAttributeQuotes: true,
            removeComments: true,
            removeEmptyAttributes: true,
            removeReduntantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkAttributes: true
          },
          module: 'app'
        }
      }
    },

    processhtml: {
      build: {
        options: {
          commentMarker: 'processHTML'
        },
        files: [{
          expand: true,
          cwd: './',
          src: ['assets/modules/**/**.html', 'assets/common-templates/**/*.html'],
          dest: 'assets/app/processedHtml/',
          extDot: '.html'
        }]
      }
    },

    babel: {
      options: {
        sourceMap: true,
        presets: ['es2015'],
        retainLines: true,
        compact: true
      },
      babel: {
        files: {
          'assets/concat/app.js': 'assets/concat/app.js' 
        }
      }
    }
  });

  // Workaround for multiple useminPrepare tasks
  grunt.registerTask('useminPreparesdk', function() {
    var useminPreparesdkConfig = grunt.config('useminPreparesdk');
    grunt.config.set('useminPrepare', useminPreparesdkConfig);
    grunt.task.run('useminPrepare');
  });

  // Workaround for multiple usemin tasks
  grunt.registerTask('useminsdk', function() {
    var useminsdkConfig = grunt.config('useminsdk');
    grunt.config.set('usemin', useminsdkConfig);
    grunt.task.run('usemin');
  });

  grunt.registerTask('concatModules', 'Task to concat all project modules.', function() {
    var angularModules = [], 
        sourceArray = [];

    // Get all angular-modules directories and push them into angularModules array
    grunt.file.expand('assets/angular-modules/*').forEach(function(dir) {
      if (dir.indexOf('.') === -1) {
        if (dir.substr(dir.lastIndexOf('/')+1) !== 'jsWrapper') {
          // Check for periods to make sure we only look at directories
          angularModules.push(dir.substr(dir.lastIndexOf('/')+1));  
        }
      }
    });

    // Get concat object from initConfig
    var concat = grunt.config.get('concat') || {};

    // Create  array of all module sources
    angularModules.forEach(function(module) {
      if (module !== 'jsWrapper') {
        if (module !== 'app') {
          sourceArray = ['assets/angular-modules/' + module + '/' + module + '.intro.js',
                        'assets/modules/' + module + '/**/*.js',
                        'assets/angular-modules/' + module + '/' + module + '.outro.js'].concat(sourceArray);
        }
        else {
          sourceArray = sourceArray.concat(['assets/angular-modules/' + module + '/' + module + '.intro.js',
                                            'assets/modules/' + module + '/**/*.js', 
                                            'assets/app/templateCache.js',
                                            'assets/angular-modules/' + module + '/' + module + '.outro.js']);
        }
      }
    });

    // Task: concat modules into one file
    concat['modules'] = {
      src: sourceArray,
      dest: 'assets/concat/js/modules.js'
    };

    // Task: wrap modules.js with jsWrapper module
    concat['wrapModules'] = {
      src: ['assets/angular-modules/jsWrapper/jsWrapper.intro.js',
            'assets/concat/js/modules.js',
            'assets/angular-modules/jsWrapper/jsWrapper.outro.js'],
      dest: 'assets/concat/app.js'
    };

    // Add new subtasks to concat in initConfig
    grunt.config.set('concat', concat);

    // Run creates tasks
    grunt.task.run('concat:modules');
    grunt.task.run('concat:wrapModules');
  });


  // Tasks ------------------------------------------------------------
  grunt.registerTask('default', ['copy:dev','concatModules','babel','sass','autoprefixer','browserSync:dev','watch']);

  grunt.registerTask('build', ['sass','autoprefixer','processhtml','ngtemplates:build','clean:build','copy:build',
                                'concatModules','babel','useminPrepare','concat:generated',
                                'cssmin:generated','uglify:generated','filerev:build','usemin']);

  grunt.registerTask('buildsdk', ['sass','autoprefixer','ngtemplates:buildsdk','clean:buildsdk','copy:buildsdk',
                                  'concatModules','babel','useminPreparesdk','concat:generated','cssmin:generated',
                                  'uglify:generated','filerev:buildsdk','useminsdk']);

  grunt.registerTask('demo', ['browserSync:demo']);
  grunt.registerTask('demosdk', ['browserSync:demosdk']);
  grunt.registerTask('jslint', ['jshint']);

};
