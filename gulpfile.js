
const gulp = require('gulp')
const sass = require('gulp-sass')
const pug = require('gulp-pug')

gulp.task('sass', () => {
  return gulp.src('src/scss/main.scss')
  .pipe(sass({
    outputStyle: 'compressed'
  }).on('error', sass.logError))
  .pipe(gulp.dest('./app/dist/'))
})

gulp.task('pug', () => {
  return gulp.src('src/views/*.pug')
  .pipe(pug())
  .pipe(gulp.dest('./app/dist/'))
})

gulp.task('watch', () => {
  gulp.watch('src/scss/**/*.scss', ['sass'])
  gulp.watch('src/views/**/*.pug', ['pug'])
})

gulp.task('default', ['sass','pug','watch'])
