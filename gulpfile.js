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
    pattern: ['gulp-*', 'gulp.*', 'less-plugin-autoprefix'],
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
        .pipe(plugins.ngmin())
        .pipe(plugins.rename({ suffix: '.min' }))
        .pipe(plugins.uglify({ mangle: false }))
        .pipe(gulp.dest(adminApp.dest + 'js'));
});

// adminApp CSS
gulp.task('styles', function () {
    var autoprefix = new plugins.lessPluginAutoprefix();
    return gulp.src(adminApp.src + '**/*.less')
        .pipe(plugins.less({
            plugins: [autoprefix]
        }))
        .pipe(plugins.cssmin())
        .pipe(plugins.concat('app.css'))
        .pipe(plugins.rename({ suffix: '.min' }))
        .pipe(gulp.dest(adminApp.dest + 'css'));
});

// Bower Components JS
gulp.task('bower-js', function () {
    return gulp.src('./bower.json')
        .pipe(plugins.mainBowerFiles())
        .pipe(plugins.filter('**/*.js'))
        .pipe(plugins.concat('lib.js'))
        .pipe(plugins.rename({ suffix: '.min' }))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(adminApp.dest + 'js'));
});

// Bower Components CSS
gulp.task('bower-css', function () {
    return gulp.src('./bower.json')
        .pipe(plugins.mainBowerFiles())
        .pipe(plugins.filter('**/*.css'))
        .pipe(plugins.cssmin())
        .pipe(plugins.concat('lib.css'))
        .pipe(plugins.rename({ suffix: '.min' }))
        .pipe(gulp.dest(adminApp.dest + 'css'));
});

// Bower Components
gulp.task('bower', ['bower-js', 'bower-css']);

// Watch for changes in files
gulp.task('watch', function () {
    gulp.watch([adminApp.src + '**/*.html', adminApp.src + '**/*.js'], ['scripts']);
    gulp.watch(adminApp.src + '**/*.less', ['styles']);
});

// Default Task
gulp.task('default', ['bower', 'scripts', 'styles', 'watch']);