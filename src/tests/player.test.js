import { Player } from '../modules/player.js';

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

});
