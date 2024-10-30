function Ship(length) {
    let hits = 0;

    function getHits(){
        return hits;
    }

    function hit() {
        if (!isSunk()) {
            hits++;
        }
    };

    function isSunk(){
        return hits === length;
    }

    return { length, hit, getHits, isSunk };
};

export {Ship};