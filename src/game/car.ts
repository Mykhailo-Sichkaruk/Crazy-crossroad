import { Item, Coordinate } from "./../types.js";

export default class Car implements Item {
    constructor (length, position, x, y, isMain = false) {
        // Validate parameters
        console.log(length, position, x, y);
    
        if (length !== 2 && length !== 3) {
            throw new Error("Car length must be 2 or 3");
        }
        if (position !== "Horizontal" && position !== "Vertical") {
            throw new Error("Car position must be Horizontal or Vertical");
        }
        if (x != 0 && x != 1 && x != 2 && x != 3 && x != 4 && x != 5 &&
            y != 0 && y != 1 && y != 2 && y != 3 && y != 4 && y != 5) {
            throw new Error("Car x and y coordinates must be integer between 0 and 5");
        }
        if (typeof isMain !== "boolean") {
            throw new Error("Car isMain must be boolean");
        }

        // Set parameters
        this.length = length;
        this.orientation = position;
        this.x = x;
        this.y = y;
        this.isMain = isMain;
        this.isSetted = false;
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