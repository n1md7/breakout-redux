import { Bonus } from '/src/commands/bonus/Bonus';
import { Game } from '/src/Game';
import { Ball } from '/src/components/Ball';
import L from 'littlejsengine/build/littlejs.esm';

export class PickLife extends Bonus {
  constructor(game: Game) {
    super(game);
  }

  apply() {
    this.game.lives++;
  }
}
