`use strict`;

import { randomElement } from './util.js'
import { Pokemon, Enemy } from './pokemon.js'
import { pokemons } from "./pokemons.js"
import { characterSetings, enemySettings } from './game.js'



function startGame() {
  const pikachu = pokemons.find(item => item.name === 'Pikachu');

  let player1 = new Pokemon({
    ...pikachu,
    selectors: `player1`,
  });

  let player2 = new Enemy({
    ...randomElement(pokemons),
    selectors: `player2`,
  });

  makeMove(player1, player2);
}

function makeMove(player1, player2) {
  characterSetings(player1, player2, enemySettings(player2));
}

startGame();

export default startGame;
