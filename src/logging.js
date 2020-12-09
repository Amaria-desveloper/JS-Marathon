`use strict`;

import { getElement, randomElement } from './util.js';


function generateLog(firstPerson, secondPerson, count) {
  const { name, hp: {current, total} } = firstPerson;
  const { name: player2Name } = secondPerson;

  const logs = [
    `${name} вспомнил что-то важное, но неожиданно ${player2Name}, не помня себя от испуга, ударил в предплечье врага. [Урон ${count}] У ${name} ${current} / ${total}`,
    `${name} поперхнулся, и за это ${player2Name} с испугу приложил прямой удар коленом в лоб врага. [Урон ${count}]. У ${name} ${current} / ${total}`,
    `${name} забылся, но в это время наглый ${player2Name}, приняв волевое решение, неслышно подойдя сзади, ударил. [Урон ${count}]. У ${name} ${current} / ${total}`,
    `${name} пришел в себя, но неожиданно ${player2Name} случайно нанес мощнейший удар. [Урон ${count}]. У ${name} ${current} / ${total}`,
    `${name} поперхнулся, но в это время ${player2Name} нехотя раздробил кулаком \<вырезанно цензурой\> противника.[Урон ${count}].  У ${name} ${current} / ${total}`,
    `${name} удивился, а ${player2Name} пошатнувшись влепил подлый удар. [Урон ${count}]. У ${name} ${current} / ${total}`,
    `${name} высморкался, но неожиданно ${player2Name} провел дробящий удар. [Урон ${count}]. У ${name} ${current} / ${total}`,
    `${name} пошатнулся, и внезапно наглый ${player2Name} беспричинно ударил в ногу противника. [Урон ${count}]. У ${name} ${current} / ${total}`,
    `${name} расстроился, как вдруг, неожиданно ${player2Name} случайно влепил стопой в живот соперника. [Урон ${count}]. У ${name} ${current} / ${total}`,
    `${name} пытался что-то сказать, но вдруг, неожиданно ${player2Name} со скуки, разбил бровь сопернику. [Урон ${count}]. У ${name} ${current} / ${total}`
  ];
  
  return randomElement(logs);
}


function createLog(log) {
  const logs = getElement(`#logs`);

  let logElement = document.createElement(`p`);
  logElement.classList.add(`log`);
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
