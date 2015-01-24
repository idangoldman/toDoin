var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    browserify = require('gulp-browserify'),
    source = require('vinyl-source-stream');

gulp.task('jshint', function() {
    return gulp.src(['../app/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default', {
            verbose: true
        }));
});

gulp.task('javascript', ['jshint'], function() {
    var bundleStream = browserify({
            insertGlobals : true,
            entries: ['../app/script.js'],
            debug: true
        })
        .bundle()
        .pipe(source('./script.js'));

    return bundleStream.pipe(gulp.dest('../build'));
});

// gulp.task('browserify', ['jshint'], function() {
//     var bundleStream = browserify({
//             insertGlobals : true,
//             entries: ['./scripts/main.js'],
//             debug: true
//         })
//         .bundle()
//         .pipe(source('./core.js'));

//     return bundleStream.pipe(gulp.dest('./'));
// });