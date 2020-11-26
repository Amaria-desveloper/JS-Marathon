`use strict`;

import { getElement, random, randomElement } from './util.js';

function generateLog(firstPerson, secondPerson, count) {
  const { name, hp: {current, total} } = firstPerson;
  const { name: enemyName } = secondPerson;

  const logs = [
    `${name} вспомнил что-то важное, но неожиданно ${enemyName}, не помня себя от испуга, ударил в предплечье врага. [Урон ${count}] У ${name} ${current} / ${total}`,
    `${name} поперхнулся, и за это ${enemyName} с испугу приложил прямой удар коленом в лоб врага. [Урон ${count}]. У ${name} ${current} / ${total}`,
    `${name} забылся, но в это время наглый ${enemyName}, приняв волевое решение, неслышно подойдя сзади, ударил. [Урон ${count}]. У ${name} ${current} / ${total}`,
    `${name} пришел в себя, но неожиданно ${enemyName} случайно нанес мощнейший удар. [Урон ${count}]. У ${name} ${current} / ${total}`,
    `${name} поперхнулся, но в это время ${enemyName} нехотя раздробил кулаком \<вырезанно цензурой\> противника.[Урон ${count}].  У ${name} ${current} / ${total}`,
    `${name} удивился, а ${enemyName} пошатнувшись влепил подлый удар. [Урон ${count}]. У ${name} ${current} / ${total}`,
    `${name} высморкался, но неожиданно ${enemyName} провел дробящий удар. [Урон ${count}]. У ${name} ${current} / ${total}`,
    `${name} пошатнулся, и внезапно наглый ${enemyName} беспричинно ударил в ногу противника. [Урон ${count}]. У ${name} ${current} / ${total}`,
    `${name} расстроился, как вдруг, неожиданно ${enemyName} случайно влепил стопой в живот соперника. [Урон ${count}]. У ${name} ${current} / ${total}`,
    `${name} пытался что-то сказать, но вдруг, неожиданно ${enemyName} со скуки, разбил бровь сопернику. [Урон ${count}]. У ${name} ${current} / ${total}`
  ];
  
  return logs[randomElement(logs.length) - 1];
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

export { generateLog, createLog, renderLog }
