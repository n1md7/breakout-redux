import { Bonus } from '/src/command/Bonus';
import { Game } from '/src/Game';

export class PickStars extends Bonus {
  constructor(game: Game) {
    super(game);
  }

  apply() {
    this.game.score.add(10);
  }
}
