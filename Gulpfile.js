var gulp = require('gulp');

require('./tasks/stylesheets');
require('./tasks/javascript');
require('./tasks/templates');
require('./tasks/chrome');
require('./tasks/web');
require('./tasks/deploy');
require('./tasks/utils');

gulp.task('default', function() {

});