var gulp = require('gulp'),
    connect = require('gulp-connect'),
    modRewrite = require('connect-modrewrite'),
    open = require('gulp-open'),

    config = require('../settings/config');

gulp.task('connect', function() {
    connect.server({
        root: config.path.build,
        port: 8000,
        livereload: true,
        middleware: function(connect, opt) {
            return [
                modRewrite([
                    '!\\.html|\\.js|\\.css|\\.png$ /index.html [L]'
                ])
            ];
        }
    });
});

gulp.task('open-web', ['connect'], function() {
    return gulp.src(config.path.build + '/index.html')
        .pipe(open('', {
            url: 'http://localhost:8000',
            app: 'google chrome'
        }));
});

gulp.task('web', ['build'], function() {
    return gulp.start('connect', 'open-web', 'watcher');
});