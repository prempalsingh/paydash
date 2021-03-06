'use strict';

const Gulp = require('gulp');
const Sass = require('gulp-sass');
const Paths = require('../config/assets');
const Autoprefixer = require('gulp-autoprefixer');

Gulp.task('styles', function() {
    Gulp.src('./assets/styles/index.scss')
        .pipe(Sass().on('error', Sass.logError))
        .pipe(Autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(Gulp.dest('.build/css/'));
});

Gulp.task('fonts', function() {
    return Gulp.src(Paths.get('/fonts'))
        .pipe(Gulp.dest('.build/fonts'));
});

Gulp.task('images', function() {
    return Gulp.src(Paths.get('/images'))
        .pipe(Gulp.dest('.build/images'));
});

Gulp.task('misc', function() {
    return Gulp.src(Paths.get('/misc'))
        .pipe(Gulp.dest('.build/misc'));
});

Gulp.task('fonts', function() {
    return Gulp.src(Paths.get('/fonts'))
        .pipe(Gulp.dest('.build/fonts'));
});
