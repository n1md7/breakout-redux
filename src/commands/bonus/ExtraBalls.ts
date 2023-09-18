import { BonusType } from '/src/commands/bonus/BonusType';
import { Game } from '/src/game/Game';
import * as L from 'littlejsengine/build/littlejs.esm';

export class ExtraBalls extends BonusType {
  constructor(game: Game) {
    super(game);
  }

  apply() {
    if (this.game.balls.hasValue()) {
      const ball = this.game.balls.getOne();
      if (!ball || ball.destroyed) return;

      this.game.balls.spawnManyAt(L.cameraPos, 3);
    }
  }
}
