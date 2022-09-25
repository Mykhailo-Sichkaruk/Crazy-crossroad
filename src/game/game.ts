import Car from "./car";

class Game{
    items : Car[] = [];
    map : number[][] = [];
    
    constructor() {
        this.map = [
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0]
        ];
    }

    addCar(car: Car) {
        if (this.checkNewCar(car)) {
            this.items.push(car);
            this.updateMap();
        }
    }

    checkNewCar(car: Car) {
        if(car.orientation === "Vertical") {
            if(car.y + car.length > 6) {
                return false;
            }
        } else {
            if(car.x + car.length > 6) {
                return false;
            }
        }

        for(let i = 0; i < car.length; i++) {
            if(car.orientation === "Vertical") {
                if(this.map[car.y + i][car.x] !== 0) {
                    return false;
                }
            } else {
                if(this.map[car.y][car.x + i] !== 0) {
                    return false;
                }
            }
        }
        return true;
    }

    updateMap() {
        this.map = [
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0]
        ];
        for(let car of this.items) {
            if(car.orientation === "Vertical") {
                for(let i = 0; i < car.length; i++) {
                    this.map[car.y + i][car.x] = 1;
                }
            } else {
                for(let i = 0; i < car.length; i++) {
                    this.map[car.y][car.x + i] = 1;
                }
            }
        };
    }

    saveState() {
        return {
            map: this.map,
            items: this.items
        }
    }

}