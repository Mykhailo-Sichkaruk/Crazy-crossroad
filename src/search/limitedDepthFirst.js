export default function limitedDepthSearchOptimised(depth, root) {
	const stack = [];
	const visited = new Map();
	stack.push(root);
	// Get all possible moves
	while (stack.length > 0) {
		const game = stack.pop();
		visited.set(JSON.stringify(game.map), game.depth);
		if (game.isWin()) {
			return game;
		} else if (game.depth < depth) {
			const games = game.getNextStates();
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
	return null;
}
