`use strict`;

function getElement(css) {
  return document.querySelector(css);
}

function getElements(css) {
  return document.querySelectorAll(css);
}

function random(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

function randomElement(arr) {
  return arr[Math.ceil(Math.random() * arr.length) - 1];
}

export { getElement, getElements, random, randomElement }
