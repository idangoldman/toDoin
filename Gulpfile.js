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

    isChrome = args.chrome || false,
    isWeb = args.web || false,

    env = args.isWeb ? 'web' : args.isChrome ? 'chrome' : 'web',
    envPath = '',
    envChromePath = '',

    data = require('./settings.json');

    // Settings per environment
    switch(env) {
        case 'chrome':
            envChromePath = './chrome_extention';
            envPath = envChromePath + '/src/browser_action';
        break;
        case 'web':
        default:
            envPath = './www';
        break;
    }

gulp.task('vendors', function() {

    if (isChrome) {
        gulp.src('./chrome/**/*', {
            read: false
        })
            .pipe(gulp.dest(envChromePath));
    }

    gulp.src(data.assets.stylesheet.bower)
        .pipe(gulp.dest(envPath + '/vendors/css'));

    gulp.src(data.assets.javascript.bower)
        .pipe(gulp.dest(envPath + '/vendors/js'));
});

gulp.task('javascript', function() {
    gulp.src('./app/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default', {
            verbose: true
        }))
    .pipe(concat('script.js'))
        .pipe(gulp.dest(envPath))
        .pipe(connect.reload());
});

gulp.task('stylesheet', function() {
    gulp.src('./app/style.scss')
        .pipe(compass(data.compass))
        .pipe(gulp.dest(envPath))
        .pipe(connect.reload());
});

gulp.task('templates', function() {
    gulp.src('./app/**/template.html')
        .pipe(rename(function(path) {
            path.basename = path.dirname.replace("/", "-");
            path.dirname = '.';
        }))
        .pipe(gulp.dest(envPath + '/templates/'))
        .pipe(connect.reload());
});

gulp.task('swag', function() {
    var fileName = isChrome ? 'browser_action' : 'index';

    gulp.src('./app/layout.html')
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
        .pipe(gulp.dest(envPath))
        .pipe(connect.reload());
});

// gulp.task('tests', function () {
//     return gulp.src('tests/**/*.js')
//         .pipe(jasmine());
// });

gulp.task('clean-dist', function() {
    var folderToClean = isChrome ? envChromePath : envPath;

    return gulp.src(folderToClean, {
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

gulp.task('watch', function() {
    gulp.watch(['./app/**/*.html'], ['swag', 'templates']);
    gulp.watch(['./app/**/*.js'], ['javascript']);
    gulp.watch(['./app/**/*.scss'], ['stylesheet']);
});

gulp.task('default', ['clean-dist', 'watch'], function() {
    if (isWeb) {
        gulp.start('connect');
    }

    gulp.start('vendors', 'swag', 'javascript', 'stylesheet', 'templates');
});