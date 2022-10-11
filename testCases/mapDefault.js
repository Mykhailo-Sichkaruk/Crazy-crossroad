import Game from "../src/game/game.js";
import Car from "../src/game/car.js";

const game = new Game(null);
game.addCar(new Car(game, 2, 1, 2, true, true));
game.addCar(new Car(game, 2, 0, 0, false, true));
game.addCar(new Car(game, 3, 0, 1, false, false));
game.addCar(new Car(game, 2, 0, 4, false, false));
game.addCar(new Car(game, 3, 3, 1, false, false));
game.addCar(new Car(game, 3, 5, 0, false, false));
game.addCar(new Car(game, 2, 4, 4, false, true));
game.addCar(new Car(game, 3, 2, 5, false, true));

export default game;
