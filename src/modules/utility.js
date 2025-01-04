import { Gameboard } from "./gameboard.js";

const gameboard = Gameboard();
const gridSize = gameboard.gridSize;

function isInBounds(x, y) {
    return x >= 0 && x < gridSize && y >= 0 && y < gridSize;
}

function parseCoordinate(coord) {
    const [x, y] = coord.match(/-?\d+/g).map(strNum => +strNum);
    return { x, y };
}

function getAdjacentCoordinates(x, y) {
    return [
        `(${x + 1},${y})`, `(${x - 1},${y})`, `(${x},${y + 1})`, `(${x},${y - 1})`,
        `(${x + 1},${y + 1})`, `(${x - 1},${y - 1})`, `(${x + 1},${y - 1})`, `(${x - 1},${y + 1})`
    ];
}

function getRandomCoordinates() {
    const x = Math.floor(Math.random() * gridSize);
    const y = Math.floor(Math.random() * gridSize);
    const coord = `(${x},${y})`
    return coord;
}

export {
    isInBounds, parseCoordinate, getAdjacentCoordinates, getRandomCoordinates
};