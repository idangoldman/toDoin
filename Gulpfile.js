var gulp = require('gulp');

require('./tasks/chrome');
require('./tasks/web');

require('./tasks/styles');
require('./tasks/scripts');
require('./tasks/templates');
require('./tasks/utils');
require('./tasks/deploy');
require('./tasks/page');

gulp.task('default', function() {

});