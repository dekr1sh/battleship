import {Gameboard} from '../modules/gameboard.js';

describe('Gameboard', () => {
    let gameboard;

    beforeEach(() => {
        gameboard = Gameboard();
    });

    test('initializes with gridSize = 10', () => {
        expect(gameboard.gridSize).toBe(10);
    });

    test('does not allow placing ships out of bounds', () => {
        expect(() => gameboard.placeShip(3, [`(${gameboard.gridSize},0)`, `(${gameboard.gridSize},1)`, `(${gameboard.gridSize},2)`])).toThrow(
            'Cannot place ship: one or more coordinates are out of bounds.'
        );
    });

    test('does not allow overlapping ships', () => {
        gameboard.placeShip(2, ['(0,0)', '(0,1)']);
        expect(() => gameboard.placeShip(2, ['(0,1)', '(0,2)'])).toThrow(
            'Cannot place ship: one or more coordinates are already occupied.'
        );
    });

    test('does not allow placing ships adjacent to each other', () => {
        gameboard.placeShip(2, ['(0,0)', '(0,1)']);
        expect(() => gameboard.placeShip(2, ['(1,0)', '(2,0)'])).toThrow(
            'Cannot place ship: one or more coordinates are adjacent.'
        );
    });

    test('shows successful attacks', () => {
        gameboard.placeShip(3, ['(0,0)', '(0,1)', '(0,2)']);
        expect(gameboard.receiveAttack(0, 0)).toBe("Attack hit a ship"); 
    });

    test('shows missed attacks', () => {
        expect(gameboard.receiveAttack(1, 1)).toBe("Attack missed a ship"); 
    });

    test('does not register duplicate attacks', () => {
        gameboard.placeShip(3, ['(0,0)', '(0,1)', '(0,2)']);
        expect(gameboard.receiveAttack(0, 0)).toBe("Attack hit a ship"); 
        expect(gameboard.receiveAttack(0, 0)).toBe("Attack not registered"); 

        expect(gameboard.receiveAttack(1, 1)).toBe("Attack missed a ship"); 
        expect(gameboard.receiveAttack(1, 1)).toBe("Attack not registered"); 
    });

    test('allShipsSunk() accurately reports the sinking status of all ships', () => {
        gameboard.placeShip(2, ['(0,0)', '(0,1)']);
        gameboard.receiveAttack(0, 0); 
        expect(gameboard.allShipsSunk()).toBe(false); 

        gameboard.receiveAttack(0, 1); 
        expect(gameboard.allShipsSunk()).toBe(true); 
    });
});