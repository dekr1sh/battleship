import {Gameboard} from '../modules/gameboard.js';

describe('Gameboard', () => {
    let gameboard;

    beforeEach(() => {
        gameboard = Gameboard();
    });

    test('initializes with gridSize = 10', () => {
        expect(gameboard.gridSize).toBe(10);
    });

    test('can check if a ship is at a specific coordinate', () => {
        gameboard.placeShip(2, ['(0,0)', '(0,1)']);
        expect(gameboard.isShipAt('(0,0)')).toBe(true); 
        expect(gameboard.isShipAt('(0,2)')).toBe(false); 
    });

    test('does not allow placing ships out of bounds', () => {
        expect(gameboard.canPlaceShip(['(10,0)', '(10,1)', '(10,2)'])).toBeFalsy();
    });

    test('does not allow overlapping ships', () => {
        gameboard.placeShip(2, ['(0,0)', '(0,1)']);
        expect(gameboard.placeShip(2, ['(0,1)', '(0,2)'])).toBeFalsy();
    });

    test('does not allow placing ships adjacent to each other', () => {
        gameboard.placeShip(2, ['(0,0)', '(0,1)']);
        expect(gameboard.placeShip(2, ['(1,0)', '(2,0)'])).toBeFalsy();
    });

    test('clearShipsFromBoard resets the board correctly', () => {
        gameboard.placeShip(3, ['(0,0)', '(0,1)', '(0,2)']);
        gameboard.clearShipsFromBoard();
        
        expect(gameboard.getSuccessfulAttacks().size).toBe(0);
        expect(gameboard.getMissedAttacks().size).toBe(0);
        expect(gameboard.isShipAt('(0,0)')).toBe(false);
    });

    test('shows successful attacks', () => {
        gameboard.placeShip(3, ['(0,0)', '(0,1)', '(0,2)']);
        expect(gameboard.receiveAttack(0, 0)).toBe("Attack hit a ship"); 
        expect(gameboard.getSuccessfulAttacks()).toContain('(0,0)');
    });

    test('shows missed attacks', () => {
        expect(gameboard.receiveAttack(1, 1)).toBe("Attack missed a ship"); 
        expect(gameboard.getMissedAttacks()).toContain('(1,1)');
    });

    test('does not register duplicate attacks', () => {
        gameboard.placeShip(3, ['(0,0)', '(0,1)', '(0,2)']);
        expect(gameboard.receiveAttack(0, 0)).toBe("Attack hit a ship"); 
        expect(gameboard.receiveAttack(0, 0)).toBe("Attack not registered"); 

        expect(gameboard.receiveAttack(1, 1)).toBe("Attack missed a ship"); 
        expect(gameboard.receiveAttack(1, 1)).toBe("Attack not registered"); 
    });

    test('getSuccessfulAttacks returns the correct set of successful attacks', () => {
        gameboard.placeShip(3, ['(0,0)', '(0,1)', '(0,2)']);
        gameboard.receiveAttack(0, 0);
        gameboard.receiveAttack(1, 1); 
        gameboard.receiveAttack(0, 1);
        expect(Array.from(gameboard.getSuccessfulAttacks())).toEqual(['(0,0)', '(0,1)']); 
    });

    test('getMissedAttacks returns the correct set of missed attacks', () => {
        gameboard.placeShip(3, ['(0,0)', '(0,1)', '(0,2)']);
        gameboard.receiveAttack(0, 0);
        gameboard.receiveAttack(1, 1); 
        gameboard.receiveAttack(0, 1);
        expect(Array.from(gameboard.getMissedAttacks())).toEqual(['(1,1)']); 
    });

    test('allShipsSunk() accurately reports the sinking status of all ships', () => {
        gameboard.placeShip(2, ['(0,0)', '(0,1)']);
        gameboard.receiveAttack(0, 0); 
        expect(gameboard.allShipsSunk()).toBe(false); 

        gameboard.receiveAttack(0, 1); 
        expect(gameboard.allShipsSunk()).toBe(true); 
    });
});