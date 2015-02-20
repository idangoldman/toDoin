var gulp = require('gulp'),
    connect = require('gulp-connect'),
    modRewrite = require('connect-modrewrite'),

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

gulp.task('web', ['build'], function() {
    return gulp.start('connect', 'watcher');
});