module.exports = function( grunt )
{
    grunt.initConfig(
    {
        express:
        {
            options: {
              // Override defaults here
            },
            dev: {
              options: {
                script: 'server/server.js'
              }
            }
        },

        browserify:
        {
            dev:
            {
                files:{
                    'www/scripts/game.js': ['client/**/**/**.js']
                }
            }
        },

        concat:{
            options: {
                separator: ';',
            },
            dev:{
                src:['lib/**/*.js'],
                dest:'www/scripts/libs.js'
            },
            css:{
                src:['client/styles/*.css'],
                dest:'www/styles/styles.css',
                options: {
                    separator: '\n\n'
                }
            }
        },

        copy:
        {
            dev:{
                files:{
                    'www/index.html':'client/index.html',
                    'www/':'images/**'
                }
            }
        },

        watch:
        {
            scripts:
            {
                files: ['client/scripts/**/**.js'],
                tasks: [ 'build'],
                options:
                {
                    livereload: true
                }
            },

            html:
            {
                files: ['client/**.html'],
                tasks: [ 'copy'],
                options:
                {
                    livereload: true
                }
            },

            css:
            {
                files: ['client/styles/**.css'],
                tasks: [ 'concat:css'],
                options:
                {
                    livereload: true
                }
            },

            express:
            {
              files:  [ 'server/**/**.js' ],
              tasks:  [ 'express:dev' ],
              options: {
                spawn: false // for grunt-contrib-watch v0.5.0+, "nospawn: true" for lower versions. Without this option specified express won't be reloaded
              }
            }
        },

        clean:{
            dev:{
                src:['www','.tmp']
            }
        }

    } );

    grunt.loadNpmTasks( 'grunt-contrib-uglify' );
    grunt.loadNpmTasks( 'grunt-contrib-watch' );
    grunt.loadNpmTasks( 'grunt-contrib-copy' );
    grunt.loadNpmTasks( 'grunt-contrib-concat' );
    grunt.loadNpmTasks( 'grunt-browserify' );
    grunt.loadNpmTasks( 'grunt-contrib-clean' );
    grunt.loadNpmTasks( 'grunt-express-server' );

    grunt.registerTask( 'build', [ 'clean:dev','browserify:dev','concat','copy'] );
    grunt.registerTask( 'serve', [ 'build', 'express', 'watch' ] );
}
