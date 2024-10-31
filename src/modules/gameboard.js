import { Ship } from './ship.js';

function Gameboard() {
    const gridSize = 10
    const ships = [];
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

    function placeShip(length, coordinates) {
        for (const coord of coordinates) {
            const { x, y } = parseCoordinate(coord);
            if(!isInBounds(x,y)) {
                throw new Error(`Cannot place ship: one or more coordinates are out of bounds.`);
            }
        }
        
        if (areCoordinatesOccupied(coordinates)) {
            throw new Error(`Cannot place ship: one or more coordinates are already occupied.`);
        }

        else if(areCoordinatesAdjacent(coordinates)) {
            throw new Error(`Cannot place ship: one or more coordinates are adjacent.`)
        }

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
