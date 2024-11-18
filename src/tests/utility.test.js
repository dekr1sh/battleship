import {
    isInBounds,
    parseCoordinate,
    getAdjacentCoordinates,
    getVerticalHorizontalAdjacentCoordinates,
    getRandomCoordinates
} from '../modules/utility.js';

describe('Utility functions', () => {
    const gridSize = 10;

    test('isInBounds should return true for coordinates within bounds', () => {
        expect(isInBounds(0, 0)).toBe(true);
        expect(isInBounds(5, 5)).toBe(true);
    });

    test('isInBounds should return false for coordinates outside bounds', () => {
        expect(isInBounds(-1, 0)).toBe(false);
        expect(isInBounds(0, -1)).toBe(false);
    });

    test('parseCoordinate should parse a coordinate string into an object with x and y values', () => {
        expect(parseCoordinate('(3,4)')).toEqual({ x: 3, y: 4 });
        expect(parseCoordinate('(0,0)')).toEqual({ x: 0, y: 0 });
    });

    test('getAdjacentCoordinates should return all 8 adjacent coordinates', () => {
        const adjacent = getAdjacentCoordinates(3, 4);
        expect(adjacent).toEqual([
            '(4,4)', '(2,4)', '(3,5)', '(3,3)',
            '(4,5)', '(2,3)', '(4,3)', '(2,5)'
        ]);
    });

    test('getVerticalHorizontalAdjacentCoordinates should return only vertical and horizontal adjacent coordinates', () => {
        const adjacent = getVerticalHorizontalAdjacentCoordinates(3, 4);
        expect(adjacent).toEqual(['(4,4)', '(2,4)', '(3,5)', '(3,3)']);
    });

    test('getRandomCoordinates should return coordinates within bounds', () => {
        const coord = getRandomCoordinates();
        const { x, y } = parseCoordinate(coord);
        expect(isInBounds(x, y)).toBe(true);
    });

});