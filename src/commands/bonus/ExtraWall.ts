import { Game } from '/src/game/Game';
import { BonusType } from '/src/commands/bonus/BonusType';
import { Wall } from '/src/components/Wall';
import * as L from 'littlejsengine/build/littlejs.esm';
import { LevelSize } from '/src/constants/level';

export class ExtraWall extends BonusType {
  private readonly size = L.vec2(LevelSize.x, 0.25);
  private readonly position = L.vec2(LevelSize.x * 0.5, 0.35);

  constructor(game: Game) {
    super(game);
  }

  apply() {
    this.game.floor?.destroy();
    this.game.floor = new Wall(this.position, this.size);
    this.game.floor.color = new L.Color(1, 1, 1, 0.5);
    this.timers.push(
      setTimeout(() => {
        this.game.floor?.destroy();
        this.game.floor = null;
      }, this.timeout),
    );
  }
}
