// module.exports = {
//     presets: [['@babel/preset-env', {targets: {node: 'current'}}]],
//   };

export class Ship {
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
        //adding ship into the ships array
        this.ships.push(ship);
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

    receiveAttack(x, y){
        const attack = this.boardGrid[x][y];
        if (attack) {
            attack.hit();
            if(attack.isSunk()) {
                console.log("Ship Sunk");
            } else {
                console.log("Ship Hit");
            }
        } else {
            this.missedAttacks++;
            console.log("Miss");
        }
    }

    //function to check if all ships are sunk and game is over
    allShipsSunk() {
        //console log because this test keeps failing
        console.log("Checking if all ships are sunk...");
        this.ships.forEach(ship => console.log(`Ship Length: ${ship.length}, Hit Count: ${ship.hitCount}, Sunk: ${ship.sunk}`));
        return this.ships.every(ship => ship.isSunk());
    }
    
}


 export class Player {
    constructor(user, computer, boardSize) {
        this.user = user;
        this.computer = computer;
        this.gameboard = new Gameboard(boardSize);
    }

    move(x,y) {
        if (!this.computer) {
            this.gameboard.receiveAttack(x,y);
        }
        else {
            const randomX = Math.floor(Math.random() * this.gameboard.boardSize);
            const randomY = Math.floor(Math.random() * this.gameboard.boardSize);
            this.gameboard.receiveAttack(randomX, randomY);
        }
    }
}

// module.exports = { Ship, Gameboard, Player };