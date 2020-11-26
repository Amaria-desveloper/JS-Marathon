import { getElement, getElements } from './util.js'

const buttons = getElements(`.button`);

class Selectors {
  constructor(name) {
    this.progressHealth = getElement(`#health-${name}`);
    this.progressbar = getElement(`#progressbar-${name}`);
  }
}

class Pokemon extends Selectors {
  constructor({name, hp, type, selectors}) {
    super(selectors);

    this.name = name;
    this.hp = {
      current: hp,
      total: hp,
    };
    this.type = type;
    this.renderHP();
  }


  changeHP = (count, cb) => {
    const { hp: current } = this;
    this.hp.current -= count;

    if (this.hp.current <= 0) {
      this.hp.current = 0;
      alert(`${this.name} проиграл бой!`);

      for (let button of buttons) {
        button.disabled = `true`;
      }
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
    progressbar.style.width = `${current / (total / 100)}%`;
  }

  renderHP = () => {
    this.renderHPLife();
    this.renderProgressBar();
  }
}

export default Pokemon
