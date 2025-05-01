import { userGameboard, computerGameboard} from "./gameSetup.js";

let container = document.createElement("div");
container.id= "container";
document.body.appendChild(container);


function startGame() {
    userGameboard();
    computerGameboard();
}

startGame();

const changeShip = document.createElement("button");
changeShip.id = "change-button";
container.appendChild(changeShip);
const intro = document.getElementById("intro");
intro.appendChild(changeShip);
changeShip.innerHTML = "Change Ship Placement";
changeShip.addEventListener("click", () => {
    window.location.reload();
})

const messageBox = document.createElement("div");
container.appendChild(messageBox);
messageBox.id = "attack-log";
messageBox.classList.add("attack-console");



