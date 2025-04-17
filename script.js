module.exports = {
    presets: [['@babel/preset-env', {targets: {node: 'current'}}]],
  };

class Ship {
    constructor(length, hitCount, sunk) {
        this.length = length;
        this.hitCount = hitCount;
        this.sunk = sunk;
    }

    //counts number of hits on ship
    hit() {
        this.hitCount++;
    }

    //calculates whether a ship is considered sunk
    isSunk() {
        if(this.length == this.hitCount) {
            this.sunk = true;
        }
        else {
            this.sunk = false;
        }
        return this.sunk;
    }



}

class Gameboard {
    constructor(boardSize) {
        this.boardSize = boardSize;
        //makes an array with boardSize elements, fills with null values,
        //then uses map() to make another array where each row is an array of size elements
        //making a square
        this.boardGrid = Array(boardSize).fill(null).map(() => Array(boardSize).fill(null));
    }

    placeShip(ship, x, y, direction) {
        if (direction === "horizontal") {
            
            // Place ship across multiple horizontal cells
            for (let i = 0; i < ship.length; i++) {
                this.boardGrid[x][y + i] = ship;
                // coordinates.push([x, y + i]); 
            }
        } else if (direction === "vertical") {
            // Place ship across multiple vertical cells
            for (let i = 0; i < ship.length; i++) {
                this.boardGrid[x + i][y] = ship;
                // coordinates.push([x + i, y]);
            }
        } 
        else {
            throw new Error("Invalid direction! Use 'horizontal' or 'vertical'.");
        }
    }

    receiveAttack(coordinates){
        
    }
}


class Player {
    constructor() {

    }
}

module.exports = { Ship, Gameboard };