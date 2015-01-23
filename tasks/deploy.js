var gulp = require('gulp'),
    ftp = require('gulp-ftp');

gulp.task('ftp-deploy', ['build'], function () {
    return gulp.src('./www/**/*')
        .pipe(ftp({
            host: auth.ftp.host,
            user: auth.ftp.user,
            pass: auth.ftp.pass,
            remotePath: auth.ftp.path
        }))
        .pipe(gutil.noop());
});