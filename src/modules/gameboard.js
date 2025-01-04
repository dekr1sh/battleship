import { Ship } from './ship.js';
import { isInBounds, parseCoordinate, getAdjacentCoordinates } from './utility.js'

function Gameboard() {
    const gridSize = 10
    const shipsOnBoard = [];
    const shipsToPlace = [
        { length: 4, count: 2 },
        { length: 3, count: 2 },
        { length: 2, count: 2 },
        { length: 1, count: 2 }
    ];
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

    function areCoordinatesOccupied(coordinates) {
        return coordinates.some(coord => isShipAt(coord));
    }

    function areAdjacentCoordinatesOccupied(coordinates) {
        for (const coord of coordinates) {
            const { x, y } = parseCoordinate(coord);
            const adjacentCoords = getAdjacentCoordinates(x, y);

            if (adjacentCoords.some(adjCoord => isShipAt(adjCoord))) {
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

        return !areCoordinatesOccupied(coordinates) && !areAdjacentCoordinatesOccupied(coordinates);
    }

    function placeShip(length, coordinates) {
        const ship = Ship(length);
        shipsOnBoard.push(ship);
        coordinates.forEach(coord => board[coord] = ship);
    }

    function placeShipsRandomly() {
        for (const { length, count } of shipsToPlace) {
            for (let i = 0; i < count; i++) {
                let placed = false;

                while (!placed) {
                    const orientation = Math.random() < 0.5 ? 'horizontal' : 'vertical';
                    const x = Math.floor(Math.random() * gridSize);
                    const y = Math.floor(Math.random() * gridSize);

                    const coordinates = [];
                    for (let j = 0; j < length; j++) {
                        const coord = orientation === 'horizontal' ? `(${x + j},${y})` : `(${x},${y + j})`;
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

    function getSunkShips(){
        return shipsOnBoard.filter(ship => ship.isSunk());
    }

    function getSunkShipsCoords(){
        const sunkShipsArr = getSunkShips();
        const sunkShipsCoords = new Set();

        for(const coord in board){
            for(const sunkShip of sunkShipsArr){
                if(board[coord] === sunkShip){
                    sunkShipsCoords.add(coord);
                    break;
                }
            }
        }
        return sunkShipsCoords;
    }

    function getSunkShipsAdjacentCoords(){
        const sunkShipsCoords = getSunkShipsCoords();
        const sunkShipsAdjacentCoords = new Set();

        sunkShipsCoords.forEach(coord => {
            const {x, y} = parseCoordinate(coord);
            const adjacentCoords = getAdjacentCoordinates(x, y);

            adjacentCoords.forEach(adjacentCoord => {
                const {x: adjX, y: adjY} = parseCoordinate(adjacentCoord);
                if(isInBounds(adjX, adjY) && !sunkShipsCoords.has(adjacentCoord)){
                    sunkShipsAdjacentCoords.add(adjacentCoord);
                }
            })
        })
        return sunkShipsAdjacentCoords;
    }

    function areAllShipsSunk() {
        const sunkShipsArr = getSunkShips();
        return sunkShipsArr.length === shipsOnBoard.length;
    }

    return {
        gridSize, getSuccessfulAttacks, getMissedAttacks, isShipAt, getShipAt, canPlaceShip, placeShip, placeShipsRandomly,
        areAllShipsPlaced, clearShipsFromBoard, receiveAttack, getSunkShipsAdjacentCoords, areAllShipsSunk
    };
};

export { Gameboard };