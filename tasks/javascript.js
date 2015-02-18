var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    browserify = require('browserify'),
    jstify = require('jstify'),
    source = require('vinyl-source-stream');

gulp.task('jshint', function() {
    return gulp.src(['./app/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('javascript', ['jshint'], function() {
    return browserify({
            entries: ['./app/script.js'],
            debug: true,
            extensions: ['.js', '.html'],
            withImports: true
        })
        .transform('jstify')
        .bundle()
        .pipe(source('script.js'))
        .pipe(gulp.dest('./_build'));
});