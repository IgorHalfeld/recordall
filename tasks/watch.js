const gulp = require('gulp')

/**
 * Watch stylus files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
module.exports = () => {
  return gulp.task('watch', () => {
  	gulp.watch('src/stylus/**/*.styl', ['stylus'])
  	gulp.watch('src/js/**/*.js', ['js'])
  	gulp.watch('src/img/**/*.{jpg,png,gif,svg}', ['imagemin'])
  	gulp.watch([
      '**/*.html',
      'index.html',
      '_includes/**/*.html',
      '_layouts/**/*.html',
      '_posts/**/*'
    ], ['jekyll-rebuild'])
  })
}
