var gulp = require('gulp'),
    concat = require('gulp-concat'),
    compass = require('gulp-compass'),
    autoprefixer = require('gulp-autoprefixer'),
    swig = require('gulp-swig'),
    rename = require("gulp-rename"),
    jshint = require('gulp-jshint'),
    clean = require('gulp-clean'),
    args = require('yargs').argv,
    connect = require('gulp-connect'),
    modRewrite = require('connect-modrewrite'),

    env = args.chrome ? 'chrome' : 'web',
    envPath = './www',
    envBrowserAction = envPath + '/src/browser_action',
    chromePath = './chrome',
    isChrome = false,
    getEnvPath = function() {
        return isChrome ? envBrowserAction : envPath;
    },

    data = require('./settings.json');

gulp.task('vendors', ['clean'], function() {
    gulp.src(data.assets.stylesheet.bower)
        .pipe(gulp.dest(getEnvPath() + '/vendors/css'));

    return gulp.src(data.assets.javascript.bower)
        .pipe(gulp.dest(getEnvPath() + '/vendors/js'));
});

gulp.task('jshint', function() {
    return gulp.src(['./app/**/*.js', '!./app/require-config.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default', {
            verbose: true
        }));
});

gulp.task('javascript', ['jshint'], function() {
    return gulp.src(['./app/**/*.js', '!./app/require-config.js'])
        .pipe(concat('script.js'))
        .pipe(gulp.dest(getEnvPath()))
        .pipe(connect.reload());
});

gulp.task('stylesheet', function() {
    return gulp.src('./app/style.scss')
        .pipe(compass(data.compass))
        .pipe(autoprefixer())
        .pipe(gulp.dest(getEnvPath()))
        .pipe(connect.reload());
});

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
                case 'require-config':
                    path.extname = '.js';
                break;
            }
        }))
        .pipe(gulp.dest(getEnvPath()))
        .pipe(connect.reload());
});

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

gulp.task('watcher', function() {
    gulp.watch(['./app/**/*.html'], ['templates']);
    gulp.watch(['./app/**/*.js'], ['javascript']);
    gulp.watch(['./app/**/*.scss'], ['stylesheet']);
});

gulp.task('chrome-copy', ['clean'], function() {
    return gulp.src(chromePath + '/**/*')
        .pipe(gulp.dest(envPath));
});

gulp.task('build', ['clean', 'vendors'], function() {
    return gulp.start('javascript', 'stylesheet', 'templates');
});

gulp.task('web', ['build'], function() {
    return gulp.start('connect', 'watcher');
});

gulp.task('chrome', ['build', 'chrome-copy'], function() {
    return gulp.start('watcher');
});

gulp.task('default', function() {
    switch(env) {
        case 'chrome':
            isChrome = true;
            gulp.start('chrome');
        break;
        case 'web':
        default:
            gulp.start('web');
        break;
    }
});