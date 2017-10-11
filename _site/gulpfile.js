
const gulp = require('gulp')
const tasks = require('./tasks')

tasks.runAll()

gulp.task('default', ['stylus', 'imagemin', 'js', 'browser-sync', 'watch'])
