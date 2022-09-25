import { Orientation, CarLength, Coordinate } from "./../index.js";

export default class Car {
    length: CarLength;
    orientation: Orientation;
    y: number;
    x: number;
    id: number;
    isMain: boolean;

    constructor (id: number, length: CarLength, position: Orientation, x: Coordinate, y: Coordinate, isMain: boolean = false) {
        this.length = length;
        this.orientation = position;
        this.x = x;
        this.y = y;
        this.id = id;
        this.isMain = isMain;
    }

    forvard() {
        if(this.orientation === "Vertical") {
            if(this.y + 1 > 5) {
                return false;
            }
            this.y += 1;
        } else {
            if(this.x + 1 > 5) {
                return false;
            }
            this.x += 1;
        }
    }

    back() {
    if(this.orientation === "Vertical") {
            if(this.y - 1 < 0) {
                return false;
            }
            this.y--;
        } else {
            if(this.x - 1 < 0) {
                return false;
            }
            this.x--;
        }
    }

}