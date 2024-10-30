function Ship(length) {
    let hits = 0;

    function getHits(){
        return hits;
    }

    function hit() {
        hits++;
    };

    function isSunk(){
        return hits >= length;
    }

    return { length, getHits, hit, isSunk };
};

export {Ship};