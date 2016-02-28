var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var sass = require('gulp-ruby-sass');
var plumber = require('gulp-plumber');

gulp.task('browser-sync', function () {
  browserSync({
    server: {
      baseDir: "extension",
      index: "background.html"
    }
  });
});

gulp.task('sass', function () {
  return gulp.src('scss/**/*.scss')
    .pipe(plumber())
    .pipe(sass({
      style: 'expanded',
      compass : true
    }))
    .pipe(gulp.dest('extension/css/'))
    .pipe(reload({stream: true}));
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('default', ['sass', 'browser-sync'], function () {
  gulp.watch("scss/**/*.scss", ['sass']);
  gulp.watch("extension/*.html", ['bs-reload']);
});