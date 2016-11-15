chrome.app.runtime.onLaunched.addListener(() => {
  chrome.app.window.create('dist/index.html', {
    outerBounds: {
      width: 400,
      height: 500
    },
    minWidth: 400,
    minHeight: 500
  })
})
