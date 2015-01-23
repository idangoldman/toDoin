var gulp = require('gulp');

gulp.task('chrome-copy', ['clean'], function() {
    return gulp.src(chromePath + '/**/*')
        .pipe(gulp.dest(envPath));
});

gulp.task('chrome', ['build', 'chrome-copy'], function() {
    return gulp.start('watcher');
});