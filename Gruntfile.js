module.exports = function(grunt) {

    var cwd = process.cwd();
    const sass = require('node-sass');
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({
        sass: {
            options: {
                implementation: sass,
                sourceMap: true
            },
            dist: {
                files: {
                    "css/vendor.css": [

                    ],
                    "css/main.css": [
                        "source/sass/main.scss"
                    ]
                }
            }
        },
        uglify: {
            dist: {
                options: {
                    compress: false,
                    beautify: true,
                    mangle: false
                },
                files: {
                    "javascript/vendor.js": [
                        "source/bower_components/jquery/dist/jquery.js",
                        "source/bower_components/bootstrap-sass/js/*.js"

                    ],
                    "javascript/main.js": [
                        "source/javascript/main.js"
                    ]
                }
            },
        },
        watch: {
            options: {
                // https://github.com/gruntjs/grunt-contrib-watch/issues/162
                cliArgs: ['--gruntfile', require('path').join(cwd, 'Gruntfile.js')],
            },
            css: {
                files: ['source/sass/*.scss'],
                tasks: ['sass:dist']
            },
            js: {
                files: 'source/javascript/*.js',
                tasks: ['uglify:dist']
            }
        }
    });

    // Load required modules
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    // Task definitions
    grunt.registerTask('default', ['sass', 'watch', 'uglify']);
};
