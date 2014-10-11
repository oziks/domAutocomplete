var gulp    = require('gulp')
  , jshint  = require('gulp-jshint')
  , rename  = require('gulp-rename')
  , uglify  = require('gulp-uglify')
  , header  = require('gulp-header')
  , rimraf  = require('rimraf')
  , jasmine = require('gulp-jasmine')
  , pkg     = require('./package.json')
;

var banner = [
  '/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' * @license <%= pkg.license %>',
  ' */',
  ''
].join('\n');

gulp.task('jshint', function () {
  return gulp.src('src/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
  ;
});

gulp.task('jasmine', function () {
  return gulp.src('spec/*.js')
    .pipe(jasmine())
  ;
});

gulp.task('clean', function (cb) {
  return rimraf('dist', cb);
});

gulp.task('copy', function () {
   return gulp.src('src/*.js')
    .pipe(header(banner, { pkg: pkg }))
    .pipe(gulp.dest('dist'))
  ;
});

gulp.task('compress', function () {
  return gulp.src('src/*.js')
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(header(banner, { pkg: pkg }))
    .pipe(gulp.dest('dist'))
  ;
});

gulp.task('default', ['jshint', 'jasmine', 'clean', 'copy', 'compress']);
