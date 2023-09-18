import { BonusType } from '/src/commands/bonus/BonusType';
import { Game } from '/src/game/Game';
import * as L from 'littlejsengine/build/littlejs.esm';

export class ExtraBalls extends BonusType {
  constructor(game: Game) {
    super(game);
  }

  apply() {
    this.game.balls.setStrength(L.randInt(2, 4));
    this.timers.push(
      setTimeout(() => {
        this.game.balls.setStrength(1);
      }, this.timeout),
    );
  }
}
