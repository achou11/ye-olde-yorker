"use strict";
const captionForm = document.querySelector(".caption-form");
const captionInput = captionForm.querySelector("[name=caption-input]");
const newCartoonButton = document.querySelector(".get-cartoon");
const cartoonImage = document.querySelector("img");
const newCaption = document.querySelector(".new-caption");
const saveButton = document.getElementById("saveNewImage");

const ENDPOINT = "https://www.newyorker.com/cartoons/random/randomAPI";

const state = {
  id: null,
  src: "",
  caption: "",
};

function createSourceLink() {
  const sourceUrl = document.getElementById("source-url");
  const isDat = window.DatArchive && window.location.origin.startsWith("dat:");
  const url = isDat
    ? `beaker://library/${window.location}`
    : "https://github.com/achou11/ye-olde-yorker";

  sourceUrl.href = url;
}

function getCartoon() {
  window
    .fetch(ENDPOINT)
    .then((res) => res.json())
    .then((data) => {
      const cartoon = data[0];

      reset();

      update(cartoon);
    })
    .catch((err) => console.error(err));
}

function update(cartoon) {
  state.id = cartoon.id;
  state.src = cartoon.src;
  cartoonImage.setAttribute("src", state.src);
}

function processSubmit(e) {
  e.preventDefault();

  newCaption.textContent =
    captionInput.value.length > 0 ? `"${captionInput.value}"` : "";

  window.localStorage.setItem(
    state.id,
    JSON.stringify({
      src: state.src,
      caption: captionInput.value.length > 0 ? `"${captionInput.value}"` : "",
    })
  );
}

function reset() {
  captionForm.reset();
  newCaption.textContent = "";
  state.id = null;
  state.src = null;
}

function clearLocalStorage() {
  window.localStorage.clear();
}

function getCenteredPosition(textWidth, canvasWidth) {
  const remainingSpace = canvasWidth - textWidth;
  return remainingSpace / 2;
}

function createCanvas() {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.setAttribute("width", cartoonImage.naturalWidth);
  canvas.setAttribute("height", cartoonImage.naturalHeight + 50);

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(cartoonImage, 0, 0);

  ctx.font = "36px serif";
  const captionText = newCaption.innerText;
  const textWidth = ctx.measureText(captionText);

  console.log("text width", textWidth);

  const xPosition = getCenteredPosition(textWidth, canvas.width);

  ctx.fillStyle = "black";
  ctx.fillText(captionText, xPosition, cartoonImage.naturalHeight + 36);

  const url = canvas.toDataURL();

  createLink(url, "test");
}

function createLink(url, fileName) {
  const link = document.createElement("a");

  link.setAttribute("href", url);
  link.setAttribute("download", fileName);

  link.click();
}

// document.addEventListener("DOMContentLoaded", getCartoon);
document.addEventListener("DOMContentLoaded", createSourceLink);
document.addEventListener("DOMContentLoaded", clearLocalStorage);
// newCartoonButton.addEventListener("click", getCartoon);
captionForm.addEventListener("submit", processSubmit);
saveButton.addEventListener("click", createCanvas);
