`use strict`;

function buttonCount(button, playerMoves, count = 0) {
  const initialText = button.innerText;
  button.innerText = `${initialText} [${playerMoves - count}]`;

  return function () {
    count++;
    button.innerText = `${initialText} [${playerMoves - count}]`;

    if (count === playerMoves) {
      button.disabled = `true`;
    }

    return count;
  }
}


const createButton = (item, player) => {
  const button = document.createElement(`button`);
  button.classList.add(`button`);
  button.innerText = item.name;

  let maxCount = item.maxCount;

  let controls = player.controls;
  controls.appendChild(button);

  return { button, maxCount };
}

export { buttonCount, createButton }