
const gulp = require('gulp')
const sass = require('gulp-sass')
const zip = require('gulp-zip')

const version = require('./package.json').version

gulp.task('sass', function () {
  return gulp.src('src/scss/main.scss')
  .pipe(sass({
    outputStyle: 'compressed'
  }).on('error', sass.logError))
  .pipe(gulp.dest('./app/dist/'))
})

gulp.task('new-release', function () {
  return gulp.src('app/**/*')
  .pipe(zip(`recordall-${version}.zip`))
  .pipe(gulp.dest('./releases/'))
})

gulp.task('watch', function () {
  gulp.watch('src/scss/**/*.scss', ['sass'])
})

gulp.task('default', ['sass', 'watch'])
