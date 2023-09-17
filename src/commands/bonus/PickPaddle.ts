import { Bonus } from '/src/commands/bonus/Bonus';
import { Game } from '/src/Game';

export class PickPaddle extends Bonus {
  constructor(game: Game) {
    super(game);
  }

  apply() {
    this.game.paddle?.increaseSize();
    setTimeout(() => {
      this.game.paddle?.resetSize();
    }, this.timeout);
  }
}
