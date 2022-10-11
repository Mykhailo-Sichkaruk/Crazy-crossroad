import Move from "./move.js";

/**
 * This class represents a game state.
 * Contains a array of cars and map state.
 * @class
 */
export default class Game {
	static direction = {
		false: "back",
		true: "forward",
	};

	static maxCarCount = 8;
	static isEqual(first, second) {
		return JSON.stringify(first?.map) === JSON.stringify(second?.map);
	}

	constructor(previousGame, depth, move) {
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
		this.previousMove = move;

		if (previousGame) {
			this.parent = previousGame;
		}
		if (!depth && this.parent) {
			this.depth = this.parent.depth + 1;
		} else {
			this.depth = 0;
		}

	}

	/**
	 * @returns {Boolean} True if game is solved, otherwise False
	 */
	isWin() {
		return (this.items[ 0 ].x + this.items[ 0 ].length) >= 6;
	}

	addCar(car) {
		this.checkNewCar(car);
		this.items.push(car);
		this.updateMap();
	}

	/**
	 * Checks if new car can be added to game
	 * @param {Car} car 
	 */
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

	/**
	 * Resets map and add all cars to map
	 * @returns {string} String representation of current game
	 */
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

	/**
	 * Returns True if square X, Y is exist and empty, otherwise False
	 * @param {number} x 
	 * @param {number} y 
	 * @returns 
	 */
	isAccesible(x, y) {
		const res = Boolean(this.map?.[ y ]?.[ x ] === 0);
		return res;
	}

	/**
	 * Returns all possible moves from current game
	 * @returns {[Move]}
	 */
	allPossibleMoves() {
		const moves = [];
		// Check all cars for possible moves and add them to moves array
		for (let i = 0; i < this.items.length; i++) {
			if (this.items[ i ].isForwardAccesible()) {
				moves.push(new Move(i, true, this.items[ i ].isHorisontal));
			}
			if (this.items[ i ].isBackAccesible()) {
				moves.push(new Move(i, false, this.items[ i ].isHorisontal));
			}
		}
		return moves;
	}

	move(move) {
		this.items[ move.carNumber ][ Game.direction[ move.isForward ] ]();
		this.updateMap();
	}

	/**
	 * Returns all possible games from current game
	 * @returns {[Game]}
	 */
	getNextStates() {
		const games = [];
		const moves = this.allPossibleMoves();
		for (const move of moves) {
			const newGame = this.clone(move);
			newGame.move(move);
			games.push(newGame);
		}
		return games;
	}

	/**
	 * Clones currunt game with current game as parent
	 * @param {Move} move 
	 * @returns 
	 */
	clone(move) {
		const newGame = new Game(this, undefined, move);
		for (const item of this.items) {
			newGame.addCar(item.getCopy(newGame));
		}
		return newGame;
	}

}
