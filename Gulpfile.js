var gulp = require('gulp'),
    concat = require('gulp-concat'),
    compass = require('gulp-compass'),
    swig = require('gulp-swig'),
    rename = require("gulp-rename"),
    jshint = require('gulp-jshint'),
    jasmine = require('gulp-jasmine'),
    clean = require('gulp-clean'),
    args = require('yargs').argv,
    connect = require('gulp-connect'),

    envPath = './www',
    envBrowserAction = envPath + '/src/browser_action',
    chromePath = './chrome',
    isChrome = false,

    data = require('./settings.json');

gulp.task('vendors', function() {
    var _envPath = isChrome ? envBrowserAction : envPath;

    gulp.src(data.assets.stylesheet.bower)
        .pipe(gulp.dest(_envPath + '/vendors/css'));

    gulp.src(data.assets.javascript.bower)
        .pipe(gulp.dest(_envPath + '/vendors/js'));
});

gulp.task('javascript', function() {
    var _envPath = isChrome ? envBrowserAction : envPath;

    gulp.src(['./app/**/*.js', '!./app/require.run.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default', {
            verbose: true
        }))
        .pipe(concat('script.js'))
        .pipe(gulp.dest(_envPath))
        .pipe(connect.reload());
});

gulp.task('stylesheet', function() {
    var _envPath = isChrome ? envBrowserAction : envPath;

    gulp.src('./app/style.scss')
        .pipe(compass(data.compass))
        .pipe(gulp.dest(_envPath))
        .pipe(connect.reload());
});

gulp.task('templates', function() {
    var _envPath = isChrome ? envBrowserAction : envPath;

    gulp.src('./app/**/template.html')
        .pipe(rename(function(path) {
            path.basename = path.dirname.replace("/", "-");
            path.dirname = '.';
        }))
        .pipe(gulp.dest(_envPath + '/templates/'))
        .pipe(connect.reload());
});

gulp.task('swag', function() {
    var indexFileName = isChrome ? 'browser_action' : 'index',
        _envPath = isChrome ? envBrowserAction : envPath;

    gulp.src(['./app/layout.html', './app/require.run.js'])
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
                    path.basename = indexFileName;
                break;
                case 'require.run':
                    path.extname = '.js';
                break;
            }
        }))
        .pipe(gulp.dest(_envPath))
        .pipe(connect.reload());
});

// gulp.task('tests', function () {
//     return gulp.src('tests/**/*.js')
//         .pipe(jasmine());
// });

gulp.task('clean', function() {
    return gulp.src(envPath, {
            read: false
        })
        .pipe(clean());
});

gulp.task('connect', function() {
    connect.server({
        root: envPath,
        port: 8000,
        livereload: true
    });
});

gulp.task('watcher', function() {
    gulp.watch(['./app/**/*.html'], ['swag', 'templates']);
    gulp.watch(['./app/**/*.js'], ['javascript']);
    gulp.watch(['./app/**/*.scss'], ['stylesheet']);
});

gulp.task('chrome-copy', function() {
    return gulp.src(chromePath + '/**/*')
        .pipe(gulp.dest(envPath));
});

gulp.task('web', ['clean'], function() {
    gulp.start('vendors', 'swag', 'javascript', 'stylesheet', 'templates');

    gulp.start('connect', 'watcher');
});

gulp.task('chrome', ['clean'], function() {
    isChrome = true;

    gulp.start('chrome-copy', 'vendors', 'swag', 'javascript', 'stylesheet', 'templates', 'watcher');
});

gulp.task('default');