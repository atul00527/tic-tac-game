const gameCells = document.querySelectorAll('.cell');
const player1 = document.querySelectorAll('.player1');
const player2 = document.querySelectorAll('.player2');
const restartBtn = document.querySelectorAll('.restartBtn');
restartBtn.addEventListener('click', restartGame);

let currentPlayer = 'X';
let nextPlayer = 'O';
let playerTurn = currentPlayer;

player1.textContent = `player 1 : ${currentPlayer}`;
player2.textContent = `player 2 : ${nextPlayer}`;

const startGame = () => {
    gameCells.forEach(cell => {
        cell.addEventListener('click', handleClick);
    });
} 

const handleClick = (e) => {
    if(e.target.textContent === '' ) {
       e.target.textContent = playerTurn;
           if ( checkWin()) {
                console.log(`${playerTurn} is a winning!`);
                disableCells();
            }    
            else if(checkTie()){
                console.log('it is a Tie')
                                disableCells();

            }else {
                changePlayerTurn();

                }
            }
    
}
// function to change  player turn

    const changePlayerTurn = () => {
        // if(playerTurn === currentPlayer) {   // cells  write way
        //     playerTurn = nextPlayer;
        // }
        // else {
        //     playerTurn = currentPlayer;
        // }

        // turrnery voprartor  wrte way

            playerTurn = playerTurn === currentPlayer ?  nextPlayer  :  currentPlayer;

};
        // function to check win
        const  checkWin = () => {
            const winningConditions = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6]
            ];   
            
        for (let i = 0; i < winningConditions.length; i++) {
            const [pos1,pos2,pos3] = winningConditions[i];

            if( gameCells[pos1].textContent !== '' && 
                gameCells[pos1].textContent === gameCells[pos2].textContent &&
                gameCells[pos2].textContent === gameCells[pos3].textContent ) {
                return true;
            }            
        }

        return false;
    }

        // function check to Tie-----------------------------
    const checkTie = () => {
        let emptyCellsCount = 0;
        gameCells.forEach(cell => {
            if (cell.textContent === '') {
                emptyCellsCount++;
            }
        });

        return  emptyCellsCount === 0 && !checkWin();
    }
    // disable game board cells after a win or tie--------------
    const disableCells = () => {
        gameCells.forEach(cell => {
            cell.removeEventListener('click', handleClick);
            cell.classList.add('disable')
        })
    }
    // const restartGame = () => {
    //     gameCells.forEach(cell => {
    //         cell.textContent = '';
    //         cell.classList.remove('disabled');
    //     });
    //     restartGame(); 
    }
    startGame();

