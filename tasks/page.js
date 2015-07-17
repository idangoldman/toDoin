var gulp = require('gulp'),
    swig = require('gulp-swig'),
    compass = require('gulp-compass'),
    autoprefixer = require('gulp-autoprefixer'),
    clean = require('gulp-clean'),

    config = require('../settings/config');

gulp.task('page-index-tpl', function() {
    return gulp.src([config.path.page + '/index.html'])
        .pipe(swig({
            defaults: {
                autoescape: false,
                cache: false,
                locals: config
            }
        }))
        .pipe(gulp.dest(config.path.build));
});

gulp.task('page-styles', function() {
    return gulp.src(config.path.page + '/style.scss')
        .pipe(compass({
            config_file: './config.rb',
            css: './_build',
            sass: './page'
        }))
        .pipe(autoprefixer())
        .pipe(gulp.dest(config.path.build));
});

gulp.task('page-clean-build', function() {
    return gulp.src(config.path.build, {
            read: false
        })
        .pipe(clean());
});

gulp.task('page-build', ['page-clean-build'], function() {
    return gulp.start('page-index-tpl', 'page-styles');
});

gulp.task('page-watcher', function() {
    gulp.watch(config.path.page + '/**/*.html', ['page-index-tpl']);
    gulp.watch(config.path.page + '/**/*.scss', ['page-styles']);
});

gulp.task('page', ['page-build'], function() {
    return gulp.start('connect', 'page-watcher');
});