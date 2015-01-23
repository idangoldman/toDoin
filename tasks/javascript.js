var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    browserify = require('gulp-browserify'),
    source = require('vinyl-source-stream');

gulp.task('jshint', function() {
    return gulp.src(['./app/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default', {
            verbose: true
        }));
});

gulp.task('javascript', ['jshint'], function() {
    return gulp.src(['./app/**/*.js'])
        .pipe(browserify({
            insertGlobals : true,
            debug : !isChrome
        })
        .bundle()
        .pipe(source(data.assets.javascript.main));
        .pipe(gulp.dest(getEnvPath()))
        .pipe(connect.reload());
});

// gulp.task('browserify', ['jshint'], function() {
//     var bundleStream = browserify({
//             entries: ['./scripts/main.js'],
//             debug: true
//         })
//         .bundle()
//         .pipe(source('./core.js'));

//     return bundleStream.pipe(gulp.dest('./'));
// });