
export default function setPlaceWhereSave (object) {
  chrome.storage.sync.get('changed', (config) => {
    if (!config) chrome.storage.sync.set(object, () => true)
  })
}
