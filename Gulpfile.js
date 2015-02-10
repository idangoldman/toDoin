var gulp = require('gulp');

require('./tasks/stylesheets');
require('./tasks/javascript');
require('./tasks/templates');
require('./tasks/chrome');
require('./tasks/web');
require('./tasks/utils');
require('./tasks/deploy');

gulp.task('default', function() {

});