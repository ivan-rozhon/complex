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
var adminApp2 = {
    src: 'src/_core/admin2/admin-app/',
    dest: 'dist/_core/admin2/admin-app/'
};

// Include plugins
var plugins = require("gulp-load-plugins")({
    pattern: [
        'gulp-*',
        'gulp.*',
        'less-plugin-autoprefix',
        'browser-sync',
        'yargs',
        'merge-stream',
        'autoprefixer',
        'browserify',
        'del',
        'vinyl-source-stream',
        'vinyl-buffer',
        'run-sequence'
    ],
    replaceString: /\bgulp[\-.]/
});

// npcApp PHP
gulp.task('php', function () {
    return gulp.src(npcApp.src + '**/*.php')
        .pipe(gulp.dest(npcApp.dest));
});

// npcApp HTML
gulp.task('html', function () {
    return gulp.src([npcApp.src + '**/*.html', '!' + adminApp.src + '**/*.html', '!' + adminApp2.src + '**/*.html'])
        .pipe(gulp.dest(npcApp.dest));
});

// npcApp Files
gulp.task('files', function () {
    return gulp.src([npcApp.src + '**/*.{ico,txt,json,png}', '!' + adminApp2.src + '**/*'])
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
gulp.task('npc-app-js-main', function () {
    return gulp.src(npcApp.src + '_core/web/scripts/*.js')
        .pipe(plugins.babel())
        .pipe(plugins.concat('web.js'))
        .pipe(gulp.dest(npcApp.dest + '_core/web/scripts'));
});

// clean npcApp JS Modules directory
// gulp.task('clean-modules', function () {
//     return plugins.del([npcApp.dest + '_core/web/scripts/modules']);
// });

// get all npcApp JS Modules
gulp.task('npc-app-js-modules', [/*'clean-modules', */'npc-app-js-main'], function () {
    return gulp.src([npcApp.src + '_core/web/scripts/modules/*.js', 'node_modules/babel-polyfill/dist/polyfill.js'])
        .pipe(plugins.babel())
        .pipe(gulp.dest(npcApp.dest + '_core/web/scripts/modules'));
});

// bundle npcApp JS Modules
gulp.task('npc-app-js-modules-bundle', ['npc-app-js-modules'], function () {
    return plugins.browserify([npcApp.dest + '_core/web/scripts/web.js']).bundle()
        .pipe(plugins.vinylSourceStream('web.js'))
        .pipe(plugins.vinylBuffer())
        .pipe(plugins.if(!plugins.yargs.argv.prod, plugins.sourcemaps.init()))
        .pipe(plugins.uglify())
        .pipe(plugins.rename({ suffix: '.min' }))
        .pipe(plugins.if(!plugins.yargs.argv.prod, plugins.sourcemaps.write('.')))
        .pipe(gulp.dest(npcApp.dest + '_core/web/scripts'));
});

// delete 'web.js' after all npc-app-js sub tasks
gulp.task('npc-app-js', ['npc-app-js-modules-bundle'], function () {
    return plugins.del([npcApp.dest + '_core/web/scripts/web.js']);
});

// adminApp JS
gulp.task('admin-app-js', ['templates'], function () {
    return gulp.src([adminApp.src + '**/*.js', adminApp.tmp + 'js/templates.js'])
        .pipe(plugins.if(!plugins.yargs.argv.prod, plugins.sourcemaps.init()))
        .pipe(plugins.babel())
        .pipe(plugins.concat('app.js'))
        .pipe(plugins.ngmin())
        .pipe(plugins.rename({ suffix: '.min' }))
        .pipe(plugins.uglify({ mangle: false }))
        .pipe(plugins.if(!plugins.yargs.argv.prod, plugins.sourcemaps.write('.')))
        .pipe(gulp.dest(adminApp.dest + 'js'));
});

// CSS
gulp.task('styles', ['npc-app-styles', 'admin-app-styles']);

// npcApp CSS
gulp.task('npc-app-styles', function () {
    // .less files
    var autoprefix = new plugins.lessPluginAutoprefix();
    var lessStream = gulp.src(npcApp.src + '_core/web/**/*.less')
        .pipe(plugins.less({
            plugins: [autoprefix]
        }))
        .pipe(plugins.concat('web-less.css'));

    // .scss files
    var scssStream = gulp.src(npcApp.src + '_core/web/**/*.scss')
        .pipe(plugins.sass())
        .pipe(plugins.concat('web-scss.css'));

    // merge all together
    var mergedStream = plugins.mergeStream(lessStream, scssStream)
        .pipe(plugins.cssmin())
        .pipe(plugins.concat('web.css'))
        .pipe(plugins.postcss([plugins.autoprefixer()]))
        .pipe(plugins.rename({ suffix: '.min' }))
        .pipe(gulp.dest(npcApp.dest + '_core/web/styles'));

    return mergedStream;
});

// adminApp CSS
gulp.task('admin-app-styles', function () {
    var autoprefix = new plugins.lessPluginAutoprefix();
    return gulp.src(adminApp.src + '**/*.less')
        // .pipe(plugins.sourcemaps.init())
        .pipe(plugins.less({
            plugins: [autoprefix]
        }))
        .pipe(plugins.cssmin())
        .pipe(plugins.concat('app.css'))
        .pipe(plugins.rename({ suffix: '.min' }))
        // .pipe(plugins.sourcemaps.write('.'))
        .pipe(gulp.dest(adminApp.dest + 'css'));
});

// Bower Components JS - Admin
gulp.task('bower-js-admin', function () {
    return gulp.src('./bower.json')
        .pipe(plugins.mainBowerFiles({
            group: 'admin'
        }))
        .pipe(plugins.filter('**/*.js'))
        .pipe(plugins.concat('lib.js'))
        .pipe(plugins.rename({ suffix: '.min' }))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(adminApp.dest + 'js'));
});

// Bower Components JS - Web
gulp.task('bower-js-web', function () {
    return gulp.src('./bower.json')
        .pipe(plugins.mainBowerFiles({
            group: 'web'
        }))
        .pipe(plugins.filter('**/*.js'))
        .pipe(plugins.concat('lib.js'))
        .pipe(plugins.rename({ suffix: '.min' }))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(npcApp.dest + '_core/web/scripts'));
});

