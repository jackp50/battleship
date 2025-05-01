import { Player, Ship} from './script.js';
let userTurn = true;
let winnerPlayer;
const user = new Player('User', false, 6);
const computer = new Player('Computer', true, 6);

export function placeShipsRandomly(player) {
    const ships = [
        new Ship("2-Person", 2, "horizontal"),
        new Ship("3-person", 3, "vertical"),
        new Ship("4-person", 4, "horizontal")
    ];

    ships.forEach(ship => {
        let x, y, placed = false;        
        while (!placed) {
            x = Math.floor(Math.random() * player.gameboard.boardSize);
            y = Math.floor(Math.random() * (player.gameboard.boardSize - ship.length));

            if (ship.direction !== "horizontal") {
                [x, y] = [y, x];
            }


            if (isSpaceAvailable(player.gameboard, ship.length, x, y, ship.direction)) {
                player.gameboard.placeShip(ship, x, y, ship.direction);
                placed = true;
            }
        }
    });
}

export function userGameboard() {
    let userGrid = document.createElement("div");
    userGrid.id = "user-grid";
    userGrid.classList.add("gameboard");
    container.appendChild(userGrid);

    placeShipsRandomly(user);
    console.table(user.gameboard.boardGrid);

    user.gameboard.boardGrid.forEach((row, x) => {
        row.forEach((cell, y) => {
            const div = document.createElement("div");
            div.classList.add("cell", "user-cell");

            if (cell !== null) { 
                div.classList.add("user-ship");
            }
            userGrid.appendChild(div);
        });
    });
    
}

export function computerGameboard() {
    let computerGrid = document.createElement("div");
    computerGrid.classList.add("gameboard");
    computerGrid.id = "computer-grid";
    container.appendChild(computerGrid);

    placeShipsRandomly(computer);
    console.table(computer.gameboard.boardGrid);

    computer.gameboard.boardGrid.forEach((row, x) => {
        row.forEach((cell, y) => {
            const div = document.createElement("div");
            div.classList.add("cell", "computer-cell");
            computerGrid.appendChild(div);
            
            //user attacks
            div.addEventListener("mousedown", () => {
                if (userTurn && !div.classList.contains("disabled")) { 
                    user.move(computer, x, y);
                    updateComputerGrid(x, y);
                    switchTurn();
                    div.classList.add("disabled");
                    div.classList.add("clicked")
                }
            });


        });
    });

}

function switchTurn() {
    userTurn = !userTurn;
    checkWinCondition();

    if (!userTurn) {
        setTimeout(computerMove, 1000);
    }
}

const attackedCells = new Set();
export function computerMove() {
    if (!userTurn && userTurn !== null) {
        let randomX, randomY;
        
        do {
            randomX = Math.floor(Math.random() * user.gameboard.boardSize);
            randomY = Math.floor(Math.random() * user.gameboard.boardSize);
        } while (attackedCells.has(`${randomX},${randomY}`)); 

        attackedCells.add(`${randomX},${randomY}`);
        computer.move(user, randomX, randomY);
        updateUserGrid(randomX, randomY);
        switchTurn();
    }
}


export function checkWinCondition() {
    if (computer.gameboard.allShipsSunk()) {
        winnerPlayer = true;
        endGame();
    } else if (user.gameboard.allShipsSunk()) {
        winnerPlayer = false;
        endGame();
    }
}

function endGame() {
    console.log("Game Over!");
    userTurn = null;
    const winningMessageElement = document.getElementById('winning-message');
    const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
    if (winnerPlayer) {
        winningMessageTextElement.innerHTML = "User Wins!"
    } else if (!winnerPlayer) {
        winningMessageTextElement.innerHTML = "Computer Wins!"
    }
    winningMessageElement.classList.add('show');
    console.log(`Winner: ${winnerPlayer}`);
    const restartButton = document.getElementById("restart-button");
    restartButton.addEventListener("click", () => {
    window.location.reload();
});

}

export function updateComputerGrid(x, y) {
    const cell = document.querySelector(`#computer-grid .computer-cell:nth-child(${x * computer.gameboard.boardSize + y + 1})`);

    if (!cell) {
        console.error(`Cell at (${x},${y}) not found in computer-grid.`);
        return;
    }

    let resultMessage;
    if (computer.gameboard.boardGrid[x][y] instanceof Ship) {
        cell.classList.add("hit");
        resultMessage = "Hit!"
    } else {
        cell.classList.add("miss");
        resultMessage = "Miss"

    }
    logAttackResult(resultMessage);
}


export function updateUserGrid(x, y) {

    const cell = document.querySelector(`#user-grid .user-cell:nth-child(${x * user.gameboard.boardSize + y + 1})`);

    if (!cell) {
        console.error(`Cell at (${x},${y}) not found in user-grid.`);
        return;
    }
    let resultMessage;
    if (user.gameboard.boardGrid[x][y] instanceof Ship) {
        cell.classList.add("hit");
        cell.classList.remove("user-ship");
        resultMessage = "Hit!"
    } else {
        cell.classList.add("miss");
        resultMessage = "Miss"
    }
    logAttackResult(resultMessage);
}

function logAttackResult(message) {
    const logContainer = document.getElementById("attack-log");
    const logEntry = document.createElement("div");
    logEntry.classList.add("attack-log-entry");
    logEntry.textContent = message;
    
    logContainer.appendChild(logEntry);
    logContainer.scrollTop = logContainer.scrollHeight;
}


function isSpaceAvailable(board, length, x, y, direction) {
    if (direction === "horizontal") {
        return y + length <= board.boardSize && board.boardGrid[x].slice(y, y + length).every(cell => !cell);
    } else {
        return x + length <= board.boardSize && board.boardGrid.slice(x, x + length).every(row => !row[y]);
    }
}




