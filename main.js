'use strict';

const firstRow = 'мама мыла раму';
const secondRow = 'собака друг человека';

function getRow(firstRow, secondRow) {
  let quantitySymbolAInFirstRow = 0;
  for (let i = 0; i < firstRow.length; i++) {
    if (firstRow.charAt(i) === "а") {
      console.log(firstRow[i]);
      quantitySymbolAInFirstRow++;
    }
  }

  let quantitySymbolAInSecondRow = 0;
  for (let i = 0; i < secondRow.length; i++) {
    if (secondRow.charAt(i) === "а") {
      console.log(secondRow[i]);
      quantitySymbolAInSecondRow++;
    }
  }

  if (quantitySymbolAInFirstRow > quantitySymbolAInSecondRow) {
    return firstRow;
  } else {
    return secondRow;
  }
};

console.log(getRow(secondRow, firstRow));