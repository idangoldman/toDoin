var gulp = require('gulp'),
    compass = require('gulp-compass'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('stylesheet-vendors', ['clean'], function() {
    gulp.src(data.assets.stylesheet.bower)
        .pipe(gulp.dest(getEnvPath() + '/vendors/css'));
});

gulp.task('stylesheet', ['stylesheet-vendors'], function() {
    return gulp.src(appPath + '/style.scss')
        .pipe(compass(data.compass))
        .pipe(autoprefixer())
        .pipe(gulp.dest(getEnvPath()))
        .pipe(connect.reload());
});