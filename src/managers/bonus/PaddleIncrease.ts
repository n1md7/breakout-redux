import { BonusType } from '/src/managers/bonus/BonusType';
import { Game } from '/src/game/Game';

export class PaddleIncrease extends BonusType {
  constructor(game: Game) {
    super(game);
  }

  apply() {
    this.game.paddle?.increaseSize();
    this.timers.push(
      setTimeout(() => {
        this.game.paddle?.decreaseSize();
      }, this.timeout),
    );
  }
}
