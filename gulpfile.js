'use strict';
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
gulp.task('default', function() {
  return gulp.src([
    './public/src/app.js',
    './public/src/user.service.js',
    './public/src/error.controller.js',
    './public/src/login.controller.js',
    './public/src/home.controller.js',
    './public/src/editable-create.controller.js',
    './public/src/editable.controller.js',
    './public/src/user-create.controller.js',
    './public/src/user.controller.js'
    ])
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/js/'));
});
