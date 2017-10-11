
const gulp = require('gulp')
const browserSync = require('browser-sync')

/**
 * Reload the server and
 * re-build jekyll
 */
module.exports = () => {
  return gulp.task('jekyll-rebuild', ['jekyll-build'], () => {
    browserSync.reload()
  })
}
