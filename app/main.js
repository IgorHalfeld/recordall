chrome.app.runtime.onLaunched.addListener(function (launchData) {
  chrome.app.window.create('dist/index.html', {
    resizable: false,
    outerBounds: {
      width: 600,
      height: 500
    },
  }, function (win) {
    win.contentWindow.launchData = launchData
  })
})
