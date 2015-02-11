var gulp = require('gulp'),
    zip = require('gulp-zip'),

    config = require('../settings/config');

gulp.task('chrome-copy', ['build', 'clean-build'], function() {
    return gulp.src(config.path.chrome + '/**/*')
        .pipe(gulp.dest(config.path.build));
});

gulp.task('chrome', ['build', 'chrome-copy'], function() {
    return gulp.start('watcher');
});

gulp.task('chrome-zip', function() {
    var manifest = require(config.path.chrome + '/manifest'),
        distFileName = manifest.name + '.' + manifest.version + '.zip';

    gulp.src(config.path.build + '/**/*')
        .pipe(zip(distFileName))
        .pipe(gulp.dest(config.path.dist));
});