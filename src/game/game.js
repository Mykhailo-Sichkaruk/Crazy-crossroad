import Move from "./move.js";

export default class Game {
	static direction = {
		false: "back",
		true: "forward",
	};

	static maxCarCount = 8;
	static isEqual(first, second) {
		return JSON.stringify(first?.map) === JSON.stringify(second?.map);
	}

	constructor(previousGame, depth) {
		this.map = [
			[0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0],
		];
		this.items = [];
		this.parent = null;
		if (previousGame) {
			this.parent = previousGame;
		}
		if (!depth && this.parent) {
			this.depth = this.parent.depth + 1;
		} else {
			this.depth = 0;
		}
	}

	isWin() {
		return (this.items[ 0 ].x + this.items[ 0 ].length) >= 6;
	}

	addCar(car) {
		this.checkNewCar(car);
		this.items.push(car);
		this.updateMap();
	}

	checkNewCar(car) {
		if (car.isHorisontal) {
			if (car.x + car.length - 1 > 6) {
				throw new Error(`Car ${this.items.length + 1} is out of map. X: ${car.x}, Y: ${car.y}, length: ${car.length}, isHorisonal: ${car.isHorisontal}`);
			}
		} else if (car.y + car.length - 1 > 6) {
			throw new Error(`Car ${this.items.length + 1} is out of map. X: ${car.x}, Y: ${car.y}, length: ${car.length}, isHorisonal: ${car.isHorisontal}`);
		}

		for (let i = 0; i < car.length; i++) {
			if (car.isHorisontal) {
				if (this.map[ car.y ][ car.x + i ] !== 0) {
					throw new Error(`Car ${this.items.length + 1} is on the other car. X: ${car.x}, Y: ${car.y}, length: ${car.length}, isHorisonal: ${car.isHorisontal}`);
				}
			} else if (this.map[ car.y + i ][ car.x ] !== 0) {
				console.log(this.map);
				throw new Error(`Car ${this.items.length + 1} is on the other car. X: ${car.x}, Y: ${car.y}, length: ${car.length}, isHorisonal: ${car.isHorisontal}`);
			}
		}
	}

	updateMap() {
		this.map = [
			[0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0],
		];
		for (let j = 0; j < this.items.length; j++) {
			if (!this.items[j].isHorisontal) {
				for (let i = 0; i < this.items[ j ].length; i++) {
					this.map[ this.items[j].y + i ][ this.items[j].x ] = j + 1;
				}
			} else {
				for (let i = 0; i < this.items[j].length; i++) {
					this.map[ this.items[j].y ][ this.items[j].x + i ] = j + 1;
				}
			}
		}
		return this.map;
	}

	isAccesible(x, y) {
		const res = Boolean(this.map?.[ y ]?.[ x ] === 0);
		return res;
	}

	allPossibleMoves() {
		const moves = [];
		for (let i = 0; i < this.items.length; i++) {
			if (this.items[ i ].isForwardAccesible()) {
				moves.push(new Move(i, true));
			}
			if (this.items[ i ].isBackAccesible()) {
				moves.push(new Move(i, false));
			}
		}
		return moves;
	}

	move(move) {
		this.items[ move.carNumber ][ Game.direction[ move.isForward ] ]();
		this.updateMap();
	}

	allNextGames() {
		const games = [];
		const moves = this.allPossibleMoves();
		for (const move of moves) {
			const newGame = this.clone();
			newGame.move(move);
			games.push(newGame);
		}
		return games;
	}

	clone() {
		const newGame = new Game(this);
		for (const item of this.items) {
			newGame.addCar(item.getCopy(newGame));
		}
		return newGame;
	}

}
