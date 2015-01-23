var gulp = require('gulp'),
    gutil = require('gulp-util'),
    clean = require('gulp-clean');

gulp.task('clean', function() {
    return gulp.src(envPath, {
            read: false
        })
        .pipe(clean());
});

gulp.task('watcher', function() {
    gulp.watch(['./app/**/*.html'], ['templates']);
    gulp.watch(['./app/**/*.js'], ['javascript']);
    gulp.watch(['./app/**/*.scss'], ['stylesheet']);
});

gulp.task('build', ['clean'], function() {
    return gulp.start('javascript', 'stylesheet', 'templates');
});