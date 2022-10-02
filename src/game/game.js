export default class Game {
	constructor() {
		this.map = [
			[0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0],
		];
		this.items = [];
	}

	addCar(car) {
		if (this.checkNewCar(car)) {
			this.items.push(car);
			this.updateMap();
		} else {
			throw new Error("Car is not valid");
		}
	}

	checkNewCar(car) {
		if (car.isHorisontal) {
			if (car.x + car.length - 1 > 6) {
				return false;
			}
		} else if (car.y + car.length - 1 > 6) {
			return false;
		}
		for (let i = 0; i < car.length; i++) {
			if (car.isHorisontal) {
				if (this.map[ car.y ][ car.x + i ] !== 0) {
					return false;
				}
			} else if (this.map[ car.y + i ][ car.x ] !== 0) {
				return false;
			}
		}
		return true;
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
				for (let i = 0; i < this.items[j].length; i++) {
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

	isAccelible(x, y) {
		return this.map[ y ][ x ] === 0;
	}
}
