var gulp = require('gulp'),
    bump = require('gulp-bump'),
    clean = require('gulp-clean'),

    config = require('../settings/config');

gulp.task('build', ['clean-build'], function() {
    return gulp.start('index-tpl', 'styles', 'scripts', 'fonts', 'images');
});

gulp.task('clean-build', function() {
    return gulp.src(config.path.build, {
            read: false
        })
        .pipe(clean());
});

gulp.task('clean-dist', function() {
    return gulp.src(config.path.dist, {
            read: false
        })
        .pipe(clean());
});

gulp.task('fonts', function() {
    return gulp.src(config.path.fonts + '/*.woff')
        .pipe(gulp.dest(config.path.build + '/fonts'));
});

gulp.task('images', function() {
    return gulp.src([config.path.images + '/**/*.png', !config.path.images + '/icons'])
        .pipe(gulp.dest(config.path.build + '/images'));
});

// gulp.task('version-bump', function() {
//     gulp.src([config.path.chrome + '/manifest.json'])
//         .pipe(bump({type: 'patch'}))
//         .pipe(gulp.dest(config.path.chrome));

//     gulp.src([config.path.app + '/../package.json'])
//         .pipe(bump({type: 'patch'}))
//         .pipe(gulp.dest(config.path.root));
// });

gulp.task('watcher', function() {
    gulp.watch(config.path.app + '/**/*.html', ['index-tpl']);
    gulp.watch(config.path.app + '/**/*.js', ['scripts']);
    gulp.watch(config.path.app + '/**/*.scss', ['styles']);
    gulp.watch(config.path.fonts + '/*.woff', ['fonts']);
    gulp.watch(config.path.images + '/**/*.png', ['images']);
});