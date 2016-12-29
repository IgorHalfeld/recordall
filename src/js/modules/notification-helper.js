const opts = {
  type: 'basic',
  title: 'Recordall',
  iconUrl: '../recordall-128.png'
}

/**
 * Create notifications
 * @param message String with message to show on card
 * @param callback Function that will be called after finishs notification
 * @param options Object with notification configs
 */
export default function NotificationHelper (message = undefined, callback = () => {}, options = undefined) {
  if (message && !options) {
    opts.message = message
    return chrome.notifications.create(`id-${new Date().getTime()}`, opts, callback)
  }
  chrome.notifications.create(`id-${new Date().getTime()}`, options, callback)
}
