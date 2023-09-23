import { BonusType } from '/src/commands/bonus/BonusType';
import { Game } from '/src/game/Game';

export class ExtraScore extends BonusType {
  constructor(game: Game) {
    super(game);
  }

  apply() {
    this.game.score.add(10);
  }
}
