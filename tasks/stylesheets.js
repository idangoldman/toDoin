var gulp = require('gulp'),
    compass = require('gulp-compass'),
    autoprefixer = require('gulp-autoprefixer'),

    config = require('../settings/config.json');

gulp.task('stylesheet-vendors', ['clean'], function() {
    gulp.src(config.assets.stylesheet.bower)
        .pipe(gulp.dest('../build/vendors/css'));
});

gulp.task('stylesheet', ['stylesheet-vendors'], function() {
    return gulp.src('../app/style.scss')
        .pipe(compass(config.compass))
        .pipe(autoprefixer())
        .pipe(gulp.dest('../build'));
});