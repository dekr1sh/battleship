import { Gameboard } from './gameboard.js';
import { ComputerAI } from './computerAI.js';
import { parseCoordinate } from './utility.js';

function Player(type = 'human') {
    const gameboard = Gameboard();
    const isComputer = type === 'computer';

    // computer's last attack's coordinates
    let lastAttackOfComputer = isComputer ? '' : null;  
    // computer's first successful attack's coordinates. It becomes '', when the ship being attacked by computer sinks
    let firstSuccessfulAttackOfComputerOnAShip = isComputer ? '' : null;

    let attackOrientationOfComputer = isComputer ? 'horizontal' : null;
    let attackDirectionOfComputer = isComputer ? 'positive' : null;


    function attack(opponentBoard, x, y) {
        if(isComputer){
            if(opponentBoard.getSuccessfulAttacks().has(lastAttackOfComputer)){
                const {x: xCo, y: yCo} = parseCoordinate(lastAttackOfComputer);
                firstSuccessfulAttackOfComputerOnAShip = !firstSuccessfulAttackOfComputerOnAShip ? `(${xCo},${yCo})` : firstSuccessfulAttackOfComputerOnAShip
                if(opponentBoard.getShipAt(firstSuccessfulAttackOfComputerOnAShip).isSunk()){
                    firstSuccessfulAttackOfComputerOnAShip = '';
                    attackOrientationOfComputer = 'horizontal';
                    attackDirectionOfComputer = 'positive';
                }
            }

            const ai = ComputerAI(opponentBoard, lastAttackOfComputer, firstSuccessfulAttackOfComputerOnAShip);
            [x, y, attackOrientationOfComputer, attackDirectionOfComputer] = ai.findTarget(attackOrientationOfComputer, attackDirectionOfComputer);
            lastAttackOfComputer = `(${x},${y})`;
        }
        return opponentBoard.receiveAttack(x, y);
    }

    return { gameboard, isComputer, attack };
}

export { Player };