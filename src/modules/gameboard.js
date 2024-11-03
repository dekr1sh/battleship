import { Ship } from './ship.js';

function Gameboard() {
    const gridSize = 10
    const shipsOnBoard = [];
    const successfulAttacks = new Set();
    const missedAttacks = new Set();
    const board = {}; // Maps coordinates to ships

    function getSuccessfulAttacks() {
        return successfulAttacks;
    }

    function getMissedAttacks() {
        return missedAttacks;
    }

    function isShipAt(coord) {
        return Boolean(board[coord]);
    }

    function getShipAt(coord) {
        return board[coord];
    }

    function isInBounds(x, y) {
        return x >= 0 && x < gridSize && y >= 0 && y < gridSize;
    }

    function parseCoordinate(coord) {
        const [x, y] = coord.match(/\d+/g).map(strNum => +strNum);
        return { x, y };
    }

    function areCoordinatesOccupied(coordinates) {
        return coordinates.some(coord => isShipAt(coord));
    }

    function areCoordinatesAdjacent(coordinates) {
        for (const coord of coordinates) {
            const { x, y } = parseCoordinate(coord);

            const adjacentCoords = [
                `(${x + 1},${y})`,
                `(${x - 1},${y})`,
                `(${x},${y + 1})`,
                `(${x},${y - 1})`,
                `(${x + 1},${y + 1})`,
                `(${x - 1},${y - 1})`,
                `(${x + 1},${y - 1})`,
                `(${x - 1},${y + 1})`
            ];

            if (adjacentCoords.some(adjCoord => Boolean(board[adjCoord]))) {
                return true;
            }
        }
        return false;
    }

    function canPlaceShip(coordinates) {
        for (const coord of coordinates) {
            const { x, y } = parseCoordinate(coord);
            if (!isInBounds(x, y)) {
                return false;
            }
        }

        return !areCoordinatesOccupied(coordinates) && !areCoordinatesAdjacent(coordinates);
    }

    function placeShip(length, coordinates) {
        const ship = Ship(length);
        shipsOnBoard.push(ship);
        coordinates.forEach(coord => board[coord] = ship);
    }

    function placeShipsRandomly() {
        const shipsToPlace = [
            { length: 4, count: 2 },
            { length: 3, count: 2 },
            { length: 2, count: 2 },
            { length: 1, count: 2 }
        ];

        for (const { length, count } of shipsToPlace) {
            for (let i = 0; i < count; i++) {
                let placed = false;

                while (!placed) {
                    const orientation = Math.random() < 0.5 ? 'horizontal' : 'vertical';
                    const x = Math.floor(Math.random() * gridSize);
                    const y = Math.floor(Math.random() * gridSize);

                    // Generate coordinates based on orientation
                    const coordinates = [];
                    for (let j = 0; j < length; j++) {
                        const coord = orientation === 'horizontal' ? `(${x},${y + j})` : `(${x + j},${y})`;
                        coordinates.push(coord);
                    }

                    if (canPlaceShip(coordinates)) {
                        placeShip(length, coordinates);
                        placed = true;
                    }
                }
            }
        }
    }

    function areAllShipsPlaced() {
        return shipsOnBoard.length === 8;
    }

    function clearShipsFromBoard() {
        shipsOnBoard.length = 0;         
        successfulAttacks.clear();       
        missedAttacks.clear();           
        for (const coord in board) {     
            delete board[coord];
        }
    }

    function receiveAttack(x, y) {
        const coord = `(${x},${y})`;
        if (successfulAttacks.has(coord) || missedAttacks.has(coord)) {
            return "Attack not registered";
        }
        else if (board[coord]) {
            board[coord].hit();
            successfulAttacks.add(coord);
            return "Attack hit a ship";
        } else {
            missedAttacks.add(coord);
            return "Attack missed a ship";
        }
    }

    function allShipsSunk() {
        return shipsOnBoard.every(ship => ship.isSunk());
    }

    return {
        gridSize, getSuccessfulAttacks, getMissedAttacks, isShipAt, getShipAt, canPlaceShip, placeShip, 
        placeShipsRandomly, areAllShipsPlaced, clearShipsFromBoard, receiveAttack, allShipsSunk
    };
};

export { Gameboard };