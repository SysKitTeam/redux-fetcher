var gulp = require('gulp');
var gulpTypescript = require('gulp-typescript');
var merge = require('merge2');
var clean = require('gulp-clean');
var sourcemaps = require('gulp-sourcemaps');
var runSequence = require('run-sequence');

var tsProject = gulpTypescript.createProject('tsconfig.json');

gulp.task('build', function () {
    return runSequence('cleanLib', 'tsc');
})

gulp.task('cleanLib', () => gulp.src('lib', { read: false }).pipe(clean()));

gulp.task('tsc', () => {
    var tsResult = tsProject.src().pipe(sourcemaps.init()).pipe(tsProject());
    return merge([
        tsResult.dts.pipe(gulp.dest('./lib')),
        tsResult.js.pipe(sourcemaps.write()).pipe(gulp.dest('./lib'))
    ])
});
