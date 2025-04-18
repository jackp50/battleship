import { Ship, Gameboard, Player } from './script.js';

//creating the gameboards for the players
const user = new Player('Jack', false, 5);
const computer = new Player('Computer', true, 5);
let container = document.createElement("div");
container.id= "container";
document.body.appendChild(container);

//user grid
let userGrid = document.createElement("div");
userGrid.id = "user-grid";
userGrid.classList.add("gameboard");
container.appendChild(userGrid);

//filling the grid
user.gameboard.boardGrid.forEach((row) => {
    row.forEach((cell) => {
        const div = document.createElement("div");
        div.classList.add("cell");
        div.textContent = cell ? "Y" : "N"; 
        userGrid.appendChild(div);
    });
});

//computer grid
let computerGrid = document.createElement("div");
computerGrid.classList.add("gameboard");
computerGrid.id = "computer-grid";
container.appendChild(computerGrid);
//filling grid
computer.gameboard.boardGrid.forEach((row) => {
    row.forEach((cell) => {
        const div = document.createElement("div");
        div.classList.add("cell");
        div.textContent = cell ? "Y" : "N"; 
        computerGrid.appendChild(div);
    });
});