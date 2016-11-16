
export default function (button, fx) {
  button.addEventListener('click', evt => {

    if (button.textContent == 'START RECORD') {
      fx.classList.add('pulse')
      button.classList.add('start-record-alert')
      button.textContent = 'STOP RECORD'
      return
    }

    fx.classList.remove('pulse')
    button.classList.remove('start-record-alert')
    button.textContent = 'START RECORD'
  }, false)
}
