
const gulp = require('gulp')
const browserSync = require('browser-sync')

/**
 * Start the server
 */
module.exports = () => {
  return gulp.task('browser-sync', ['jekyll-build'], () => {
    browserSync({
      server: {
        baseDir: '_site'
      }
    })
  })
}
