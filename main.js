`use strict`;

const QUANTITY_MOVE = 6;

const kickButton = getElement(`#btn-kick`);
const thunderButton = getElement(`#btn-thunder`);
const buttons = document.querySelectorAll(`.button`);

const character = {
  name: "Pikachu",
  defaultHP: 100,
  damageHP: 100,
  progressHealth: getElement(`#health-character`),
  progressBar: getElement(`#progressbar-character`),

  changeHP,
  renderHP,
  renderHPLife,
  renderProgressBar,
}

const enemy = {
  name: "Charmander",
  defaultHP: 100,
  damageHP: 100,
  progressHealth: getElement(`#health-enemy`),
  progressBar: getElement(`#progressbar-enemy`),
  changeHP,
  renderHP,
  renderHPLife,
  renderProgressBar,
}

function getElement(css) {
  return document.querySelector(css);
}

function random(num) {
  return Math.ceil(Math.random() * num);
}

function init() {
  character.changeHP(random(20));
  enemy.changeHP(random(20));
  renderLog();
}

function renderHPLife() {
  this.progressHealth.innerText = `${this.damageHP} / ${this.defaultHP}`;
}

function renderProgressBar() {
  this.progressBar.style.width = `${this.damageHP}%`;
}

function renderHP() {
  this.renderHPLife();
  this.renderProgressBar();
}

function changeHP(count) {
  this.damageHP -= count;

  const log = (this === character) ? generateLog(this, enemy, count) : generateLog(this, character, count);
  createLog(log);

  if (this.damageHP <= 0) {
    this.damageHP = 0;
    alert(`${this.name} проиграл бой!`);

    NodeList.prototype.forEach = Array.prototype.forEach;
    buttons.forEach(button => {
      button.disabled = `true`;
    })
  }

  this.renderHP();
}

function generateLog(firstPerson, secondPerson, count) {
  const logs = [
    `${firstPerson.name} вспомнил что-то важное, но неожиданно ${secondPerson.name}, не помня себя от испуга, ударил в предплечье врага. [Урон ${count}] У ${firstPerson.name} ${firstPerson.damageHP} / ${firstPerson.defaultHP}`,
    `${firstPerson.name} поперхнулся, и за это ${secondPerson.name} с испугу приложил прямой удар коленом в лоб врага. [Урон ${count}]. У ${firstPerson.name} ${firstPerson.damageHP} / ${firstPerson.defaultHP}`,
    `${firstPerson.name} забылся, но в это время наглый ${secondPerson.name}, приняв волевое решение, неслышно подойдя сзади, ударил. [Урон ${count}]. У ${firstPerson.name} ${firstPerson.damageHP} / ${firstPerson.defaultHP}`,
    `${firstPerson.name} пришел в себя, но неожиданно ${secondPerson.name} случайно нанес мощнейший удар. [Урон ${count}]. У ${firstPerson.name} ${firstPerson.damageHP} / ${firstPerson.defaultHP}`,
    `${firstPerson.name} поперхнулся, но в это время ${secondPerson.name} нехотя раздробил кулаком \<вырезанно цензурой\> противника.[Урон ${count}].  У ${firstPerson.name} ${firstPerson.damageHP} / ${firstPerson.defaultHP}`,
    `${firstPerson.name} удивился, а ${secondPerson.name} пошатнувшись влепил подлый удар. [Урон ${count}]. У ${firstPerson.name} ${firstPerson.damageHP} / ${firstPerson.defaultHP}`,
    `${firstPerson.name} высморкался, но неожиданно ${secondPerson.name} провел дробящий удар. [Урон ${count}]. У ${firstPerson.name} ${firstPerson.damageHP} / ${firstPerson.defaultHP}`,
    `${firstPerson.name} пошатнулся, и внезапно наглый ${secondPerson.name} беспричинно ударил в ногу противника. [Урон ${count}]. У ${firstPerson.name} ${firstPerson.damageHP} / ${firstPerson.defaultHP}`,
    `${firstPerson.name} расстроился, как вдруг, неожиданно ${secondPerson.name} случайно влепил стопой в живот соперника. [Урон ${count}]. У ${firstPerson.name} ${firstPerson.damageHP} / ${firstPerson.defaultHP}`,
    `${firstPerson.name} пытался что-то сказать, но вдруг, неожиданно ${secondPerson.name} со скуки, разбил бровь сопернику. [Урон ${count}]. У ${firstPerson.name} ${firstPerson.damageHP} / ${firstPerson.defaultHP}`
  ];

  return logs[random(logs.length) - 1];
}


function createLog(log) {
  const logs = getElement(`#logs`);

  let logElement = document.createElement(`p`);
  logElement.style.backgroundColor = `rgba(229, 243, 233, 0.3)`;
  logElement.style.paddingBottom = `5px`;

  logElement.innerText = log;
  logs.insertBefore(logElement, logs.children[0]);
};

function renderLog() {
  const logBlock = getElement(`.logs-wrapper`);
  logBlock.style.display = `flex`;
}

function makeMove(button) {
  let countClick = 0;
  let initialText = button.innerText;

  button.addEventListener(`click`, () => {
    countClick++;
    init(button);

    button.innerText = `${initialText} [${QUANTITY_MOVE - countClick}]`;

    console.log(countClick);
    if (countClick === QUANTITY_MOVE) {
      button.disabled = `true`;
    }
  });
}

makeMove(kickButton);
makeMove(thunderButton);
