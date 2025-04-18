import { Ship, Gameboard, Player } from './script.js';
import { userShips, computerShips } from './shipCreation.js';

//creating the gameboards for the user
export function userGameboard() {
    const user = new Player('Jack', false, 5);
    //user grid
    let userGrid = document.createElement("div");
    userGrid.id = "user-grid";
    userGrid.classList.add("gameboard");
    container.appendChild(userGrid);
    userShips(user);
    //filling the grid
    user.gameboard.boardGrid.forEach((row, x) => {
        row.forEach((cell, y) => {x
            const div = document.createElement("div");
            div.classList.add("cell");
            div.textContent = cell ? "Y" : "N"; 
            userGrid.appendChild(div);
            //make it clickable
            div.addEventListener("click", () => {
                div.classList.add(cell ? "hit" : "miss");
            });
        });
    });
}


export function computerGameboard() {
    const computer = new Player('Computer', true, 5);
    //computer grid
    let computerGrid = document.createElement("div");
    computerGrid.classList.add("gameboard");
    computerGrid.id = "computer-grid";
    container.appendChild(computerGrid);
    computerShips(computer);
    //filling grid
    computer.gameboard.boardGrid.forEach((row, x) => {
        row.forEach((cell, y) => {
            const div = document.createElement("div");
            div.classList.add("cell");
            div.textContent = cell ? "Y" : "N"; 
            computerGrid.appendChild(div);
            //make it clickable
            div.addEventListener("click", () => {
                div.classList.add(cell ? "hit" : "miss");
            });
        });
    });
}