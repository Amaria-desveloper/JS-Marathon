`use strict`;

import { getElement, random } from './util.js'
import { generateLog, createLog, renderLog } from './logging.js'
import Pokemon from './pokemon.js'

const QUANTITY_MOVE = 6;
const kickButton = getElement(`#btn-kick`);
const thunderButton = getElement(`#btn-thunder`);


function makeMove(button) {
  const btnCountJolt = buttonCount(button);

  button.addEventListener(`click`, () => {
    btnCountJolt();
    character.changeHP(random(20, 60), (count) => {
      (createLog(generateLog(character, enemy, count)));
      renderLog();
    });

    enemy.changeHP(random(20, 60), (count) => {
      (createLog(generateLog(character, enemy, count)));
      renderLog();
    });
  });
}

function buttonCount(button, count = 0) {
  const initialText = button.innerText;
  button.innerText = `${initialText} [${QUANTITY_MOVE - count}]`;

  return function () {
    count++;
    button.innerText = `${initialText} [${QUANTITY_MOVE - count}]`;
    if (count === QUANTITY_MOVE) {
      button.disabled = `true`;
      alert(`Закончились ходы...`);
    }
    return count;
  }
}

const character = new Pokemon({
  name: `Pikachu`,
  type: `electric`,
  hp: 400,
  selectors: `character`,
});

const enemy = new Pokemon({
  name: `Charmander`,
  type: `fiery`,
  hp: 400,
  selectors: `enemy`,
});

makeMove(kickButton);
makeMove(thunderButton);
