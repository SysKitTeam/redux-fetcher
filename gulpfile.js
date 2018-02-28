var gulp = require('gulp');
var gulpTypescript = require('gulp-typescript');
var merge = require('merge2');
var clean = require('gulp-clean');
var sourcemaps = require('gulp-sourcemaps');
var runSequence = require('run-sequence');
var gulpBabel = require('gulp-babel');

var tsProject = gulpTypescript.createProject('tsconfig.json');

gulp.task('default', () => {
    var tsResult = tsProject.src().pipe(sourcemaps.init()).pipe(tsProject());
    return merge([
        tsResult.dts.pipe(gulp.dest('./lib')),
        tsResult.js.pipe(sourcemaps.write()).pipe(gulpBabel({
            presets: ['es2015']
        })).pipe(gulp.dest('./lib'))
    ]);
})

gulp.task('build', function (cb) {
    return runSequence('tsc', cb);
})

gulp.task('tsc', tscTask);
gulp.task('cleanLib', cleanLib);

function cleanLib() {
    return gulp
        .src('lib', { read: false })
        .pipe(clean());
}

function babelTask() {
    return gulp.src('lib/')
}

function tscTask() {
    var tsResult = tsProject.src().pipe(sourcemaps.init()).pipe(tsProject());
    return merge([
        tsResult.dts.pipe(gulp.dest('./lib')),
        tsResult.js.pipe(sourcemaps.write()).pipe(gulp.dest('./lib'))
    ])
}
