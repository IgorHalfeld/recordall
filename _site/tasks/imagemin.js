
const gulp = require('gulp')
const imagemin = require('gulp-imagemin')
const plumber = require('gulp-plumber')

/**
 * Minify images
 */
module.exports = () => {

  return gulp.task('imagemin', () => {
    gulp.src('src/images/**/*.{jpg,png,gif,svg}')
      .pipe(plumber())
      .pipe(imagemin({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
      }))
      .pipe(gulp.dest('assets/img'))
  })
}
