/* Creates the array which will the player tokens */
const Gameboard = (function(){
const rows = 3;
const columns = 3;
let number = 0;

let board = [];

for (let i = 0;i < rows;i++) {
     board[i]= [];
    for (let j = 0; j < columns; j++) {
        board[i].push(number++);
    }
};

let newArr = []
for(var i = 0; i < board.length; i++)
{
    newArr = newArr.concat(board[i]);
}
 const getBoard = () => newArr;

 let restart = () => {
 location.reload()
 }
 
return {
  getBoard,restart
}
});


const players = (function(){
  const board = Gameboard().getBoard()

let gamePlayers = [
  {
    name : 'Player one',
    token : 'X'
  },
  {
    name: 'Player Two',
    token: 'O'
  }
]

let initialPlayer = gamePlayers[0].name

const currentPlayer = (player) => {
   if (winConditions() === true ){
    player.textContent = `${initialPlayer} has won!`
  }else{
     initialPlayer = initialPlayer === gamePlayers[0].name ? gamePlayers[1].name : gamePlayers[0].name;
  console.log(`it's ${initialPlayer}'s turn`)
  player.textContent = `It's ${initialPlayer}'s turn`
  }
}

let initialValue = gamePlayers[1].token

let getValue = () => {
  initialValue = initialValue === gamePlayers[1].token ? gamePlayers[0].token : gamePlayers[1].token;
  return initialValue;
}

 const addToken = (column,cell) => {
  if (board[cell] === 'X' || board[cell] === 'O') return;
  board[cell] = getValue()
  column.textContent = board[cell]
 }

 let winConditions = () => {
 if ((board[0] === board[1] & board[1] === board[2]) 
  || (board[6] === board[7] & board[7] === board[8])
  ||(board[3] === board[4] & board[4] === board[5])
  ||(board[0] === board[3] & board[3] === board[6])
  ||(board[1] === board[4] & board[4] === board[7])
  ||(board[2] === board[5] & board[5] === board[8])
  ||(board[0] === board[4] & board[4] === board[8])
  ||(board[2] === board[4] & board[4] === board[6])){
 return true
 }else{
  return false
 }
}

const playRound = (column,cell,player)=>{
 console.log(board)
  addToken(column,cell)
return currentPlayer(player)
}

return {
  getValue,playRound,winConditions
}
})


/* Adds the grids onto the pages and allows them to be interacted with */
function displayController(){
  const board = document.querySelector('.board')
  const turn = document.querySelector('.turn')
  const gameBoard = Gameboard().getBoard()
  const gameController = players()
  const restart = document.querySelector('.restart')
  const game = Gameboard()
   
  gameBoard.forEach((column,index)=>{
    let gridItem = document.createElement('div');
  gridItem.classList.add('grid-item')
  board.appendChild(gridItem)
  gridItem.addEventListener("click",()=>{
    gridItem.dataset.cell = index
    let cell = gridItem.dataset.cell
    gameController.winConditions()
    gameController.playRound(gridItem,cell,turn)
  })
  /* Restart button */
  restart.addEventListener('click',()=>{
    game.restart()
  })
  })

}
displayController()