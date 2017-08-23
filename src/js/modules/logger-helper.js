
/**
 * Logger helper
 * @param  {String} message a message to log
 * @param  {String} type logger type
 */
export default function logger (message = 'Pass a message to logger', type = 'normal') {
  switch (type) {
    case 'normal':
      console.log(message)
      return
    case 'info':
      console.info(message)
      return
    case 'error':
      console.error(message)
      return
    default:
  }
}
