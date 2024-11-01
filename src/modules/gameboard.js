import { Ship } from './ship.js';

function Gameboard() {
    const gridSize = 10
    const shipsOnBoard = []; 
    const successfulAttacks = new Set();
    const missedAttacks = new Set();
    const board = {}; // Maps coordinates to ships

    function isInBounds(x, y) {
        return x >= 0 && x < gridSize && y >= 0 && y < gridSize;
    }

    function parseCoordinate(coord) {
        const [x, y] = coord.match(/\d+/g).map(strNum => +strNum);
        return { x, y };
    }

    function areCoordinatesOccupied(coordinates) {
        return coordinates.some(coord => Boolean(board[coord]));
    }

    function areCoordinatesAdjacent(coordinates) {
        for (const coord of coordinates) {
            const { x, y } = parseCoordinate(coord);

            const adjacentCoords = [
                `(${x + 1},${y})`,
                `(${x - 1},${y})`,
                `(${x},${y + 1})`,
                `(${x},${y - 1})`, 
                `(${x+1},${y+1})`,
                `(${x-1},${y-1})`,
                `(${x+1},${y-1})`,
                `(${x-1},${y+1})`
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
            if(!isInBounds(x,y)) {
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

    function receiveAttack(x, y) {
        const coord = `(${x},${y})`;
        if(successfulAttacks.has(coord) || missedAttacks.has(coord)) {
            return "Attack not registered"; 
        }
        else if(board[coord]) {
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

    return { gridSize, canPlaceShip, placeShip, receiveAttack, allShipsSunk };
};

export {Gameboard};
