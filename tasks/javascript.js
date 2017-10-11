const gulp = require('gulp')
const sourcemaps = require('gulp-sourcemaps')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const browserify = require('browserify')
const babelify = require('babelify')
const browserSync = require('browser-sync')

/**
 * Parser javascript
 */
module.exports = () => {

  const bundler = browserify('./src/js/index.js', { debug: true }).transform(babelify)

  return gulp.task('js', () => {
    bundler.bundle()
      .on('error', (err) => console.log('The browserify bundler with error:', err))
      .pipe(source('main.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./_site/assets/js'))
      .pipe(browserSync.reload({ stream: true }))
      .pipe(gulp.dest('./assets/js'))
  })
}
