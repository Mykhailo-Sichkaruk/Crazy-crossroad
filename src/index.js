import Game from "./game/game.js";
import createGameInterractive from "./game/gameCreate.js";
import limitedDepthSearch from "./game/lds.js";
import { drawMap, drawWinner } from "./game/view.js";
import Car from "./game/car.js";

const start = async () => {
	// const game = new Game();
	// game.addCar(new Car(game, 2, 0, 1, true, true));
	// drawMap(game.map);
	const game = await createGameInterractive();
	console.log("Game created");
	for (let i = 1; i < Infinity; i++) {
		console.log("Depth: " + i);
		const result = limitedDepthSearch(i, game);
		if (result !== null) {
			await drawWinner(result);
			console.log("Depth: " + i);
			break;
		}
	}
};

await start();
