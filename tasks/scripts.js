var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    browserify = require('browserify'),
    jstify = require('jstify'),
    source = require('vinyl-source-stream'),

    config = require('../settings/config');

gulp.task('jshint', function() {
    return gulp.src([config.path.app + '/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

// gulp.task('scripts', ['jshint'], function() {
gulp.task('scripts', function() {
    return browserify({
            entries: [config.path.app + '/script.js'],
            debug: true,
            extensions: ['.js', '.html'],
            withImports: true
        })
        .transform('jstify')
        .bundle()
        .pipe(source('script.js'))
        .pipe(gulp.dest(config.path.build));
});