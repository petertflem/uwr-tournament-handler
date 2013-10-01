module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-recess');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-ngmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    
    var user_config = require('./build.config.js');
    
    var task_config = {
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            src: [
                '<%= app_files.js %>'
            ],
            test: [
                '<%= app_files.js_spec %>'
            ],
            gruntfile: [
                'gruntfile.js'
            ],
            options: {
                immed: true,
                newcap: true,
                noarg: true,
                sub: true,
                boss: true
            },
            globals: {}
        },

        recess: {
            compile: {
                src: '<%= recess.build.dest %>',
                dest: '<%= compiled_directory %>/css/main.css',
                options: {
                    compile: true,
                    compress: true,
                    noUnderscores: false,
                    noIDs: false,
                    zeroUnits: false
                }
            },
            build: {
                src: '<%= app_files.less %>',
                dest: '<%= build_directory %>/src/stylesheets/css/main.css',
                options: {
                    compile: true,
                    compress: false,
                    noUnderscores: false,
                    noIDs: false,
                    zeroUnits: false
                }
            }
        },

        karma: {
            options: {
                configFile: '<%= karma_config %>'
            },
            unit: {
                background: true
            },
            continuous: {
                singleRun: true
            }
        },

        copy: {
            build_vendorjs: {
                files: [
                    {
                        src: ['<%= vendor_files.js %>'],
                        dest: '<%= build_directory %>/'
                    }
                ]
            },

            build_js: {
                files: [
                    {
                        src: ['<%= app_files.js %>'],
                        dest: '<%= build_directory %>/'
                    }
                ]
            }
        },

        concat: {
            build_css: {
                src: [
                    '<%= vendor_files.css %>',
                    '<%= recess.build.dest %>'
                ],
                dest: '<%= recess.build.dest %>'
            }   
        },

        ngmin: {
            build: {
                files: [
                    {
                        src: ['<%= app_files.js %>'],
                        cwd: '<%= build_directory %>',
                        dest: '<%= build_directory %>',
                        expand: true
                    }
                ]
            }
        },

        clean: [
            '<%= build_directory %>',
            '<%= compiled_directory %>'
        ],

        requirejs: {
            build: {
                options: {
                    name: 'main',
                    mainConfigFile: 'src/app/main.js',
                    out: '<%= compiled_directory %>/js/main.js',
                    paths: {
                        require_lib: '../../build/src/common/vendor/requirejs/require'
                    },
                    include: ['require_lib']
                }
            }
        },

        index: {
            build: {
                jssrc: 'common/vendor/requirejs/require.js',
                datamain: 'app/main.js',
                csssrc: 'stylesheets/css/main.css',
                dir: '<%= build_directory %>/src' 
            },
            compile: {
                jssrc: 'js/main.js',
                datamain: '',
                csssrc: 'css/main.css',
                dir: '<%= compiled_directory %>' 
            }
        },

        delta: {
            options: {
                livereload: true
            },

            gruntfile: {
                files: 'gruntfile.js',
                tasks: ['jshint:gruntfile'],
                options: {
                    livereload: false
                }
            },

            jssrc: {
                files: [
                    '<%= app_files.js %>'
                ],
                tasks: ['jshint:src'/*, 'karma:unit:run'*/, 'copy:build_js']
            },

            jsunit: {
                files: [
                    '<%= app_files.js_spec %>'
                ],
                tasks: ['jshint:test'/*, 'karma:unit:run'*/],
                options: {
                    livereload: false
                }
            },

            less: {
                files: '<%= app_files.less %>',
                tasks: ['recess:build']
            },

            html: {
                files: [
                    'src/index.html'
                ],
                tasks: ['copy:build_index'],
                options: {
                    livereload: false
                }
            },

            build_html: {
                files: ['build/src/index.html']
            }
        }
    };

    grunt.initConfig( grunt.util._.extend( task_config, user_config ) );

    grunt.renameTask( 'watch', 'delta' );
    grunt.registerTask('watch', ['delta']);

    grunt.registerTask('build', [
        'clean', 
        'jshint',
        'recess:build',
        'concat:build_css',
        /* copy assets */
        /* copy vendor assets */
        'copy:build_js',
        'copy:build_vendorjs',
        'index:build',
        'karma:continuous'
    ]);

    grunt.registerTask('compile', [
        'recess:compile', 
        /* copy assets to compile dir */ 
        'ngmin',
        'requirejs',
        'index:compile'
    ]);

    grunt.registerTask('default', ['build', 'compile']);

    grunt.registerMultiTask('index', 'Process index.html template', function () {

        var jssrc = this.data.jssrc;
        var datamain = this.data.datamain;
        var csssrc = this.data.csssrc;

        grunt.file.copy('src/index.tpl.html', this.data.dir + '/index.html', {
            process: function (contents, path) {
                return grunt.template.process(contents, {
                    data: {
                        jssrc: jssrc,
                        datamain: datamain,
                        csssrc: csssrc
                    }
                });
            }
        });
    });
};