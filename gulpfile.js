var gulp = require('gulp'),
	sass = require('gulp-sass'),
	minifycss = require('gulp-minify-css'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	livereload = require('gulp-livereload'),
    concat = require('gulp-concat');

gulp.task('styles', function(){
	gulp.src('src/css/*.scss')
		.pipe(sass({outputStyle: 'expanded'})
			.on('error', sass.logError))
		.pipe(gulp.dest('dist/css'))
		.pipe(rename({suffix: '.min'}))
		.pipe(minifycss())
		.pipe(gulp.dest('dist/css'));
});

gulp.task('scripts', function () {
    gulp.src('src/js/*.js')
        // .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('watch', function() {
	gulp.watch('src/css/**/*.scss', ['styles']);
	// gulp.watch('src/js/*.js', ['scripts']);
})
gulp.task('default', function() {
	gulp.start('styles', 'scripts');
});