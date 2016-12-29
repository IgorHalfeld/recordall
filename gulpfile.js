
const gulp = require('gulp')
const sass = require('gulp-sass')

gulp.task('sass', () => {
  return gulp.src('src/scss/main.scss')
  .pipe(sass({
    outputStyle: 'compressed'
  }).on('error', sass.logError))
  .pipe(gulp.dest('./app/dist/'))
})

gulp.task('watch', () => {
  gulp.watch('src/scss/**/*.scss', ['sass'])
})

gulp.task('default', ['sass', 'watch'])
