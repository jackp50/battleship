// module.exports = {
//     presets: [['@babel/preset-env', {targets: {node: 'current'}}]],
//   };

export class Ship {
    constructor(name, length, direction) {
        this.name = name;
        this.length = length;
        this.hitCount = 0;
        this.direction = direction;
    }

    //counts number of hits on ship
    hit() {
        this.hitCount++;
    }

    //calculates whether a ship is considered sunk
    isSunk() {
        return this.hitCount >= this.length;
    }
}

export class Gameboard {
    constructor(boardSize) {
        this.boardSize = boardSize;
        //makes an array with boardSize elements, fills with null values,
        //then uses map() to make another array where each row is an array of size elements
        //making a square
        this.boardGrid = Array(boardSize).fill(null).map(() => Array(boardSize).fill(null));
        //Array to track all ships, for later figuring out when the game is over
        this.ships = [];
        this.missedAttacks = 0;
    }

    placeShip(ship, x, y, direction) {
        this.ships.push(ship);
    
        if (direction === "horizontal") {
            for (let i = 0; i < ship.length; i++) {
                this.boardGrid[x][y + i] = ship;
            }
        } else if (direction === "vertical") {
            for (let i = 0; i < ship.length; i++) {
                this.boardGrid[x + i][y] = ship;
            }
        }
    }
    
    
    
    receiveAttack(defender, x, y) {
        const targetBoard = defender.gameboard;
        const attackTarget = targetBoard.boardGrid[x][y];
    
        if (attackTarget && attackTarget instanceof Ship) {
            attackTarget.hit();
            console.log("Ship Hit!");
    
            if (attackTarget.isSunk()) {
                console.log("Ship Sunk!");
            }
        } else { 
            defender.gameboard.missedAttacks++;
            console.log("Miss!");
        } 
    }
    
    //function to check if all ships are sunk and game is over
    allShipsSunk() {
        return this.ships.every(ship => ship.isSunk());
    }

}

 export class Player {
    constructor(user, computer, boardSize) {
        this.user = user;
        this.computer = computer;
        this.gameboard = new Gameboard(boardSize);
    }

    move(opponent, x, y) {
        opponent.gameboard.receiveAttack(opponent, x, y);
    }
    
    
}

// module.exports = { Ship, Gameboard, Player };