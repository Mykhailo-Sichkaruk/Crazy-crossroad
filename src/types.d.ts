export type Position = "Vertical" | "Horizontal";
export type Orientation = "Vertical" | "Horizontal";
export type CarLength = 2 | 3;
export type Coordinate = 0 | 1 | 2 | 3 | 4 | 5;

export interface Playable{
    items: Item[];
    map: number[][];
    addCar(car: Car): void;
    getMap(): number[][];
    getItems(): Car[];
    moveCar(car: Car, direction: "forvard" | "back"): void;
    getMainCar(): Car;
    isAccesible(car: Car, direction: "forvard" | "back"): boolean;
}


declare interface Item {
    length: CarLength;
	isSettled: boolean;
	isHorisontal: boolean;
	y: Coordinate;
	x: Coordinate;
	isMain: boolean;
	isSetted: boolean;
	forvard(): boolean;
	back(): boolean;
}

export type newCar = (length: CarLength, position: Orientation, x: Coordinate, y: Coordinate, isMain?: boolean) => Item;

export default class Car {
	length: CarLength;
	orientation: Orientation;
	y: number;
	x: number;
	isMain: boolean;
	constructor(length: CarLength, position: Orientation, x: Coordinate, y: Coordinate, isMain?: boolean);
	forvard(): false | undefined;
	back(): false | undefined;
}
