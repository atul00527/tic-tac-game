 
            
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
// let resetBtn = document.querySelector('#reset');
// let newGameBtn = document.querySelector('#new-btn');
// let msgContainer = document.querySelector('.msg-container');
// let msg = document.querySelector('#msg');

socket.on("data", (data) => {
  boxes.forEach((box, i) => {
    box.innerHTML = data[i]
  })
})
socket.on("win", (win) => {
  console.log(win)
})

boxes.forEach((box, i) => {
  box.addEventListener('click', function () {
    socket.emit("input", i)
  });
});









