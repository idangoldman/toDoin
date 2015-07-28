var gulp = require('gulp'),
    ftp = require('gulp-ftp'),
    ssh = require('gulp-ssh'),
    fs = require('fs'),
    gutil = require('gulp-util'),

    auth = require('../settings/auth.json');

gulp.task('ftp-deploy', function () {
    return gulp.src('./_build/**/*')
        .pipe(ftp({
            host: auth.ftp.host,
            user: auth.ftp.user,
            pass: auth.ftp.pass,
            remotePath: auth.ftp.path
        }))
        .pipe(gutil.noop());
});

gulp.task('page-deploy', function () {
    var pageSSH = new ssh({
      ignoreErrors: false,
      sshConfig: {
          host: auth.ssh.host,
          port: auth.ssh.port,
          username: auth.ssh.username,
          privateKey: fs.readFileSync( auth.ssh.privateKey )
        }
    })

    return gulp.src('./_build/**/*')
        .pipe(pageSSH.dest( auth.ssh.path.page ))
        .pipe(gutil.noop());
});