import { BonusType } from '/src/commands/bonus/BonusType';
import { Game } from '/src/Game';

export class PaddleDecrease extends BonusType {
  constructor(game: Game) {
    super(game);
  }

  apply() {
    this.game.paddle?.decreaseSize();
    this.timers.push(
      setTimeout(() => {
        this.game.paddle?.increaseSize();
      }, this.timeout),
    );
  }
}
