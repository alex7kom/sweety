var gulp = require('gulp');
var umd = require('gulp-umd');
var rename = require('gulp-rename');
var clone = require('gulp-clone');
var uglify = require('gulp-uglify');
var header = require('gulp-header');

var pkg = require('./package.json');

var banner = [
  '/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @author <%= pkg.author %>',
  ' * @link <%= pkg.homepage %>',
  ' * @license <%= pkg.license %>',
  ' */',
  ''
].join('\n');

var uglifyParams = {
  preserveComments: 'license'
};

gulp.task('default', function () {
  var script = gulp.src('sweety.js');

  script
    .pipe(clone())
    .pipe(header(banner, { pkg : pkg } ))
    .pipe(rename('sweety.js'))
    .pipe(gulp.dest('dist'))
    .pipe(uglify(uglifyParams))
    .pipe(rename('sweety.min.js'))
    .pipe(gulp.dest('dist'));

  script
    .pipe(clone())
    .pipe(umd())
    .pipe(header(banner, { pkg : pkg } ))
    .pipe(rename('sweety-amd.js'))
    .pipe(gulp.dest('dist'))
    .pipe(uglify(uglifyParams))
    .pipe(rename('sweety-amd.min.js'))
    .pipe(gulp.dest('dist'));
});
