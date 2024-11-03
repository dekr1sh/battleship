import { Player } from './player.js';

const turnDisplay = document.getElementById('turnDisplay');
const resultDisplay = document.getElementById('resultDisplay');
const playerBoardElement = document.querySelector('#containerOne .board');
const computerBoardElement = document.querySelector('#containerTwo .board');
const startBtn = document.getElementById('startBtn');
const exitBtn = document.getElementById('exitBtn');
const randomBoardBtn = document.querySelector('.random-board-btn');
const boardBtns = document.querySelector('.board-buttons');

const player = new Player('human');
const computer = new Player('computer');
let isPlayerTurn = true;

function emptyBoard(boardElement){
    boardElement.innerHTML = '';
}

function createBoard(boardElement) {
    const gridSize = player.gameboard.gridSize;
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.x = i;
            cell.dataset.y = j;
            boardElement.appendChild(cell);
        }
    }
}

function updateTurnDisplay() {
    turnDisplay.textContent = isPlayerTurn ? "Player's turn" : "Computer's turn";
}

function updateResultDisplay(message) {
    resultDisplay.textContent = message;
    turnDisplay.textContent = '';
}

function renderBoard(boardElement, gameboard, showShipsAlways = true) {
    boardElement.querySelectorAll('.cell').forEach(cell => {
        const x = +cell.dataset.x;
        const y = +cell.dataset.y;
        const coord = `(${x},${y})`;

        cell.classList.remove('show', 'ship', 'hit', 'miss', 'sunk');

        if (gameboard.isShipAt(coord)) {
            const ship = gameboard.getShipAt(coord);
            cell.classList.add('ship');
            if (showShipsAlways) {
                cell.classList.add('show');
            }
            if (ship.isSunk()) {
                cell.classList.add('sunk');
            }  
        }
        
        if (gameboard.getSuccessfulAttacks().has(coord)) {
            cell.classList.add('hit');
            if (!showShipsAlways) cell.classList.add('show');
        } else if (gameboard.getMissedAttacks().has(coord)) {
            cell.classList.add('miss');
        }
    });
}


function handleCellClick(event) {
    if (!event.target.classList.contains('cell') || !isPlayerTurn) return;

    const x = +event.target.dataset.x;
    const y = +event.target.dataset.y;

    const attackResult = player.attack(computer.gameboard, x, y);
    renderBoard(computerBoardElement, computer.gameboard);

    if (attackResult === "Attack not registered") {
        return; 
    }
    else if (attackResult === "Attack missed a ship") {
        isPlayerTurn = false;
        updateTurnDisplay();
        setTimeout(computerTurn, 1000);
    }
    else if (computer.gameboard.allShipsSunk()) {
        endGame('Player');
        return;
    }
}

function computerTurn() {
    let attackResult = computer.attack(player.gameboard);
    renderBoard(playerBoardElement, player.gameboard, false);

    if (player.gameboard.allShipsSunk()) {
        endGame('Computer');
        return;
    }

    if (attackResult === "Attack not registered") {
        computerTurn();
    } 
    else if (attackResult === "Attack hit a ship") {
        setTimeout(computerTurn, 1000);
    } 
    else {
        isPlayerTurn = true;
        updateTurnDisplay();
    }
}

function startGame() {
    if(!player.gameboard.areAllShipsPlaced()) {
        alert("Please place all your ships before starting the game.");
        return; 
    }

    updateTurnDisplay();

    computer.gameboard.placeShipsRandomly();
    renderBoard(computerBoardElement, computer.gameboard, false);
    computerBoardElement.addEventListener('click', handleCellClick);

    startBtn.classList.add('hidden');
    exitBtn.classList.remove('hidden');

    boardBtns.classList.add('hidden');
}

function endGame(winner) {
    updateResultDisplay(`${winner} wins!`);
    computerBoardElement.removeEventListener('click', handleCellClick);
}

startBtn.addEventListener('click', startGame);

exitBtn.addEventListener('click', () => {
    exitBtn.classList.add('hidden');
    startBtn.classList.remove('hidden');
    boardBtns.classList.remove('hidden');

    updateResultDisplay('');
    computerBoardElement.removeEventListener('click', handleCellClick);

    emptyBoard(playerBoardElement);
    emptyBoard(computerBoardElement);

    createBoard(playerBoardElement);
    createBoard(computerBoardElement);

    player.gameboard.clearShipsFromBoard();
    computer.gameboard.clearShipsFromBoard();
    isPlayerTurn = true;
});

randomBoardBtn.addEventListener('click', () => {
    player.gameboard.placeShipsRandomly();
    renderBoard(playerBoardElement, player.gameboard);
});

export { createBoard };