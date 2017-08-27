const canvasContext = document.getElementById("canvas").getContext("2d");

const TILESIZE = 10;
const TILEBORDER_WIDTH = 2;
const TOTAL_BORDERLINES = (TILESIZE * 2) - 2;
const BOARDWIDTH = 600;
const BOARDHEIGHT = 600;
const SPACING = BOARDWIDTH / (TOTAL_BORDERLINES/2 + 1);

function initBoard(){
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  for(let i = 0; i < TOTAL_BORDERLINES; i++){
    if(i < TOTAL_BORDERLINES/2){
      canvasContext.fillRect(SPACING * (i + 1),0, TILEBORDER_WIDTH, BOARDHEIGHT);
    }else{
      canvasContext.fillRect(0,SPACING * (i - TOTAL_BORDERLINES/2 + 1), BOARDWIDTH, TILEBORDER_WIDTH);
    }
  }
}

document.getElementById('canvas').addEventListener("mouseup", function(e){
  addMove(player, e.offsetX, e.offsetY);
  // switch players
  player == 'x' ? player = 'o' : player = 'x';
})

let player = 'x';

let board = [
  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-']
]

const sequenceLenghtToWin = 3;
const xWin = new RegExp('x{' + sequenceLenghtToWin + ',}');
const oWin = new RegExp('o{' + sequenceLenghtToWin + ',}');

function addMove(player, x, y){
  if (!x || !y || x < 0 || x > BOARDWIDTH || y < 0 || y > BOARDWIDTH){
    return;
  }
  let boardX = parseInt(x / BOARDHEIGHT * TILESIZE);
  let boardY = parseInt(y / BOARDWIDTH * TILESIZE);
  if (updateGameState(player, boardX, boardY)) {
    let tileSize = BOARDHEIGHT / TILESIZE;
    draw(player, boardX * tileSize + tileSize/2, boardY * tileSize + tileSize/2);
  }
  return;
}

function playerWon(type){
  alert("Player " + type + " WON!");
  for (let i = 0; i < board.length; i++) {
    board[i].fill('-');
  }
  initBoard();
}

function updateGameState(player, x, y){
  board[y][x] = player;
  return checkVertical() && checkHorizontal() && checkDiagonals();
}

function checkVertical(){
  const getColumn = (arr, n) => arr.map(x => x[n]);
  for (let column = 0; column < board.length; column++) {
    let currentColumn = getColumn(board, column).join('');
    if(xWin.test(currentColumn)){
      playerWon('x');
      return false;
    };
    if(oWin.test(currentColumn)){
      playerWon('o');
      return false;
    };
  }
  return true;
}

function checkHorizontal(){
  for (let row = 0; row < board.length; row++) {
    let currentRow = board[row].join('');
    if(xWin.test(currentRow)){
      playerWon('x');
      return false;
    };
    if(oWin.test(currentRow)){
      playerWon('o');
      return false;
    };
  }
  return true;
}

function checkDiagonals(){
  let diagonals = getDiagonal(board, true);
  diagonals.push(getDiagonal(board, false));
  for (let i = 0; i < diagonals.length; i++) {
    let currentRow = diagonals[i];
    if(xWin.test(currentRow)){
      playerWon('x');
      return false;
    };
    if(oWin.test(currentRow)){
      playerWon('o');
      return false;
    };
  }
  return true;
}

function getDiagonal(matrix, bottomToTop) {
    let Ylength = matrix.length;
    let Xlength = matrix[0].length;
    let maxLength = Math.max(Xlength, Ylength);
    let temp;
    let returnArray = [];
    for (let k = 0; k <= 2 * (maxLength - 1); ++k) {
        temp = [];
        for (let y = Ylength - 1; y >= 0; --y) {
            let x = k - (bottomToTop ? Ylength - y : y);
            if (x >= 0 && x < Xlength) {
                temp.push(matrix[y][x]);
            }
        }
        if(temp.length > 0) {
            returnArray.push(temp.join(''));
        }
    }
    return returnArray;
}

function draw(player, x, y){
  if (player == 'x'){
    canvasContext.beginPath();
    canvasContext.lineWidth = TILEBORDER_WIDTH;
    canvasContext.moveTo(x - 20, y - 20);
    canvasContext.lineTo(x + 20, y + 20);

    canvasContext.moveTo(x + 20, y - 20);
    canvasContext.lineTo(x - 20, y + 20);
    canvasContext.stroke();
  }
  else{
    x++;
    y++;
    canvasContext.beginPath();
    canvasContext.lineWidth = TILEBORDER_WIDTH;
    canvasContext.arc(x, y, 25, 0, 2 * Math.PI);
    canvasContext.stroke();
  }
}

initBoard();
