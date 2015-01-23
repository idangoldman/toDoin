var gulp = require('gulp'),
    gutil = require('gulp-util'),
    args = require('yargs').argv,

    env = args.chrome ? 'chrome' : 'web',
    envPath = './www',
    envBrowserAction = envPath + '/src/browser_action',
    chromePath = './chrome',
    isChrome = false,
    getEnvPath = function() {
        return isChrome ? envBrowserAction : envPath;
    },

    auth = require('./auth.json'),
    data = require('./settings.json');

    require('./tasks/stylesheets');
    require('./tasks/javascript');
    require('./tasks/templates');
    require('./tasks/chrome');
    require('./tasks/web');
    require('./tasks/deploy');
    require('./tasks/utils');

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