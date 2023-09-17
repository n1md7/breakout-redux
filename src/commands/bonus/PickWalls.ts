import { Game } from '/src/Game';
import { Bonus } from '/src/commands/bonus/Bonus';
import { Wall } from '/src/components/Wall';
import * as L from 'littlejsengine/build/littlejs.esm';
import { LevelSize } from '/src/constants/level';

export class PickWalls extends Bonus {
  size = L.vec2(LevelSize.x, 0.25);
  position = L.vec2(LevelSize.x * 0.5, 4);

  constructor(game: Game) {
    super(game);
  }

  apply() {
    this.game.floor?.destroy();
    this.game.floor = new Wall(this.position, this.size);
    this.game.floor.color = new L.Color(1, 1, 1, 0.5);
    setTimeout(() => {
      this.game.floor?.destroy();
      this.game.floor = null;
    }, this.timeout);
  }
}
