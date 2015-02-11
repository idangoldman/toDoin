var gulp = require('gulp'),
    clean = require('gulp-clean'),

    config = require('../settings/config');

gulp.task('build', ['clean-build'], function() {
    return gulp.start('styles', 'scripts', 'index-tpl');
});

gulp.task('clean-build', function() {
    return gulp.src(config.path.build, {
            read: false
        })
        .pipe(clean());
});

gulp.task('clean-dist', function() {
    return gulp.src(config.path.dist, {
            read: false
        })
        .pipe(clean());
});


gulp.task('watcher', function() {
    gulp.watch([config.path.app + '/**/*.scss'], ['styles']);
    gulp.watch([config.path.app + '/**/*.js'], ['scripts']);
    gulp.watch([config.path.app + '/**/*.html'], ['index-tpl']);
});