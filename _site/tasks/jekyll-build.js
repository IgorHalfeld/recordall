
const gulp = require('gulp')
const { spawn } = require('child_process')

/**
 * Build the static content
 * @param  {Function} done
 */
module.exports = () => {
  return gulp.task('jekyll-build', (done) => {
    spawn('bundle', ['exec', 'jekyll', 'build'], { stdio: 'inherit' })
    .on('close', done)
  })
}
