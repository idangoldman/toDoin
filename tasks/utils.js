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
    gulp.watch([appPath + '/**/*.html'], ['templates']);
    gulp.watch([appPath + '/**/*.js'], ['javascript']);
    gulp.watch([appPath + '/**/*.scss'], ['stylesheet']);
});

gulp.task('build', ['clean'], function() {
    return gulp.start('javascript', 'stylesheet', 'templates');
});