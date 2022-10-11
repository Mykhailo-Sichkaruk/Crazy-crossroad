import limitedDepthSearch from "./limitedDepthFirst.js";

export default async function iterativeDeeping(game) {
	console.log("Iterative Deeping Search");
	for (let i = 1; i < Infinity; i++) {
		console.log(`Searching for solution with depth ${i}`);
		const result = limitedDepthSearch(i, game);
		if (result !== null) {
			return result;
		}
	}
}
