import { BonusType } from '/src/commands/bonus/BonusType';
import { Game } from '/src/Game';
import { Ball } from '/src/components/Ball';
import L from 'littlejsengine/build/littlejs.esm';

export class ExtraLife extends BonusType {
  constructor(game: Game) {
    super(game);
  }

  apply() {
    this.game.lives.increment();
  }
}
