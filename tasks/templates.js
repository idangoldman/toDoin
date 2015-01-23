var gulp = require('gulp'),
    swig = require('gulp-swig'),
    rename = require("gulp-rename");

gulp.task('templates', ['swag'], function() {
    return gulp.src(appPath + '/**/template.html')
        .pipe(rename(function(path) {
            path.basename = path.dirname.replace("/", "-");
            path.dirname = '.';
        }))
        .pipe(gulp.dest(getEnvPath() + '/templates/'))
        .pipe(connect.reload());
});

gulp.task('swag', function() {
    var fileName = isChrome ? 'browser_action' : 'index';

    return gulp.src([appPath + '/layout.html'])
        .pipe(swig({
            defaults: {
                autoescape: false,
                cache: false,
                locals: data
            }
        }))
        .pipe(rename(function(path) {
            path.basename = fileName;
        }))
        .pipe(gulp.dest(getEnvPath()))
        .pipe(connect.reload());
});