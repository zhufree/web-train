var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cleancss = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    livereload = require('gulp-livereload'),
    concat = require('gulp-concat'),
    gulpUtil = require('gulp-util'),
    del = require('del'),
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect'),
    less = require('gulp-less');
    // jade = require('gulp-jade');

// gulp.task('styles', function(){
//     // del(['dist/css']);
//     // gulp.src('src/css/**/*.scss')
//     gulp.src('src/css/*.scss')
//         .pipe(sass({outputStyle: 'expanded'})
//             .on('error', sass.logError))
//         .pipe(gulp.dest('dist/css'))
//         .pipe(rename({suffix: '.min'}))
//         .pipe(cleancss())
//         .pipe(gulp.dest('dist/css'))
//         .pipe(connect.reload());
// });
gulp.task('styles', function(){
    // del(['dist/css']);
    // gulp.src('src/css/**/*.scss')
    gulp.src('src/css/*.less')
        .pipe(less())
        .pipe(gulp.dest('dist/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(cleancss())
        .pipe(gulp.dest('dist/css'))
        .pipe(connect.reload());
});

gulp.task('scripts', function () {
    // del(['dist/js']);
    gulp.src('src/js/**/*.js')
        // .pipe(concat('main.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify().on('error', gulpUtil.log))
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload());
});

gulp.task('html', function() {
    // gulp.src('src/html/*.jade')
    //     .pipe(jade({pretty: true}))
    //     .pipe(gulp.dest('html'))
    //     .pipe(connect.reload());

    gulp.src('html/**/*.html')
        .pipe(connect.reload());
});

// gulp.task('jade', function() {
//     gulp.src('src/html/*.jade')
//         .pipe(jade({pretty: true}))
//         .pipe(gulp.dest('html'))
//         .pipe(connect.reload());
// });

gulp.task('clean', function(cb) {
    del(['dist/css', 'dist/js'], cb);
});

gulp.task('connect', function () {
    connect.server({
        root: './',
        livereload: true
    })
});

gulp.task('watch', ['styles'], function() {
    gulp.watch('src/css/*.less', ['styles']);
    gulp.watch('src/js/**/*.js', ['scripts']);
    gulp.watch('html/**/*.html', ['html']);
    // gulp.watch('src/html/*.jade', ['html']);
    livereload.listen();
    gulp.watch(['dist/**']).on('change', livereload.changed);
    gulp.watch(['html/**']).on('change', livereload.changed);
});

gulp.task('default', ['connect', 'watch']);
