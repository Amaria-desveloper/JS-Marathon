'use strict';

import { getElement, getElements, randomElement } from './util.js'
import game  from './main.js'

class Selectors {
  constructor(name) {
    this.controls = getElement(`.control__${name}`);
    this.progressHealth = getElement(`#health-${name}`);
    this.progressbar = getElement(`#progressbar-${name}`);
    this.frame = getElement(`.${name}`).querySelector(`img`);
    this.title = getElement(`.${name}`).querySelector(`.name`);
  }
}


class Pokemon extends Selectors {
  constructor( {name, hp, type, selectors, attacks = []} ) {
    super(selectors);

    this.name = name;
    this.hp = {
      current: hp,
      total: hp,
    };
    this.type = type;
    this.attacks = attacks;
       
    this.renderHP();
  }

  changeHP = (count, cb) => {

    const { hp: current } = this;
    this.hp.current -= count;

    if (this.hp.current <= 0) {
      this.hp.current = 0;

      if (this !== `player1`) {
        game.changeEnemy();
      } 
      
      let loser = this.name;
      game.end(loser);
    }

    this.renderHP();
    cb && cb(count);
  }

  renderHPLife = () => {
    const { progressHealth, hp: {current, total} } = this;
    progressHealth.innerText = `${current} / ${total}`;
  }

  renderProgressBar = () => {
    const { hp: {current, total}, progressbar } = this;

    if (current > 20 && current <= 60) {
      progressbar.classList.toggle(`low`);
    } else if ( current > 0 && current <= 20) {
      progressbar.classList.toggle(`critical`);
    } 

    progressbar.style.width = `${current / (total / 100)}%`;
  }

  renderHP = () => {
    this.renderHPLife();
    this.renderProgressBar();
  }
}


class Enemy extends Pokemon {
  constructor({ name, hp, type, selectors, attacks, img }) {
    super({ name, hp, type, selectors, attacks });
    this.img = img;
  } 
}

export { Pokemon, Enemy }
