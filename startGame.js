import { userGameboard, computerGameboard } from "./newGame.js";

let container = document.createElement("div");
container.id= "container";
document.body.appendChild(container);
userGameboard();
computerGameboard();
