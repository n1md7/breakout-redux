import { Bonus } from '/src/commands/bonus/Bonus';
import { Game } from '/src/Game';

export class PickStars extends Bonus {
  constructor(game: Game) {
    super(game);
  }

  apply() {
    this.game.score.add(10);
  }
}
