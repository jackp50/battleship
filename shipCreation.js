import { Ship } from "./script.js";
import { userGameboard, computerGameboard } from "./newGame.js";

export function userShips(user) {
    const userShip1 = new Ship(3, 0, false);
    user.gameboard.placeShip(userShip1, 1, 1, "horizontal")
    const userShip2 = new Ship(2,0,false);
    user.gameboard.placeShip(userShip2, 3, 4, "vertical")
}

export function computerShips(computer) {
    const comShip1 = new Ship(3, 0, false);
    computer.gameboard.placeShip(comShip1, 1, 1, "horizontal")
    const comShip2 = new Ship(2,0,false);
    computer.gameboard.placeShip(comShip2, 3, 4, "vertical")
}