// Bower Components CSS - Admin
gulp.task('bower-css-admin', function () {
    return gulp.src('./bower.json')
        .pipe(plugins.mainBowerFiles({
            group: 'admin'
        }))
        .pipe(plugins.filter('**/*.css'))
        .pipe(plugins.cssmin())
        .pipe(plugins.concat('lib.css'))
        .pipe(plugins.rename({ suffix: '.min' }))
        .pipe(gulp.dest(adminApp.dest + 'css'));
});

// Bower Components CSS - Web
gulp.task('bower-css-web', function () {
    return gulp.src('./bower.json')
        .pipe(plugins.mainBowerFiles({
            group: 'web',
            overrides: {
                bootstrap: {
                    main: [
                        './dist/css/*.min.*'
                    ]
                },
                "font-awesome": {
                    main: [
                        './css/*.min.*'
                    ]
                }
            }
        }))
        .pipe(plugins.filter('**/*.css'))
        .pipe(plugins.cssmin())
        .pipe(plugins.concat('lib.css'))
        .pipe(plugins.rename({ suffix: '.min' }))
        .pipe(gulp.dest(npcApp.dest + '_core/web/styles'));
});

// Bower Components Fonts - Web
gulp.task('bower-fonts-web', function () {
    return gulp.src('./bower.json')
        .pipe(plugins.mainBowerFiles({
            group: 'web',
            overrides: {
                "font-awesome": {
                    main: [
                        './fonts/*.*'
                    ]
                }
            }
        }))
        // if folder structure needed
        // .pipe(plugins.flatten({ includeParents: [0, -4] }))
        // .pipe(plugins.filter('**/*.{eot,svg,ttf,woff,woff2}'))
        // .pipe(gulp.dest(npcApp.dest + '_core/web/styles'));

        // all to one dir
        .pipe(plugins.rename({ dirname: '' }))
        .pipe(plugins.filter('**/*.{eot,svg,ttf,woff,woff2}'))
        .pipe(gulp.dest(npcApp.dest + '_core/web/fonts'));
});

// Bower Components
gulp.task('bower', ['bower-js-admin', 'bower-js-web', 'bower-css-admin', 'bower-css-web', 'bower-fonts-web']);

// Watch for changes in files
gulp.task('watch', function () {
    // npcApp
    gulp.watch(npcApp.src + '**/*.php', ['php']);
    gulp.watch([npcApp.src + '**/*.html', '!' + adminApp.src + '**/*.html', '!' + adminApp2.src + '**/*.html'], ['html']);
    gulp.watch(npcApp.src + '**/*.{ico,txt,json,png}', ['files']);
    gulp.watch(npcApp.src + '_core/web/**/*.js', ['npc-app-js']);
    gulp.watch(npcApp.src + '_core/web/**/*.{less,scss}', ['npc-app-styles']);

    // adminApp
    gulp.watch([adminApp.src + '**/*.html', adminApp.src + '**/*.js'], ['admin-app-js']);
    gulp.watch(adminApp.src + '**/*.less', ['admin-app-styles']);
});

// Build Task
gulp.task('build', function (callback) {
    plugins.runSequence(
        'clean',
        ['php', 'html', 'files', 'bower', 'scripts', 'styles'],
        callback
    );
});

// Clean Task
gulp.task('clean', function () {
    return plugins.del([npcApp.dest]);
});

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