var gulp = require('gulp'),
    zip = require('gulp-zip'),
    rename = require("gulp-rename"),
    config = require('../settings/config');

gulp.task('chrome-copy', ['clean-build', 'build', 'icons'], function() {
    return gulp.src(config.path.chrome + '/**/*')
        .pipe(gulp.dest(config.path.build));
});

gulp.task('icons', ['clean-build', 'build'], function() {
    gulp.src([config.path.images + '/icons/*.png'])
        .pipe(rename(function(path) {
            path.basename = 'icon' + path.basename;
        }))
        .pipe(gulp.dest(config.path.build + '/icons'));
});

gulp.task('chrome', ['build', 'chrome-copy'], function() {
    return gulp.start('watcher');
});

gulp.task('chrome-zip', function() {
    var manifest = require(config.path.chrome + '/manifest'),
        distFileName = manifest.name.toLowerCase() + '.' + manifest.version + '.zip';

    gulp.src(config.path.build + '/**/*')
        .pipe(zip(distFileName))
        .pipe(gulp.dest(config.path.dist));
});