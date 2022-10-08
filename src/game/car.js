export default class Car {
	constructor(game, length, x, y, isMain = false, isHorisontal = true) {
		// Validate parameters
		if (length !== 2 && length !== 3) {
			throw new Error("Car length must be 2 or 3");
		}
		if (x !== 0 && x !== 1 && x !== 2 && x !== 3 && x !== 4 && x !== 5 &&
            y !== 0 && y !== 1 && y !== 2 && y !== 3 && y !== 4 && y !== 5) {
			throw new Error("Car x and y coordinates must be integer between 0 and 5");
		}
		if (typeof isMain !== "boolean") {
			throw new Error("Car isMain must be boolean");
		}

		// Set parameters
		this.x = x;
		this.y = y;
		this.length = length;
		this.isHorisontal = isHorisontal;
		this.isMain = isMain;
		this.game = game;
	}

	forward() {
		if (this.isForwardAccesible()) {
			if (this.isHorisontal) {
				this.x++;
				return true;
			} else {
				this.y++;
				return true;
			}
		} else {
			return false;
		}
	}

	back() {
		if (this.isBackAccesible()) {
			if (this.isHorisontal) {
				this.x--;
			} else {
				this.y--;
			}
			return true;
		} else {
			return false;
		}
	}

	isForwardAccesible() {
		if (this.isHorisontal) {
			return this.game.isAccesible(this.x + this.length, this.y);
		} else {
			return this.game.isAccesible(this.x, this.y + this.length);
		}
	}

	isBackAccesible() {
		if (this.isHorisontal) {
			return this.game.isAccesible(this.x - 1, this.y);
		} else {
			return this.game.isAccesible(this.x, this.y - 1);
		}
	}

	forwardNew() {
		if (this.isForwardAccesible()) {
			return new Car(this.game, this.length, this.x + 1, this.y, this.isMain, this.isHorisontal);
		} else {
			return null;
		}
	}

	backNew() {
		if (this.isBackAccesible()) {
			return new Car(this.game, this.length, this.x - 1, this.y, this.isMain, this.isHorisontal);
		} else {
			return null;
		}
	}

	getCopy(game) {
		return new Car(game, this.length, this.x, this.y, this.isMain, this.isHorisontal);
	}

}
