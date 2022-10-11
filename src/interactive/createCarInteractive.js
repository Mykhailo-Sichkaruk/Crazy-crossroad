import { drawMap } from "../game/view.js";
import readline from "readline";
import Car from "../game/car.js";

readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY)
	process.stdin.setRawMode(true);

function addShadowCar(car, game) {
	const shadowMap = game.map.map(row => row.map(cell => cell));
	for (let i = 0; i < car.length; i++) {
		if (car.isHorisontal) {
			shadowMap[ car.y ][ car.x + i ] = -1;
		} else {
			shadowMap[ car.y + i ][ car.x ] = -1;
		}
	}
	return shadowMap;
}

const removeListeners = () => {
	process.stdin.removeAllListeners("keypress");
	gracefullShutdown();
};

const createCarInterractive = (game, isMain) => {
	const car = new Car(game, 2, 0, 0, Boolean(isMain), true);
	drawMap(addShadowCar(car, game), true);
	return new Promise(resolve => {
		process.stdin.on("keypress", (str, key) => {
			if (key.name === "right" || key.name === "d") {
				if (car.isHorisontal && car.x + car.length < 6 ||
                    !car.isHorisontal && car.x + 1 < 6) {
					car.x++;
				}
			}
			if (key.name === "left" || key.name === "a") {
				if (car.x > 0) {
					car.x--;
				}
			}
			if (key.name === "up" || key.name === "w") {
				if (car.y > 0) {
					car.y--;
				}
			}
			if (key.name === "down" || key.name === "s") {
				if (car.isHorisontal && car.y + 1 < 6 ||
                    !car.isHorisontal && car.y + car.length < 6) {
					car.y++;
				}
			} // Set to 0,0 and rotate
			if (key.name === "space") {
				car.x = 0;
				car.y = 0;
				car.isHorisontal = !car.isHorisontal;
			} // Change length from 2 to 3 and back
			if (key.name === "tab") {
				if (car.length === 2) {
					if (car.isHorisontal) {
						if (car.y + 3 < 6) {
							car.length = 3;
						} else {
							car.y--;
							car.length = 3;
						}
					} else if (car.x + 3 < 6) {
						car.length = 3;
					} else {
						car.x--;
						car.length = 3;
					}
				} else {
					car.length = 2;
				}
			}
			// If Enter is pressed, check if the car is in the right place
			if (key.name === "return") {
				removeListeners();
				resolve(car);
			} // If Escape is pressed, resolve with null
			if (key.name === "escape") {
				drawMap(game.map, true);
				removeListeners();
				resolve(null);
			}
			// If ctrl+c is pressed, exit the program
			if (key.ctrl && key.name === "c") {
				process.exit();
			}
			drawMap(addShadowCar(car, game), true);
		});
	});

};

function gracefullShutdown() {
	process.stdin.on("keypress", (str, key) => {
		if (key.ctrl && key.name === "c") {
			process.exit();
		}
	});
}

export { createCarInterractive, removeListeners };
