// Include gulp
var gulp = require('gulp');

// Define base folders
var adminApp = {
    src: '_core/admin/admin-app/src/',
    dest: '_core/admin/admin-app/dist/',
    tmp: '_core/admin/admin-app/tmp/'
}

// Include plugins
var plugins = require("gulp-load-plugins")({
    pattern: ['gulp-*', 'gulp.*'],
    replaceString: /\bgulp[\-.]/
});

// adminApp Templates
gulp.task('templates', function () {
    return gulp.src(adminApp.src + '**/*.html')
        .pipe(plugins.htmlmin({ collapseWhitespace: true }))
        .pipe(plugins.ngTemplates({
            filename: 'templates.js',
            module: 'adminApp.templates',
            path: function (path, base) {
                return path.replace(base, '').replace('/templates', '');
            }
        }))
        .pipe(gulp.dest(adminApp.tmp + 'js'));
});

// adminApp JS
gulp.task('scripts', ['templates'], function () {
    return gulp.src([adminApp.src + '**/*.js', adminApp.tmp + 'js/templates.js'])
        .pipe(plugins.concat('app.js'))
        // .pipe(gulp.dest(adminApp.dest + 'js'))
        .pipe(plugins.ngmin())
        .pipe(plugins.rename({ suffix: '.min' }))
        .pipe(plugins.uglify({ mangle: false }))
        .pipe(gulp.dest(adminApp.dest + 'js'));
});

// Watch for changes in files
gulp.task('watch', function () {
    gulp.watch([adminApp.src + '**/*.html', adminApp.src + '**/*.js'], ['scripts']);
});

// Default Task
gulp.task('default', ['scripts', 'watch']);