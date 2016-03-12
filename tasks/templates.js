var gulp = require('gulp'),
    swig = require('gulp-swig'),
    rename = require("gulp-rename"),
    config = require('../settings/config');

gulp.task('index-tpl', function() {
    return gulp.src([config.path.app + '/layout.html'])
        .pipe(swig({
            defaults: {
                autoescape: false,
                cache: false,
                locals: config
            }
        }))
        .pipe(rename(function(path) {
            path.basename = 'index';
        }))
        .pipe(gulp.dest(config.path.build));
});