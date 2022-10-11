import createGameInterractive from "./interactive/gameCreate.js";
import { drawWinner } from "./game/view.js";
import iterativeDeeping from "./search/iterativeDeeping.js";

const game = await createGameInterractive();
const result = await iterativeDeeping(game);
drawWinner(result);
