const players = ['0', 'X'];
let currentPlayer = players[0];
const gameBoard = Array(9).fill('');

const gameBoardElem = document.createElement('div');
gameBoardElem.classList.add('game-board');
document.body.appendChild(gameBoardElem);

const createTitle = (title) => {
    const titleElem = document.createElement('h1');
    titleElem.textContent = title;
    document.body.appendChild(titleElem);
}
createTitle('Tic-Tac-Toe');

const makeSquardElem = (squareNumber) => {
    const squareElement = document.createElement('div');
    squareElement.classList.add('game-square');

    squareElement.addEventListener('click', () => {
        if (gameBoard[squareNumber] === '') {
            squareElement.textContent = currentPlayer;
            gameBoard[squareNumber] = currentPlayer;
            checkBoard();
            switchPlayer();
        }
    }, { once: true });

    return squareElement;
};

const switchPlayer = () => {
    currentPlayer = (currentPlayer === players[0]) ? players[1] : players[0];
}

const checkBoard = () => {
    const winningStates = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    
    for (const winState of winningStates) {
        const [position1, position2, position3] = winState;
        if (gameBoard[position1] && gameBoard[position1] === gameBoard[position2] && gameBoard[position1] === gameBoard[position3]) {
            completeGame(`${gameBoard[position1]} wins`);
        }
    }
    
    const allSquaresUsed = gameBoard.every(square => square !== '');
    if (allSquaresUsed) {
        completeGame('It\'s a draw');
    }
}

const completeGame = (message) => {
    const overlayElem = document.createElement('div');
    overlayElem.classList.add('overlay');
    overlayElem.innerHTML = `
        <h2 class="message">${message}</h2>
        <button class="restart-button">Restart</button>
    `;
    
    const restartButtonElem = overlayElem.querySelector('.restart-button');
    restartButtonElem.addEventListener('click', () => {
        document.body.removeChild(overlayElem);
        resetGame();
    });
    
    document.body.appendChild(overlayElem);
}

const resetGame = () => {
    gameBoardElem.innerHTML = '';
    for (let square = 0; square < 9; square++) {
        gameBoardElem.appendChild(makeSquardElem(square));
    }
    gameBoard.fill('');
    currentPlayer = players[0];
}

resetGame();
