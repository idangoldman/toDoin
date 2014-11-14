var gulp = require('gulp'),
    concat = require('gulp-concat'),
    compass = require('gulp-compass'),
    swig = require('gulp-swig'),
    rename = require("gulp-rename"),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglifyjs'),
    jasmine = require('gulp-jasmine'),

    data = require('./db/settings.json');

gulp.task('vendors', function() {

    gulp.src('./chrome/**/*')
        .pipe(gulp.dest('./dist'));

    gulp.src(data.assets.stylesheet.bower)
        .pipe(gulp.dest('./dist/src/browser_action/vendors/css'));

    gulp.src(data.assets.javascript.bower)
        .pipe(gulp.dest('./dist/src/browser_action/vendors/js'));
});

gulp.task('javascript', function() {
    gulp.src('./app/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default', {
            verbose: true
        }))
    .pipe(concat('script.js'))
        .pipe(gulp.dest('./dist/src/browser_action'));
});

gulp.task('stylesheet', function() {
    gulp.src('./app/style.scss')
        .pipe(compass(data.compass))
        .pipe(gulp.dest('./dist/src/browser_action'));
});


gulp.task('swag', function() {
    gulp.src('./app/layout.html')
        .pipe(swig({
            defaults: {
                autoescape: false,
                cache: false,
                locals: data
            }
        }))
        .pipe(rename(function(path) {
            path.basename = 'browser_action';
        }))
        .pipe(gulp.dest('./dist/src/browser_action/'));
});

gulp.task('tests', function () {
    return gulp.src('tests/**/*.js')
        .pipe(jasmine());
});

gulp.task('watch', function() {
    gulp.watch(['./app/**/*.html'], ['swag']);
    gulp.watch(['./app/**/*.js'], ['javascript']);
    gulp.watch(['./app/**/*.scss'], ['stylesheet']);
});

gulp.task('default', ['vendors', 'swag', 'javascript', 'stylesheet', 'watch'], function() {});