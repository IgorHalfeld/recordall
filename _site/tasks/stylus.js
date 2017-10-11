
const gulp = require('gulp')
const plumber = require('gulp-plumber')
const stylus = require('gulp-stylus')
const prefixer = require('gulp-autoprefixer')
const browserSync = require('browser-sync')

/**
 * Compile CSS
 */
module.exports = () => {

  return gulp.task('stylus', () => {
    gulp.src('src/stylus/main.styl')
      .pipe(plumber())
		  .pipe(stylus({
			  compress: true
		  }))
      .pipe(prefixer({
        browsers: ['last 3 versions'],
        cascade: false
      }))
		  .pipe(gulp.dest('_site/assets/css/'))
		  .pipe(browserSync.reload({ stream: true }))
		  .pipe(gulp.dest('assets/css'))
  })
}
