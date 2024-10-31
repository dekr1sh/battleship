import { Gameboard } from './gameboard.js';

function Player(type = 'human') {
    const gameboard = Gameboard();
    const isComputer = type === 'computer';

    function getRandomCoordinates() {
        const x = Math.floor(Math.random() * gameboard.gridSize);
        const y = Math.floor(Math.random() * gameboard.gridSize);
        return [x, y];
    }

    function attack(opponentBoard, x, y) {
        if (isComputer) {
            [x, y] = getRandomCoordinates();
        }
        return opponentBoard.receiveAttack(x, y);
    }

    return { gameboard, isComputer, attack };
}

export { Player };