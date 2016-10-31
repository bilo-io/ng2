var argv = require('yargs').argv;
var builder = require('systemjs-builder');
var css = require('css');
var browserSync = require('browser-sync').create();
var del = require('del');
var es = require('event-stream');
var exec = require('child_process').exec;
var fs = require('fs');
var git = require('git-rev-sync');
var gulp = require('gulp');
var gulpSass = require('gulp-sass');
var gulpUglify = require('gulp-uglify');
var gulpUtil = require('gulp-util');
var history = require('connect-history-api-fallback');
var packageJson = require('./package.json');
var sourcemaps = require('gulp-sourcemaps');
var ts = require('gulp-typescript');
var tsConfig = require('./src/tsconfig.json');
var tslint = require('gulp-tslint');
var runSequence = require('run-sequence').use(gulp);
var path = require('path');
var packageJSON = require('./package.json');
var zip = require('gulp-zip');
var jspm = require('jspm');
jspm.setPackagePath('.');
var builder = new jspm.Builder();
var jspmBuild = require('gulp-jspm-build');

var BASE = path.join(__dirname, 'src');
var DIST = './dist';
var SRC = './src';
var minificationEnabled = true;

var uglifySettings = {
    preserveLicenseComments: false,
    inline_script: true,
    warnings: false,
    mangle: {
        except:
        [
            '__require',
            'require',
            'define',
            'System.import',
            'System.require',
            'System',
        ]
    },
    beautify: {
        quote_keys: true
    },
    compress: {
        //screw_ie8: true,
        sequences: true,
        dead_code: false,
        conditionals: true,
        booleans: true,
        unused: false,
        if_return: true,
        join_vars: true,
        drop_console: true
    }
};

// FUNCTIONS
function bundle() {
    var bundleStream = es.pause();
    bundleStream.pause();

    builder.invalidate('*');
    builder.buildStatic('app/main.ts', {
        runtime: false,
        sourceMaps: 'inline',
        mangle: false,
        minify: false
    }).then(function (data) {
        var file = new gulpUtil.File({
            path: path.join(BASE, 'app/app.js'),
            base: BASE,
            contents: new Buffer(data.source)
        });

        bundleStream.write(file);
        bundleStream.resume();
        bundleStream.emit('end');
    }, gulpUtil.log);
    return bundleStream;
}
function scripts() {
    var stream = bundle()
        .pipe(replace('CODE_VER', git.short()))
        .pipe(ngAnnotate({
            add: true,
            single_quotes: true
        }));

    stream = stream.pipe(sourcemaps.init({ loadMaps: true }));

    if (minificationEnabled) {
        stream = stream.pipe(gulpUglify(uglifySettings));
    }

    return stream;
}

function html() {
    return gulp.src([
        './src/**/*.html',
        '!./src/lib/**/*.html',
        '!./src/app/components/**/*.html',
        '!./src/app/shared/**/*.html'
    ], { base: BASE })
        .pipe(preprocess({
            context: {
                ENV: argv.prod ? 'production' : 'development'
            }
        }))
        .pipe(htmlmin({
            minifyCSS: minifcationEnabled,
            minifyJS: minificationEnabled && uglifySettings,
            collapseWhitespace: true,
            conservativeCollapse: true,
            keepCosingSlash: true,
            removeComments: true,
            processScripts: ['text/ng-template']
        }));
}

// SECTION: Build
var tsFiles = [
    'src/**/*.ts',
    '!src/libs/**/*.ts',
    '!src/typings',
    '!node_modules', ,
    '!typings',
    '!dist'
];
gulp.task('build:ts', function () {
    var destination = argv.prod ? DIST : SRC;

    return gulp.src(tsFiles)
        .pipe(sourcemaps.init())
        .pipe(ts(tsConfig.compilerOptions))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(destination));
});
gulp.task('build:sass', function () {
    var destination = 'src/app/**/*.scss';

    var sassOptions = {
        errLogToConsole: true,
        outputStyle: 'expanded'
    }
    return gulp.src(destination)
        .pipe(gulpSass(sassOptions).on('error', gulpSass.logError))
        .pipe(gulp.dest('src/app'));
});

// SECTION: Bundle
gulp.task('bundle:libs', function () {
    var destination = argv.prod ? 'dist/libs' : 'src/libs';
});
gulp.task('bundle:js', function (cb) {
    exec('jspm bundle app/main dist/app.js', function (err, stdout, stderr) {
        cb(err);
    });
});
gulp.task('bundle:css', function () {
});
gulp.task('bundle:files', function (cb) {
    return gulp.src([
        'src/**/*',
        '!**/*.ts',
        '!src/app/**/*',
        '!src/libs/**/*',
        '!src/typings/**/*'
    ]).pipe(gulp.dest('dist'));
});
gulp.task('bundle', ['bundle:libs', 'bundle:js', 'bundle:css', 'bundle:files'], function (cb) {
    cb();
});

// SECTION: Development
gulp.task('dev:serve', function () {
});
gulp.task('dev:watch', function () {
});