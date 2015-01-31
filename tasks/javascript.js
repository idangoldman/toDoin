var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    browserify = require('browserify'),
    handlebarsify = require('handlebarsify'),
    source = require('vinyl-source-stream');

gulp.task('jshint', function() {
    return gulp.src(['./app/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default', {
            verbose: true
        }));
});

gulp.task('javascript', ['jshint'], function() {
    var bundleStream = browserify({
            insertGlobals : true,
            entries: ['./app/script.js'],
            debug: true
        })
        .transform(handlebarsify)
        .bundle()
        .pipe(source('./script.js'));

    return bundleStream.pipe(gulp.dest('./_build'));
});