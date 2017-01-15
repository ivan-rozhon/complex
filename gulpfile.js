// Include gulp
var gulp = require('gulp');

// Define base folders
var npcApp = {
    src: 'src/',
    dest: 'dist/'
};
var adminApp = {
    src: 'src/_core/admin/admin-app/',
    tmp: 'src/_core/admin/admin-app/tmp/',
    dest: 'dist/_core/admin/admin-app/'
};

// Include plugins
var plugins = require("gulp-load-plugins")({
    pattern: ['gulp-*', 'gulp.*', 'less-plugin-autoprefix', 'browser-sync'],
    replaceString: /\bgulp[\-.]/
});

// npcApp PHP
gulp.task('php', function () {
    return gulp.src(npcApp.src + '**/*.php')
        .pipe(gulp.dest(npcApp.dest));
});

// npcApp HTML
gulp.task('html', function () {
    return gulp.src([npcApp.src + '**/*.html', '!' + adminApp.src + '**/*.html'])
        .pipe(gulp.dest(npcApp.dest));
});

// npcApp Files
gulp.task('files', function () {
    return gulp.src(npcApp.src + '**/*.{ico,txt,json,png}')
        .pipe(gulp.dest(npcApp.dest));
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

gulp.task('scripts', ['npc-app-js', 'admin-app-js']);

// npcApp JS
gulp.task('npc-app-js', function () {
    return gulp.src(npcApp.src + '_core/web/_scripts/*.js')
        .pipe(plugins.concat('web.js'))
        .pipe(plugins.rename({ suffix: '.min' }))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(npcApp.dest + '_core/web/_scripts'));
});

// adminApp JS
gulp.task('admin-app-js', ['templates'], function () {
    return gulp.src([adminApp.src + '**/*.js', adminApp.tmp + 'js/templates.js'])
        .pipe(plugins.concat('app.js'))
        .pipe(plugins.ngmin())
        .pipe(plugins.rename({ suffix: '.min' }))
        .pipe(plugins.uglify({ mangle: false }))
        .pipe(gulp.dest(adminApp.dest + 'js'));
});

// CSS
gulp.task('styles', ['npc-app-styles', 'admin-app-styles']);

// npcApp CSS
gulp.task('npc-app-styles', function () {
    var autoprefix = new plugins.lessPluginAutoprefix();
    return gulp.src(npcApp.src + '_core/web/_styles/*.less')
        .pipe(plugins.less({
            plugins: [autoprefix]
        }))
        .pipe(plugins.cssmin())
        .pipe(plugins.concat('web.css'))
        .pipe(plugins.rename({ suffix: '.min' }))
        .pipe(gulp.dest(npcApp.dest + '_core/web/_styles'));
});

// adminApp CSS
gulp.task('admin-app-styles', function () {
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
    // npcApp
    gulp.watch(npcApp.src + '**/*.php', ['php']);
    gulp.watch([npcApp.src + '**/*.html', '!' + adminApp.src + '**/*.html'], ['html']);
    gulp.watch(npcApp.src + '**/*.{ico,txt,json,png}', ['files']);
    gulp.watch(npcApp.src + '_core/web/_scripts/*.js', ['npc-app-js']);
    gulp.watch(npcApp.src + '_core/web/_styles/*.less', ['npc-app-styles']);

    // adminApp
    gulp.watch([adminApp.src + '**/*.html', adminApp.src + '**/*.js'], ['admin-app-js']);
    gulp.watch(adminApp.src + '**/*.less', ['admin-app-styles']);
});

// Build Task
gulp.task('build', ['php', 'html', 'files', 'bower', 'scripts', 'styles']);

// Server Task
gulp.task('connect', function () {
    plugins.connectPhp.server(
        { base: 'dist', port: 8010, keepalive: true }, function () {
            plugins.browserSync({
                proxy: '127.0.0.1:8010',
                port: 8080,
                cors: true,
                files: ['dist/**/*', '!dist/**/*.json']
            });
        }
    );
});

// Default Task
gulp.task('default', ['build', 'watch']);