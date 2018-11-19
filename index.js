'use strict';
const captionForm = document.querySelector('.caption-form')
const captionInput = captionForm.querySelector('[name=caption-input]')
const newCartoonButton = document.querySelector('.get-cartoon')
const cartoonImage = document.querySelector('img')
const newCaption = document.querySelector('.new-caption')

const ENDPOINT = 'https://www.newyorker.com/cartoons/random/randomAPI'

function processSubmit (e) {
  e.preventDefault()

  newCaption.textContent = captionInput.value.length > 0 ? `"${captionInput.value}"` : ''
}

function getCartoon () {
  fetch(ENDPOINT)
    .then(res => res.json())
    .then((data) => {
      const cartoon = data[0]
      cartoonImage.setAttribute('src', cartoon.src)
    })
    .catch((err) => console.error(err))

  captionForm.reset()
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
newCartoonButton.addEventListener('click', getCartoon)
captionForm.addEventListener('submit', processSubmit)
