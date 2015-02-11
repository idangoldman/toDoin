var gulp = require('gulp'),
    swig = require('gulp-swig'),
    rename = require("gulp-rename"),

    config = require('../settings/config');

gulp.task('templates', ['swag'], function() {
    // return gulp.src('./app/**/template.html')
    //     .pipe(rename(function(path) {
    //         path.basename = path.dirname.replace("/", "-");
    //         path.dirname = '.';
    //     }))
    //     .pipe(gulp.dest('./build/templates/'));
});

gulp.task('swag', function() {
    // var fileName = isChrome ? 'browser_action' : 'index';
    var fileName = 'index';

    return gulp.src([config.path.app + '/layout.html'])
        .pipe(swig({
            defaults: {
                autoescape: false,
                cache: false,
                locals: config
            }
        }))
        .pipe(rename(function(path) {
            path.basename = fileName;
        }))
        .pipe(gulp.dest(config.path.build));
});