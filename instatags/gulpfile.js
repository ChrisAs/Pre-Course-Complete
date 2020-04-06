var gulp = require('gulp');
var browserSync = require('browser-sync').create();

function browserSyncTask () {
  browserSync.init({
    server: {
      baseDir: './',
      routes: {
        '/node_modules': '../node_modules'
      }
    },
    port: 8080
  });
  gulp.watch([
    './index.html',
    './css/main.css',
    './js/main.js',
    './lib/instagram.js'
  ]).on('change', browserSync.reload);
}

exports.default = browserSyncTask;
