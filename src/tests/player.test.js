import { Player } from '../modules/player.js';

describe('Player', () => {
    let player;
    let opponent;

    beforeEach(() => {
        player = Player('real');       
        opponent = Player('computer'); 
    });

    test('initializes with correct type', () => {
        expect(player.isComputer).toBe(false);
        expect(opponent.isComputer).toBe(true);
    });

    test('real player attacks with specified coordinates', () => {
        const result = player.attack(opponent.gameboard, 1, 1);
        expect(result).toBeDefined();
    });

    test('computer player attacks with random coordinates', () => {
        const result = opponent.attack(player.gameboard);
        expect(result).toBeDefined();
    });
});
