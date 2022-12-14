import { createCarInterractive } from "./createCarInteractive.js";
import Game from "../game/game.js";

async function createGameInterractive() {
	const game = new Game(null);
	console.log("We are going to create a new car");
	let currentCar = await createCarInterractive(game, true);
	let carCount = 0;
	while (currentCar !== null && ++carCount <= Game.maxCarCount) {
		game.addCar(currentCar);
		currentCar = await createCarInterractive(game);
	}
	console.log("We are done creating cars");
	return game;
}

export default createGameInterractive;
