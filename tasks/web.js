var gulp = require('gulp'),
    connect = require('gulp-connect'),
    modRewrite = require('connect-modrewrite');

gulp.task('connect', function() {
    connect.server({
        root: envPath,
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

// var gulp = require('gulp'),
//     open = require('gulp-open'),
//     config = require('../config'),
//     paths = config.paths;

// gulp.task('open-build', function() {
//     var page = '/demo/index.html',
//         url = 'http' + (config.https ? 's' : '') + '://' + config.host + ':' + config.port;
//     return gulp.src(paths.build.root + page)
//         .pipe(open('', { url: url + page }));
// });