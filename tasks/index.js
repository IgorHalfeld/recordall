
const tasks = [
  require('./browser-sync'),
  require('./jekyll-build'),
  require('./jekyll-rebuild'),
  require('./stylus'),
  require('./javascript'),
  require('./imagemin'),
  require('./watch')
]

exports.runAll = () => tasks.map(task => task())
