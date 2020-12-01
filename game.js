'use strict';

import { game } from './main.js'
import { getElements, getElement, random } from './util.js'
import { generateLog, createLog, renderLog } from './logging.js'
import { createButton, buttonCount } from './button.js'


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
  button.innerText = `Restart`;

  gameoverScreen.appendChild(img);
  gameoverScreen.appendChild(p);
  gameoverScreen.appendChild(button);

  getElements(`.button`).forEach(item => item.remove());

  getElement(`.body`).appendChild(gameoverScreen);

  return button;
}


function restartClickHandler() {
  getElement(`.game-over`).remove();
  getElement(`.logs-wrapper`).style = `display: none`;
  getElements(`.log`).forEach(item => item.remove());

  getElements(`.health`).forEach(item => item.classList.remove(`low`));
  getElements(`.health`).forEach(item => item.classList.remove(`critical`));

  game.start();
}


function endGame(loser) {
  let restart = createGameoverScreen(loser);
  restart.addEventListener(`click`, restartClickHandler);
}


function characterSetings(player1, player2) {
  player1.attacks.forEach(item => {
    let button = createButton(item, player1);
    const btnCountJolt = buttonCount(button.button, button.maxCount);

    button.button.addEventListener(`click`, () => {
      btnCountJolt();

      player2.changeHP(random(item.minDamage, item.maxDamage), (count) => {
        (createLog(generateLog(player1, player2, count)));
        renderLog();
      });

      setEnemyKick(player1, player2);
    });
  });
}


function enemySettings(player2) {
  player2.frame.src = player2.img;
  player2.title.innerText = player2.name;
  player2.attacks.forEach(item => {
    createButton(item, player2).button.disabled = `true`;
  });
}

function setEnemyKick(player1, player2) {

  if (getElement(`.control__player2 button`).disabled) {
    getElement(`.control__player2 button`).disabled = false;
  }

  player1.changeHP(random(player2.attacks[0].minDamage, player2.attacks[0].maxDamage), (count) => {
      (createLog(generateLog(player2, player1, count)));
      renderLog();
  });

  setTimeout( function () {
    getElement(`.control__player2 button`).disabled = true;
  }, 200);
  
}
  
export { endGame, characterSetings, enemySettings }
