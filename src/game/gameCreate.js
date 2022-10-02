import { addListeners } from "./controller.js";
import Game from "./game.js";

let game = null;

function createGameInterractive() {
	game = new Game();
	console.log("We are going to create a new game");
	createCarInterractive(game);
}

async function createCarInterractive(game) {
	console.log("We are going to create a new car");
	let currentCar = await addListeners(game);
	while (currentCar !== null) {
		game.addCar(currentCar);
		currentCar = await addListeners(game);
	}
	console.log("We are done creating cars");
}

export default createGameInterractive;
