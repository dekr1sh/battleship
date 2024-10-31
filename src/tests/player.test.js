import { Player } from '../modules/player.js';
import { jest } from '@jest/globals';

describe('Player', () => {
    let player;
    let opponent;

    beforeEach(() => {
        player = Player('human');       
        opponent = Player('computer'); 
    });

    test('initializes with correct type', () => {
        expect(player.isComputer).toBe(false);
        expect(opponent.isComputer).toBe(true);
    });

    test('human player attacks with specified coordinates', () => {
        const mockReceiveAttack = jest.fn();
        opponent.gameboard.receiveAttack = mockReceiveAttack;

        player.attack(opponent.gameboard, 3, 4);
        expect(mockReceiveAttack).toHaveBeenCalledWith(3, 4);
    });

    test('computer player attacks with random coordinates', () => {
        const mockReceiveAttack = jest.fn();
        player.gameboard.receiveAttack = mockReceiveAttack;

        opponent.attack(player.gameboard);
        expect(mockReceiveAttack).toHaveBeenCalled();
        const [x, y] = mockReceiveAttack.mock.calls[0];

        expect(x).toBeGreaterThanOrEqual(0);
        expect(x).toBeLessThan(10);
        expect(y).toBeGreaterThanOrEqual(0);
        expect(y).toBeLessThan(10);
    });
});
