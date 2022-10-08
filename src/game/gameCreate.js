import { createCarInterractive } from "./controller.js";
import Game from "./game.js";

async function createGameInterractive() {
	const game = new Game(null);
	console.log("We are going to create a new car");
	let currentCar = await createCarInterractive(game, true);
	let carCount = 0;
	while (currentCar !== null && ++carCount <= Game.maxCarCount) {
		game.addCar(currentCar);
		console.log(`Car horisontal: ${game.items[carCount - 1].isHorisontal} created`);
		currentCar = await createCarInterractive(game);
	}
	console.log("We are done creating cars");
	return game;
}

export default createGameInterractive;
