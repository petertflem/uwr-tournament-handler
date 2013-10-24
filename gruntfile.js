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
                '<%= app_files.js_unit %>'
            ],
            gruntfile: [
                'gruntfile.js'
            ],
            options: {
                immed: true,
                newcap: true,
                noarg: true,
                sub: true,
                boss: true,
                eqeqeq: true,
                expr: true
            },
            globals: {}
        },

        recess: {
            compile: {
                src: '<%= recess.build.dest %>',
                dest: '<%= compiled_directory %>/stylesheets/css/main.css',
                options: {
                    compile: true,
                    compress: true,
                    noUnderscores: false,
                    noIDs: false,
                    zeroUnits: false
                }
            },
            build: {
                src: '<%= app_files.less_main %>',
                dest: '<%= build_directory %>/stylesheets/css/main.css',
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
            unit: {
                background: true,
                options: {
                    configFile: '<%= karma_config.unit %>'
                }
            },
            continuous: {
                singleRun: true,
                options: {
                    configFile: '<%= karma_config.unit %>'
                }
            }
        },

        copy: {
            build_vendorjs: {
                files: [
                    {
                        src: ['<%= vendor_files.js %>'],
                        dest: '<%= build_directory %>/',
                        expand: true,
                        cwd: 'src/'
                    }
                ]
            },

            build_js: {
                files: [
                    {
                        src: ['app/**/*.js', 'common/components/**/*.js','!app/**/*.spec.js', '!app/unit.main.js'],
                        dest: '<%= build_directory %>/',
                        expand: true,
                        cwd: 'src/'
                    }
                ]
            },

            build_templates: {
                files: [
                    {
                        src: ['<%= app_files.templates %>'],
                        dest: '<%= build_directory %>/',
                        expand: true,
                        cwd: 'src/'
                    }
                ]
            },

            compile_templates: {
                files: [
                    {
                        src: ['<%= app_files.templates %>'],
                        dest: '<%= compiled_directory %>/',
                        expand: true,
                        cwd: 'src/'
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

        clean: [
            '<%= build_directory %>',
            '<%= compiled_directory %>'
        ],

        requirejs: {
            build: {
                options: {
                    baseUrl: 'src/',
                    name: 'app/main',
                    mainConfigFile: '<%= build_directory %>/app/main.js',
                    out: '<%= compiled_directory %>/app/main.js',
                    paths: {
                        require_lib: '../build/common/vendor/requirejs/require'
                    },
                    include: ['require_lib']
                },
                wrap: {
                    start: "(function() {",
                    end: "}());"
                },
            }
        },

        index: {
            build: {
                js: [
                    {
                        src: 'common/vendor/requirejs/require.js',
                        datamain: 'app/main.js'
                    }, 
                    {
                        src: 'http://localhost:35729/livereload.js'
                    }
                ],
                csssrc: 'stylesheets/css/main.css',
                dir: '<%= build_directory %>' 
            },
            compile: {
                js: [
                    {
                        src: 'app/main.js'
                    }
                ],
                datamain: '',
                csssrc: 'stylesheets/css/main.css',
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
                tasks: ['jshint:src', 'karma:unit:run', 'copy:build_js'],
                options: {
                    livereload: true
                }
            },

            jsunit: {
                files: [
                    '<%= app_files.js_unit %>'
                ],
                tasks: ['jshint:test', 'karma:unit:run'],
                options: {
                    livereload: false
                }
            },

            less: {
                files: '<%= app_files.less %>',
                tasks: ['recess:build', 'concat:build_css'],
                options: {
                    livereload: true
                }
            },

            html: {
                files: [
                    'src/index.tpl.html'
                ],
                tasks: ['index:build'],
                options: {
                    livereload: false
                }
            },

            build_html: {
                files: ['build/index.html'],
                options: {
                    livereload: true
                }
            },

            tpl: {
                files: ['src/**/*.tpl.html', '!src/index.tpl.html'],
                tasks: ['copy:build_templates']
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
        'copy:build_templates', 
        'copy:build_js',
        'copy:build_vendorjs',
        'index:build',
        'karma:continuous'
    ]);

    grunt.registerTask('compile', [
        'recess:compile',
        'copy:compile_templates',
        /* copy assets to compile dir */ 
        //'ngmin',
        'requirejs',
        'index:compile'
    ]);

    grunt.registerTask('default', ['build', 'compile']);

    grunt.registerMultiTask('index', 'Process index.html template', function () {

        var js = this.data.js;
        var csssrc = this.data.csssrc;
        
        grunt.file.copy('src/index.tpl.html', this.data.dir + '/index.html', {
            process: function (contents, path) {
                return grunt.template.process(contents, {
                    data: {
                        js: js,
                        csssrc: csssrc
                    }
                });
            }
        });
    });
};