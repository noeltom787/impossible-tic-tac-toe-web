"use strict";
//Initial values
let count = 0, //count no. of moves
  win = 0;
let tok = "X";
let mytok = "O";
let cells = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

function logic(tok, mytok, ui, uj) {
    if (count === 1) {
    //special case : when player starts in any one of these locations: - X -
    //                                                                 X - X
    //                                                                 - X -
    if (ui + uj === 3 || ui + uj === 1) {
      if (ui === 1) {
        myMove(ui + 1, uj);
        return;
      }
      if (uj === 1) {
        myMove(ui, uj + 1);
        return;
      }
    }
  }
    if (count === 3) {
    //special case : for a situation like this: - - X       X - -
    //                                          - 0 -   or  - 0 -
    //                                          X - -       - - X
    if (
      (cells[0][0] === tok && cells[1][1] === mytok && cells[2][2] === tok) ||
      (cells[2][0] === tok && cells[1][1] === mytok && cells[0][2] === tok)
    ) {
      myMove(1, 0);
      return;
    }
  }
  //check for possible triplets both for the program and the player
  if (checkDiag1()) return;
  if (checkDiag2()) return;
  if (checkRow()) return;
  if (checkCol()) return;
  //In case of no chance of triplets, fill the empty cells in the order of preference "centre cell > corners > everything else"
  if (cells[1][1] === 0) {
    myMove(1, 1);
    return;
  }

  if (fillCorners()) return;
  if (fillRest()) return;
}
//check triplets in rows
function checkRow() {
  let j1 = 0, my = 0, ur = 0;

  for (let i = 0; i < 3; i++) {
    ur = 0; my = 0;
    for (let j = 0; j < 3; j++) {
      if (cells[i][j] === tok) ur++;
      else if (cells[i][j] === mytok) my++;
      else j1 = j;
    }

    if ((ur === 2 && my === 0) || (ur === 0 && my === 2)) {
      myMove(i, j1);
      return 1;
    }
  }
  return 0;
}

//check triplets in columns
function checkCol() {
  let i1 = 0, my = 0, ur = 0;

  for (let j = 0; j < 3; j++) {
    my = 0; ur = 0;
    for (let i = 0; i < 3; i++) {
      if (cells[i][j] === tok) ur++;
      else if (cells[i][j] === mytok) my++;
      else i1 = i;
    }

    if ((ur === 2 && my === 0) || (ur === 0 && my === 2)) {
      myMove(i1, j);
      return 1;
    }
  }

  return 0;
}

//check triplets in 1st diagonal
function checkDiag1() {
  let my = 0,
    ur = 0,
    i1 = 0;

  for (let i = 0; i < 3; i++) {
    if (cells[i][i] === tok) ur++;
    else if (cells[i][i] === mytok) my++;
    else i1 = i;
  }

  if ((ur === 2 && my === 0) || (ur === 0 && my === 2)) {
    myMove(i1, i1);
    return 1;
  }

  return 0;
}

//check triplets in 2nd diagonal
function checkDiag2() {
  let my = 0,
    ur = 0,
    i1 = 0,
    j1 = 0;

  for (let i = 0, j = 2; i < 3; i++, j--) {
    if (cells[i][j] === tok) ur++;
    else if (cells[i][j] === mytok) my++;
    else {
      i1 = i;
      j1 = j;
    }
  }

  if ((ur === 2 && my === 0) || (ur === 0 && my === 2)) {
    myMove(i1, j1);
    return 1;
  }

  return 0;
}

function fillCorners() {
  for (let i = 0; i < 3; i += 2) {
    for (let j = 0; j < 3; j += 2) {
      if (cells[i][j] === 0) {
        myMove(i, j);
        return 1;
      }
    }
  }
  return 0;
}

function fillRest() {
  for (let i = 0, j = 1; i < 2; i++, j++) {
    if (cells[i][j] === 0) {
      myMove(i, j);
      return 1;
    }
    if (cells[j][i] === 0) {
      myMove(j, i);
      return 1;
    }
  }
  return 0;
}

