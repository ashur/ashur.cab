'use strict';

const gulp = require( 'gulp' );
const sass = require( 'gulp-sass' );
const serve = require( 'gulp-serve' );

gulp.task( 'html', () =>
{
	return gulp.src('./src/html/*.html' )
	    .pipe( gulp.dest( './dist' ) );
});

gulp.task( 'style', () =>
{
	return gulp.src('./src/style/main.scss' )
	    .pipe( sass().on( 'error', sass.logError ) )
	    .pipe( gulp.dest( './dist' ) );
});

gulp.task( 'build', ['html','style'] );

gulp.task( 'watch', () =>
{
	gulp.watch( 'src/html/*.html', ['html'] );
	gulp.watch( 'src/style/**/*.scss', ['style'] );
});

gulp.task( 'serve', serve( 'dist' ) );
gulp.task( 'default', ['watch','serve'] );
