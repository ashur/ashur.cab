'use strict';

const gulp = require( 'gulp' );
const sass = require( 'gulp-sass' );
const serve = require( 'gulp-serve' );

/* HTML */
gulp.task( 'contents', () =>
{
	return gulp.src('./src/html/**/*.*' )
	    .pipe( gulp.dest( './dist' ) );
});

/* Style */
gulp.task( 'style', () =>
{
	return gulp.src('./src/style/**/main.scss' )
	    .pipe( sass().on( 'error', sass.logError ) )
	    .pipe( gulp.dest( './dist' ) );
});
gulp.task( 'style:prod', () =>
{
	return gulp.src('./src/style/**/main.scss' )
	    .pipe( sass({ outputStyle: 'compressed' }).on( 'error', sass.logError ) )
	    .pipe( gulp.dest( './dist' ) );
});

/* Build */
gulp.task( 'build', ['contents','style'] );
gulp.task( 'build:prod', ['contents', 'style:prod'] );

/* Watch */
gulp.task( 'watch', () =>
{
	gulp.watch( 'src/html/**/*.*',  ['contents'] );
	gulp.watch( 'src/style/**/*.scss', ['style'] );
});

gulp.task( 'serve', serve( 'dist' ) );
gulp.task( 'default', ['watch','serve'] );
