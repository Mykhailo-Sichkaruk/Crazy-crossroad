import { drawMap } from "./view.js";

export default function limitedDepthSearch(depth, root) {
	const stack = [];
	const visited = new Map();
	// create Root
	stack.push(root);
	// Get all possible moves
	while (stack.length > 0) {
		const game = stack.pop();
		visited.set(JSON.stringify(game.map), game.depth);
		// drawMap(game.map);
		if (game.isWin()) {
			console.log(`Win: ${JSON.stringify(game.map)}`);
			console.log(`Game: ${JSON.stringify(game.depth)}`);
			return game;
		} else if (game.depth < depth) {
			const games = game.allNextGames();
			for (const state of games) {
				if (!visited.has(JSON.stringify(state.map))) {
					stack.push(state);
				} else if (visited.get(JSON.stringify(state.map)) > state.depth) {
					visited.delete(JSON.stringify(state.map));
					stack.push(state);
				}
			}
		}
	}
	console.log(`Depth: ${depth}, `);
	return null;
}
