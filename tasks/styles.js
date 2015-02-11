var gulp = require('gulp'),
    compass = require('gulp-compass'),
    autoprefixer = require('gulp-autoprefixer'),

    config = require('../settings/config');

gulp.task('styles-vendors', ['clean'], function() {
    gulp.src(config.assets.stylesheet.bower)
        .pipe(gulp.dest(config.path.build + '/vendors/css'));
});

gulp.task('styles', ['styles-vendors'], function() {
    return gulp.src(config.path.app + '/style.scss')
        .pipe(compass(config.compass))
        .pipe(autoprefixer())
        .pipe(gulp.dest(config.path.build));
});