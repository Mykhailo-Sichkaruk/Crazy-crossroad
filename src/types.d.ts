export type Position = "Vertical" | "Horizontal";
export type Orientation = "Vertical" | "Horizontal";
export type CarLength = 2 | 3;
export type Coordinate = 0 | 1 | 2 | 3 | 4 | 5;

export type Car = {
        length: CarLength;
    orientation: Orientation;
    y: number;
    x: number;
    isMain: boolean;
    isSetted: boolean;
};

export interface Item {
    length: CarLength;
    orientation: Orientation;
    y: number;
    x: number;
    isMain: boolean;
    isSetted: boolean;
    new (length: CarLength, position: Orientation, x: Coordinate, y: Coordinate, isMain: boolean): Car;
    forvard(): boolean;
    back(): boolean;
}