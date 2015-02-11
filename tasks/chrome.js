var gulp = require('gulp'),
    zip = require('gulp-zip'),

    config = require('../settings/config');

gulp.task('chrome-copy', ['clean'], function() {
    return gulp.src(config.path.chrome + '/**/*')
        .pipe(gulp.dest(config.path.build));
});

gulp.task('chrome', ['build', 'chrome-copy'], function() {
    return gulp.start('watcher');
});

// gulp.task('zip', ['build', 'chrome-copy'], function() {
//     var manifest = require('./src/manifest'),
//         distFileName = manifest.name + ' v' + manifest.version + '.zip',
//         mapFileName = manifest.name + ' v' + manifest.version + '-maps.zip';

//     gulp.src('build/scripts/**/*.map')
//         .pipe(zip(mapFileName))
//         .pipe(gulp.dest('dist'));

//     return gulp.src(['build/**', '!build/scripts/**/*.map'])
//         .pipe(zip(distFileName))
//         .pipe(gulp.dest('dist'));
// });