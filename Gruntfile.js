module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    express: {
      dev: {
        options: {
          script: 'index.js',
          port: 9090
        }
      }
    },

    sass: {
      dev: {
        files: {
          'www/styles/styles.css': 'dist/styles/styles.scss'
        },
        options: {
          style: 'expanded'
        }
      }
    },

    watch: {
      scripts: {
        files: ['*.js', 'dist/scripts/*.js', 'dist/scripts/**/*.js'],
        tasks: ['copy:dev'],
        options: {
          livereload: true
        }
      },
      css: {
        files: ['dist/styles/*.scss', 'dist/styles/**/*.scss'],
        tasks: ['sass:dev'],
        options: {
          livereload: true
        }
      },
      views: {
        files: ['dist/views/*.html'],
        tasks: ['copy:dev'],
        options: {
          livereload: true
        }
      }
    },

    copy: {
      dev: {
        files: [
          { "cwd": "dist/imgs", "src": ["**"], "dest": "www/imgs", "expand": true },
          { "cwd": "dist/scripts", "src": ["**"], "dest": "www/scripts", "expand": true },
          { "cwd": "dist/views", "src": ["**"], "dest": "www", "expand": true },
          { "cwd": "dist/styles", "src": ["*.css"], "dest": "www/styles", "expand": true }
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-express-server');

  grunt.registerTask('default', ['sass:dev', 'copy:dev', 'express:dev', 'watch']);

};