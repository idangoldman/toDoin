var gulp = require('gulp'),
    clean = require('gulp-clean'),

    config = require('../settings/config');

gulp.task('build', ['clean'], function() {
    return gulp.start('styles', 'scripts', 'templates');
});

gulp.task('clean', function() {
    return gulp.src(config.path.build, {
            read: false
        })
        .pipe(clean());
});

gulp.task('watcher', function() {
    gulp.watch([config.path.app + '/**/*.html'], ['templates']);
    gulp.watch([config.path.app + '/**/*.js'], ['scripts']);
    gulp.watch([config.path.app + '/**/*.scss'], ['styles']);
});