function checkWin(r, c) {

  let rowCount = 0, colCount = 0, diag1Count = 0, diag2Count = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (i === r && cells[i][j] === mytok)
        rowCount++;
      if (j === c && cells[i][j] === mytok)
        colCount++;
      if (i === j && cells[i][j] === mytok)
        diag1Count++;
      if (i + j === 2 && cells[i][j] === mytok)
        diag2Count++;
  }
}
let triplet='';                        //check if algorithm won
if (rowCount === 3) triplet = 'r';
else if (colCount === 3) triplet = 'c';
else if (diag1Count === 3) triplet = 'd1';
else if (diag2Count === 3) triplet = 'd2';
  if (triplet != '') {
     changeColor(r, c, triplet);
     document.querySelector('.msg1').textContent = 'YOU';
     document.querySelector('.msg2').textContent = 'LOSE!';
     win = 1;
     return;
  }
  return;
}

function myMove(r, c) {
  cells[r][c] = mytok;
  document.querySelector("._" + String(r + 1) + String(c + 1)).style.color = 'black';
  document.querySelector("._" + String(r + 1) + String(c + 1)).textContent =
    mytok;
  count++;

  if (count == 6 || count == 8){
    checkWin(r, c);
  }
  return;
}

function changeColor(i, j, triplet) {
  console.log(triplet);
  switch (triplet) {
    case 'd1': {
      toRed('._11');
      toRed('._22');
      toRed('._33');
    } break;
    case 'd2': {
      toRed('._13');
      toRed('._22');
      toRed('._31');
    } break;
    case 'r': {
      toRed('._' + String(i + 1) + '1');
      toRed('._' + String(i + 1) + '2');
      toRed('._' + String(i + 1) + '3');
    } break;
    case 'c': {
      toRed('._' + '1' + String(j + 1));
      toRed('._' + '2' + String(j + 1));
      toRed('._' + '3' + String(j + 1));
      } break;
  
    default:
      break;
  }
  return;
}

function toRed(cell) {
  document.querySelector(cell).style.backgroundColor = "#e74c3c";
}

function onClick(cell) {                                     //handling click event
  document.querySelector(cell).addEventListener("click", function () {
    if (document.querySelector(cell).textContent === "."  && win === 0) {
      document.querySelector(cell).textContent = tok;
      document.querySelector(cell).style.color="black";
      let ui = Number(cell[2]) - 1;
      let uj = Number(cell[3]) - 1;
      count++;
      cells[ui][uj] = tok;
      if (count === 9) {                                    //check for tie
        for (let i = 1; i <= 3; i++) {
          for (let j = 1; j <= 3; j++) {
            document.querySelector("._" + String(i) + String(j)).style.backgroundColor = '#f1c40f';
          }
        }
        document.querySelector('.msg1').textContent = "TIE";
      }
      logic(tok, mytok, ui, uj);
    }
  });
}

function reset() {                                        //play again
    cells = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
  count = win = 0;
  document.querySelector('.msg1').textContent = '';
  document.querySelector('.msg2').textContent = '';

    for (let i = 1; i <= 3; i++) {
      for (let j = 1; j <= 3; j++) {
        document.querySelector("._" + String(i) + String(j)).textContent = ".";
        document.querySelector("._" + String(i) + String(j)).style.backgroundColor = "white";
        document.querySelector("._" + String(i) + String(j)).style.color = "white";
      }
    }
}
function changeSymbol(sym) {
  document.querySelector(sym).addEventListener("click", function () {
    if (tok != sym[1]) {
      document.querySelector(sym).style.backgroundColor = 'black';
      document.querySelector(sym).style.color = 'white';
      document.querySelector('.' + tok).style.backgroundColor = 'white';
      document.querySelector('.' + tok).style.color = 'black';
      mytok = tok;
      tok = sym[1];
      reset();
    }
  });
}

onClick("._11");
onClick("._12");
onClick("._13");
onClick("._21");
onClick("._22");
onClick("._23");
onClick("._31");
onClick("._32");
onClick("._33");
changeSymbol(".X");
changeSymbol(".O");

document.querySelector(".reset").addEventListener("click", function () {
  reset();
});