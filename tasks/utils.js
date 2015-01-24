var gulp = require('gulp'),
    clean = require('gulp-clean');

gulp.task('build', ['clean'], function() {
    return gulp.start('stylesheet', 'javascript', 'templates');
});

gulp.task('clean', function() {
    return gulp.src('../build', {
            read: false
        })
        .pipe(clean());
});

gulp.task('watcher', function() {
    gulp.watch(['../app/**/*.html'], ['templates']);
    gulp.watch(['../app/**/*.js'], ['javascript']);
    gulp.watch(['../app/**/*.scss'], ['stylesheet']);
});