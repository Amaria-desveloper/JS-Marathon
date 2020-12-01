`use strict`;

import { randomElement } from './util.js'
import { Pokemon, Enemy } from './pokemon.js'
import { characterSetings, enemySettings } from './game.js'

class Game {
  getPokemons = async () => {
    const responce = await fetch(`https://reactmarathon-api.netlify.app/api/pokemons`);
    const body = await responce.json();
    
    return body;
  }

  start = async () => {
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

    characterSetings(player1, player2, enemySettings(player2));
  }
}


export const game = new Game();
game.start();
