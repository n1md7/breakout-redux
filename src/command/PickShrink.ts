import { Bonus } from '/src/command/Bonus';
import { Game } from '/src/Game';

export class PickShrink extends Bonus {
  constructor(game: Game) {
    super(game);
  }

  apply() {
    this.game.paddle?.decreaseSize();
    setTimeout(() => {
      this.game.paddle?.resetSize();
    }, this.timeout);
  }
}
