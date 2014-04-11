// Generated on 2014-03-04 using generator-angular-require 0.1.11
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

	grunt.loadNpmTasks('grunt-contrib-requirejs');

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	// Time how long tasks take. Can help when optimizing build times
	// require('time-grunt')(grunt);

	// Define the configuration for all the tasks
	grunt.initConfig({

		// Project settings
		yeoman: {
			// configurable paths
			app: require('./bower.json').appPath || 'app',
			dist: 'dist'
		},

		// Watches files for changes and runs tasks based on the changed files
		watch: {
			js: {
				files: ['<%= yeoman.app %>/scripts/{,*/}*.js', '<%= yeoman.app %>/modules/{,**/}*.js'],
				tasks: ['newer:jshint:all'],
				// options: {
				// 	livereload: true
				// }
			},
			jsTest: {
				files: ['<%= yeoman.app %>/scripts/{,*/}*.js', '<%= yeoman.app %>/modules/{,**/}*.js'],
				tasks: ['newer:jshint:test']
			},
			// compass: {
			//   files: ['<%= yeoman.app %>/{,**/}*.{scss,sass}'],
			//   tasks: ['compass:server', 'autoprefixer']
			// },
			styles: {
				files: '<%= yeoman.app %>/{,**/}*.less',
				tasks: 'less:dev'
			},
			gruntfile: {
				files: ['Gruntfile.js']
			},
			// livereload: {
			// 	options: {
			// 		livereload: '<%= connect.options.livereload %>'
			// 	},
			// 	files: [
			// 		'<%= yeoman.app %>/{,*/}*.html',
			// 		'.tmp/styles/{,*/}*.css',
			// 		'<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
			// 	]
			// }
		},

		// The actual grunt server settings
		connect: {
			// livereload: {
			// 	options: {
			// 		open: true,
			// 		base: [
			// 			'.tmp',
			// 			'<%= yeoman.app %>'
			// 		]
			// 	}
			// },
			serve: {
				options: {
					port: 9000,
					hostname: 'localhost',
					base: [
						'<%= yeoman.app %>'
					]
				}
			},
			test: {
				options: {
					port: 9010,
					base: [
						'.tmp',
						'test',
						'<%= yeoman.app %>'
					]
				}
			}
			// dist: {
			// 	options: {
			// 		base: '<%= yeoman.dist %>'
			// 	}
			// }
		},

		// Make sure code styles are up to par and there are no obvious mistakes
		jshint: {
			options: {
				jshintrc: '.jshintrc',
				ignores: '<%= yeoman.app %>/scripts/bootstrap-built.js',
				reporter: require('jshint-stylish')
			},
			all: [
				'Gruntfile.js',
				'<%= yeoman.app %>/scripts/{,*/}*.js',
				'<%= yeoman.app %>/modules/{,**/}*.js'
			],
			test: {
				options: {
					jshintrc: 'test/.jshintrc'
				},
				src: ['test/spec/{,*/}*.js']
			}
		},

		// Empties folders to start fresh
		clean: {
			dist: {
				files: [{
					dot: true,
					src: [
						'.tmp',
						'<%= yeoman.dist %>/*',
						'!<%= yeoman.dist %>/.git*'
					]
				}]
			},
			server: '.tmp'
		},

		// Add vendor prefixed styles
		// autoprefixer: {
		// 	options: {
		// 		browsers: ['last 1 version']
		// 	},
		// 	dist: {
		// 		files: [{
		// 			expand: true,
		// 			cwd: '.tmp/styles/',
		// 			src: '{,*/}*.css',
		// 			dest: '.tmp/styles/'
		// 		}]
		// 	}
		// },

		// Automatically inject Bower components into the app
		'bower-install': {
			app: {
				html: '<%= yeoman.app %>/index.html',
				ignorePath: '<%= yeoman.app %>/'
			}
		},

		less: {
			dev: {
				options: {
					// compress: true,
					// yuicompress: true,
					// optimization: 2,
				},
				files: {
					'<%= yeoman.app %>/styles/css/bootstrap-custom.css': '<%= yeoman.app %>/styles/less/bootstrap.less',
					'<%= yeoman.app %>/styles/css/smartadmin-production.css': '<%= yeoman.app %>/styles/less/smartadmin-production.less',
					'<%= yeoman.app %>/styles/css/overrides.css': '<%= yeoman.app %>/styles/less/overrides.less',
				}
			}
		},

		// Compiles Sass to CSS and generates necessary files if requested
		// compass: {
		// 	options: {
		// 		sassDir: '<%= yeoman.app %>/styles',
		// 		cssDir: '.tmp/styles',
		// 		generatedImagesDir: '.tmp/images/generated',
		// 		imagesDir: '<%= yeoman.app %>/images',
		// 		javascriptsDir: '<%= yeoman.app %>/scripts',
		// 		fontsDir: '<%= yeoman.app %>/styles/fonts',
		// 		importPath: '<%= yeoman.app %>/bower_components',
		// 		httpImagesPath: '/images',
		// 		httpGeneratedImagesPath: '/images/generated',
		// 		httpFontsPath: '/styles/fonts',
		// 		relativeAssets: false,
		// 		assetCacheBuster: false,
		// 		raw: 'Sass::Script::Number.precision = 10\n'
		// 	},
		// 	dist: {
		// 		options: {
		// 			generatedImagesDir: '<%= yeoman.dist %>/images/generated'
		// 		}
		// 	},
		// 	server: {
		// 		options: {
		// 			debugInfo: true
		// 		}
		// 	}
		// },

		// Renames files for browser caching purposes
		rev: {
			dist: {
				files: {
					src: [
						'<%= yeoman.dist %>/scripts/{,*/}*.js',
						'<%= yeoman.dist %>/styles/{,*/}*.css',
						'<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
						'<%= yeoman.dist %>/styles/fonts/*'
					]
				}
			}
		},

		// Reads HTML for usemin blocks to enable smart builds that automatically
		// concat, minify and revision files. Creates configurations in memory so
		// additional tasks can operate on them
		useminPrepare: {
			html: '<%= yeoman.app %>/index.html',
			options: {
				dest: '<%= yeoman.dist %>'
			}
		},

		// Performs rewrites based on rev and the useminPrepare configuration
		usemin: {
			html: ['<%= yeoman.dist %>/{,*/}*.html'],
			css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
			options: {
				assetsDirs: ['<%= yeoman.dist %>']
			}
		},

		// The following *-min tasks produce minified files in the dist folder
		// imagemin: {
		// 	dist: {
		// 		files: [{
		// 			expand: true,
		// 			cwd: '<%= yeoman.app %>/images',
		// 			src: '{,*/}*.{png,jpg,jpeg,gif}',
		// 			dest: '<%= yeoman.dist %>/images'
		// 		}]
		// 	}
		// },
		// svgmin: {
		// 	dist: {
		// 		files: [{
		// 			expand: true,
		// 			cwd: '<%= yeoman.app %>/images',
		// 			src: '{,*/}*.svg',
		// 			dest: '<%= yeoman.dist %>/images'
		// 		}]
		// 	}
		// },
		// htmlmin: {
		// 	dist: {
		// 		options: {
		// 			collapseWhitespace: true,
		// 			collapseBooleanAttributes: true,
		// 			removeCommentsFromCDATA: true,
		// 			removeOptionalTags: true
		// 		},
		// 		files: [{
		// 			expand: true,
		// 			cwd: '<%= yeoman.dist %>',
		// 			src: ['*.html', 'views/{,*/}*.html'],
		// 			dest: '<%= yeoman.dist %>'
		// 		}]
		// 	}
		// },

		// Allow the use of non-minsafe AngularJS files. Automatically makes it
		// minsafe compatible so Uglify does not destroy the ng references
		ngmin: {
			dist: {
				files: [{
					expand: true,
					cwd: '.tmp/concat/scripts',
					src: '*.js',
					dest: '.tmp/concat/scripts'
				}]
			}
		},

		// Copies remaining files to places other tasks can use
		copy: {
			dist: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= yeoman.app %>',
					dest: '<%= yeoman.dist %>',
					src: [
						'*.{ico,png,txt}',
						'.htaccess',
						'*.html',
						'views/{,*/}*.html',
						'bower_components/**/*',
						'images/{,*/}*.{webp}',
						'fonts/*'
					]
				}, {
					expand: true,
					cwd: '.tmp/images',
					dest: '<%= yeoman.dist %>/images',
					src: ['generated/*']
				}]
			},
			styles: {
				expand: true,
				cwd: '<%= yeoman.app %>/styles',
				dest: '.tmp/styles/',
				src: '{,*/}*.css'
			}
		},

		// By default, your `index.html`'s <!-- Usemin block --> will take care of
		// minification. These next options are pre-configured if you do not wish
		// to use the Usemin blocks.
		// cssmin: {
		//   dist: {
		//     files: {
		//       '<%= yeoman.dist %>/styles/main.css': [
		//         '.tmp/styles/{,*/}*.css',
		//         '<%= yeoman.app %>/styles/{,*/}*.css'
		//       ]
		//     }
		//   }
		// },
		// uglify: {
		//   dist: {
		//     files: {
		//       '<%= yeoman.dist %>/scripts/scripts.js': [
		//         '<%= yeoman.dist %>/scripts/scripts.js'
		//       ]
		//     }
		//   }
		// },
		concat: {
		  dist: {}
		},

		// Test settings
		karma: {
			unit: {
				configFile: 'karma.conf.js',
				browsers: ['PhantomJS'],
				autoWatch: true,
			},

			coverage: {
				configFile: 'karma.conf.js',
				browsers: ['PhantomJS'],
				plugins:[
					'karma-jasmine',
					'karma-requirejs',
					'karma-coverage',
                                        'karma-phantomjs-launcher'
				],

				preprocessors: {
					'app/modules/**/*.js': 'coverage',
				},

				// with coverage, but with bad line numbers in tests reports
				reporters: ['progress', 'dots', 'coverage'],

				// without coverage
				// reporters: ['progress', 'dots'],

				coverageReporter: {
					type : 'html',
					dir : 'coverage/'
				},
				singleRun: false,
                                autoWatch: true
			}
		},

		// requirejs: {
		// 	compile: {
		// 		options: {
		// 			baseUrl: '<%= yeoman.app %>/scripts',
		// 			paths: {
		// 				angular: '../bower_components/angular/angular',
		// 				angularRoute: '../bower_components/angular-route/angular-route',
		// 				angularCookies: '../bower_components/angular-cookies/angular-cookies',
		// 				angularSanitize: '../bower_components/angular-sanitize/angular-sanitize',
		// 				angularResource: '../bower_components/angular-resource/angular-resource',
		// 				angularMocks: '../bower_components/angular-mocks/angular-mocks',
		// 				text: '../bower_components/requirejs-text/text',
		// 				underscore: '../../bower_components/underscore/underscore',
		// 				domReady: '../../bower_components/requirejs-domready/domReady'
		// 			},
		// 			shim: {
		// 				'angular' : {'exports' : 'angular'},
		// 				'angularRoute': ['angular'],
		// 				'angularCookies': ['angular'],
		// 				'angularSanitize': ['angular'],
		// 				'angularResource': ['angular'],
		// 				'angularMocks': {
		// 					deps:['angular'],
		// 					'exports':'angular.mock'
		// 				}
		// 			},
		// 			optimize: 'uglify2',
		// 			uglify2: {
		// 				mangle: false
		// 			},
		// 			include: ['angular'],
		// 			name: 'bootstrap',
		// 			out: '<%= yeoman.dist %>/scripts/bootstrap.js'
		// 		}
		// 	}
		// }
	});


	grunt.registerTask('serve', function (target) {
		// if (target === 'dist') {
		// 	return grunt.task.run(['build', 'connect:dist:keepalive']);
		// }

		grunt.task.run([
			'clean:server',
			'bower-install',
			// 'autoprefixer',
			'connect:serve',
			'watch'
		]);
	});

	grunt.registerTask('server', function (target) {
		grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
		grunt.task.run(['serve:' + target]);
	});

	grunt.registerTask('test', [
		'clean:server',
		// 'autoprefixer',
		'connect:test',
		'karma:unit'
	]);
	grunt.registerTask('coverage', [
		'clean:server',
		// 'autoprefixer',
		'connect:test',
		'karma:coverage'
	]);

	grunt.registerTask('build', [
		'clean:dist',
		'bower-install',
		'useminPrepare',
		'less:dev',
		// 'autoprefixer',
		'concat',
		'ngmin',
		// 'cdnify',
		// 'cssmin',
		// Below task commented out as r.js (via grunt-contrib-requirejs) will take care of this
		//'uglify',
		'rev',
		'usemin',
		// 'requirejs',
		'copy:dist',
		// 'htmlmin'
	]);

	grunt.registerTask('default', [
		'newer:jshint',
		'test',
		'build'
	]);
};
