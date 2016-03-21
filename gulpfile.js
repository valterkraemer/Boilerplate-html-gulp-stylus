var gulp = require('gulp');
var stylus = require('gulp-stylus');
var connect = require('gulp-connect');
var inject = require('gulp-inject');
var bowerFiles = require('main-bower-files');

gulp.task('serve', ['inject', 'watch'], function() {
    connect.server({
        root: ['client'],
        port: 8000,
        livereload: true
    });
});

gulp.task('html', function() {
    gulp.src('./client/**/*.html')
        .pipe(connect.reload());
});

gulp.task('js', function() {
    gulp.src('./client/**/*.js')
        .pipe(connect.reload());
});

gulp.task('stylus', function() {
    gulp.src('./client/**/*.styl')
        .pipe(stylus())
        .pipe(gulp.dest('./client/assets'))
        .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch(['./client/**/*.html'], ['html']);
    gulp.watch(['./client/**/*.js'], ['js']);
    gulp.watch(['./client/**/*.styl'], ['stylus']);
});

gulp.task('inject', function() {

    var sources = gulp.src(['client/**/*.js', 'client/**/*.css', '!client/bower_components/**'], {
        read: false
    }, {
        relative: true
    });

    gulp.src('./client/index.html')
        .pipe(inject(gulp.src(bowerFiles(), { read: false }), {
            ignorePath: '/client/',
            addRootSlash: false,
            name: 'bower'
        }))
        .pipe(inject(sources, {
            ignorePath: '/client/',
            addRootSlash: false,
        }))
        .pipe(gulp.dest('./client'));
});

gulp.task('default', ['serve']);