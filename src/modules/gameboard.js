import { Ship } from './ship.js';

function Gameboard() {
    const gridSize = 10
    const ships = [];
    const successfulAttacks = new Set();
    const missedAttacks = new Set();
    const board = {}; // Maps coordinates to ships

    function areCoordinatesOccupied(coordinates) {
        for (const coord of coordinates) {
            if (board[coord]) {
                return true; 
            }
        }
        return false; 
    }

    function isInBounds(x, y) {
        return x >= 0 && x < gridSize && y >= 0 && y < gridSize;
    }

    function placeShip(length, coordinates) {
        if (areCoordinatesOccupied(coordinates)) {
            throw new Error(`Cannot place ship: one or more coordinates are already occupied.`);
        }

        coordinates.forEach(coord => {
            const [x, y] = coord.match(/\d+/g).map(strNum => +strNum); 
            if (!isInBounds(x, y)) {
                throw new Error(`Cannot place ship: one or more coordinates is out of bounds.`);
            }
        });
    
        const ship = Ship(length);
        ships.push(ship);
    
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
        return ships.every(ship => ship.isSunk());
    }

    return { gridSize, placeShip, receiveAttack, allShipsSunk };
};

export {Gameboard};
