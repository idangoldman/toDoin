var gulp = require('gulp'),
    swig = require('gulp-swig'),
    rename = require("gulp-rename");

gulp.task('templates', ['swag'], function() {
    return gulp.src('./app/**/template.html')
        .pipe(rename(function(path) {
            path.basename = path.dirname.replace("/", "-");
            path.dirname = '.';
        }))
        .pipe(gulp.dest(getEnvPath() + '/templates/'))
        .pipe(connect.reload());
});

gulp.task('swag', function() {
    var fileName = isChrome ? 'browser_action' : 'index';

    return gulp.src(['./app/layout.html', './app/require-config.js'])
        .pipe(swig({
            defaults: {
                autoescape: false,
                cache: false,
                locals: data
            }
        }))
        .pipe(rename(function(path) {
            switch (path.basename) {
                case 'layout':
                    path.basename = fileName;
                break;
            }
        }))
        .pipe(gulp.dest(getEnvPath()))
        .pipe(connect.reload());
});