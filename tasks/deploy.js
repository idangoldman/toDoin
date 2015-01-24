var gulp = require('gulp'),
    ftp = require('gulp-ftp'),
    gutil = require('gulp-util'),

    auth = require('../settings/auth.json');

gulp.task('ftp-deploy', ['build'], function () {
    return gulp.src('../build/**/*')
        .pipe(ftp({
            host: auth.ftp.host,
            user: auth.ftp.user,
            pass: auth.ftp.pass,
            remotePath: auth.ftp.path
        }))
        .pipe(gutil.noop());
});