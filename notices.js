'use strict';

import { getElements, getElement } from './util.js'

function createGameoverScreen(loser) {
  const gameoverScreen = document.createElement(`div`);
  gameoverScreen.classList.add(`game-over`);
  gameoverScreen.style = `display: flex; flex-flow: column wrap; width: 100%; height: 100%; position: fixed; top: 50px; left: 0; z-index: 1`;

  const img = document.createElement(`img`);
  img.style = `display: block; margin: 0 auto`;
  img.src = `./assets/gameover.png`;

  const p = document.createElement(`p`);
  p.style = `font-family: "Heebo", sans-serif; font-size: 30px; color: black; background-color: yellow`;
  p.innerText = `${loser} проиграл бой!`;

  const button = document.createElement(`button`);
  button.classList.add(`button`);
  button.style = `display: block; margin: 0 auto; width: 300px`;
  button.innerText = `Продолжить битву`;

  //gameoverScreen.appendChild(img);
  gameoverScreen.appendChild(p);
  gameoverScreen.appendChild(button);

  getElements(`.button`).forEach(item => item.remove());

  getElement(`.body`).appendChild(gameoverScreen);

  return button;
}

export { createGameoverScreen }