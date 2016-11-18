chrome.app.runtime.onLaunched.addListener(function () {
  chrome.app.window.create('dist/index.html', {
    outerBounds: {
      width: 600,
      height: 500
    }
  })
})
