module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-karma');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['src/angular-notifications.js']
        }
      }
    },

    jshint: {
      files: ['Gruntfile.js', 'src/*.js', 'test/unit/*.js'],
      options: {
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },

    karma: {
      unit: {
        options: {
          autoWatch: true,
          browsers: ['PhantomJS'],
          files: [
            'test/lib/angular/angular.js',
            'test/lib/angular/angular-mocks.js',
            'src/**/*.js',
            'test/unit/**/*.js'
          ],
          frameworks: ['mocha', 'chai'],
        }
      }
    }

  });

  grunt.registerTask('build', ['uglify']);
  grunt.registerTask('test', ['jshint', 'karma']);
  grunt.registerTask('default', ['build', 'test']);

};
