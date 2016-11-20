
export default function getPlaceWhereSave () {
  chrome.storage.sync.get('place', (place) => place ? place : undefined)
}
