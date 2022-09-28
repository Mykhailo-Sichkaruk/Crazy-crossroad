import * as readline from 'node:readline/promises';  
import * as readlineSync from "readline"
import Car from "./car.js";

import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

readlineSync.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY)
  process.stdin.setRawMode(true)

process.stdin.setRawMode(true);

const log = (key: any) => {
  return `${Log.bg[color[key]]}${Log.fg[color[key]]}[]${Log.reset}`;
};

const Log = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  underscore: "\x1b[4m",
  blink: "\x1b[5m",
  reverse: "\x1b[7m",
  hidden: "\x1b[8m",
  // Foreground (text) colors
  fg: {
    black: "\x1b[30m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",
    crimson: "\x1b[38m"
  },
  // Background colors
  bg: {
    black: "\x1b[40m",
    red: "\x1b[41m",
    green: "\x1b[42m",
    yellow: "\x1b[43m",
    blue: "\x1b[44m",
    magenta: "\x1b[45m",
    cyan: "\x1b[46m",
    white: "\x1b[47m",
    crimson: "\x1b[48m"
  }
};

const color = [
    "black",
    "red",
    "blue",
    "green",
    "yellow",
    "white",
    "purple",
    "orange"
]  
export default class Game{
    items : Car[] = [];
    map : number[][] = [];
    
    constructor() {
        this.map = [
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,3,3,0,2],
            [0,0,0,0,0,2],
            [0,0,0,0,0,0]
        ];
    }

    /**
     * 
     * @param car 
     */
    addCar(car: Car) {
        if (this.checkNewCar(car)) {
            this.items.push(car);
            this.items[this.items.length - 1].id = this.items.length - 1;
            this.updateMap();
        }
    }

    async createNewGameInterractive() {
        let carX: number;
        let carY: number;
        let carLength: number;
        let carOrientation: string;
        
        this.items = [];
        // Create main car
        process.stdin.setRawMode(true);

        console.log("Enter X coordinate for main car: ");
        this.printMap();
        this.addCar(new Car(2, "Horizontal", 0, 0));

        process.stdin.on('keypress', (str, key) => {
            if (key.name === "right") {
                this.items[0].forvard();
                this.updateMap();
                console.clear();
                this.printMap();
            }
            if (key.name === "left") {
                this.items[0].back();
                this.updateMap();
                console.clear();
                this.printMap();
            }
            if (key.name === "dpwm") {
                this.items[0].y++;
                this.updateMap();
                console.clear();
                this.printMap();
            }
        });
        //this.addCar(new Car(carLength, "Horizontal", carX, carY));
    }

    printMap() {
        for (const row of this.map) {
            for (const item of row) {
                process.stdout.write(log(item));
            }
            process.stdout.write("\n");
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