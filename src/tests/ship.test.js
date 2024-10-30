import  {Ship}  from "../modules/ship.js";

describe('Ship factory function', () => {
    let ship;

    beforeEach(() => {
        ship = Ship(3); 
    });

    test('initializes with correct length and 0 hits', () => {
        expect(ship.length).toBe(3);
        expect(ship.getHits()).toBe(0);
    });

    test('hit() increments hits', () => {
        ship.hit();
        expect(ship.getHits()).toBe(1);
        ship.hit();
        expect(ship.getHits()).toBe(2);
    });

    test('isSunk() returns true when hits are equal to or more than length', () => {
        ship.hit();
        ship.hit();
        ship.hit();
        expect(ship.isSunk()).toBe(true);

        ship.hit();
        expect(ship.isSunk()).toBe(true);
    });
});