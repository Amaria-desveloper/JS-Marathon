'use strict';

import { getElements, getElement, randomElement, random } from './util.js'
import { Pokemon, Enemy } from './pokemon.js'
import { generateLog, createLog, renderLog } from './logging.js'
import { createButton, buttonCount } from './button.js'
import { createGameoverScreen } from './notices.js'


class Game {
  getPokemons = async () => {
    const responce = await fetch(`https://reactmarathon-api.netlify.app/api/pokemons`);
    const body = await responce.json();

    return body;
  }

  characterSetings = (player1, player2) => {
    player1.attacks.forEach(item => {
      let button = createButton(item, player1);
      const btnCountJolt = buttonCount(button.button, button.maxCount);

      button.button.addEventListener(`click`, () => {
        btnCountJolt();

        player2.changeHP(random(item.minDamage, item.maxDamage), (count) => {
          (createLog(generateLog(player1, player2, count)));
          renderLog();
        });

        this.setEnemyKick(player1, player2);
      });
    });
  }

  enemySettings = (player2) => {
    player2.frame.src = player2.img;
    player2.title.innerText = player2.name;
    player2.attacks.forEach(item => {
      createButton(item, player2).button.disabled = `true`;
    });
  }

  setEnemyKick = (player1, player2) => {
    if (getElement(`.control__player2 button`)) {
      getElement(`.control__player2 button`).disabled = false;
    }

    player1.changeHP(random(player2.attacks[0].minDamage, player2.attacks[0].maxDamage), (count) => {
      (createLog(generateLog(player2, player1, count)));
      renderLog();
    });

    setTimeout(function () {
      if (getElement(`.control__player2 button`)){
        getElement(`.control__player2 button`).disabled = true;
      }
    }, 200);
  } 

  start = async() => {
    const pokemons = await this.getPokemons();
    const pikachu = pokemons.find(item => item.name === 'Pikachu');

    let player1 = new Pokemon({
      ...pikachu,
      selectors: `player1`,
    });

    let player2 = new Enemy({
      ...randomElement(pokemons),
      selectors: `player2`,
    });

    this.characterSetings(player1, player2, this.enemySettings(player2));
  }

  changeEnemy = () => {
    this.changeLevel(`player1`);
    
    // player2 = new Enemy({
    //   ...randomElement(pokemons),
    //   selectors: `player2`,
    // });
  }

  changeLevel = (player) => {
    let playerLevel = getElement(`.${player}`).querySelector(`.lvl-count`);
    let currentCount = Number(playerLevel.textContent);
    currentCount++;
    playerLevel.textContent = currentCount;
  }

  restartClickHandler = () => {
    getElement(`.game-over`).remove();
    getElement(`.logs-wrapper`).style = `display: none`;
    getElements(`.log`).forEach(item => item.remove());

    getElements(`.health`).forEach(item => item.classList.remove(`low`));
    getElements(`.health`).forEach(item => item.classList.remove(`critical`));

    this.start();
  }

  end = (loser) => {
    let restart = createGameoverScreen(loser);
    restart.addEventListener(`click`, this.restartClickHandler);
  }
}
export default Game
