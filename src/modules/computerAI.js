import { 
    isInBounds, 
    parseCoordinate, 
    getRandomCoordinates 
} from './utility.js';


function ComputerAI(gameboard, lastAttack, firstSuccessfulAttack) {
    const successfulAttacks = gameboard.getSuccessfulAttacks();
    const missedAttacks = gameboard.getMissedAttacks();
    const sunkShipsAdjacentCoords = gameboard.getSunkShipsAdjacentCoords();

    function isValidCoordinate(coord) {
        const { x, y } = parseCoordinate(coord);
        return !successfulAttacks.has(coord) && !missedAttacks.has(coord) && !sunkShipsAdjacentCoords.has(coord) && isInBounds(x, y);
    }

    function getValidRandomCoordinates() {
        let coord;
        do {
            coord = getRandomCoordinates();
        } while (!isValidCoordinate(coord));

        return coord;
    }

    const isShipSunk = !firstSuccessfulAttack; // true when firstSuccessfulAttack = '', or else false
    let attackCoords = {x: null, y: null};

    function findTarget(attackOrientation, attackDirection) {
        if (!isShipSunk) {
            if(attackOrientation === 'horizontal'){
                if(attackDirection === 'positive'){
                    if(successfulAttacks.has(lastAttack)){
                        const { x: xCo, y: yCo } = parseCoordinate(lastAttack);
                        attackCoords.x = xCo + 1;
                        attackCoords.y = yCo;
                        if(isValidCoordinate(`(${attackCoords.x},${attackCoords.y})`)){
                            return [attackCoords.x, attackCoords.y, attackOrientation, attackDirection];
                        }
                        else{
                            attackDirection = 'negative';
                            lastAttack = firstSuccessfulAttack;
                        }
                    }
                    else{
                        attackDirection = 'negative';
                        lastAttack = firstSuccessfulAttack;
                    }
                }

                if(attackDirection === 'negative'){
                    if(successfulAttacks.has(lastAttack)){
                        const { x: xCo, y: yCo } = parseCoordinate(lastAttack);
                        attackCoords.x = xCo - 1;
                        attackCoords.y = yCo;
                        if(isValidCoordinate(`(${attackCoords.x},${attackCoords.y})`)){
                            return [attackCoords.x, attackCoords.y, attackOrientation, attackDirection];
                        }
                        else{
                            attackDirection = 'positive';
                            attackOrientation = 'vertical'
                            lastAttack = firstSuccessfulAttack;
                        }
                    }
                    else{
                        attackDirection = 'positive';
                        attackOrientation = 'vertical'
                        lastAttack = firstSuccessfulAttack;
                    }
                }
            }

            if(attackOrientation === 'vertical'){
                if(attackDirection === 'positive'){
                    if(successfulAttacks.has(lastAttack)){
                        const { x: xCo, y: yCo } = parseCoordinate(lastAttack);
                        attackCoords.x = xCo;
                        attackCoords.y = yCo + 1;
                        if(isValidCoordinate(`(${attackCoords.x},${attackCoords.y})`)){
                            return [attackCoords.x, attackCoords.y, attackOrientation, attackDirection];
                        }
                        else{
                            attackDirection = 'negative';
                            lastAttack = firstSuccessfulAttack;
                        }
                    }
                    else{
                        attackDirection = 'negative';
                        lastAttack = firstSuccessfulAttack;
                    }
                }

                if(attackDirection === 'negative'){
                    if(successfulAttacks.has(lastAttack)){
                        const { x: xCo, y: yCo } = parseCoordinate(lastAttack);
                        attackCoords.x = xCo;
                        attackCoords.y = yCo - 1;
                        if(isValidCoordinate(`(${attackCoords.x},${attackCoords.y})`)){
                            return [attackCoords.x, attackCoords.y, attackOrientation, attackDirection];
                        }
                        else{
                            attackDirection = 'positive';
                            attackOrientation = 'horizontal'
                            lastAttack = firstSuccessfulAttack;
                        }
                    }
                    else{
                        attackDirection = 'positive';
                        attackOrientation = 'horizontal'
                        lastAttack = firstSuccessfulAttack;
                    }
                }
            }
        } 
        else {
            const coord = getValidRandomCoordinates();
            attackCoords = parseCoordinate(coord);
            attackOrientation = 'horizontal';
            attackDirection = 'positive';
            return [attackCoords.x, attackCoords.y, attackOrientation, attackDirection];
        } 
    }

    return { findTarget };
}


export { ComputerAI };