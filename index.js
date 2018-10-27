// 'use strict;'
const submitCaption = document.querySelector('.submit-caption')
const caption = submitCaption.querySelector('[name=caption-input]')
const getCartoonButton = document.querySelector('.get-cartoon')
const cartoonContainer = document.querySelector('.cartoon-container')

const state = {}
const url = 'https://www.newyorker.com/cartoons/random/randomAPI'

function processSubmit (e) {
  e.preventDefault()

  state.newCaption = caption.value

  renderCartoon()
}

function getCartoon () {
  if (state.newCaption) {
    state.newCaption = null
  }

  fetch(url)
    .then(res => res.json())
    .then((data) => {
      const cartoon = data[0]

      // if (!cartoon.caption) { console.log('no caption'); return }
      state.imageSource = cartoon.src
      state.originalCaption = cartoon.caption
      state.date = new Date(cartoon.date).toUTCString()

      renderCartoon()
    })
    .catch((err) => console.error(err))

  submitCaption.reset()
}

function renderCartoon () {
  const captionText = state.newCaption ? `"${state.newCaption}"` : ''

  cartoonContainer.innerHTML = state.imageSource
    ? `
    <img src="${state.imageSource}" alt="cartoon">
    <div class="new-caption italic margin-top-medium">${captionText}</div>
    `
    : 'nothing here'
}

function createSourceLink () {
  const sourceUrl = document.getElementById('source-url')
  const isDat = window.DatArchive && window.location.origin.startsWith('dat:')
  const url = isDat
    ? `beaker://library/${window.location}`
    : 'https://github.com/achou11/ye-olde-yorker'

  sourceUrl.href = url
}

document.addEventListener('DOMContentLoaded', getCartoon)
document.addEventListener('DOMContentLoaded', createSourceLink)
getCartoonButton.addEventListener('click', getCartoon)
submitCaption.addEventListener('submit', processSubmit)
