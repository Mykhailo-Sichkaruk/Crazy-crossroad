import mapDefault from "./mapDefault.js";
import { drawMap, drawWinner } from "../src/game/view.js";
import iterativeDeeping from "../src/search/iterativeDeeping.js";
import game1 from "./map1.js";

// Test Map 1 -----------------------------------------------------------------------------------
drawMap(game1.map, false, "-------------\nTest map 1");
// Wait for 3 seconds
await new Promise(resolve => setTimeout(resolve, 3000));
// Start timer
console.time("Iterative Deeping");
// Run iterative deeping to find the solution
const solution1 = await iterativeDeeping(game1);
// Stop timer
console.timeEnd("Iterative Deeping");
// Draw the solution
await drawWinner(solution1);
console.log(`Solution found on ${solution1.depth} depth`);

// Test Default Map -----------------------------------------------------------------------------
drawMap(mapDefault.map, false, "------------\nDefault Map");
// Wait for 3 seconds
await new Promise(resolve => setTimeout(resolve, 3000));
// Start timer
console.time("Iterative Deeping");
// Run iterative deeping to find the solution
const solution2 = await iterativeDeeping(mapDefault);
// Stop timer
console.timeEnd("Iterative Deeping");
// Draw the solution
await drawWinner(solution2);
console.log(`Solution found on ${solution2.depth} depth`);
