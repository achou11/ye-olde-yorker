'use strict'
const captionForm = document.querySelector('.caption-form')
const captionInput = captionForm.querySelector('[name=caption-input]')
const newCartoonButton = document.querySelector('.get-cartoon')
const cartoonImage = document.querySelector('img')
const newCaption = document.querySelector('.new-caption')

const ENDPOINT = 'https://www.newyorker.com/cartoons/random/randomAPI'

const state = {
  id: null,
  src: '',
  caption: ''
}

function createSourceLink () {
  const sourceUrl = document.getElementById('source-url')
  const isDat = window.DatArchive && window.location.origin.startsWith('dat:')
  const url = isDat
    ? `beaker://library/${window.location}`
    : 'https://github.com/achou11/ye-olde-yorker'

  sourceUrl.href = url
}

function getCartoon () {
  window
    .fetch(ENDPOINT)
    .then(res => res.json())
    .then(data => {
      const cartoon = data[0]

      reset()

      update(cartoon)
    })
    .catch(err => console.error(err))
}

function update (cartoon) {
  state.id = cartoon.id
  state.src = cartoon.src
  cartoonImage.setAttribute('src', state.src)
}

function processSubmit (e) {
  e.preventDefault()

  newCaption.textContent =
    captionInput.value.length > 0 ? `"${captionInput.value}"` : ''

  window.localStorage.setItem(
    state.id,
    JSON.stringify({
      src: state.src,
      caption: captionInput.value.length > 0 ? `"${captionInput.value}"` : ''
    })
  )
}

function reset () {
  captionForm.reset()
  newCaption.textContent = ''
  state.id = null
  state.src = null
}

function clearLocalStorage () {
  window.localStorage.clear()
}
document.addEventListener('DOMContentLoaded', getCartoon)
document.addEventListener('DOMContentLoaded', createSourceLink)
document.addEventListener('DOMContentLoaded', clearLocalStorage)
newCartoonButton.addEventListener('click', getCartoon)
captionForm.addEventListener('submit', processSubmit)
