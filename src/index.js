import Game from "./game/game.js";
import createGameInterractive from "./game/gameCreate.js";

const start = async () => {
	const game = new Game();
	await createGameInterractive(game);
};

start();
