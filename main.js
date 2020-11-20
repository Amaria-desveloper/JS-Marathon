'use strict';

const kickButton = document.querySelector(`#btn-kick`);

const character = {
  name: "Pikachu",
  defaultHP: 100,
  damageHP: 100,
  progressHealth: document.querySelector(`#health-character`),
  progressBar: document.querySelector(`#progressbar-character`),

}

const enemy = {
  name: "Charmander",
  defaultHP: 100,
  damageHP: 100,
  progressHealth: document.querySelector(`#health-enemy`),
  progressBar: document.querySelector(`#progressbar-enemy`),
}

function init() {
  kickButton.addEventListener(`click`, kickButtonClickHandler);
}


function kickButtonClickHandler() {
  changeHP(random(20), character);
  changeHP(random(20), enemy);
}

function renderHPLife(person) {
  person.progressHealth.innerText = `${person.damageHP} / ${person.defaultHP}`;
}

function renderProgressBar(person) {
  person.progressBar.style.width = `${person.damageHP}%`;
}

function renderHP(person) {
  renderHPLife(person);
  renderProgressBar(person);
}

function changeHP(count, person) {
  if (person.damageHP < count) {
    person.damageHP = 0;  
    alert(`${person.name} проиграл бой!`);
    kickButton.disabled = true;
  } else {
    person.damageHP -= count;
  }

   renderHP(person);
}

function random(num) {
  return Math.ceil(Math.random() * num);
}

init()
