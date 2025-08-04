 
            
//     //     for (let i = 0; i < winningConditions.length; i++) {
//     //         const [pos1,pos2,pos3] = winningConditions[i];

//     //         if( gameCells[pos1].textContent !== '' && 
//     //             gameCells[pos1].textContent === gameCells[pos2].textContent &&
//     //             gameCells[pos2].textContent === gameCells[pos3].textContent ) {
//     //             return true;
//     //         }            
//     //     }

//     //     return false;
//     // }

//         // function check to Tie-----------------------------
//     // const checkTie = () => {
//     //     let emptyCellsCount = 0;
//     //     gameCells.forEach(cell => {
//     //         if (cell.textContent === '') {
//     //             emptyCellsCount++;
//     //         }
//     //     });

//     //     return  emptyCellsCount === 0 && !checkWin();
//     // }
//     // disable game board cells after a win or tie--------------
//     // const disableCells = () => {
//     //     gameCells.forEach(cell => {
//     //         cell.removeEventListener('click', handleClick);
//     //         cell.classList.add('disable')
//     //     });
//     // }
// //     const restartGame = () => {
// //         gameCells.forEach(cell => {
// //             cell.textContent = '';
// //             cell.classList.remove('disabled');
// //         });
// //         restartGame(); 
    
// // }
//     startGame();



const socket = io("http://127.0.0.1:5000");


const userId = prompt("enter ID")
if (userId) {
  socket.emit("info", userId)
}

let boxes = document.querySelectorAll('.box');
let restartBtn = document.getElementById('restart');
let turnElement = document.getElementById('turn');
let winElement = document.getElementById('win');
winElement.style.display = 'none'
turnElement.style.display = 'none'


socket.on("data", ({ data, turn }) => {
  if (turn == userId) {
    turnElement.style.display = 'block'
  } else {
    turnElement.style.display = 'none'
  }
  boxes.forEach((box, i) => {
    box.innerHTML = data[i]
  })
})

socket.on("win", (win) => {
  turnElement.style.display = 'none'
  winElement.innerHTML = win
  winElement.style.display = 'block'
  console.log(win)
})
socket.on("restart", () => {
  turnElement.style.display = 'none'
  winElement.style.display = 'none'
})

boxes.forEach((box, i) => {
  box.addEventListener('click', function () {
    socket.emit("input", i)
  });
});

restartBtn.addEventListener("click", () => {
  socket.emit("restart", userId)
})









