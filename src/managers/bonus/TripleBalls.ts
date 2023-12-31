import { BonusType } from '/src/managers/bonus/BonusType';
import { Game } from '/src/game/Game';
import * as L from 'littlejsengine/build/littlejs.esm';

export class TripleBalls extends BonusType {
  constructor(game: Game) {
    super(game);
  }

  apply() {
    if (this.game.balls.hasValue()) {
      this.game.balls.triple();
    }
  }
}
