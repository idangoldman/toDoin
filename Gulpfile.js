var gulp = require('gulp');

require('./tasks/styles');
require('./tasks/scripts');
require('./tasks/templates');
require('./tasks/chrome');
require('./tasks/web');
require('./tasks/utils');
require('./tasks/deploy');

gulp.task('default', function() {

});