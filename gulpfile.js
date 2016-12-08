var packageJson = require('./package.json');
var gulp = require('gulp');
var zip = require('gulp-zip');
var gulpSass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var tslint = require('gulp-tslint');
var runSequence = require('run-sequence').use(gulp);

var ts = require('gulp-typescript');
var tsConfig = require('./src/tsconfig.json');

var del = require('del');
var fs = require('fs');
var packageJSON = require('./package.json');
var browserSync = require('browser-sync').create();
var argv = require('yargs').argv;
var history = require('connect-history-api-fallback');

var tsFiles = [
    'src/**/*.ts',
    '!src/lib/**/*.ts',
    '!src/libs/**/*.ts',
    '!src/typings',
    '!node_modules',
    '!typings',
    '!dist'
];

var inlineCompilerOptions = {
    "target": "es5",
    "module": "commonjs",
    "moduleResolution": "node",
    "sourceMap": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "removeComments": false,
    "noImplicitAny": false,
    "noEmit": false,
    "noResolve": false
}

gulp.task('clean', function (cb) {
    if (argv.prod) {
        return del(['./dist', './package'], cb);
    }
    return del(['./src/app/**/*.js', './src/**/*.js.map', './package', './pkg'], cb);
});

gulp.task('sass', function () {
    var sassOptions = {
        errLogToConsole: true,
        outputStyle: 'expanded'
    };

    var dir = 'src/app/**/*.scss';

    return gulp.src(dir)
        .pipe(gulpSass(sassOptions).on('error', gulpSass.logError))
        .pipe(gulp.dest('src/app'));
});

gulp.task('ts', function () {
    var destinationFolder = './src'; // transpiled files remain with source files

    if (argv.prod) {
        destinationFolder = './dist';
    }

    return gulp.src(tsFiles)
        .pipe(sourcemaps.init())
        .pipe(ts(tsConfig.compilerOptions))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(destinationFolder));
});

gulp.task('sources', function (cb) {
    if (argv.prod) {
        return gulp.src(['src/**/*', '!**/*.ts', 'Web.config'])
            .pipe(gulp.dest('dist'));
    }
    cb();
});

gulp.task('libs', function (cb) {
    var libFolder = 'src/lib';
    if (argv.prod) {
        libFolder = 'dist/lib';
    }

    return gulp.src([
        'systemjs/dist/system-polyfills.js',
        'systemjs/dist/system.src.js',
        'reflect-metadata/Reflect.js',
        'rxjs/**',
        'zone.js/dist/**',
        '@angular/**',
        '@angular2-material/**',
        'leaflet/**',
        'firebase/**',
        'core-js/**'
    ], { cwd: 'node_modules/**' }) /* Glob required here. */
        .pipe(gulp.dest(libFolder));
});

gulp.task('typings', function () {
    var typingsDestination = 'src/typings';

    if (argv.prod) {
        typingsDestination = 'dist/typings';
    }

    return gulp.src('/src/typings/**')
        .pipe(gulp.dest(typingsDestination));
});

gulp.task('package', function (cb) {
    var packagePaths = [
        // 'bin/**',
        'dist/**',
        // 'server.js',
        // 'Web.config',
        // 'package.json'
    ];    
    var packageJson = packageJSON;
    var devDependencies = packageJson.devDependencies;

    for (var dependency in devDependencies) {
        packagePaths.push('!node_modules/' + dependency + '/**');
    }

    return gulp.src(packagePaths, { base: './dist' })
        .pipe(zip('pkg.zip'))
        .pipe(gulp.dest('./pkg'));
});

gulp.task('serve', ['watch'], function () {
    var root = './src';
    if (argv.prod) {
        root = './dist';
    }
    browserSync.init({
        port: 7000,
        server: {
            baseDir: root
        },
        middleware: [history()]
    });

    this.watch();
});

gulp.task('watch', function () {
    // reload when configurations change
    gulp.watch('./src/systemjs.config.js').on('change', browserSync.reload);
    // compile typescript & sass
    gulp.watch('./src/app/**/*.ts', ['ts']);
    gulp.watch('./src/app/**/*.scss', ['sass']);

    // watch updated application source files
    gulp.watch([
        './src/app/**/*.js',
        './src/app/**/*.css',
        './src/app/**/*.html',
        './src/index.html'
    ], ['server:reload']);
});

gulp.task('build', ['libs', 'ts', 'sass', 'sources'], function (cb) {
    if (argv.prod) {
        console.log('Gulp - build - PROD');
    } else {
        console.log('Gulp - build - LOCAL');
    }
    cb();
});

gulp.task('refresh', function (cb) {
    var run = ['build', 'server:reload', cb];
    return runSequence.apply(runSequence, run);
});

gulp.task('server:reload', function () {
    browserSync.reload();
})

gulp.task('test', function (cb) {
    console.log('NO UNIT TESTS WERE RUN');
    cb();
});

gulp.task('dev', function (cb) {
    var run = ['ts', 'sass', ['watch', 'serve'], cb];
    return runSequence.apply(runSequence, run);
});

gulp.task('default', function (cb) {
    console.log('Continuous Development Mode');
    var run = ['build', ['watch', 'serve'], cb];
    return runSequence.apply(runSequence, run);
});